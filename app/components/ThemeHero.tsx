"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useTheme } from "./PageShell";
import { getThemeTokens, type Theme } from "../lib/themeTokens";

function Starfield({ visible }: { visible: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const stars: { x: number; y: number; r: number; alpha: number; speed: number }[] = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 220; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();
        s.alpha += s.speed * 0.01 * (Math.random() > 0.5 ? 1 : -1);
        if (s.alpha > 0.9) s.alpha = 0.9;
        if (s.alpha < 0.1) s.alpha = 0.1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 0, opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
    />
  );
}

function MoonRay({ visible }: { visible: boolean }) {
  const RAYS = [
    { angle: -62, w: 9 }, { angle: -48, w: 14 }, { angle: -36, w: 10 },
    { angle: -24, w: 18 }, { angle: -14, w: 12 }, { angle: -5, w: 20 },
    { angle: 5, w: 20 }, { angle: 14, w: 12 }, { angle: 24, w: 18 },
    { angle: 36, w: 10 }, { angle: 48, w: 14 }, { angle: 62, w: 9 },
  ];
  const cx = 450;
  const cy = 52;
  const len = 480;
  return (
    <div
      className="pointer-events-none absolute flex justify-center"
      style={{
        top: "-6%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        zIndex: 2,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 900, overflow: "visible" }}>
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
          const tx = cx + Math.sin(rad) * len;
          const ty = cy + Math.cos(rad) * len;
          const px = -Math.cos(rad);
          const py = Math.sin(rad);
          return (
            <polygon
              key={i}
              points={`${cx + px * 1.5},${cy + py * 1.5} ${cx - px * 1.5},${cy - py * 1.5} ${tx - px * w},${ty - py * w} ${tx + px * w},${ty + py * w}`}
              fill="url(#moonRayFade)"
              filter="url(#moonRayBlur)"
              opacity="0.85"
            />
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
    angle: i * 22.5,
    w: i % 2 === 0 ? 22 : 12,
    len: i % 2 === 0 ? 500 : 340,
  }));
  const cx = 450;
  const cy = 48;
  return (
    <div
      className="pointer-events-none absolute flex justify-center"
      style={{
        top: "-6%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        zIndex: 2,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    >
      <svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 900, overflow: "visible" }}>
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
          const tx = cx + Math.sin(rad) * rLen;
          const ty = cy + Math.cos(rad) * rLen;
          const px = -Math.cos(rad);
          const py = Math.sin(rad);
          return (
            <polygon
              key={i}
              points={`${cx + px * 2},${cy + py * 2} ${cx - px * 2},${cy - py * 2} ${tx - px * w},${ty - py * w} ${tx + px * w},${ty + py * w}`}
              fill="url(#sunRayFade)"
              filter="url(#sunRayBlur)"
              opacity="0.9"
            />
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
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden" style={{ zIndex: 1 }}>
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80vw",
          height: "40vw",
          borderRadius: "50%",
          background: bottomGlow,
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "-8%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: sideGlow,
          filter: "blur(16px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "-8%",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background: sideGlow,
          filter: "blur(16px)",
        }}
      />
      <svg
        viewBox="0 0 1200 500"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 1200,
          opacity: 0.18,
        }}
      >
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

const HERO_ANIM_STYLES = `
  @keyframes fadeInUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeInDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes pulseDark  { 0%,100%{box-shadow:0 0 0 0 rgba(0,200,180,.25)} 50%{box-shadow:0 0 0 8px rgba(0,200,180,0)} }
  @keyframes pulseLight { 0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,.30)} 50%{box-shadow:0 0 0 8px rgba(251,191,36,0)} }
  .hero-anim-1{animation:fadeInDown .7s ease both;animation-delay:.1s}
  .hero-anim-2{animation:fadeInUp   .8s ease both;animation-delay:.25s}
  .hero-anim-3{animation:fadeInUp   .8s ease both;animation-delay:.45s}
  .hero-anim-4{animation:fadeInUp   .8s ease both;animation-delay:.6s}
  .hero-anim-5{animation:fadeInUp   1s  ease both;animation-delay:.75s}
  .badge-dark {animation:pulseDark  2.5s infinite}
  .badge-light{animation:pulseLight 2.5s infinite}
`;

type ThemeHeroSectionProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  fullScreen?: boolean;
  align?: "center" | "start";
};

export function ThemeHeroSection({
  children,
  className = "",
  contentClassName = "",
  fullScreen = false,
  align = "start",
}: ThemeHeroSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { sectionBg } = getThemeTokens(theme);

  return (
    <section
      className={`relative flex flex-col overflow-hidden ${fullScreen ? "min-h-screen" : "min-h-[82vh]"} ${className}`}
      style={{ background: sectionBg, transition: "background 0.65s ease" }}
    >
      <style>{HERO_ANIM_STYLES}</style>
      <Starfield visible={isDark} />
      <MoonRay visible={isDark} />
      <SunRay visible={!isDark} />
      <GlowArcs theme={theme} />
      <div
        className={`relative z-10 flex flex-1 flex-col px-6 pb-16 pt-10 md:px-10 md:pb-20 md:pt-12 ${
          align === "center" ? "items-center text-center" : ""
        } ${contentClassName}`}
      >
        {children}
      </div>
    </section>
  );
}

export function HeroBadge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const tokens = getThemeTokens(theme);

  return (
    <span
      className={`hero-anim-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${isDark ? "badge-dark" : "badge-light"} ${className}`}
      style={{
        background: tokens.badgeBg,
        border: `1px solid ${tokens.badgeBorder}`,
        color: tokens.badgeText,
      }}
    >
      <span style={{ color: tokens.badgeIcon }}>✦</span>
      {children}
    </span>
  );
}
