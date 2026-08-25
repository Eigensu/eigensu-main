"use client";

import { useModal } from "../../components/PageShell";

const HERO_STYLES = `
.dsp-hero{
  position:relative;
  width:100%;
  overflow:hidden;
  padding:126px 0 52px;
  background:var(--wine);
  color:var(--cream);
  border-radius:0 0 48px 48px;
}
.dsp-hero-glow{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.dsp-hero-glow .bottom{position:absolute;width:720px;height:720px;right:-300px;bottom:-380px;border-radius:50%;background:var(--ember);opacity:.15;animation:dsp-glow-pulse 7s ease-in-out infinite;}
.dsp-hero-glow .side-l{position:absolute;width:520px;height:520px;left:-340px;top:15%;border:1px solid rgba(255,197,61,.2);border-radius:50%;animation:dsp-glow-float 10s ease-in-out infinite;}
.dsp-hero-glow .side-r{position:absolute;width:240px;height:240px;right:10%;top:-130px;border:1px solid rgba(251,243,228,.08);border-radius:50%;animation:dsp-glow-float 8s ease-in-out infinite reverse;}
.dsp-hero-grid{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) minmax(380px,1fr);gap:60px;align-items:center;max-width:1380px;width:calc(100% - 48px);margin:0 auto;}
.dsp-hero-grid > div:first-child{max-width:625px;padding-left:28px;}
.dsp-hero h1{margin:0 0 26px;max-width:700px;font-family:var(--font-head);font-size:clamp(3.8rem,6vw,6.6rem);font-weight:800;line-height:.9;letter-spacing:-.055em;color:var(--cream);animation:dsp-rise .8s cubic-bezier(.16,1,.3,1) both;}
.dsp-hero h1 span{color:var(--ember);}
.dsp-hero p{max-width:545px;margin:0 0 30px;color:rgba(251,243,228,.72);font-size:1rem;line-height:1.65;animation:dsp-rise .8s cubic-bezier(.16,1,.3,1) .12s both;}
.dsp-hero .btn-row{display:flex;flex-wrap:wrap;gap:16px;animation:dsp-rise .8s cubic-bezier(.16,1,.3,1) .22s both;}
.dsp-hero .btn{display:inline-flex;align-items:center;min-height:43px;padding:11px 18px;border-radius:11px;font-family:var(--font-body);font-size:.82rem;font-weight:700;text-decoration:none;cursor:pointer;border:none;transition:transform .2s ease,box-shadow .2s ease;}
.dsp-hero .btn:hover{transform:translateY(-2px);}
.dsp-hero .btn-primary{background:var(--ember);color:#fff;border:1px solid var(--ember);}
.dsp-hero .btn-primary:hover{box-shadow:0 10px 24px -6px rgba(240,73,31,.55);}
.dsp-hero .btn-ghost{color:var(--cream);border:1px solid rgba(251,243,228,.28);background:transparent;}
.dsp-phone-wrap{display:flex;align-items:center;justify-content:center;min-width:0;animation:dsp-phone-in .9s cubic-bezier(.16,1,.3,1) .18s both;}
.dsp-phone{width:320px;max-width:100%;padding:16px 15px 19px;border-radius:28px;background:#ece5dd;box-shadow:25px 35px 80px rgba(0,0,0,.35);overflow:hidden;}
.dsp-phone-head{display:flex;align-items:center;gap:9px;margin:-16px -15px 0;padding:12px 16px;border-radius:18px 18px 0 0;background:var(--cream);}
.dsp-phone-head .av{width:33px;height:33px;flex:0 0 33px;display:grid;place-items:center;border-radius:50%;background:var(--ember);color:#fff;font:700 10px var(--font-mono);}
.dsp-phone-head .n{color:var(--wine);font-size:.81rem;font-weight:700;}
.dsp-phone-head .s{margin-top:2px;color:var(--muted);font-size:.63rem;}
.dsp-phone-body{min-height:210px;padding:12px 4px;display:flex;flex-direction:column;gap:6px;}
.dsp-bubble{max-width:82%;padding:8px 11px;border-radius:10px;color:#161616;font-size:.71rem;line-height:1.35;opacity:0;animation:dsp-bubble-in .5s ease forwards;}
.dsp-bubble.out{align-self:flex-end;background:var(--basil);color:var(--cream);}
.dsp-bubble.in{align-self:flex-start;background:#fff;}
.dsp-bubble .time{margin-top:3px;color:#888;text-align:right;font-size:.55rem;}
.dsp-bubble.out .time{color:rgba(251,243,228,.65);}
.dsp-bubble .tick{color:#53bdeb;}
.dsp-bubble.out .tick{color:var(--cream);}
.dsp-phone-input{display:flex;align-items:center;gap:7px;margin:3px 4px 0;}
.dsp-phone-input-field{flex:1 1 auto;min-width:0;padding:8px 13px;border-radius:999px;background:#fff;color:var(--muted);font-size:.69rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.dsp-phone-send{width:30px;height:30px;flex:0 0 30px;display:grid;place-items:center;border-radius:50%;background:var(--basil);color:var(--cream);font-size:.74rem;}

@media(max-width:820px){
  .dsp-hero{padding:105px 0 68px;}
  .dsp-hero-grid{grid-template-columns:1fr;gap:50px;}
  .dsp-hero-grid > div:first-child{padding-left:0;}
  .dsp-hero h1{font-size:clamp(3.05rem,10.25vw,4.7rem);}
  .dsp-phone-wrap{justify-content:flex-start;}
  .dsp-phone{width:290px;}
}
@media(max-width:600px){
  .dsp-hero{padding:89px 0 60px;}
  .dsp-hero h1{font-size:clamp(2.7rem,12.5vw,4.05rem);}
  .dsp-phone{width:260px;}
}

@keyframes dsp-rise{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
@keyframes dsp-phone-in{from{opacity:0;transform:translateY(30px) scale(.96);}to{opacity:1;transform:translateY(0) scale(1);}}
@keyframes dsp-bubble-in{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
@keyframes dsp-glow-pulse{0%,100%{opacity:.15;}50%{opacity:.26;}}
@keyframes dsp-glow-float{0%,100%{transform:translateY(0);}50%{transform:translateY(-22px);}}

@media(prefers-reduced-motion:reduce){
  .dsp-hero h1,.dsp-hero p,.dsp-hero .btn-row,.dsp-phone-wrap,.dsp-bubble,
  .dsp-hero-glow .bottom,.dsp-hero-glow .side-l,.dsp-hero-glow .side-r{
    animation:none !important;opacity:1 !important;transform:none !important;
  }
}
`;

const MESSAGES: { dir: "out" | "in"; text: string; time: string; tick?: boolean }[] = [
  { dir: "out", text: "Hi Priya! Hope you enjoyed your visit to Spice Bistro last week 🙏", time: "11:45", tick: true },
  { dir: "in",  text: "It was amazing! The biryani was incredible.", time: "11:46" },
  { dir: "out", text: "So glad! 😊 We have an exclusive 20% off just for you this weekend.", time: "11:46", tick: true },
  { dir: "in",  text: "Oh wow! Count me in. Can I book for Saturday?", time: "11:47" },
  { dir: "out", text: "Absolutely! Reserve here ➤ spicebistro.com/book", time: "11:48", tick: true },
];

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="dsp-hero">
      <style>{HERO_STYLES}</style>
      <div className="dsp-hero-glow">
        <div className="bottom" />
        <div className="side-l" />
        <div className="side-r" />
      </div>
      <div className="dsp-hero-grid">
        <div>
          <h1>
            Turn every guest, outlet and interaction into something <span>you can act on</span>.
          </h1>
          <p>
            DishPatch brings your guest data, segmentation, campaigns, conversations,
            analytics and restaurant operations into one connected platform.
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn-primary" onClick={openModal}>
              Book a Demo
            </button>
            <a href="#dsp-modules" className="btn btn-ghost">
              Explore the Platform
            </a>
          </div>
        </div>

        <div className="dsp-phone-wrap">
          <div className="dsp-phone">
            <div className="dsp-phone-head">
              <div className="av">SB</div>
              <div>
                <div className="n">Spice Bistro</div>
                <div className="s">Campaign sending…</div>
              </div>
            </div>
            <div className="dsp-phone-body">
              {MESSAGES.map((m, i) => (
                <div
                  key={i}
                  className={`dsp-bubble ${m.dir}`}
                  style={{ animationDelay: `${0.7 + i * 0.22}s` }}
                >
                  {m.text}
                  <div className="time">
                    {m.time}
                    {m.tick && <span className="tick">✓✓</span>}
                  </div>
                </div>
              ))}
            </div>
            <div className="dsp-phone-input">
              <div className="dsp-phone-input-field">Type a message…</div>
              <div className="dsp-phone-send">➤</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
