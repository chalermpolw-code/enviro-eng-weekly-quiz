/**
 * Background scene: a dot-map Earth that starts with Thailand facing the viewer,
 * a soft atmosphere glow, a pulsing Bangkok marker and two orbiting satellites.
 * Loaded with a dynamic import so it also works when index.html is opened
 * straight from disk. If WebGL or the CDN is unavailable, the page still works.
 *
 * Land mask: 360x180 equirectangular 1-bit bitmap (row 0 = 90°N, col 0 = 180°W),
 * rasterized from Natural Earth 1:110m land (public domain, via world-atlas).
 */
(function () {
  "use strict";

  const canvas = document.getElementById("scene");
  if (!canvas) return;

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const HOME = { lat: 13.75, lon: 100.5 }; // Bangkok
  const LAND_MASK_B64 = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg/wMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADg//8/AOD//z8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+///n//////9/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPD//3////////8PAAAAwB8AADwAAAAAAH8AAAAAAAAAAAAAAAAAAAAAAAAAAPD//wf8//////8DAACA/z8AAAAAAAAAAP4EAAAAAAAAAAAAAAAAAAAAAAAY+I7///j///////8BAAAAfwYAAAAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAPA4ADDwP/D///////8BAAAAPAYAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAHzAwPP9H8D///////8AAAAAAAAAAAAA/gEAAID/DwAAAAAAAAAAAAAAAAAAAID/w7P/DwAA/v////8AAAAAAAAAAADgHwAA4P//PwAA4N8AAAAAAAAAAAAAgAMcADD8DwAA/P////8AAAAAAAAAAAB4AAAA/P//BwAAAAAAAAAAAAAAAAAAgP8Bhve5ewAA8P///38AAAAAAAAAAAAeAADg/////4cPAAcAAAAAAAAAAAAAwP9/x3/8/wAA4P///z8AAAAAAAAAAAAPAJ7s//////8fgH8AAAAAAwAAAAAAgO//B3f8/w8A8P///z8AAAAAAAAAAIAPgO////////8f//8HAACAAAD8fwAAEMD/H/j4//8A4P///zcAAAAAAPgHAAAAgN//////////////DwAAAAD+///x/4//f/7Bh/8BwP7//w8AAAAAwP8/AAAAj9///////////////89/A+D///////+LF+TPh/8BgP///wEAAAAA8P//BwH/////////////////////DwD/////////////h/kPwP//BwAAAAAA/P//H/f//9///////////////////4H/////////////Afw/wP//AzAYAAAA/v+/X/////////////////////////H///////////9/wP8cgP8/APA/AAAA/+N/8P//////////////////////YMD////////////Pw/8HAP8PAOA/AADA//F//v////////////////////9/AAf+///////////jDvAHAP8HAAADAADg//z///////////////////////9/AID///////////8Aw8ADAPwDAAAAAAD+P/7///////////////////////9/AMD//////////38AwB8AAPgDAAAAAAD+P/7/////////////////////e/8DAMD///z//////z8AwH8AAMABAAAAAAD+P/z///////////////////9/wH8AAAD8N4D//////z8AwH8MAAAAAAAAAAD+f+D///////////////////9/8AAAAADUAwD8/////38AwP8eAAAAAAAAgAGcH/D//////////////////wEAeAAAAADADwDA//////8AgP8/AAAAAAAAwANAH/T//////////////////wAAfgAAAABwAACA//////8PgP9/AAAAAAAAwANwD/7/////////////////PwAAfwAAAAAOAAAA//////9/wP//AAAAAAAAwAOwA/7/////////////////HwCAPwAAAIABAAAA/v//////8///BwAAAAAAOAdw8P//////////////////HwCAHwAAAAAAAACA/P//////4///DwAAAAAAPA/+/////////////////////wUADwAAAAAAAAAA8f//////5///HwAAAAAAnD///////////////////////wcABwAAAAAAAAAA8P//////////DwAAAAAAgJ///////////////////////wUAAwAAAAAAAAAA8P//////////DQAAAAAAwOP//////////////////////w0AAAAAAAAAAAAA4P////////8xPAAAAAAAAPz//////////////////////w0AAAAAAAAAAAAAgP////////8PfgAAAAAAgP///////////////////////wQAAAAAAAAAAAAAgP////////8HfgAAAAAAAP7/////////////////////fwQAAAAAAAAAAAAAAP////////+fQAAAAAAAAPz//////T/+////////////PwwAAAAAAAAAAAAAAP////////9/AAAAAAAAAPj////j/w/+////////////HwAAAAAAAAAAAAAAAP////////8cAAAAAAAAAPz/+f8B/If/////////////Dw4AAAAAAAAAAAAAAP///////z8EAAAAAAAA+P/H8/8B8If/////////////Bz8AAAAAAAAAAAAAgP///////x8AAAAAAAAA+H+gx/8A4A/+//////////9/AA8AAAAAAAAAAAAAAP///////z8AAAAAAAAA+H8An//x4R/8//////////8/AAEAAAAAAAAAAAAAAP///////wcAAAAAAAAA+B8wvM///z/+/////////98fAAMAAAAAAAAAAAAAAP///////wMAAAAAAAAA+A8wEMf//x/+/////////2cOAAMAAAAAAAAAAAAAAP7//////wEAAAAAAAAA/A8AGM7//x/8/////////wMegAEAAAAAAAAAAAAAAP7//////wAAAAAAAAAA+AcADo7//z/8/////////zccwAEAAAAAAAAAAAAAAPz//////wAAAAAAAAAAwON/AAT//////////////x888AEAAAAAAAAAAAAAAPj//////wAAAAAAAAAAwPx/ACAg/////////////w8c/gEAAAAAAAAAAAAAAPj/////fwAAAAAAAAAA4P9/AAAA/////////////w+MfwAAAAAAAAAAAAAAAMD/////HwAAAAAAAAAA8P9/AACA/////////////x/ADwAAAAAAAAAAAAAAAID/////DwAAAAAAAAAA+P//BweA/////////////x/AAAAAAAAAAAAAAAAAAID/////BwAAAAAAAAAA/P//D3/E/////////////z/AAAAAAAAAAAAAAAAAAAD5////BwAAAAAAAAAA/P///////////////////z8AAAAAAAAAAAAAAAAAAAD6/z8HBgAAAAAAAAAA/P///////8///////////z8AAAAAAAAAAAAAAAAAAAD0/w8ADgAAAAAAAAAA/////////5///////////z8AAAAAAAAAAAAAAAAAAADu/wcADgAAAAAAAACA//////+//x///////////x8AAAAAAAAAAAAAAAAAAADY/wcAbAAAAAAAAADA//////8//z/k/////////w8AAAAAAAAAAAAAAAAAAACQ/wcADAAAAAAAAADg//////9//v/Y/////////w8AAAAAAAAAAAAAAAAAAAAw/wcAQAAAAAAAAADg//////9//v8cgP///////zcAAAAAAAAAAAAAAAAAAABg/gMAAAAAAAAAAADw/////////P9/AP///////zEAAAAAAAAAAAAAAAAAAAAA/AMAPwAAAAAAAAD4////////+f//AP7/////fxAAAAAAAAAAAAAAAAAAAAAA/AccYAAAAAAAAAD4////////+f//APz/H///DwAAAAAAAAAAAAAAAAAAAAAA/AcewAMAAAAAAAD4////////8f9/AOD/B/9/BAAAAAAAAAAAAAAAAQAAAAAA+A8eAHgAAAAAAAD4////////8f8/AOD/A/4/BgAAAAAAAAAAAAAAAAAAAAAA8P8PQPwCAAAAAADw////////4/8fAOD/APw/AiAAAAAAAAAAAAAAAAAAAAAAwP8PAAAAAAAAAADw////////x/8PAOB/APx/AHAAAAAAAAAAAAAAAAAAAAAAAP8PAAAAAAAAAAD4////////h/8DAOA/APz/AHAAAAAAAAAAAAAAAAAAAAAAAMD/AAAAAAAAAAD4////////j/8AAMAfAMD/ATAAAAAAAAAAAAAAAAAAAAAAAAD/AQAAAAAAAAD4////////nz8AAMAPAMD/ATAAAAAAAAAAAAAAAAAAAAAAAAD8AQAAAAAAAAD4////////vwcAAMAPAMD/A/AAAAAAAAAAAAAAAAAAAAAAAADgARAAAAAAAAD4/////////wEAAIAPAMD+ASABAAAAAAAAAAAAAAAAAAAAAADAAHgAAAAAAADw////////f3AAAIAPAMD4AUADAAAAAAAAAAAAAAAAAAAAAADAAf97AAAAAADg/////////38AAAAPAEDwAMgBAAAAAAAAAAAAAAAAAAAAAACAE/9/AAAAAADA/////////38AAAAXAMAgAMQCAAAAAAAAAAAAAAAAAAAAAAAA7///AAAAAACA/////////z8AAAAyAMAAAIAHAAAAAAAAAAAAAAAAAAAAAAAAyP//AwAAAACA/////////z8AAAAwAIABAMAHAAAAAAAAAAAAAAAAAAAAAAAAwP//AwAAAAAA/v///////x8AAAAwAAADAAMDAAAAAAAAAAAAAAAAAAAAAAAAwP//fwAAAAAA/A/+/////x8AAAAAAAAHgAcAAAAAAAAAAAAAAAAAAAAAAAAAwP///wAAAAAAEAD8/////w8AAAAAADAPwAcAAAAAAAAAAAAAAAAAAAAAAAAAwP///wEAAAAAAADg/////wcAAAAAAGAO4AMAAAAAAAAAAAAAAAAAAAAAAAAA4P///wEAAAAAAADg/////wMAAAAAAOAP+AMAAAAAAAAAAAAAAAAAAAAAAAAA4P///wMAAAAAAADg/////wEAAAAAAIAP/gMYAAAAAAAAAAAAAAAAAAAAAAAA8P///wMAAAAAAADg/////wAAAAAAAIAP/vMZAAAAAAAAAAAAAAAAAAAAAAAA+P///w8AAAAAAADg////fwAAAAAAAAAP/gsAAQAAAAAAAAAAAAAAAAAAAAAA+P///38AAAAAAADg////PwAAAAAAAAAf/HmAIwAAAAAAAAAAAAAAAAAAAAAA+P////8DAAAAAADA////HwAAAAAAAAA+/DkA9wEAAAAAAAAAAAAAAAAAAAAA+P////8fAAAAAACA////DwAAAAAAAAA8wHl0/g8QAAAAAAAAAAAAAAAAAAAA+P////9/AAAAAACA////DwAAAAAAAAA4AHgA+D8YAAAAAAAAAAAAAAAAAAAA+P//////AQAAAAAA////BwAAAAAAAAAwAEgAwD9OAAAAAAAAAAAAAAAAAAAA+P//////AQAAAAAA////BwAAAAAAAADgCQAAxP+AAAAAAAAAAAAAAAAAAAAA8P//////AwAAAAAA/v//BwAAAAAAAACAHwAAwP8ABAAAAAAAAAAAAAAAAAAA4P//////AQAAAAAA/v//DwAAAAAAAAAAcFYGQM8AAAAAAAAAAAAAAAAAAAAA4P//////AQAAAAAA/v//DwAAAAAAAAAAAAgBAIADEAAAAAAAAAAAAAAAAAAAwP//////AAAAAAAA/v//DwAAAAAAAAAAAAAAAAAGIAAAAAAAAAAAAAAAAAAAwP////9/AAAAAAAA/v//HwAAAAAAAAAAAAAAAQQAAAAAAAAAAAAAAAAAAAAAgP////8/AAAAAAAA/v//HyAAAAAAAAAAAACAHwwAAAAAAAAAAAAAAAAAAAAAgP////8/AAAAAAAA////HzAAAAAAAAAAAADADw4AAAAAAAAAAAAAAAAAAAAAAP////8fAAAAAAAA////HzAAAAAAAAAAAADuDx4AAAAAAAAAAAAAAAAAAAAAAP7///8fAAAAAAAA////H3wAAAAAAAAAAAD/Hz4AAAAAAAAAAAAAAAAAAAAAAPj///8fAAAAAACA////Dz8AAAAAAAAAAID/Pz4AAACAAAAAAAAAAAAAAAAAAPD///8fAAAAAACA////Az8AAAAAAAAAAMD//z8AAABgAAAAAAAAAAAAAAAAAOD///8fAAAAAAAA////AR8AAAAAAAAAAMD//z8AAAAAAAAAAAAAAAAAAAAAAMD///8PAAAAAAAA/v9/AB8AAAAAAAAAAOD///8AAAAAAAAAAAAAAAAAAAAAAMD///8PAAAAAAAA/v9/AB8AAAAAAAAAAP7///8BAAEAAAAAAAAAAAAAAAAAAMD///8HAAAAAAAA/P9/gA8AAAAAAAAAgP////8DAAYAAAAAAAAAAAAAAAAAAMD///8DAAAAAAAA/P//gA8AAAAAAAAAwP////8HAAAAAAAAAAAAAAAAAAAAAOD//38AAAAAAAAA/P//gA8AAAAAAAAAwP////8HAAAAAAAAAAAAAAAAAAAAAOD//x8AAAAAAAAA/P9/AAcAAAAAAAAA4P////8PAAAAAAAAAAAAAAAAAAAAAOD//w8AAAAAAAAA/P8fAAIAAAAAAAAAwP////8fAAAAAAAAAAAAAAAAAAAAAOD//w8AAAAAAAAA+P8fAAAAAAAAAAAA4P////8fAAAAAAAAAAAAAAAAAAAAAOD//w8AAAAAAAAA+P8fAAAAAAAAAAAAwP////8fAAAAAAAAAAAAAAAAAAAAAOD//wcAAAAAAAAA8P8PAAAAAAAAAAAAwP////8/AAAAAAAAAAAAAAAAAAAAAPD//wMAAAAAAAAA4P8PAAAAAAAAAAAAgP////8/AAAAAAAAAAAAAAAAAAAAAPD//wMAAAAAAAAA4P8HAAAAAAAAAAAAgP////8fAAAAAAAAAAAAAAAAAAAAAPD//wEAAAAAAAAAwP8DAAAAAAAAAAAAgP////8fAAAAAAAAAAAAAAAAAAAAAPD//wAAAAAAAAAAwP8BAAAAAAAAAAAAAP8D/P8fAAAAAAAAAAAAAAAAAAAAAPD/fwAAAAAAAAAAwH8AAAAAAAAAAAAAgP8A+P8PAAAAAAAAAAAAAAAAAAAAAPD/PwAAAAAAAAAAgAMAAAAAAAAAAAAAgA8A6P8HAAAAAAAAAAAAAAAAAAAAAPj/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwP8HAAAGAAAAAAAAAAAAAAAAAPj/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8DAAAEAAAAAAAAAAAAAAAAAPz/BwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8DAAAMAAAAAAAAAAAAAAAAAPz/AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGwAAAB8AAAAAAAAAAAAAAAAAPw/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAPw/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAAAAAAAAPwHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOABAAALAAAAAAAAAAAAAAAAAPwPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAIADAAAAAAAAAAAAAAAAAPgHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAMABAAAAAAAAAAAAAAAAAP4HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAP4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHgAAAAAAAAAAAAAAAAAAP4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAP4DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8BAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH4AAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAeAAAAAAAAAAAAAAAAAIA/AAAAGAAe/MHPHwAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAAAAAPj/MQDg/////////z8AAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAAAAABAwP///wP4//////////8HAAAAAAAAAAAAAAAAAAAAAPAfAAAAAAAAAAAAAADw+////wP/////////////BwAAAAAAAAAAAAAAAAAAAPA/AAAAAAAAAAB+/////////+H//////////////wAAAAAAAAAAAAAAAAAAAP5/AAAAAAAA/v////////////H//////////////38AAAAAAAAAAAAAwAcAADB/AAAAAACA/////////////////////////////38AAAAAAAAAABwA4P//efx/AAAAAADw/////////////////////////////z8AAAAAAAD8//8fgP////8/AAAAAADw/////////////////////////////wMAAAAAAPz///////////8PAAAAAAD//////////////////////////////wAAAAAAAP///////////z8AAAAAgP///////////////////////////////wAAAADA/////////////wMAAAAA8P///////////////////////////////wAAAACP////////////fwAAAPwA/////////////////////////////////wcAAAAc8P//////////fwAAAP4B////////////////////////////////HwAAAAAAAP7//////////x/8wH8AwP//////////////////////////////HwAAAAAA/v////////////8fABz8////////////////////////////////PwAAAAAA+P//////////////4f///////////////////////////////////wEAAAAA/P///////////////////////////////////////////////////x8A3w////////////////////////////////////////////////////////8/AAAA4AMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

  import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js")
    .then(start)
    .catch((err) => console.warn("3D background unavailable:", err));

  function decodeMask() {
    const bin = atob(LAND_MASK_B64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return function isLand(lat, lon) {
      const row = Math.min(179, Math.max(0, Math.floor(90 - lat)));
      const col = ((Math.floor(lon + 180) % 360) + 360) % 360;
      const k = row * 360 + col;
      return (bytes[k >> 3] >> (k & 7)) & 1;
    };
  }

  function latLonToVec(THREE, lat, lon, r) {
    const phi = (lat * Math.PI) / 180;
    const lam = (lon * Math.PI) / 180;
    return new THREE.Vector3(
      r * Math.cos(phi) * Math.cos(lam),
      r * Math.sin(phi),
      -r * Math.cos(phi) * Math.sin(lam)
    );
  }

  function start(THREE) {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    } catch (err) {
      console.warn("WebGL unavailable:", err);
      return;
    }

    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    const rig = new THREE.Group();     // position / scale / parallax
    const tilt = new THREE.Group();    // axial tilt
    const earth = new THREE.Group();   // daily spin
    rig.add(tilt);
    tilt.add(earth);
    tilt.rotation.z = (-23.4 * Math.PI) / 180 * 0.6;
    scene.add(rig);

    const uOpacity = { value: 1 };

    /* ---------- Occluder (hides the far side) ---------- */
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xeef5f3, transparent: true, opacity: 1 });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.985, 64, 64), coreMat);
    core.renderOrder = 0; // always drawn first so dots and glow sit on top
    earth.add(core);

    /* ---------- Dots ---------- */
    const isLand = decodeMask();
    const N = 22000;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pos = [];
    const land = [];
    const seed = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      const x = Math.cos(th) * r;
      const z = Math.sin(th) * r;
      const lat = (Math.asin(y) * 180) / Math.PI;
      const lon = (Math.atan2(-z, x) * 180) / Math.PI;
      const onLand = isLand(lat, lon);
      if (!onLand && Math.random() > 0.3) continue; // sparser ocean
      pos.push(x, y, z);
      land.push(onLand);
      seed.push(Math.random());
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    dotGeo.setAttribute("aLand", new THREE.Float32BufferAttribute(land, 1));
    dotGeo.setAttribute("aSeed", new THREE.Float32BufferAttribute(seed, 1));

    const dotMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: pixelRatio },
        uOpacity,
        uLand: { value: new THREE.Color("#22a06b") },
        uLand2: { value: new THREE.Color("#8fd16f") },
        uSea: { value: new THREE.Color("#6fb6e0") }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float aLand;
        attribute float aSeed;
        varying float vLand;
        varying float vSeed;
        varying float vFacing;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          float size = mix(2.0, 2.7, aLand) + aLand * 0.5 * sin(uTime * 1.5 + aSeed * 6.28);
          gl_PointSize = size * uPixelRatio * (6.5 / -mv.z);
          vec3 n = normalize(normalMatrix * position);
          vFacing = n.z;
          vLand = aLand;
          vSeed = aSeed;
        }
      `,
      fragmentShader: `
        uniform vec3 uLand;
        uniform vec3 uLand2;
        uniform vec3 uSea;
        uniform float uOpacity;
        varying float vLand;
        varying float vSeed;
        varying float vFacing;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float edge = smoothstep(0.5, 0.32, d);
          vec3 col = mix(uSea, mix(uLand, uLand2, vSeed * 0.6), vLand);
          float a = mix(0.5, 0.8, vLand) * smoothstep(-0.05, 0.35, vFacing);
          gl_FragColor = vec4(col, a * edge * uOpacity);
        }
      `
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    dots.renderOrder = 1;
    earth.add(dots);

    /* ---------- Atmosphere ---------- */
    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      uniforms: {
        uColor: { value: new THREE.Color("#64b8f0") },
        uFlash: { value: new THREE.Color("#22c55e") },
        uPulse: { value: 0 },
        uOpacity
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uFlash;
        uniform float uPulse;
        uniform float uOpacity;
        varying vec3 vNormal;
        void main() {
          float i = pow(clamp(0.72 + dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 2.4);
          vec3 col = mix(uColor, uFlash, uPulse);
          gl_FragColor = vec4(col, i * (0.55 + uPulse * 0.45) * uOpacity);
        }
      `
    });
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(1.2, 64, 64), atmoMat);
    atmo.renderOrder = 2;
    tilt.add(atmo);

    /* ---------- Home marker (Bangkok) ---------- */
    const homeVec = latLonToVec(THREE, HOME.lat, HOME.lon, 1.0);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true });
    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 16), markerMat);
    marker.position.copy(homeVec.clone().multiplyScalar(1.01));
    marker.renderOrder = 3;
    earth.add(marker);

    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, side: THREE.DoubleSide, depthWrite: false });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.03, 0.038, 48), ringMat);
    ring.position.copy(homeVec.clone().multiplyScalar(1.012));
    ring.lookAt(homeVec.clone().multiplyScalar(2));
    ring.renderOrder = 3;
    earth.add(ring);

    // Spin so Bangkok starts facing the camera
    const startSpin = Math.atan2(-homeVec.x, homeVec.z);

    /* ---------- Satellites ---------- */
    const orbits = [];
    [
      { r: 1.55, incl: 0.5, node: 0.4, speed: 0.22 },
      { r: 1.8, incl: -0.85, node: -0.9, speed: -0.15 }
    ].forEach((o) => {
      const g = new THREE.Group();
      g.rotation.set(o.incl, o.node, 0);
      const pts = [];
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(a) * o.r, 0, Math.sin(a) * o.r));
      }
      const lineMat = new THREE.LineBasicMaterial({ color: 0x5b7f86, transparent: true, opacity: 0.18 });
      g.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
      const satMat = new THREE.MeshBasicMaterial({ color: 0x0f766e, transparent: true });
      const sat = new THREE.Mesh(new THREE.SphereGeometry(0.03, 12, 12), satMat);
      g.add(sat);
      rig.add(g);
      orbits.push({ ...o, sat, lineMat, satMat, phase: Math.random() * Math.PI * 2 });
    });

    /* ---------- Layout, input, events ---------- */
    let layout = { x: 0, y: 0, scale: 1 };
    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0, scroll: 0 };

    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      layout = camera.aspect > 1.1
        ? { x: Math.min(2.4, 0.95 * camera.aspect + 0.35), y: 0, scale: 1.0 }
        : { x: 0, y: 1.4, scale: 0.66 };
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });

    window.addEventListener("quiz:answer", (e) => {
      const correct = e.detail && e.detail.correct;
      atmoMat.uniforms.uFlash.value.set(correct ? "#22c55e" : "#ef4444");
      atmoMat.uniforms.uPulse.value = 1;
    });

    resize();

    /* ---------- Loop ---------- */
    const clock = new THREE.Clock();
    let time = 0;

    function frame() {
      requestAnimationFrame(frame);
      if (document.hidden) return;

      const dt = Math.min(clock.getDelta(), 0.05);
      if (!reduceMotion) time += dt;

      const scrollTarget = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      smooth.scroll += (scrollTarget - smooth.scroll) * 0.08;
      smooth.x += (pointer.x - smooth.x) * 0.04;
      smooth.y += (pointer.y - smooth.y) * 0.04;

      const s = smooth.scroll;
      rig.position.x = layout.x + s * (layout.x > 0 ? 0.7 : 0);
      rig.position.y = layout.y + s * 0.5;
      rig.scale.setScalar(layout.scale * (1 - s * 0.15));
      rig.rotation.y = smooth.x * 0.25;
      rig.rotation.x = smooth.y * 0.15;

      earth.rotation.y = startSpin + time * 0.05;

      uOpacity.value = 1 - s * 0.55;
      coreMat.opacity = uOpacity.value;
      atmoMat.uniforms.uPulse.value *= 0.96;

      const beat = (time * 0.6) % 1;
      ring.scale.setScalar(1 + beat * 2.2);
      ringMat.opacity = (1 - beat) * 0.9 * uOpacity.value;
      markerMat.opacity = uOpacity.value;

      orbits.forEach((o) => {
        const a = o.phase + time * o.speed;
        o.sat.position.set(Math.cos(a) * o.r, 0, Math.sin(a) * o.r);
        o.lineMat.opacity = 0.18 * uOpacity.value;
        o.satMat.opacity = uOpacity.value;
      });

      renderer.render(scene, camera);
    }

    frame();
  }
})();
