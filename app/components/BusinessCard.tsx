"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

/**
 * Contact card: tilts toward the pointer, flips on click to show the three
 * ways to reach us. Replaces the old list of contact details (Nov 2026
 * website review: "card style, book a demo, fewer contact details").
 */
export default function BusinessCard({ onBookDemo }: { onBookDemo: () => void }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 10, y: px * 14 });
  }

  return (
    <div className="bc-wrap">
      <style>{BC_STYLES}</style>
      <div
        ref={ref}
        className="bc-stage"
        onPointerMove={onMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <div className={`bc-card ${flipped ? "flipped" : ""}`}>
          {/* Front */}
          <div
            className="bc-face bc-front"
            aria-hidden={flipped}
            // The whole face flips the card; the email link still works and the button covers keyboard users.
            onClick={(e) => { if (!(e.target as HTMLElement).closest("a, button")) setFlipped(true); }}
          >
            <div className="bc-shine" style={{ transform: `translateX(${tilt.y * 6}px)` }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <img src="/brand/eigensu-logo-dark.svg" alt="Eigensu" width={190} height={45} style={{ width: "clamp(150px,40%,200px)", height: "auto" }} />
              <span className="bc-live"><i />accepting projects</span>
            </div>
            <div>
              <p style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(1.1rem,2.4vw,1.45rem)", letterSpacing: "-0.02em", color: "var(--cream)", marginBottom: 14, maxWidth: "20ch" }}>
                Software, websites and the systems between them.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", fontFamily: MONO, fontSize: "0.72rem", color: "rgba(251,243,228,0.7)" }}>
                <a href="mailto:hello@eigensu.in" style={{ color: "var(--peri)" }} tabIndex={flipped ? -1 : 0}>hello@eigensu.in</a>
                <span>Mumbai, India</span>
              </div>
            </div>
            <button type="button" className="bc-flip" onClick={() => setFlipped(true)} tabIndex={flipped ? -1 : 0}>
              Flip for ways to talk ↻
            </button>
          </div>

          {/* Back */}
          <div className="bc-face bc-back" aria-hidden={!flipped}>
            <div style={{ fontFamily: MONO, fontSize: "0.66rem", letterSpacing: "1.6px", textTransform: "uppercase", color: "rgba(28,25,23,0.7)" }}>Pick one</div>
            <div className="bc-actions">
              <button type="button" onClick={onBookDemo} tabIndex={flipped ? 0 : -1}>
                <b>Book a demo</b><span>See a product live, 20 minutes</span>
              </button>
              <a href="#request" tabIndex={flipped ? 0 : -1}>
                <b>Send a voice note</b><span>Up to 5 min · reply within an hour</span>
              </a>
              <a href="mailto:hello@eigensu.in" tabIndex={flipped ? 0 : -1}>
                <b>Email us</b><span>hello@eigensu.in</span>
              </a>
            </div>
            <button type="button" className="bc-flip dark" onClick={() => setFlipped(false)} tabIndex={flipped ? 0 : -1}>↺ Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const BC_STYLES = `
.bc-wrap{ perspective:1400px; width:100%; max-width:520px; }
.bc-stage{ transition:transform .25s ease-out; transform-style:preserve-3d; }
.bc-card{ position:relative; aspect-ratio:1.62/1; min-height:280px; transform-style:preserve-3d; transition:transform .8s cubic-bezier(.3,1.25,.5,1); }
.bc-card.flipped{ transform:rotateY(180deg); }
.bc-face{ position:absolute; inset:0; border-radius:26px; padding:clamp(20px,4vw,30px); display:flex; flex-direction:column; justify-content:space-between; backface-visibility:hidden; -webkit-backface-visibility:hidden; overflow:hidden; }
.bc-front{ cursor:pointer; background:#1C1917;box-shadow:0 30px 60px -18px rgba(28,25,23,.55), inset 0 0 0 1px rgba(251,243,228,.08); }
.bc-back{ background:var(--peri); transform:rotateY(180deg); box-shadow:0 30px 60px -18px rgba(28,25,23,.45); }
.bc-shine{ position:absolute; inset:-40%; background:radial-gradient(circle at 30% 20%, rgba(92,124,240,.28), transparent 45%); pointer-events:none; transition:transform .25s ease-out; }
.bc-live{ display:inline-flex; align-items:center; gap:7px; font-family:${MONO}; font-size:.6rem; letter-spacing:.08em; text-transform:uppercase; color:#8CE0B0; white-space:nowrap; }
.bc-live i{ width:7px; height:7px; border-radius:50%; background:#F0491F; box-shadow:0 0 0 0 rgba(240,73,31,.6); animation:bcPulse 1.8s infinite; }
@keyframes bcPulse{ 0%{ box-shadow:0 0 0 0 rgba(240,73,31,.55);} 100%{ box-shadow:0 0 0 9px rgba(240,73,31,0);} }
.bc-flip{ align-self:flex-start; font-family:${MONO}; font-size:.66rem; letter-spacing:.1em; text-transform:uppercase; color:rgba(251,243,228,.6); padding:6px 0; position:relative; z-index:1; }
.bc-flip:hover{ color:var(--cream); }
.bc-flip.dark{ color:rgba(28,25,23,.7); }
.bc-flip.dark:hover{ color:#1C1917; }
.bc-actions{ display:grid; gap:8px; }
.bc-actions > *{ display:flex; flex-direction:column; align-items:flex-start; text-align:left; gap:1px; padding:11px 14px; border-radius:14px; background:rgba(251,243,228,.9); color:#1C1917; transition:transform .2s, background .2s; font-family:${BODY}; }
.bc-actions > *:hover{ transform:translateX(4px); background:#fff; }
.bc-actions b{ font-family:${HEAD}; font-size:1rem; letter-spacing:-.01em; }
.bc-actions span{ font-size:.76rem; color:#57534E; }
@media (max-width:480px){ .bc-card{ aspect-ratio:auto; min-height:300px; } }
@media (prefers-reduced-motion: reduce){ .bc-card, .bc-stage{ transition:none; } .bc-live i{ animation:none; } }
`;
