"use client";

import { useState } from "react";
import { Container, useReveal } from "./shared";

const ITEMS: { title: string; body: string }[] = [
  { title: "Build targeted campaigns",   body: "Create focused WhatsApp campaigns through a guided workflow built for restaurant teams." },
  { title: "Schedule every send",        body: "Plan campaigns around the right moment, or launch instantly when an opportunity appears." },
  { title: "Use approved templates",     body: "Browse your Meta-synced templates and send approved messages without leaving the platform." },
  { title: "Personalise at scale",       body: "Turn guest data into messages that feel relevant to each customer, not like a mass broadcast." },
  { title: "Recover failed sends",       body: "See exactly what went wrong, identify failed messages and retry them without rebuilding the campaign." },
  { title: "Test before launch",         body: "Send a test message first and make sure everything looks right before reaching your audience." },
  { title: "Control campaigns live",     body: "Pause or cancel campaigns at any point while keeping complete visibility over what has already gone out." },
  { title: "Protect guest preferences",  body: "Automatically enforce opt-outs and suppression rules across every campaign you send." },
];

const STYLES = `
.dsp-campaigns{width:100%;padding:112px 0 60px;position:relative;background:var(--peri);border-radius:48px 48px 0 0;overflow:hidden;}
.dsp-c-row{display:flex;gap:26px;align-items:center;color:var(--cream);}
.dsp-c-vlabel{writing-mode:vertical-rl;transform:rotate(180deg);font:11px var(--font-mono);letter-spacing:.14em;text-transform:uppercase;flex:none;color:var(--butter);}
.dsp-c-h{font:800 clamp(2rem,3.8vw,3.4rem)/1 var(--font-head);letter-spacing:-.035em;margin:0;padding-left:26px;border-left:2px solid #9BE3B8;color:var(--cream);}

.dsp-f6d-wrap{margin-top:28px;display:grid;grid-template-columns:1fr 1fr;column-gap:32px;border-top:1px solid rgba(251,243,228,.18);}
.dsp-f6d-item{border-bottom:1px solid rgba(251,243,228,.18);opacity:0;transform:translateY(16px);transition:opacity .5s ease,transform .5s ease,border-color .25s ease;}
.dsp-f6d-wrap.is-in .dsp-f6d-item{opacity:1;transform:translateY(0);}
.dsp-f6d-wrap.is-in .dsp-f6d-item:nth-child(1){transition-delay:0s;}
.dsp-f6d-wrap.is-in .dsp-f6d-item:nth-child(2){transition-delay:.06s;}
.dsp-f6d-wrap.is-in .dsp-f6d-item:nth-child(3){transition-delay:.12s;}
.dsp-f6d-wrap.is-in .dsp-f6d-item:nth-child(4){transition-delay:.18s;}
.dsp-f6d-wrap.is-in .dsp-f6d-item:nth-child(5){transition-delay:.24s;}
.dsp-f6d-wrap.is-in .dsp-f6d-item:nth-child(6){transition-delay:.30s;}
.dsp-f6d-wrap.is-in .dsp-f6d-item:nth-child(7){transition-delay:.36s;}
.dsp-f6d-wrap.is-in .dsp-f6d-item:nth-child(8){transition-delay:.42s;}
.dsp-f6d-item.open{border-color:rgba(251,243,228,.32);}
.dsp-f6d-head{width:100%;display:flex;align-items:flex-start;gap:14px;padding:15px 2px;background:none;border:0;cursor:pointer;text-align:left;font-family:inherit;color:#EAF6EE;}
.dsp-f6d-head b{flex:1;font:600 .92rem var(--font-body);letter-spacing:-.01em;}
.dsp-f6d-plus{flex:none;width:22px;height:22px;border:1px solid rgba(251,243,228,.32);border-radius:50%;display:grid;place-items:center;font-size:.85rem;color:#EAF6EE;transition:transform .25s ease,background .25s ease;margin-top:1px;}
.dsp-f6d-item.open .dsp-f6d-plus{transform:rotate(45deg);background:var(--butter);color:var(--wine);border-color:var(--butter);}
.dsp-f6d-body{max-height:0;overflow:hidden;opacity:0;transition:max-height .35s ease,opacity .3s ease;}
.dsp-f6d-item.open .dsp-f6d-body{max-height:140px;opacity:1;transition:max-height .35s ease,opacity .4s ease .05s;}
.dsp-f6d-body p{margin:0;padding:0 2px 16px 36px;font-size:.82rem;line-height:1.5;color:rgba(234,246,238,.72);}

@media(max-width:640px){.dsp-f6d-wrap{grid-template-columns:1fr;}}
@media(prefers-reduced-motion:reduce){
  .dsp-f6d-item{transition:none !important;opacity:1 !important;transform:none !important;}
}
`;

export default function CampaignsSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref, on } = useReveal(0.1);

  return (
    <section id="dsp-campaigns" className="dsp-campaigns">
      <style>{STYLES}</style>
      <Container>
        <div className="dsp-c-row">
          <div className="dsp-c-vlabel">Campaign Engine</div>
          <h2 className="dsp-c-h">Reach the right guests, without the marketing overhead.</h2>
        </div>

        <div ref={ref} className={`dsp-f6d-wrap ${on ? "is-in" : ""}`}>
          {ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.title} className={`dsp-f6d-item ${open ? "open" : ""}`}>
                <button
                  type="button"
                  className="dsp-f6d-head"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                >
                  <b>{item.title}</b>
                  <span className="dsp-f6d-plus">+</span>
                </button>
                <div className="dsp-f6d-body">
                  <p>{item.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
