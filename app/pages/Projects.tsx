"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../components/PageShell";

interface Project {
  id: number;
  category: string;
  name: string;
  tagline: string;
  body: string;
  chips: string[];
  stat: string;
  statUnit: string;
  kpiLabel: string;
  accent: string;
  year: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    category: "Cloud Infrastructure",
    name: "CloudForge",
    tagline: "Enterprise Multi-Cloud Migration",
    body: "Architected a zero-downtime migration for a 2,400-seat financial institution from on-premise data centres to a hybrid AWS / Azure stack. Infrastructure spend dropped 38 % while payment pipelines maintained a 99.99 % SLA throughout the transition.",
    chips: ["AWS", "Azure", "Terraform", "Kubernetes"],
    stat: "38",
    statUnit: "%",
    kpiLabel: "Infrastructure Cost Saved",
    accent: "hsl(38 72% 47%)",
    year: "2024",
  },
  {
    id: 2,
    category: "Cybersecurity",
    name: "SentinelShield",
    tagline: "Zero-Trust Security Framework",
    body: "Deployed a full zero-trust architecture across a healthcare network spanning 14 hospitals. Lateral movement risk was eliminated and ISO 27001 certification was achieved within 90 days of go-live — ahead of any comparable engagement in the sector.",
    chips: ["Zero Trust", "SIEM", "SOC", "ISO 27001"],
    stat: "90",
    statUnit: " days",
    kpiLabel: "Days to ISO Certified",
    accent: "hsl(165 58% 45%)",
    year: "2024",
  },
  {
    id: 3,
    category: "Software Development",
    name: "NexusFlow",
    tagline: "Real-Time Logistics Intelligence",
    body: "Built a real-time supply-chain intelligence platform for a pan-India operator managing 18,000+ daily shipments. An event-driven Kafka backbone delivers sub-100 ms tracking updates across the entire fleet — no polling, no lag.",
    chips: ["Next.js", "Kafka", "PostgreSQL", "Redis"],
    stat: "18K",
    statUnit: "+",
    kpiLabel: "Shipments Tracked Daily",
    accent: "hsl(278 54% 55%)",
    year: "2023",
  },
  {
    id: 4,
    category: "Managed Services",
    name: "OpsHorizon",
    tagline: "24 / 7 Infrastructure Ownership",
    body: "Assumed complete managed-services responsibility for a Series-C SaaS company — monitoring, patching, incident response and capacity planning. Mean time to detect sits under four minutes; mean time to resolve under twenty-two, sustained over a three-year engagement.",
    chips: ["NOC / SOC", "Datadog", "PagerDuty", "SRE"],
    stat: "<4",
    statUnit: " min",
    kpiLabel: "Mean Time to Detect",
    accent: "hsl(4 62% 52%)",
    year: "2023",
  },
  {
    id: 5,
    category: "Digital Transformation",
    name: "DataPulse",
    tagline: "Enterprise Analytics & BI Overhaul",
    body: "Replaced a fragmented legacy BI stack with a modern lakehouse for a retail conglomerate operating 400+ stores. Eleven disparate data sources now flow into a single Snowflake warehouse; analyst turnaround fell from days to minutes via self-serve dashboards.",
    chips: ["Snowflake", "dbt", "Tableau", "Python"],
    stat: "400",
    statUnit: "+",
    kpiLabel: "Retail Stores Unified",
    accent: "hsl(96 52% 42%)",
    year: "2022",
  },
];

const TICKER_ITEMS = [
  "Cloud Infrastructure",
  "Cybersecurity",
  "Software Engineering",
  "Managed Services",
  "Digital Transformation",
  "Enterprise IT",
  "Zero Downtime",
  "ISO 27001",
];

function useParallax(factor = 0.3) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tick = () => {
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * factor;
      el.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener("scroll", tick, { passive: true });
    tick();

    return () => window.removeEventListener("scroll", tick);
  }, [factor]);

  return ref;
}

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, on };
}

function useCountUp(target: string, run: boolean, duration = 1400) {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!run) return;

    const raw = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(raw)) {
      setDisplay(target);
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(raw * ease);
      setDisplay(target.replace(/[0-9]+/, String(current)));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [run, target, duration]);

  return display;
}

function MagneticCursor({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";
  const blobRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const cur = useRef({ x: -200, y: -200 });
  const raf = useRef(0);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      pos.current = { x: event.clientX, y: event.clientY };
    };

    const loop = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.09;
      cur.current.y += (pos.current.y - cur.current.y) * 0.09;

      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${cur.current.x - 20}px,${cur.current.y - 20}px)`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: isDark ? "screen" : "multiply",
        background: isDark ? "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(0,200,180,0.9) 40%, rgba(0,153,204,0.1) 72%, transparent 100%)" : "var(--accent-hero)",
        boxShadow: isDark ? "0 0 18px rgba(0,200,180,0.55), 0 0 34px rgba(0,153,204,0.2)" : "none",
        opacity: isDark ? 0.8 : 0.35,
        willChange: "transform",
      }}
    />
  );
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        padding: "14px 0",
        background: "var(--ticker-bg)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 56,
          whiteSpace: "nowrap",
          animation: "ticker 28s linear infinite",
          willChange: "transform",
        }}
      >
        {items.map((item, index) => (
          <span
            key={index}
            style={{
              fontFamily: "inherit",
              fontStyle: "italic",
              fontSize: 13,
              letterSpacing: "0.08em",
              color: "var(--text-muted)",
              flexShrink: 0,
            }}
          >
            {item}
            <span style={{ margin: "0 28px", opacity: 0.3 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function LineDivider({ on, accent }: { on: boolean; accent: string }) {
  return (
    <svg viewBox="0 0 500 24" style={{ width: "100%", maxWidth: 500, display: "block", overflow: "visible" }} fill="none">
      <line
        x1="0"
        y1="12"
        x2="500"
        y2="12"
        stroke={accent}
        strokeWidth="0.8"
        strokeDasharray="500"
        strokeDashoffset={on ? "0" : "500"}
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s" }}
      />
      <circle cx="500" cy="12" r="3" fill={accent} opacity={on ? 1 : 0} style={{ transition: "opacity 0.4s ease 1.5s" }} />
    </svg>
  );
}

function StatBlock({ stat, statUnit, kpiLabel, accent, on }: { stat: string; statUnit: string; kpiLabel: string; accent: string; on: boolean }) {
  const value = useCountUp(stat, on);

  return (
    <div
      style={{
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(32px)",
        transition: "opacity 1s ease 0.6s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
      }}
    >
      <div
        style={{
          fontFamily: "inherit",
          fontWeight: 800,
          fontSize: "clamp(3.2rem,6vw,5.2rem)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
          color: accent,
        }}
      >
        {value}
        <span style={{ fontSize: "0.55em", letterSpacing: 0 }}>{statUnit}</span>
      </div>
      <div
        style={{
          fontFamily: "inherit",
          fontStyle: "italic",
          fontSize: 13,
          letterSpacing: "0.05em",
          color: "var(--text-muted)",
          marginTop: 8,
        }}
      >
        {kpiLabel}
      </div>
    </div>
  );
}

function ProjectSection({ project, index }: { project: Project; index: number }) {
  const { ref, on } = useReveal(0.1);
  const orbRef = useParallax(0.2);
  const isEven = index % 2 === 0;
  const delay = (seconds: number) => `${seconds}s`;

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "90vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--section-bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div
        ref={orbRef}
        style={{
          position: "absolute",
          width: "min(60vw, 560px)",
          height: "min(60vw, 560px)",
          borderRadius: "50%",
          [isEven ? "right" : "left"]: "-8%",
          top: "10%",
          background: `radial-gradient(circle, ${project.accent}28 0%, transparent 70%)`,
          pointerEvents: "none",
          filter: "blur(60px)",
        }}
      />

      <span
        style={{
          position: "absolute",
          [isEven ? "right" : "left"]: "3vw",
          top: "50%",
          transform: "translateY(-50%) rotate(90deg)",
          fontFamily: "inherit",
          fontWeight: 900,
          fontSize: "clamp(7rem,16vw,13rem)",
          color: project.accent,
          opacity: on ? 0.055 : 0,
          transition: "opacity 1.2s ease 0.8s",
          userSelect: "none",
          whiteSpace: "nowrap",
          letterSpacing: "0.05em",
          pointerEvents: "none",
        }}
      >
        {project.year}
      </span>

      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1260,
          margin: "0 auto",
          padding: "100px clamp(24px,6vw,90px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(48px,8vw,110px)",
          alignItems: "center",
          direction: isEven ? "ltr" : "rtl",
        }}
      >
        <div style={{ direction: "ltr" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28, overflow: "hidden" }}>
            <span
              style={{
                fontFamily: "inherit",
                fontStyle: "italic",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: project.accent,
                opacity: on ? 1 : 0,
                transform: on ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.7s ease ${delay(0.1)}, transform 0.7s ease ${delay(0.1)}`,
                whiteSpace: "nowrap",
              }}
            >
              {project.category}
            </span>
            <div
              style={{
                flex: 1,
                height: "0.5px",
                background: `linear-gradient(to right, ${project.accent}88, transparent)`,
                transformOrigin: "left",
                transform: on ? "scaleX(1)" : "scaleX(0)",
                transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${delay(0.2)}`,
              }}
            />
          </div>

          <h2
            style={{
              fontFamily: "inherit",
              fontWeight: 900,
              fontSize: "clamp(3rem,5.5vw,5rem)",
              letterSpacing: "-0.035em",
              lineHeight: 1,
              color: "var(--text-primary)",
              margin: "0 0 10px",
              opacity: on ? 1 : 0,
              transform: on ? "translateY(0)" : "translateY(28px)",
              transition: `opacity 0.9s ease ${delay(0.15)}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay(0.15)}`,
            }}
          >
            {project.name}
          </h2>

          <p
            style={{
              fontFamily: "inherit",
              fontStyle: "italic",
              fontSize: "clamp(1rem,1.8vw,1.25rem)",
              color: project.accent,
              letterSpacing: "0.03em",
              margin: "0 0 32px",
              opacity: on ? 1 : 0,
              transform: on ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.9s ease ${delay(0.25)}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay(0.25)}`,
            }}
          >
            {project.tagline}
          </p>

          <div style={{ marginBottom: 28 }}>
            <LineDivider on={on} accent={project.accent} />
          </div>

          <p
            style={{
              fontFamily: "inherit",
              fontSize: "clamp(0.9rem,1.4vw,1rem)",
              lineHeight: 1.85,
              color: "var(--text-secondary)",
              maxWidth: 460,
              margin: "0 0 36px",
              opacity: on ? 1 : 0,
              transform: on ? "translateY(0)" : "translateY(18px)",
              transition: `opacity 0.9s ease ${delay(0.35)}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay(0.35)}`,
            }}
          >
            {project.body}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              opacity: on ? 1 : 0,
              transform: on ? "translateY(0)" : "translateY(14px)",
              transition: `opacity 0.9s ease ${delay(0.45)}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay(0.45)}`,
            }}
          >
            {project.chips.map((chip) => (
              <span
                key={chip}
                style={{
                  fontFamily: "inherit",
                  fontStyle: "italic",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  color: project.accent,
                  border: `0.5px solid ${project.accent}55`,
                  background: `${project.accent}0e`,
                  borderRadius: 2,
                  padding: "6px 14px",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            direction: "ltr",
            display: "flex",
            flexDirection: "column",
            alignItems: isEven ? "flex-end" : "flex-start",
            gap: 48,
          }}
        >
          <div
            style={{
              fontFamily: "inherit",
              fontWeight: 800,
              fontSize: "clamp(6rem,12vw,10rem)",
              lineHeight: 1,
              letterSpacing: "-0.06em",
              color: project.accent,
              opacity: on ? 0.1 : 0,
              transform: on ? "translateY(0)" : "translateY(40px)",
              transition: `opacity 1.2s ease ${delay(0.2)}, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${delay(0.2)}`,
              userSelect: "none",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          <StatBlock stat={project.stat} statUnit={project.statUnit} kpiLabel={project.kpiLabel} accent={project.accent} on={on} />

          <div
            style={{
              width: on ? 90 : 0,
              height: 90,
              borderTop: `0.5px solid ${project.accent}`,
              borderLeft: isEven ? "none" : `0.5px solid ${project.accent}`,
              borderRight: isEven ? `0.5px solid ${project.accent}` : "none",
              opacity: on ? 0.6 : 0,
              transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay(0.5)}, opacity 0.6s ease ${delay(0.5)}`,
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "5vw",
          right: "5vw",
          height: "0.5px",
          background: `linear-gradient(to right, transparent, ${project.accent}44, transparent)`,
        }}
      />
    </section>
  );
}

function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.44}px)`;
        contentRef.current.style.opacity = String(Math.max(0, 1 - y / 520));
      }

      if (gridRef.current) {
        gridRef.current.style.transform = `translateY(${y * 0.14}px)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--hero-bg)",
      }}
    >
      <div
        ref={gridRef}
        style={{
          position: "absolute",
          inset: "-20%",
          backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          pointerEvents: "none",
        }}
      />

      <div ref={contentRef} style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
        <p
          style={{
            fontFamily: "inherit",
            fontStyle: "italic",
            fontSize: 13,
            letterSpacing: "0.32em",
            color: "var(--accent-hero)",
            textTransform: "uppercase",
            marginBottom: 24,
            animation: "heroFade 0.9s ease 0.2s both",
          }}
        >
          Eigensu — Selected Work
        </p>

        <h1
          style={{
            fontFamily: "inherit",
            fontWeight: 900,
            fontSize: "clamp(3.8rem,9vw,8.5rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            color: "var(--text-primary)",
            margin: "0 0 24px",
            animation: "heroFade 0.9s ease 0.4s both",
          }}
        >
          Projects<br />
          <em style={{ fontStyle: "italic", color: "var(--accent-hero)", letterSpacing: "-0.02em" }}>& Partnerships</em>
        </h1>

        <p
          style={{
            fontFamily: "inherit",
            fontStyle: "italic",
            fontSize: "clamp(0.9rem,1.7vw,1.05rem)",
            color: "var(--text-secondary)",
            maxWidth: 500,
            margin: "0 auto 56px",
            lineHeight: 1.85,
            animation: "heroFade 0.9s ease 0.6s both",
          }}
        >
          Enterprise-grade outcomes delivered at scale — cloud, security, software engineering, and managed services.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            animation: "heroFade 0.9s ease 0.8s both",
          }}
        >
          {["05 Projects", "03 Years", "14+ Clients"].map((item, index) => (
            <span
              key={item}
              style={{
                fontFamily: "inherit",
                fontSize: 12,
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
              }}
            >
              {item}
              {index < 2 && <span style={{ marginLeft: 20, opacity: 0.3 }}>·</span>}
            </span>
          ))}
        </div>

        <div
          style={{
            marginTop: 60,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            animation: "heroFade 0.9s ease 1.1s both",
          }}
        >
          <svg width="18" height="36" viewBox="0 0 18 36" fill="none">
            <rect x="1" y="1" width="16" height="34" rx="8" stroke="var(--accent-hero)" strokeWidth="0.8" />
            <circle cx="9" cy="9" r="2.5" fill="var(--accent-hero)" style={{ animation: "scrollDot 2s ease infinite" }} />
          </svg>
        </div>
      </div>

      <Ticker />
    </section>
  );
}


export default function ProjectsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div>
      <style>{`
        main *, main *::before, main *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        /* Page-scoped navbar overrides (Projects only) */
        nav.sticky.top-0 {
          background: var(--nav-bg) !important;
          border-bottom-color: var(--nav-border) !important;
          backdrop-filter: blur(12px);
        }

        /* Make contact button slightly bolder on this page */
        nav.sticky.top-0 button[type="button"] { font-weight: 600; }

        :root {
          --hero-bg: ${isDark ? "#050b10" : "#fffaf0"};
          --section-bg: ${isDark ? "#020608" : "#fff7e8"};
          --footer-bg: ${isDark ? "#050b10" : "#fffaf0"};
          --ticker-bg: ${isDark ? "rgba(5,11,16,0.92)" : "rgba(255,250,240,0.92)"};
          --text-primary: ${isDark ? "#ffffff" : "#0f172a"};
          --text-secondary: ${isDark ? "rgba(255,255,255,0.72)" : "rgba(15,23,42,0.72)"};
          --text-muted: ${isDark ? "rgba(255,255,255,0.46)" : "rgba(15,23,42,0.52)"};
          --border: ${isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"};
          --grid-line: ${isDark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.06)"};
          --accent-hero: ${isDark ? "#00c8b4" : "#f59e0b"};
          --nav-bg: ${isDark ? "rgba(5,11,16,0.86)" : "rgba(255,250,240,0.88)"};
          --nav-border: ${isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)"};
        }

        body { background: var(--hero-bg); color: var(--text-primary); overflow-x: hidden; font-family: var(--font-sans); }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: var(--accent-hero); border-radius: 2px; }

        @keyframes heroFade {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(14px); opacity: 0; }
        }

        @media (max-width: 720px) {
          [data-grid] { grid-template-columns: 1fr !important; direction: ltr !important; }
        }
      `}</style>

      <MagneticCursor theme={theme} />

      <main>
        <Hero />
        {PROJECTS.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </main>
    </div>
  );
}