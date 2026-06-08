export type Theme = "dark" | "light";

export function getThemeTokens(_theme?: Theme) {
  return {
    isDark: true,
    pageBg:     "#000000",
    contentBg:  "#08090b",
    sectionBg:  "radial-gradient(ellipse at 50% 0%, #08090b 0%, #000000 60%)",
    heading:    "#f3f4f6",
    body:       "#8b919c",
    muted:      "#565c66",
    border:       "rgba(255,255,255,0.08)",
    borderStrong: "rgba(255,255,255,0.16)",
    accent:     "#3b82f6",
    accent2:    "#38e8b0",
    accent3:    "#ffb224",
    accent4:    "#a78bfa",
    accent5:    "#ff6b6b",
    accentSoft: "rgba(59,130,246,0.12)",
    accentLine: "rgba(59,130,246,0.35)",
    panel:      "rgba(255,255,255,0.04)",
    priGrad:    "linear-gradient(135deg,#3b82f6,#6366f1)",
    priShadow:  "0 0 28px rgba(59,130,246,0.45)",
    badgeBg:    "rgba(59,130,246,0.12)",
    badgeBorder:"rgba(59,130,246,0.35)",
    badgeText:  "rgba(255,255,255,0.9)",
    badgeIcon:  "#3b82f6",
  };
}
