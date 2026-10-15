const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync('static/script.js','utf8');
const context={addMonths:()=>'',monitoringExcludedTypes:new Set(),isAuditDeleted:a=>Boolean(a.deletedAt),
  monitoringScopeFilter:{value:'year'},monitoringStatusFilter:{value:'Tümü'},monitoringSearchInput:{value:''},
  normalizeText:v=>String(v).toLowerCase(),auditMatchesYear:a=>a.year==='2026',
  audits:[{year:'2026',no:1,status:'İzleme Sürecinde'},
    {year:'2026',no:2,status:'İzleme Sürecinde',findingCount:0,openFindingCount:0},
    {year:'2026',no:3,status:'İzleme Sürecinde',findingCount:5,openFindingCount:0},
    {year:'2026',no:4,status:'İzleme Sürecinde',findingCount:5,openFindingCount:2},
    {year:'2025',no:5,status:'İzleme Sürecinde',findingCount:0,openFindingCount:0}]};
vm.createContext(context);
vm.runInContext(source.slice(source.indexOf('function getMonitoringDetails('),source.indexOf('function sumMonitoringField(')),context);
for(const audit of [{},{findingCount:0,openFindingCount:0}]){
  const details=context.getMonitoringDetails(audit);
  assert.equal(context.isMonitoringCompleted(details),false);
  assert.equal(context.getMonitoringStatus(details),'İzleme bilgisi bekleniyor');
  assert.equal(context.getMonitoringStatusClass(details),'waiting');
}
assert.equal(context.getMonitoringStatus(context.getMonitoringDetails({findingCount:5,openFindingCount:0})),'İzleme Tamamlandı');
assert.equal(context.getMonitoringStatus(context.getMonitoringDetails({findingCount:5})),'İzleme Devam Ediyor');
const numbers=()=>Array.from(context.getFilteredMonitoringAudits(),a=>a.no);
context.monitoringStatusFilter.value='completed';assert.deepEqual(numbers(),[3]);
context.monitoringStatusFilter.value='pending';assert.deepEqual(numbers(),[1,2]);
context.monitoringStatusFilter.value='open';assert.deepEqual(numbers(),[4,1,2]);
context.monitoringScopeFilter.value='allOpen';assert.deepEqual(numbers(),[4,5,1,2]);
console.log('PASS: missing/zero counts stay pending; positive closed findings complete; pending records remain in unfinished/all-years filters.');

context.monitoringScopeFilter.value='year';
context.monitoringStatusFilter.value='Tümü';
assert.deepEqual(numbers(),[4,1,2,3]);
vm.runInContext('monitoringSort.direction="desc"',context);
assert.deepEqual(numbers(),[3,1,2,4]);
context.audits[0].findingCount=12;
vm.runInContext('monitoringSort={key:"findingCount",direction:"asc"}',context);
assert.deepEqual(numbers(),[2,3,4,1]);
vm.runInContext('monitoringSort.direction="desc"',context);
assert.deepEqual(numbers(),[1,3,4,2]);
context.audits[0].monitoringDueDate='2026-12-01';
context.audits[1].monitoringDueDate='2026-02-01';
vm.runInContext('monitoringSort={key:"dueDate",direction:"asc"}',context);
assert.deepEqual(numbers(),[2,1,3,4]);
vm.runInContext('monitoringSort.direction="desc"',context);
assert.deepEqual(numbers(),[1,2,3,4]);
console.log('PASS: ongoing first, status reversal, numeric counts, dates and missing dates last.');
