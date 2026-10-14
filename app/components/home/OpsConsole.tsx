"use client";

import { useEffect, useState } from "react";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";

export default function OpsConsole() {
  const [tick, setTick] = useState(true);
  useEffect(() => { const id = setInterval(() => setTick(t => !t), 850); return () => clearInterval(id); }, []);
  const BARS = [42, 61, 38, 78, 55, 90, 47, 68, 83, 59, 72, 95];
  return (
    <div style={{ background: "var(--cream)", border: "1px solid rgba(59,10,34,0.14)", borderRadius: 28, padding: 14, overflow: "hidden", boxShadow: "24px 30px 60px rgba(59,10,34,0.28)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 10px 15px" }}>
        <div style={{ display: "flex", gap: 8 }}>
          {["#FF7661","var(--butter)","#65C58A"].map(c => <i key={c} style={{ width: 9, height: 9, borderRadius: "50%", display: "block", background: c }} />)}
        </div>
        <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "0.08em", color: "rgba(59,10,34,0.55)" }}>ops_console — live</span>
      </div>
      <div style={{ background: "#260616", borderRadius: 18, padding: 18 }}>
        {[
          { label: "invoice_sync",     tag: "active",  tc: "#72D69A", tb: "rgba(101,197,138,0.13)" },
          { label: "inventory_recon",  tag: "running", tc: "#FF8064", tb: "rgba(240,73,31,0.15)" },
          { label: "approval_routing", tag: "queued",  tc: "var(--butter)", tb: "rgba(255,197,61,0.14)" },
        ].map(row => (
          <div key={row.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 14px", border: "1px solid rgba(251,243,228,0.1)", borderRadius: 10, marginBottom: 9, background: "rgba(251,243,228,0.045)" }}>
            <span style={{ fontFamily: MONO, fontSize: "0.75rem", color: "rgba(251,243,228,0.72)" }}>{row.label}</span>
            <span style={{ fontFamily: MONO, fontSize: "0.62rem", letterSpacing: "0.05em", padding: "5px 8px", borderRadius: 999, textTransform: "uppercase", color: row.tc, background: row.tb }}>{row.tag}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 95, padding: "15px 12px", border: "1px solid rgba(251,243,228,0.1)", borderRadius: 10, marginTop: 14 }}>
          {BARS.map((h, i) => <div key={i} style={{ flex: 1, background: i % 4 === 2 ? "var(--peri)" : "var(--ember)", opacity: 0.9, borderRadius: "3px 3px 0 0", height: `${h}%` }} />)}
        </div>
        <div style={{ marginTop: 10, background: "#12030a", borderRadius: 9, padding: "12px 13px", fontFamily: MONO, fontSize: "0.68rem", color: "rgba(251,243,228,0.62)" }}>
          <b style={{ color: "#72D69A" }}>eigensu ▸</b>
          {" deploy --pipeline ops.core"}
          <span style={{ display: "inline-block", width: 6, height: 12, background: "var(--ember)", marginLeft: 4, verticalAlign: "-2px", opacity: tick ? 0.9 : 0, transition: "opacity .1s" }} />
        </div>
      </div>
    </div>
  );
}
