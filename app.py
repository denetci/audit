from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from http import cookies
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
import hashlib
import json
import os
import secrets
import smtplib
import sqlite3
from pathlib import Path
from urllib.parse import urlparse
import webbrowser
import tempfile
from database_restore import restore_database, snapshot_database
from authorization import MODULES, normalize_permissions, filter_state, authorize_record


HOST = os.environ.get("IDB_HOST", "127.0.0.1")
PORT = int(os.environ.get("IDB_PORT", "8000"))
PROJECT_DIR = Path(__file__).resolve().parent
STATIC_DIR = PROJECT_DIR / "static"
DB_PATH = Path(os.environ.get("IDB_DB_PATH", PROJECT_DIR / "ic_denetim.db"))
STATE_KEY = "main"
OPEN_BROWSER = os.environ.get("IDB_OPEN_BROWSER", "1") != "0"
SESSION_COOKIE = "idb_session"
SESSION_DAYS = 7
OWNER_USERNAME = os.environ.get("IDB_OWNER_USERNAME", "ramazan.orman")
OWNER_DISPLAY_NAME = os.environ.get("IDB_OWNER_DISPLAY_NAME", "Ramazan ORMAN")
OWNER_EMAIL = os.environ.get("IDB_OWNER_EMAIL", "ramazan.orman@tarimorman.gov.tr")

COLLECTIONS = (
    "audits",
    "approvals",
    "leaves",
    "leaveRights",
    "dutyRecords",
    "budgetItems",
    "budgetExpenses",
    "stockItems",
    "reportDocuments",
    "personnelRecords",
)


def record_key(collection, record):
    if collection in ("audits", "approvals"):
        year = record.get("year")
        number = record.get("no")
        if year is None or number is None:
            return ""
        return f"{year}-{number}"

    if collection in ("leaves", "leaveRights", "dutyRecords", "budgetItems", "budgetExpenses", "stockItems"):
        record_id = record.get("id")
        if record_id is None:
            return ""
        return str(record_id)

    if collection == "reportDocuments":
        if record.get("id"):
            return str(record.get("id"))
        audit_key = record.get("auditKey")
        document_type = record.get("documentType")
        if not audit_key or not document_type:
            return ""
        return f"{audit_key}-{document_type}-{record.get('isExtra')}"

    if collection == "personnelRecords":
        group = record.get("group")
        number = record.get("no")
        if not group or number is None:
            return ""
        return f"{group}-{number}"

    return ""


class ClosingConnection(sqlite3.Connection):
    def __exit__(self, *args):
        try:
            return super().__exit__(*args)
        finally:
            self.close()


def get_connection():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH, factory=ClosingConnection)
    connection.row_factory = sqlite3.Row
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS app_state (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """,
    )
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS records (
            collection TEXT NOT NULL,
            record_key TEXT NOT NULL,
            value TEXT NOT NULL,
            updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (collection, record_key)
        )
        """,
    )
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL DEFAULT '',
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL DEFAULT 'user',
            display_name TEXT NOT NULL,
            active INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """,
    )
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS sessions (
            token TEXT PRIMARY KEY,
            user_id INTEGER NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
            expires_at TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        """,
    )
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS audit_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            action TEXT NOT NULL,
            detail TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        )
        """,
    )
    ensure_user_schema(connection)
    ensure_default_admin(connection)
    migrate_legacy_state(connection)
    if not connection.execute("SELECT 1 FROM app_state WHERE key='bootstrap_done'").fetchone():
        if not connection.execute("SELECT 1 FROM records LIMIT 1").fetchone():
            seed = PROJECT_DIR / "seed_records.json"
            if seed.exists():
                upsert_records(connection, json.loads(seed.read_text(encoding="utf-8")))
        connection.execute("INSERT INTO app_state(key,value) VALUES('bootstrap_done','true')")
    return connection


def utc_now():
    return datetime.now(timezone.utc)


def hash_password(password):
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        120_000,
    ).hex()
    return f"pbkdf2_sha256${salt}${digest}"


def verify_password(password, stored_hash):
    try:
        algorithm, salt, expected = stored_hash.split("$", 2)
    except ValueError:
        return False

    if algorithm != "pbkdf2_sha256":
        return False

    digest = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        120_000,
    ).hex()
    return secrets.compare_digest(digest, expected)


def public_user(row):
    saved = row["permissions"]
    permissions = normalize_permissions(json.loads(saved)) if saved else {k: ("view" if row["role"] == "viewer" else "edit") for k in MODULES}
    return {
        "permissions": permissions,
        "id": row["id"],
        "username": row["username"],
        "displayName": row["display_name"],
        "email": row["email"],
        "role": row["role"],
        "owner": row["username"] == OWNER_USERNAME,
        "active": bool(row["active"]),
        "createdAt": row["created_at"],
    }


def ensure_user_schema(connection):
    if "permissions" not in {r["name"] for r in connection.execute("PRAGMA table_info(users)")}:
        connection.execute("ALTER TABLE users ADD COLUMN permissions TEXT")
    columns = {
        row["name"]
        for row in connection.execute("PRAGMA table_info(users)").fetchall()
    }

    if "email" not in columns:
        connection.execute("ALTER TABLE users ADD COLUMN email TEXT NOT NULL DEFAULT ''")


def ensure_default_admin(connection):
    existing_count = connection.execute("SELECT COUNT(*) FROM users").fetchone()[0]

    if existing_count:
        first_admin = connection.execute(
            "SELECT id, username FROM users WHERE role = 'admin' ORDER BY id LIMIT 1",
        ).fetchone()

        if first_admin and first_admin["username"] == "admin":
            try:
                connection.execute(
                    """
                    UPDATE users
                    SET username = ?, email = ?, display_name = ?, role = 'admin', active = 1
                    WHERE id = ?
                    """,
                    (OWNER_USERNAME, OWNER_EMAIL, OWNER_DISPLAY_NAME, first_admin["id"]),
                )
            except sqlite3.IntegrityError:
                connection.execute(
                    "UPDATE users SET email = ?, display_name = ?, role = 'admin', active = 1 WHERE id = ?",
                    (OWNER_EMAIL, OWNER_DISPLAY_NAME, first_admin["id"]),
                )

        owner = connection.execute(
            "SELECT id, email FROM users WHERE username = ?",
            (OWNER_USERNAME,),
        ).fetchone()

        if owner and not owner["email"]:
            connection.execute(
                "UPDATE users SET email = ?, display_name = ?, role = 'admin', active = 1 WHERE id = ?",
                (OWNER_EMAIL, OWNER_DISPLAY_NAME, owner["id"]),
            )

        return

    password = os.environ.get("IDB_ADMIN_PASSWORD", "admin123")
    connection.execute(
        """
        INSERT INTO users (username, email, password_hash, role, display_name, active)
        VALUES (?, ?, ?, ?, ?, 1)
        """,
        (OWNER_USERNAME, OWNER_EMAIL, hash_password(password), "admin", OWNER_DISPLAY_NAME),
    )


def log_action(connection, user, action, detail):
    username = user["username"] if user else "sistem"
    connection.execute(
        "INSERT INTO audit_log (username, action, detail) VALUES (?, ?, ?)",
        (username, action, detail),
    )


def is_valid_email(value):
    return "@" in value and "." in value.rsplit("@", 1)[-1]


def send_password_reset_email(request_email, user_row):
    smtp_host = os.environ.get("IDB_SMTP_HOST", "").strip()

    if not smtp_host:
        return False

    smtp_port = int(os.environ.get("IDB_SMTP_PORT", "587"))
    smtp_user = os.environ.get("IDB_SMTP_USER", "").strip()
    smtp_password = os.environ.get("IDB_SMTP_PASSWORD", "")
    sender = os.environ.get("IDB_MAIL_FROM", smtp_user or OWNER_EMAIL)

    message = EmailMessage()
    message["Subject"] = "İç Denetim Paneli Parola Yenileme Talebi"
    message["From"] = sender
    message["To"] = OWNER_EMAIL
    message.set_content(
        "\n".join(
            [
                "İç Denetim Başkanlığı panelinden parola yenileme talebi alındı.",
                "",
                f"Talep edilen e-posta: {request_email}",
                f"Kullanıcı adı: {user_row['username'] if user_row else 'Kayıt bulunamadı'}",
                f"Ad soyad: {user_row['display_name'] if user_row else 'Kayıt bulunamadı'}",
                "",
                "Yönetim panelinden kullanıcıya yeni parola tanımlayabilirsiniz.",
            ],
        ),
    )

    with smtplib.SMTP(smtp_host, smtp_port, timeout=15) as smtp:
        smtp.starttls()
        if smtp_user:
            smtp.login(smtp_user, smtp_password)
        smtp.send_message(message)

    return True


def migrate_legacy_state(connection):
    existing_count = connection.execute("SELECT COUNT(*) FROM records").fetchone()[0]

    if existing_count:
        return

    row = connection.execute(
        "SELECT value FROM app_state WHERE key = ?",
        (STATE_KEY,),
    ).fetchone()

    if not row:
        return

    try:
        payload = json.loads(row[0])
    except json.JSONDecodeError:
        return

    upsert_records(connection, payload)


def build_state_from_records(connection):
    rows = connection.execute(
        "SELECT collection, value FROM records ORDER BY collection, record_key",
    ).fetchall()
    payload = {"version": "2026-09-03-sqlite-records-v1"}

    for collection, value in rows:
        if collection not in COLLECTIONS:
            continue

        try:
            payload.setdefault(collection, []).append(json.loads(value))
        except json.JSONDecodeError:
            continue

    return payload


def upsert_records(connection, payload):
    for collection in COLLECTIONS:
        records = payload.get(collection)

        if isinstance(records, dict):
            records = [records]
        elif not isinstance(records, list):
            continue

        for record in records:
            if not isinstance(record, dict):
                continue

            key = record_key(collection, record)

            if not key:
                continue

            connection.execute(
                """
                INSERT INTO records (collection, record_key, value, updated_at)
                VALUES (?, ?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(collection, record_key) DO UPDATE SET
                    value = excluded.value,
                    updated_at = CURRENT_TIMESTAMP
                """,
                (collection, key, json.dumps(record, ensure_ascii=False)),
            )


def delete_records(connection, payload):
    deleted_records = payload.get("deletedRecords")

    if not isinstance(deleted_records, list):
        return

    for deleted_record in deleted_records:
        if not isinstance(deleted_record, dict):
            continue

        collection = deleted_record.get("collection")
        key = deleted_record.get("key")

        if collection not in COLLECTIONS or not key:
            continue

        connection.execute(
            "DELETE FROM records WHERE collection = ? AND record_key = ?",
            (collection, str(key)),
        )


class DashboardHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(STATIC_DIR), **kwargs)

    def do_GET(self):
        path = urlparse(self.path).path

        if path == "/health":
            self.send_json({"ok": True})
            return

        if path == "/api/me":
            self.handle_me()
            return

        if path == "/api/state":
            user = self.require_auth()

            if not user:
                return

            self.send_json(filter_state(user, self.read_state(), COLLECTIONS))
            return

        if path == "/api/admin/users":
            user = self.require_owner()

            if not user:
                return

            self.handle_admin_users()
            return

        if path == "/api/admin/audit-log":
            user = self.require_owner()

            if not user:
                return

            self.handle_admin_audit_log()
            return

        if path == "/api/admin/db/backup":
            user = self.require_owner()

            if not user:
                return

            self.handle_database_backup(user)
            return

        super().do_GET()

    def do_POST(self):
        path = urlparse(self.path).path

        if path == "/api/login":
            self.handle_login()
            return

        if path == "/api/logout":
            self.handle_logout()
            return

        if path == "/api/forgot-password":
            self.handle_forgot_password()
            return

        if path == "/api/change-password":
            user = self.require_auth()

            if not user:
                return

            self.handle_change_password(user)
            return

        if path == "/api/state":
            user = self.require_auth()

            if not user:
                return

            self.write_state(user)
            return

        if path == "/api/admin/users":
            user = self.require_owner()

            if not user:
                return

            self.handle_create_user(user)
            return

        if path == "/api/admin/users/update":
            user = self.require_owner()

            if not user:
                return

            self.handle_update_user(user)
            return

        if path == "/api/admin/db/restore":
            user = self.require_owner()
            if user:
                self.handle_database_restore(user)
            return

        if path == "/api/admin/users/delete":
            user = self.require_owner()

            if not user:
                return

            self.handle_delete_user(user)
            return

        self.send_error(404, "Not found")

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self):
        content_length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(content_length)

        if not raw_body:
            return {}

        return json.loads(raw_body.decode("utf-8"))

    def get_session_token(self):
        raw_cookie = self.headers.get("Cookie", "")

        if not raw_cookie:
            return ""

        cookie = cookies.SimpleCookie()
        cookie.load(raw_cookie)
        morsel = cookie.get(SESSION_COOKIE)
        return morsel.value if morsel else ""

    def get_current_user(self):
        token = self.get_session_token()

        if not token:
            return None

        now = utc_now().isoformat()
        with get_connection() as connection:
            row = connection.execute(
                """
                SELECT users.*
                FROM sessions
                JOIN users ON users.id = sessions.user_id
                WHERE sessions.token = ?
                    AND sessions.expires_at > ?
                    AND users.active = 1
                """,
                (token, now),
            ).fetchone()

        return public_user(row) if row else None

    def require_auth(self):
        user = self.get_current_user()

        if not user:
            self.send_json({"ok": False, "error": "Oturum gerekli."}, status=401)
            return None

        return user

    def require_admin(self):
        user = self.require_auth()

        if not user:
            return None

        if user["role"] != "admin":
            self.send_json({"ok": False, "error": "Yönetici yetkisi gerekli."}, status=403)
            return None

        return user

    def require_owner(self):
        user = self.require_admin()

        if not user:
            return None

        if not user.get("owner"):
            self.send_json({"ok": False, "error": "Kullanıcı yetkilerini sadece ana yönetici değiştirebilir."}, status=403)
            return None

        return user

    def set_session_cookie(self, token, expires_at):
        self.send_header(
            "Set-Cookie",
            (
                f"{SESSION_COOKIE}={token}; Path=/; HttpOnly; SameSite=Lax; "
                f"Expires={expires_at.strftime('%a, %d %b %Y %H:%M:%S GMT')}"
            ),
        )

    def clear_session_cookie(self):
        self.send_header(
            "Set-Cookie",
            f"{SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0",
        )

    def send_login_json(self, payload, token="", expires_at=None, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))

        if token and expires_at:
            self.set_session_cookie(token, expires_at)

        self.end_headers()
        self.wfile.write(body)

    def send_logout_json(self):
        body = json.dumps({"ok": True}, ensure_ascii=False).encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.clear_session_cookie()
        self.end_headers()
        self.wfile.write(body)

    def handle_me(self):
        user = self.get_current_user()
        self.send_json({"ok": True, "user": user})

    def handle_login(self):
        try:
            payload = self.read_json_body()
        except json.JSONDecodeError:
            self.send_json({"ok": False, "error": "Geçersiz giriş bilgisi."}, status=400)
            return

        username = str(payload.get("username", "")).strip()
        password = str(payload.get("password", ""))

        if not username or not password:
            self.send_json({"ok": False, "error": "Kullanıcı adı ve parola gerekli."}, status=400)
            return

        with get_connection() as connection:
            row = connection.execute(
                "SELECT * FROM users WHERE username = ? AND active = 1",
                (username,),
            ).fetchone()

            if not row or not verify_password(password, row["password_hash"]):
                self.send_json({"ok": False, "error": "Kullanıcı adı veya parola hatalı."}, status=401)
                return

            token = secrets.token_urlsafe(32)
            expires_at = utc_now() + timedelta(days=SESSION_DAYS)
            connection.execute(
                "INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)",
                (token, row["id"], expires_at.isoformat()),
            )
            user = public_user(row)
            log_action(connection, user, "login", "Oturum açıldı")

        self.send_login_json({"ok": True, "user": user}, token=token, expires_at=expires_at)

    def handle_logout(self):
        token = self.get_session_token()

        with get_connection() as connection:
            if token:
                connection.execute("DELETE FROM sessions WHERE token = ?", (token,))

        self.send_logout_json()

    def handle_forgot_password(self):
        try:
            payload = self.read_json_body()
        except json.JSONDecodeError:
            self.send_json({"ok": False, "error": "Geçersiz e-posta bilgisi."}, status=400)
            return

        request_email = str(payload.get("email", "")).strip().lower()

        if not is_valid_email(request_email):
            self.send_json({"ok": False, "error": "Geçerli bir e-posta adresi yazılmalı."}, status=400)
            return

        mail_sent = False
        with get_connection() as connection:
            user_row = connection.execute(
                "SELECT * FROM users WHERE lower(email) = ?",
                (request_email,),
            ).fetchone()
            log_action(
                connection,
                None,
                "password_reset_request",
                f"{request_email} için parola yenileme talebi alındı",
            )

        try:
            mail_sent = send_password_reset_email(request_email, user_row)
        except Exception:
            mail_sent = False

        message = (
            "Parola yenileme talebi ana yönetici mailine gönderildi."
            if mail_sent
            else "Parola yenileme talebi alındı. Mail sunucusu tanımlı değilse ana yönetici Yönetim panelinden yeni parola verebilir."
        )
        self.send_json({"ok": True, "message": message})

    def handle_admin_users(self):
        with get_connection() as connection:
            rows = connection.execute(
                """
                SELECT id, username, email, display_name, role, active, created_at, permissions
                FROM users
                ORDER BY created_at, id
                """,
            ).fetchall()

        self.send_json({"ok": True, "users": [public_user(row) for row in rows]})

    def handle_create_user(self, current_user):
        try:
            payload = self.read_json_body()
        except json.JSONDecodeError:
            self.send_json({"ok": False, "error": "Geçersiz kullanıcı bilgisi."}, status=400)
            return

        username = str(payload.get("username", "")).strip()
        email = str(payload.get("email", "")).strip().lower()
        display_name = str(payload.get("displayName", "")).strip() or username
        password = str(payload.get("password", ""))
        role = str(payload.get("role", "user")).strip()

        if role not in ("admin", "user", "viewer"):
            role = "user"

        if not username or not email or not password:
            self.send_json({"ok": False, "error": "Kullanıcı adı, e-posta ve parola gerekli."}, status=400)
            return

        if not is_valid_email(email):
            self.send_json({"ok": False, "error": "Geçerli bir e-posta adresi yazılmalı."}, status=400)
            return

        if len(password) < 6:
            self.send_json({"ok": False, "error": "Parola en az 6 karakter olmalı."}, status=400)
            return

        try:
            with get_connection() as connection:
                connection.execute(
                    """
                    INSERT INTO users (username, email, password_hash, role, display_name, active)
                    VALUES (?, ?, ?, ?, ?, 1)
                    """,
                    (username, email, hash_password(password), role, display_name),
                )
                connection.execute("UPDATE users SET permissions = ? WHERE username = ?", (json.dumps(normalize_permissions({})), username))
                log_action(connection, current_user, "user_create", f"{username} kullanıcısı oluşturuldu")
        except sqlite3.IntegrityError:
            self.send_json({"ok": False, "error": "Bu kullanıcı adı zaten var."}, status=409)
            return

        self.send_json({"ok": True})

    def get_target_user(self, connection, payload):
        user_id = payload.get("id")

        try:
            user_id = int(user_id)
        except (TypeError, ValueError):
            return None

        return connection.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()

    def handle_update_user(self, current_user):
        try:
            payload = self.read_json_body()
        except json.JSONDecodeError:
            self.send_json({"ok": False, "error": "Geçersiz kullanıcı bilgisi."}, status=400)
            return

        display_name = str(payload.get("displayName", "")).strip()
        email = str(payload.get("email", "")).strip().lower()
        role = str(payload.get("role", "user")).strip()
        active = 1 if payload.get("active", True) else 0
        password = str(payload.get("password", ""))

        if role not in ("admin", "user", "viewer"):
            role = "user"

        with get_connection() as connection:
            target = self.get_target_user(connection, payload)

            if not target:
                self.send_json({"ok": False, "error": "Kullanıcı bulunamadı."}, status=404)
                return

            if target["username"] == OWNER_USERNAME:
                role = "admin"
                active = 1
                email = email or OWNER_EMAIL
                display_name = display_name or OWNER_DISPLAY_NAME

            display_name = display_name or target["display_name"]
            email = email or target["email"]

            if not is_valid_email(email):
                self.send_json({"ok": False, "error": "Geçerli bir e-posta adresi yazılmalı."}, status=400)
                return

            connection.execute(
                "UPDATE users SET display_name = ?, email = ?, role = ?, active = ? WHERE id = ?",
                (display_name, email, role, active, target["id"]),
            )

            if "permissions" in payload and target["username"] != OWNER_USERNAME:
                try:
                    permissions = normalize_permissions(payload["permissions"])
                except ValueError as error:
                    connection.rollback()
                    self.send_json({"ok": False, "error": str(error)}, status=400)
                    return
                connection.execute("UPDATE users SET permissions = ? WHERE id = ?", (json.dumps(permissions), target["id"]))
                log_action(connection, current_user, "permissions_update", f"{target['username']}: {json.dumps(permissions, ensure_ascii=False)}")

            if password:
                if len(password) < 6:
                    self.send_json({"ok": False, "error": "Parola en az 6 karakter olmalı."}, status=400)
                    return

                connection.execute(
                    "UPDATE users SET password_hash = ? WHERE id = ?",
                    (hash_password(password), target["id"]),
                )

            if not active:
                connection.execute("DELETE FROM sessions WHERE user_id = ?", (target["id"],))

            log_action(connection, current_user, "user_update", f"{target['username']} kullanıcısı güncellendi")

        self.send_json({"ok": True})

    def handle_delete_user(self, current_user):
        try:
            payload = self.read_json_body()
        except json.JSONDecodeError:
            self.send_json({"ok": False, "error": "Geçersiz kullanıcı bilgisi."}, status=400)
            return

        with get_connection() as connection:
            target = self.get_target_user(connection, payload)

            if not target:
                self.send_json({"ok": False, "error": "Kullanıcı bulunamadı."}, status=404)
                return

            if target["username"] == OWNER_USERNAME:
                self.send_json({"ok": False, "error": "Ana yönetici hesabı silinemez."}, status=403)
                return

            connection.execute("DELETE FROM sessions WHERE user_id = ?", (target["id"],))
            connection.execute("DELETE FROM users WHERE id = ?", (target["id"],))
            log_action(connection, current_user, "user_delete", f"{target['username']} kullanıcısı silindi")

        self.send_json({"ok": True})

    def handle_change_password(self, current_user):
        try:
            payload = self.read_json_body()
        except json.JSONDecodeError:
            self.send_json({"ok": False, "error": "Geçersiz parola bilgisi."}, status=400)
            return

        current_password = str(payload.get("currentPassword", ""))
        new_password = str(payload.get("newPassword", ""))

        if len(new_password) < 6:
            self.send_json({"ok": False, "error": "Yeni parola en az 6 karakter olmalı."}, status=400)
            return

        with get_connection() as connection:
            row = connection.execute(
                "SELECT * FROM users WHERE id = ? AND active = 1",
                (current_user["id"],),
            ).fetchone()

            if not row or not verify_password(current_password, row["password_hash"]):
                self.send_json({"ok": False, "error": "Mevcut parola hatalı."}, status=401)
                return

            connection.execute(
                "UPDATE users SET password_hash = ? WHERE id = ?",
                (hash_password(new_password), current_user["id"]),
            )
            log_action(connection, current_user, "password_change", "Parola değiştirildi")

        self.send_json({"ok": True})

    def handle_admin_audit_log(self):
        with get_connection() as connection:
            rows = connection.execute(
                """
                SELECT username, action, detail, created_at
                FROM audit_log
                ORDER BY id DESC
                LIMIT 120
                """,
            ).fetchall()

        self.send_json(
            {
                "ok": True,
                "items": [
                    {
                        "username": row["username"],
                        "action": row["action"],
                        "detail": row["detail"],
                        "createdAt": row["created_at"],
                    }
                    for row in rows
                ],
            },
        )

    def handle_database_backup(self, user):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"ic_denetim_backup_{timestamp}.db"

        with get_connection() as connection:
            log_action(connection, user, "database_backup", filename)

        with tempfile.TemporaryDirectory() as temp_dir:
            snapshot = Path(temp_dir) / "backup.db"
            snapshot_database(DB_PATH, snapshot)
            body = snapshot.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", "application/octet-stream")
        self.send_header("Content-Disposition", f'attachment; filename="{filename}"')
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def handle_database_restore(self, user):
        if self.headers.get("X-Confirm-Restore") != "replace-database":
            self.send_json({"ok": False, "error": "Geri yükleme onayı gerekli."}, status=400)
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length <= 100 * 1024 * 1024:
                raise ValueError("Yedek dosyası boş veya 100 MB sınırını aşıyor.")
            body = self.rfile.read(length)
            if len(body) != length or not body.startswith(b"SQLite format 3\x00"):
                raise ValueError("Geçerli bir SQLite .db yedeği seçin.")
            with tempfile.TemporaryDirectory() as temp_dir:
                upload = Path(temp_dir) / "uploaded.db"
                upload.write_bytes(body)
                safety = restore_database(DB_PATH, upload, OWNER_USERNAME, user["username"])
        except (ValueError, sqlite3.Error, OSError) as error:
            self.send_json({"ok": False, "error": "Geri yükleme tamamlanamadı. " + str(error)}, status=400)
            return
        self.send_logout_json()

    def read_state(self):
        with get_connection() as connection:
            return build_state_from_records(connection)

    def write_state(self, user):
        try:
            payload = self.read_json_body()
        except json.JSONDecodeError:
            self.send_json({"ok": False, "error": "Invalid JSON"}, status=400)
            return

        with get_connection() as connection:
            if not isinstance(payload, dict):
                self.send_json({"ok": False, "error": "Geçersiz kayıt paketi."}, status=400)
                return
            try:
                checked = {}
                for collection in COLLECTIONS:
                    records = payload.get(collection, [])
                    if isinstance(records, dict):
                        records = [records]
                    if not isinstance(records, list):
                        raise ValueError("Geçersiz kayıt listesi")
                    checked[collection] = []
                    for record in records:
                        if not isinstance(record, dict) or not record_key(collection, record):
                            raise ValueError("Geçersiz kayıt")
                        row = connection.execute("SELECT value FROM records WHERE collection=? AND record_key=?", (collection, record_key(collection, record))).fetchone()
                        existing = json.loads(row[0]) if row else None
                        checked[collection].append(authorize_record(user, collection, record, existing))
                deletions = payload.get("deletedRecords", [])
                if not isinstance(deletions, list):
                    raise ValueError("Geçersiz silme listesi")
                for item in deletions:
                    if not isinstance(item, dict) or item.get("collection") not in COLLECTIONS:
                        raise ValueError("Geçersiz silme kaydı")
                    row = connection.execute("SELECT value FROM records WHERE collection=? AND record_key=?", (item["collection"], str(item.get("key", "")))).fetchone()
                    if row:
                        record = json.loads(row[0])
                        authorize_record(user, item["collection"], record, record, deleting=True)
                checked["deletedRecords"] = deletions
            except (PermissionError, ValueError, TypeError) as error:
                self.send_json({"ok": False, "error": str(error)}, status=403)
                return
            delete_records(connection, checked)
            upsert_records(connection, checked)
            collections = [
                collection
                for collection in COLLECTIONS
                if isinstance(payload.get(collection), (list, dict))
            ]
            detail = ", ".join(collections) if collections else "Kayıt güncellendi"
            log_action(connection, user, "state_save", detail)

        self.send_json({"ok": True})


def main():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    get_connection().close()
    address = (HOST, PORT)
    server = ThreadingHTTPServer(address, DashboardHandler)
    display_host = "127.0.0.1" if HOST == "0.0.0.0" else HOST
    url = f"http://{display_host}:{PORT}/"

    print("Ic Denetim Baskanligi paneli calisiyor..", flush=True)
    print(f"Tarayicida ac: {url}", flush=True)
    print(f"SQLite veritabani: {DB_PATH}", flush=True)
    print("Durdurmak icin PyCharm terminalinde Ctrl+C kullan.", flush=True)

    if OPEN_BROWSER:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nIc Denetim Baskanligi paneli kapatildi.", flush=True)
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
