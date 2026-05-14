"use client";

type Theme = "dark" | "light";

export default function Navbar({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const isDark = theme === "dark";
  const accent = isDark ? "#00f0c3" : "#2dd4bf";
  const logoTxt = isDark ? "#ffffff" : "#0f172a";
  const navBg = isDark ? "#0a0e14" : "#ffffff";
  const linkClr = isDark ? "rgba(255,255,255,0.72)" : "rgba(15,23,42,0.72)";
  const linkHoverBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)";
  const activeLinkClr = isDark ? "#ffffff" : "#0f172a";

  const navLinks = ["Home", "Work", "Services", "About", "Blog"];

  return (
    <nav className="relative z-50 w-full border-b" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)", background: navBg, position: "sticky", top: 0 }}>
      <div className="flex items-center justify-between px-8 py-4 max-w-full">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <rect x="2" y="2" width="10" height="10" rx="2" fill={accent} />
            <rect x="16" y="2" width="10" height="10" rx="2" fill={accent} fillOpacity="0.4" />
            <rect x="2" y="16" width="10" height="10" rx="2" fill={accent} fillOpacity="0.4" />
            <rect x="16" y="16" width="10" height="10" rx="2" fill={accent} fillOpacity="0.15" />
          </svg>
          <span className="text-sm font-semibold tracking-tight" style={{ color: logoTxt }}>
            eigensu<span style={{ color: accent }}>.in</span>
          </span>
        </div>

        {/* Center: Light/Dark Toggle */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-2 py-1 rounded-full"
          style={{ background: isDark ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}>
          <button
            onClick={() => { if (isDark) onToggle(); }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition duration-200"
            style={{
              color: !isDark ? "#0f172a" : "rgba(255,255,255,0.6)",
              background: !isDark ? "#e8f3f1" : "transparent",
              cursor: !isDark ? "default" : "pointer"
            }}>
            Light
          </button>
          <button
            onClick={() => { if (!isDark) onToggle(); }}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg transition duration-200"
            style={{
              color: isDark ? "#0f172a" : "#0f172a",
              background: isDark ? "#ffffff" : "transparent",
              cursor: isDark ? "default" : "pointer"
            }}>
            Dark
          </button>
        </div>

        {/* Right: Nav Links + Contact */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <a key={item} href="#" className="text-sm px-3 py-2 rounded transition duration-200"
                style={{ color: linkClr }}
                onMouseEnter={(e) => e.currentTarget.style.background = linkHoverBg}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                {item}
              </a>
            ))}
          </div>
          
          <button className="text-sm px-4 py-2 rounded transition duration-200"
            style={{ color: linkClr, border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.12)"}`, background: isDark ? "rgba(255,255,255,0.04)" : "transparent" }}>
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
