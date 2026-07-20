export type Theme = "dark" | "light";

/**
 * Theme tokens as CSS custom-property references.
 *
 * Colours are driven by `html[data-theme]` (see globals.css), so returning
 * `var(--…)` here means inline styles re-resolve automatically when the theme
 * toggles — no recolouring logic per component. `isDark` is still derived from
 * the active theme for the few places that branch on it.
 */
export function getThemeTokens(theme?: Theme) {
  return {
    isDark: theme !== "light",

    pageBg:     "var(--bg)",
    contentBg:  "var(--bg-elev)",
    contentBg2: "var(--bg-elev-2)",
    sectionBg:  "var(--section-bg)",

    heading:    "var(--text)",
    body:       "var(--text-muted)",
    muted:      "var(--text-dim)",

    border:       "var(--border)",
    borderStrong: "var(--border-strong)",
    panel:        "var(--panel)",

    accent:     "var(--accent)",
    accent2:    "var(--accent-2)",
    accent3:    "var(--accent-3)",
    accent4:    "var(--accent-4)",
    accent5:    "var(--accent-5)",
    accentSoft: "var(--accent-soft)",
    accentLine: "var(--accent-line)",
    onAccent:   "var(--on-accent)",

    ok:         "var(--ok)",
    warn:       "var(--warn)",
    err:        "var(--err)",

    priGrad:    "linear-gradient(135deg, var(--accent), var(--accent-3))",
    priShadow:  "0 0 28px var(--accent-line)",
    glow:       "var(--glow)",

    badgeBg:    "var(--accent-soft)",
    badgeBorder:"var(--accent-line)",
    badgeText:  "var(--text)",
    badgeIcon:  "var(--accent)",
  };
}
