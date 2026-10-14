const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const context = { window: {}, Date, Map, Set, Number, String };
vm.createContext(context);
vm.runInContext(fs.readFileSync('static/turkey-map-data.js', 'utf8'), context);
vm.runInContext(fs.readFileSync('static/turkey-map.js', 'utf8'), context);
const {classifyUnit, groupRecords, metricValue} = context.window.TurkeyGeography;
const provinces = context.window.TURKEY_MAP_DATA.provinces;
assert.equal(provinces.length,81);
assert.equal(new Set(provinces.map(p=>p.name)).size,81);
for (const p of provinces) {
  assert(p.path.startsWith('M') && !p.path.includes('NaN'));
  assert.equal(classifyUnit(p.name + ' İl Müdürlüğü').province, p.name);
  assert.equal(classifyUnit(p.name.toLocaleUpperCase('tr-TR') + ' / Birim').province, p.name);
}
for (const name of ['Tütün ve Alkol Dairesi Başkanlığı', 'İç Denetim Başkanlığı', 'Bakanlık Ankara Birimi', 'Vanlılar Birimi', 'Karsiyaka Birimi', '']) {
  assert.equal(classifyUnit(name).area,'central',name);
}
assert.equal(classifyUnit('  İSTANBUL İl Tarım Müdürlüğü').province,'İstanbul');
assert.equal(classifyUnit('Istanbul İl Tarım Müdürlüğü').province,'İstanbul');
assert.equal(classifyUnit('Afyon İl Müdürlüğü').province,'Afyonkarahisar');
assert.equal(classifyUnit('Hakkari İl Müdürlüğü').province,'Hakkâri');
assert.equal(classifyUnit('Ankara-Birim').province,'Ankara');
const a={key:'2026-1',unit:'Ankara İl Müdürlüğü',monitoring:{open:3,dueDate:'2026-10-13'}};
const b={key:'2025-1',unit:'Ankara İl Müdürlüğü',monitoring:{open:2,dueDate:'2026-10-14'}};
const c={key:'2026-2',unit:'Merkez Birim',monitoring:{open:4,dueDate:'2026-10-12'}};
const grouped=groupRecords([a,a,b,c],'open','2026-10-14');
assert.equal(grouped.groups.get('Ankara').items.length,2);
assert.equal(grouped.groups.get('Ankara').value,5);
assert.equal(grouped.central.length,1);
assert.equal(grouped.groups.get('İzmir').value,0);
assert.equal(groupRecords([a,b,c],'overdue','2026-10-14').groups.get('Ankara').value,3);
assert.equal(metricValue(b,'overdue','2026-10-14'),0); // Due today is not overdue.
assert.equal(metricValue({monitoring:{open:-2}},'open'),0);
assert.equal(metricValue({},'open'),0);
assert.equal(metricValue(c,'audits'),1);
console.log('PASS: 81 provinces, Turkish/case/alias matching, prefix boundaries, central records, deduplication, open/overdue metrics.');
