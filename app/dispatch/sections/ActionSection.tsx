"use client";

import { Container, Eyebrow, useReveal } from "./shared";

const STYLES = `
.dsp-action{width:100%;padding:112px 0;position:relative;background:#F4E9D6;}
.dsp-action h2{margin:0;max-width:920px;font-family:var(--font-head);font-weight:800;font-size:clamp(2.6rem,5vw,5rem);line-height:.95;letter-spacing:-.05em;color:var(--wine);}
.dsp-action .bd{margin-top:12px;max-width:60ch;font-size:.96rem;line-height:1.65;color:var(--muted);}

.dpa-term{margin-top:48px;max-width:720px;margin-left:auto;margin-right:auto;background:var(--wine);border:1px solid rgba(251,243,228,.14);border-radius:16px;padding:32px;font-family:var(--font-mono);}
.dpa-term-title{text-align:center;font-size:13px;letter-spacing:.15em;text-transform:uppercase;color:var(--butter);margin-bottom:24px;}
.dpa-term-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-bottom:16px;}
.dpa-term-box{border:1px dashed rgba(255,197,61,.4);border-radius:8px;padding:18px 20px;}
.dpa-term-box .h{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--butter);margin-bottom:14px;}
.dpa-term-box .row{font-size:13px;line-height:2;color:var(--cream);}
.dpa-term-box .row.up{color:#8CE0B0;}
.dpa-term-bar{display:flex;align-items:center;gap:10px;margin-bottom:8px;}
.dpa-term-bar span{font-size:12px;color:var(--cream);flex:0 0 56px;}
.dpa-term-bar .track{flex:1;height:9px;background:rgba(251,243,228,.14);border-radius:2px;overflow:hidden;}
.dpa-term-bar .track i{display:block;height:100%;background:var(--ember);}
.dpa-term-panel{border:1px dashed rgba(255,197,61,.4);border-radius:8px;padding:20px 22px;}
.dpa-term-panel .h{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--butter);margin-bottom:14px;}
.dpa-term-stats{font-size:13px;color:var(--cream);margin-bottom:16px;}
.dpa-term-quote{display:flex;justify-content:space-between;gap:16px;font-size:12.5px;padding:6px 0;}
.dpa-term-quote span{color:rgba(251,243,228,.62);}
.dpa-term-quote i{font-style:normal;color:#8CE0B0;letter-spacing:.04em;}
.dpa-term-arrow{text-align:center;margin-top:20px;color:rgba(251,243,228,.5);font-size:1.1rem;}

@media(max-width:600px){
  .dpa-term{padding:22px;}
  .dpa-term-grid{grid-template-columns:1fr;}
}
`;

const OUTLETS = [
  { name: "Bombay", pct: 88 },
  { name: "Bandra", pct: 58 },
  { name: "Powai", pct: 40 },
];

const QUOTES = [
  { text: "Can I book Saturday?", tag: "RESERVATION" },
  { text: "Is the offer still on?", tag: "OFFER" },
];

export default function ActionSection() {
  const { ref, on } = useReveal(0.2);

  return (
    <section id="dsp-action" className="dsp-action">
      <style>{STYLES}</style>
      <Container>
        <Eyebrow dot>FROM DATA TO DECISION</Eyebrow>
        <h2>See what happens after the data starts working.</h2>
        <p className="bd">
          DishPatch connects guest activity, campaigns, conversations and business performance
          into one measurable flow.
        </p>

        <div ref={ref} className="dpa-term">
          <div className="dpa-term-title">DishPatch Intelligence</div>
          <div className="dpa-term-grid">
            <div className="dpa-term-box">
              <div className="h">Guest Health</div>
              <div className="row">18% at risk</div>
              <div className="row">2,246 guests</div>
              <div className="row up">↑ 14.6%</div>
            </div>
            <div className="dpa-term-box">
              <div className="h">Campaign Performance</div>
              <div className="row">12,480 sent</div>
              <div className="row">97% delivered</div>
              <div className="row">71% read</div>
              <div className="row">10.1% replied</div>
            </div>
            <div className="dpa-term-box">
              <div className="h">Campaign Economics</div>
              <div className="row">₹84.6K revenue</div>
              <div className="row">₹6.4K spend</div>
              <div className="row">13.2× return</div>
            </div>
            <div className="dpa-term-box">
              <div className="h">Outlet Performance</div>
              {OUTLETS.map((o) => (
                <div key={o.name} className="dpa-term-bar">
                  <span>{o.name}</span>
                  <div className="track">
                    <i style={{ width: on ? `${o.pct}%` : "0%", transition: "width 1s cubic-bezier(0.16,1,0.3,1)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="dpa-term-panel">
            <div className="h">What Your Guests Are Saying</div>
            <div className="dpa-term-stats">1,264 replies &nbsp;·&nbsp; 62% resolved &nbsp;·&nbsp; 18m response</div>
            {QUOTES.map((q) => (
              <div key={q.tag} className="dpa-term-quote">
                <span>&quot;{q.text}&quot;</span>
                <i>→ {q.tag}</i>
              </div>
            ))}
          </div>
          <div className="dpa-term-arrow">↓</div>
        </div>
      </Container>
    </section>
  );
}
