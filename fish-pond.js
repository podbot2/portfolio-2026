(function () {
  "use strict";

  var hero = document.querySelector(".home-section.home");
  if (!hero) return;

  /* ── Canvas setup ── */
  var canvas = document.createElement("canvas");
  canvas.id = "koi-pond";
  canvas.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;display:block;";
  hero.insertBefore(canvas, hero.firstChild);

  var ctx = canvas.getContext("2d");
  var W, H, dpr;

  function resize() {
    dpr = Math.min(window.devicePixelRatio, 2);
    W = hero.offsetWidth;
    H = hero.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  /* ── Cursor ── */
  var mouse = { x: -9999, y: -9999 };
  hero.style.position = "relative";
  hero.addEventListener("mousemove", function (e) {
    var r = hero.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  hero.addEventListener("mouseleave", function () {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  /* ── Utilities ── */
  function lerp(a, b, t) { return a + (b - a) * t; }
  function dist(ax, ay, bx, by) { var dx = ax - bx, dy = ay - by; return Math.sqrt(dx * dx + dy * dy); }
  function rand(lo, hi) { return lo + Math.random() * (hi - lo); }
  function angleWrap(a) { while (a > Math.PI) a -= 2 * Math.PI; while (a < -Math.PI) a += 2 * Math.PI; return a; }

  /* ── Koi varieties ── */
  var VARIETIES = [
    { name: "Kohaku",        base: "#f5f0e8", patches: ["#cc3322", "#dd4433"], belly: "#fff8f0" },
    { name: "Sanke",         base: "#f5f0e8", patches: ["#cc3322", "#222222"], belly: "#fff8f0" },
    { name: "Hi Utsuri",     base: "#1a1a1a", patches: ["#cc3322", "#dd4433"], belly: "#2a2a2a" },
    { name: "Ogon",          base: "#d4a832", patches: ["#e8c24a", "#c99a20"], belly: "#ecd680" },
    { name: "Showa",         base: "#1a1a1a", patches: ["#cc3322", "#f5f0e8"], belly: "#2a2a2a" },
    { name: "Asagi",         base: "#4a6e8a", patches: ["#cc4422", "#3a5e7a"], belly: "#c8a888" },
    { name: "Platinum Ogon", base: "#e8e4dc", patches: ["#f0ece6", "#d8d4cc"], belly: "#ffffff" },
    { name: "Tancho",        base: "#f5f0e8", patches: ["#cc2222"],            belly: "#fff8f0" },
    { name: "Ki Utsuri",     base: "#1a1a1a", patches: ["#d4a832", "#c4982a"], belly: "#2a2a2a" }
  ];

  /* ── Koi class ── */
  var JOINTS = 20;
  var SEG_LEN = 6;

  function Koi(variety) {
    this.v = variety;
    this.x = rand(80, W - 80);
    this.y = rand(80, H - 80);
    this.angle = rand(0, Math.PI * 2);
    this.speed = rand(0.6, 1.1);
    this.baseSpeed = this.speed;
    this.size = rand(0.75, 1.15);
    this.phase = rand(0, Math.PI * 2);
    this.freq = rand(2.5, 3.5);
    this.fleeing = 0;
    this.turnTarget = this.angle;
    this.turnTimer = rand(0, 3);

    /* Spine chain */
    this.spine = [];
    for (var i = 0; i < JOINTS; i++) {
      this.spine.push({
        x: this.x - Math.cos(this.angle) * i * SEG_LEN * this.size,
        y: this.y - Math.sin(this.angle) * i * SEG_LEN * this.size
      });
    }

    /* Patch positions (normalized 0-1 along body) */
    this.patchSeeds = [];
    var numPatches = variety.name === "Tancho" ? 1 : Math.floor(rand(3, 6));
    for (var p = 0; p < numPatches; p++) {
      this.patchSeeds.push({
        pos: variety.name === "Tancho" ? 0.08 : rand(0.05, 0.75),
        size: variety.name === "Tancho" ? 0.08 : rand(0.06, 0.18),
        color: variety.patches[Math.floor(Math.random() * variety.patches.length)]
      });
    }
  }

  Koi.prototype.bodyWidth = function (t) {
    /* t: 0 = head, 1 = tail */
    if (t < 0.08) return 0.5 + t / 0.08 * 0.5;  /* snout ramp up */
    if (t < 0.28) return 1.0;                      /* widest section */
    if (t < 0.85) return 1.0 - (t - 0.28) / 0.57 * 0.65; /* taper */
    return 0.35 - (t - 0.85) / 0.15 * 0.2;        /* caudal peduncle */
  };

  Koi.prototype.update = function (dt, time) {
    var fleeRadius = 150;
    var dx = this.x - mouse.x;
    var dy = this.y - mouse.y;
    var d = Math.sqrt(dx * dx + dy * dy);

    /* Flee from cursor */
    if (d < fleeRadius && d > 0) {
      var fleeAngle = Math.atan2(dy, dx);
      var urgency = 1 - d / fleeRadius;
      this.angle = lerp(this.angle, fleeAngle, urgency * 0.15);
      this.speed = this.baseSpeed + urgency * 3.5;
      this.fleeing = Math.min(this.fleeing + dt * 4, 1);
    } else {
      this.speed = lerp(this.speed, this.baseSpeed, 0.02);
      this.fleeing = Math.max(this.fleeing - dt * 1.5, 0);
    }

    /* Idle turning */
    this.turnTimer -= dt;
    if (this.turnTimer <= 0) {
      this.turnTarget = this.angle + rand(-0.8, 0.8);
      this.turnTimer = rand(2, 5);
    }
    if (this.fleeing < 0.3) {
      this.angle += angleWrap(this.turnTarget - this.angle) * 0.02;
    }

    /* Boundary avoidance */
    var margin = 60;
    if (this.x < margin) this.angle = lerp(this.angle, 0, 0.05);
    if (this.x > W - margin) this.angle = lerp(this.angle, Math.PI, 0.05);
    if (this.y < margin) this.angle = lerp(this.angle, Math.PI / 2, 0.05);
    if (this.y > H - margin) this.angle = lerp(this.angle, -Math.PI / 2, 0.05);

    /* Move head */
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    /* Update spine with swimming wave */
    this.spine[0].x = this.x;
    this.spine[0].y = this.y;
    var curFreq = this.freq + this.fleeing * 4;

    for (var i = 1; i < JOINTS; i++) {
      var prev = this.spine[i - 1];
      var cur = this.spine[i];
      var t = i / (JOINTS - 1);
      var waveAmp = t * t * 3.5 * this.size;
      var wave = Math.sin(time * curFreq - i * 0.45 + this.phase) * waveAmp;

      var segAngle = Math.atan2(prev.y - cur.y, prev.x - cur.x);
      var perpX = -Math.sin(segAngle) * wave;
      var perpY = Math.cos(segAngle) * wave;

      var targetX = prev.x - Math.cos(segAngle) * SEG_LEN * this.size + perpX;
      var targetY = prev.y - Math.sin(segAngle) * SEG_LEN * this.size + perpY;

      cur.x = lerp(cur.x, targetX, 0.55);
      cur.y = lerp(cur.y, targetY, 0.55);
    }

    this.phase += dt * 0.5;
  };

  Koi.prototype.draw = function (time) {
    var s = this.size;
    var sp = this.spine;
    var maxW = 10 * s;

    /* Shadow */
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.translate(4, 6);
    this._drawBody(sp, maxW, "#000", null, null, false);
    ctx.restore();

    /* Main body */
    this._drawBody(sp, maxW, this.v.base, this.v.belly, this.v, true);

    /* Pectoral fins */
    this._drawPectoralFins(sp, s, time);

    /* Dorsal fin */
    this._drawDorsalFin(sp, s);

    /* Tail fin */
    this._drawTailFin(sp, s, time);

    /* Specular highlight */
    this._drawSpecular(sp, maxW);
  };

  Koi.prototype._drawBody = function (sp, maxW, baseColor, bellyColor, variety, doPatches) {
    /* Build body outline */
    var leftPts = [], rightPts = [];
    for (var i = 0; i < JOINTS - 1; i++) {
      var t = i / (JOINTS - 1);
      var w = this.bodyWidth(t) * maxW;
      var angle = Math.atan2(sp[i + 1].y - sp[i].y, sp[i + 1].x - sp[i].x);
      var px = -Math.sin(angle) * w;
      var py = Math.cos(angle) * w;
      leftPts.push({ x: sp[i].x + px, y: sp[i].y + py });
      rightPts.push({ x: sp[i].x - px, y: sp[i].y - py });
    }

    /* Draw filled body shape */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(leftPts[0].x, leftPts[0].y);
    for (var i = 1; i < leftPts.length; i++) {
      var cp = i < leftPts.length - 1 ? leftPts[i] : leftPts[leftPts.length - 1];
      ctx.lineTo(cp.x, cp.y);
    }
    /* Connect to tail */
    var tail = sp[JOINTS - 1];
    ctx.lineTo(tail.x, tail.y);
    for (var i = rightPts.length - 1; i >= 0; i--) {
      ctx.lineTo(rightPts[i].x, rightPts[i].y);
    }
    ctx.closePath();

    /* Base fill */
    ctx.fillStyle = baseColor;
    ctx.fill();

    /* Belly highlight */
    if (bellyColor) {
      ctx.save();
      ctx.clip();
      var headX = sp[0].x, headY = sp[0].y;
      var midIdx = Math.floor(JOINTS * 0.3);
      var midX = sp[midIdx].x, midY = sp[midIdx].y;
      var grad = ctx.createRadialGradient(midX, midY, 0, midX, midY, maxW * 2);
      grad.addColorStop(0, bellyColor);
      grad.addColorStop(1, "transparent");
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = grad;
      ctx.fillRect(headX - maxW * 3, headY - maxW * 3, maxW * 8, maxW * 8);
      ctx.restore();
    }

    /* Color patches */
    if (doPatches && variety) {
      ctx.save();
      ctx.clip();
      for (var p = 0; p < this.patchSeeds.length; p++) {
        var patch = this.patchSeeds[p];
        var idx = Math.floor(patch.pos * (JOINTS - 1));
        var pSize = patch.size * (JOINTS - 1) * SEG_LEN * this.size * 0.5;
        var pGrad = ctx.createRadialGradient(sp[idx].x, sp[idx].y, 0, sp[idx].x, sp[idx].y, pSize);
        pGrad.addColorStop(0, patch.color);
        pGrad.addColorStop(0.7, patch.color);
        pGrad.addColorStop(1, "transparent");
        ctx.fillStyle = pGrad;
        ctx.fillRect(sp[idx].x - pSize, sp[idx].y - pSize, pSize * 2, pSize * 2);
      }
      ctx.restore();
    }

    /* Scale texture */
    if (doPatches) {
      ctx.save();
      ctx.clip();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 0.3;
      for (var i = 1; i < JOINTS - 3; i += 1) {
        var t = i / (JOINTS - 1);
        var w = this.bodyWidth(t) * maxW * 0.8;
        for (var side = -1; side <= 1; side += 2) {
          var angle = Math.atan2(sp[i + 1].y - sp[i].y, sp[i + 1].x - sp[i].x);
          var cx = sp[i].x + (-Math.sin(angle)) * w * 0.4 * side;
          var cy = sp[i].y + Math.cos(angle) * w * 0.4 * side;
          ctx.beginPath();
          ctx.arc(cx, cy, 2 * this.size, 0, Math.PI);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    ctx.restore();
  };

  Koi.prototype._drawPectoralFins = function (sp, s, time) {
    var idx = Math.floor(JOINTS * 0.22);
    var angle = Math.atan2(sp[idx + 1].y - sp[idx].y, sp[idx + 1].x - sp[idx].x);
    var finLen = 14 * s;
    var flap = Math.sin(time * 2 + this.phase) * 0.3;

    for (var side = -1; side <= 1; side += 2) {
      var baseAngle = angle + (Math.PI / 2) * side + flap * side;
      var bx = sp[idx].x + (-Math.sin(angle)) * 6 * s * side;
      var by = sp[idx].y + Math.cos(angle) * 6 * s * side;
      var tx = bx + Math.cos(baseAngle) * finLen;
      var ty = by + Math.sin(baseAngle) * finLen;

      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.moveTo(sp[idx].x, sp[idx].y);
      ctx.quadraticCurveTo(bx, by, tx, ty);
      ctx.quadraticCurveTo(bx + Math.cos(angle) * 5, by + Math.sin(angle) * 5, sp[idx + 2].x, sp[idx + 2].y);
      ctx.closePath();
      ctx.fillStyle = this.v.base;
      ctx.fill();

      /* Fin rays */
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 0.4;
      for (var r = 0; r < 4; r++) {
        var rt = (r + 1) / 5;
        var rx = lerp(sp[idx].x, tx, rt);
        var ry = lerp(sp[idx].y, ty, rt);
        ctx.beginPath();
        ctx.moveTo(sp[idx].x, sp[idx].y);
        ctx.lineTo(rx, ry);
        ctx.stroke();
      }
      ctx.restore();
    }
  };

  Koi.prototype._drawDorsalFin = function (sp, s) {
    var startIdx = Math.floor(JOINTS * 0.2);
    var endIdx = Math.floor(JOINTS * 0.5);
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.moveTo(sp[startIdx].x, sp[startIdx].y);
    for (var i = startIdx; i <= endIdx; i++) {
      var angle = Math.atan2(sp[i + 1 < JOINTS ? i + 1 : i].y - sp[i].y, sp[i + 1 < JOINTS ? i + 1 : i].x - sp[i].x);
      var t = (i - startIdx) / (endIdx - startIdx);
      var h = Math.sin(t * Math.PI) * 5 * s;
      ctx.lineTo(sp[i].x + (-Math.sin(angle)) * h, sp[i].y + Math.cos(angle) * h);
    }
    ctx.lineTo(sp[endIdx].x, sp[endIdx].y);
    ctx.closePath();
    ctx.fillStyle = this.v.base;
    ctx.fill();
    ctx.restore();
  };

  Koi.prototype._drawTailFin = function (sp, s, time) {
    var idx = JOINTS - 1;
    var prev = sp[idx - 1];
    var tail = sp[idx];
    var angle = Math.atan2(tail.y - prev.y, tail.x - prev.x);
    var spread = 0.45 + this.fleeing * 0.3 + Math.sin(time * this.freq + this.phase) * 0.15;
    var finLen = 16 * s;

    ctx.save();
    ctx.globalAlpha = 0.35;
    for (var side = -1; side <= 1; side += 2) {
      var fAngle = angle + spread * side;
      var fx = tail.x + Math.cos(fAngle) * finLen;
      var fy = tail.y + Math.sin(fAngle) * finLen;

      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.quadraticCurveTo(tail.x, tail.y, fx, fy);
      ctx.quadraticCurveTo(
        tail.x + Math.cos(angle) * finLen * 0.3,
        tail.y + Math.sin(angle) * finLen * 0.3,
        prev.x, prev.y
      );
      ctx.closePath();
      ctx.fillStyle = this.v.base;
      ctx.fill();

      /* Fin rays */
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 0.4;
      for (var r = 0; r < 5; r++) {
        var rt = (r + 1) / 6;
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(lerp(tail.x, fx, rt), lerp(tail.y, fy, rt));
        ctx.stroke();
      }
      ctx.globalAlpha = 0.35;
    }
    ctx.restore();
  };

  Koi.prototype._drawSpecular = function (sp, maxW) {
    ctx.save();
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 1.5 * this.size;
    ctx.lineCap = "round";
    ctx.beginPath();
    for (var i = 1; i < Math.floor(JOINTS * 0.6); i++) {
      var t = i / (JOINTS - 1);
      var w = this.bodyWidth(t) * maxW * 0.25;
      var angle = Math.atan2(sp[i].y - sp[i - 1].y, sp[i].x - sp[i - 1].x);
      var sx = sp[i].x + (-Math.sin(angle)) * w;
      var sy = sp[i].y + Math.cos(angle) * w;
      if (i === 1) ctx.moveTo(sx, sy); else ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.restore();
  };

  /* ── Create fish ── */
  var fish = [];
  for (var i = 0; i < 9; i++) {
    fish.push(new Koi(VARIETIES[i]));
  }

  /* ── Ambient: particles ── */
  var particles = [];
  for (var i = 0; i < 40; i++) {
    particles.push({
      x: rand(0, W), y: rand(0, H),
      vx: rand(-0.15, 0.15), vy: rand(-0.1, 0.1),
      r: rand(1, 2.5), a: rand(0.1, 0.3)
    });
  }

  /* ── Ambient: ripples ── */
  var ripples = [];
  var lastRippleTime = 0;
  hero.addEventListener("mousemove", function () {
    var now = performance.now() / 1000;
    if (now - lastRippleTime > 0.15 && mouse.x > 0) {
      ripples.push({ x: mouse.x, y: mouse.y, r: 0, a: 0.3, maxR: rand(30, 60) });
      lastRippleTime = now;
    }
  });

  /* ── Ambient: light rays ── */
  var rays = [];
  for (var i = 0; i < 5; i++) {
    rays.push({
      x: rand(0, W), w: rand(40, 120),
      speed: rand(0.1, 0.25), a: rand(0.02, 0.05),
      offset: rand(0, Math.PI * 2)
    });
  }

  /* ── Draw helpers ── */
  function drawWater() {
    var grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.7);
    grad.addColorStop(0, "#0f2847");
    grad.addColorStop(0.5, "#0a1e3a");
    grad.addColorStop(1, "#061428");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  function drawCaustics(time) {
    ctx.save();
    ctx.globalAlpha = 0.03;
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < 8; i++) {
      var cx = W * 0.2 + Math.sin(time * 0.3 + i * 1.1) * W * 0.3;
      var cy = H * 0.3 + Math.cos(time * 0.25 + i * 0.9) * H * 0.3;
      var cr = 80 + Math.sin(time * 0.5 + i) * 30;
      var cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
      cg.addColorStop(0, "rgba(120,180,255,0.8)");
      cg.addColorStop(1, "transparent");
      ctx.fillStyle = cg;
      ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2);
    }
    ctx.restore();
  }

  function drawRays(time) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (var i = 0; i < rays.length; i++) {
      var r = rays[i];
      var rx = r.x + Math.sin(time * r.speed + r.offset) * 50;
      var pulse = 0.5 + 0.5 * Math.sin(time * 0.4 + r.offset);
      ctx.globalAlpha = r.a * pulse;
      var rg = ctx.createLinearGradient(rx, 0, rx, H);
      rg.addColorStop(0, "rgba(150,200,255,0.3)");
      rg.addColorStop(1, "transparent");
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.moveTo(rx - r.w / 2, 0);
      ctx.lineTo(rx + r.w / 2, 0);
      ctx.lineTo(rx + r.w * 0.3, H);
      ctx.lineTo(rx - r.w * 0.3, H);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawParticles(time) {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.save();
      ctx.globalAlpha = p.a + Math.sin(time * 1.5 + i) * 0.1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(180,220,255,0.8)";
      ctx.fill();
      ctx.restore();
    }
  }

  function drawRipples() {
    for (var i = ripples.length - 1; i >= 0; i--) {
      var rp = ripples[i];
      rp.r += 1.5;
      rp.a -= 0.008;
      if (rp.a <= 0 || rp.r > rp.maxR) {
        ripples.splice(i, 1);
        continue;
      }
      ctx.save();
      ctx.globalAlpha = rp.a;
      ctx.strokeStyle = "rgba(180,220,255,0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  function drawVignette() {
    var vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.3, W / 2, H / 2, Math.max(W, H) * 0.75);
    vg.addColorStop(0, "transparent");
    vg.addColorStop(1, "rgba(4,10,20,0.5)");
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }

  /* ── Main loop ── */
  var lastTime = performance.now() / 1000;

  function frame() {
    requestAnimationFrame(frame);
    var now = performance.now() / 1000;
    var dt = Math.min(now - lastTime, 0.05);
    lastTime = now;

    ctx.clearRect(0, 0, W, H);

    drawWater();
    drawCaustics(now);
    drawRays(now);
    drawParticles(now);
    drawRipples();

    /* Update and draw fish (sorted by y for depth) */
    for (var i = 0; i < fish.length; i++) {
      fish[i].update(dt, now);
    }
    fish.sort(function (a, b) { return a.y - b.y; });
    for (var i = 0; i < fish.length; i++) {
      fish[i].draw(now);
    }

    drawVignette();
  }

  frame();
})();
