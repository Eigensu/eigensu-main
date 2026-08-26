"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ThemeHeroSection } from "../components/ThemeHero";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

function Eyebrow({ children, muted = false }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase" as const, color: muted ? "var(--text-dim)" : "var(--accent)", marginBottom: 16 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: muted ? "var(--text-dim)" : "var(--accent)", boxShadow: muted ? "none" : "0 0 10px var(--accent)", flexShrink: 0 }} />
      {children}
    </div>
  );
}

function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setOn(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, on };
}

/* ── Dispatch Console Graphic ──────────────────────────────────────────────── */

function DispatchConsole() {
  const [tick, setTick] = useState(true);
  useEffect(() => { const id = setInterval(() => setTick(t => !t), 900); return () => clearInterval(id); }, []);
  const BARS = [55, 70, 48, 88, 62, 95, 71, 80];
  return (
    <div style={{ width: "100%", maxWidth: 600, background: "var(--bg-elev)", border: "1px solid var(--border-strong)", borderRadius: 14, overflow: "hidden", fontFamily: MONO, boxShadow: "0 32px 64px -24px rgba(0,0,0,0.8)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "var(--panel)" }}>
        {["var(--err)","var(--warn)","var(--ok)"].map(c => <span key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: c === "var(--err)" ? 0.8 : 0.4 }} />)}
        <span style={{ marginLeft: 8, fontSize: "0.7rem", color: "var(--text-dim)", letterSpacing: "1px" }}>dispatch — live</span>
      </div>
      <div style={{ padding: 18 }}>
        {[{ label: "orders_in_queue", val: "14", color: "var(--warn)" }, { label: "auto_routed_today", val: "1,986", color: "var(--ok)" }, { label: "exceptions", val: "2 pending", tag: true }].map(r => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: "1px solid var(--panel)" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>{r.label}</span>
            {r.tag ? <span style={{ fontFamily: MONO, fontSize: "0.66rem", padding: "3px 8px", borderRadius: 4, background: "rgba(240,73,31,0.12)", color: "var(--err)", border: "1px solid rgba(240,73,31,0.25)" }}>{r.val}</span>
            : <span style={{ fontSize: "0.76rem", fontWeight: 700, color: r.color }}>{r.val}</span>}
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 52, marginTop: 16, marginBottom: 12 }}>
          {BARS.map((h, i) => <div key={i} style={{ flex: 1, background: i === 5 ? "var(--accent)" : "var(--accent-line)", borderRadius: "3px 3px 0 0", height: `${h}%`, border: "1px solid var(--accent-line)", borderBottom: "none" }} />)}
        </div>
        <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", paddingTop: 10, borderTop: "1px solid var(--panel)" }}>
          <span style={{ color: "var(--accent)" }}>engine ▸</span> status: balanced
          <span style={{ marginLeft: 4, display: "inline-block", width: 6, height: 12, background: "var(--accent)", verticalAlign: "middle", opacity: tick ? 0.9 : 0, transition: "opacity .15s" }} />
        </div>
      </div>
    </div>
  );
}

/* ── Case Study Data ─────────────────────────────────────────────────────── */

const CASE_STUDIES = [
  {
    industry: "Logistics",
    client: "Northwind",
    title: "Zero-touch dispatch automation.",
    summary: "Northwind's dispatch desk was a bottleneck and a single point of failure. We modelled their routing rules, built an engine around them, and put humans back on exceptions only.",
    challenge: "6 full-time dispatchers were manually assigning 2,000+ daily orders to a fleet of 150 drivers. Rule complexity meant training took months, and surge days caused massive backlogs and SLA failures.",
    solution: "We engineered a self-balancing Node.js routing engine that ingests the order stream, calculates optimal drops based on live vehicle telemetry, and dispatches directly to driver mobile apps.",
    impact: { metric: "−71%", label: "reduction in manual routing hours, while scaling order volume by 2.5x." },
    tech: ["Node.js", "Redis", "PostgreSQL", "React Native", "WebSockets"],
    graphic: <DispatchConsole />
  },
  {
    industry: "Manufacturing",
    client: "Vertex",
    title: "Live inventory reconciliation.",
    summary: "Real-time stock synchronisation across four plants and three legacy ERP systems, eliminating the monthly variance scramble.",
    challenge: "Stock counts across 4 geographic sites were reconciled manually at month-end. Discrepancies led to halted production lines, emergency air-freight costs, and untrustworthy financial reporting.",
    solution: "We built an event-driven middleware layer that subscribes to physical scans and legacy ERP updates, standardising the data contract and broadcasting live state to a unified command centre.",
    impact: { metric: "99.4%", label: "inventory accuracy across all facilities with zero month-end downtime." },
    tech: ["Go", "Kafka", "GraphQL", "Next.js"],
    graphic: null
  },
  {
    industry: "Finance",
    client: "Atlas",
    title: "Algorithmic approval routing.",
    summary: "Policy-aware approval flows that route, escalate, and audit themselves — cutting the average cycle from days to minutes.",
    challenge: "Capital expenditure requests were trapped in endless email chains and generic SaaS workflows that couldn't handle Atlas's multi-layered, dynamic compliance rules across jurisdictions.",
    solution: "We delivered a custom rules engine. Employees submit requests via a clean internal portal; the engine evaluates the payload against financial policies and instantly pings the correct executive via Slack.",
    impact: { metric: "40m", label: "average approval cycle, down from a sprawling 8-day average." },
    tech: ["Python", "Temporal", "Slack API", "React"],
    graphic: null
  }
];

function CaseStudyCard({ data }: { data: typeof CASE_STUDIES[0] }) {
  const { ref, on } = useReveal();

  return (
    <article ref={ref} style={{ background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden", opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s", display: "flex", flexDirection: "column" }}>
      {data.graphic && (
        <div style={{ padding: "40px 20px", background: "linear-gradient(180deg, var(--panel), var(--bg-elev))", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "center" }}>
          {data.graphic}
        </div>
      )}
      
      <div style={{ padding: "clamp(24px, 4vw, 48px)" }}>
        {/* Header */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontFamily: MONO, fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--accent)" }}>{data.industry}</span>
          <span style={{ color: "var(--text-dim)" }}>/</span>
          <span style={{ fontFamily: MONO, fontSize: "0.75rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-dim)" }}>{data.client}</span>
        </div>
        <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.02em", color: "var(--text)", marginBottom: 16 }}>{data.title}</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "clamp(1rem, 1.4vw, 1.1rem)", lineHeight: 1.7, maxWidth: "65ch", marginBottom: 40 }}>{data.summary}</p>
        
        {/* Narrative Arc */}
        <div className="grid gap-8 md:grid-cols-3" style={{ paddingBottom: 40, borderBottom: "1px solid var(--border)", marginBottom: 40 }}>
          <div>
            <h4 style={{ fontFamily: MONO, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--err)", marginBottom: 12 }}>The Problem</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>{data.challenge}</p>
          </div>
          <div>
            <h4 style={{ fontFamily: MONO, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent)", marginBottom: 12 }}>The Solution</h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>{data.solution}</p>
          </div>
          <div>
            <h4 style={{ fontFamily: MONO, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--ok)", marginBottom: 12 }}>The Result</h4>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
               <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "2.8rem", letterSpacing: "-0.03em", color: "var(--text)", lineHeight: 1 }}>{data.impact.metric}</span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>{data.impact.label}</p>
          </div>
        </div>

        {/* Tech & CTA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
           <div>
             <h4 style={{ fontFamily: MONO, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-dim)", marginBottom: 12 }}>Technologies</h4>
             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
               {data.tech.map((t: string) => <span key={t} style={{ background: "var(--panel)", border: "1px solid var(--border-strong)", borderRadius: 6, padding: "6px 12px", fontFamily: MONO, fontSize: "0.75rem", color: "var(--text-muted)" }}>{t}</span>)}
             </div>
           </div>
           <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 24px", borderRadius: 100, background: "transparent", color: "var(--text)", border: "1px solid var(--border-strong)", textDecoration: "none" }}>Start a project like this →</Link>
        </div>
      </div>
    </article>
  );
}

/* ── Logos ────────────────────────────────────────────────────────────────── */

const CLIENTS = ["NORTHWIND","VERTEX","HELIOS","ATLAS","MERIDIAN","QUANTA","ORBIT","LUMEN","NEXUS","SOLACE"];

/* ── Main Page ───────────────────────────────────────────────────────────── */

export default function ProjectsPage() {
  const { ref: logosRef, on: logosOn } = useReveal();
  const { ref: ctaRef, on: ctaOn }     = useReveal();

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection>
        <Eyebrow muted>Projects // case studies</Eyebrow>
        <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--text)", maxWidth: "15ch", margin: "0 0 20px" }}>
          Systems quietly <span style={{ color: "var(--accent)" }}>doing the work</span> right now.
        </h1>
        <p className="hero-anim-4" style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "50ch", lineHeight: 1.7 }}>
          We don&apos;t just string APIs together. We architect robust software engines that solve complex operational bottlenecks. Here is proof.
        </p>
      </ThemeHeroSection>

      {/* ── Premium Case Studies Stack ── */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px, 6vw, 64px)" }}>
            {CASE_STUDIES.map((study, i) => (
              <CaseStudyCard key={i} data={study} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Logos ── */}
      <section className="relative z-10 py-12 md:py-16" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ marginBottom: 36 }}>
            <Eyebrow>Clients</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.8rem,3vw,2.4rem)", letterSpacing: "-0.02em", color: "var(--text)", margin: 0 }}>Teams that trust the machinery.</h2>
          </div>
          <div ref={logosRef} className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" style={{ opacity: logosOn ? 1 : 0, transition: "opacity .7s" }}>
            {CLIENTS.map((c, i) => (
              <div key={c} style={{ border: "1px solid var(--border)", borderRadius: 9, padding: "16px 10px", textAlign: "center", fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "2px", color: "var(--text-dim)", opacity: logosOn ? 1 : 0, transition: `opacity .6s ${i * 0.05}s` }}>{c}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 py-12 md:py-16">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div ref={ctaRef} style={{ position: "relative", textAlign: "center", border: "1px solid var(--border)", borderRadius: 20, padding: "clamp(48px,8vw,80px) clamp(24px,4vw,48px)", overflow: "hidden", background: "var(--bg-elev)", opacity: ctaOn ? 1 : 0, transform: ctaOn ? "translateY(0)" : "translateY(20px)", transition: "opacity .7s, transform .7s" }}>
            <div style={{ position: "absolute", width: 380, height: 260, background: "var(--accent)", filter: "blur(100px)", opacity: 0.17, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--text)", maxWidth: "22ch", margin: "0 auto 28px" }}>Your project could be the next one on this page.</h2>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, background: "var(--accent)", color: "var(--on-accent)", boxShadow: "0 0 0 1px var(--accent-line), 0 8px 28px -8px var(--accent)", textDecoration: "none" }}>Onboard a project</Link>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, color: "var(--text)", border: "1px solid var(--border-strong)", textDecoration: "none" }}>Book a call</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
