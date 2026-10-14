"use client";

import { useState } from "react";
import Reveal from "../Reveal";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";

function Eyebrow({ children, color = "var(--accent)" }: { children: React.ReactNode; color?: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase" as const, color, marginBottom: 18 }}>
      {children}
    </div>
  );
}

const FAQ_ITEMS = [
  { q: "What does an engagement actually look like?", a: "We start with a scoping call to map your workflow, then send a fixed-scope proposal within a week. Once approved, we build in short, visible sprints — you see working software early and often, not a black box that appears at the end." },
  { q: "How long does a typical project take?", a: "Most internal tools and automations ship in 3–8 weeks depending on scope. We'll give you a concrete timeline during scoping — not a range that quietly slips." },
  { q: "Do you work with our existing stack?", a: "Yes. Systems integration is one of our core disciplines — we connect to whatever ERPs, databases, SaaS tools or internal APIs you already run, rather than asking you to replace them." },
  { q: "What happens after launch?", a: "Every build includes a handover period plus ongoing support options. We stay reachable for fixes, tweaks and scaling questions — we're not a vendor that disappears after go-live." },
  { q: "How is pricing structured?", a: "Fixed-scope pricing agreed upfront after the scoping call, so there are no surprise invoices. For ongoing integration work we also offer retainer arrangements." },
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative z-10 py-14 md:py-20 lg:py-24" style={{ background: "var(--basil)", scrollMarginTop: "var(--page-offset-top)" }}>
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
        <div style={{ maxWidth: 560, marginBottom: 34 }}>
          <Eyebrow color="var(--butter)">Questions</Eyebrow>
          <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: "clamp(2rem,4.2vw,4rem)", letterSpacing: "-0.04em", lineHeight: 0.98, color: "var(--cream)" }}>Frequently asked.</h2>
        </div>
        <Reveal>
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} style={{ borderTop: i === 0 ? "1px solid rgba(251,243,228,0.18)" : "none", borderBottom: "1px solid rgba(251,243,228,0.18)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, background: "none", border: 0, textAlign: "left", padding: "22px 2px", cursor: "pointer", color: "var(--cream)" }}
                >
                  <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "1.1rem", lineHeight: 1.3, letterSpacing: "-0.02em", margin: 0 }}>{item.q}</h3>
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", border: "1px solid rgba(251,243,228,0.32)", display: "grid", placeItems: "center", background: isOpen ? "var(--butter)" : "transparent", color: isOpen ? "var(--wine)" : "var(--cream)", fontSize: "1.1rem", lineHeight: 1, transition: "all .25s ease" }}>{isOpen ? "−" : "+"}</span>
                </button>
                <div style={{ maxHeight: isOpen ? 220 : 0, overflow: "hidden", transition: "max-height .35s ease" }}>
                  <p style={{ margin: 0, padding: "0 2px 24px", maxWidth: "62ch", color: "rgba(251,243,228,0.7)", fontSize: "0.94rem", lineHeight: 1.7 }}>{item.a}</p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
