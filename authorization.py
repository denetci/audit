"""Server-side module permissions and record projections."""
from datetime import datetime

MODULES = {"dashboard": "Faaliyet Paneli", "audits": "Denetimler", "approvals": "Olurlar", "personnel": "Personel", "leaves": "Personel İzinleri", "duties": "Görev Durumu", "budget": "Bütçe İşlemleri", "stock": "Stok İşlemleri", "monitoring": "İzleme Faaliyetleri", "reports": "Rapor Arşivi"}
COLLECTION_MODULE = {"approvals": "approvals", "leaves": "leaves", "leaveRights": "leaves", "dutyRecords": "duties", "budgetItems": "budget", "budgetExpenses": "budget", "stockItems": "stock", "personnelRecords": "personnel"}
MONITOR_FIELDS = {"monitoringAuditName", "monitoringOfficer", "findingCount", "openFindingCount", "monitoringDueDate"}
AUDIT_SUMMARY = {"year", "no", "start", "end", "unit", "scope", "type", "team", "supervisor", "status", "deletedAt"}
DIRECTORY_FIELDS = {"no", "name", "title", "group", "unit", "status"}

def normalize_permissions(value):
    if not isinstance(value, dict) or any(k not in MODULES or v not in ("none", "view", "edit") for k, v in value.items()):
        raise ValueError("Geçersiz modül yetkisi")
    return {k: value.get(k, "none") for k in MODULES}

def access(user, module, edit=False):
    if user.get("owner"):
        return True
    level = user.get("permissions", {}).get(module, "none")
    return level == "edit" if edit else level in ("view", "edit")

def record_module(collection, record):
    if collection == "audits":
        return "audits"
    if collection == "reportDocuments":
        return "monitoring" if record.get("documentType") == "İzleme Sonuçları Tablosu" else "reports"
    return COLLECTION_MODULE.get(collection, "")

def project_record(user, collection, record):
    if collection == "audits":
        if access(user, "audits"):
            return {k:v for k,v in record.items() if k not in MONITOR_FIELDS or access(user, "monitoring")}
        if any(access(user, m) for m in ("dashboard", "reports", "monitoring")):
            allowed = AUDIT_SUMMARY | (MONITOR_FIELDS if access(user, "monitoring") else set())
            return {k:v for k,v in record.items() if k in allowed}
        return None
    if collection == "personnelRecords" and not access(user, "personnel"):
        if any(access(user, m) for m in ("leaves", "duties")):
            return {k:v for k,v in record.items() if k in DIRECTORY_FIELDS}
        return None
    return record if access(user, record_module(collection, record)) else None

def filter_state(user, state, collections):
    result = {"version": state.get("version"), "user": user}
    for collection in collections:
        result[collection] = [p for r in state.get(collection, []) if (p := project_record(user, collection, r)) is not None]
    return result

def authorize_record(user, collection, incoming, existing=None, deleting=False):
    module = record_module(collection, incoming)
    if deleting:
        if not access(user, module, True) or (collection == "audits" and any(k in incoming for k in MONITOR_FIELDS) and not access(user, "monitoring", True)):
            raise PermissionError("Bu kaydı silme yetkiniz yok.")
    elif collection == "audits" and existing:
        if not (access(user, "audits", True) or access(user, "monitoring", True)):
            raise PermissionError("Bu modülde değişiklik yetkiniz yok.")
        # Clients receive projections: missing fields must never erase hidden data.
        for key, value in incoming.items():
            if existing.get(key) != value:
                if not access(user, "monitoring" if key in MONITOR_FIELDS else "audits", True):
                    raise PermissionError("Bu alanı değiştirme yetkiniz yok.")
    else:
        if not access(user, module, True):
            raise PermissionError("Bu modülde değişiklik yetkiniz yok.")
        if existing and not access(user, record_module(collection, existing), True):
            raise PermissionError("Mevcut kaydı değiştirme yetkiniz yok.")
        if collection == "audits" and any(k in incoming for k in MONITOR_FIELDS) and not access(user, "monitoring", True):
            raise PermissionError("İzleme alanlarını değiştirme yetkiniz yok.")
    merged = {**(existing or {}), **incoming}
    if collection in ("leaves", "leaveRights", "dutyRecords"):
        for record in (existing, merged):
            if record and int(record.get("year") or str(record.get("start", ""))[:4] or 0) < datetime.now().year:
                raise PermissionError("Geçmiş yıl görev ve izin kayıtları salt okunurdur.")
    return merged
