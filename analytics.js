(function (window, document) {
  "use strict";

  var COUNTER_ID = 106655496;
  var METRIKA_URL = "https://mc.yandex.ru/metrika/tag.js?id=" + COUNTER_ID;

  if (typeof window.ym !== "function") {
    window.ym = function () {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
    window.ym.l = Date.now();
  }

  var hasMetrikaScript = Array.prototype.some.call(document.scripts, function (script) {
    return script.src === METRIKA_URL;
  });

  if (!hasMetrikaScript) {
    var script = document.createElement("script");
    var firstScript = document.getElementsByTagName("script")[0];
    script.async = true;
    script.src = METRIKA_URL;
    firstScript.parentNode.insertBefore(script, firstScript);
  }

  window.ym(COUNTER_ID, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: window.location.href,
    accurateTrackBounce: true,
    trackLinks: true
  });

  function reachGoal(goalName) {
    if (!goalName) return;
    try {
      window.ym(COUNTER_ID, "reachGoal", goalName);
    } catch (error) {
      // Analytics must never block the requested visitor action.
    }
  }

  function goalForLink(link) {
    var explicitGoal = link.getAttribute("data-metrika-goal");
    if (explicitGoal) return explicitGoal;

    var href = (link.getAttribute("href") || "").trim().toLowerCase();
    if (href.indexOf("tel:") === 0) return "tel_click";
    if (href.indexOf("mailto:") === 0) return "email_click";
    if (href.indexOf("tg:") === 0 || href.indexOf("https://t.me/") === 0 || href.indexOf("http://t.me/") === 0) {
      return "tg_click";
    }
    return "";
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a");
    if (!link) return;
    reachGoal(goalForLink(link));
  }, true);

  window.kibaReachGoal = reachGoal;
})(window, document);

