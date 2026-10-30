"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useModal } from "./components/PageShell";
import { ThemeHeroSection } from "./components/ThemeHero";
import { Counter, Reveal, ScrollProgress, ScrollWords, cx, useMagnetic } from "./components/motion";
import s from "./home.module.css";

/* ── Buttons ─────────────────────────────────────────────────────────────── */

type BtnProps = { href?: string; onClick?: () => void; children: React.ReactNode; variant?: "solid" | "line" | "dark" };

function Btn({ href, onClick, children, variant = "solid" }: BtnProps) {
  const ref = useMagnetic<HTMLElement>(0.22);
  const cls = cx(s.btn, variant === "solid" && s.btnSolid, variant === "line" && s.btnLine, variant === "dark" && s.btnDark);
  if (href) return <Link ref={ref as never} href={href} className={cls}>{children}</Link>;
  return <button ref={ref as never} type="button" onClick={onClick} className={cls}>{children}</button>;
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={15} height={15} aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/* ── Hero ────────────────────────────────────────────────────────────────── */

const WORDS = ["run themselves.", "scale quietly.", "never sleep."];

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI(n => (n + 1) % WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={s.rotor} aria-live="off">
      <span key={i} className={s.rotorWord}>{WORDS[i]}</span>
    </span>
  );
}

function OpsConsole() {
  const ref = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(true);
  useEffect(() => { const id = setInterval(() => setTick(t => !t), 850); return () => clearInterval(id); }, []);
  const BARS = [42, 61, 38, 78, 55, 90, 47, 68, 83, 59, 72, 95];

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <div ref={ref} className={s.console} onPointerMove={onMove} onPointerLeave={onLeave} style={{ background: "var(--cream)", borderRadius: 28, padding: 14, boxShadow: "24px 30px 60px rgba(0,0,0,0.35)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 10px 15px" }}>
        {["#FF7661", "var(--butter)", "#65C58A"].map(c => <i key={c} style={{ width: 9, height: 9, borderRadius: "50%", display: "block", background: c }} />)}
        <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono), monospace", fontSize: "0.68rem", letterSpacing: "0.08em", color: "rgba(59,10,34,0.55)" }}>ops_console — live</span>
      </div>
      <div style={{ background: "#260616", borderRadius: 18, padding: 18 }}>
        {[
          { label: "invoice_sync", tag: "active", tc: "#72D69A", tb: "rgba(101,197,138,0.13)" },
          { label: "inventory_recon", tag: "running", tc: "#FF8064", tb: "rgba(240,73,31,0.15)" },
          { label: "approval_routing", tag: "queued", tc: "var(--butter)", tb: "rgba(255,197,61,0.14)" },
        ].map(row => (
          <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 14px", border: "1px solid rgba(251,243,228,0.1)", borderRadius: 10, marginBottom: 9, background: "rgba(251,243,228,0.045)" }}>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.75rem", color: "rgba(251,243,228,0.72)" }}>{row.label}</span>
            <span style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.62rem", letterSpacing: "0.05em", padding: "5px 8px", borderRadius: 999, textTransform: "uppercase", color: row.tc, background: row.tb }}>{row.tag}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 95, padding: "15px 12px", border: "1px solid rgba(251,243,228,0.1)", borderRadius: 10, marginTop: 14 }}>
          {BARS.map((h, i) => <div key={i} style={{ flex: 1, background: i % 4 === 2 ? "var(--peri)" : "var(--ember)", opacity: 0.9, borderRadius: "3px 3px 0 0", height: `${h}%` }} />)}
        </div>
        <div style={{ marginTop: 10, background: "#12030a", borderRadius: 9, padding: "12px 13px", fontFamily: "var(--font-mono), monospace", fontSize: "0.68rem", color: "rgba(251,243,228,0.62)" }}>
          <b style={{ color: "#72D69A" }}>eigensu ▸</b>
          {" deploy --pipeline ops.core"}
          <span style={{ display: "inline-block", width: 6, height: 12, background: "var(--ember)", marginLeft: 4, verticalAlign: "-2px", opacity: tick ? 0.9 : 0 }} />
        </div>
      </div>
    </div>
  );
}

function Hero({ onBook }: { onBook: () => void }) {
  return (
    <ThemeHeroSection fullScreen contentClassName="pb-12" background="var(--wine)" className="rounded-b-[48px] z-[2] max-md:min-h-0!">
      <div className={s.heroGrid}>
        <div>
          <div className={cx(s.metaRow, s.fade)} style={{ animationDelay: ".05s" }}>
            <span><i className={s.dot} />Systems online</span>
            <span>Est. <b>2022</b></span>
            <span>Internal ops studio</span>
          </div>
          <h1 className={s.mega}>
            <span className={s.line}><span>Internal</span></span>
            <span className={s.line}><span>systems that</span></span>
            <span className={s.line}><span><RotatingWord /></span></span>
          </h1>
        </div>
        <div className={s.heroRow}>
          <div className={s.fade} style={{ animationDelay: ".8s" }}>
            <p className={s.lede}>
              Eigensu builds tailored software that streamlines internal management and optimises operations — so your teams stop fighting tools and start compounding output.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              <Btn href="/onboard">Start a project <Arrow /></Btn>
              <Btn href="/projects" variant="line">See our work</Btn>
              <Btn onClick={onBook} variant="line">Book a call</Btn>
            </div>
            <span className={s.scrollHint}><i />Scroll</span>
          </div>
          <div className={s.fade} style={{ animationDelay: "1s" }}>
            <OpsConsole />
          </div>
        </div>
      </div>
    </ThemeHeroSection>
  );
}

/* ── Clients ─────────────────────────────────────────────────────────────── */

const LOGO_FILTER = "brightness(0) saturate(100%) invert(96%) sepia(9%) saturate(638%) hue-rotate(315deg) brightness(103%) contrast(96%)";

const CLIENTS_ROW_1 = [
  { src: "/clientlogos/binge.png", alt: "Binge Consulting", h: "clamp(2.4rem,6vw,3.4rem)" },
  { src: "/clientlogos/soraia.png", alt: "Soraia", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: "/clientlogos/scarletthouse.png", alt: "Scarlett House", h: "clamp(3.9rem,9vw,5.5rem)" },
  { src: "/clientlogos/Sweeney.png", alt: "Sweeney", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: "/clientlogos/icici.svg", alt: "ICICI Bank", h: "clamp(2.6rem,6.5vw,3.6rem)" },
];
const CLIENTS_ROW_2 = [
  { src: "/clientlogos/sacredwalks.png", alt: "The Sacred Walks", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: "/clientlogos/lafete.png", alt: "La fête", h: "clamp(2.4rem,6vw,3.4rem)" },
  { src: "/clientlogos/walle.png", alt: "Wall-E Arena", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: "/clientlogos/fielia.png", alt: "Fielia", h: "clamp(3.4rem,8vw,4.9rem)" },
  { src: "/clientlogos/reservego.png", alt: "ReserveGo", h: "clamp(2.2rem,5.5vw,3rem)" },
];

function LogoLoopRow({ logos, direction, duration, siya = false }: { logos: typeof CLIENTS_ROW_1; direction: "left" | "right"; duration: number; siya?: boolean }) {
  const items = [...logos, ...logos];
  return (
    <div className={s.logoRow}>
      <div className={s.logoTrack} style={{ animation: `${direction === "left" ? s.loopL : s.loopR} ${duration}s linear infinite` }}>
        {/* eslint-disable @next/next/no-img-element */}
        {items.map((l, i) => (
          <img key={`${l.alt}-${i}`} src={l.src} alt={i < logos.length ? l.alt : ""} aria-hidden={i >= logos.length} style={{ height: l.h, width: "auto", flexShrink: 0, filter: LOGO_FILTER }} />
        ))}
        {/* eslint-enable @next/next/no-img-element */}
        {siya && <span style={{ fontFamily: "var(--font-head), sans-serif", fontWeight: 800, fontSize: "clamp(1.3rem,4vw,1.9rem)", letterSpacing: "-0.02em", color: "var(--cream)", whiteSpace: "nowrap", flexShrink: 0 }}>SIYA MANUFACTURING</span>}
      </div>
    </div>
  );
}

function ClientsBand() {
  return (
    <div className={s.clients}>
      <div className={s.clientsLabel}>Trusted by teams who run on process</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        <LogoLoopRow logos={CLIENTS_ROW_1} direction="left" duration={30} siya />
        <LogoLoopRow logos={CLIENTS_ROW_2} direction="right" duration={34} />
      </div>
    </div>
  );
}

/* ── Statement — words light up as you scroll ────────────────────────────── */

const STATEMENT: { w: string; em?: boolean }[] = [
  ..."We build the".split(" ").map(w => ({ w })),
  ..."unglamorous".split(" ").map(w => ({ w, em: true })),
  ..."software that quietly runs the company — so your people can do the work only people can.".split(" ").map(w => ({ w })),
];

function Statement() {
  return (
    <section className={cx(s.sec, s.statement)}>
      <div className={s.wrap}>
        <div className={s.eyebrow}>The premise</div>
        <ScrollWords parts={STATEMENT} />
      </div>
    </section>
  );
}

/* ── Services ────────────────────────────────────────────────────────────── */

const SERVICES = [
  { idx: "01", title: "Operations Automation", body: "Replace spreadsheets and manual workflows with pipelines that trigger, route and reconcile on their own." },
  { idx: "02", title: "Internal Tooling", body: "Custom dashboards, admin panels and internal apps that fit your process instead of forcing you into a template." },
  { idx: "03", title: "Systems Integration", body: "Connect the tools you already pay for so data flows once, cleanly, without a human in the middle." },
];

function Services() {
  return (
    <section className={cx(s.sec)} style={{ background: "var(--bg)", paddingBottom: "clamp(60px,8vw,110px)" }}>
      <div className={s.wrap}>
        <Reveal>
          <div className={s.eyebrow}>What we do</div>
          <h2 className={s.h2} style={{ color: "var(--wine)", maxWidth: "14ch" }}>Three disciplines. One outcome.</h2>
        </Reveal>
        <div className={s.svcList}>
          {SERVICES.map((v, i) => (
            <Reveal key={v.idx} delay={i * 0.08}>
              <Link href="/services" className={s.svc}>
                <span className={s.svcIdx}>{v.idx}</span>
                <h3 className={s.svcTitle}>{v.title}</h3>
                <p className={s.svcBody}>{v.body}</p>
                <span className={s.svcArrow}><Arrow /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stats ───────────────────────────────────────────────────────────────── */

const STATS = [
  { n: 12, unit: "+", lbl: "Projects delivered", pad: 0 },
  { n: 100, unit: "%", lbl: "Client retention", pad: 0 },
  { n: 3, unit: "×", lbl: "Avg. process speed-up", pad: 0 },
  { n: 4, unit: "yr", lbl: "Track record", pad: 2 },
];

function Stats() {
  return (
    <section className={cx(s.sec, s.stats)}>
      <div className={s.wrap}>
        <Reveal>
          <div className={s.eyebrow}>Track record</div>
        </Reveal>
        <div className={s.statGrid}>
          {STATS.map((t, i) => (
            <Reveal key={t.lbl} delay={i * 0.08} className={s.stat}>
              <div className={s.statNum}><Counter to={t.n} pad={t.pad} /><sup>{t.unit}</sup></div>
              <div className={s.statLbl}>{t.lbl}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Outcomes reel — pinned horizontal scroll on desktop ─────────────────── */

const SLIDES = [
  { tag: "Logistics", title: "Dispatch automation", body: "Replaced a 6-person routing desk with a self-balancing engine handling 2,000+ orders/day.", client: "NORTHWIND", outcome: "−71%", unit: "manual hours" },
  { tag: "Manufacturing", title: "Inventory reconciliation", body: "Real-time stock sync across 4 plants and 3 ERPs, killing the monthly variance scramble.", client: "VERTEX", outcome: "99.4%", unit: "stock accuracy" },
  { tag: "Finance", title: "Approval routing", body: "Policy-aware flows that route, escalate and audit themselves — cycle cut from days to 40min.", client: "ATLAS", outcome: "8h→40m", unit: "approval cycle" },
  { tag: "Retail", title: "Ops command centre", body: "One console unifying 9 in-store systems into a single live operational view.", client: "HELIOS", outcome: "9→1", unit: "tools to check" },
  { tag: "Healthcare", title: "Intake digitisation", body: "Paper intake replaced with a validated workflow feeding straight into the records system.", client: "MERIDIAN", outcome: "−92%", unit: "intake errors" },
];

function Reel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      setPinned(true);
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const tween = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: section, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, invalidateOnRefresh: true,
          onUpdate: self => { if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress})`; },
        },
      });
      return () => { setPinned(false); tween.scrollTrigger?.kill(); tween.kill(); gsap.set(track, { clearProps: "transform" }); };
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className={cx(s.sec, s.reel, pinned && s.reelPinned)} style={{ zIndex: 3 }}>
      <div className={s.reelPin}>
        <div className={s.wrap} style={{ width: "100%" }}>
          <div className={s.reelHead}>
            <Reveal>
              <div className={s.eyebrow} style={{ color: "var(--butter)" }}>Proof</div>
              <h2 className={s.h2} style={{ color: "var(--cream)" }}>Selected<br />outcomes.</h2>
            </Reveal>
            <span className={s.reelCount}>05 PROJECTS — {pinned ? "KEEP SCROLLING →" : "SWIPE →"}</span>
          </div>
        </div>
        <div ref={trackRef} className={s.track}>
          {SLIDES.map((c, i) => (
            <article key={c.client} className={s.card}>
              <div className={s.cardTop}><span>{c.tag}</span><span>0{i + 1}/05</span></div>
              <div>
                <div className={s.cardNum}>{c.outcome}</div>
                <div className={s.cardClient} style={{ marginTop: 10, color: "#72D69A" }}>{c.unit.toUpperCase()}</div>
              </div>
              <div>
                <h3 className={s.cardTitle}>{c.title}</h3>
                <p className={s.cardBody}>{c.body}</p>
                <div className={s.cardClient}>{c.client}</div>
              </div>
            </article>
          ))}
        </div>
        <div className={s.reelBar}><i ref={barRef as never} /></div>
      </div>
    </section>
  );
}

/* ── Insights ────────────────────────────────────────────────────────────── */

const INSIGHTS = [
  { tag: "Operations · 6 min", title: "Why spreadsheets fail at scale", body: "The hidden cost of manual reconciliation and the tipping point where automation pays for itself." },
  { tag: "Product · 4 min", title: "Designing tools operators actually want", body: "Consumer-grade UX principles applied to internal dashboards, and why it matters for adoption." },
  { tag: "Engineering · 8 min", title: "Declarative workflows over drag-and-drop", body: "Why versioned, code-first automation beats black-box builders for anything mission-critical." },
];

function Insights() {
  return (
    <section className={s.sec} style={{ background: "var(--bg)", padding: "clamp(70px,9vw,130px) 0", marginTop: -48, paddingTop: "clamp(120px,14vw,190px)" }}>
      <div className={s.wrap}>
        <Reveal>
          <div className={s.eyebrow}>Writing</div>
          <h2 className={s.h2} style={{ color: "var(--wine)" }}>Insights &amp; updates.</h2>
        </Reveal>
        <div className={s.posts}>
          {INSIGHTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link href="/blog" className={s.post}>
                <span className={s.postTag}>{p.tag}</span>
                <h3 className={s.postTitle}>{p.title}</h3>
                <p className={s.postBody}>{p.body}</p>
                <span style={{ color: "var(--ember)" }}><Arrow /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ─────────────────────────────────────────────────────────────────── */

function Cta({ onBook }: { onBook: () => void }) {
  const orb = useMagnetic<HTMLAnchorElement>(0.35);
  return (
    <section className={s.cta}>
      <div className={s.wrap}>
        <Reveal>
          <div className={s.eyebrow} style={{ color: "var(--butter)" }}>Get started</div>
          <h2 className={s.ctaBig}>What&rsquo;s slowing<br />you <em>down?</em></h2>
        </Reveal>
        <div className={s.ctaRow}>
          <Link ref={orb} href="/onboard" className={s.orb}>Onboard<br />a project</Link>
          <div>
            <p className={s.ctaSub}>We&rsquo;ll map it, scope it, and show you what automating it looks like — usually within a week.</p>
            <div style={{ marginTop: 22 }}><Btn onClick={onBook} variant="dark">Book a call <Arrow /></Btn></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ─────────────────────────────────────────────────────────────────── */

const FAQ_ITEMS = [
  { q: "What does an engagement actually look like?", a: "We start with a scoping call to map your workflow, then send a fixed-scope proposal within a week. Once approved, we build in short, visible sprints — you see working software early and often, not a black box that appears at the end." },
  { q: "How long does a typical project take?", a: "Most internal tools and automations ship in 3–8 weeks depending on scope. We'll give you a concrete timeline during scoping — not a range that quietly slips." },
  { q: "Do you work with our existing stack?", a: "Yes. Systems integration is one of our core disciplines — we connect to whatever ERPs, databases, SaaS tools or internal APIs you already run, rather than asking you to replace them." },
  { q: "What happens after launch?", a: "Every build includes a handover period plus ongoing support options. We stay reachable for fixes, tweaks and scaling questions — we're not a vendor that disappears after go-live." },
  { q: "How is pricing structured?", a: "Fixed-scope pricing agreed upfront after the scoping call, so there are no surprise invoices. For ongoing integration work we also offer retainer arrangements." },
];

function Faq() {
  const [open, setOpen] = useState(0);
  const toggle = useCallback((i: number) => setOpen(o => (o === i ? -1 : i)), []);
  return (
    <section className={cx(s.sec, s.faq)}>
      <div className={s.wrap}>
        <Reveal>
          <div className={s.eyebrow} style={{ color: "var(--butter)" }}>Questions</div>
          <h2 className={s.h2} style={{ color: "var(--cream)", marginBottom: "clamp(32px,5vw,60px)" }}>Frequently<br />asked.</h2>
        </Reveal>
        <div>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={cx(s.faqItem, isOpen && s.open)}>
                <button type="button" className={s.faqBtn} aria-expanded={isOpen} onClick={() => toggle(i)}>
                  <h3 className={s.faqQ}>{item.q}</h3>
                  <span className={s.faqIcon} aria-hidden>
                    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 5v14M5 12h14" /></svg>
                  </span>
                </button>
                <div className={s.faqPanel}><div><p>{item.a}</p></div></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */

export default function HomePage() {
  const { openModal } = useModal();
  return (
    <div>
      <ScrollProgress />
      <Hero onBook={openModal} />
      <ClientsBand />
      <Statement />
      <Services />
      <Stats />
      <Reel />
      <Insights />
      <Cta onBook={openModal} />
      <Faq />
    </div>
  );
}
