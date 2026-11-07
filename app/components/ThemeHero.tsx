"use client";

import type { ReactNode } from "react";
import { useTheme } from "./PageShell";
import { getThemeTokens } from "../lib/themeTokens";

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
  background?: string;
};

export function ThemeHeroSection({
  children,
  className = "",
  contentClassName = "",
  fullScreen = false,
  align = "start",
  background,
}: ThemeHeroSectionProps) {
  // Plain background: the starfield and the orange haze/arcs were removed (Nov 2026).
  const { sectionBg } = getThemeTokens();

  return (
    <section
      className={`relative flex flex-col overflow-hidden ${fullScreen ? "min-h-screen" : "min-h-[82vh]"} ${className}`}
      style={{ background: background ?? sectionBg }}
    >
      <style>{HERO_ANIM_STYLES}</style>
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
