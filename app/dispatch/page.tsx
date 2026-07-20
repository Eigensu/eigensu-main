"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../components/PageShell";
import { ThemeHeroSection } from "../components/ThemeHero";
import { getThemeTokens } from "../lib/themeTokens";

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
  { icon: "🔐", title: "Identity & Access",          sub: "JWT · RBAC · Multi-restaurant",          features: ["JWT access + refresh tokens (30-min / 7-day)", "Viewer / Admin / Super-admin roles per restaurant", "Multi-outlet restaurant selector", "Super admin user governance panel"] },
  { icon: "📣", title: "Campaign Engine",             sub: "WhatsApp · Email · SMS",                 features: ["5-step guided campaign wizard", "Schedule, pause, cancel mid-flight", "Per-message delivery logs", "Failure analysis + one-click retry"] },
  { icon: "📝", title: "Template Studio",             sub: "Meta sync · HTML editor",                features: ["WhatsApp template browser + Meta sync", "HTML email editor with live preview", "Dynamic variable management + fallbacks", "Template versioning + audit trail"] },
  { icon: "👥", title: "Guest Intelligence",          sub: "Members · Dormancy · Import",            features: ["ACTIVE → AT_RISK → DORMANT → LOST auto-tiers", "NFC, e-card, Excel, external DB import", "Member-to-contact bridge for campaigns", "Custom loyalty categories per restaurant"] },
  { icon: "📋", title: "Contact Management",          sub: "Upload · Validate · Suppress",           features: ["CSV/XLSX upload with validation", "Phone number normalisation + deduplication", "Global suppression list enforcement", "File caching + reuse across campaigns"] },
  { icon: "💬", title: "Inbox & Conversations",       sub: "2-way WhatsApp · Resolve",              features: ["Full inbound conversation threads", "Real-time unread count badge", "Manual reply without WhatsApp Web", "Mark as Resolved workflow"] },
  { icon: "🍽️", title: "Reservation Intelligence",   sub: "ReserveGo · Revenue · Analytics",        features: ["Guest profiles: birthday, anniversary, spend", "Booking history: pax, section, revenue", "Visit frequency + source breakdown", "RFM-ready data for campaign targeting"] },
  { icon: "📊", title: "Reports & Analytics",         sub: "Campaigns · Billing · Exports",          features: ["Campaign, member, inbox, billing tabs", "Searchable per-message delivery log", "WhatsApp Meta API cost by category", "CSV/XLSX export on all reports"] },
  { icon: "⚙️", title: "Settings & Admin",            sub: "WABA config · User governance",          features: ["Multiple WABA phones per restaurant", "Suppression list management", "User access governance + reports", "Alert email and system config"] },
];

const PAIN_ITEMS = [
  { icon: "📋", text: "Guest contacts scattered across reservation systems, NFC cards, loyalty sheets, and WhatsApp lists — no unified view" },
  { icon: "📵", text: "No way to run targeted campaigns without developer help or generic broadcast tools that ignore the restaurant context" },
  { icon: "💬", text: "Campaign replies land on a personal WhatsApp number — missed, untracked, unanswered, and invisible to the team" },
  { icon: "📉", text: "Zero data on which campaigns drive repeat visits — no delivery proof, no ROI, no justification for the marketing budget" },
];

const DORMANCY_TIERS = [
  { key: "ACTIVE",  desc: "Visited recently · Healthy engagement",         badge: "Retain",      color: "var(--ok)",   bg: "rgba(56,232,176,0.08)",  borderColor: "rgba(56,232,176,0.25)"  },
  { key: "AT_RISK", desc: "Hasn't returned in a while · Needs a nudge",    badge: "Winback now", color: "var(--warn)", bg: "rgba(255,178,36,0.08)",  borderColor: "rgba(255,178,36,0.25)"  },
  { key: "DORMANT", desc: "Slipping away · Winback window closing",         badge: "Urgent",      color: "var(--err)",  bg: "rgba(255,107,107,0.08)", borderColor: "rgba(255,107,107,0.25)" },
  { key: "LOST",    desc: "Not seen in months · Re-acquisition needed",     badge: "Re-acquire",  color: "#e05c4b",     bg: "rgba(192,57,43,0.08)",   borderColor: "rgba(192,57,43,0.25)"   },
];

const INGESTION_SOURCES = [
  { icon: "📱", text: "NFC Loyalty Cards",       sub: "Physical card tap at the table" },
  { icon: "💳", text: "E-Card Programs",          sub: "Digital loyalty enrollment" },
  { icon: "📊", text: "Excel / CSV Bulk Import",  sub: "Migrate existing guest lists instantly" },
  { icon: "📅", text: "ReserveGo Integration",    sub: "Visit count, spend & booking history" },
  { icon: "🔗", text: "External Databases",       sub: "Fielia + custom API connectors" },
];

const WA_FEATURES = [
  "5-step guided campaign wizard",
  "Template browser with Meta sync (one-click)",
  "Schedule campaigns for a future date and time",
  "Marketing vs. Utility category tagging for Meta billing",
  "Per-message delivery logs — sent, delivered, read, failed",
  "Failure analysis by reason category",
  "One-click retry for all failed numbers",
  "Export failed numbers as CSV",
  "Test message before mass send",
  "Unsubscribe toggle for GDPR / opt-out compliance",
  "Campaign pause / cancel mid-flight",
];

const EMAIL_FEATURES = [
  "HTML template editor with live preview",
  "Dynamic variable personalisation with fallbacks",
  "Resend API template sync for existing templates",
  "Full deliverability tracking — sent, delivered, opened, clicked, bounced",
  "Auto-suppression on bounce or complaint",
  "Cancel in-progress campaigns",
  "Template versioning + audit trail",
  "Export failed contacts as CSV",
];

const COMP_ROWS: { feature: string; reguest: boolean | "partial"; mailchimp: boolean | "partial"; zomato: boolean | "partial"; loyaltyp: boolean | "partial" }[] = [
  { feature: "WhatsApp campaigns",            reguest: true,  mailchimp: false,     zomato: "partial", loyaltyp: false     },
  { feature: "Guest dormancy tiers",          reguest: true,  mailchimp: false,     zomato: false,     loyaltyp: "partial" },
  { feature: "2-way inbox",                   reguest: true,  mailchimp: false,     zomato: false,     loyaltyp: false     },
  { feature: "Delivery receipts per message", reguest: true,  mailchimp: "partial", zomato: false,     loyaltyp: false     },
  { feature: "Multi-outlet support",          reguest: true,  mailchimp: "partial", zomato: false,     loyaltyp: true      },
  { feature: "Reservation data integration",  reguest: true,  mailchimp: false,     zomato: true,      loyaltyp: false     },
  { feature: "Email + WhatsApp unified",      reguest: true,  mailchimp: true,      zomato: false,     loyaltyp: false     },
  { feature: "Restaurant-native",             reguest: true,  mailchimp: false,     zomato: "partial", loyaltyp: "partial" },
];

const REPORT_CARDS = [
  { tag: "Campaign",     title: "Delivery & Engagement",  desc: "Per-campaign sent, delivered, read, replied. Searchable message-level logs with failure categorisation." },
  { tag: "Members",      title: "Guest Health Score",     desc: "Dormancy tier breakdown, churn velocity, new vs returning members over time." },
  { tag: "Inbox",        title: "Reply Analytics",        desc: "Response rate, resolution time, staff-reply breakdown and conversation tagging." },
  { tag: "Billing",      title: "Meta Cost Tracker",      desc: "WhatsApp template costs by category (marketing vs utility), monthly trend, per-campaign spend." },
  { tag: "Reservations", title: "Visit & Revenue Data",   desc: "Booking count, revenue per visit, section popularity, pax trends — all per outlet." },
  { tag: "Exports",      title: "Full Data Access",       desc: "CSV/XLSX export on every table. Scheduled email reports. API access on Growth tier." },
];

const FUNNEL_ROWS = [
  { label: "Sent",      val: 45941, pct: 100  },
  { label: "Delivered", val: 33700, pct: 73.3 },
  { label: "Read",      val: 23100, pct: 50.3 },
  { label: "Replied",   val: 8513,  pct: 18.5 },
];

const PLANS = [
  {
    name: "Starter", desc: "Single outlet, up to 2,000 members",
    monthly: "₹4,999", annual: "₹3,999", freq: "/month", annualNote: "billed annually",
    featured: false,
    features: [
      { has: true,  text: "WhatsApp campaigns (Meta cost pass-through)" },
      { has: true,  text: "Email campaigns (up to 5,000 / mo)" },
      { has: true,  text: "Guest intelligence — dormancy tiers" },
      { has: true,  text: "Inbox — inbound replies" },
      { has: true,  text: "Basic reports" },
      { has: false, text: "Multi-outlet support" },
      { has: false, text: "API access" },
      { has: false, text: "Custom loyalty categories" },
    ],
  },
  {
    name: "Growth", desc: "Up to 3 outlets, up to 10,000 members",
    monthly: "₹12,999", annual: "₹10,399", freq: "/month", annualNote: "billed annually",
    featured: true,
    features: [
      { has: true,  text: "Everything in Starter" },
      { has: true,  text: "Email campaigns (up to 25,000 / mo)" },
      { has: true,  text: "Multi-outlet support (up to 3)" },
      { has: true,  text: "Custom loyalty categories" },
      { has: true,  text: "Full reports + CSV export" },
      { has: true,  text: "Reservation intelligence" },
      { has: true,  text: "Priority support" },
      { has: false, text: "API access" },
    ],
  },
  {
    name: "Enterprise", desc: "Unlimited outlets, custom member limits",
    monthly: "Custom", annual: "Custom", freq: "", annualNote: "Talk to us for enterprise pricing",
    featured: false,
    features: [
      { has: true, text: "Everything in Growth" },
      { has: true, text: "Unlimited outlets" },
      { has: true, text: "Unlimited email volume" },
      { has: true, text: "API access + webhooks" },
      { has: true, text: "Dedicated account manager" },
      { has: true, text: "Custom integrations" },
      { has: true, text: "SLA guarantee" },
      { has: true, text: "White-label options" },
    ],
  },
];

const ADDONS = [
  { name: "SMS Channel",    price: "₹2,999/mo",       desc: "Add SMS to any plan" },
  { name: "Extra Outlet",   price: "₹1,999/mo",       desc: "Add one outlet to Starter" },
  { name: "NFC Cards (50)", price: "₹4,999 one-time", desc: "Includes activation" },
  { name: "Onboarding",     price: "₹9,999 one-time", desc: "Done-for-you setup" },
];

const ROADMAP = [
  {
    phase: "Now — Live",
    items: ["WhatsApp bulk campaigns", "Email campaigns (Resend API)", "Guest intelligence + dormancy tiers", "2-way inbox + manual reply", "Campaign delivery receipts per message", "9-module platform", "Multi-outlet selector", "Reports: campaign, member, inbox, billing"],
  },
  {
    phase: "Q3 2025",
    items: ["SMS channel", "Automated drip sequences", "Birthday + anniversary triggers", "RFM segmentation builder", "ReserveGo live sync", "NPS / review request automation", "Campaign A/B testing"],
  },
  {
    phase: "Q4 2025+",
    items: ["AI-powered send-time optimisation", "Conversational AI for guest FAQs", "Swiggy / Zomato review monitoring", "Menu-based recommendation engine", "Revenue attribution dashboard", "White-label platform", "Public API + webhooks"],
  },
];

const VERTICALS = [
  { icon: "🍽️", name: "Fine Dining & Casual",  live: true,  uses: "Birthday campaigns, anniversary winbacks, VIP tier communication, post-visit follow-ups, event announcements." },
  { icon: "🍕", name: "QSR & Fast Food Chains", live: false, uses: "Combo offer blasts, location-based offers, franchise-level member sync, loyalty point reminders." },
  { icon: "🏨", name: "Hotel F&B Outlets",       live: false, uses: "In-hotel guest upsells, room-service promotions, post-checkout feedback, multi-venue guest profiles." },
  { icon: "🍰", name: "Bakeries & Cafés",        live: false, uses: "Seasonal menus, pre-order nudges, loyalty stamps, weekend specials for nearby regulars." },
];

const ICP_CARDS = [
  { tier: "Primary Target",  title: "Independent Fine Dining & Casual Chains", items: ["5–50 outlets", "Owner-operated or small F&B group", "₹50L–₹5Cr monthly GMV", "Existing WhatsApp presence", "Pain: scattered guest data, no retention system"], plan: "Growth Plan" },
  { tier: "Secondary Target", title: "Hotel F&B Managers",                     items: ["3+ restaurant outlets in property", "Existing PMS or CRM adjacent", "Guests captured at check-in", "Pain: no channel to communicate post-stay"], plan: "Enterprise" },
  { tier: "Long-term",        title: "QSR Franchise Networks",                  items: ["20+ outlets", "Central marketing team", "High volume, low AOV", "Pain: no direct channel, aggregator-dependent"], plan: "Enterprise (custom)" },
];

const NAMES = [
  { name: "ReGuest",       score: "9.2 / 10", tagline: "Turn guests into regulars.",           rationale: "Perfectly merges 'regular' and 'guest'. Speaks the exact promise: re-engage the guest, make them a regular. Memorable, brandable, and entirely ownable in the F&B vertical.", recommended: true  },
  { name: "TableLoop",     score: "7.8 / 10", tagline: "Bring them back to the table.",        rationale: "Functional and literal. Easy to understand at a glance. The 'loop' metaphor suggests retention cycles. Less premium feel than ReGuest.", recommended: false },
  { name: "MenuMate",      score: "6.5 / 10", tagline: "Your guests' favourite companion.",    rationale: "Approachable and warm but feels more like a consumer app. Limited scope perception — sounds menu-adjacent rather than CRM-scale.", recommended: false },
  { name: "HospitalityOS", score: "7.1 / 10", tagline: "The operating system for your guests.", rationale: "Technical and credible. Appeals to enterprise buyers but may intimidate independent owners. 'OS' positions it well for the product's depth.", recommended: false },
];

const TECH_STACKS = [
  { layer: "Frontend",        items: ["Next.js 15 App Router — React Server Components", "TypeScript + Tailwind CSS v4", "Shadcn/ui + Radix primitives", "Recharts for analytics visualisations"] },
  { layer: "Backend",         items: ["Node.js + Express (REST API)", "PostgreSQL (Supabase) with RLS", "Redis for session + job queues", "BullMQ for campaign worker queues"] },
  { layer: "Messaging",       items: ["WhatsApp Business Cloud API (Meta)", "Resend API for email delivery", "Twilio (SMS — planned)", "Webhook ingestion with retry logic"] },
  { layer: "Infrastructure",  items: ["Vercel (frontend + serverless functions)", "Railway / Render (backend workers)", "Supabase (DB + Auth + Storage)", "Upstash Redis (serverless caching)"] },
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

// ─── Funnel chart ─────────────────────────────────────────────────────────────
function FunnelChart() {
  const { ref, on } = useReveal(0.2);
  const fColors = ["var(--bg-elev-3)", "var(--accent-2)", "var(--accent)", "var(--ok)"];
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginTop: "1.5rem" }}>
      {FUNNEL_ROWS.map((row, i) => (
        <div key={row.label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{ fontFamily: BODY, fontSize: "0.8rem", color: "var(--text-muted)", width: 80, textAlign: "right", flexShrink: 0 }}>{row.label}</span>
          <div style={{ flex: 1, height: 28, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 4, width: on ? `${row.pct}%` : "0%", background: fColors[i], display: "flex", alignItems: "center", paddingLeft: 10, fontSize: "0.78rem", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", transition: `width 1.5s cubic-bezier(0.22,0.61,0.36,1) ${i * 0.12}s` }}>
              {on ? row.val.toLocaleString() : ""}
            </div>
          </div>
          <span style={{ fontFamily: MONO, fontSize: "0.78rem", fontWeight: 700, width: 50, flexShrink: 0, color: "var(--text)" }}>{row.pct.toFixed(1)}%</span>
        </div>
      ))}
    </div>
  );
}

// ─── Comparison cell ──────────────────────────────────────────────────────────
function CompCell({ v }: { v: boolean | "partial" }) {
  if (v === true)       return <span style={{ color: "var(--ok)", fontWeight: 700 }}>✓</span>;
  if (v === "partial")  return <span style={{ fontFamily: MONO, fontSize: "0.72rem", fontWeight: 700, color: "var(--warn)" }}>Partial</span>;
  return <span style={{ color: "var(--text-dim)" }}>–</span>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DispatchPage() {
  useTheme(); // keep theme context alive
  const [billingAnnual, setBillingAnnual] = useState(false);
  const heroReveal = useReveal(0.05);

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

      {/* ── Hero ── */}
      <ThemeHeroSection contentClassName="mx-auto w-full max-w-6xl px-6 !pt-[calc(var(--page-offset-top)+0.5rem)]">
        <div ref={heroReveal.ref} className="grid grid-cols-1 md:grid-cols-2 items-center gap-16 py-8 pb-16">

          {/* Left */}
          <div style={{ maxWidth: 560 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 100, padding: "0.35rem 1rem", fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", fontFamily: BODY, marginBottom: "1.5rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
              Production-ready · Multi-tenant · Restaurant-native
            </div>

            <h1 style={{ fontFamily: HEAD, fontSize: "clamp(2.6rem, 5vw, 3.8rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "#fff", marginBottom: "1.25rem", opacity: heroReveal.on ? 1 : 0, transform: heroReveal.on ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.9s ease 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>
              Turn guests into{" "}
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>regulars</em>
              {" "}— automatically.
            </h1>

            <p style={{ ...bd, fontSize: "1.1rem", color: "rgba(255,255,255,0.68)", marginBottom: "2.25rem", maxWidth: 480, opacity: heroReveal.on ? 1 : 0, transition: "opacity 0.9s ease 0.2s" }}>
              One platform for restaurants to run WhatsApp and email campaigns, manage their guest database, monitor replies, and prove ROI — all without switching tools.
            </p>

            <div className="flex flex-wrap gap-4" style={{ marginBottom: "2.5rem", opacity: heroReveal.on ? 1 : 0, transition: "opacity 0.9s ease 0.3s" }}>
              <a href="#pricing" style={{ background: "var(--accent)", color: "var(--on-accent)", padding: "0.8rem 2rem", borderRadius: 8, fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", fontFamily: BODY }}>See Pricing</a>
              <a href="#modules" style={{ background: "transparent", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.3)", padding: "0.8rem 2rem", borderRadius: 8, fontSize: "0.95rem", fontWeight: 500, textDecoration: "none", fontFamily: BODY }}>Explore Features</a>
            </div>

            <div className="flex flex-wrap gap-10" style={{ paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.12)", opacity: heroReveal.on ? 1 : 0, transition: "opacity 0.9s ease 0.4s" }}>
              {[{ num: "80+", label: "Production features" }, { num: "9", label: "Integrated modules" }, { num: "3", label: "Channels (WA · Email · SMS)" }].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: HEAD, fontSize: "2rem", color: "#fff", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontFamily: BODY, fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — phone mockup */}
          <div className="flex justify-center">
            <PhoneDemo />
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── Problem ── */}
      <section id="problem" style={{ ...sp, background: bg1 }}>
        <div style={ctr}>
          <SectionTag>The Problem</SectionTag>
          <h2 style={h2}>Restaurants sit on untapped guest relationships</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 mb-8">
            {[
              { num: "73%", label: "of restaurants manage guest data in spreadsheets or on paper" },
              { num: "0",   label: "visibility into whether WhatsApp messages were actually read" },
              { num: "3–5", label: "disconnected tools to run marketing, CRM, and communications" },
            ].map((s, i) => (
              <div key={i} style={{ background: bg2, border: "1px solid var(--border)", borderRadius: 16, padding: "2.5rem 2rem", textAlign: "center" }}>
                <div style={{ fontFamily: HEAD, fontSize: "3.5rem", color: "var(--accent)", lineHeight: 1, marginBottom: "0.75rem" }}>{s.num}</div>
                <div style={{ ...bd, fontSize: "0.9rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PAIN_ITEMS.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "0.85rem", padding: "1.1rem 1.25rem", background: bg0, border: "1px solid var(--border)", borderRadius: 10 }}>
                <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                <span style={{ ...bd, fontSize: "0.9rem" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modules ── */}
      <section id="modules" style={{ ...sp, background: bg0 }}>
        <div style={ctr}>
          <SectionTag>Platform Overview</SectionTag>
          <h2 style={h2}>Nine integrated modules — one login, one data layer</h2>
          <p style={{ ...bd, marginTop: "0.75rem", maxWidth: 600, marginBottom: "3rem" }}>Every module was built for the restaurant vertical. Not adapted. Built for it. Swap between them without leaving the platform.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MODULES.map((mod, i) => (
              <div key={i} style={{ background: bg1, border: "1px solid var(--border)", borderRadius: 14, padding: "1.75rem 1.5rem" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>{mod.icon}</div>
                <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: "1rem", color: "var(--text)", marginBottom: "0.25rem" }}>{mod.title}</div>
                <div style={{ fontFamily: MONO, fontSize: "0.72rem", color: "var(--accent)", marginBottom: "0.9rem", letterSpacing: "0.08em" }}>{mod.sub}</div>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                  {mod.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", gap: "0.5rem", ...bd, fontSize: "0.8rem", alignItems: "baseline" }}>
                      <span style={{ color: "var(--accent)", fontSize: "0.7rem", flexShrink: 0 }}>→</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dormancy / Ingestion ── */}
      <section id="dormancy" style={{ ...sp, background: bg2 }}>
        <div style={ctr}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div>
              <SectionTag>Guest Intelligence</SectionTag>
              <h2 style={h2}>Know who's slipping away — before they're gone</h2>
              <p style={{ ...bd, marginTop: "0.75rem", marginBottom: "1.5rem" }}>Every member is automatically classified into a dormancy tier by a background job. No manual tagging. No spreadsheet updates. Just real-time guest health, always current.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {DORMANCY_TIERS.map((tier, i) => (
                  <div key={i} style={{ borderRadius: 10, padding: "1rem 1.25rem", background: tier.bg, border: `1px solid ${tier.borderColor}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: MONO, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.05em", color: tier.color }}>{tier.key}</div>
                      <div style={{ ...bd, fontSize: "0.82rem", marginTop: 2 }}>{tier.desc}</div>
                    </div>
                    <div style={{ fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700, padding: "0.25rem 0.65rem", borderRadius: 100, background: tier.color, color: "#000", whiteSpace: "nowrap", flexShrink: 0, marginLeft: "0.75rem" }}>{tier.badge}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SectionTag>Member Ingestion</SectionTag>
              <h2 style={h2}>Every guest source, unified</h2>
              <p style={{ ...bd, marginBottom: "1.5rem" }}>Members flow in from five sources into one clean profile — ready for campaigns the moment they're imported.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {INGESTION_SOURCES.map((src, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.9rem", background: bg3, border: "1px solid var(--border)", borderRadius: 10, padding: "0.85rem 1.1rem" }}>
                    <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{src.icon}</span>
                    <div>
                      <div style={{ fontFamily: BODY, fontWeight: 500, fontSize: "0.88rem", color: "var(--text)" }}>{src.text}</div>
                      <div style={{ ...bd, fontSize: "0.75rem" }}>{src.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Campaigns ── */}
      <section id="campaigns" style={{ ...sp, background: bg1 }}>
        <div style={ctr}>
          <SectionTag>Campaign Engine</SectionTag>
          <h2 style={h2}>Multi-channel campaigns built for restaurant teams</h2>
          <p style={{ ...bd, marginTop: "0.75rem", maxWidth: 580, marginBottom: "2.5rem" }}>Built for non-technical staff. No developers needed. Template-driven, schedule-and-forget, with full delivery accountability on every message sent.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* WhatsApp */}
            <div style={{ background: bg0, border: "1px solid var(--border)", borderRadius: 16, padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>💬</div>
                <div>
                  <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>WhatsApp Campaigns</div>
                  <div style={{ fontFamily: MONO, fontSize: "0.72rem", color: "var(--text-dim)", letterSpacing: "0.05em" }}>Meta Cloud API · Template-based</div>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {WA_FEATURES.map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.6rem", ...bd, fontSize: "0.875rem", alignItems: "baseline" }}>
                    <span style={{ color: "var(--ok)", fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "var(--accent-soft)", border: "1px solid var(--accent-line)", borderRadius: 100, padding: "0.4rem 1rem", fontSize: "0.78rem", fontWeight: 600, color: "var(--accent)", fontFamily: MONO }}>⏳ SMS — coming soon</div>
            </div>

            {/* Email */}
            <div style={{ background: bg0, border: "1px solid var(--border)", borderRadius: 16, padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(245,158,11,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>✉️</div>
                <div>
                  <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>Email Campaigns</div>
                  <div style={{ fontFamily: MONO, fontSize: "0.72rem", color: "var(--text-dim)", letterSpacing: "0.05em" }}>Resend API · HTML templates</div>
                </div>
              </div>
              <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {EMAIL_FEATURES.map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: "0.6rem", ...bd, fontSize: "0.875rem", alignItems: "baseline" }}>
                    <span style={{ color: "var(--ok)", fontWeight: 700, flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: bg2, border: "1px solid var(--border)", borderRadius: 10, fontSize: "0.82rem", ...bd }}>
                <strong style={{ color: "var(--text)" }}>Multi-template support:</strong> Promotional, transactional, and event emails each in separate template categories with approval workflows.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Competitive ── */}
      <section id="competitive" style={{ ...sp, background: bg0 }}>
        <div style={ctr}>
          <SectionTag>How We Compare</SectionTag>
          <h2 style={h2}>Purpose-built vs. generic tools</h2>
          <p style={{ ...bd, marginTop: "0.75rem", marginBottom: "2.5rem" }}>Most restaurant teams bolt together Mailchimp + WhatsApp Web + a spreadsheet. ReGuest replaces all three.</p>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", minWidth: 700, fontFamily: BODY }}>
              <thead>
                <tr>
                  {["Feature", "ReGuest", "Mailchimp", "Zomato CRM", "Loyalty+"].map((h, i) => (
                    <th key={h} style={{ background: i === 1 ? "var(--accent)" : bg2, color: i === 1 ? "var(--on-accent)" : "var(--text)", padding: "0.85rem 1.1rem", fontWeight: 600, textAlign: i === 0 ? "left" : "center", border: "1px solid var(--border)", fontFamily: MONO, fontSize: "0.82rem", letterSpacing: "0.04em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMP_ROWS.map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? bg1 : bg0 }}>
                    <td style={{ padding: "0.8rem 1.1rem", color: "var(--text-muted)", border: "1px solid var(--border)", fontWeight: 500 }}>{row.feature}</td>
                    <td style={{ padding: "0.8rem 1.1rem", textAlign: "center", border: "1px solid var(--border)", background: "var(--accent-soft)" }}><CompCell v={row.reguest} /></td>
                    <td style={{ padding: "0.8rem 1.1rem", textAlign: "center", border: "1px solid var(--border)" }}><CompCell v={row.mailchimp} /></td>
                    <td style={{ padding: "0.8rem 1.1rem", textAlign: "center", border: "1px solid var(--border)" }}><CompCell v={row.zomato} /></td>
                    <td style={{ padding: "0.8rem 1.1rem", textAlign: "center", border: "1px solid var(--border)" }}><CompCell v={row.loyaltyp} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Reports ── */}
      <section id="reports" style={{ ...sp, background: bg2 }}>
        <div style={ctr}>
          <SectionTag>Reports & Analytics</SectionTag>
          <h2 style={h2}>Prove ROI on every campaign you send</h2>
          <p style={{ ...bd, marginTop: "0.75rem", marginBottom: "3rem" }}>Six report categories, all exportable. From per-message delivery status to monthly Meta API cost — every data point you need to justify the spend.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {REPORT_CARDS.map((card, i) => (
              <div key={i} style={{ background: bg3, borderRadius: 12, padding: "1.5rem" }}>
                <div style={{ display: "inline-block", background: "var(--accent-soft)", color: "var(--accent)", fontSize: "0.72rem", fontWeight: 700, padding: "0.2rem 0.65rem", borderRadius: 100, marginBottom: "0.85rem", fontFamily: MONO, letterSpacing: "0.05em", border: "1px solid var(--accent-line)" }}>{card.tag}</div>
                <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: "0.95rem", color: "var(--text)", marginBottom: "0.4rem" }}>{card.title}</div>
                <div style={{ ...bd, fontSize: "0.82rem", lineHeight: 1.55 }}>{card.desc}</div>
              </div>
            ))}
          </div>
          <h3 style={{ fontFamily: BODY, fontWeight: 600, fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Sample engagement funnel — 97-campaign account</h3>
          <FunnelChart />
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" style={{ ...sp, background: bg1 }}>
        <div style={ctr}>
          <SectionTag>Pricing</SectionTag>
          <h2 style={h2}>Transparent pricing, no surprise bills</h2>
          <p style={{ ...bd, marginTop: "0.75rem" }}>WhatsApp message costs (Meta API) are passed through at cost. You always see exactly what you're paying for.</p>

          {/* Billing toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", margin: "2.5rem 0" }}>
            <span style={{ fontFamily: BODY, fontSize: "0.9rem", fontWeight: billingAnnual ? 400 : 700, color: billingAnnual ? "var(--text-muted)" : "var(--text)" }}>Monthly</span>
            <button type="button" onClick={() => setBillingAnnual(v => !v)} aria-label="Toggle billing period" style={{ width: 52, height: 28, background: "var(--accent)", borderRadius: 100, border: "none", cursor: "pointer", position: "relative", flexShrink: 0 }}>
              <div style={{ position: "absolute", top: 3, left: billingAnnual ? 27 : 3, width: 22, height: 22, background: "#fff", borderRadius: "50%", transition: "left 0.25s" }} />
            </button>
            <span style={{ fontFamily: BODY, fontSize: "0.9rem", fontWeight: billingAnnual ? 700 : 400, color: billingAnnual ? "var(--text)" : "var(--text-muted)" }}>
              Annual <span style={{ marginLeft: "0.5rem", fontSize: "0.78rem", color: "var(--accent)", fontWeight: 700 }}>–20% off</span>
            </span>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <div key={i} style={{ background: bg0, border: plan.featured ? "2px solid var(--accent)" : "1px solid var(--border)", borderRadius: 16, padding: "2rem", position: "relative", boxShadow: plan.featured ? "0 12px 40px var(--accent-soft)" : "none" }}>
                {plan.featured && (
                  <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--accent)", color: "var(--on-accent)", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.05em", padding: "0.3rem 1rem", borderRadius: 100, whiteSpace: "nowrap", fontFamily: MONO }}>MOST POPULAR</div>
                )}
                <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>{plan.name}</div>
                <div style={{ ...bd, fontSize: "0.82rem", margin: "0.25rem 0 1.25rem" }}>{plan.desc}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.3rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontFamily: HEAD, fontSize: "2.2rem", color: "var(--accent)", lineHeight: 1 }}>{billingAnnual ? plan.annual : plan.monthly}</span>
                  <span style={{ ...bd, fontSize: "0.82rem" }}>{plan.freq}</span>
                </div>
                <div style={{ ...bd, fontSize: "0.78rem", marginBottom: "1.25rem" }}>{billingAnnual ? plan.annualNote : (plan.monthly !== "Custom" ? `${plan.annual}/mo billed annually` : plan.annualNote)}</div>
                <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "1.25rem 0" }} />
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", gap: "0.5rem", fontSize: "0.85rem", fontFamily: BODY, color: f.has ? "var(--text-muted)" : "var(--text-dim)", alignItems: "baseline" }}>
                      <span style={{ color: f.has ? "var(--ok)" : "var(--border)", fontWeight: 700, flexShrink: 0 }}>{f.has ? "✓" : "–"}</span>{f.text}
                    </li>
                  ))}
                </ul>
                <a href="/contact" style={{ display: "block", marginTop: "1.75rem", textAlign: "center", padding: "0.7rem", borderRadius: 8, fontSize: "0.9rem", fontWeight: 600, fontFamily: BODY, textDecoration: "none", background: plan.featured ? "var(--accent)" : bg2, color: plan.featured ? "var(--on-accent)" : "var(--text)", border: plan.featured ? "none" : "1px solid var(--border)" }}>
                  {plan.monthly === "Custom" ? "Contact us" : "Get started"}
                </a>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div style={{ marginTop: "4rem" }}>
            <h3 style={{ fontFamily: HEAD, fontSize: "1.3rem", color: "var(--text)", marginBottom: "1.5rem" }}>Add-ons</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {ADDONS.map((addon, i) => (
                <div key={i} style={{ background: bg0, border: "1px solid var(--border)", borderRadius: 10, padding: "1.1rem" }}>
                  <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: "0.88rem", color: "var(--text)", marginBottom: "0.25rem" }}>{addon.name}</div>
                  <div style={{ fontFamily: HEAD, fontSize: "0.95rem", color: "var(--accent)", marginBottom: "0.15rem" }}>{addon.price}</div>
                  <div style={{ ...bd, fontSize: "0.75rem" }}>{addon.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Roadmap ── */}
      <section id="roadmap" style={{ ...sp, background: bg3 }}>
        <div style={ctr}>
          <SectionTag>Roadmap</SectionTag>
          <h2 style={h2}>Where we are and where we're going</h2>
          <p style={{ ...bd, marginTop: "0.75rem", marginBottom: "3rem" }}>The platform is live and production-ready. What you see below is what's shipping next.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ROADMAP.map((col, i) => (
              <div key={i}>
                <div style={{ borderRadius: 8, padding: "0.6rem 1rem", fontFamily: MONO, fontSize: "0.82rem", fontWeight: 700, color: "var(--text)", marginBottom: "1.25rem", textAlign: "center", background: i === 0 ? "rgba(0,200,180,0.18)" : i === 1 ? "rgba(245,158,11,0.25)" : "rgba(0,153,204,0.25)" }}>{col.phase}</div>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {col.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", gap: "0.6rem", ...bd, fontSize: "0.875rem", alignItems: "baseline" }}>
                      <span style={{ color: "var(--accent)", fontSize: "0.75rem", flexShrink: 0 }}>→</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Verticals ── */}
      <section id="verticals" style={{ ...sp, background: bg1 }}>
        <div style={ctr}>
          <SectionTag>Who It's For</SectionTag>
          <h2 style={h2}>Built for F&B — expanding across the vertical</h2>
          <p style={{ ...bd, marginTop: "0.75rem", marginBottom: "3rem" }}>Live in fine dining and casual restaurants today. QSR, hotel F&B, and café rollout on the roadmap.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VERTICALS.map((v, i) => (
              <div key={i} style={{ border: v.live ? "1px solid var(--accent)" : "1px solid var(--border)", borderRadius: 14, padding: "1.75rem", display: "flex", gap: "1.25rem", background: v.live ? "var(--accent-soft)" : bg0 }}>
                <span style={{ fontSize: "2rem", flexShrink: 0, marginTop: 2 }}>{v.icon}</span>
                <div>
                  <div style={{ fontFamily: BODY, fontWeight: 700, fontSize: "1.05rem", color: "var(--text)", marginBottom: "0.35rem" }}>
                    {v.name}
                    {v.live && <span style={{ marginLeft: "0.6rem", background: "var(--accent)", color: "var(--on-accent)", fontSize: "0.68rem", fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 100, fontFamily: MONO, verticalAlign: "middle" }}>Live</span>}
                  </div>
                  <p style={{ ...bd, fontSize: "0.85rem" }}>{v.uses}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ICP ── */}
      <section id="icp" style={{ ...sp, background: bg0 }}>
        <div style={ctr}>
          <SectionTag>Ideal Customer</SectionTag>
          <h2 style={h2}>Who we're built for</h2>
          <p style={{ ...bd, marginTop: "0.75rem", marginBottom: "3rem" }}>Three customer tiers, each with a clear acquisition path and product fit.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ICP_CARDS.map((card, i) => (
              <div key={i} style={{ background: bg1, border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ background: i === 0 ? bg3 : i === 1 ? bg2 : "#08090c", padding: "1.1rem 1.4rem" }}>
                  <div style={{ fontFamily: MONO, fontSize: "0.7rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.12em", marginBottom: "0.3rem", textTransform: "uppercase" }}>{card.tier}</div>
                  <div style={{ fontFamily: HEAD, fontSize: "1.1rem", color: "#fff", lineHeight: 1.3 }}>{card.title}</div>
                </div>
                <div style={{ padding: "1.4rem" }}>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                    {card.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", gap: "0.5rem", ...bd, fontSize: "0.85rem" }}>
                        <span style={{ color: "var(--accent)", fontWeight: 700, flexShrink: 0 }}>·</span>{item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-line)", borderRadius: 8, padding: "0.6rem 0.9rem", fontSize: "0.82rem", fontWeight: 700, color: "var(--accent)", textAlign: "center", fontFamily: MONO }}>{card.plan}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Names shortlist ── */}
      <section id="names" style={{ ...sp, background: bg2 }}>
        <div style={ctr}>
          <SectionTag>Name Shortlist</SectionTag>
          <h2 style={h2}>What to call it</h2>
          <p style={{ ...bd, marginTop: "0.75rem", marginBottom: "3rem" }}>Four contenders, scored and ranked. One recommendation.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {NAMES.map((n, i) => (
              <div key={i} style={{ background: bg3, border: n.recommended ? "2px solid var(--accent)" : "1px solid var(--border)", borderRadius: 14, padding: "1.75rem", position: "relative", boxShadow: n.recommended ? "0 0 0 4px var(--accent-soft)" : "none" }}>
                {n.recommended && <div style={{ position: "absolute", top: -11, right: 20, background: "var(--accent)", color: "var(--on-accent)", fontSize: "0.68rem", fontWeight: 700, padding: "0.2rem 0.75rem", borderRadius: 100, fontFamily: MONO }}>RECOMMENDED</div>}
                <div style={{ fontFamily: HEAD, fontSize: "2rem", color: "var(--text)", marginBottom: "0.25rem" }}>{n.name}</div>
                <div style={{ display: "inline-block", background: "var(--accent-soft)", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)", padding: "0.2rem 0.65rem", marginBottom: "0.75rem", fontFamily: MONO, border: "1px solid var(--accent-line)" }}>{n.score}</div>
                <p style={{ ...bd, fontSize: "0.88rem", fontStyle: "italic", marginBottom: "0.75rem" }}>{n.tagline}</p>
                <p style={{ ...bd, fontSize: "0.82rem", lineHeight: 1.55 }}>{n.rationale}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech stack ── */}
      <section id="tech" style={{ ...sp, background: bg3 }}>
        <div style={ctr}>
          <SectionTag>Tech Stack</SectionTag>
          <h2 style={h2}>Production-grade infrastructure, restaurant-grade simplicity</h2>
          <p style={{ ...bd, marginTop: "0.75rem", marginBottom: "3rem" }}>Modern stack built for multi-tenancy, high message throughput, and zero-downtime deploys.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {TECH_STACKS.map((stack, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem" }}>
                <div style={{ fontFamily: MONO, fontSize: "0.8rem", fontWeight: 700, color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{stack.layer}</div>
                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {stack.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", gap: "0.5rem", ...bd, fontSize: "0.875rem" }}>
                      <span style={{ color: "var(--err)", flexShrink: 0 }}>·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8" style={{ background: bg2, borderRadius: 10, padding: "1rem 1.5rem", border: "1px solid var(--border)" }}>
            {[{ n: "99.9%", l: "Uptime SLA" }, { n: "<200ms", l: "Avg API response" }, { n: "10K+", l: "Messages / min" }, { n: "Multi-tenant", l: "Data isolation" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: HEAD, fontSize: "1.8rem", color: "var(--text)", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: BODY, fontSize: "0.72rem", color: "var(--text-dim)", marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="cta" style={{ ...sp, background: bg1, textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <SectionTag>Get Started</SectionTag>
          <h2 style={{ ...h2, fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}>Ready to turn guests into regulars?</h2>
          <p style={{ ...bd, fontSize: "1.05rem", maxWidth: 560, margin: "0 auto 2.5rem" }}>
            Book a demo and we'll walk you through the full platform — live data, real campaigns, and a setup plan tailored to your restaurant.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact" style={{ background: "var(--accent)", color: "var(--on-accent)", padding: "0.9rem 2.25rem", borderRadius: 8, fontSize: "1rem", fontWeight: 600, textDecoration: "none", fontFamily: BODY }}>Book a Demo</a>
            <a href="#pricing" style={{ background: "transparent", color: "var(--text)", border: "2px solid var(--border-strong)", padding: "0.9rem 2.25rem", borderRadius: 8, fontSize: "1rem", fontWeight: 600, textDecoration: "none", fontFamily: BODY }}>View Pricing</a>
          </div>
        </div>
      </section>

    </div>
  );
}
