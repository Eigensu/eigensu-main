"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";
import { CheckCircle2, Clock, Eye, TrendingUp, Zap, Shield, Database, Terminal } from "lucide-react";

// ─── Font shorthand ───────────────────────────────────────────────────────────
const HEAD = "var(--font-head), 'Sora', sans-serif";
const BODY = "var(--font-body), 'Hanken Grotesk', sans-serif";
const MONO = "var(--font-mono), 'JetBrains Mono', monospace";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function delay(ms: number) { return new Promise<void>(r => setTimeout(r, ms)); }

function useReveal(threshold = 0.1) {
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

// ─── SectionTag ──────────────────────────────────────────────────────────────
function SectionTag({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: MONO, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>
      {children}
    </p>
  );
}

// ─── Static data ─────────────────────────────────────────────────────────────

const WA_MSGS = [
  { dir: "out" as const, text: "Hi Priya! Hope you enjoyed your visit to Spice Bistro last week 🙏", time: "11:45" },
  { dir: "in"  as const, text: "It was amazing! The biryani was incredible.", time: "11:46" },
  { dir: "out" as const, text: "So glad! 😊 We have an exclusive 20% off just for you this weekend.", time: "11:46" },
  { dir: "in"  as const, text: "Oh wow! Count me in. Can I book for Saturday?", time: "11:47" },
  { dir: "out" as const, text: "Absolutely! Reserve here ➤ spicebistro.com/book", time: "11:48" },
];

const MODULES = [
  { icon: "🔐", title: "Identity & Access",          sub: "JWT · RBAC · Multi-restaurant",          features: ["Secure multi-tenant access", "Granular roles per restaurant", "Centralized user governance"] },
  { icon: "📣", title: "Campaign Engine",             sub: "WhatsApp · Email · SMS",                 features: ["Guided 5-step campaign wizard", "Precision scheduling and tracking", "Granular failure analysis"] },
  { icon: "📝", title: "Template Studio",             sub: "Meta sync · HTML editor",                features: ["WhatsApp Meta API sync", "Dynamic variable personalization", "Full template versioning"] },
  { icon: "👥", title: "Guest Intelligence",          sub: "Members · Dormancy · Import",            features: ["Automated dormancy tiering", "Omnichannel guest ingestion", "Custom loyalty tracking"] },
  { icon: "💬", title: "Inbox & Conversations",       sub: "2-way WhatsApp · Resolve",              features: ["Unified inbox thread views", "Live unread count tracking", "Resolution workflow states"] },
  { icon: "📊", title: "Reports & Analytics",         sub: "Campaigns · Billing · Exports",          features: ["Granular delivery logs", "Cost tracking by category", "Data export capabilities"] },
];

const PAIN_ITEMS = [
  { icon: "📋", text: "Guest contacts scattered across reservation systems, NFC cards, loyalty sheets, and WhatsApp lists — creating a fragmented view." },
  { icon: "📵", text: "Inability to run targeted campaigns without developer help or using generic broadcast tools that lack restaurant-specific logic." },
  { icon: "💬", text: "Campaign replies landing on personal WhatsApp numbers — remaining untracked, unanswered, and invisible to the broader team." },
  { icon: "📉", text: "Zero visibility into which campaigns actually drive repeat visits — leaving marketing spend entirely unmeasured and unaccountable." },
];

const DORMANCY_TIERS = [
  { key: "ACTIVE",  desc: "Visited recently · Healthy engagement",         badge: "Retain",      color: "var(--ok)",   bg: "rgba(56,232,176,0.08)",  borderColor: "rgba(56,232,176,0.25)"  },
  { key: "AT_RISK", desc: "Hasn't returned in a while · Needs a nudge",    badge: "Winback now", color: "var(--warn)", bg: "rgba(255,178,36,0.08)",  borderColor: "rgba(255,178,36,0.25)"  },
  { key: "DORMANT", desc: "Slipping away · Winback window closing",         badge: "Urgent",      color: "var(--err)",  bg: "rgba(255,107,107,0.08)", borderColor: "rgba(255,107,107,0.25)" },
  { key: "LOST",    desc: "Not seen in months · Re-acquisition needed",     badge: "Re-acquire",  color: "#e05c4b",     bg: "rgba(192,57,43,0.08)",   borderColor: "rgba(192,57,43,0.25)"   },
];

const VERTICALS = [
  { icon: "🍽️", name: "Fine Dining & Casual",  live: true,  uses: "Execute birthday campaigns, anniversary winbacks, VIP tier communication, post-visit follow-ups, and exclusive event announcements seamlessly." },
  { icon: "🍕", name: "QSR & Fast Food Chains", live: false, uses: "Deploy location-based offers, franchise-level member sync, loyalty point reminders, and automated weekend combo blasts at scale." },
  { icon: "🏨", name: "Hotel F&B Outlets",       live: false, uses: "Drive in-hotel guest upsells, room-service promotions, post-checkout feedback requests, and maintain persistent multi-venue guest profiles." },
];

const TECH_HIGHLIGHTS = [
  { icon: <Shield size={20} />, title: "Multi-Tenant Architecture", desc: "Strict data isolation between restaurant groups using row-level security and centralized access controls." },
  { icon: <Zap size={20} />, title: "High-Throughput Messaging", desc: "Built to handle thousands of concurrent messages via direct integrations with the WhatsApp Business Cloud API and Resend." },
  { icon: <Database size={20} />, title: "Real-Time Data Layer", desc: "Instant sync across all connected devices and dispatch panels using optimized Redis caching and background worker queues." },
  { icon: <Terminal size={20} />, title: "Developer API Access", desc: "Extensible core ready for bespoke POS integrations, custom webhooks, and raw data extraction." }
];

const BUSINESS_BENEFITS = [
  { icon: <Clock size={24} />, title: "Time Saved", desc: "Automate entire retention workflows. Stop manually exporting contacts and piecing together spreadsheets for basic campaigns." },
  { icon: <Eye size={24} />, title: "Better Visibility", desc: "Unify your guest view. See every visit, message, reply, and loyalty tier in one cohesive profile instantly." },
  { icon: <TrendingUp size={24} />, title: "Faster Operations", desc: "Empower front-of-house staff to trigger communications without waiting on external marketing agencies." },
  { icon: <CheckCircle2 size={24} />, title: "Measurable ROI", desc: "Tie every message sent directly to a guest return rate. Prove the exact revenue impact of your campaigns." }
];

const TECH_STACKS = [
  { layer: "Frontend",        items: ["Next.js 15 App Router", "React Server Components", "Tailwind CSS v4", "Radix UI Primitives"] },
  { layer: "Backend",         items: ["Node.js Microservices", "PostgreSQL (Supabase)", "Row-Level Security", "BullMQ Worker Queues"] },
  { layer: "Messaging",       items: ["WhatsApp Cloud API", "Resend API (Email)", "Twilio (SMS Hook)", "Reliable Retry Layers"] },
  { layer: "Infrastructure",  items: ["Vercel Edge Network", "Render (Workers)", "Supabase Analytics", "Upstash Redis Cache"] },
];

// ─── WhatsApp phone demo ──────────────────────────────────────────────────────
function PhoneDemo() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);
  const [counts, setCounts] = useState({ delivered: 324, read: 228, sent: 487, failed: 12 });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await delay(1200);
      for (let i = 0; i < WA_MSGS.length; i++) {
        if (cancelled) return;
        setTyping(true);
        await delay(900);
        if (cancelled) return;
        setTyping(false);
        setVisible(v => v + 1);
        if (i % 2 === 0) setCounts(c => ({ ...c, delivered: c.delivered + 18 + i * 3, read: c.read + 12 + i * 2, sent: c.sent + 22 + i * 4 }));
        await delay(1400);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <div style={{ width: 300, background: "#ECE5DD", borderRadius: 32, padding: "20px 14px 24px", boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.25)" }}>
        <div style={{ background: "#075E54", margin: "-20px -14px 0", borderRadius: "18px 18px 0 0", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "var(--on-accent)", fontFamily: BODY, flexShrink: 0 }}>SB</div>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff", fontFamily: BODY }}>Spice Bistro</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", fontFamily: BODY }}>Campaign sending…</div>
          </div>
        </div>
        <div style={{ padding: "14px 4px", display: "flex", flexDirection: "column", gap: 8, minHeight: 300 }}>
          {WA_MSGS.slice(0, visible).map((msg, i) => (
            <div key={i} style={{ maxWidth: "85%", padding: "9px 13px", borderRadius: 8, fontSize: "0.8rem", lineHeight: 1.5, fontFamily: BODY, background: msg.dir === "out" ? "#DCF8C6" : "#fff", color: "#111", alignSelf: msg.dir === "out" ? "flex-end" : "flex-start", animation: "rgBubble 0.35s ease forwards" }}>
              {msg.text}
              <div style={{ fontSize: "0.65rem", color: "#888", marginTop: 3, textAlign: "right" }}>
                {msg.time}{msg.dir === "out" && <span style={{ color: "#53bdeb", marginLeft: 3 }}>✓✓</span>}
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ background: "#fff", borderRadius: 8, padding: "10px 14px", display: "inline-flex", gap: 4, alignItems: "center", alignSelf: "flex-start" }}>
              {[0, 200, 400].map((d, i) => (
                <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#aaa", animation: `rgBounce 1.2s ${d}ms infinite` }} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ marginTop: "1rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[{ num: counts.delivered, label: "Delivered" }, { num: counts.read, label: "Read" }, { num: counts.sent, label: "Sent" }, { num: counts.failed, label: "Failed" }].map(item => (
          <div key={item.label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: HEAD, fontSize: "1.4rem", color: "#fff", lineHeight: 1 }}>{item.num.toLocaleString()}</div>
            <div style={{ fontFamily: BODY, fontSize: "0.68rem", color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{item.label}</div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes rgBubble { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes rgBounce { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-5px); } }
      `}</style>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DispatchPage() {
  useTheme(); // keep theme context alive
  const { ref: heroRef, on: heroOn } = useReveal(0.05);

  // Surface palette
  const bg0 = "var(--bg)";
  const bg1 = "var(--bg-elev)";
  const bg2 = "var(--bg-elev-2)";
  const bg3 = "var(--bg-elev-3)";

  // Shared style objects
  const sp: React.CSSProperties = { padding: "80px 5%", transition: "background 0.65s ease" };
  const ctr: React.CSSProperties = { maxWidth: 1160, margin: "0 auto" };
  const h2: React.CSSProperties  = { fontFamily: HEAD, fontSize: "clamp(2rem, 3.5vw, 2.8rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--text)" };
  const bd: React.CSSProperties  = { fontFamily: BODY, color: "var(--text-muted)", lineHeight: 1.7 };

  return (
    <div className="min-h-screen" style={{ transition: "background 0.65s ease" }}>

      {/* ── 1. Hero ── */}
      <ThemeHeroSection contentClassName="mx-auto w-full max-w-6xl px-6 !pt-[calc(var(--page-offset-top)+0.5rem)]">
        <div ref={heroRef} className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 py-8 pb-16">
          <div style={{ maxWidth: 560 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", fontFamily: BODY, marginBottom: "1.5rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
              DishPatch — SaaS Platform
            </div>

            <h1 style={{ fontFamily: HEAD, fontSize: "clamp(2.6rem, 5vw, 3.8rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", marginBottom: "1.25rem", opacity: heroOn ? 1 : 0, transform: heroOn ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
              Automate guest retention at{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>enterprise scale</em>.
            </h1>

            <p style={{ ...bd, fontSize: "1.1rem", color: "rgba(255,255,255,0.68)", marginBottom: "2.25rem", maxWidth: 480, opacity: heroOn ? 1 : 0, transition: "opacity 0.9s ease 0.2s" }}>
              One unified platform for restaurants to execute omnichannel campaigns, centralize their guest database, monitor replies, and prove ROI — all seamlessly integrated.
            </p>

            <div className="flex flex-wrap gap-4" style={{ marginBottom: "2.5rem", opacity: heroOn ? 1 : 0, transition: "opacity 0.9s ease 0.3s" }}>
              <a href="#cta" style={{ background: "var(--accent)", color: "var(--on-accent)", padding: "0.8rem 2rem", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", fontFamily: BODY }}>Book a Demo</a>
              <a href="#features" style={{ background: "transparent", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.3)", padding: "0.8rem 2rem", borderRadius: 8, fontSize: "0.95rem", fontWeight: 500, textDecoration: "none", fontFamily: BODY }}>Explore Platform</a>
            </div>

            <div className="flex flex-wrap gap-10" style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.12)", opacity: heroOn ? 1 : 0, transition: "opacity 0.9s ease 0.4s" }}>
              {[{ num: "9", label: "Integrated modules" }, { num: "3", label: "Delivery Channels" }, { num: "99.9%", label: "Uptime SLA" }].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: HEAD, fontSize: "2rem", color: "#fff", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: BODY, fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <PhoneDemo />
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── 2. Problem ── */}
      <section id="problem" style={{ ...sp, background: bg1 }}>
        <div style={ctr}>
          <SectionTag>The Problem</SectionTag>
          <h2 style={h2}>Fragmented data creates operational blind spots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {PAIN_ITEMS.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.85rem", padding: "1.5rem", background: bg0, border: "1px solid var(--border)", borderRadius: 12 }}>
                <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                <span style={{ ...bd, fontSize: "0.95rem" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Solution ── */}
      <section id="solution" style={{ ...sp, background: bg2 }}>
        <div style={ctr}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div>
              <SectionTag>The Solution</SectionTag>
              <h2 style={h2}>Know who&apos;s slipping away — before they&apos;re gone</h2>
              <p style={{ ...bd, marginTop: "0.75rem", marginBottom: "1.5rem" }}>Every member is automatically classified into a dormancy tier by a background job. No manual tagging. No spreadsheet updates. Just real-time guest health, always current.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {DORMANCY_TIERS.map((tier, i) => (
                  <div key={i} style={{ borderRadius: 10, padding: "1rem 1.25rem", background: tier.bg, border: `1px solid ${tier.borderColor}`, display: "flex", alignItems: "center", justifyItems: "flex-start", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", color: tier.color }}>{tier.key}</div>
                      <div style={{ ...bd, fontSize: "0.82rem", marginTop: 2 }}>{tier.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: bg0, borderRadius: 16, padding: "2.5rem", border: "1px solid var(--border)" }}>
                <div style={{ marginBottom: "2rem" }}>
                  <h3 style={{ fontFamily: HEAD, fontSize: "1.4rem", color: "var(--text)", marginBottom: "0.5rem" }}>Centralized Ingestion</h3>
                  <p style={{ ...bd, fontSize: "0.9rem" }}>Members flow into one clean profile from five distinct sources. Ready for campaigns instantly.</p>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: "📱", title: "NFC Loyalty Cards" },
                    { icon: "📊", title: "Excel / CSV Bulk Import" },
                    { icon: "📅", title: "ReserveGo Integration" },
                    { icon: "🔗", title: "External API Connectors" }
                  ].map((src, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: bg1, border: "1px solid var(--border)" }}>
                      <span className="text-xl">{src.icon}</span>
                      <span style={{ fontFamily: BODY, fontSize: "0.9rem", fontWeight: 600, color: "var(--text)" }}>{src.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Key Features ── */}
      <section id="features" style={{ ...sp, background: bg0 }}>
        <div style={ctr}>
          <SectionTag>Platform Features</SectionTag>
          <h2 style={h2}>Nine integrated modules. One data layer.</h2>
          <p style={{ ...bd, marginTop: "0.75rem", maxWidth: 600, marginBottom: "3rem" }}>Every module was built specifically for the F&B vertical to maximize operational leverage without context switching.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map((mod, i) => (
              <div key={i} style={{ background: bg1, border: "1px solid var(--border)", borderRadius: 14, padding: "1.75rem 1.5rem", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>{mod.icon}</div>
                <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", marginBottom: "0.25rem" }}>{mod.title}</div>
                <div style={{ fontFamily: MONO, fontSize: "0.72rem", color: "var(--accent)", marginBottom: "1.2rem", letterSpacing: "0.08em" }}>{mod.sub}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", flexGrow: 1 }}>
                  {mod.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", gap: "0.6rem", ...bd, fontSize: "0.85rem", alignItems: "baseline" }}>
                      <span style={{ color: "var(--accent)", fontSize: "0.75rem", flexShrink: 0 }}>→</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Technical Highlights ── */}
      <section id="tech-highlights" style={{ ...sp, background: bg3 }}>
        <div style={ctr}>
          <SectionTag>Architecture</SectionTag>
          <h2 style={h2}>Enterprise-grade infrastructure</h2>
          <p style={{ ...bd, marginTop: "0.75rem", marginBottom: "3rem", maxWidth: 600 }}>We built DishPatch to sustain high message throughput and strict multi-tenant data isolation.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TECH_HIGHLIGHTS.map((highlight, i) => (
              <div key={i} style={{ display: "flex", gap: "1.25rem", background: bg0, border: "1px solid var(--border)", borderRadius: 12, padding: "2rem" }}>
                <div style={{ color: "var(--accent)", padding: "0.5rem", background: "var(--accent-soft)", borderRadius: "8px", height: "fit-content" }}>
                  {highlight.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: BODY, fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>{highlight.title}</h3>
                  <p style={{ ...bd, fontSize: "0.9rem", lineHeight: 1.6 }}>{highlight.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Business Benefits ── */}
      <section id="benefits" style={{ ...sp, background: bg1 }}>
        <div style={ctr}>
          <SectionTag>Business Impact</SectionTag>
          <h2 style={h2}>Measurable outcomes, day one</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {BUSINESS_BENEFITS.map((benefit, i) => (
              <div key={i} style={{ padding: "1.5rem", background: bg2, borderRadius: 12, border: "1px solid var(--border)" }}>
                <div style={{ color: "var(--accent)", marginBottom: "1.25rem" }}>{benefit.icon}</div>
                <h3 style={{ fontFamily: BODY, fontSize: "1.05rem", fontWeight: 700, color: "var(--text)", marginBottom: "0.5rem" }}>{benefit.title}</h3>
                <p style={{ ...bd, fontSize: "0.85rem", lineHeight: 1.6 }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Technologies ── */}
      <section id="technologies" style={{ ...sp, background: bg0 }}>
        <div style={ctr}>
          <SectionTag>Core Stack</SectionTag>
          <h2 style={{ ...h2, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", marginBottom: "2.5rem" }}>Powered by modern primitives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TECH_STACKS.map((stack, i) => (
              <div key={i} style={{ background: bg1, border: "1px solid var(--border)", borderRadius: 10, padding: "1.5rem" }}>
                <div style={{ fontFamily: MONO, fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>{stack.layer}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {stack.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", gap: "0.5rem", ...bd, fontSize: "0.82rem", alignItems: "center" }}>
                      <span style={{ width: 4, height: 4, background: "var(--border)", borderRadius: "50%", flexShrink: 0 }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Proof / Use Cases ── */}
      <section id="use-cases" style={{ ...sp, background: bg2 }}>
        <div style={ctr}>
          <SectionTag>Use Cases</SectionTag>
          <h2 style={h2}>Built for F&B workflows</h2>
          <p style={{ ...bd, marginTop: "0.75rem", marginBottom: "3rem" }}>Whether you operate a single flagship location or a sprawling franchise network.</p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {VERTICALS.map((v, i) => (
              <div key={i} style={{ border: v.live ? "1px solid var(--accent)" : "1px solid var(--border)", borderRadius: 14, padding: "2rem", background: v.live ? "var(--accent-soft)" : bg1 }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{v.icon}</div>
                <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: "1.1rem", color: "var(--text)", marginBottom: "0.75rem" }}>
                  {v.name}
                </div>
                <p style={{ ...bd, fontSize: "0.9rem", lineHeight: 1.6 }}>{v.uses}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Contextual CTA ── */}
      <section id="cta" style={{ ...sp, background: bg0, textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Glow effect */}
        <div style={{ position: "absolute", width: 600, height: 600, background: "var(--accent)", filter: "blur(120px)", opacity: 0.08, top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 0, pointerEvents: "none" }} />
        
        <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "4rem 0" }}>
          <SectionTag>Take Control</SectionTag>
          <h2 style={{ ...h2, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>Ready to deploy enterprise guest retention?</h2>
          <p style={{ ...bd, fontSize: "1.05rem", maxWidth: 560, margin: "0 auto 2.5rem" }}>
            Schedule a discovery call with our engineering team to see a live demonstration of DishPatch tailored to your restaurant group.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact" style={{ background: "var(--accent)", color: "var(--on-accent)", padding: "0.9rem 2.25rem", borderRadius: 8, fontSize: "1rem", fontWeight: 600, textDecoration: "none", fontFamily: BODY }}>Schedule Discovery Call</a>
          </div>
        </div>
      </section>

    </div>
  );
}
