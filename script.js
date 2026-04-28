/* =========================================================
   I Love You — v9
   Words travel along the heart outline like a conveyor belt.
   Heart shape stays fixed. CSS offset-path does the motion.
   ========================================================= */

(function () {
  "use strict";

  var TRAVEL_SEC = 50;   // must match CSS --travel
  var WORD_COUNT = window.innerWidth < 600 ? 50 : 100;

  /* ---- Heart parametric curve ---- */
  function heartXY(t) {
    var s = Math.sin(t);
    return {
      x: 16 * s * s * s,
      y: 13.5 * Math.cos(t) - 6.5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)
    };
  }

  /* ---- Build everything ---- */
  function build(host) {
    host.innerHTML = "";
    var w = host.clientWidth || 500;
    var h = host.clientHeight || 500;

    /* -- Compute math bounds -- */
    var SAMPLES = 120;
    var mnX = 1e9, mxX = -1e9, mnY = 1e9, mxY = -1e9;
    for (var k = 0; k <= SAMPLES; k++) {
      var p = heartXY((k / SAMPLES) * 2 * Math.PI);
      if (p.x < mnX) mnX = p.x; if (p.x > mxX) mxX = p.x;
      if (p.y < mnY) mnY = p.y; if (p.y > mxY) mxY = p.y;
    }
    var mcx = (mnX + mxX) / 2, mcy = (mnY + mxY) / 2;
    var mhalf = Math.max(mxX - mnX, mxY - mnY) / 2;
    var cxPx = w / 2, cyPx = h / 2, scale = w * 0.34;

    /* -- Generate SVG path string in pixel coords -- */
    var d = "";
    for (var i = 0; i <= SAMPLES; i++) {
      var t = (i / SAMPLES) * 2 * Math.PI;
      var pt = heartXY(t);
      var nx = (pt.x - mcx) / mhalf;
      var ny = -(pt.y - mcy) / mhalf;
      d += (i === 0 ? "M" : "L") + (cxPx + nx * scale).toFixed(1) + "," + (cyPx + ny * scale).toFixed(1);
    }
    d += "Z";

    /* -- Inject path as shared CSS rule -- */
    var styleEl = document.getElementById("hp-style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "hp-style";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = '.ily-move{offset-path:path("' + d + '");}';

    /* -- Create moving words -- */
    var isMobile = window.innerWidth < 600;
    var fs = isMobile ? Math.max(10, Math.round(w / 34)) : Math.max(13, Math.round(w / 26));
    for (var j = 0; j < WORD_COUNT; j++) {
      var el = document.createElement("span");
      el.className = "ily ily-move";
      el.textContent = "I love you";
      el.style.fontSize = fs + "px";
      el.style.animationDelay = -(j / WORD_COUNT * TRAVEL_SEC).toFixed(2) + "s";
      host.appendChild(el);
    }

  }

  /* ---- Init ---- */
  document.addEventListener("DOMContentLoaded", function () {
    var heart = document.getElementById("heart");
    if (heart) build(heart);

    var timer;
    window.addEventListener("resize", function () {
      clearTimeout(timer);
      timer = setTimeout(function () { if (heart) build(heart); }, 200);
    });
  });
})();
