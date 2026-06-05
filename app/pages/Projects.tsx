"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";
import { getThemeTokens } from "../lib/themeTokens";

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
    body: "Architected a zero-downtime migration for a 2,400-seat financial institution from on-premise data centres to a hybrid AWS / Azure stack. Infrastructure spend dropped 38% while payment pipelines maintained a 99.99% SLA throughout the transition.",
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
    body: "Built a real-time supply-chain intelligence platform for a pan-India operator managing 18,000+ daily shipments. An event-driven Kafka backbone delivers sub-100ms tracking updates across the entire fleet — no polling, no lag.",
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
    tagline: "24/7 Infrastructure Ownership",
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

// ── SVG Visuals per project ─────────────────────────────────────────────────

function CloudVisual({ accent, on }: { accent: string; on: boolean }) {
  return (
    <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 360, opacity: on ? 1 : 0, transition: "opacity 1s ease 0.4s" }}>
      {/* Grid */}
      {[0,1,2,3,4,5].map(i => (
        <line key={`h${i}`} x1="20" y1={40 + i*36} x2="340" y2={40 + i*36}
          stroke={accent} strokeWidth="0.4" strokeOpacity="0.15" />
      ))}
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <line key={`v${i}`} x1={20 + i*40} y1="40" x2={20 + i*40} y2="220"
          stroke={accent} strokeWidth="0.4" strokeOpacity="0.15" />
      ))}
      {/* Cloud shape AWS */}
      <ellipse cx="130" cy="130" rx="56" ry="38" stroke={accent} strokeWidth="1.2" strokeOpacity="0.6" fill={`${accent}10`} />
      <ellipse cx="160" cy="115" rx="38" ry="28" stroke={accent} strokeWidth="1.2" strokeOpacity="0.6" fill={`${accent}10`} />
      <ellipse cx="195" cy="122" rx="44" ry="32" stroke={accent} strokeWidth="1.2" strokeOpacity="0.6" fill={`${accent}10`} />
      {/* Cloud shape Azure */}
      <ellipse cx="240" cy="160" rx="48" ry="32" stroke={accent} strokeWidth="1.2" strokeOpacity="0.35" fill={`${accent}08`}
        style={{ transform: "scale(0.85)", transformOrigin: "240px 160px" }} />
      {/* Connecting lines */}
      <line x1="180" y1="158" x2="240" y2="160" stroke={accent} strokeWidth="0.8" strokeOpacity="0.5" strokeDasharray="4 3" />
      <circle cx="180" cy="158" r="3.5" fill={accent} opacity="0.8" />
      <circle cx="240" cy="160" r="3.5" fill={accent} opacity="0.5" />
      {/* Nodes */}
      {[[60,210],[130,210],[200,210],[280,210]].map(([x,y],i) => (
        <g key={i}>
          <rect x={x-14} y={y-10} width="28" height="20" rx="4"
            stroke={accent} strokeWidth="0.8" fill={`${accent}12`} opacity="0.7" />
          <line x1={x} y1={y-10} x2={x} y2={y-30}
            stroke={accent} strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="3 2" />
        </g>
      ))}
      {/* Label */}
      <text x="180" y="248" textAnchor="middle" fontSize="9" letterSpacing="3"
        fill={accent} fillOpacity="0.5" fontFamily="monospace">HYBRID CLOUD ARCHITECTURE</text>
    </svg>
  );
}

function SecurityVisual({ accent, on }: { accent: string; on: boolean }) {
  return (
    <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 360, opacity: on ? 1 : 0, transition: "opacity 1s ease 0.4s" }}>
      {/* Concentric rings */}
      {[90,70,50,30].map((r, i) => (
        <circle key={i} cx="180" cy="126" r={r}
          stroke={accent} strokeWidth="0.6" strokeOpacity={0.1 + i * 0.08}
          fill="none" strokeDasharray={i % 2 === 0 ? "4 3" : "none"} />
      ))}
      {/* Shield */}
      <path d="M180 56 L220 74 L220 118 Q220 148 180 168 Q140 148 140 118 L140 74 Z"
        stroke={accent} strokeWidth="1.4" fill={`${accent}12`} />
      {/* Lock icon */}
      <rect x="168" y="112" width="24" height="18" rx="3"
        stroke={accent} strokeWidth="1" fill={`${accent}20`} />
      <path d="M172 112 Q172 103 180 103 Q188 103 188 112"
        stroke={accent} strokeWidth="1" fill="none" />
      <circle cx="180" cy="121" r="2.5" fill={accent} opacity="0.8" />
      {/* Tick marks around ring */}
      {Array.from({length: 12}).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x1 = 180 + Math.cos(angle) * 96;
        const y1 = 126 + Math.sin(angle) * 96;
        const x2 = 180 + Math.cos(angle) * 103;
        const y2 = 126 + Math.sin(angle) * 103;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={accent} strokeWidth={i % 3 === 0 ? "1.2" : "0.5"} strokeOpacity="0.5" />;
      })}
      {/* Nodes on ring */}
      {[0, 1, 2, 3].map(i => {
        const angle = (i / 4) * Math.PI * 2 - Math.PI / 4;
        const x = 180 + Math.cos(angle) * 90;
        const y = 126 + Math.sin(angle) * 90;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="5" stroke={accent} strokeWidth="0.8" fill={`${accent}20`} />
            <line x1={x} y1={y} x2="180" y2="126"
              stroke={accent} strokeWidth="0.4" strokeOpacity="0.2" />
          </g>
        );
      })}
      <text x="180" y="248" textAnchor="middle" fontSize="9" letterSpacing="3"
        fill={accent} fillOpacity="0.5" fontFamily="monospace">ZERO-TRUST PERIMETER</text>
    </svg>
  );
}

function CodeVisual({ accent, on }: { accent: string; on: boolean }) {
  const lines = [
    "import { Kafka } from 'kafkajs'",
    "const consumer = kafka.consumer()",
    "await consumer.subscribe({",
    "  topic: 'shipments',",
    "  fromBeginning: false",
    "})",
    "consumer.run({",
    "  eachMessage: async ({ msg }) => {",
    "    await trackShipment(msg)",
    "  }",
    "})",
  ];
  return (
    <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 360, opacity: on ? 1 : 0, transition: "opacity 1s ease 0.4s" }}>
      {/* Terminal window */}
      <rect x="20" y="20" width="320" height="210" rx="8"
        stroke={accent} strokeWidth="0.8" fill={`${accent}06`} />
      <rect x="20" y="20" width="320" height="30" rx="8"
        stroke="none" fill={`${accent}14`} />
      <circle cx="42" cy="35" r="4.5" fill={accent} opacity="0.4" />
      <circle cx="58" cy="35" r="4.5" fill={accent} opacity="0.25" />
      <circle cx="74" cy="35" r="4.5" fill={accent} opacity="0.15" />
      {/* Code lines */}
      {lines.map((line, i) => (
        <text key={i} x="32" y={70 + i * 16} fontSize="8.5"
          fill={accent} fillOpacity={i === 0 ? 0.9 : 0.55}
          fontFamily="monospace" letterSpacing="0.3">
          {line}
        </text>
      ))}
      {/* Cursor blink */}
      <rect x="32" y="236" width="6" height="10" fill={accent} opacity="0.7">
        <animate attributeName="opacity" values="0.7;0;0.7" dur="1.2s" repeatCount="indefinite" />
      </rect>
      <text x="180" y="248" textAnchor="middle" fontSize="9" letterSpacing="3"
        fill={accent} fillOpacity="0.5" fontFamily="monospace">EVENT-DRIVEN PIPELINE</text>
    </svg>
  );
}

function OpsVisual({ accent, on }: { accent: string; on: boolean }) {
  const bars = [62, 78, 55, 90, 45, 80, 70, 95, 60, 85, 72, 88];
  return (
    <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 360, opacity: on ? 1 : 0, transition: "opacity 1s ease 0.4s" }}>
      {/* Horizontal grid */}
      {[0,1,2,3,4].map(i => (
        <line key={i} x1="30" y1={50 + i * 36} x2="340" y2={50 + i * 36}
          stroke={accent} strokeWidth="0.4" strokeOpacity="0.15" />
      ))}
      {/* Bars */}
      {bars.map((h, i) => (
        <rect key={i} x={30 + i * 26} y={194 - h} width="18" height={h}
          fill={`${accent}${i === 8 ? "90" : "28"}`}
          stroke={accent} strokeWidth="0.5" strokeOpacity="0.4" rx="2" />
      ))}
      {/* Alert line */}
      <line x1="30" y1="100" x2="340" y2="100"
        stroke={accent} strokeWidth="0.8" strokeDasharray="6 4" strokeOpacity="0.6" />
      <text x="344" y="103" fontSize="8" fill={accent} fillOpacity="0.6" fontFamily="monospace">SLA</text>
      {/* Pulse dot */}
      <circle cx="252" cy="194" r="4" fill={accent} opacity="0.9">
        <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="252" cy="194" r="4" fill={accent} />
      <text x="180" y="248" textAnchor="middle" fontSize="9" letterSpacing="3"
        fill={accent} fillOpacity="0.5" fontFamily="monospace">UPTIME MONITORING</text>
    </svg>
  );
}

function DataVisual({ accent, on }: { accent: string; on: boolean }) {
  const sources = [
    [50, 60], [50, 100], [50, 140], [50, 180],
    [310, 60], [310, 100], [310, 140], [310, 180],
  ];
  return (
    <svg viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: 360, opacity: on ? 1 : 0, transition: "opacity 1s ease 0.4s" }}>
      {/* Center warehouse */}
      <ellipse cx="180" cy="126" rx="48" ry="30"
        stroke={accent} strokeWidth="1.2" fill={`${accent}14`} />
      <text x="180" y="130" textAnchor="middle" fontSize="8.5" letterSpacing="1.5"
        fill={accent} fillOpacity="0.8" fontFamily="monospace">SNOWFLAKE</text>
      {/* Source nodes */}
      {sources.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 18} y={y - 10} width="36" height="20" rx="4"
            stroke={accent} strokeWidth="0.8" fill={`${accent}10`} strokeOpacity="0.5" />
          <line x1={x > 180 ? x - 18 : x + 18} y1={y}
            x2={x > 180 ? 228 : 132} y2={120 + (i % 4) * 4}
            stroke={accent} strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3 2" />
          <circle cx={x > 180 ? x - 18 : x + 18} cy={y} r="2"
            fill={accent} opacity="0.6" />
        </g>
      ))}
      {/* Flow arrows toward center */}
      <circle cx="180" cy="126" r="6" fill={accent} opacity="0.3">
        <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="180" y="248" textAnchor="middle" fontSize="9" letterSpacing="3"
        fill={accent} fillOpacity="0.5" fontFamily="monospace">UNIFIED DATA LAKEHOUSE</text>
    </svg>
  );
}

const PROJECT_VISUALS = [CloudVisual, SecurityVisual, CodeVisual, OpsVisual, DataVisual];

// ── Hooks ────────────────────────────────────────────────────────────────────

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
      ([entry]) => { if (entry.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold }
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
    if (Number.isNaN(raw)) { setDisplay(target); return; }
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const ease = 1 - Math.pow(1 - progress, 4);
      setDisplay(target.replace(/[0-9]+/, String(Math.round(raw * ease))));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [run, target, duration]);
  return display;
}

// ── Components ───────────────────────────────────────────────────────────────

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      overflow: "hidden", borderTop: "1px solid var(--border)",
      padding: "14px 0", background: "var(--ticker-bg)",
    }}>
      <div style={{
        display: "flex", gap: 56, whiteSpace: "nowrap",
        animation: "ticker 28s linear infinite", willChange: "transform",
      }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
            color: "var(--text-muted)", flexShrink: 0, fontFamily: "monospace",
          }}>
            {item}
            <span style={{ margin: "0 28px", opacity: 0.25 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function StatBlock({ stat, statUnit, kpiLabel, accent, on }: {
  stat: string; statUnit: string; kpiLabel: string; accent: string; on: boolean;
}) {
  const value = useCountUp(stat, on);
  return (
    <div style={{
      opacity: on ? 1 : 0,
      transform: on ? "translateY(0)" : "translateY(32px)",
      transition: "opacity 1s ease 0.6s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.6s",
    }}>
      <div style={{
        fontSize: "clamp(3rem,5.5vw,4.5rem)", lineHeight: 1,
        letterSpacing: "-0.04em", color: accent, fontFamily: "var(--font-bebas, 'Arial Narrow', sans-serif)",
        fontWeight: 400,
      }}>
        {value}
        <span style={{ fontSize: "0.5em", letterSpacing: 0 }}>{statUnit}</span>
      </div>
      <div style={{
        fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
        color: "var(--text-muted)", marginTop: 8, fontFamily: "monospace",
      }}>
        {kpiLabel}
      </div>
    </div>
  );
}

function ProjectSection({ project, index }: { project: Project; index: number }) {
  const { ref, on } = useReveal(0.1);
  const orbRef = useParallax(0.18);
  const watermarkRef = useParallax(0.08);
  const isEven = index % 2 === 0;
  const Visual = PROJECT_VISUALS[index];
  const d = (s: number) => `${s}s`;

  return (
    <section
      ref={ref}
      style={{
        position: "relative", minHeight: "88vh",
        display: "flex", alignItems: "center",
        overflow: "hidden", background: "var(--section-bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Background orb */}
      <div ref={orbRef} style={{
        position: "absolute",
        width: "min(55vw, 520px)", height: "min(55vw, 520px)",
        borderRadius: "50%",
        [isEven ? "right" : "left"]: "-10%", top: "5%",
        background: `radial-gradient(circle, ${project.accent}1c 0%, transparent 68%)`,
        pointerEvents: "none", filter: "blur(70px)",
      }} />

      {/* Year watermark */}
      <div ref={watermarkRef} style={{
        position: "absolute",
        [isEven ? "right" : "left"]: "2vw", top: "50%",
        transform: "translateY(-50%) rotate(90deg)",
        fontSize: "clamp(6rem,14vw,11rem)",
        color: project.accent,
        opacity: on ? 0.05 : 0,
        transition: "opacity 1.2s ease 0.8s",
        userSelect: "none", whiteSpace: "nowrap",
        letterSpacing: "0.06em", pointerEvents: "none",
        fontFamily: "var(--font-bebas, 'Arial Narrow', sans-serif)",
        fontWeight: 400,
      }}>
        {project.year}
      </div>

      {/* Main grid */}
      <div style={{
        position: "relative", zIndex: 2, width: "100%",
        maxWidth: 1240, margin: "0 auto",
        padding: "100px clamp(24px, 6vw, 80px)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "clamp(48px, 8vw, 100px)",
        alignItems: "center",
        direction: isEven ? "ltr" : "rtl",
      }}>

        {/* ── Left: Text ── */}
        <div style={{ direction: "ltr" }}>
          {/* Category */}
          <div style={{
            display: "flex", alignItems: "center", gap: 14,
            marginBottom: 28, overflow: "hidden",
          }}>
            <span style={{
              fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
              color: project.accent, fontFamily: "monospace",
              opacity: on ? 1 : 0,
              transform: on ? "translateX(0)" : "translateX(-16px)",
              transition: `opacity 0.6s ease ${d(0.1)}, transform 0.6s ease ${d(0.1)}`,
              whiteSpace: "nowrap",
            }}>
              {project.category}
            </span>
            <div style={{
              flex: 1, height: "0.5px",
              background: `linear-gradient(to right, ${project.accent}80, transparent)`,
              transformOrigin: "left",
              transform: on ? "scaleX(1)" : "scaleX(0)",
              transition: `transform 1s cubic-bezier(0.16,1,0.3,1) ${d(0.2)}`,
            }} />
          </div>

          {/* Name */}
          <h2 style={{
            fontSize: "clamp(2.8rem, 5.2vw, 4.6rem)",
            letterSpacing: "-0.03em", lineHeight: 1,
            color: "var(--text-primary)", margin: "0 0 10px",
            fontFamily: "var(--font-bebas, 'Arial Narrow', sans-serif)",
            fontWeight: 400,
            opacity: on ? 1 : 0,
            transform: on ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.9s ease ${d(0.15)}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d(0.15)}`,
          }}>
            {project.name}
          </h2>

          {/* Tagline */}
          <p style={{
            fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
            color: project.accent, letterSpacing: "0.04em",
            textTransform: "uppercase", margin: "0 0 28px",
            fontFamily: "monospace",
            opacity: on ? 1 : 0,
            transform: on ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.9s ease ${d(0.25)}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d(0.25)}`,
          }}>
            {project.tagline}
          </p>

          {/* Divider line */}
          <div style={{ marginBottom: 24 }}>
            <svg viewBox="0 0 500 2" style={{ width: "100%", maxWidth: 480, display: "block" }} fill="none">
              <line x1="0" y1="1" x2="500" y2="1"
                stroke={project.accent} strokeWidth="0.7"
                strokeDasharray="500" strokeDashoffset={on ? "0" : "500"}
                style={{ transition: `stroke-dashoffset 1.4s cubic-bezier(0.16,1,0.3,1) ${d(0.3)}` }} />
            </svg>
          </div>

          {/* Body */}
          <p style={{
            fontSize: "clamp(0.875rem, 1.3vw, 0.97rem)",
            lineHeight: 1.9, color: "var(--text-secondary)",
            maxWidth: 460, margin: "0 0 32px",
            opacity: on ? 1 : 0,
            transform: on ? "translateY(0)" : "translateY(16px)",
            transition: `opacity 0.9s ease ${d(0.35)}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d(0.35)}`,
          }}>
            {project.body}
          </p>

          {/* Chips */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 8,
            opacity: on ? 1 : 0,
            transform: on ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 0.9s ease ${d(0.45)}, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${d(0.45)}`,
          }}>
            {project.chips.map(chip => (
              <span key={chip} style={{
                fontSize: 10, letterSpacing: "0.12em",
                color: project.accent,
                border: `0.5px solid ${project.accent}50`,
                background: `${project.accent}0c`,
                borderRadius: 3, padding: "5px 12px",
                textTransform: "uppercase", fontFamily: "monospace",
              }}>
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: Visual + Stat ── */}
        <div style={{
          direction: "ltr",
          display: "flex", flexDirection: "column",
          alignItems: isEven ? "flex-end" : "flex-start",
          gap: 40,
        }}>
          {/* SVG Visual */}
          <div style={{
            width: "100%",
            border: `0.5px solid ${project.accent}28`,
            borderRadius: 12,
            background: `${project.accent}06`,
            padding: "24px 20px 8px",
            opacity: on ? 1 : 0,
            transform: on ? "translateY(0)" : "translateY(28px)",
            transition: `opacity 1s ease ${d(0.3)}, transform 1s cubic-bezier(0.16,1,0.3,1) ${d(0.3)}`,
          }}>
            <Visual accent={project.accent} on={on} />
          </div>

          {/* Stat + Index */}
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: isEven ? "flex-end" : "flex-start",
            gap: 28, width: "100%",
          }}>
            <StatBlock
              stat={project.stat} statUnit={project.statUnit}
              kpiLabel={project.kpiLabel} accent={project.accent} on={on}
            />
            <div style={{
              fontFamily: "var(--font-bebas, 'Arial Narrow', sans-serif)",
              fontSize: "clamp(5rem, 9vw, 8rem)", lineHeight: 1,
              letterSpacing: "-0.06em", color: project.accent,
              opacity: on ? 0.08 : 0,
              transform: on ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 1.2s ease ${d(0.2)}, transform 1.2s cubic-bezier(0.16,1,0.3,1) ${d(0.2)}`,
              userSelect: "none", fontWeight: 400,
            }}>
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Corner bracket */}
          <div style={{
            width: on ? 72 : 0, height: 72,
            borderTop: `0.5px solid ${project.accent}`,
            [isEven ? "borderRight" : "borderLeft"]: `0.5px solid ${project.accent}`,
            opacity: on ? 0.5 : 0,
            transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${d(0.5)}, opacity 0.6s ease ${d(0.5)}`,
            alignSelf: isEven ? "flex-end" : "flex-start",
          }} />
        </div>
      </div>

      {/* Bottom gradient line */}
      <div style={{
        position: "absolute", bottom: 0, left: "5vw", right: "5vw",
        height: "0.5px",
        background: `linear-gradient(to right, transparent, ${project.accent}38, transparent)`,
      }} />
    </section>
  );
}

function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${y * 0.4}px)`;
        contentRef.current.style.opacity = String(Math.max(0, 1 - y / 500));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ThemeHeroSection fullScreen align="center" contentClassName="relative !pb-0 justify-center mt-14">
      <div ref={contentRef} className="relative z-10 w-full px-6 pt-20" style={{ textAlign: "center" }}>
        <p className="hero-anim-2" style={{
          fontSize: 10, letterSpacing: "0.32em", color: "var(--accent-hero)",
          textTransform: "uppercase", marginBottom: 24, fontFamily: "monospace",
        }}>
          Eigensu — Selected Work
        </p>

        <h1 className="hero-anim-3 mt-14" style={{
          fontSize: "clamp(3.8rem, 9vw, 8.5rem)",
          letterSpacing: "0.02em", lineHeight: 0.95,
          color: "var(--text-primary)", margin: "0 0 24px",
          fontFamily: "var(--font-bebas, 'Arial Narrow', sans-serif)",
          fontWeight: 400,
        }}>
          Projects
          <br />
          <span style={{ color: "var(--accent-hero)" }}>&amp; Partnerships</span>
        </h1>

        <p className="hero-anim-4" style={{
          fontSize: "clamp(0.875rem, 1.6vw, 1rem)",
          color: "var(--text-secondary)",
          maxWidth: 480, margin: "0 auto 52px",
          lineHeight: 1.85, letterSpacing: "0.01em",
        }}>
          Enterprise-grade outcomes delivered at scale — cloud, security, software engineering, and managed services.
        </p>

        <div className="hero-anim-5" style={{
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: 20,
        }}>
          {["05 Projects", "03 Years", "14+ Clients"].map((item, i) => (
            <span key={item} style={{
              fontSize: 10, letterSpacing: "0.2em",
              color: "var(--text-muted)", textTransform: "uppercase",
              fontFamily: "monospace",
            }}>
              {item}
              {i < 2 && <span style={{ marginLeft: 20, opacity: 0.25 }}>·</span>}
            </span>
          ))}
        </div>

        <div className="hero-anim-5" style={{
          marginTop: 56, display: "flex",
          flexDirection: "column", alignItems: "center", gap: 10,
        }}>
          <svg width="18" height="36" viewBox="0 0 18 36" fill="none">
            <rect x="1" y="1" width="16" height="34" rx="8"
              stroke="var(--accent-hero)" strokeWidth="0.8" />
            <circle cx="9" cy="9" r="2.5" fill="var(--accent-hero)"
              style={{ animation: "scrollDot 2s ease infinite" }} />
          </svg>
        </div>
      </div>

      <Ticker />
    </ThemeHeroSection>
  );
}

export default function ProjectsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const t = getThemeTokens(theme);

  return (
    <div>
      <style>{`
        main *, main *::before, main *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        :root {
          --hero-bg: ${t.pageBg};
          --section-bg: ${t.contentBg};
          --ticker-bg: ${isDark ? "rgba(2,6,8,0.92)" : "rgba(255,250,240,0.92)"};
          --text-primary: ${t.heading};
          --text-secondary: ${t.body};
          --text-muted: ${t.muted};
          --border: ${t.border};
          --accent-hero: ${t.accent};
        }

        body { background: var(--section-bg); color: var(--text-primary); overflow-x: hidden; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: var(--accent-hero); border-radius: 2px; }

        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0); opacity: 1; }
          80%       { transform: translateY(14px); opacity: 0; }
        }

        @media (max-width: 768px) {
          [data-project-grid] {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
          }
        }
      `}</style>

      <main>
        <Hero />
        {PROJECTS.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </main>
    </div>
  );
}