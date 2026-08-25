"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";
import { getThemeTokens } from "../lib/themeTokens";

type ThreeGlobal = typeof import("three");

declare global { interface Window { THREE?: ThreeGlobal } }

/* ─────────────────────────────────────
   CONSTANTS
───────────────────────────────────── */
const GLOBE_SIZE = 420; // px — fixed canvas resolution

const STEPS = [
  {
    num: "01", label: "Discovery & Assessment",
    desc: "We audit your current stack, surface bottlenecks, and map technical debt — with zero assumptions.",
    tags: ["Stack audit", "Risk map", "Gap analysis"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>,
  },
  {
    num: "02", label: "Strategy & Scoping",
    desc: "Findings become a concrete roadmap with milestones, resource allocation, and measurable outcomes.",
    tags: ["Tech roadmap", "Timeline", "Cost model"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
  },
  {
    num: "03", label: "Architecture & Design",
    desc: "Security-first, cloud-native architecture built for resilience. Every component chosen to reduce friction.",
    tags: ["System design", "Security model", "Diagrams"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M17.5 14v7M14 17.5h7" /></svg>,
  },
  {
    num: "04", label: "Build & Integration",
    desc: "Agile delivery cycles with weekly check-ins. We integrate with your tools, teams, and workflows.",
    tags: ["CI/CD pipeline", "Integrations", "Sprint reports"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  },
  {
    num: "05", label: "Testing & Hardening",
    desc: "Penetration testing, load simulation, and compliance validation before any production flip.",
    tags: ["Pen test report", "Load tests", "Compliance sign-off"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  },
  {
    num: "06", label: "Deploy & Sustain",
    desc: "Zero-downtime deployments with 24/7 monitoring. Proactive alerts, monthly reviews, dedicated support.",
    tags: ["24/7 monitoring", "Runbooks", "SLA dashboard"],
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
  },
];

const STATS = [
  { num: "48h", label: "Discovery to proposal" },
  { num: "99.9%", label: "Uptime SLA" },
  { num: "200+", label: "Deployments delivered" },
  { num: "24/7", label: "Monitoring & support" },
];

/* ─────────────────────────────────────
   GLOBE INIT (runs after Three.js loads)
───────────────────────────────────── */
function initGlobe(canvas: HTMLCanvasElement, dark: boolean) {
  if (!window.THREE) throw new Error("THREE.js is not loaded");
  const T: ThreeGlobal = window.THREE;

  const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(GLOBE_SIZE, GLOBE_SIZE, false); // false = don't set CSS size
  renderer.setClearColor(0x000000, 0);

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.z = 2.65;

  /* ── Texture builder ── */
  function makeTexture(d: boolean) {
    void d;
    const S = 1024;
    const tc = document.createElement("canvas");
    tc.width = S; tc.height = S;
    const ctx = tc.getContext("2d")!;
    ctx.fillStyle = "#F4E9D6";
    ctx.fillRect(0, 0, S, S);
    // grid lines
    ctx.strokeStyle = "rgba(59,10,34,0.08)";
    ctx.lineWidth = 0.8;
    for (let lat = -80; lat <= 80; lat += 20) {
      const y = ((lat + 90) / 180) * S;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(S, y); ctx.stroke();
    }
    for (let lon = 0; lon < 360; lon += 20) {
      const x = (lon / 360) * S;
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, S); ctx.stroke();
    }
    // land masses
    const lands = [
      [0.13, 0.35, 0.09, 0.17], [0.12, 0.52, 0.06, 0.12], [0.17, 0.62, 0.04, 0.06],
      [0.38, 0.3, 0.14, 0.18], [0.38, 0.52, 0.08, 0.14], [0.58, 0.28, 0.06, 0.12],
      [0.62, 0.36, 0.04, 0.07], [0.6, 0.42, 0.08, 0.12], [0.55, 0.55, 0.12, 0.1],
      [0.72, 0.28, 0.06, 0.08], [0.78, 0.38, 0.04, 0.1], [0.75, 0.55, 0.06, 0.08],
      [0.82, 0.48, 0.06, 0.14], [0.26, 0.38, 0.03, 0.05], [0.3, 0.44, 0.04, 0.04],
      [0.88, 0.32, 0.06, 0.1], [0.92, 0.45, 0.05, 0.08], [0.44, 0.72, 0.08, 0.06],
      [0.5, 0.76, 0.04, 0.04], [0.18, 0.14, 0.12, 0.08], [0.3, 0.1, 0.06, 0.06], [0.7, 0.12, 0.04, 0.05],
    ];
    ctx.fillStyle = "#5A1435";
    lands.forEach(([cx, cy, rx, ry]) => {
      ctx.beginPath(); ctx.ellipse(cx * S, cy * S, rx * S, ry * S, 0, 0, Math.PI * 2); ctx.fill();
    });
    // dots
    const dc = "rgba(240,73,31,0.55)";
    for (let py = 8; py < S; py += 14) {
      for (let px = 8; px < S; px += 14) {
        const latR = ((py / S) - 0.5) * Math.PI;
        const sc = Math.cos(latR);
        if (Math.random() > sc * 0.68) continue;
        ctx.fillStyle = dc;
        ctx.beginPath(); ctx.arc(px, py, 1.5 * sc, 0, Math.PI * 2); ctx.fill();
      }
    }
    return new T.CanvasTexture(tc);
  }

  /* ── Sphere ── */
  const geo = new T.SphereGeometry(1, 64, 64);
  const mat = new T.MeshStandardMaterial({ map: makeTexture(dark), roughness: 0.8, metalness: 0.05 });
  const globe = new T.Mesh(geo, mat);
  scene.add(globe);

  // atmosphere shell
  scene.add(new T.Mesh(
    new T.SphereGeometry(1.06, 64, 64),
    new T.MeshBasicMaterial({ color: 0x1A6FE8, transparent: true, opacity: 0.05, side: T.BackSide })
  ));

  /* ── City dots ── */
  const CITIES = [
    [28.6, 77.2], [51.5, -0.1], [40.7, -74.0], [35.7, 139.7], [1.3, 103.8],
    [-33.9, 151.2], [48.8, 2.3], [55.7, 37.6], [19.4, -99.1], [-23.5, -46.6],
    [31.2, 121.5], [37.6, -122.4], [41.0, 28.9], [25.2, 55.3], [-26.2, 28.0], [30.0, 31.2],
  ];
  function makeCityDots(d: boolean) {
    const pts: number[] = [];
    CITIES.forEach(([lat, lon]) => {
      const phi = (90 - lat) * (Math.PI / 180), theta = (lon + 180) * (Math.PI / 180);
      pts.push(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta));
    });
    const g = new T.BufferGeometry();
    g.setAttribute("position", new T.Float32BufferAttribute(pts, 3));
    void d;
    return new T.Points(g, new T.PointsMaterial({ color: 0xF0491F, size: 0.026, sizeAttenuation: true }));
  }
  let cityDots = makeCityDots(dark);
  scene.add(cityDots);

  /* ── Lights ── */
  const ambient = new T.AmbientLight(0xffffff, dark ? 0.7 : 1.0);
  scene.add(ambient);
  const dir = new T.DirectionalLight(0xFFC53D, dark ? 1.1 : 0.6);
  dir.position.set(3, 2, 3); scene.add(dir);
  const rim = new T.DirectionalLight(0xF0491F, 0.3);
  rim.position.set(-3, -1, -2); scene.add(rim);

  /* ── Theme update ── */
  function setTheme(d: boolean) {
    mat.map = makeTexture(d); mat.map.needsUpdate = true;
    scene.remove(cityDots);
    cityDots = makeCityDots(d);
    scene.add(cityDots);
    ambient.intensity = d ? 0.7 : 1.0;
    dir.intensity = d ? 1.1 : 0.6;
  }

  /* ── Render fn ── */
  function render(rotY: number) {
    globe.rotation.y = rotY; globe.rotation.x = 0.15;
    cityDots.rotation.y = rotY; cityDots.rotation.x = 0.15;
    renderer.render(scene, camera);
  }

  return { render, setTheme, renderer };
}

/* ─────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────── */
export default function ProcessPage() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [activeStep, setActiveStep] = useState(0);
  const [deg, setDeg] = useState(0);
  const [inSticky, setInSticky] = useState(false); // true once hero scrolled past

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);   // the fixed wrapper
  const heroSlotRef = useRef<HTMLDivElement>(null);   // hero left placeholder
  const stickySlotRef = useRef<HTMLDivElement>(null);   // sticky right placeholder
  const stepsColRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const globeRef = useRef<ReturnType<typeof initGlobe> | null>(null);
  const rotRef = useRef(0);
  const autoRotRef = useRef(0);
  const lastSYRef = useRef(0);
  const rafRef = useRef(0);
  const activeStepRef = useRef(activeStep);

  /* ── Load Three.js then init globe ── */
  useEffect(() => {
    if (window.THREE) { init(); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    s.onload = init;
    document.head.appendChild(s);

    function init() {
      if (!canvasRef.current) return;
      globeRef.current = initGlobe(canvasRef.current, dark);
      startLoop();
    }

    function startLoop() {
      const loop = () => {
        rafRef.current = requestAnimationFrame(loop);
        const sy = window.scrollY;
        const idle = Math.abs(sy - lastSYRef.current) < 0.4;
        lastSYRef.current = sy;
        if (idle) autoRotRef.current += 0.002;
        globeRef.current?.render(rotRef.current + autoRotRef.current);
      };
      loop();
    }

    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Theme ── */
  useEffect(() => { globeRef.current?.setTheme(theme === "dark"); }, [theme]);

  // ─── REPLACE the entire reposition callback ───────────────────────────────
  const reposition = useCallback(() => {
    const floatEl = floatRef.current;
    const heroSlot = heroSlotRef.current;
    const stickySlot = stickySlotRef.current;
    if (!floatEl || !heroSlot || !stickySlot) return;

    const heroR = heroSlot.getBoundingClientRect();
    const stickyR = stickySlot.getBoundingClientRect();
    const stepsEl = stepsColRef.current;
    const stepsBottom = stepsEl ? stepsEl.getBoundingClientRect().bottom : 9999;

    const heroVisible = heroR.bottom > 60;

    if (heroVisible) {
      // ── Anchored in the hero slot ──
      floatEl.style.left = `${heroR.left}px`;
      floatEl.style.top = `${heroR.top}px`;
      floatEl.style.width = `${heroR.width}px`;
      floatEl.style.height = `${heroR.height}px`;
      floatEl.style.opacity = "1";
      floatEl.style.zIndex = "50";
      setInSticky(false);
      return;
    }

    // Where the globe's top would land in the sticky column
    const targetTop = Math.max(
      stickyR.top,
      (window.innerHeight - GLOBE_SIZE) / 2
    );
    // The globe's bottom edge in viewport coords
    const globeBottom = targetTop + GLOBE_SIZE;

    // Hide if the globe would overflow below the steps column
    if (globeBottom > stepsBottom) {
      floatEl.style.opacity = "0";
      floatEl.style.zIndex = "50";
      setInSticky(false);
      return;
    }

    // ── Sticky in the right column ──
    floatEl.style.left = `${stickyR.left}px`;
    floatEl.style.top = `${targetTop}px`;
    floatEl.style.width = `${GLOBE_SIZE}px`;
    floatEl.style.height = `${GLOBE_SIZE}px`;
    floatEl.style.opacity = "1";
    floatEl.style.zIndex = "50";
    setInSticky(true);
  }, []);

  /* ── Scroll handler ── */
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(sy / (docH || 1), 1);
      rotRef.current = progress * Math.PI * 4;
      setDeg(Math.round((rotRef.current * 180 / Math.PI) % 360));

      // Active step
      const mid = sy + window.innerHeight * 0.5;
      let found = 0;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        if (el.getBoundingClientRect().top + sy <= mid) found = i;
      });
      setActiveStep(found);
      activeStepRef.current = found;

      reposition();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", reposition);
    // Run once on mount to set initial position
    reposition();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", reposition);
    };
  }, [reposition]);

  const t = getThemeTokens(theme);
  const ac = t.accent;
  const bg = t.contentBg;
  const card = "#FFFFFF";
  const tp = t.heading;
  const ts = t.body;
  const tm = t.muted;
  const br = t.border;
  const brs = "rgba(59,10,34,0.16)";
  const pill = "rgba(59,10,34,0.05)";
  const tagB = t.accentSoft;
  const tagT = ac;
  const glow = "radial-gradient(circle, rgba(240,73,31,0.18) 0%, transparent 68%)";

  return (
    <div style={{ background: bg, color: tp, minHeight: "100vh", transition: "background .65s ease, color .3s", overflowX: "hidden" }}>

      {/* ── FLOATING GLOBE (fixed, repositioned by JS) ── */}
      <div
        ref={floatRef}
        style={{
          position: "fixed",
          zIndex: 50,
          pointerEvents: "none",
          transition: "left .55s cubic-bezier(.4,0,.2,1), top .4s cubic-bezier(.4,0,.2,1), opacity .4s",
          /* start offscreen until reposition() runs */
          left: "-9999px", top: 0,
          width: GLOBE_SIZE, height: GLOBE_SIZE,
        }}
      >
        {/* glow halo */}
        <div style={{
          position: "absolute", inset: "-12%", borderRadius: "50%",
          background: glow, transition: "background .3s", pointerEvents: "none",
        }} />
        {/* the one canvas */}
        <canvas
          ref={canvasRef}
          width={GLOBE_SIZE}
          height={GLOBE_SIZE}
          style={{ display: "block", width: "100%", height: "100%", borderRadius: "50%" }}
        />
        {/* degree badge */}
        <div style={{
          position: "absolute", bottom: 12, right: 12,
          fontSize: 11, fontWeight: 700,
          letterSpacing: "0.08em", color: ac, opacity: .65,
        }}>
          {deg}°
        </div>
        {/* Progress bar + step label — moves with globe when sticky */}
        <div style={{
          position: "absolute",
          left: "50%",
          bottom: -72,
          width: GLOBE_SIZE,
          transform: inSticky ? "translate(-50%,0)" : "translate(-50%,8px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          pointerEvents: "none",
          opacity: inSticky ? 1 : 0,
          transition: "opacity .4s ease, transform .4s ease",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, width: GLOBE_SIZE, justifyContent: "flex-end" }}>
            <div style={{ flex: 1, height: 2, background: br, borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${((activeStep + 1) / STEPS.length) * 100}%`, background: ac, borderRadius: 2, transition: "width .35s ease" }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", color: tm, minWidth: 32, textAlign: "right" }}>
              {activeStep + 1}/{STEPS.length}
            </span>
          </div>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: ac, opacity: .75 }}>
            {STEPS[activeStep].label}
          </span>
        </div>
      </div>

      {/* theme is controlled centrally via PageShell */}

      <ThemeHeroSection contentClassName="mx-auto w-full max-w-[1200px] px-[5vw]">
        <section
          className="hero-anim-3 flex items-center gap-[60px]"
          style={{ minHeight: "72vh" }}
        >
          <div
            ref={heroSlotRef}
            style={{ flex: `0 0 ${GLOBE_SIZE}px`, height: GLOBE_SIZE, borderRadius: "50%", flexShrink: 0 }}
          />

          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: ac,
                background: tagB,
                borderRadius: 100,
                padding: "5px 14px",
                marginBottom: 24,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: ac, display: "inline-block" }} />
              How we work
            </div>
            <h1 style={{ fontSize: "clamp(38px,4.2vw,72px)", letterSpacing: "0.02em", lineHeight: 1.06, marginBottom: 20, color: tp }}>
              From <em style={{ fontStyle: "normal", color: ac }}>complexity</em>
              <br />
              to clarity
            </h1>
            <p style={{ fontSize: 16, color: ts, maxWidth: 400, lineHeight: 1.65, marginBottom: 36 }}>
              Six deliberate steps that turn infrastructure challenges into a stack that&apos;s fast, secure, and built to scale.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: tm, opacity: 0.6 }}>
              <span style={{ width: 28, height: 1, background: ac, display: "block" }} />
              Scroll — globe moves right
            </div>
          </div>
        </section>
      </ThemeHeroSection>

      {/* ═══════════════ STATS ═══════════════ */}
      <div style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 5vw" }}>
        <div style={{ display: "flex", background: card, border: `1px solid ${br}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,.06),0 4px 16px rgba(0,0,0,.04)", transition: "background .3s" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ flex: 1, padding: "28px 24px", textAlign: "center", borderRight: i < STATS.length - 1 ? `1px solid ${br}` : "none" }}>
              <div className="font-heading" style={{ fontSize: 32, letterSpacing: "0.02em", color: tp, lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: tm }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════ PROCESS (sticky scroll) ═══════════════ */}
      <div style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 5vw" }}>
        {/* section label */}
        <div style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 500, color: tm, marginBottom: 48, display: "flex", alignItems: "center", gap: 12 }}>
          Our six-step process
          <span style={{ flex: 1, height: 1, background: br, display: "block" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: `1fr ${GLOBE_SIZE}px`, gap: "0 60px", alignItems: "start" }}>

          {/* LEFT: steps list */}
          <div ref={stepsColRef}>
            {STEPS.map((step, i) => (
              <div
                key={i}
                ref={el => { stepRefs.current[i] = el; }}
                style={{
                  padding: "56px 0",
                  borderBottom: i < STEPS.length - 1 ? `1px solid ${br}` : "none",
                  opacity: activeStep === i ? 1 : 0.28,
                  transition: "opacity .4s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", background: tagB, borderRadius: 100, padding: "4px 12px", color: tagT }}>
                    Step {step.num}
                  </span>
                  <div style={{ width: 36, height: 36, background: activeStep === i ? tagB : pill, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: ac, transition: "background .2s" }}>
                    {step.icon}
                  </div>
                </div>
                <h3 style={{ fontSize: 26, letterSpacing: "0.02em", color: tp, marginBottom: 10, lineHeight: 1.2 }}>
                  {step.label}
                </h3>
                  <p style={{ fontSize: 15, fontWeight: 300, color: ts, lineHeight: 1.65, maxWidth: 440, marginBottom: 18 }}>
                    {step.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                  {step.tags.map(t => (
                    <span key={t} style={{ fontSize: 11, color: activeStep === i ? ts : tm, background: pill, borderRadius: 100, padding: "4px 12px", border: `1px solid ${activeStep === i ? brs : br}`, transition: "all .2s" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: sticky column — invisible globe placeholder + progress (only when sticky) */}
          <div style={{ position: "sticky", top: 80, height: "calc(100vh - 120px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>

            {/* Invisible placeholder — globe floats exactly here */}
            <div
              ref={stickySlotRef}
              style={{ width: GLOBE_SIZE, height: GLOBE_SIZE, borderRadius: "50%", flexShrink: 0 }}
            />

            {/* progress now moves with the floating globe */}

          </div>

        </div>
      </div>

      {/* ═══════════════ PRINCIPLES ═══════════════ */}
      <div style={{ maxWidth: 1200, margin: "0 auto 80px", padding: "0 5vw" }}>
        <div className="font-heading" style={{ fontSize: 11, textTransform: "uppercase", fontWeight: 500, color: tm, marginBottom: 48, display: "flex", alignItems: "center", gap: 12 }}>
          {/* What guides every engagement */}
          <span style={{ flex: 1, height: 1, background: br, display: "block" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {[
            { title: "Security by default", body: "Not an afterthought. Every architecture decision starts with a threat model and zero-trust assumptions." },
            { title: "Speed without shortcuts", body: "We move fast through structure — documented decisions, reproducible builds, and clear ownership." },
            { title: "Async by design", body: "Your team shouldn't wait on ours. Shared dashboards, weekly reports, and a Slack channel keep you in the loop." },
          ].map((p, i) => (
            <div
              key={i}
              style={{ background: card, border: `1px solid ${br}`, borderRadius: 16, padding: "32px 28px", boxShadow: "0 1px 3px rgba(0,0,0,.06)", transition: "all .2s", cursor: "default" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,.06)"; }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke={ac} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32, marginBottom: 16 }}>
                {i === 0 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                {i === 1 && <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />}
                {i === 2 && <><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></>}
              </svg>
              <h4 style={{ fontSize: 15, color: tp, marginBottom: 8 }}>{p.title}</h4>
              <p style={{ fontSize: 13, fontWeight: 300, color: ts, lineHeight: 1.6 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}