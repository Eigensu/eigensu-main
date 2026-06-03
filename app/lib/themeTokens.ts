export type Theme = "dark" | "light";

export function getThemeTokens(theme: Theme) {
  const isDark = theme === "dark";

  return {
    isDark,
    sectionBg: isDark
      ? "radial-gradient(ellipse at 50% 0%,#0a1a20 0%,#060d12 50%,#020608 100%)"
      : "radial-gradient(ellipse at 50% 0%,#fffbeb 0%,#fef9ee 45%,#fff8e1 100%)",
    pageBg: isDark ? "#020608" : "#fffaf0",
    contentBg: isDark ? "#050b10" : "#fff7e8",
    heading: isDark ? "#ffffff" : "#0f172a",
    body: isDark ? "rgba(255,255,255,0.72)" : "rgba(15,23,42,0.72)",
    muted: isDark ? "rgba(255,255,255,0.46)" : "rgba(15,23,42,0.52)",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)",
    accent: isDark ? "#00c8b4" : "#f59e0b",
    accentSoft: isDark ? "rgba(0,200,180,0.12)" : "rgba(245,158,11,0.12)",
    badgeBg: isDark ? "rgba(0,200,180,0.12)" : "rgba(251,191,36,0.18)",
    badgeBorder: isDark ? "rgba(0,200,180,0.30)" : "rgba(251,191,36,0.5)",
    badgeText: isDark ? "rgba(255,255,255,0.9)" : "rgba(15,23,42,0.8)",
    badgeIcon: isDark ? "#00c8b4" : "#f59e0b",
    priGrad: isDark ? "linear-gradient(135deg,#00c8b4,#0099cc)" : "linear-gradient(135deg,#fbbf24,#f59e0b)",
    priShadow: isDark ? "0 0 28px rgba(0,200,180,0.45)" : "0 0 28px rgba(251,191,36,0.55)",
    panel: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.82)",
  };
}
