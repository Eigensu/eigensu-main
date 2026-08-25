"use client";

import { useModal } from "../../components/PageShell";
import { Eyebrow, useReveal } from "./shared";

const STYLES = `
.dsp-cta{width:100%;padding:104px 0 56px;margin-top:-48px;position:relative;z-index:1;background:var(--ember);}
.dsp-cta-inner{width:min(1380px, calc(100% - 48px));max-width:760px;margin:0 auto;text-align:center;display:flex;flex-direction:column;align-items:center;opacity:0;transform:translateY(26px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1);}
.dsp-cta-inner.is-in{opacity:1;transform:translateY(0);}
.dsp-cta h2{color:var(--cream);max-width:22ch;font-family:var(--font-head);font-weight:800;letter-spacing:-.03em;line-height:1.08;font-size:clamp(1.8rem,3.4vw,2.8rem);margin:0;}
.dsp-cta .bd{font-size:.95rem;max-width:46ch;margin:18px auto 30px;color:#FFE2D8;line-height:1.5;}
.dsp-cta .btn{display:inline-flex;align-items:center;border-radius:8px;padding:14px 36px;background:var(--wine);color:var(--cream);text-decoration:none;font-family:var(--font-body);font-weight:700;font-size:.85rem;border:none;cursor:pointer;transition:transform .2s ease,box-shadow .2s ease;}
.dsp-cta .btn:hover{transform:translateY(-2px);box-shadow:0 10px 24px -6px rgba(59,10,34,.5);}
.dsp-cta .mono{margin-top:22px;font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:rgba(251,243,228,.6);}
@media(prefers-reduced-motion:reduce){
  .dsp-cta-inner{transition:none !important;opacity:1 !important;transform:none !important;}
}
`;

export default function CtaSection() {
  const { openModal } = useModal();
  const { ref, on } = useReveal(0.2);

  return (
    <section id="dsp-cta" className="dsp-cta">
      <style>{STYLES}</style>
      <div ref={ref} className={`dsp-cta-inner ${on ? "is-in" : ""}`}>
        <Eyebrow dot center color="var(--butter)">
          Ready to take control?
        </Eyebrow>
        <h2>
          Your restaurant has more potential than
          <br />
          your spreadsheets can show.
        </h2>
        <p className="bd">
          DishPatch brings your guests, campaigns and reservations into
          <br />
          one system — so you can finally act on what&rsquo;s happening.
        </p>
        <button type="button" className="btn" onClick={openModal}>
          See DishPatch in Action →
        </button>
        <p className="mono">One platform. Your data. Your restaurant.</p>
      </div>
    </section>
  );
}
