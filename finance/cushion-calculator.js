(function () {
"use strict";
var form = document.getElementById("cushion-form");
var ids = ["expenses", "months", "saved", "monthly"];
var inputs = ids.map(function(id) { return document.getElementById(id); });
var used = false;
function plural(n) { var x=n%100, y=n%10; return x>=11&&x<=14?"месяцев":y===1?"месяц":y>=2&&y<=4?"месяца":"месяцев"; }
function money(n) { return new Intl.NumberFormat("ru-RU", {maximumFractionDigits:2}).format(n)+" руб."; }
function render() {
 var invalid=false;
 var values=inputs.map(function(el) { var n=el.valueAsNumber; var bad=el.value.trim()===""||!Number.isFinite(n)||n<0||n>1000000000000||(el.id==="months"&&(n<1||n>12||!Number.isInteger(n))); el.setAttribute("aria-invalid", String(bad)); if(bad) invalid=true; return bad?0:n; });
 var expenses=values[0], months=values[1], saved=values[2], monthly=values[3];
 var goal=expenses*months, left=Math.max(0,goal-saved);
 var pct=goal>0?Math.min(100,saved/goal*100):0;
 document.getElementById("months-value").textContent=months+" "+plural(months);
 document.getElementById("goal").textContent=invalid?"—":money(goal);
 document.getElementById("remaining").textContent=invalid?"—":money(left);
 document.getElementById("percent").textContent=invalid||goal<=0?"—":Math.round(pct)+"%";
 document.getElementById("progress").value=invalid?0:pct;
 var duration="Срок не определен";
 if(!invalid&&goal>0) { if(left===0) duration="Цель достигнута"; else if(monthly>0) {var count=Math.ceil(left/monthly); if(Number.isFinite(count)&&Number.isSafeInteger(count)) duration=count+" "+plural(count); } }
 document.getElementById("duration").textContent=duration;
 document.getElementById("calc-message").textContent=invalid?"Введите корректные неотрицательные суммы во всех полях.":goal<=0?"Укажите расходы больше нуля для расчета цели.":"";
}
form.addEventListener("input",function(event) {
 render();
 if(!used&&event.isTrusted&&inputs.indexOf(event.target)!==-1&&event.target.value!==event.target.defaultValue) {
  used=true;
  if(typeof window.kibaReachGoal==="function") window.kibaReachGoal("finance_cushion_calculator_use");
 }
});
form.addEventListener("reset",function(){window.setTimeout(render,0);});
render();
})();