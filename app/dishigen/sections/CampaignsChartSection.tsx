"use client";

import type { ReactNode } from "react";
import { Container, useReveal } from "./shared";

const GUESTS: { name: string; badge: string; why: string; msg: ReactNode }[] = [
  {
    name: "Priya",
    badge: "At risk",
    why: "34 days since last visit",
    msg: <>Hi <b>Priya</b>, we&rsquo;d love to have you back at <b>Spice Bistro</b>&hellip;</>,
  },
  {
    name: "Rahul",
    badge: "VIP",
    why: "₹6,420 lifetime spend",
    msg: <><b>Rahul</b>, your exclusive dining experience awaits&hellip;</>,
  },
  {
    name: "Anita",
    badge: "Dormant",
    why: "7 previous visits",
    msg: <><b>Anita</b>, it&rsquo;s been a while since we saw you&hellip;</>,
  },
];

const STATS: { n: string; label: string }[] = [
  { n: "12,480", label: "Messages tracked" },
  { n: "97%", label: "Delivered" },
  { n: "71%", label: "Read" },
  { n: "1,264", label: "Conversations started" },
];

const STYLES = `
.dsp-campaigns-chart{width:100%;padding:60px 0 112px;position:relative;z-index:2;background:var(--peri);border-radius:0 0 48px 48px;overflow:hidden;}
.dsp-f7-stack{display:flex;flex-direction:column;gap:32px;}

.dsp-cas-wrap{display:flex;flex-direction:column;align-items:center;}
.dsp-cas-label{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--butter);margin-bottom:22px;text-align:center;}
.dsp-cas-root{background:var(--cream);border:1px solid rgba(59,10,34,.12);border-radius:14px;padding:18px 30px;text-align:center;min-width:280px;box-shadow:0 10px 30px rgba(0,0,0,.18);}
.dsp-cas-name{font-family:var(--font-head);font-weight:800;font-size:1.15rem;letter-spacing:-.02em;color:var(--wine);}
.dsp-cas-meta{font-family:var(--font-mono);font-size:10px;letter-spacing:.04em;color:var(--muted);margin-top:6px;}
.dsp-cas-branch{width:100%;max-width:900px;height:50px;display:block;}
.dsp-cas-guests{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;width:100%;margin-top:-2px;}
.dsp-cas-guest{border-radius:16px;padding:24px 22px 26px;border:1px solid rgba(59,10,34,.12);background:var(--cream);box-shadow:0 8px 24px rgba(0,0,0,.1);}
.dsp-cas-guest-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:14px;}
.dsp-cas-guest-name{font-family:var(--font-head);font-weight:800;font-size:1.25rem;letter-spacing:-.01em;color:var(--wine);}
.dsp-cas-guest-badge{font-family:var(--font-mono);font-size:9px;letter-spacing:.06em;text-transform:uppercase;font-weight:700;padding:5px 11px;border-radius:100px;white-space:nowrap;background:var(--wine);color:var(--butter);}
.dsp-cas-guest-why{display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:10px;letter-spacing:.04em;text-transform:uppercase;font-weight:700;color:var(--ember);background:rgba(240,73,31,.1);border:1px solid rgba(240,73,31,.25);border-radius:100px;padding:6px 12px;margin-bottom:16px;}
.dsp-cas-guest-why:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--ember);flex:none;}
.dsp-cas-guest-msg{font-size:.92rem;line-height:1.55;color:var(--wine);}
.dsp-cas-guest-msg b{color:var(--ember);font-weight:800;}

.dsp-d9-wrap{background:rgba(0,0,0,.16);color:var(--cream);border-radius:16px;padding:22px 24px;}
.dsp-d9-stats{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;row-gap:22px;column-gap:12px;text-align:center;}
.dsp-d9-stat b{display:block;font-family:var(--font-head);font-weight:800;font-size:clamp(26px,3vw,34px);letter-spacing:-.03em;color:var(--butter);line-height:1;}
.dsp-d9-stat span{display:block;font-family:var(--font-mono);font-size:11px;letter-spacing:.03em;color:rgba(251,243,228,.6);margin-top:6px;}

@media(max-width:820px){.dsp-cas-guests{grid-template-columns:1fr;} .dsp-d9-stats{grid-template-columns:1fr 1fr;}}
`;

export default function CampaignsChartSection() {
  const { ref, on } = useReveal(0.15);

  return (
    <section id="dsp-campaigns-chart" className="dsp-campaigns-chart">
      <style>{STYLES}</style>
      <Container>
        <div ref={ref} className="dsp-f7-stack">
          <div className="dsp-cas-wrap">
            <div className="dsp-cas-label">One campaign. Personalised by guest.</div>

            <div className="dsp-cas-root">
              <div className="dsp-cas-name">Weekend Customer Campaign</div>
              <div className="dsp-cas-meta">WhatsApp · 3 audience rules · Personalisation enabled</div>
            </div>

            <svg className="dsp-cas-branch" viewBox="0 0 900 50" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M450,0 V25 M150,25 H750 M150,25 V50 M450,25 V50 M750,25 V50"
                fill="none"
                stroke="rgba(251,243,228,.35)"
                strokeWidth="2"
              />
            </svg>

            <div className="dsp-cas-guests">
              {GUESTS.map((g) => (
                <div key={g.name} className="dsp-cas-guest">
                  <div className="dsp-cas-guest-head">
                    <span className="dsp-cas-guest-name">{g.name}</span>
                    <span className="dsp-cas-guest-badge">{g.badge}</span>
                  </div>
                  <div className="dsp-cas-guest-why">{g.why}</div>
                  <div className="dsp-cas-guest-msg">{g.msg}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="dsp-d9-wrap">
            <div className="dsp-d9-stats">
              {STATS.map((s) => (
                <div key={s.label} className="dsp-d9-stat">
                  <b style={{ opacity: on ? 1 : 0, transition: "opacity .6s ease" }}>{s.n}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
