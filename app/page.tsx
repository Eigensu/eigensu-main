import Image from "next/image";
import Link from "next/link";
import { ThemeHeroSection } from "./components/ThemeHero";
import Reveal from "./components/Reveal";
import { EnquiryButton } from "./components/cta";
import OpsConsole from "./components/home/OpsConsole";
import Faq from "./components/home/Faq";
import { FEATURES, SITE } from "./lib/site";
import { pageMetadata } from "./lib/metadata";
import bingeLogo from "../public/clientlogos/binge.webp";
import fieliaLogo from "../public/clientlogos/fielia.webp";
import iciciLogo from "../public/clientlogos/icici.webp";
import laFeteLogo from "../public/clientlogos/lafete.webp";
import reserveGoLogo from "../public/clientlogos/reservego.webp";
import sacredWalksLogo from "../public/clientlogos/sacredwalks.webp";
import scarlettHouseLogo from "../public/clientlogos/scarletthouse.webp";
import soraiaLogo from "../public/clientlogos/soraia.webp";
import sweeneyLogo from "../public/clientlogos/sweeney.webp";
import walleLogo from "../public/clientlogos/walle.webp";

export const metadata = pageMetadata({
  title: "Eigensu — Systems for internal operations",
  description: `${SITE.description} Operations automation, internal tools and systems integration, from Mumbai.`,
  path: "/",
  absoluteTitle: true,
});

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

/* ── Eyebrow ─────────────────────────────────────────────────────────────── */

function Eyebrow({ children, color = "var(--accent)" }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase" as const, color, marginBottom: 18 }}>
      {children}
    </div>
  );
}

/* ── Buttons ─────────────────────────────────────────────────────────────── */

function primaryStyle(invert: boolean) {
  return { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, background: invert ? "var(--wine)" : "var(--accent)", color: invert ? "var(--cream)" : "var(--on-accent)", boxShadow: invert ? "0 8px 28px -8px rgba(0,0,0,0.45)" : "0 0 0 1px var(--accent-line), 0 8px 28px -8px var(--accent)", textDecoration: "none", whiteSpace: "nowrap" as const };
}

function ghostStyle(invert: boolean) {
  return { display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.9rem", padding: "12px 20px", borderRadius: 100, color: invert ? "var(--cream)" : "var(--text)", border: invert ? "1px solid rgba(251,243,228,0.35)" : "1px solid var(--border-strong)", background: "none", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap" as const };
}

function BtnPrimary({ href, children, invert = false }: { href: string; children: React.ReactNode; invert?: boolean }) {
  return <Link href={href} style={primaryStyle(invert)}>{children}</Link>;
}

function BtnGhost({ href, children, invert = false }: { href: string; children: React.ReactNode; invert?: boolean }) {
  return <Link href={href} style={ghostStyle(invert)}>{children}</Link>;
}

/* ── Clients ─────────────────────────────────────────────────────────────── */

const LOGO_FILTER = "brightness(0) saturate(100%) invert(96%) sepia(9%) saturate(638%) hue-rotate(315deg) brightness(103%) contrast(96%)";

// TODO(owner): confirm every client has agreed to their logo appearing here.
const CLIENTS_ROW_1 = [
  { src: bingeLogo, alt: "Binge Consulting logo", h: "clamp(2.4rem,6vw,3.4rem)" },
  { src: soraiaLogo, alt: "Soraia logo", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: scarlettHouseLogo, alt: "Scarlett House logo", h: "clamp(3.9rem,9vw,5.5rem)" },
  { src: sweeneyLogo, alt: "Sweeney logo", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: iciciLogo, alt: "ICICI Bank logo", h: "clamp(2.6rem,6.5vw,3.6rem)" },
];
const CLIENTS_ROW_2 = [
  { src: sacredWalksLogo, alt: "The Sacred Walks logo", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: laFeteLogo, alt: "La fête logo", h: "clamp(2.4rem,6vw,3.4rem)" },
  { src: walleLogo, alt: "Wall-E Arena logo", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: fieliaLogo, alt: "Fielia logo", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: reserveGoLogo, alt: "ReserveGo logo", h: "clamp(2.2rem,5.5vw,3rem)" },
];

function LogoLoopRow({ logos, direction, duration, siya = false }: { logos: typeof CLIENTS_ROW_1; direction: "left" | "right"; duration: number; siya?: boolean }) {
  const items = [...logos, ...logos];
  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 48,
          width: "max-content",
          animation: `${direction === "left" ? "logoLoopLeft" : "logoLoopRight"} ${duration}s linear infinite`,
        }}
      >
        {items.map((l, i) => (
          <Image key={`${l.alt}-${i}`} src={l.src} alt={i < logos.length ? l.alt : ""} aria-hidden={i >= logos.length} sizes="360px" style={{ height: l.h, width: "auto", flexShrink: 0, filter: LOGO_FILTER }} />
        ))}
        {siya && (
          <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.3rem,4vw,1.9rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--cream)", textAlign: "center", whiteSpace: "nowrap", flexShrink: 0 }}>SIYA MANUFACTURING</span>
        )}
      </div>
    </div>
  );
}

function ClientsBand() {
  return (
    <div style={{ padding: "104px 0", marginTop: -48, textAlign: "center", background: "var(--ember)", borderRadius: 0, position: "relative", zIndex: 1, overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        <LogoLoopRow logos={CLIENTS_ROW_1} direction="left" duration={30} siya />
        <LogoLoopRow logos={CLIENTS_ROW_2} direction="right" duration={34} />
      </div>
    </div>
  );
}

/* ── Services Teaser ─────────────────────────────────────────────────────── */

const SERVICES = [
  { idx: "01", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "var(--accent)" }}><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg>, title: "Operations Automation", body: "Replace spreadsheets and manual workflows with pipelines that trigger, route and reconcile on their own." },
  { idx: "02", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "var(--accent)" }}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>, title: "Internal Tooling", body: "Custom dashboards, admin panels and internal apps that fit your process instead of forcing you into a template." },
  { idx: "03", icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 20, height: 20, stroke: "var(--accent)" }}><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 9v6a3 3 0 0 0 3 3h6"/></svg>, title: "Systems Integration", body: "Connect the tools you already pay for so data flows once, cleanly, without a human in the middle." },
];

function ServiceCard({ s }: { s: typeof SERVICES[0] }) {
  return (
    <Reveal as="article" duration={0.6} style={{ background: "#fff", border: "2px solid var(--wine)", borderRadius: 18, padding: "26px 24px 30px", position: "relative" }}>
      <span style={{ position: "absolute", top: 22, right: 24, fontFamily: MONO, fontSize: "0.7rem", color: "rgba(59,10,34,0.35)" }}>{s.idx}</span>
      <div style={{ width: 42, height: 42, borderRadius: 10, display: "grid", placeItems: "center", border: "1px solid var(--wine)", background: "var(--wine)", marginBottom: 18 }}>
        {s.icon}
      </div>
      <h3 style={{ fontFamily: HEAD, fontSize: "1.1rem", fontWeight: 700, marginBottom: 10, color: "var(--wine)" }}>{s.title}</h3>
      <p style={{ color: "rgba(59,10,34,0.78)", fontSize: "0.9rem", lineHeight: 1.65 }}>{s.body}</p>
      <Link href="/services" style={{ fontFamily: MONO, fontSize: "0.74rem", letterSpacing: "0.5px", color: "var(--accent)", marginTop: 16, display: "inline-flex", gap: 6, alignItems: "center" }}>Explore →</Link>
    </Reveal>
  );
}

/* ── Stats strip ─────────────────────────────────────────────────────────── */

const STATS = [
  { num: "12", unit: "+",  lbl: "Projects delivered" },
  { num: "04",  unit: "yr",lbl: "Track record" },
];

function StatsStrip() {
  return (
    <Reveal style={{ border: "2px solid var(--wine)", borderRadius: 16, background: "#fff", overflow: "hidden" }}>
      <div className="g-stats-2">
        {STATS.map((s, i) => (
          <div
            key={s.lbl}
            className={i < STATS.length - 1 ? "border-r-2" : ""}
            style={{ padding: "26px 22px", borderColor: "var(--wine)" }}
          >
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(1.6rem,3.6vw,2.5rem)", letterSpacing: "-0.03em", color: "var(--text)" }}>
              {s.num}<span style={{ color: "var(--accent)" }}>{s.unit}</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--wine-2)", marginTop: 8 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── Outcomes ────────────────────────────────────────────────────────────── */

const SLIDES = [
  { tag: "Logistics",    title: "Dispatch automation",      body: "Replaced a 6-person routing desk with a self-balancing engine handling 2,000+ orders/day.", client: "NORTHWIND", outcome: "−71% manual hrs" },
  { tag: "Manufacturing",title: "Inventory reconciliation", body: "Real-time stock sync across 4 plants and 3 ERPs, killing the monthly variance scramble.", client: "VERTEX",    outcome: "99.4% accuracy" },
  { tag: "Finance",      title: "Approval routing",         body: "Policy-aware flows that route, escalate and audit themselves — cycle cut from days to 40min.", client: "ATLAS",     outcome: "8h → 40m" },
  { tag: "Retail",       title: "Ops command centre",       body: "One console unifying 9 in-store systems into a single live operational view.", client: "HELIOS",    outcome: "9 tools → 1" },
  { tag: "Healthcare",   title: "Intake digitisation",      body: "Paper intake replaced with a validated workflow feeding straight into the records system.", client: "MERIDIAN",  outcome: "−92% errors" },
];

// Placeholder case studies, hidden until real ones exist (see FEATURES.caseStudies).
function OutcomesGrid() {
  const [hero, ...rest] = SLIDES;

  return (
    <Reveal threshold={0.08}>
      <div
        className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-9"
        style={{ paddingBottom: 32, borderBottom: "1px solid rgba(251,243,228,0.18)", marginBottom: 20 }}
      >
        <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(3.2rem,8vw,5.6rem)", letterSpacing: "-0.045em", lineHeight: 0.85, color: "#72D69A" }}>{hero.outcome}</div>
        <div>
          <span style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--butter)" }}>{hero.tag}</span>
          <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.4rem", letterSpacing: "-0.02em", margin: "8px 0 10px" }}>{hero.title}</h3>
          <p style={{ color: "rgba(251,243,228,0.68)", fontSize: "0.92rem", lineHeight: 1.6, maxWidth: "52ch", marginBottom: 8 }}>{hero.body}</p>
          <div style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.5px", color: "rgba(251,243,228,0.48)" }}>{hero.client}</div>
        </div>
      </div>

      <div>
        {rest.map(slide => (
          <div key={slide.client} className="flex items-center justify-between gap-4" style={{ padding: "14px 0", borderBottom: "1px solid rgba(251,243,228,0.12)" }}>
            <div className="flex items-baseline gap-3" style={{ minWidth: 0 }}>
              <span style={{ flexShrink: 0, width: 96, fontFamily: MONO, fontSize: "0.6rem", letterSpacing: "1px", textTransform: "uppercase", color: "var(--butter)" }}>{slide.tag}</span>
              <span className="truncate" style={{ fontFamily: HEAD, fontWeight: 600, fontSize: "0.88rem", color: "rgba(251,243,228,0.85)" }}>{slide.title} — {slide.client}</span>
            </div>
            <span style={{ flexShrink: 0, fontFamily: MONO, fontSize: "0.78rem", color: "#72D69A" }}>{slide.outcome}</span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

/* ── Insights ────────────────────────────────────────────────────────────── */

// Placeholder posts, hidden until real ones exist (see FEATURES.blog).
const INSIGHTS = [
  { tag: "Operations",  time: "6 min", title: "Why spreadsheets fail at scale", body: "The hidden cost of manual reconciliation and the tipping point where automation pays for itself." },
  { tag: "Product",     time: "4 min", title: "Designing tools operators actually want", body: "Consumer-grade UX principles applied to internal dashboards, and why it matters for adoption." },
  { tag: "Engineering", time: "8 min", title: "Declarative workflows over drag-and-drop", body: "Why versioned, code-first automation beats black-box builders for anything mission-critical." },
];

/* ── CTA block ───────────────────────────────────────────────────────────── */

function CtaBlock({ heading, sub, primary, primaryHref, ghost }: { heading: string; sub: string; primary: string; primaryHref: string; ghost: string }) {
  return (
    <Reveal style={{ position: "relative", textAlign: "center", background: "var(--ember)", overflow: "hidden", borderRadius: "48px 48px 0 0" }}>
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ padding: "clamp(56px,9vw,96px) 0" }}>
        <Eyebrow color="var(--butter)">Get started</Eyebrow>
        <h2 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.6rem,3vw,2.4rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--cream)", maxWidth: "22ch", margin: "0 auto 16px" }}>{heading}</h2>
        <p style={{ color: "rgba(251,243,228,0.82)", fontSize: "clamp(0.9rem,1.3vw,1rem)", maxWidth: "50ch", margin: "0 auto 28px", lineHeight: 1.7 }}>{sub}</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <BtnPrimary href={primaryHref} invert>{primary}</BtnPrimary>
          <EnquiryButton style={ghostStyle(true)}>{ghost}</EnquiryButton>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection fullScreen contentClassName="pb-8" background="var(--wine)" className="rounded-b-[48px] z-[2]">
        <div className="grid w-full gap-8 min-[900px]:grid-cols-[1.12fr_0.88fr] min-[900px]:items-center" style={{ position: "relative", zIndex: 1 }}>
          {/* Left */}
          <div style={{ marginLeft: "clamp(-8px,-1.6vw,-24px)" }}>
            <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.6rem,7vw,6.4rem)", lineHeight: 0.92, letterSpacing: "-0.045em", color: "var(--cream)", margin: "0 0 24px" }}>
              Internal systems that{" "}
              <span style={{ color: "var(--accent)" }}>run themselves</span>
            </h1>
            <p className="hero-anim-4" style={{ color: "rgba(251,243,228,0.82)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "50ch", marginBottom: 32, lineHeight: 1.7 }}>
              Eigensu builds tailored software that streamlines internal management and optimises operations — so your teams stop fighting tools and start compounding output.
            </p>
            <div className="hero-anim-4 flex flex-wrap gap-3">
              <BtnPrimary href="/onboard">
                Start a Project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </BtnPrimary>
              <BtnGhost href="/projects" invert>See our work</BtnGhost>
              <EnquiryButton style={ghostStyle(true)}>Book a call</EnquiryButton>
            </div>
          </div>
          {/* Right */}
          <div className="hero-anim-5">
            <OpsConsole />
          </div>
        </div>
      </ThemeHeroSection>

      {/* ── Clients ── */}
      <ClientsBand />

      {/* ── Services teaser ── */}
      <section className="relative z-10 pt-[104px] pb-14 md:pt-[128px] md:pb-20 lg:pt-[144px] lg:pb-24" style={{ overflow: "hidden", background: "var(--bg)", borderRadius: "48px 48px 0 0", marginTop: -48 }}>
        <div style={{ position: "absolute", width: 300, height: 300, left: -110, top: 40, background: "var(--butter)", borderRadius: "50%", opacity: 0.22, filter: "blur(1px)", zIndex: 0, pointerEvents: "none" }} />
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 580, marginBottom: 48 }}>
            <Eyebrow>What we do</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2.1rem,4.6vw,4.4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)" }}>
              Built for the unglamorous parts{" "}
              <span style={{ background: "linear-gradient(120deg,var(--text) 30%,var(--accent) 130%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>that run the company.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.3vw,1rem)", marginTop: 16, lineHeight: 1.7 }}>Three disciplines, one outcome: less manual work, fewer errors, faster decisions.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(s => <ServiceCard key={s.idx} s={s} />)}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative z-10 py-10 md:py-14" style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 480, marginBottom: 28 }}>
            <Eyebrow>Track record</Eyebrow>
            <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.9rem,1.3vw,1rem)", lineHeight: 1.7 }}>Four years in, and the systems we shipped are still running themselves.</p>
          </div>
          <StatsStrip />
        </div>
      </section>

      {/* ── Carousel / Outcomes ── */}
      {FEATURES.caseStudies && (
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ background: "var(--wine)", borderRadius: 48 }}>
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <Eyebrow color="var(--butter)">Proof</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4.2vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--cream)" }}>Selected outcomes.</h2>
          </div>
          <OutcomesGrid />
        </div>
      </section>
      )}

      {/* ── Insights ── */}
      {FEATURES.blog && (
      <section className="relative z-10 py-14 md:py-20 lg:py-24" style={{ overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 240, height: 240, left: "8%", bottom: -50, background: "var(--peri)", borderRadius: "50%", opacity: 0.24, zIndex: 0, pointerEvents: "none" }} />
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 560, marginBottom: 48 }}>
            <Eyebrow>Writing</Eyebrow>
            <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4.2vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--text)" }}>Insights &amp; updates.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INSIGHTS.map(post => (
              <article key={post.title} style={{ borderTop: "2px solid var(--wine)", paddingTop: 22, minHeight: 220, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent)" }}>
                  <span>{post.tag}</span>
                  <span>{post.time}</span>
                </div>
                <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.35rem", letterSpacing: "-0.02em", margin: "18px 0 10px", color: "var(--text)" }}>{post.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{post.body}</p>
                <Link href="/blog" style={{ marginTop: "auto", paddingTop: 18, fontFamily: MONO, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 6 }}>Read article →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── CTA ── */}
      <CtaBlock
        heading="Tell us what's slowing your operation down."
        sub="We'll map it, scope it, and show you what automating it looks like — usually within a week."
        primary="Onboard a project"
        primaryHref="/onboard"
        ghost="Book a call"
      />

      {/* ── FAQ ── */}
      <Faq />

      <style>{`
        @keyframes logoLoopLeft  { to { transform: translateX(-50%); } }
        @keyframes logoLoopRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .g-stats-2 { display: grid; grid-template-columns: repeat(2, 1fr); }
      `}</style>
    </div>
  );
}
