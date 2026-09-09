const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync('static/script.js','utf8');
const context={sharedStateLoaded:true,sharedCollections:['dutyRecords'],lastSharedRecordJson:{},deletedRecords:[],dutyRecords:[{id:1,year:'2026',note:'old'}],localStorage:{setItem(){}},recordKeyForCollection:(c,r)=>String(r.id),API_STATE_URL:'/api/state'};
let fail=true; const sent=[];
context.apiFetch=async(url,options)=>{sent.push(options.body);return {ok:!fail,json:async()=>({error:'test failure'})};};
vm.createContext(context);
vm.runInContext(source.slice(source.indexOf('function acknowledgeSavedState('),source.indexOf('async function migrateLocalStorageToSqlite()')),context);
(async()=>{
 await assert.rejects(context.persistDutyChange({id:1,year:'2026',note:'new'}),/test failure/);
 assert.equal(context.dutyRecords[0].note,'old');assert.equal(Object.keys(context.lastSharedRecordJson).length,0);
 fail=false;await context.persistDutyChange({id:1,year:'2026',note:'new'});
 assert.equal(context.dutyRecords[0].note,'new');
 context.dutyRecords[0].note='later edit';
 context.acknowledgeSavedState({dutyRecords:[{id:1,year:'2026',note:'new'}]});
 assert.notEqual(JSON.stringify(context.dutyRecords[0]),context.lastSharedRecordJson.dutyRecords['1']);
 await context.persistDutyChange({id:1,year:'2026'},true);assert.equal(context.dutyRecords.length,0);
 context.sharedStateLoaded=false;await assert.rejects(context.persistDutyChange({id:2}),/Sunucu/);
 console.log('PASS: failed save preserves data; successful save commits; later edits stay pending; deletion acknowledged; disconnected save rejected');
})().catch(e=>{console.error(e);process.exitCode=1});
