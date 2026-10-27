const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync('static/script.js','utf8');
const ctx={numberValue:v=>Number(v)||0,overtimeDaysInMonth:(y,m)=>new Date(y,m,0).getDate(),overtimeDetailOffDayCounts:()=>({sundays:0,holidays:0})};vm.createContext(ctx);
vm.runInContext(source.slice(source.indexOf('function buildOvertimeTimesheetRows('),source.indexOf('function printOvertimeTimesheet(')),ctx);
const records=[{name:'Test',year:2026,month:10,overtimeHours:99,overtimeDetail:{entries:{1:{total:3},2:{total:1.5},31:{total:2}}}},{name:'Empty',year:2026,month:10},{name:'Other',year:2026,month:9,overtimeDetail:{entries:{1:{total:5}}}}];
const rows=ctx.buildOvertimeTimesheetRows(records,2026,10,"Test");assert.equal(rows.length,1);assert.equal(rows[0].total,6.5);assert.equal(rows[0].hours.length,31);assert.equal(rows[0].hours[30],2);
assert.equal(ctx.buildOvertimeTimesheetRows([{...records[0],year:2024,month:2}],2024,2,"Test")[0].hours.length,29);
console.log('PASS: saved daily hours, fractional totals, month filter, empty records and leap month');

const mixed=[...records,{name:'Another',year:2026,month:10,overtimeDetail:{entries:{1:{total:5}}}}];
assert.equal(ctx.buildOvertimeTimesheetRows(mixed,2026,10,'Test').length,1);
assert.equal(ctx.buildOvertimeTimesheetRows(mixed,2026,10,'Another')[0].total,5);
assert.equal(ctx.buildOvertimeTimesheetRows(mixed,2026,10,'').length,0);
console.log('PASS: only selected worker, no selection never prints all workers');
