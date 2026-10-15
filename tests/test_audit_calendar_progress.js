const fs = require("fs"), vm = require("vm"), assert = require("assert");
const source = fs.readFileSync("static/script.js", "utf8");
const panel = {};
const context = { document: { querySelector: () => panel }, escapeHtml: value => String(value) };
vm.createContext(context);
vm.runInContext(source.slice(source.indexOf("function getAuditCalendarProgress("), source.indexOf("function renderDashboardSidePanel(")), context);
const progress = (start, end, day) => context.getAuditCalendarProgress({start, end}, new Date(`${day}T12:00:00`));
assert.equal(progress("2026-10-01", "2026-10-20", "2026-10-10").percent, 45);
assert.equal(progress("2026-10-01", "2026-10-20", "2026-10-10").remaining, 11);
assert.equal(progress("2026-10-01", "2026-10-20", "2026-09-30").state, "upcoming");
assert.equal(progress("2026-10-01", "2026-10-20", "2026-10-21").state, "ended");
assert.equal(progress("2026-10-01", "2026-10-20", "2026-10-20").state, "ongoing");
assert.equal(progress("2026-10-20", "2026-10-20", "2026-10-20").remaining, 1);
assert.equal(progress("2026-10-20", "2026-10-20", "2026-10-20").percent, 0);
for (const [start,end] of [["", "2026-10-20"], ["2026-02-30", "2026-10-20"], ["2026-10-21", "2026-10-20"]]) {
  assert.equal(progress(start, end, "2026-10-15").state, "unknown");
}
assert.equal(progress("2024-02-28", "2024-03-01", "2024-02-29").remaining, 2);
context.renderAuditCalendarSummary([
 { start:"2000-01-01", end:"2000-01-02", status:"İptal Edildi" },
 { start:"2000-01-01", end:"2000-01-02" },
 { start:"2999-01-01", end:"2999-01-02" },
 {}
]);
assert.ok(panel.innerHTML.includes("<b>1</b> Süresi bitti"));
assert.ok(panel.innerHTML.includes("<b>1</b> Başlamadı"));
assert.ok(panel.innerHTML.includes("<b>1</b> denetimde tarih eksik"));
assert.ok(!panel.innerHTML.includes("NaN"));
assert.ok(!panel.innerHTML.includes("Devam edenlerde ortalama"));
console.log("PASS: calendar percentages, end-day boundary, single-day audits, leap days, invalid dates, cancelled exclusion and empty ongoing summary.");
