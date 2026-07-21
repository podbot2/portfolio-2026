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
  scene.add(new THREE.AmbientLight(0x1a3050, 0.8));

  var mainLight = new THREE.DirectionalLight(0x4488bb, 1.5);
  mainLight.position.set(5, 30, 5);
  scene.add(mainLight);

  var accentLight = new THREE.PointLight(0x2266aa, 1.2, 80);
  accentLight.position.set(-10, 20, -10);
  scene.add(accentLight);

  var warmLight = new THREE.PointLight(0x664422, 0.6, 60);
  warmLight.position.set(15, 15, 10);
  scene.add(warmLight);

  /* ── Water plane ── */
  var waterGeo = new THREE.PlaneGeometry(120, 120, 1, 1);
  waterGeo.rotateX(-Math.PI / 2);
  var waterMat = new THREE.MeshStandardMaterial({
    color: 0x0a1828,
    roughness: 0.3,
    metalness: 0.1
  });
  var water = new THREE.Mesh(waterGeo, waterMat);
  water.position.y = -0.5;
  scene.add(water);

  /* ── Caustic light pattern (projected texture simulation) ── */
  var causticPlane = new THREE.PlaneGeometry(100, 100, 1, 1);
  causticPlane.rotateX(-Math.PI / 2);
  var causticMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 }
    },
    vertexShader: [
      "varying vec2 vUv;",
      "void main() {",
      "  vUv = uv;",
      "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
      "}"
    ].join("\n"),
    fragmentShader: [
      "uniform float uTime;",
      "varying vec2 vUv;",
      "",
      "float caustic(vec2 p, float t) {",
      "  float c = 0.0;",
      "  vec2 uv = p * 6.0;",
      "  for (int i = 0; i < 4; i++) {",
      "    float fi = float(i);",
      "    uv += vec2(",
      "      sin(uv.y * 3.1 + t * 0.3 + fi * 1.7) * 0.3,",
      "      cos(uv.x * 2.7 + t * 0.25 + fi * 1.3) * 0.3",
      "    );",
      "    c += 0.5 / (1.0 + 60.0 * abs(sin(uv.x * 3.0 + t * 0.2) * sin(uv.y * 3.0 + t * 0.15)));",
      "  }",
      "  return c * 0.25;",
      "}",
      "",
      "void main() {",
      "  float c = caustic(vUv, uTime);",
      "  float edge = 1.0 - smoothstep(0.3, 0.5, length(vUv - 0.5));",
      "  gl_FragColor = vec4(vec3(0.2, 0.5, 0.7), c * edge * 0.35);",
      "}"
    ].join("\n")
  });
  var causticMesh = new THREE.Mesh(causticPlane, causticMat);
  causticMesh.position.y = -0.3;
  scene.add(causticMesh);

  /* ── Light rays (volumetric shafts) ── */
  var rays = [];
  for (var r = 0; r < 5; r++) {
    var rayGeo = new THREE.PlaneGeometry(3 + Math.random() * 4, 60);
    var rayMat = new THREE.MeshBasicMaterial({
      color: 0x3388aa,
      transparent: true,
      opacity: 0.015 + Math.random() * 0.015,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    var ray = new THREE.Mesh(rayGeo, rayMat);
    ray.position.set(
      (Math.random() - 0.5) * 60,
      15,
      (Math.random() - 0.5) * 40
    );
    ray.rotation.y = Math.random() * Math.PI;
    ray.rotation.z = (Math.random() - 0.5) * 0.3;
    ray.userData = { baseX: ray.position.x, speed: 0.1 + Math.random() * 0.15, offset: Math.random() * Math.PI * 2 };
    scene.add(ray);
    rays.push(ray);
  }

  /* ── Floating particles ── */
  var particleCount = 60;
  var particleGeo = new THREE.BufferGeometry();
  var pPositions = new Float32Array(particleCount * 3);
  for (var i = 0; i < particleCount; i++) {
    pPositions[i * 3] = (Math.random() - 0.5) * 80;
    pPositions[i * 3 + 1] = Math.random() * 5;
    pPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;
  }
  particleGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
  var particleMat = new THREE.PointsMaterial({
    color: 0x88bbdd,
    size: 0.15,
    transparent: true,
    opacity: 0.4,
    depthWrite: false
  });
  var particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* ── Mouse (for fish interaction) ── */
  var mouse = { x: 9999, z: 9999 };
  var raycaster = new THREE.Raycaster();
  var mouseNDC = new THREE.Vector2();

  window.addEventListener("mousemove", function (e) {
    mouseNDC.x = (e.clientX / W) * 2 - 1;
    mouseNDC.y = -(e.clientY / H) * 2 + 1;
    raycaster.setFromCamera(mouseNDC, camera);
    var plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    var intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(plane, intersection);
    if (intersection) {
      mouse.x = intersection.x;
      mouse.z = intersection.z;
    }
  }, { passive: true });

  window.addEventListener("mouseleave", function () {
    mouse.x = 9999;
    mouse.z = 9999;
  });

  /* ── Koi varieties (vivid, saturated like real koi) ── */
  var VARIETIES = [
    { name: "Kohaku",        body: 0xf8f0e0, patches: [0xe85020, 0xff6b2e, 0xf04818], fin: 0xf8e8d0, finTint: 0xff8844 },
    { name: "Sanke",         body: 0xf8f0e0, patches: [0xe85020, 0x1a1a1a, 0xff5522], fin: 0xf0e0cc, finTint: 0xddaa88 },
    { name: "Hi Utsuri",     body: 0x1a1a18, patches: [0xe04020, 0xff5530],           fin: 0x282420, finTint: 0x444038 },
    { name: "Ogon",          body: 0xe8a818, patches: [0xffcc30, 0xf0b820],           fin: 0xdda020, finTint: 0xeebb40 },
    { name: "Showa",         body: 0x1a1a18, patches: [0xe04020, 0xf8f0e0, 0xff4422], fin: 0x282420, finTint: 0x443830 },
    { name: "Asagi",         body: 0x3a5a78, patches: [0xcc4422, 0x2a4a68],           fin: 0x4a6a88, finTint: 0x6688aa },
    { name: "Platinum Ogon", body: 0xf0ece4, patches: [0xffffff, 0xe8e4dc],           fin: 0xe0dcd4, finTint: 0xeeeae4 },
    { name: "Tancho",        body: 0xf8f0e0, patches: [0xdd1818],                     fin: 0xf0e0cc, finTint: 0xddaa88 },
    { name: "Ki Utsuri",     body: 0x1a1a18, patches: [0xe8a818, 0xd49818],           fin: 0x282420, finTint: 0x504828 }
  ];

  /* ── Build a segmented koi mesh ── */
  var SPINE_SEGS = 6;

  function bodyRadius(t) {
    if (t < 0.05) return 0.35 + t / 0.05 * 0.65;
    if (t < 0.3) return 1.0 + Math.sin((t - 0.05) / 0.25 * Math.PI) * 0.06;
    if (t < 0.82) return 1.0 - (t - 0.3) / 0.52 * 0.65;
    return 0.35 - (t - 0.82) / 0.18 * 0.28;
  }

  function createSegment(variety, tStart, tEnd, s) {
    var pts = [];
    var steps = 6;
    for (var i = 0; i <= steps; i++) {
      var t = tStart + (tEnd - tStart) * (i / steps);
      var r = Math.max(bodyRadius(t), 0.04) * 0.6 * s;
      var x = (i / steps - 0.5) * ((tEnd - tStart) * 6 * s);
      pts.push(new THREE.Vector2(r, x));
    }
    var geo = new THREE.LatheGeometry(pts, 14);
    geo.rotateZ(Math.PI / 2);

    /* Scale bump */
    var pos = geo.attributes.position;
    var norm = geo.attributes.normal;
    for (var vi = 0; vi < pos.count; vi++) {
      var vx = pos.getX(vi), vy = pos.getY(vi), vz = pos.getZ(vi);
      var bump = Math.sin(vx * 14 + tStart * 30) * Math.sin(vz * 16 + vx * 3) * 0.006 * s;
      if (norm) {
        pos.setX(vi, vx + norm.getX(vi) * bump);
        pos.setY(vi, vy + norm.getY(vi) * bump);
        pos.setZ(vi, vz + norm.getZ(vi) * bump);
      }
    }
    geo.computeVertexNormals();

    var mat = new THREE.MeshPhysicalMaterial({
      color: variety.body,
      roughness: 0.25,
      metalness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      sheen: 0.3,
      sheenColor: new THREE.Color(0xffffff)
    });
    return new THREE.Mesh(geo, mat);
  }

  function createKoi(variety, scale) {
    var root = new THREE.Group();
    var s = scale || 1;

    /* Spine: chain of pivots, each holding a body segment */
    var segments = [];
    var segLen = (6 * s) / SPINE_SEGS;

    for (var i = 0; i < SPINE_SEGS; i++) {
      var pivot = new THREE.Group();
      var tStart = i / SPINE_SEGS;
      var tEnd = (i + 1) / SPINE_SEGS;
      var seg = createSegment(variety, tStart, tEnd, s);
      seg.scale.y = 0.4;
      pivot.add(seg);
      pivot.position.x = i === 0 ? 0 : -segLen;

      /* Patches on this segment */
      var patchChance = variety.name === "Tancho" ? (i === 0 ? 1 : 0) : 0.55;
      if (Math.random() < patchChance) {
        var pSize = variety.name === "Tancho" ? 0.35 * s : (0.3 + Math.random() * 0.5) * s;
        var patchGeo = new THREE.SphereGeometry(pSize, 8, 6);
        var patchMat = new THREE.MeshPhysicalMaterial({
          color: variety.patches[Math.floor(Math.random() * variety.patches.length)],
          roughness: 0.28,
          metalness: 0.05,
          clearcoat: 0.8
        });
        var patch = new THREE.Mesh(patchGeo, patchMat);
        patch.position.set(0, 0.06 * s, (Math.random() - 0.5) * 0.2 * s);
        patch.scale.set(1.1, 0.15, 0.8);
        pivot.add(patch);
      }

      segments.push(pivot);
      if (i === 0) root.add(pivot);
      else segments[i - 1].add(pivot);
    }

    /* Fin material */
    var finMat = new THREE.MeshPhysicalMaterial({
      color: variety.finTint,
      roughness: 0.35,
      metalness: 0.02,
      transparent: true,
      opacity: 0.75,
      side: THREE.DoubleSide,
      clearcoat: 0.4
    });

    /* Tail fin on last segment */
    var tailShape = new THREE.Shape();
    tailShape.moveTo(0, 0);
    tailShape.bezierCurveTo(0.6*s, 0.4*s, 1.2*s, 1.0*s, 1.8*s, 1.4*s);
    tailShape.bezierCurveTo(1.4*s, 0.8*s, 0.8*s, 0.2*s, 0.3*s, 0);
    tailShape.bezierCurveTo(0.8*s, -0.2*s, 1.4*s, -0.8*s, 1.8*s, -1.4*s);
    tailShape.bezierCurveTo(1.2*s, -1.0*s, 0.6*s, -0.4*s, 0, 0);
    var tailGeo = new THREE.ShapeGeometry(tailShape, 8);
    tailGeo.rotateY(Math.PI / 2);
    tailGeo.rotateX(Math.PI / 2);
    var tail = new THREE.Mesh(tailGeo, finMat.clone());
    tail.position.x = -segLen * 0.4;
    tail.scale.y = 0.4;
    segments[SPINE_SEGS - 1].add(tail);

    /* Pectoral fins on segment 1 (behind head) */
    var pectorals = [];
    for (var side = -1; side <= 1; side += 2) {
      var pfShape = new THREE.Shape();
      pfShape.moveTo(0, 0);
      pfShape.bezierCurveTo(0.2*s, 0.5*s*side, 0.6*s, 0.9*s*side, 1.2*s, 0.6*s*side);
      pfShape.bezierCurveTo(0.8*s, 0.3*s*side, 0.3*s, 0.1*s*side, 0, 0);
      var pfGeo = new THREE.ShapeGeometry(pfShape, 6);
      pfGeo.rotateX(Math.PI / 2);
      var pFin = new THREE.Mesh(pfGeo, finMat.clone());
      pFin.position.set(0, -0.02 * s, 0.3 * s * side);
      pFin.scale.y = 0.4;
      segments[1].add(pFin);
      pectorals.push(pFin);
    }

    /* Dorsal fin on segment 2 */
    var dorsalShape = new THREE.Shape();
    dorsalShape.moveTo(0, 0);
    dorsalShape.bezierCurveTo(-0.2*s, 0.5*s, -0.5*s, 0.55*s, -1.0*s, 0.15*s);
    dorsalShape.lineTo(0, 0);
    var dorsalGeo = new THREE.ShapeGeometry(dorsalShape, 6);
    var dorsal = new THREE.Mesh(dorsalGeo, finMat.clone());
    dorsal.position.set(0, 0.18 * s, 0);
    dorsal.rotation.y = Math.PI / 2;
    dorsal.scale.y = 0.4;
    segments[2].add(dorsal);

    /* Shadow disc under fish */
    var shadowGeo = new THREE.CircleGeometry(1.8 * s, 16);
    shadowGeo.rotateX(-Math.PI / 2);
    var shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.15,
      depthWrite: false
    });
    var shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.position.y = -0.45;
    shadow.scale.set(1.5, 1, 0.5);
    root.add(shadow);

    root.userData.segments = segments;
    root.userData.tail = tail;
    root.userData.pectorals = pectorals;
    root.userData.shadow = shadow;

    return root;
  }

  /* ── Create and track fish ── */
  var fishList = [];

  for (var i = 0; i < 9; i++) {
    var variety = VARIETIES[i];
    var scale = 0.6 + Math.random() * 0.5;
    var koi = createKoi(variety, scale);

    koi.position.set(
      (Math.random() - 0.5) * 50,
      0.2 + Math.random() * 0.5,
      (Math.random() - 0.5) * 35
    );
    koi.rotation.y = Math.random() * Math.PI * 2;

    scene.add(koi);

    fishList.push({
      mesh: koi,
      angle: koi.rotation.y,
      speed: 0.015 + Math.random() * 0.01,
      baseSpeed: 0.015 + Math.random() * 0.01,
      turnTimer: Math.random() * 3,
      turnTarget: koi.rotation.y,
      phase: Math.random() * Math.PI * 2,
      freq: 2 + Math.random() * 1.5,
      fleeing: 0,
      scale: scale
    });
  }

  /* ── Hero fish: larger, brighter, scroll-driven ── */
  var heroVariety = { name: "Hero", body: 0xf8e0c8, patches: [0xff5520, 0xff7730, 0xe84818], fin: 0xf8d8b8, finTint: 0xff9955 };
  var heroScale = 1.4;
  var heroKoi = createKoi(heroVariety, heroScale);
  heroKoi.position.set(0, 0.6, 0);
  scene.add(heroKoi);

  /* Scroll state */
  var scrollY = 0;
  var maxScroll = 1;
  function updateScroll() {
    scrollY = window.scrollY || window.pageYOffset;
    maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("resize", updateScroll);

  /* Hero fish path: sinuous S-curve across the pond as you scroll */
  function heroPath(progress) {
    var p = Math.max(0, Math.min(1, progress));
    return {
      x: Math.sin(p * Math.PI * 2.5) * 18,
      z: (p - 0.5) * -50
    };
  }

  /* ── Ripple rings ── */
  var ripples = [];
  var lastRippleTime = 0;
  window.addEventListener("mousemove", function () {
    var now = performance.now() / 1000;
    if (now - lastRippleTime > 0.25 && mouse.x < 900) {
      var ringGeo = new THREE.RingGeometry(0.1, 0.3, 32);
      ringGeo.rotateX(-Math.PI / 2);
      var ringMat = new THREE.MeshBasicMaterial({
        color: 0x4488aa,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        depthWrite: false
      });
      var ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(mouse.x, 0.1, mouse.z);
      scene.add(ring);
      ripples.push({ mesh: ring, age: 0 });
      lastRippleTime = now;
    }
  }, { passive: true });

  /* ── Helpers ── */
  function angleWrap(a) {
    while (a > Math.PI) a -= Math.PI * 2;
    while (a < -Math.PI) a += Math.PI * 2;
    return a;
  }

  /* ── Animation loop ── */
  var clock = new THREE.Clock();

  /* ── Vignette overlay (screen-space quad) ── */
  var vignetteScene = new THREE.Scene();
  var vignetteCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  var vignetteMat = new THREE.ShaderMaterial({
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: {},
    vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }",
    fragmentShader: [
      "varying vec2 vUv;",
      "void main(){",
      "  float d = length(vUv - 0.5) * 1.8;",
      "  float v = smoothstep(0.2, 1.1, d);",
      "  gl_FragColor = vec4(0.02, 0.06, 0.12, v * 0.55);",
      "}"
    ].join("\n")
  });
  var vignetteQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), vignetteMat);
  vignetteScene.add(vignetteQuad);
  renderer.autoClear = false;

  /* ── Reduce fish count on mobile for performance ── */
  var isMobile = W < 768;
  if (isMobile) {
    /* Remove some background fish on mobile */
    for (var ri = fishList.length - 1; ri >= 5; ri--) {
      scene.remove(fishList[ri].mesh);
      fishList.splice(ri, 1);
    }
  }

  /* ── Performance: pause when tab hidden ── */
  var tabVisible = true;
  document.addEventListener("visibilitychange", function () {
    tabVisible = !document.hidden;
    if (tabVisible) clock.getDelta(); /* reset delta so no huge jump */
  });

  function animate() {
    requestAnimationFrame(animate);
    if (!tabVisible) return;
    var dt = Math.min(clock.getDelta(), 0.05);
    var t = clock.getElapsedTime();

    /* Caustic shader */
    causticMat.uniforms.uTime.value = t;

    /* Light rays sway */
    for (var r = 0; r < rays.length; r++) {
      var ray = rays[r];
      ray.position.x = ray.userData.baseX + Math.sin(t * ray.userData.speed + ray.userData.offset) * 3;
      ray.material.opacity = 0.012 + Math.sin(t * 0.3 + ray.userData.offset) * 0.008;
    }

    /* Particles drift */
    var pArr = particles.geometry.attributes.position.array;
    for (var i = 0; i < particleCount; i++) {
      pArr[i * 3] += Math.sin(t * 0.2 + i) * 0.003;
      pArr[i * 3 + 2] += Math.cos(t * 0.15 + i * 0.5) * 0.003;
      if (pArr[i * 3] > 40) pArr[i * 3] = -40;
      if (pArr[i * 3 + 2] > 30) pArr[i * 3 + 2] = -30;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    /* Fish AI + swimming */
    for (var i = 0; i < fishList.length; i++) {
      var f = fishList[i];
      var m = f.mesh;

      /* Flee from cursor */
      var dx = m.position.x - mouse.x;
      var dz = m.position.z - mouse.z;
      var dist = Math.sqrt(dx * dx + dz * dz);
      var fleeRadius = 12;

      if (dist < fleeRadius && dist > 0) {
        var fleeAngle = Math.atan2(dx, dz);
        var urgency = 1 - dist / fleeRadius;
        f.angle += angleWrap(fleeAngle - f.angle) * urgency * 0.12;
        f.speed = f.baseSpeed + urgency * 0.12;
        f.fleeing = Math.min(f.fleeing + dt * 3, 1);
      } else {
        f.speed += (f.baseSpeed - f.speed) * 0.02;
        f.fleeing = Math.max(f.fleeing - dt * 1.5, 0);
      }

      /* Idle turning */
      f.turnTimer -= dt;
      if (f.turnTimer <= 0) {
        f.turnTarget = f.angle + (Math.random() - 0.5) * 1.5;
        f.turnTimer = 2 + Math.random() * 4;
      }
      if (f.fleeing < 0.3) {
        f.angle += angleWrap(f.turnTarget - f.angle) * 0.015;
      }

      /* Fish-to-fish avoidance */
      for (var j = 0; j < fishList.length; j++) {
        if (j === i) continue;
        var ox = m.position.x - fishList[j].mesh.position.x;
        var oz = m.position.z - fishList[j].mesh.position.z;
        var od = Math.sqrt(ox * ox + oz * oz);
        if (od < 4 && od > 0) {
          var avoidAngle = Math.atan2(ox, oz);
          f.angle += angleWrap(avoidAngle - f.angle) * 0.03;
        }
      }

      /* Boundary steering */
      var bx = m.position.x, bz = m.position.z;
      var margin = 22;
      if (bx < -margin) f.angle += angleWrap(0 - f.angle) * 0.04;
      if (bx > margin) f.angle += angleWrap(Math.PI - f.angle) * 0.04;
      if (bz < -margin) f.angle += angleWrap(Math.PI / 2 - f.angle) * 0.04;
      if (bz > margin) f.angle += angleWrap(-Math.PI / 2 - f.angle) * 0.04;

      /* Move */
      m.position.x += Math.sin(f.angle) * f.speed * -1;
      m.position.z += Math.cos(f.angle) * f.speed * -1;

      /* Body rotation */
      m.rotation.y += angleWrap(f.angle - m.rotation.y) * 0.08;

      /* Spine wave: each segment rotates with increasing amplitude toward tail */
      var segs = m.userData.segments;
      var swimFreq = f.freq + f.fleeing * 6;
      if (segs) {
        for (var si = 1; si < segs.length; si++) {
          var segT = si / (segs.length - 1);
          var amp = segT * segT * (0.15 + f.fleeing * 0.25);
          segs[si].rotation.y = Math.sin(t * swimFreq - si * 0.6 + f.phase) * amp;
        }
      }

      /* Pectoral fin flap */
      var pecs = m.userData.pectorals;
      if (pecs) {
        var flapAngle = Math.sin(t * 1.5 + f.phase) * 0.25;
        pecs[0].rotation.x = -Math.PI / 2 + flapAngle;
        pecs[1].rotation.x = -Math.PI / 2 - flapAngle;
      }

      /* Tail fin extra wag */
      if (m.userData.tail) {
        m.userData.tail.rotation.y = Math.sin(t * swimFreq + f.phase) * (0.35 + f.fleeing * 0.5);
      }

      /* Subtle depth bob */
      m.position.y = 0.3 + Math.sin(t * 0.5 + f.phase) * 0.15;

      /* Shadow follows */
      if (m.userData.shadow) {
        m.userData.shadow.position.x = 0;
        m.userData.shadow.position.z = 0;
      }
    }

    /* ── Hero fish: scroll-driven position + swimming animation ── */
    var scrollProgress = scrollY / maxScroll;
    var heroTarget = heroPath(scrollProgress);
    heroKoi.position.x += (heroTarget.x - heroKoi.position.x) * 0.03;
    heroKoi.position.z += (heroTarget.z - heroKoi.position.z) * 0.03;
    heroKoi.position.y = 0.5 + Math.sin(t * 0.4) * 0.2;

    /* Hero faces movement direction */
    var heroAngle = Math.atan2(heroTarget.x - heroKoi.position.x, heroTarget.z - heroKoi.position.z);
    heroKoi.rotation.y += angleWrap(heroAngle - heroKoi.rotation.y) * 0.05;

    /* Hero spine wave */
    var heroSegs = heroKoi.userData.segments;
    if (heroSegs) {
      var heroSwimSpeed = 2.5 + Math.abs(heroTarget.x - heroKoi.position.x) * 2;
      for (var si = 1; si < heroSegs.length; si++) {
        var segT = si / (heroSegs.length - 1);
        heroSegs[si].rotation.y = Math.sin(t * heroSwimSpeed - si * 0.6) * segT * segT * 0.18;
      }
    }

    /* Hero pectoral fins */
    var heroPecs = heroKoi.userData.pectorals;
    if (heroPecs) {
      var hFlap = Math.sin(t * 1.2) * 0.2;
      heroPecs[0].rotation.x = -Math.PI / 2 + hFlap;
      heroPecs[1].rotation.x = -Math.PI / 2 - hFlap;
    }

    /* Hero tail */
    if (heroKoi.userData.tail) {
      heroKoi.userData.tail.rotation.y = Math.sin(t * 2.5) * 0.3;
    }

    /* Ripple animation */
    for (var i = ripples.length - 1; i >= 0; i--) {
      var rp = ripples[i];
      rp.age += dt;
      var scale = 1 + rp.age * 8;
      rp.mesh.scale.set(scale, 1, scale);
      rp.mesh.material.opacity = Math.max(0, 0.3 - rp.age * 0.4);
      if (rp.age > 1) {
        scene.remove(rp.mesh);
        rp.mesh.geometry.dispose();
        rp.mesh.material.dispose();
        ripples.splice(i, 1);
      }
    }

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

    /* Recalculate mobile state */
    isMobile = W < 768;
  });

})();
