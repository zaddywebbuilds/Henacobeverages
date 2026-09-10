/* ============================================================
   HENACO BEVERAGES — site behaviour
   ------------------------------------------------------------
   1. WhatsApp deep-links (one number, many prefilled messages)
   2. The hero: bottles pulled into the neon tunnel, locked to
      the vanishing point tracked out of the video frame-by-frame
   3. 3D tilt product cards, scroll reveal, WhatsApp demo chat
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. CONTACT ---------------------------------- */
  var WA_NUMBER = "2348068082495";          // WhatsApp / phone
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    el.href = "https://wa.me/" + WA_NUMBER +
              "?text=" + encodeURIComponent(el.getAttribute("data-wa"));
  });
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 2. THE VORTEX ------------------------------- */
  /* Normalised (x, y) of the tunnel mouth, sampled every SPACING
     seconds straight out of the source video. Kept in the file so
     the hero works from file:// with no fetch and no CORS. */
  var SPACING = 0.083;
  var HOLE = [
  0.575,0.512,0.561,0.511,0.551,0.508,0.539,0.508,0.528,0.505,0.525,0.502,0.533,0.499,0.543,0.495,
  0.556,0.495,0.567,0.494,0.579,0.49,0.593,0.49,0.603,0.488,0.611,0.485,0.611,0.487,0.601,0.488,
  0.587,0.488,0.572,0.488,0.56,0.489,0.548,0.491,0.537,0.491,0.525,0.494,0.525,0.497,0.528,0.494,
  0.533,0.492,0.544,0.488,0.558,0.483,0.573,0.477,0.584,0.471,0.592,0.467,0.604,0.461,0.602,0.457,
  0.597,0.458,0.592,0.459,0.582,0.464,0.57,0.468,0.555,0.473,0.545,0.48,0.535,0.485,0.529,0.49,
  0.525,0.495,0.52,0.491,0.52,0.486,0.525,0.479,0.524,0.468,0.528,0.459,0.528,0.448,0.531,0.439,
  0.53,0.43,0.533,0.425,0.535,0.426,0.53,0.429,0.522,0.435,0.52,0.446,0.515,0.454,0.512,0.465,
  0.508,0.475,0.504,0.485,0.504,0.492,0.505,0.499,0.503,0.506,0.5,0.514,0.506,0.523,0.513,0.525,
  0.509,0.517,0.512,0.505,0.516,0.49,0.519,0.473,0.522,0.456,0.562,0.458,0.54,0.458,0.532,0.447,
  0.52,0.442,0.521,0.448,0.516,0.459,0.511,0.471,0.501,0.487,0.49,0.504,0.445,0.5,0.466,0.492,
  0.461,0.495,0.455,0.492,0.443,0.489,0.435,0.482,0.425,0.474,0.42,0.462,0.416,0.45,0.412,0.436,
  0.408,0.434,0.405,0.433,0.409,0.437,0.416,0.441,0.422,0.449,0.431,0.457,0.436,0.468,0.443,0.48,
  0.454,0.492,0.463,0.498,0.477,0.502,0.483,0.509,0.5,0.511,0.513,0.51,0.502,0.505,0.489,0.5,0.475,
  0.496,0.457,0.492,0.44,0.492,0.423,0.489,0.414,0.484,0.396,0.485,0.383,0.488,0.393,0.494,0.404,
  0.5,0.421,0.505,0.435,0.509,0.444,0.51,0.454,0.51,0.465,0.511,0.471,0.51,0.467,0.516,0.454,0.514,
  0.439,0.513,0.418,0.516,0.4,0.519,0.389,0.52,0.379,0.524,0.367,0.526,0.36,0.528,0.363,0.524,
  0.375,0.528,0.391,0.53,0.406,0.529,0.423,0.527,0.438,0.531,0.452,0.529,0.467,0.533,0.47,0.527,
  0.456,0.528,0.441,0.526,0.426,0.531,0.414,0.536,0.4,0.541,0.392,0.54,0.378,0.543,0.365,0.539,
  0.365,0.547,0.382,0.547,0.399,0.549,0.413,0.544,0.427,0.54,0.443,0.537,0.455,0.533,0.472,0.531,
  0.482,0.524,0.491,0.518,0.491,0.516,0.482,0.522,0.479,0.531,0.473,0.539,0.456,0.543,0.444,0.549,
  0.433,0.554,0.428,0.565,0.42,0.573,0.42,0.576,0.434,0.571,0.442,0.563,0.449,0.554,0.467,0.549,
  0.479,0.541,0.482,0.531,0.486,0.52,0.489,0.507,0.489,0.513,0.484,0.517,0.488,0.524,0.489,0.531,
  0.486,0.539,0.488,0.549,0.493,0.56,0.512,0.569,0.516,0.582,0.519,0.578,0.526,0.573,0.524,0.566,
  0.524,0.558,0.528,0.551,0.526,0.543,0.525,0.537,0.502,0.534,0.499,0.532,0.501,0.536,0.502,0.541,
  0.498,0.55,0.5,0.559,0.5,0.571,0.502,0.58,0.508,0.585,0.517,0.588,0.524,0.589,0.528,0.584,0.529,
  0.578,0.536,0.57,0.537,0.561,0.54,0.549,0.542,0.54,0.534,0.536,0.522,0.535,0.514,0.534,0.509,
  0.533,0.512,0.54,0.523,0.543,0.535,0.549,0.545,0.555,0.552,0.562,0.566,0.564,0.58,0.564,0.591,
  0.564,0.598,0.561,0.596,0.552,0.586,0.547,0.573,0.54,0.563,0.534,0.552,0.528,0.546,0.522,0.544,
  0.516,0.535,0.517,0.542,0.519,0.554,0.521,0.571,0.524,0.587,0.527,0.602,0.531,0.616,0.531,0.621,
  0.533,0.625,0.536,0.636,0.533,0.631,0.529,0.622,0.526,0.607,0.522,0.591,0.516  ];

  /* seconds for one bottle to travel from the rim into the mouth */
  var LIFE = 5.2;

  var BOTTLES = [
    "images/products/cafe-rum-2020.webp",
    "images/products/lord-henaco-brandy.webp",
    "images/products/makossa-coconut.webp",
    "images/products/commissionale-brandy.webp",
    "images/products/one-man-squad.webp",
    "images/products/heatmans-schnapps.webp",
    "images/products/makossa-ponche.webp",
    "images/products/cafe-rum-giftpack.webp"
  ];

  var layer = document.getElementById("portalLayer");
  var video = document.getElementById("heroVideo");

  if (layer && video && !REDUCED) {
    initVortex();
  } else {
    startVideo();
  }

  function initVortex() {
    var hero = document.querySelector(".hero");

    var glow = document.createElement("div");
    glow.className = "portal-glow";
    layer.appendChild(glow);

    /* one <img> per bottle, recycled forever */
    var flyers = BOTTLES.map(function (src, i) {
      var img = document.createElement("img");
      img.className = "flyer";
      img.src = src;
      img.alt = "";
      img.decoding = "async";
      img.style.opacity = "0";
      layer.appendChild(img);
      return {
        el: img,
        /* stagger the launches evenly across one lifetime */
        start: i * (LIFE / BOTTLES.length),
        angle: (i / BOTTLES.length) * Math.PI * 2 + 0.4,
        spin: (i % 2 ? 1 : -1) * (14 + (i % 3) * 9)
      };
    });

    var W = 0, H = 0;
    function measure() {
      var r = hero.getBoundingClientRect();
      W = r.width;
      H = r.height;
    }
    measure();
    window.addEventListener("resize", measure, { passive: true });

    /* only animate while the hero is actually on screen */
    var visible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
        if (visible) {
          video.play().catch(function () {});
        } else {
          video.pause();
        }
      }, { threshold: 0.05 }).observe(hero);
    }

    /* Map a normalised video point into hero pixels, honouring the
       object-fit:cover crop, so the mouth never drifts off the tunnel
       no matter how the hero is shaped. */
    function holeAt(t) {
      var n = HOLE.length / 2;
      var span = n * SPACING;
      var u = (((t % span) + span) % span) / SPACING;
      var i0 = Math.floor(u) % n;
      var i1 = (i0 + 1) % n;
      var f = u - Math.floor(u);
      var x = HOLE[i0 * 2] + (HOLE[i1 * 2] - HOLE[i0 * 2]) * f;
      var y = HOLE[i0 * 2 + 1] + (HOLE[i1 * 2 + 1] - HOLE[i0 * 2 + 1]) * f;

      var vw = video.videoWidth || 540;
      var vh = video.videoHeight || 960;
      var s = Math.max(W / vw, H / vh);
      var dw = vw * s, dh = vh * s;
      return { x: (W - dw) / 2 + x * dw, y: (H - dh) / 2 + y * dh };
    }

    var t0 = performance.now();

    function frame(now) {
      requestAnimationFrame(frame);
      if (!visible || !W) return;

      /* Drive off the video clock whenever it is really playing, so the
         bottles stay glued to the tunnel; fall back to wall time if the
         video never started (blocked autoplay, save-data, etc). */
      var vt = (video.readyState > 2 && !video.paused && !video.ended)
        ? video.currentTime
        : (now - t0) / 1000;

      var hole = holeAt(vt);

      /* the mouth glow, breathing */
      var pulse = 0.45 + 0.2 * Math.sin(vt * 2.1);
      glow.style.transform = "translate3d(" + hole.x.toFixed(1) + "px," + hole.y.toFixed(1) + "px,0) scale(" + (0.85 + pulse * 0.5).toFixed(3) + ")";
      glow.style.opacity = pulse.toFixed(3);

      /* how far out a bottle begins its run */
      var reach = Math.max(W, H) * 0.8;

      for (var i = 0; i < flyers.length; i++) {
        var fl = flyers[i];
        var age = (((vt - fl.start) % LIFE) + LIFE) % LIFE;
        var p = age / LIFE;

        /* ease-in cubic: it drifts, then the tunnel snatches it */
        var e = p * p * p;
        var dist = reach * (1 - e);

        /* a slow curl on the way in */
        var a = fl.angle + p * 0.85;
        var x = hole.x + Math.cos(a) * dist;
        var y = hole.y + Math.sin(a) * dist * 0.72;

        var scale = 1 - 0.97 * e;
        /* fade up at launch, snuff out at the mouth */
        var op = p < 0.08 ? p / 0.08 : (p > 0.9 ? (1 - p) / 0.1 : 1);

        fl.el.style.opacity = (op * 0.95).toFixed(3);
        fl.el.style.transform =
          "translate3d(" + (x - 95).toFixed(1) + "px," + (y - 190).toFixed(1) + "px,0)" +
          " rotate(" + (fl.spin * p).toFixed(2) + "deg)" +
          " scale(" + scale.toFixed(4) + ")";
      }
    }
    requestAnimationFrame(frame);

    startVideo();
  }

  /* Nigerian mobile data is not free. Respect Save-Data and obviously
     slow connections — those visitors just keep the poster image. */
  function startVideo() {
    if (!video) return;
    var c = navigator.connection || {};
    if (c.saveData === true || /(^|-)2g$/.test(c.effectiveType || "")) return;
    video.preload = "auto";
    video.load();
    video.play().catch(function () {});
  }

  /* ---------- 3. PRODUCT CARD TILT ------------------------ */
  if (!REDUCED && window.matchMedia("(hover:hover)").matches) {
    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
        card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        card.style.transition = "transform .08s linear, box-shadow .35s, border-color .35s";
        card.style.transform =
          "perspective(900px) rotateX(" + ((0.5 - py) * 9).toFixed(2) + "deg)" +
          " rotateY(" + ((px - 0.5) * 11).toFixed(2) + "deg) translateY(-6px)";
      });
      card.addEventListener("pointerleave", function () {
        card.style.transition = "transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .35s, border-color .35s";
        card.style.transform = "";
      });
    });
  }

  /* ---------- 4. SCROLL REVEAL ---------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !REDUCED) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, i) {
        if (!en.isIntersecting) return;
        var el = en.target;
        setTimeout(function () { el.classList.add("in"); }, (i % 4) * 80);
        ro.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 5. MARQUEE (duplicate for a seamless loop) -- */
  var track = document.getElementById("marqueeTrack");
  if (track) track.innerHTML += track.innerHTML;

  /* ---------- 6. WHATSAPP DEMO CHAT ----------------------- */
  var waBody = document.getElementById("waBody");
  if (waBody) {
    var SCRIPT = [
      { s: "out", t: "Good afternoon. I get a bar for Enugu. Wetin be your price for Cafe Rum and Lord Henaco?" },
      { s: "in", t: "Good afternoon sir. We dey factory for Aba — I go send you the carton price for both now." },
      { s: "in", t: "You fit mix am. Try one carton each first, then reorder wetin move pass." },
      { s: "out", t: "Okay. Send am. You fit deliver reach Enugu?" },
      { s: "in", t: "Yes sir, we dey deliver go any state. Send me your address make I confirm am for you." }
    ];
    var played = false;
    var play = function () {
      if (played) return;
      played = true;
      SCRIPT.forEach(function (m, i) {
        setTimeout(function () {
          var b = document.createElement("div");
          b.className = "bub " + m.s;
          var p = document.createElement("span");
          p.textContent = m.t;
          b.appendChild(p);
          if (m.s === "out") {
            var tick = document.createElement("small");
            tick.textContent = "✓✓";
            b.appendChild(tick);
          }
          waBody.appendChild(b);
        }, REDUCED ? 0 : i * 950);
      });
    };
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        if (es[0].isIntersecting) play();
      }, { threshold: 0.35 }).observe(waBody);
    } else {
      play();
    }
  }
})();
