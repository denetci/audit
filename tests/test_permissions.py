import json
import os
import sys
import tempfile
import threading
import unittest
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import app
from authorization import normalize_permissions

class PermissionAPI(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tmp = tempfile.TemporaryDirectory()
        app.DB_PATH = Path(cls.tmp.name) / 'test.db'
        os.environ['IDB_ADMIN_PASSWORD'] = 'test-only-password'
        cls.server = app.ThreadingHTTPServer(('127.0.0.1', 0), app.DashboardHandler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.url = 'http://127.0.0.1:' + str(cls.server.server_port)
        cls.year = str(datetime.now().year)
    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown(); cls.server.server_close(); cls.tmp.cleanup()
    def setUp(self):
        with app.get_connection() as c:
            c.execute('DELETE FROM records'); c.execute('DELETE FROM sessions')
            c.execute('DELETE FROM users WHERE username != ?', (app.OWNER_USERNAME,))
            for name, perms in [('leave', {'leaves':'edit'}), ('duty', {'duties':'view'}), ('budget', {'budget':'edit'}), ('monitor', {'monitoring':'edit'}), ('none', {})]:
                c.execute('INSERT INTO users(username,email,password_hash,display_name,role,permissions) VALUES(?,?,?,?,?,?)', (name,name+'@test.invalid', app.hash_password('testpass'), name,'user', json.dumps(normalize_permissions(perms))))
            app.upsert_records(c, {'leaves':[{'id':1,'year':self.year,'person':'P','type':'Rapor','note':'private'}], 'dutyRecords':[{'id':2,'year':self.year,'person':'P'}], 'budgetItems':[{'id':1,'year':self.year,'code':'03.5 HİZMET ALIMLARI','allocated':1000,'additional':0}], 'budgetExpenses':[{'id':1,'itemId':1,'year':self.year,'amount':250,'payee':'Firma','purpose':'Bakım'}], 'personnelRecords':[{'no':1,'group':'G','name':'P','certificate':'private'}], 'audits':[{'no':1,'year':self.year,'scope':'Audit','findingCount':1,'privateField':'secret'}]})
    def request(self, path, body=None, cookie=None):
        req=urllib.request.Request(self.url+path, data=json.dumps(body).encode() if body is not None else None, headers={'Content-Type':'application/json', **({'Cookie':cookie} if cookie else {})})
        try:
            with urllib.request.urlopen(req) as r: return r.status, json.load(r), r.headers
        except urllib.error.HTTPError as r: return r.code,json.load(r),r.headers
    def login(self,name):
        status,data,headers=self.request('/api/login',{'username':name,'password':'test-only-password' if name==app.OWNER_USERNAME else 'testpass'})
        self.assertEqual(status,200)
        return headers['Set-Cookie'].split(';')[0]
    def test_duty_projection_and_readonly(self):
        cookie=self.login('duty')
        _,data,_=self.request('/api/state',cookie=cookie)
        self.assertEqual(data['leaves'],[]); self.assertEqual(len(data['dutyRecords']),1)
        self.assertNotIn('certificate',data['personnelRecords'][0]); self.assertEqual(data['audits'],[])
        self.assertEqual(self.request('/api/state',{'dutyRecords':[{'id':2,'year':self.year,'person':'Changed'}]},cookie)[0],403)
        self.assertEqual(self.request('/api/state',{'deletedRecords':[{'collection':'dutyRecords','key':'2'}]},cookie)[0],403)
    def test_leave_edit_and_atomic_mixed_denial(self):
        cookie=self.login('leave')
        self.assertEqual(self.request('/api/state',{'leaves':[{'id':1,'year':self.year,'person':'Updated'}]},cookie)[0],200)
        self.assertEqual(self.request('/api/state',{'leaves':[{'id':1,'year':self.year,'person':'Bad'}],'dutyRecords':[{'id':2,'year':self.year}]},cookie)[0],403)
        _,state,_=self.request('/api/state',cookie=cookie)
        self.assertEqual(state['leaves'][0]['person'],'Updated'); self.assertEqual(state['dutyRecords'],[])
    def test_historical_lock_owner_too(self):
        cookie=self.login(app.OWNER_USERNAME)
        self.assertEqual(self.request('/api/state',{'leaves':[{'id':3,'year':str(int(self.year)-1)}]},cookie)[0],403)
        self.assertEqual(self.request('/api/state',{'approvals':[{'no':1,'year':str(int(self.year)-1)}]},cookie)[0],200)
    def test_monitoring_preserves_hidden_audit_fields(self):
        cookie=self.login('monitor')
        _,state,_=self.request('/api/state',cookie=cookie)
        record=state['audits'][0]; self.assertNotIn('privateField',record)
        record['findingCount']=4
        self.assertEqual(self.request('/api/state',{'audits':[record]},cookie)[0],200)
        with app.get_connection() as c:
            saved=json.loads(c.execute("SELECT value FROM records WHERE collection='audits'").fetchone()[0])
        self.assertEqual(saved['privateField'],'secret')
        record['scope']='forbidden'
        self.assertEqual(self.request('/api/state',{'audits':[record]},cookie)[0],403)
    def test_owner_permissions_and_live_revocation(self):
        owner=self.login(app.OWNER_USERNAME); cookie=self.login('leave')
        _,data,_=self.request('/api/admin/users',cookie=owner)
        target=next(x for x in data['users'] if x['username']=='leave')
        body={**target,'permissions':{'leaves':'view'}}
        self.assertEqual(self.request('/api/admin/users/update',body,owner)[0],200)
        self.assertEqual(self.request('/api/state',{'leaves':[{'id':1,'year':self.year}]},cookie)[0],403)
        self.assertEqual(self.request('/api/admin/users',cookie=cookie)[0],403)
        self.assertEqual(self.request('/api/admin/db/backup',cookie=cookie)[0],403)
        _,logs,_=self.request('/api/admin/audit-log',cookie=owner)
        self.assertTrue(any(x['action']=='permissions_update' for x in logs['items']))
    def test_no_access_and_new_user(self):
        cookie=self.login('none'); _,data,_=self.request('/api/state',cookie=cookie)
        self.assertTrue(all(data[c]==[] for c in app.COLLECTIONS))
        owner=self.login(app.OWNER_USERNAME)
        self.assertEqual(self.request('/api/admin/users',{'username':'new','email':'new@test.invalid','password':'testpass'},owner)[0],200)
        _,data,_=self.request('/api/state',cookie=self.login('new'))
        self.assertTrue(all(data[c]==[] for c in app.COLLECTIONS))
    def test_budget_permission_and_refresh(self):
        cookie=self.login('budget')
        status,data,_=self.request('/api/state',cookie=cookie)
        self.assertEqual(status,200)
        self.assertEqual(len(data['budgetItems']),1)
        self.assertEqual(len(data['budgetExpenses']),1)
        self.assertEqual(data['leaves'],[])
        item={'id':1,'year':self.year,'code':'03.5 HİZMET ALIMLARI','allocated':1500,'additional':500}
        expense={'id':2,'itemId':1,'year':self.year,'amount':300,'payee':'Kişi','purpose':'Yolluk','date':self.year+'-09-10'}
        self.assertEqual(self.request('/api/state',{'budgetItems':[item],'budgetExpenses':[expense]},cookie)[0],200)
        _,data,_=self.request('/api/state',cookie=cookie)
        self.assertEqual(data['budgetItems'][0]['allocated'],1500)
        self.assertTrue(any(record['purpose']=='Yolluk' for record in data['budgetExpenses']))
        self.assertEqual(self.request('/api/state',{'dutyRecords':[{'id':5,'year':self.year}]},cookie)[0],403)
    def test_document_type_relabel_denied(self):
        with app.get_connection() as c:
            app.upsert_records(c,{'reportDocuments':[{'id':'d','documentType':'Rapor','fileData':'private'}]})
        cookie=self.login('monitor')
        self.assertEqual(self.request('/api/state',{'reportDocuments':[{'id':'d','documentType':'İzleme Sonuçları Tablosu'}]},cookie)[0],403)

    def test_restore_replaces_records_and_keeps_safety_copy(self):
        from database_restore import snapshot_database, restore_database
        backup = Path(self.tmp.name) / 'restore.db'
        snapshot_database(app.DB_PATH, backup)
        with app.get_connection() as c:
            c.execute("DELETE FROM users WHERE username='leave'")
            c.execute("UPDATE records SET value=? WHERE collection='leaves'", (json.dumps({'id':1, 'year':self.year, 'person':'AFTER'}),))
        safety = restore_database(app.DB_PATH, backup, app.OWNER_USERNAME, app.OWNER_USERNAME)
        self.assertTrue((app.DB_PATH.parent / 'backups' / safety).exists())
        with app.get_connection() as c:
            self.assertIsNotNone(c.execute("SELECT 1 FROM users WHERE username='leave'").fetchone())
            self.assertEqual(c.execute('SELECT COUNT(*) FROM sessions').fetchone()[0], 0)
            self.assertEqual(json.loads(c.execute("SELECT value FROM records WHERE collection='leaves'").fetchone()[0])['person'], 'P')
        self.login('leave')

    def test_restore_invalid_backup_preserves_database(self):
        from database_restore import restore_database
        import sqlite3
        bad = Path(self.tmp.name) / 'bad.db'
        bad.write_bytes(b'not a database')
        with self.assertRaises(sqlite3.DatabaseError):
            restore_database(app.DB_PATH, bad, app.OWNER_USERNAME, app.OWNER_USERNAME)
        with app.get_connection() as c:
            self.assertEqual(c.execute("SELECT COUNT(*) FROM records WHERE collection='leaves'").fetchone()[0],1)
        self.assertEqual(self.request('/api/admin/db/restore',{},self.login('duty'))[0],403)
        self.assertEqual(self.request('/api/admin/db/restore',{},self.login(app.OWNER_USERNAME))[0],400)

    def test_restore_http_requires_relogin(self):
        from database_restore import snapshot_database
        backup = Path(self.tmp.name) / 'http_restore.db'
        snapshot_database(app.DB_PATH, backup)
        cookie=self.login(app.OWNER_USERNAME)
        request=urllib.request.Request(self.url+'/api/admin/db/restore', data=backup.read_bytes(), headers={'Cookie':cookie,'Content-Type':'application/octet-stream','X-Confirm-Restore':'replace-database'})
        with urllib.request.urlopen(request) as response:
            self.assertEqual(response.status,200)
        self.assertEqual(self.request('/api/state',cookie=cookie)[0],401)
        self.login('leave')

    def test_duty_refresh_retains_saved_change(self):
        cookie = self.login(app.OWNER_USERNAME)
        record = {'id':2, 'year':self.year, 'person':'P', 'dutyPlace':'Updated location', 'status':'Görevde', 'start':self.year+'-09-01'}
        self.assertEqual(self.request('/api/state', {'dutyRecords':[record]}, cookie)[0],200)
        for _ in range(2):
            status, data, _ = self.request('/api/state',cookie=cookie)
            self.assertEqual(status,200)
            self.assertEqual(data['dutyRecords'][0]['dutyPlace'],'Updated location')

if __name__=='__main__': unittest.main()
