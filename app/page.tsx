"use client";

import { Roboto } from "next/font/google";
import { useEffect, useRef } from "react";
import { useModal, useTheme } from "./components/PageShell";

/* ─── rest of the file is identical until the CTAs section ─── */

type Theme = "dark" | "light";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

function Starfield({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 220; i++) {
      stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2, alpha: Math.random() * 0.7 + 0.2, speed: Math.random() * 0.3 + 0.05 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`; ctx.fill();
        s.alpha += s.speed * 0.01 * (Math.random() > 0.5 ? 1 : -1);
        if (s.alpha > 0.9) s.alpha = 0.9; if (s.alpha < 0.1) s.alpha = 0.1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }} />
  );
}

function MoonRay({ visible }: { visible: boolean }) {
  const RAYS = [
    { angle: -62, w: 9 }, { angle: -48, w: 14 }, { angle: -36, w: 10 },
    { angle: -24, w: 18 }, { angle: -14, w: 12 }, { angle: -5, w: 20 },
    { angle: 5, w: 20 }, { angle: 14, w: 12 }, { angle: 24, w: 18 },
    { angle: 36, w: 10 }, { angle: 48, w: 14 }, { angle: 62, w: 9 },
  ];
  const cx = 450, cy = 52, len = 480;
  return (
    <div className="absolute pointer-events-none"
      style={{ top: "-6%", left: "50%", transform: "translateX(-50%)", width: "100%", zIndex: 2,
        display: "flex", justifyContent: "center", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", maxWidth: 900, overflow: "visible" }}>
        <defs>
          <linearGradient id="moonRayFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b0ffe8" stopOpacity="0.22" />
            <stop offset="60%" stopColor="#00c8b4" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#00c8b4" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#e0fff8" stopOpacity="1" />
            <stop offset="35%" stopColor="#a0ffe0" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#00c8b4" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0099cc" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="moonHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00c8b4" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#0099cc" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#0099cc" stopOpacity="0" />
          </radialGradient>
          <filter id="moonRayBlur"><feGaussianBlur stdDeviation="7" /></filter>
          <filter id="moonDiscBlur"><feGaussianBlur stdDeviation="2.5" /></filter>
          <filter id="moonHaloBlur"><feGaussianBlur stdDeviation="18" /></filter>
        </defs>
        {RAYS.map(({ angle, w }, i) => {
          const rad = (angle * Math.PI) / 180;
          const tx = cx + Math.sin(rad) * len, ty = cy + Math.cos(rad) * len;
          const px = -Math.cos(rad), py = Math.sin(rad);
          return (
            <polygon key={i}
              points={`${cx+px*1.5},${cy+py*1.5} ${cx-px*1.5},${cy-py*1.5} ${tx-px*w},${ty-py*w} ${tx+px*w},${ty+py*w}`}
              fill="url(#moonRayFade)" filter="url(#moonRayBlur)" opacity="0.85" />
          );
        })}
        <ellipse cx={cx} cy={cy} rx="160" ry="160" fill="url(#moonHalo)" filter="url(#moonHaloBlur)" />
        <circle cx={cx} cy={cy} r="38" fill="url(#moonGlow)" filter="url(#moonDiscBlur)" />
        <circle cx={cx} cy={cy} r="22" fill="#d8fff4" opacity="0.97" />
        <circle cx="444" cy="46" r="10" fill="white" opacity="0.55" />
        <circle cx="458" cy="56" r="4" fill="#a0e8b0" opacity="0.35" />
        <circle cx="442" cy="60" r="2.5" fill="#a0e8b0" opacity="0.25" />
        <circle cx="453" cy="44" r="2" fill="#a0e8b0" opacity="0.2" />
      </svg>
    </div>
  );
}

function SunRay({ visible }: { visible: boolean }) {
  const RAYS = Array.from({ length: 16 }, (_, i) => ({
    angle: i * 22.5, w: i % 2 === 0 ? 22 : 12, len: i % 2 === 0 ? 500 : 340,
  }));
  const cx = 450, cy = 48;
  return (
    <div className="absolute pointer-events-none"
      style={{ top: "-6%", left: "50%", transform: "translateX(-50%)", width: "100%", zIndex: 2,
        display: "flex", justifyContent: "center", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}>
      <svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", maxWidth: 900, overflow: "visible" }}>
        <defs>
          <linearGradient id="sunRayFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff7c0" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="30%" stopColor="#fff7c0" stopOpacity="1" />
            <stop offset="60%" stopColor="#fbbf24" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>
          <filter id="sunRayBlur"><feGaussianBlur stdDeviation="8" /></filter>
          <filter id="sunDiscBlur"><feGaussianBlur stdDeviation="3" /></filter>
          <filter id="sunHaloBlur"><feGaussianBlur stdDeviation="22" /></filter>
        </defs>
        {RAYS.map(({ angle, w, len: rLen }, i) => {
          const rad = (angle * Math.PI) / 180;
          const tx = cx + Math.sin(rad) * rLen, ty = cy + Math.cos(rad) * rLen;
          const px = -Math.cos(rad), py = Math.sin(rad);
          return (
            <polygon key={i}
              points={`${cx+px*2},${cy+py*2} ${cx-px*2},${cy-py*2} ${tx-px*w},${ty-py*w} ${tx+px*w},${ty+py*w}`}
              fill="url(#sunRayFade)" filter="url(#sunRayBlur)" opacity="0.9" />
          );
        })}
        <ellipse cx={cx} cy={cy} rx="200" ry="200" fill="url(#sunHalo)" filter="url(#sunHaloBlur)" />
        <circle cx={cx} cy={cy} r="50" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.3" filter="url(#sunDiscBlur)" />
        <circle cx={cx} cy={cy} r="36" fill="url(#sunGlow)" filter="url(#sunDiscBlur)" />
        <circle cx={cx} cy={cy} r="22" fill="#ffffff" opacity="0.98" />
        <circle cx={cx - 6} cy={cy - 6} r="9" fill="white" opacity="0.6" />
        <circle cx={cx} cy={cy} r="30" fill="none" stroke="#fde68a" strokeWidth="3" opacity="0.4" />
      </svg>
    </div>
  );
}

function GlowArcs({ theme }: { theme: Theme }) {
  const isDark = theme === "dark";
  const bottomGlow = isDark
    ? "radial-gradient(ellipse at center,rgba(0,200,180,.13) 0%,rgba(0,180,160,.07) 40%,transparent 70%)"
    : "radial-gradient(ellipse at center,rgba(251,191,36,.20) 0%,rgba(245,158,11,.09) 40%,transparent 70%)";
  const sideGlow = isDark
    ? "radial-gradient(ellipse at center,rgba(0,160,220,.12) 0%,transparent 70%)"
    : "radial-gradient(ellipse at center,rgba(251,191,36,.10) 0%,transparent 70%)";
  const arcColor = isDark ? "#00c8b4" : "#fbbf24";
  return (
    <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <div style={{ position:"absolute",bottom:"-10%",left:"50%",transform:"translateX(-50%)",width:"80vw",height:"40vw",borderRadius:"50%",background:bottomGlow,filter:"blur(8px)" }} />
      <div style={{ position:"absolute",top:"30%",left:"-8%",width:"30vw",height:"30vw",borderRadius:"50%",background:sideGlow,filter:"blur(16px)" }} />
      <div style={{ position:"absolute",top:"30%",right:"-8%",width:"30vw",height:"30vw",borderRadius:"50%",background:sideGlow,filter:"blur(16px)" }} />
      <svg viewBox="0 0 1200 500" xmlns="http://www.w3.org/2000/svg"
        style={{ position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:1200,opacity:0.18 }}>
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={arcColor} stopOpacity="0" />
            <stop offset="40%" stopColor={arcColor} stopOpacity="1" />
            <stop offset="60%" stopColor={arcColor} stopOpacity="1" />
            <stop offset="100%" stopColor={arcColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="600" cy="540" rx="560" ry="180" fill="none" stroke="url(#arcGrad)" strokeWidth="1.2" />
        <ellipse cx="600" cy="540" rx="440" ry="140" fill="none" stroke="url(#arcGrad)" strokeWidth="0.8" />
        <ellipse cx="600" cy="540" rx="320" ry="100" fill="none" stroke="url(#arcGrad)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

function DashboardPreview({ theme }: { theme: Theme }) {
  const isDark = theme === "dark";
  const bg        = isDark ? "rgba(14,20,28,0.88)"    : "rgba(255,252,245,0.94)";
  const border    = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const shadow    = isDark ? "0 8px 80px rgba(0,200,180,.10),0 2px 32px rgba(0,0,0,.6)"
                           : "0 8px 80px rgba(251,191,36,.18),0 2px 32px rgba(0,0,0,.10)";
  const cardBg    = isDark ? "rgba(255,255,255,0.04)"  : "rgba(0,0,0,0.04)";
  const cardBdr   = isDark ? "rgba(255,255,255,0.07)"  : "rgba(0,0,0,0.07)";
  const rowBg     = isDark ? "rgba(255,255,255,0.05)"  : "rgba(0,0,0,0.05)";
  const txt       = isDark ? "#ffffff"                 : "#0f172a";
  const muted     = isDark ? "rgba(255,255,255,0.38)"  : "rgba(15,23,42,0.45)";
  const activeRow = isDark ? "rgba(255,255,255,0.10)"  : "rgba(0,0,0,0.07)";
  const barFrom   = isDark ? "#00c8b4" : "#f59e0b";
  const barTo     = isDark ? "#0099cc" : "#fbbf24";
  const filterCls = isDark
    ? { bg:"rgba(0,200,180,0.15)", color:"#2dd4bf", border:"rgba(0,200,180,0.35)" }
    : { bg:"rgba(251,191,36,0.18)", color:"#b45309", border:"rgba(251,191,36,0.45)" };
  const avatarGrad = isDark
    ? "linear-gradient(135deg,#00c8b4,#0099cc)"
    : "linear-gradient(135deg,#fbbf24,#f59e0b)";

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-16 rounded-2xl overflow-hidden"
      style={{ background: bg, border:`1px solid ${border}`, boxShadow: shadow,
        backdropFilter:"blur(16px)", zIndex:10, transform:"perspective(900px) rotateX(4deg)",
        transition:"background 0.5s,box-shadow 0.5s" }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom:`1px solid ${cardBdr}` }}>
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-400/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <span className="w-3 h-3 rounded-full bg-green-400/70" />
        </div>
        <div className="flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ background: rowBg }}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ color: muted }}>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-xs font-mono" style={{ color: muted }}>Search anything...</span>
          <span className="ml-6 text-xs font-mono" style={{ color: muted, opacity:.5 }}>⌘K</span>
        </div>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: avatarGrad }}>E</div>
      </div>
      <div className="flex">
        <div className="w-44 py-4 px-3 shrink-0 hidden md:block" style={{ borderRight:`1px solid ${cardBdr}` }}>
          {['Insights','Company','Transactions','Cards','Accounting'].map((label, i) => (
            <div key={label} className="px-3 py-2 rounded-lg mb-1 text-sm"
              style={{ background: i===0 ? activeRow : "transparent", color: i===0 ? txt : muted, fontWeight: i===0 ? 500 : 400 }}>
              {label}
            </div>
          ))}
        </div>
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {[
              { label:"Inference calls today", value:"$1,036", cents:".62", badge:"+21%", bc:"text-green-500 bg-green-500/15" },
              { label:"Avg latency (ms)",      value:"244",    cents:".8",  badge:"-0.7%",bc:"text-red-500 bg-red-500/15" },
              { label:"Potential savings",     value:"$1,870", cents:".00", badge:null,   bc:"" },
              { label:"Monthly spend",         value:"72%",    cents:"",    badge:"↑",    bc:"text-orange-500 bg-orange-500/15" },
            ].map((c, i) => {
              const progressWidths = ["55.4%", "47.2%", "70.1%", "49.0%"];
              return (
                <div key={c.label} className="rounded-xl p-3" style={{ background: cardBg, border:`1px solid ${cardBdr}` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs" style={{ color: muted }}>{c.label}</span>
                    {c.badge && <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${c.bc}`}>{c.badge}</span>}
                  </div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-lg font-semibold" style={{ color: txt }}>{c.value}</span>
                    <span className="text-xs" style={{ color: muted }}>{c.cents}</span>
                  </div>
                  <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.06)" }}>
                    <div className="h-full rounded-full" style={{ width: progressWidths[i], backgroundImage:`linear-gradient(to right,${barFrom},${barTo})` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-3 mt-2">
            {["Last 4 weeks","Jun 8 – Jul 5"].map((t) => (
              <div key={t} className="rounded-lg px-3 py-1.5 text-xs" style={{ background: cardBg, color: muted }}>{t}</div>
            ))}
            <div className="ml-auto flex gap-2 items-center">
              {["Daily","Weekly"].map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-md cursor-pointer" style={{ color: muted }}>{t}</span>
              ))}
              <span className="text-xs border px-2 py-1 rounded-md cursor-pointer font-medium"
                style={{ background: filterCls.bg, color: filterCls.color, borderColor: filterCls.border }}>
                Filter
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION  (root export)
───────────────────────────────────────────── */
export default function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { openModal } = useModal();

  const sectionBg = isDark
    ? "radial-gradient(ellipse at 50% 0%,#0a1a20 0%,#060d12 50%,#020608 100%)"
    : "radial-gradient(ellipse at 50% 0%,#fffbeb 0%,#fef9ee 45%,#fff8e1 100%)";

  const headlineTop  = isDark ? "#ffffff"  : "#0f172a";
  const subClr       = isDark ? "rgba(255,255,255,.50)" : "rgba(15,23,42,.55)";
  const badgeBg      = isDark ? "rgba(0,200,180,.12)"   : "rgba(251,191,36,.18)";
  const badgeBdr     = isDark ? "rgba(0,200,180,.30)"   : "rgba(251,191,36,.5)";
  const badgeTxt     = isDark ? "rgba(255,255,255,.9)"  : "rgba(15,23,42,.8)";
  const badgeIcon    = isDark ? "#00c8b4"               : "#f59e0b";
  const priGrad      = isDark ? "linear-gradient(135deg,#00c8b4,#0099cc)" : "linear-gradient(135deg,#fbbf24,#f59e0b)";
  const priShadow    = isDark ? "0 0 28px rgba(0,200,180,.45)" : "0 0 28px rgba(251,191,36,.55)";
  const secBg        = isDark ? "rgba(255,255,255,.06)"  : "rgba(0,0,0,.05)";
  const secBdr       = isDark ? "rgba(255,255,255,.15)"  : "rgba(0,0,0,.12)";
  const secTxt       = isDark ? "rgba(255,255,255,.80)"  : "rgba(15,23,42,.70)";

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: sectionBg, transition:"background 0.65s ease" }}>

      <style>{`
        @keyframes fadeInUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeInDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseDark  { 0%,100%{box-shadow:0 0 0 0 rgba(0,200,180,.25)} 50%{box-shadow:0 0 0 8px rgba(0,200,180,0)} }
        @keyframes pulseLight { 0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,.30)} 50%{box-shadow:0 0 0 8px rgba(251,191,36,0)} }
        .anim-1{animation:fadeInDown .7s ease both;animation-delay:.1s}
        .anim-2{animation:fadeInUp   .8s ease both;animation-delay:.25s}
        .anim-3{animation:fadeInUp   .8s ease both;animation-delay:.45s}
        .anim-4{animation:fadeInUp   .8s ease both;animation-delay:.6s}
        .anim-5{animation:fadeInUp   1s  ease both;animation-delay:.75s}
        .badge-dark {animation:pulseDark  2.5s infinite}
        .badge-light{animation:pulseLight 2.5s infinite}
        .btn-pri:hover{transform:scale(1.04)!important}
        .btn-sec:hover{transform:scale(1.04)!important;background:rgba(255,255,255,.10)!important}
      `}</style>

      <Starfield visible={isDark} />
      <MoonRay   visible={isDark} />
      <SunRay    visible={!isDark} />
      <GlowArcs  theme={theme} />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-12 pb-0 flex-1">

        <div className="anim-2">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 ${isDark ? "badge-dark" : "badge-light"}`}
            style={{ background: badgeBg, border:`1px solid ${badgeBdr}`, color: badgeTxt }}>
            <span style={{ color: badgeIcon }}>✦</span>
            Building the future of enterprise IT
          </span>
        </div>

        <h1
          className={`${roboto.className} anim-3 text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6`}
          style={{ letterSpacing:"-0.03em" }}
        >
          <span style={{ color: headlineTop }}>Enterprise-grade IT,</span>
          <br />
          <span style={{ color: headlineTop }}>delivered without friction.</span>
        </h1>

        <p className="anim-4 text-base md:text-lg max-w-xl leading-relaxed mb-10"
          style={{ color: subClr }}>
          From cloud and security to managed services—Eigensu keeps your stack fast, safe, and scalable.
        </p>

        {/* CTAs */}
        <div className="anim-4 flex flex-col sm:flex-row items-center gap-3 mb-4">
          <button className="btn-pri text-white font-semibold px-8 py-3.5 rounded-lg text-base transition-all duration-200"
            style={{ background: priGrad, boxShadow: priShadow }}>
            Get started
          </button>

          {/* ── Book a demo → opens modal ── */}
          <button
            className="btn-sec font-medium px-8 py-3.5 rounded-lg text-base transition-all duration-200"
            style={{ background: secBg, border:`1px solid ${secBdr}`, color: secTxt }}
            onClick={openModal}          // ← the only change to this button
          >
            Book a demo
          </button>
        </div>

        <div className="anim-5 w-full max-w-5xl px-4">
          <DashboardPreview theme={theme} />
        </div>
      </div>

    </section>
  );
}