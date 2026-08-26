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

function GlowArcs({ theme: _theme }: { theme: Theme }) {
  const bottomGlow = "radial-gradient(ellipse at center, var(--glow) 0%, transparent 70%)";
  const sideGlow   = "radial-gradient(ellipse at center, var(--glow) 0%, transparent 70%)";
  const arcColor   = "var(--accent)";

  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-hidden" style={{ zIndex: 1 }}>
      <div style={{ position: "absolute", bottom: "-10%", left: "50%", transform: "translateX(-50%)", width: "80vw", height: "40vw", borderRadius: "50%", background: bottomGlow, filter: "blur(8px)" }} />
      <div style={{ position: "absolute", top: "30%", left: "-8%", width: "30vw", height: "30vw", borderRadius: "50%", background: sideGlow, filter: "blur(16px)" }} />
      <div style={{ position: "absolute", top: "30%", right: "-8%", width: "30vw", height: "30vw", borderRadius: "50%", background: sideGlow, filter: "blur(16px)" }} />
      <svg
        viewBox="0 0 1200 500"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 1200, opacity: 0.18 }}
      >
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor={arcColor} stopOpacity="0" />
            <stop offset="40%"  stopColor={arcColor} stopOpacity="1" />
            <stop offset="60%"  stopColor={arcColor} stopOpacity="1" />
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
  @keyframes heroPulse  { 0%,100%{box-shadow:0 0 0 0 var(--accent-line)} 50%{box-shadow:0 0 0 8px transparent} }
  .hero-anim-1{animation:fadeInDown .7s ease both;animation-delay:.1s}
  .hero-anim-2{animation:fadeInUp   .8s ease both;animation-delay:.25s}
  .hero-anim-3{animation:fadeInUp   .8s ease both;animation-delay:.45s}
  .hero-anim-4{animation:fadeInUp   .8s ease both;animation-delay:.6s}
  .hero-anim-5{animation:fadeInUp   1s  ease both;animation-delay:.75s}
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
  const { sectionBg } = getThemeTokens(theme);

  return (
    <section
      className={`relative flex flex-col overflow-hidden ${fullScreen ? "min-h-screen" : "min-h-[82vh]"} ${className}`}
      style={{ background: sectionBg }}
    >
      <style>{HERO_ANIM_STYLES}</style>
      <Starfield visible={theme !== "light"} />
      <GlowArcs theme={theme} />
      <div
        className={`relative z-10 flex flex-1 flex-col pb-16 pt-[var(--hero-content-top)] md:pb-20 w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10 ${
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
  const tokens = getThemeTokens(theme);

  return (
    <span
      className={`hero-anim-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium heroPulse ${className}`}
      style={{
        background: tokens.badgeBg,
        border: `1px solid ${tokens.badgeBorder}`,
        color: tokens.badgeText,
        animation: "heroPulse 2.5s infinite",
      }}
    >
      <span style={{ color: tokens.badgeIcon }}>✦</span>
      {children}
    </span>
  );
}
