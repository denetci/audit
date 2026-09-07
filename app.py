from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import sqlite3
from pathlib import Path
from urllib.parse import urlparse
import webbrowser


HOST = "127.0.0.1"
PORT = 8000
PROJECT_DIR = Path(__file__).resolve().parent
STATIC_DIR = PROJECT_DIR / "static"
DB_PATH = PROJECT_DIR / "ic_denetim.db"
STATE_KEY = "main"

COLLECTIONS = (
    "audits",
    "approvals",
    "leaves",
    "leaveRights",
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

    if collection in ("leaves", "leaveRights"):
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


def get_connection():
    connection = sqlite3.connect(DB_PATH)
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
    migrate_legacy_state(connection)
    return connection


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
        if urlparse(self.path).path == "/api/state":
            self.send_json(self.read_state())
            return

        super().do_GET()

    def do_POST(self):
        if urlparse(self.path).path == "/api/state":
            self.write_state()
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

    def read_state(self):
        with get_connection() as connection:
            return build_state_from_records(connection)

    def write_state(self):
        content_length = int(self.headers.get("Content-Length", "0"))
        raw_body = self.rfile.read(content_length)

        try:
            payload = json.loads(raw_body.decode("utf-8"))
        except json.JSONDecodeError:
            self.send_json({"ok": False, "error": "Invalid JSON"}, status=400)
            return

        with get_connection() as connection:
            delete_records(connection, payload)
            upsert_records(connection, payload)

        self.send_json({"ok": True})


def main():
    get_connection().close()
    address = (HOST, PORT)
    server = ThreadingHTTPServer(address, DashboardHandler)
    url = f"http://{HOST}:{PORT}/"

    print("Ic Denetim Baskanligi paneli calisiyor..", flush=True)
    print(f"Tarayicida ac: {url}", flush=True)
    print("Durdurmak icin PyCharm terminalinde Ctrl+C kullan.", flush=True)

    webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nIc Denetim Baskanligi paneli kapatildi.", flush=True)
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
