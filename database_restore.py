"""Validated SQLite backup/restore; uploaded schema is never executed."""
import json
import secrets
import sqlite3
from contextlib import closing
from datetime import datetime
from pathlib import Path

TABLES = ('users', 'records', 'app_state', 'audit_log')
REQUIRED = {
    'users': {'id', 'username', 'password_hash', 'role', 'display_name', 'active'},
    'records': {'collection', 'record_key', 'value'},
    'app_state': {'key', 'value'},
    'audit_log': {'id', 'username', 'action', 'detail'},
}

def snapshot_database(source_path, target_path):
    with closing(sqlite3.connect(str(source_path))) as source, closing(sqlite3.connect(str(target_path))) as target:
        source.backup(target)


def restore_database(db_path, upload_path, owner_username, actor):
    db_path = Path(db_path)
    with closing(sqlite3.connect(Path(upload_path).resolve().as_uri() + '?mode=ro', uri=True)) as source:
        source.execute('PRAGMA trusted_schema=OFF')
        if source.execute('PRAGMA quick_check').fetchall() != [('ok',)]:
            raise ValueError('Yedek dosyasının bütünlük kontrolü başarısız.')
        schema = dict(source.execute("SELECT name, type FROM sqlite_master WHERE name NOT LIKE 'sqlite_%'"))
        for table in TABLES:
            if schema.get(table) != 'table':
                raise ValueError('Bu dosya uygulamaya ait tam bir veritabanı yedeği değil.')
            columns = {r[1] for r in source.execute(f'PRAGMA table_info({table})')}
            if not REQUIRED[table] <= columns:
                raise ValueError('Yedek dosyasının tablo yapısı uyumsuz.')
        owner = source.execute('SELECT 1 FROM users WHERE username=? AND active=1 AND role=?', (owner_username, 'admin')).fetchone()
        if not owner:
            raise ValueError('Yedekte aktif ana yönetici hesabı bulunamadı.')
        from authorization import normalize_permissions
        user_columns = {r[1] for r in source.execute('PRAGMA table_info(users)')}
        if 'permissions' in user_columns:
            for (value,) in source.execute('SELECT permissions FROM users WHERE permissions IS NOT NULL'):
                normalize_permissions(json.loads(value))
        for (value,) in source.execute('SELECT value FROM records'):
            if not isinstance(json.loads(value), dict):
                raise ValueError('Yedekte geçersiz kayıt var.')
        with closing(sqlite3.connect(str(db_path))) as target:
            target.execute('BEGIN IMMEDIATE')
            backup_dir = db_path.parent / 'backups'
            backup_dir.mkdir(exist_ok=True)
            safety = backup_dir / ('before_restore_' + datetime.now().strftime('%Y%m%d_%H%M%S') + '_' + secrets.token_hex(4) + '.db')
            try:
                # A separate reader can snapshot while this transaction blocks writers.
                snapshot_database(db_path, safety)
                target.execute('DELETE FROM sessions')
                for table in TABLES:
                    existing = [r[1] for r in target.execute(f'PRAGMA table_info({table})')]
                    supplied = {r[1] for r in source.execute(f'PRAGMA table_info({table})')}
                    columns = [name for name in existing if name in supplied]
                    names = ','.join('"' + name + '"' for name in columns)
                    placeholders = ','.join('?' for _ in columns)
                    target.execute(f'DELETE FROM {table}')
                    target.executemany(f'INSERT INTO {table} ({names}) VALUES ({placeholders})', source.execute(f'SELECT {names} FROM {table}'))
                target.execute("INSERT OR REPLACE INTO app_state(key,value) VALUES('bootstrap_done','true')")
                target.execute('INSERT INTO audit_log(username,action,detail) VALUES(?,?,?)', (actor, 'database_restore', 'Yedek geri yüklendi. Önceki veritabanı: ' + safety.name))
                target.commit()
            except Exception:
                target.rollback()
                raise
    return safety.name
