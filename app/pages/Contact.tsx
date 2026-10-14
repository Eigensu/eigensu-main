import Link from "next/link";
import { ThemeHeroSection } from "../components/ThemeHero";
import Reveal from "../components/Reveal";
import ContactForm from "../components/forms/ContactForm";
import { SITE, whatsappHref } from "../lib/site";

const MONO = "var(--font-mono), 'Space Mono', ui-monospace, monospace";
const HEAD = "var(--font-head), 'Bricolage Grotesque', sans-serif";
const BODY = "var(--font-body), 'Instrument Sans', sans-serif";

const INFO_ITEMS = [
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>, label: "Email", value: SITE.enquiryEmail, href: `mailto:${SITE.enquiryEmail}` },
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 9h.01M7 13h5"/></svg>, label: "LinkedIn", value: "/company/eigensu", href: SITE.linkedin },
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>, label: "Business", value: `${SITE.legalName} · ${SITE.location}`, href: null },
  { icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>, label: "Response time", value: "Within 24 hours, on business days", href: null },
];

// TODO(owner): add the registered legal entity name and address to SITE.legalName.
const WHATSAPP_ITEM = whatsappHref()
  ? [{ icon: <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} style={{ width: 17, height: 17, stroke: "var(--accent)" }}><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.7L4 20z"/></svg>, label: "WhatsApp", value: "Message us on WhatsApp", href: whatsappHref() }]
  : [];

const ITEMS = [...INFO_ITEMS.slice(0, 1), ...WHATSAPP_ITEM, ...INFO_ITEMS.slice(1)];

export default function ContactPage() {

  return (
    <div>
      {/* ── Hero ── */}
      <ThemeHeroSection>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "2px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 16 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--text-dim)", flexShrink: 0 }} />
          Contact // let&apos;s talk
        </div>
        <h1 className="hero-anim-3" style={{ fontFamily: HEAD, fontWeight: 700, fontSize: "clamp(2rem,5vw,3.8rem)", lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--text)", maxWidth: "14ch", margin: "0 0 20px" }}>
          Start a <span style={{ color: "var(--accent)" }}>conversation</span>.
        </h1>
        <p className="hero-anim-4" style={{ color: "var(--text-muted)", fontSize: "clamp(0.95rem,1.4vw,1.1rem)", maxWidth: "46ch", lineHeight: 1.7 }}>
          Whether it&apos;s a quick question or a full project, we read everything that comes in.
        </p>
      </ThemeHeroSection>

      {/* ── Contact grid ── */}
      <section className="relative z-10 py-14 md:py-20 lg:py-24">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-10">
          <Reveal threshold={0.08} className="grid gap-10 md:gap-14 md:grid-cols-2 md:items-start">
            {/* Info panel */}
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(15,77,46,0.08)", border: "1px solid rgba(15,77,46,0.2)", borderRadius: 100, padding: "7px 14px", marginBottom: 32 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ok)", boxShadow: "0 0 8px var(--ok)", animation: "availPulse 2s infinite" }} />
                <span style={{ fontFamily: MONO, fontSize: "0.72rem", letterSpacing: "1px", color: "var(--ok)" }}>Currently accepting new projects</span>
              </div>
              <style>{`@keyframes availPulse { 0%,100%{box-shadow:0 0 0 0 rgba(15,77,46,.5)} 70%{box-shadow:0 0 0 8px rgba(15,77,46,0)} }`}</style>

              <div>
                {ITEMS.map((item, i) => (
                  <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "18px 0", borderBottom: i < ITEMS.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid var(--border)", display: "grid", placeItems: "center", flexShrink: 0, background: "var(--panel)" }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: MONO, fontSize: "0.68rem", letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--text-dim)", marginBottom: 4 }}>{item.label}</div>
                      {item.href ? <a href={item.href} {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} style={{ fontFamily: BODY, fontSize: "0.92rem", color: "var(--text)" }}>{item.value}</a> : <span style={{ fontFamily: BODY, fontSize: "0.92rem", color: "var(--text)" }}>{item.value}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 28 }}>
                <p style={{ fontFamily: BODY, fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 18 }}>
                  Want to skip the form? You can also onboard a project directly — takes about two minutes.
                </p>
                <Link href="/onboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: BODY, fontWeight: 600, fontSize: "0.88rem", padding: "11px 18px", borderRadius: 100, background: "var(--accent)", color: "var(--on-accent)", boxShadow: "0 0 0 1px var(--accent-line)", textDecoration: "none" }}>Start a project</Link>
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
