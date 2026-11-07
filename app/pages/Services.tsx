"use client";

import Link from "next/link";
import { ThemeHeroSection } from "../components/ThemeHero";
import { Reveal, ScrollProgress, cx, useMagnetic } from "../components/motion";
import s from "../home.module.css";
import e from "./editorial.module.css";

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

const DISCIPLINES = [
  { id: "automation",  idx: "01", title: "Operations Automation", body: "Event-driven pipelines that handle the repetitive, rules-based work humans shouldn't be touching — sync, route, reconcile, notify." },
  { id: "tooling",     idx: "02", title: "Internal Tooling",      body: "Dashboards, admin consoles and internal products designed around your actual workflow — not a generic SaaS template." },
  { id: "integration", idx: "03", title: "Systems Integration",   body: "Make your existing stack behave like one system — clean data contracts between ERPs, CRMs, finance and ops tools." },
];

const PROCESS = [
  { idx: "01", tag: "Discovery", title: "Map",      body: "We sit with your team and document the workflow as it actually runs today." },
  { idx: "02", tag: "Planning",  title: "Scope",    body: "A fixed proposal: what we'll build, the timeline, and the measurable outcome." },
  { idx: "03", tag: "Execution", title: "Build",    body: "Weekly working demos. You see progress, not status decks." },
  { idx: "04", tag: "Delivery",  title: "Handover", body: "Documented, monitored and yours — with support if you want it." },
];

/* ── Code window ── */
type Tok = [cls: "cm" | "kw" | "fn" | "str" | "num" | "pun" | "def", text: string];
const TOK: Record<Tok[0], string | undefined> = { cm: e.tCm, kw: e.tKw, fn: e.tFn, str: e.tStr, num: e.tNum, pun: e.tPun, def: undefined };

function CodeWindow({ file, lines }: { file: string; lines: Tok[][] }) {
  return (
    <figure className={e.code}>
      <figcaption className={e.codeBar}>
        {["#FF7661", "var(--butter)", "#65C58A"].map(c => <i key={c} style={{ background: c }} aria-hidden />)}
        <span className={e.codeFile}>{file}</span>
      </figcaption>
      <div className={e.codeBody}>
        {lines.map((line, n) => (
          <div key={n} className={e.codeLine}>
            <span className={e.codeNum} aria-hidden>{n + 1}</span>
            <span>{line.map(([t, text], i) => <span key={i} className={TOK[t]}>{text}</span>)}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}

const WORKFLOW: Tok[][] = [
  [["cm", "// reconcile vendor invoices nightly"]],
  [["kw", "export const "], ["fn", "invoiceSync"], ["pun", " = "], ["fn", "workflow"], ["pun", "({"]],
  [["def", "  trigger"], ["pun", ": "], ["fn", "schedule"], ["pun", "("], ["str", '"0 2 * * *"'], ["pun", "),"]],
  [["def", "  retries"], ["pun", ": "], ["num", "3"], ["pun", ","]],
  [["fn", "  run"], ["pun", ": "], ["kw", "async"], ["pun", " ({ step }) => {"]],
  [["kw", "    const "], ["def", "rows "], ["pun", "= "], ["kw", "await "], ["def", "step"], ["pun", "."], ["fn", "fetch"], ["pun", "("], ["str", '"erp.invoices"'], ["pun", ");"]],
  [["kw", "    const "], ["def", "matched "], ["pun", "= "], ["fn", "reconcile"], ["pun", "(rows, ledger);"]],
  [["kw", "    await "], ["def", "step"], ["pun", "."], ["fn", "commit"], ["pun", "(matched);"]],
  [["kw", "    return "], ["pun", "{ synced: matched.length };"]],
  [["pun", "  },"]],
  [["pun", "});"]],
];

const CONTRACT: Tok[][] = [
  [["kw", "source"], ["pun", ": "], ["str", "crm.deals"]],
  [["kw", "target"], ["pun", ": "], ["str", "warehouse.revenue"]],
  [["kw", "mode"], ["pun", ": "], ["str", "stream"]],
  [["kw", "contract"], ["pun", ":"]],
  [["fn", "  deal_id"], ["pun", ": "], ["kw", "string"], ["pun", " !"]],
  [["fn", "  amount"], ["pun", ": "], ["kw", "number"], ["pun", " !"]],
  [["fn", "  closed_at"], ["pun", ": "], ["kw", "timestamp"]],
  [["kw", "on_error"], ["pun", ": "], ["str", "dead_letter"]],
  [["kw", "alerts"], ["pun", ":"]],
  [["fn", "  channel"], ["pun", ": "], ["str", '"#ops-alerts"']],
  [["fn", "  threshold"], ["pun", ": "], ["num", "0.99"]],
];

/* ── Internal tool mock ── */
const QUEUE = [
  { name: "Vendor payout · Batch 14", sub: "Finance · 32 lines", amt: "₹4,18,200", tag: "Approved", fg: "var(--basil)", bg: "rgba(15,77,46,.1)" },
  { name: "Stock transfer · WH-2 → WH-5", sub: "Ops · 120 SKUs", amt: "1,240 units", tag: "Review", fg: "#9A6A00", bg: "rgba(255,197,61,.22)" },
  { name: "Refund · Order 88213", sub: "Support · flagged", amt: "₹12,450", tag: "Escalated", fg: "var(--ember)", bg: "rgba(240,73,31,.1)" },
  { name: "Onboarding · New outlet", sub: "HR · 6 tasks", amt: "4 / 6", tag: "In progress", fg: "var(--peri)", bg: "rgba(92,124,240,.12)" },
];

function ConsoleMock() {
  return (
    <div className={e.console} role="img" aria-label="Illustration of an internal approvals console with sample data">
      <div className={e.consoleTop} aria-hidden>
        <span><b>approvals</b> / today</span>
        <span>sample data</span>
      </div>
      <div className={e.consoleBody} aria-hidden>
        <div className={e.kpis}>
          {[["18", "Pending"], ["2.4h", "Avg. cycle"], ["0", "Lost in email"]].map(([n, l]) => (
            <div key={l} className={e.kpi}><div className={e.kpiNum}>{n}</div><div className={e.kpiLbl}>{l}</div></div>
          ))}
        </div>
        {QUEUE.map(q => (
          <div key={q.name} className={e.row}>
            <span>{q.name}<span className={e.rowSub}>{q.sub}</span></span>
            <span className={e.rowAmt}>{q.amt}</span>
            <span className={e.pill} style={{ color: q.fg, background: q.bg }}>{q.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Discipline({ d, dark, heading, lede, checks, label, panel }: {
  d: (typeof DISCIPLINES)[number]; dark?: boolean; heading: string; lede: string; checks: string[]; label: string; panel: React.ReactNode;
}) {
  return (
    <div className={cx(e.disc, dark && e.onDark)}>
      <Reveal className={e.discText}>
        <div className={e.discIdx}>{d.idx} — {d.title}</div>
        <h2 className={e.discTitle}>{heading}</h2>
        <p className={e.discLede}>{lede}</p>
        <ul className={e.checks}>{checks.map(c => <li key={c}>{c}</li>)}</ul>
      </Reveal>
      <Reveal delay={0.1}>
        <p className={e.panelLabel}>{label}</p>
        {panel}
      </Reveal>
    </div>
  );
}

export default function ServicesPage() {
  const [auto, tool, integ] = DISCIPLINES;
  return (
    <div>
      <ScrollProgress />

      {/* ── Hero ── */}
      <ThemeHeroSection plain background="var(--wine)" className="rounded-b-[48px] z-[2] max-md:min-h-0!" contentClassName="justify-end pb-10 pt-[calc(var(--page-offset-top)+0.75rem)]! md:pt-[calc(var(--page-offset-top)+2.5rem)]! md:pb-16">
        <div className={cx(s.metaRow, s.fade)} style={{ animationDelay: ".05s" }}>
          <span>Services</span>
          <span><b>03</b> disciplines</span>
          <span>Fixed-scope engagements</span>
        </div>
        <h1 className={cx(s.mega, e.heroMega)}>
          <span className={s.line}><span>Everything between</span></span>
          <span className={s.line}><span>a problem and a</span></span>
          <span className={s.line}><span style={{ color: "var(--ember)" }}>system that solves it.</span></span>
        </h1>
        <p className={cx(s.lede, s.fade)} style={{ animationDelay: ".8s", marginTop: "clamp(1.5rem,3vw,2.25rem)" }}>
          We don&rsquo;t sell seats or licences. We build the specific machinery your operation needs and hand it over running.
        </p>
        <div className={cx(e.heroActions, s.fade)} style={{ animationDelay: "1s" }}>
          <Btn href="/onboard">Scope a project <Arrow /></Btn>
          <Btn href="/process" variant="line">How we work</Btn>
        </div>
      </ThemeHeroSection>

      {/* ── Index ── */}
      <section className={cx(s.sec, e.first)}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.eyebrow}>What we do</div>
            <h2 className={s.h2} style={{ color: "var(--wine)", maxWidth: "14ch" }}>Three disciplines. One outcome.</h2>
          </Reveal>
          <div className={s.svcList}>
            {DISCIPLINES.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.08}>
                <a href={`#${d.id}`} className={s.svc}>
                  <span className={s.svcIdx}>{d.idx}</span>
                  <h3 className={s.svcTitle}>{d.title}</h3>
                  <p className={s.svcBody}>{d.body}</p>
                  <span className={s.svcArrow} style={{ rotate: "90deg" }}><Arrow /></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 01 Automation ── */}
      <section id={auto.id} className={cx(s.sec, e.plain, e.anchor)} style={{ paddingTop: 0 }}>
        <div className={s.wrap}>
          <Discipline
            d={auto}
            heading="Workflows you can read like a sentence."
            lede="Every automation we ship is declarative and versioned. No black-box drag-and-drop — your team can see exactly what triggers, what runs, and what happens on failure."
            checks={["Trigger on schedule, webhook or queue event", "Built-in retries, alerting and audit trail", "Deploys through CI — fully reproducible"]}
            label="Example · a nightly reconciliation job"
            panel={<CodeWindow file="invoice_sync.ops.ts" lines={WORKFLOW} />}
          />
        </div>
      </section>

      {/* ── 02 Tooling ── */}
      <section id={tool.id} className={cx(s.sec, e.wineBlock, e.anchor)}>
        <div className={s.wrap}>
          <Discipline
            d={tool}
            dark
            heading="Tools your team opens without being asked."
            lede="We design internal products the way you'd design for customers: around the job to be done, the exceptions, and the people who use them eight hours a day."
            checks={["Role-based views for every team", "Approvals, queues and audit history built in", "Fast on the hardware your team actually has"]}
            label="Example · an approvals console"
            panel={<ConsoleMock />}
          />
        </div>
      </section>

      {/* ── 03 Integration ── */}
      <section id={integ.id} className={cx(s.sec, e.afterBlock, e.anchor)}>
        <div className={s.wrap}>
          <Discipline
            d={integ}
            heading="Integrations that don't break at 2am."
            lede="We define explicit contracts between your systems, so a field rename in one tool never silently corrupts another. Typed, validated, observable."
            checks={["Schema-validated payloads on every hop", "Dead-letter handling for bad records", "Live health metrics per connection"]}
            label="Example · a CRM → warehouse contract"
            panel={<CodeWindow file="integration.config.yaml" lines={CONTRACT} />}
          />
        </div>
      </section>

      {/* ── Process ── */}
      <section className={cx(s.sec, e.basilBlock)}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.eyebrow} style={{ color: "var(--butter)" }}>How we work</div>
            <h2 className={s.h2}>Four steps,<br />no surprises.</h2>
          </Reveal>
          <div className={e.steps}>
            {PROCESS.map((p, i) => (
              <Reveal key={p.idx} delay={i * 0.08} className={e.step}>
                <div className={e.stepNum}>{p.idx}</div>
                <div className={e.stepTag}>{p.tag}</div>
                <h3 className={e.stepTitle}>{p.title}</h3>
                <p className={e.stepBody}>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={s.cta}>
        <div className={s.wrap}>
          <Reveal>
            <div className={s.eyebrow} style={{ color: "var(--butter)" }}>Next step</div>
            <h2 className={s.ctaBig}>Got a process<br /><em>worth fixing?</em></h2>
          </Reveal>
          <div className={s.ctaRow}>
            <p className={s.ctaSub}>Tell us how it runs today. We&rsquo;ll come back with a fixed scope, a timeline and the outcome we&rsquo;ll measure.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Btn href="/onboard" variant="dark">Onboard a project <Arrow /></Btn>
              <Btn href="/contact" variant="line">Talk to us</Btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
