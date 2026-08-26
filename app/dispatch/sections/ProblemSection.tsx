"use client";

import { Container, Eyebrow, useReveal } from "./shared";

const CELLS: { num: string; tag: string; title: string; body: string }[] = [
  { num: "01", tag: "Access",    title: "Identity & roles",       body: "Owners, managers and viewers — scoped per outlet, not per account." },
  { num: "02", tag: "Reporting", title: "Intelligence hub",       body: "Live delivery rates, template leaderboards and exportable reports." },
  { num: "03", tag: "Sending",   title: "Campaign engine",        body: "WhatsApp and email, scheduled or immediate, with retry on failure." },
  { num: "04", tag: "Content",   title: "Template studio",        body: "Sync approved WhatsApp templates and build emails with live preview." },
  { num: "05", tag: "Data",      title: "Guest intelligence",     body: "One profile per guest from NFC, e-cards, Excel and reservations." },
  { num: "06", tag: "Hygiene",   title: "Contact management",     body: "Validation, deduplication and a suppression list that's always enforced." },
  { num: "07", tag: "Support",   title: "Guest inbox",            body: "Every reply in a shared inbox, with unread counts and resolution." },
  { num: "08", tag: "Bookings",  title: "Reservation sync",       body: "Visit history and spend pulled in, so segments write themselves." },
];

const ROTATIONS = ["-2deg", "1.5deg", "-1deg", "2deg", "-1.5deg", "1deg", "-2.5deg", "1.5deg"];

const STYLES = `
.dsp-problem{width:100%;padding:112px 0;position:relative;background:#F4E9D6;}
.dsp-problem h2{margin:0;max-width:920px;font-family:var(--font-head);font-weight:800;font-size:clamp(2.6rem,5vw,5rem);line-height:.95;letter-spacing:-.05em;color:var(--wine);}
.dsp-problem .bd{margin:12px 0 0;max-width:64ch;font-size:.96rem;line-height:1.65;color:var(--muted);}
.dsp-f8-grid{margin-top:56px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:36px 24px;}
.dsp-f8-cell{position:relative;overflow:hidden;background:#fff;border:1px solid rgba(59,10,34,.18);border-radius:10px;padding:20px 22px 22px;box-shadow:0 10px 24px rgba(59,10,34,.14);transition:transform .25s ease,box-shadow .25s ease;}
.dsp-f8-cell::after{content:"";position:absolute;top:0;right:0;width:0;height:0;border-style:solid;border-width:0 22px 22px 0;border-color:transparent var(--accent) transparent transparent;}
.dsp-f8-cell:hover{box-shadow:0 16px 32px rgba(59,10,34,.2);transform:rotate(0deg) translateY(-4px) !important;}
.dsp-f8-top{display:flex;align-items:center;gap:9px;margin-bottom:16px;}
.dsp-f8-num{font:700 11px var(--font-mono);color:#C43D17;flex:none;}
.dsp-f8-k{font:700 10px var(--font-mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted);}
.dsp-f8-cell b{display:block;font:700 1.1rem var(--font-head);letter-spacing:-.02em;margin-bottom:10px;color:var(--wine);}
.dsp-f8-cell p{margin:0;font-size:.85rem;line-height:1.55;color:var(--wine-2);}
@media(max-width:1050px){.dsp-f8-grid{grid-template-columns:repeat(2,minmax(0,1fr));}}
@media(max-width:600px){.dsp-f8-grid{grid-template-columns:1fr;}.dsp-f8-cell{transform:none !important;}}
`;

export default function ProblemSection() {
  const { ref, on } = useReveal(0.05);

  return (
    <section id="dsp-problem" className="dsp-problem">
      <style>{STYLES}</style>
      <Container>
        <Eyebrow>THE PROBLEM</Eyebrow>
        <h2>Running your restaurant shouldn&apos;t mean running eight systems.</h2>
        <p className="bd">
          From guest relationships to reservations, campaigns, analytics and finance, critical
          information is still fragmented across disconnected tools.
        </p>

        <div ref={ref} className="dsp-f8-grid">
          {CELLS.map((c, i) => (
            <div
              key={c.num}
              className="dsp-f8-cell"
              style={{
                transform: on ? `rotate(${ROTATIONS[i]}) translateY(0)` : "rotate(0deg) translateY(12px)",
                opacity: on ? 1 : 0,
                transition: `opacity .5s ease ${i * 0.05}s, transform .5s ease ${i * 0.05}s`,
              }}
            >
              <div className="dsp-f8-top">
                <span className="dsp-f8-num">{c.num}</span>
                <span className="dsp-f8-k">{c.tag}</span>
              </div>
              <b>{c.title}</b>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
