(function () {
  "use strict";

  /* ── Setup ── */
  var container = document.getElementById("koi-pond-wrap");
  if (!container) {
    container = document.createElement("div");
    container.id = "koi-pond-wrap";
    container.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;";
    document.body.insertBefore(container, document.body.firstChild);
  }

  if (typeof THREE === "undefined") return;

  var W = window.innerWidth, H = window.innerHeight;

  /* ── Renderer ── */
  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;
  renderer.autoClear = false;
  container.appendChild(renderer.domElement);
  renderer.domElement.style.cssText = "display:block;width:100%;height:100%;";

  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06111e);
  scene.fog = new THREE.FogExp2(0x06111e, 0.008);

  /* ── Camera (top-down) ── */
  var camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
  camera.position.set(0, 45, 0);
  camera.lookAt(0, 0, 0);

  /* ── Lighting ── */
  scene.add(new THREE.AmbientLight(0x4466aa, 1.2));
  var mainLight = new THREE.DirectionalLight(0x88bbee, 1.8);
  mainLight.position.set(5, 30, 5);
  scene.add(mainLight);
  var accentLight = new THREE.PointLight(0x2266aa, 1.0, 80);
  accentLight.position.set(-10, 20, -10);
  scene.add(accentLight);

  /* ── Water plane ── */
  var waterGeo = new THREE.PlaneGeometry(120, 120, 1, 1);
  waterGeo.rotateX(-Math.PI / 2);
  var waterMat = new THREE.MeshStandardMaterial({ color: 0x0a1828, roughness: 0.3, metalness: 0.1 });
  var water = new THREE.Mesh(waterGeo, waterMat);
  water.position.y = -0.5;
  scene.add(water);

  /* ── Caustics shader ── */
  var causticPlane = new THREE.PlaneGeometry(100, 100, 1, 1);
  causticPlane.rotateX(-Math.PI / 2);
  var causticMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",
    fragmentShader: [
      "uniform float uTime; varying vec2 vUv;",
      "float caustic(vec2 p,float t){ float c=0.0; vec2 uv=p*6.0;",
      "for(int i=0;i<4;i++){ float fi=float(i);",
      "uv+=vec2(sin(uv.y*3.1+t*0.3+fi*1.7)*0.3,cos(uv.x*2.7+t*0.25+fi*1.3)*0.3);",
      "c+=0.5/(1.0+60.0*abs(sin(uv.x*3.0+t*0.2)*sin(uv.y*3.0+t*0.15)));} return c*0.25;}",
      "void main(){ float c=caustic(vUv,uTime); float edge=1.0-smoothstep(0.3,0.5,length(vUv-0.5));",
      "gl_FragColor=vec4(vec3(0.2,0.5,0.7),c*edge*0.35);}"
    ].join("\n")
  });
  var causticMesh = new THREE.Mesh(causticPlane, causticMat);
  causticMesh.position.y = -0.3;
  scene.add(causticMesh);

  /* ── Light rays ── */
  var rays = [];
  for (var r = 0; r < 5; r++) {
    var rayGeo = new THREE.PlaneGeometry(3 + Math.random() * 4, 60);
    var rayMat = new THREE.MeshBasicMaterial({ color: 0x3388aa, transparent: true, opacity: 0.015 + Math.random() * 0.015, side: THREE.DoubleSide, depthWrite: false });
    var ray = new THREE.Mesh(rayGeo, rayMat);
    ray.position.set((Math.random() - 0.5) * 60, 15, (Math.random() - 0.5) * 40);
    ray.rotation.y = Math.random() * Math.PI;
    ray.userData = { baseX: ray.position.x, speed: 0.1 + Math.random() * 0.15, offset: Math.random() * Math.PI * 2 };
    scene.add(ray);
    rays.push(ray);
  }

  /* ── Particles ── */
  var particleCount = 60;
  var particleGeo = new THREE.BufferGeometry();
  var pPositions = new Float32Array(particleCount * 3);
  for (var i = 0; i < particleCount; i++) {
    pPositions[i * 3] = (Math.random() - 0.5) * 80;
    pPositions[i * 3 + 1] = Math.random() * 5;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
  }
  particleGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
  var particleMat = new THREE.PointsMaterial({ color: 0x88bbdd, size: 0.15, transparent: true, opacity: 0.4, depthWrite: false });
  var particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* ── Mouse ── */
  var mouse = { x: 9999, z: 9999 };
  var raycaster = new THREE.Raycaster();
  var mouseNDC = new THREE.Vector2();
  window.addEventListener("mousemove", function (e) {
    mouseNDC.x = (e.clientX / W) * 2 - 1;
    mouseNDC.y = -(e.clientY / H) * 2 + 1;
    raycaster.setFromCamera(mouseNDC, camera);
    var plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    var hit = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, hit);
    if (hit) { mouse.x = hit.x; mouse.z = hit.z; }
  }, { passive: true });
  window.addEventListener("mouseleave", function () { mouse.x = 9999; mouse.z = 9999; });

  /* ══════════════════════════════════════════════
     KOI FISH — 2D canvas-painted sprite textures
     ══════════════════════════════════════════════ */

  function paintKoiTexture(bodyColor, patchColors, scaleColor, w, h) {
    var c = document.createElement("canvas");
    c.width = w; c.height = h;
    var ctx = c.getContext("2d");
    var cx = w / 2, cy = h / 2;

    /* Body outline path (head at left, tail at right) */
    function bodyY(t) {
      /* t: 0=head, 1=tail. Returns half-width */
      if (t < 0.06) return 0.25 + t / 0.06 * 0.75;
      if (t < 0.3) return 1.0;
      if (t < 0.8) return 1.0 - (t - 0.3) / 0.5 * 0.6;
      return 0.4 - (t - 0.8) / 0.2 * 0.32;
    }

    var bodyW = w * 0.42;
    var bodyH = h * 0.38;
    var headX = w * 0.12;

    /* Draw body shape */
    ctx.save();
    ctx.beginPath();
    for (var i = 0; i <= 40; i++) {
      var t = i / 40;
      var x = headX + t * bodyW;
      var y = cy - bodyY(t) * bodyH;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    for (var i = 40; i >= 0; i--) {
      var t = i / 40;
      var x = headX + t * bodyW;
      var y = cy + bodyY(t) * bodyH;
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.clip();

    /* Base body color */
    ctx.fillStyle = bodyColor;
    ctx.fillRect(0, 0, w, h);

    /* Color patches */
    for (var p = 0; p < patchColors.length; p++) {
      var px = headX + (0.1 + Math.random() * 0.65) * bodyW;
      var py = cy + (Math.random() - 0.5) * bodyH * 0.6;
      var pr = (0.08 + Math.random() * 0.15) * bodyW;
      var grad = ctx.createRadialGradient(px, py, 0, px, py, pr);
      grad.addColorStop(0, patchColors[p]);
      grad.addColorStop(0.75, patchColors[p]);
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(px - pr, py - pr, pr * 2, pr * 2);
    }

    /* Scale pattern */
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = scaleColor;
    ctx.lineWidth = 0.6;
    for (var sx = 0; sx < 30; sx++) {
      for (var sy = 0; sy < 8; sy++) {
        var stx = headX + (sx / 30) * bodyW * 0.9 + (sy % 2) * bodyW * 0.015;
        var sty = cy - bodyH * 0.8 + (sy / 8) * bodyH * 1.6;
        ctx.beginPath();
        ctx.arc(stx, sty, bodyW * 0.018, 0, Math.PI);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1.0;

    /* Specular highlight along spine */
    var specGrad = ctx.createLinearGradient(headX, cy - bodyH * 0.3, headX, cy - bodyH * 0.1);
    specGrad.addColorStop(0, "rgba(255,255,255,0)");
    specGrad.addColorStop(0.5, "rgba(255,255,255,0.25)");
    specGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = specGrad;
    ctx.fillRect(headX, cy - bodyH * 0.35, bodyW * 0.7, bodyH * 0.3);

    /* Belly highlight */
    var bellyGrad = ctx.createLinearGradient(headX, cy + bodyH * 0.1, headX, cy + bodyH * 0.4);
    bellyGrad.addColorStop(0, "rgba(255,255,255,0.12)");
    bellyGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = bellyGrad;
    ctx.fillRect(headX, cy + bodyH * 0.05, bodyW * 0.6, bodyH * 0.4);

    ctx.restore();

    /* Eye */
    var eyeX = headX + bodyW * 0.06;
    ctx.beginPath();
    ctx.arc(eyeX, cy - bodyH * 0.2, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = "#111";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(eyeX - 0.5, cy - bodyH * 0.2 - 0.5, 0.8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.fill();

    /* Tail fin */
    var tailX = headX + bodyW;
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(tailX, cy);
    ctx.bezierCurveTo(tailX + bodyW * 0.15, cy - bodyH * 0.3, tailX + bodyW * 0.25, cy - bodyH * 0.8, tailX + bodyW * 0.35, cy - bodyH * 1.1);
    ctx.bezierCurveTo(tailX + bodyW * 0.2, cy - bodyH * 0.4, tailX + bodyW * 0.1, cy, tailX, cy);
    ctx.fillStyle = patchColors[0] || bodyColor;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(tailX, cy);
    ctx.bezierCurveTo(tailX + bodyW * 0.15, cy + bodyH * 0.3, tailX + bodyW * 0.25, cy + bodyH * 0.8, tailX + bodyW * 0.35, cy + bodyH * 1.1);
    ctx.bezierCurveTo(tailX + bodyW * 0.2, cy + bodyH * 0.4, tailX + bodyW * 0.1, cy, tailX, cy);
    ctx.fill();

    /* Fin rays */
    ctx.globalAlpha = 0.12;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 0.5;
    for (var fr = 0; fr < 6; fr++) {
      var frt = (fr + 1) / 7;
      ctx.beginPath();
      ctx.moveTo(tailX, cy);
      ctx.lineTo(tailX + bodyW * 0.3 * frt, cy - bodyH * 0.9 * frt);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(tailX, cy);
      ctx.lineTo(tailX + bodyW * 0.3 * frt, cy + bodyH * 0.9 * frt);
      ctx.stroke();
    }
    ctx.restore();

    /* Pectoral fins */
    ctx.save();
    ctx.globalAlpha = 0.4;
    var pecX = headX + bodyW * 0.22;
    for (var side = -1; side <= 1; side += 2) {
      ctx.beginPath();
      ctx.moveTo(pecX, cy + bodyH * 0.35 * side);
      ctx.bezierCurveTo(
        pecX + bodyW * 0.08, cy + bodyH * 0.9 * side,
        pecX + bodyW * 0.18, cy + bodyH * 1.0 * side,
        pecX + bodyW * 0.22, cy + bodyH * 0.6 * side
      );
      ctx.bezierCurveTo(
        pecX + bodyW * 0.12, cy + bodyH * 0.5 * side,
        pecX + bodyW * 0.04, cy + bodyH * 0.4 * side,
        pecX, cy + bodyH * 0.35 * side
      );
      ctx.fillStyle = bodyColor;
      ctx.fill();
    }
    ctx.restore();

    /* Dorsal fin */
    ctx.save();
    ctx.globalAlpha = 0.35;
    var dorX = headX + bodyW * 0.35;
    ctx.beginPath();
    ctx.moveTo(dorX, cy - bodyH * 0.85);
    ctx.bezierCurveTo(dorX + bodyW * 0.05, cy - bodyH * 1.2, dorX + bodyW * 0.15, cy - bodyH * 1.15, dorX + bodyW * 0.2, cy - bodyH * 0.85);
    ctx.lineTo(dorX, cy - bodyH * 0.85);
    ctx.fillStyle = scaleColor;
    ctx.fill();
    ctx.restore();

    return c;
  }

  /* ── Koi varieties ── */
  var VARIETIES = [
    { body: "#f8eedc", patches: ["#e85020", "#ff6b2e", "#f04818"], scale: "#cc6630" },
    { body: "#f8eedc", patches: ["#e85020", "#1a1a1a", "#ff5522"], scale: "#aa5530" },
    { body: "#1a1a18", patches: ["#e04020", "#dd5533"],            scale: "#444444" },
    { body: "#e8a818", patches: ["#ffcc30", "#f0b820"],            scale: "#bb8818" },
    { body: "#1a1a18", patches: ["#e04020", "#f8eedc", "#ff4422"], scale: "#444444" },
    { body: "#3a5a78", patches: ["#cc4422", "#2a4a68"],            scale: "#2a4a68" },
    { body: "#f0ece4", patches: ["#ffffff", "#e8e4dc"],            scale: "#cccccc" },
    { body: "#f8eedc", patches: ["#dd1818"],                       scale: "#cc8866" },
    { body: "#1a1a18", patches: ["#e8a818", "#d49818"],            scale: "#444444" }
  ];

  /* Generate textures */
  var koiTextures = [];
  for (var i = 0; i < VARIETIES.length; i++) {
    var v = VARIETIES[i];
    var canvas = paintKoiTexture(v.body, v.patches, v.scale, 256, 128);
    var tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    koiTextures.push(tex);
  }

  /* ── Create sprite fish ── */
  function createKoiFish(texIndex, scale) {
    var s = scale || 1;
    var geo = new THREE.PlaneGeometry(6 * s, 3 * s);
    geo.rotateX(-Math.PI / 2);
    var mat = new THREE.MeshBasicMaterial({
      map: koiTextures[texIndex % koiTextures.length],
      transparent: true,
      alphaTest: 0.01,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    var mesh = new THREE.Mesh(geo, mat);

    /* Shadow */
    var shadowGeo = new THREE.PlaneGeometry(5 * s, 2 * s);
    shadowGeo.rotateX(-Math.PI / 2);
    var shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.12, depthWrite: false });
    var shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.position.y = -0.4;
    shadow.position.x = 0.3;
    mesh.add(shadow);

    return mesh;
  }

  /* ── Fish state ── */
  var fishList = [];

  for (var i = 0; i < 9; i++) {
    var scale = 0.7 + Math.random() * 0.5;
    var fish = createKoiFish(i, scale);
    fish.position.set(
      (Math.random() - 0.5) * 50,
      0.2 + Math.random() * 0.3,
      (Math.random() - 0.5) * 35
    );
    fish.rotation.y = Math.random() * Math.PI * 2;
    scene.add(fish);

    fishList.push({
      mesh: fish,
      angle: fish.rotation.y,
      speed: 0.02 + Math.random() * 0.012,
      baseSpeed: 0.02 + Math.random() * 0.012,
      turnTimer: Math.random() * 3,
      turnTarget: fish.rotation.y,
      fleeing: 0
    });
  }

  /* ── Hero fish ── */
  var heroFish = createKoiFish(0, 1.6);
  heroFish.position.set(0, 0.5, 0);
  scene.add(heroFish);

  var scrollY = 0, maxScroll = 1;
  function updateScroll() {
    scrollY = window.scrollY || window.pageYOffset;
    maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", updateScroll);

  function heroPath(p) {
    p = Math.max(0, Math.min(1, p));
    return { x: Math.sin(p * Math.PI * 2.5) * 18, z: (p - 0.5) * -50 };
  }

  /* ── Ripples ── */
  var ripples = [];
  var lastRippleTime = 0;
  window.addEventListener("mousemove", function () {
    var now = performance.now() / 1000;
    if (now - lastRippleTime > 0.25 && mouse.x < 900) {
      var ringGeo = new THREE.RingGeometry(0.1, 0.3, 32);
      ringGeo.rotateX(-Math.PI / 2);
      var ringMat = new THREE.MeshBasicMaterial({ color: 0x4488aa, transparent: true, opacity: 0.3, side: THREE.DoubleSide, depthWrite: false });
      var ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(mouse.x, 0.1, mouse.z);
      scene.add(ring);
      ripples.push({ mesh: ring, age: 0 });
      lastRippleTime = now;
    }
  }, { passive: true });

  /* ── Vignette ── */
  var vignetteScene = new THREE.Scene();
  var vignetteCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var vignetteMat = new THREE.ShaderMaterial({
    transparent: true, depthTest: false, depthWrite: false,
    vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }",
    fragmentShader: "varying vec2 vUv; void main(){ float d=length(vUv-0.5)*1.8; float v=smoothstep(0.2,1.1,d); gl_FragColor=vec4(0.02,0.06,0.12,v*0.55); }"
  });
  vignetteScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), vignetteMat));

  /* ── Helpers ── */
  function angleWrap(a) {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
  }

  /* ── Mobile: reduce fish ── */
  var isMobile = W < 768;
  if (isMobile) {
    for (var ri = fishList.length - 1; ri >= 5; ri--) {
      scene.remove(fishList[ri].mesh);
      fishList.splice(ri, 1);
    }
  }

  /* ── Pause when tab hidden ── */
  var tabVisible = true;
  document.addEventListener("visibilitychange", function () {
    tabVisible = !document.hidden;
    if (tabVisible) clock.getDelta();
  });

  /* ── Animation ── */
  var clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!tabVisible) return;
    var dt = Math.min(clock.getDelta(), 0.05);
    var t = clock.getElapsedTime();

    /* Caustics */
    causticMat.uniforms.uTime.value = t;

    /* Light rays */
    for (var r = 0; r < rays.length; r++) {
      var ry = rays[r];
      ry.position.x = ry.userData.baseX + Math.sin(t * ry.userData.speed + ry.userData.offset) * 3;
      ry.material.opacity = 0.012 + Math.sin(t * 0.3 + ry.userData.offset) * 0.008;
    }

    /* Particles */
    var pArr = particles.geometry.attributes.position.array;
    for (var i = 0; i < particleCount; i++) {
      pArr[i * 3] += Math.sin(t * 0.2 + i) * 0.003;
      pArr[i * 3 + 2] += Math.cos(t * 0.15 + i * 0.5) * 0.003;
      if (pArr[i * 3] > 40) pArr[i * 3] = -40;
      if (pArr[i * 3 + 2] > 30) pArr[i * 3 + 2] = -30;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    /* ── Fish AI ── */
    for (var i = 0; i < fishList.length; i++) {
      var f = fishList[i];
      var m = f.mesh;

      /* Flee from cursor */
      var dx = m.position.x - mouse.x;
      var dz = m.position.z - mouse.z;
      var dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < 12 && dist > 2) {
        var fleeAngle = Math.atan2(-dz, -dx);
        var urgency = 1 - dist / 12;
        f.angle += angleWrap(fleeAngle - f.angle) * urgency * 0.05;
        f.speed = f.baseSpeed + urgency * 0.08;
        f.fleeing = Math.min(f.fleeing + dt * 2, 1);
      } else if (dist <= 2) {
        f.speed = f.baseSpeed + 0.08;
        f.fleeing = 1;
      } else {
        f.speed += (f.baseSpeed - f.speed) * 0.02;
        f.fleeing = Math.max(f.fleeing - dt, 0);
      }

      /* Fish avoidance */
      for (var j = 0; j < fishList.length; j++) {
        if (j === i) continue;
        var ox = m.position.x - fishList[j].mesh.position.x;
        var oz = m.position.z - fishList[j].mesh.position.z;
        var od = Math.sqrt(ox * ox + oz * oz);
        if (od < 5 && od > 0) {
          f.angle += angleWrap(Math.atan2(-oz, -ox) - f.angle) * 0.02;
        }
      }

      /* Idle turning */
      f.turnTimer -= dt;
      if (f.turnTimer <= 0) {
        f.turnTarget = f.angle + (Math.random() - 0.5) * 1.2;
        f.turnTimer = 2.5 + Math.random() * 4;
      }
      if (f.fleeing < 0.3) {
        f.angle += angleWrap(f.turnTarget - f.angle) * 0.012;
      }

      /* Boundary */
      var margin = 24;
      if (m.position.x < -margin) f.angle += angleWrap(0 - f.angle) * 0.03;
      if (m.position.x > margin) f.angle += angleWrap(Math.PI - f.angle) * 0.03;
      if (m.position.z < -margin) f.angle += angleWrap(Math.PI / 2 - f.angle) * 0.03;
      if (m.position.z > margin) f.angle += angleWrap(-Math.PI / 2 - f.angle) * 0.03;

      /* Move */
      m.position.x += Math.cos(f.angle) * f.speed;
      m.position.z += Math.sin(f.angle) * f.speed;
      m.position.y = 0.2 + Math.sin(t * 0.5 + i) * 0.1;

      /* Face direction (sprite rotates around Y) */
      var targetRot = -f.angle + Math.PI / 2;
      m.rotation.y += angleWrap(targetRot - m.rotation.y) * 0.06;
    }

    /* ── Hero fish ── */
    var scrollProgress = scrollY / maxScroll;
    var heroTarget = heroPath(scrollProgress);
    heroFish.position.x += (heroTarget.x - heroFish.position.x) * 0.03;
    heroFish.position.z += (heroTarget.z - heroFish.position.z) * 0.03;
    heroFish.position.y = 0.4 + Math.sin(t * 0.4) * 0.15;

    var heroAngle = Math.atan2(heroTarget.z - heroFish.position.z, heroTarget.x - heroFish.position.x);
    var heroTargetRot = -heroAngle + Math.PI / 2;
    heroFish.rotation.y += angleWrap(heroTargetRot - heroFish.rotation.y) * 0.04;

    /* ── Ripples ── */
    for (var i = ripples.length - 1; i >= 0; i--) {
      var rp = ripples[i];
      rp.age += dt;
      var sc = 1 + rp.age * 8;
      rp.mesh.scale.set(sc, 1, sc);
      rp.mesh.material.opacity = Math.max(0, 0.3 - rp.age * 0.4);
      if (rp.age > 1) {
        scene.remove(rp.mesh);
        rp.mesh.geometry.dispose();
        rp.mesh.material.dispose();
        ripples.splice(i, 1);
      }
    }

    /* ── Render ── */
    renderer.clear();
    renderer.render(scene, camera);
    renderer.clearDepth();
    renderer.render(vignetteScene, vignetteCamera);
  }

  animate();

  /* ── Resize ── */
  window.addEventListener("resize", function () {
    W = window.innerWidth;
    H = window.innerHeight;
    renderer.setSize(W, H);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    isMobile = W < 768;
  });

})();
