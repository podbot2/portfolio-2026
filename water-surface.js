(function () {
  "use strict";

  /* ── Water surface canvas overlay ── */
  var canvas = document.createElement("canvas");
  canvas.id = "water-surface";
  canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;";
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext("2d");
  var W, H, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  /* ── Scroll tracking ── */
  var scrollY = 0;
  var heroHeight = 0;

  function updateScroll() {
    scrollY = window.scrollY || window.pageYOffset;
    var hero = document.querySelector(".home-section.home");
    if (hero) heroHeight = hero.offsetHeight;
    else heroHeight = H;
  }
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", updateScroll);

  /* ── Mouse for ripple interaction ── */
  var mouseX = -999, mouseY = -999;
  var ripples = [];

  window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  window.addEventListener("mousemove", function () {
    var now = performance.now() / 1000;
    if (ripples.length < 8 && mouseX > 0) {
      ripples.push({ x: mouseX, y: mouseY, r: 0, a: 0.4, t: now });
    }
  }, { passive: true });

  /* ── Update video opacity based on scroll ── */
  var video = document.getElementById("koi-pond-bg");

  /* ── Animation ── */
  var lastTime = performance.now() / 1000;

  function frame() {
    requestAnimationFrame(frame);
    if (document.hidden) return;

    var now = performance.now() / 1000;
    var dt = Math.min(now - lastTime, 0.05);
    lastTime = now;

    ctx.clearRect(0, 0, W, H);

    /* Dive progress: 0 = at top (surface), 1 = scrolled past hero (underwater) */
    var diveProgress = Math.min(1, scrollY / (heroHeight * 0.8));

    /* Update video: gets clearer as you dive */
    if (video) {
      video.style.opacity = 0.3 + diveProgress * 0.4;
    }

    /* Surface effect: only visible above the fold */
    var surfaceAlpha = 1 - diveProgress;
    if (surfaceAlpha <= 0.01) return;

    /* ── Water surface: shimmering light caustics ── */
    ctx.save();
    ctx.globalAlpha = surfaceAlpha * 0.12;
    ctx.globalCompositeOperation = "lighter";

    /* Animated light patches on the surface */
    for (var i = 0; i < 12; i++) {
      var lx = W * 0.1 + Math.sin(now * 0.2 + i * 2.1) * W * 0.4;
      var ly = H * 0.15 + Math.cos(now * 0.18 + i * 1.7) * H * 0.35;
      var lr = 80 + Math.sin(now * 0.3 + i * 1.3) * 40;
      var grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr);
      grad.addColorStop(0, "rgba(180,220,255,0.8)");
      grad.addColorStop(0.5, "rgba(140,200,240,0.3)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(lx - lr, ly - lr, lr * 2, lr * 2);
    }
    ctx.restore();

    /* ── Surface ripple lines ── */
    ctx.save();
    ctx.globalAlpha = surfaceAlpha * 0.06;
    ctx.strokeStyle = "rgba(200,230,255,0.5)";
    ctx.lineWidth = 1;
    for (var rl = 0; rl < 8; rl++) {
      ctx.beginPath();
      var ry = H * 0.1 + (rl / 8) * H * 0.8;
      var waveOff = now * 20 + rl * 40;
      for (var rx = 0; rx < W; rx += 4) {
        var wy = ry + Math.sin((rx + waveOff) * 0.02) * 8 + Math.sin((rx + waveOff * 0.7) * 0.035) * 5;
        if (rx === 0) ctx.moveTo(rx, wy); else ctx.lineTo(rx, wy);
      }
      ctx.stroke();
    }
    ctx.restore();

    /* ── Specular highlights (bright moving spots) ── */
    ctx.save();
    ctx.globalAlpha = surfaceAlpha * 0.08;
    ctx.globalCompositeOperation = "lighter";
    for (var sp = 0; sp < 6; sp++) {
      var sx = W * 0.2 + Math.sin(now * 0.15 + sp * 1.8) * W * 0.35;
      var sy = H * 0.2 + Math.cos(now * 0.12 + sp * 2.3) * H * 0.3;
      var sr = 30 + Math.sin(now * 0.5 + sp) * 15;
      var sGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, sr);
      sGrad.addColorStop(0, "rgba(255,255,255,0.9)");
      sGrad.addColorStop(1, "transparent");
      ctx.fillStyle = sGrad;
      ctx.fillRect(sx - sr, sy - sr, sr * 2, sr * 2);
    }
    ctx.restore();

    /* ── Mouse ripples ── */
    ctx.save();
    for (var i = ripples.length - 1; i >= 0; i--) {
      var rp = ripples[i];
      rp.r += 2;
      rp.a -= 0.012;
      if (rp.a <= 0 || rp.r > 120) {
        ripples.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = rp.a * surfaceAlpha;
      ctx.strokeStyle = "rgba(200,230,255,0.6)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.stroke();

      /* Second ring */
      if (rp.r > 15) {
        ctx.globalAlpha = rp.a * surfaceAlpha * 0.5;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.6, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    ctx.restore();

    /* ── Underwater caustics (visible as you dive) ── */
    if (diveProgress > 0.1) {
      ctx.save();
      ctx.globalAlpha = diveProgress * 0.06;
      ctx.globalCompositeOperation = "lighter";
      for (var ci = 0; ci < 10; ci++) {
        var cx = W * 0.1 + Math.sin(now * 0.25 + ci * 1.5) * W * 0.4;
        var cy = H * 0.2 + Math.cos(now * 0.2 + ci * 1.1) * H * 0.3;
        var cr = 60 + Math.sin(now * 0.4 + ci) * 25;
        var cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
        cGrad.addColorStop(0, "rgba(80,160,220,0.7)");
        cGrad.addColorStop(1, "transparent");
        ctx.fillStyle = cGrad;
        ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2);
      }
      ctx.restore();
    }

    /* ── Vignette (gets darker as you dive) ── */
    var vigStrength = 0.3 + diveProgress * 0.3;
    var vGrad = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.25, W / 2, H / 2, Math.max(W, H) * 0.75);
    vGrad.addColorStop(0, "transparent");
    vGrad.addColorStop(1, "rgba(4,10,20," + vigStrength + ")");
    ctx.fillStyle = vGrad;
    ctx.fillRect(0, 0, W, H);
  }

  frame();
})();
