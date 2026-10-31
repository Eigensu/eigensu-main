"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ThemeHeroSection } from "../components/ThemeHero";
import { Counter, Reveal, ScrollProgress, ScrollWords, cx, useMagnetic } from "../components/motion";
import s from "../home.module.css";
import a from "./about.module.css";

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width={15} height={15} aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

function Btn({ href, children, variant = "solid" }: { href: string; children: React.ReactNode; variant?: "solid" | "line" | "dark" }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.22);
  return (
    <Link ref={ref} href={href} className={cx(s.btn, variant === "solid" && s.btnSolid, variant === "line" && s.btnLine, variant === "dark" && s.btnDark)}>
      {children}
    </Link>
  );
}

const PREMISE: { w: string; em?: boolean }[] = [
  ..."Most software fails operations because it's built by people who've never run one. We start from the workflow — the handoffs, the exceptions, the".split(" ").map(w => ({ w })),
  { w: "4pm scramble", em: true },
  ..."— and only then write code.".split(" ").map(w => ({ w })),
];

const STATS = [
  { n: 12, unit: "+", lbl: "Projects delivered", pad: 0 },
  { n: 100, unit: "%", lbl: "Client retention", pad: 0 },
  { n: 3, unit: "", lbl: "Countries served", pad: 2 },
  { n: 4, unit: "yr", lbl: "Track record", pad: 2 },
];

const VALUES = [
  { idx: "01", title: "Outcomes, not output", body: "We measure success by hours saved and errors removed — not lines shipped or features listed." },
  { idx: "02", title: "No hand-holding required", body: "What we build runs without us. Documented, monitored, and genuinely yours on handover." },
  { idx: "03", title: "Boring on purpose", body: "The best operational software is invisible. We optimise for reliability over novelty, every time." },
];

const TIMELINE = [
  { year: "2021", title: "Founded", body: "Started in Mumbai with one automation project and one stubborn spreadsheet." },
  { year: "2022", title: "First product", body: "Shipped our first reusable internal-tooling framework." },
  { year: "2023", title: "Cross-border", body: "Expanded to clients across three countries and four industries." },
  { year: "2024", title: "Scaling", body: "Now running production systems handling millions of events monthly." },
];

/** Vertical rail that fills as the timeline scrolls through the viewport. */
function Timeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.65 - r.top) / r.height));
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={wrapRef} className={a.timeline}>
      <div className={a.rail} aria-hidden><i ref={fillRef as never} /></div>
      {TIMELINE.map((t, i) => (
        <Reveal key={t.year} delay={i * 0.05} className={a.step}>
          <span className={a.node} aria-hidden />
          <div className={a.year}>{t.year}</div>
          <div>
            <h3 className={a.stepTitle}>{t.title}</h3>
            <p className={a.stepBody}>{t.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div>
      <ScrollProgress />

      {/* ── Hero ── */}
      <ThemeHeroSection plain background="var(--wine)" className="rounded-b-[48px] z-[2] max-md:min-h-0!" contentClassName="justify-end pb-10 pt-[calc(var(--page-offset-top)+0.75rem)]! md:pt-[calc(var(--page-offset-top)+2.5rem)]! md:pb-16">
        <div className={cx(s.metaRow, s.fade)} style={{ animationDelay: ".05s" }}>
          <span>Est. <b>2021</b></span>
          <span>Mumbai, IN</span>
          <span>Engineering studio</span>
        </div>
        <h1 className={cx(s.mega, a.heroMega)}>
          <span className={s.line}><span>We build the</span></span>
          <span className={s.line}><span>systems companies</span></span>
          <span className={s.line}><span style={{ color: "var(--ember)" }}>run on, quietly.</span></span>
        </h1>
        <p className={cx(s.lede, s.fade)} style={{ animationDelay: ".8s", marginTop: "clamp(1.5rem,3vw,2.25rem)" }}>
          Eigensu is a small, deliberate engineering studio. We take the messy internal operations that hold businesses together and turn them into software that holds itself together.
        </p>
      </ThemeHeroSection>

      {/* ── Premise ── */}
      <section className={cx(s.sec, s.statement)}>
        <div className={s.wrap}>
          <div className={s.eyebrow}>Operators first, engineers second</div>
          <ScrollWords parts={PREMISE} />
        </div>
      </section>

      {/* ── Stats ── */}
      <section className={cx(s.sec, s.stats)}>
        <div className={s.wrap}>
          <Reveal><div className={s.eyebrow}>By the numbers</div></Reveal>
          <div className={s.statGrid}>
            {STATS.map((t, i) => (
              <Reveal key={t.lbl} delay={i * 0.08} className={s.stat}>
                <div className={s.statNum}><Counter to={t.n} pad={t.pad} />{t.unit && <sup>{t.unit}</sup>}</div>
                <div className={s.statLbl}>{t.lbl}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className={cx(s.sec, a.principlesSec)}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.eyebrow} style={{ color: "var(--butter)" }}>Principles</div>
            <h2 className={s.h2}>How we think.</h2>
          </Reveal>
          <div className={a.principles}>
            {VALUES.map((v, i) => (
              <Reveal key={v.idx} delay={i * 0.08}>
                <article className={a.principle}>
                  <span className={a.pIdx}>{v.idx}</span>
                  <h3 className={a.pTitle}>{v.title}</h3>
                  <p className={a.pBody}>{v.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className={cx(s.sec, a.timelineSec)}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.eyebrow}>Trajectory</div>
            <h2 className={s.h2} style={{ color: "var(--wine)", marginBottom: "clamp(36px,6vw,72px)" }}>A short history.</h2>
          </Reveal>
          <Timeline />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={s.cta}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.eyebrow} style={{ color: "var(--butter)" }}>Next step</div>
            <h2 className={s.ctaBig}>Are we the<br /><em>right fit?</em></h2>
          </Reveal>
          <div className={s.ctaRow}>
            <p className={s.ctaSub}>A 30-minute call is usually enough to tell. We&rsquo;ll be honest if we&rsquo;re not the right team.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Btn href="/contact" variant="dark">Book a call <Arrow /></Btn>
              <Btn href="/projects" variant="line">See our work</Btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
