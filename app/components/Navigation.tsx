"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Theme = "dark" | "light";

export default function Navbar({ theme, onContact, setTheme }: { theme: Theme; onContact: () => void; setTheme?: (t: Theme) => void }) {
  const isDark = theme === "dark";
  const accent = isDark ? "#00f0c3" : "#2dd4bf";
  const logoTxt = isDark ? "#ffffff" : "#0f172a";
  const navBg = isDark ? "#0a0e14" : "#ffffff";
  const linkClr = isDark ? "rgba(255,255,255,0.72)" : "rgba(15,23,42,0.72)";
  const linkHoverBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)";
  const activeLinkClr = isDark ? "#ffffff" : "#0f172a";
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/process" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-md" style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)", background: navBg }}>
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

        {/* Center: (theme controlled centrally) */}

        {/* Right: Nav Links + Contact */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm px-3 py-2 rounded transition duration-200"
                  style={{ color: isActive ? activeLinkClr : linkClr, background: isActive ? linkHoverBg : "transparent" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = linkHoverBg}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-2 text-sm" style={{ color: linkClr, borderLeft: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.12)"}`, paddingLeft: 16 }}>
            <button
              onClick={() => setTheme?.("light")}
              className="px-2 py-1 rounded transition duration-200"
              style={{
                background: theme === "light" ? (isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.08)") : "transparent",
                color: theme === "light" ? activeLinkClr : linkClr,
                cursor: setTheme ? "pointer" : "default",
              }}
              onMouseEnter={(e) => { if (theme !== "light" && setTheme) e.currentTarget.style.background = linkHoverBg; }}
              onMouseLeave={(e) => { if (theme !== "light") e.currentTarget.style.background = "transparent"; }}
            >
              Light
            </button>
            <span style={{ color: "currentColor", opacity: 0.3 }}>|</span>
            <button
              onClick={() => setTheme?.("dark")}
              className="px-2 py-1 rounded transition duration-200"
              style={{
                background: theme === "dark" ? (isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.08)") : "transparent",
                color: theme === "dark" ? activeLinkClr : linkClr,
                cursor: setTheme ? "pointer" : "default",
              }}
              onMouseEnter={(e) => { if (theme !== "dark" && setTheme) e.currentTarget.style.background = linkHoverBg; }}
              onMouseLeave={(e) => { if (theme !== "dark") e.currentTarget.style.background = "transparent"; }}
            >
              Dark
            </button>
          </div>
          
          <button type="button" onClick={onContact} className="text-sm px-4 py-2 rounded transition duration-200"
            style={{ color: linkClr, border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.12)"}`, background: isDark ? "rgba(255,255,255,0.04)" : "transparent" }}>
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
