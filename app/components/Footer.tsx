"use client";

import Link from "next/link";
import type { ReactNode } from "react";

const SERVICES_LINKS = [
  { label: "Operations Automation", href: "/services" },
  { label: "Internal Tooling",      href: "/services" },
  { label: "Systems Integration",   href: "/services" },
  { label: "Case Studies",          href: "/projects" },
];

const RESOURCES_LINKS = [
  { label: "Insights",  href: "/blog" },
  { label: "Changelog", href: "#" },
  { label: "Pricing",   href: "#" },
  { label: "Security",  href: "#" },
];

const COMPANY_LINKS = [
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Careers",  href: "/careers" },
  { label: "FAQ",      href: "#" },
];

const HELP_LINKS = [
  { label: "Contact",        href: "/contact" },
  { label: "Support",        href: "mailto:hello@eigensu.in" },
  { label: "Status",         href: "#" },
  { label: "Legal policies", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "X / Twitter", href: "#", glyph: "𝕏" },
  { label: "LinkedIn",    href: "#", glyph: "in" },
  { label: "GitHub",      href: "#", glyph: "◐" },
  { label: "YouTube",     href: "#", glyph: "▶" },
];

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href}>
        {children}
        <span className="footer-arrow">↗</span>
      </Link>
    );
  }
  return (
    <a href={href}>
      {children}
      <span className="footer-arrow">↗</span>
    </a>
  );
}

function FooterLinkGroup({
  title,
  color,
  links,
}: {
  title: string;
  color: "peri" | "cream";
  links: { label: string; href: string }[];
}) {
  return (
    <details className="footer-link-group">
      <summary style={{ color: color === "peri" ? "var(--peri)" : "var(--cream)" }}>
        {title}
        <svg className="footer-caret" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </summary>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </details>
  );
}

function FooterSun() {
  return (
    <svg className="footer-sun" viewBox="0 0 440 220" width="440" height="220" aria-hidden="true">
      <path d="M0,220 A220,220 0 0 1 440,220 Z" fill="var(--peri)" />
      <path id="footerSunTextArc" d="M60,220 A160,160 0 0 1 380,220" fill="none" />
      <a href="mailto:hello@eigensu.in">
        <text fontFamily="var(--font-mono), 'Space Mono', monospace" fontWeight={700} fontSize={16} letterSpacing={2} fill="var(--cream)">
          <textPath href="#footerSunTextArc" startOffset="50%" textAnchor="middle">
            hello@eigensu.in
          </textPath>
        </text>
      </a>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <FooterSun />

      <div className="footer-main">
        <div className="footer-wrap">
          <div className="footer-hero">
            <p className="footer-lockup">
              <span>EIGEN</span>
              <span className="fl-su">SU</span>
            </p>

            <div className="footer-links-grid">
              <FooterLinkGroup title="Services"  color="peri"  links={SERVICES_LINKS} />
              <FooterLinkGroup title="Resources" color="cream" links={RESOURCES_LINKS} />
              <FooterLinkGroup title="Company"   color="peri"  links={COMPANY_LINKS} />
              <FooterLinkGroup title="Help"      color="cream" links={HELP_LINKS} />
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <div className="footer-social">
                {SOCIAL_LINKS.map((s, i) => (
                  <a key={s.label} href={s.href} aria-label={s.label} style={{ color: i % 2 === 0 ? "var(--cream)" : "var(--peri)" }}>
                    {s.glyph}
                  </a>
                ))}
              </div>
              <a href="mailto:hello@eigensu.in" className="footer-email-inline">hello@eigensu.in</a>
              <span className="footer-addr">2261 Market Street #5039, San Francisco, CA 94114</span>
            </div>
            <div className="footer-bottom-meta">
              <span>&copy; {new Date().getFullYear()} Eigensu. All rights reserved.</span>
              <span className="meta-sep">&middot;</span>
              <a href="#">Privacy policy</a>
              <span className="meta-sep">&middot;</span>
              <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer{
          position:relative;
          overflow-x:hidden;
          background:var(--wine);
          color:var(--cream);
        }
        .footer-sun{
          position:absolute;
          left:55%;
          bottom:0;
          transform:translateX(-50%);
          width:440px;
          height:220px;
          z-index:0;
        }
        .footer-sun path{ pointer-events:none; }
        .footer-sun a{ pointer-events:auto; cursor:pointer; }
        .footer-sun a text{ transition:.2s ease; }
        .footer-sun a:hover text{ fill:#fff; }

        .footer-main{ padding:28px 0 0; position:relative; z-index:1; }
        .footer-wrap{ width:min(1380px, calc(100% - 48px)); margin:0 auto; }

        .footer-hero{
          display:grid;
          grid-template-columns:1.1fr 1fr;
          gap:6px;
          align-items:start;
          padding-bottom:56px;
        }

        .footer-lockup{
          margin:0 0 0 -14px;
          width:100%;
          container-type:inline-size;
        }
        .footer-lockup span{
          display:block;
          width:100%;
          margin:0;
          padding:0;
          font-family:var(--font-head), 'Bricolage Grotesque', sans-serif;
          font-weight:800;
          font-size:clamp(4.8rem, 40cqw, 20rem);
          line-height:.78;
          letter-spacing:-.045em;
          color:var(--cream);
          white-space:nowrap;
        }
        .footer-lockup .fl-su{ color:var(--peri); }

        .footer-links-grid{
          display:grid;
          grid-template-columns:repeat(2,1fr);
          gap:44px 48px;
          padding-top:44px;
          text-align:right;
        }
        .footer-link-group summary{
          font-family:var(--font-head), 'Bricolage Grotesque', sans-serif;
          font-weight:700;
          font-size:1.35rem;
          line-height:1;
          letter-spacing:-.02em;
          margin:0 0 18px;
          display:flex;
          align-items:center;
          justify-content:flex-end;
          gap:8px;
          list-style:none;
          cursor:default;
        }
        .footer-link-group summary::-webkit-details-marker{ display:none; }
        .footer-link-group summary::marker{ content:""; }
        .footer-caret{ display:none; flex-shrink:0; transition:transform .25s ease; }
        .footer-link-group ul{
          list-style:none;
          margin:0;
          padding:0;
          gap:12px;
          justify-items:end;
        }
        .footer-link-group[open] > ul{ display:grid; }
        .footer-link-group a{
          font-size:.92rem;
          color:rgba(251,243,228,.72);
          text-decoration:none;
          display:inline-flex;
          align-items:center;
          gap:6px;
        }
        .footer-link-group a:hover{ color:#fff; }
        .footer-arrow{
          display:inline-block;
          opacity:0;
          transform:translateX(-4px);
          transition:opacity .2s ease, transform .2s ease;
          font-size:.78em;
        }
        .footer-link-group a:hover .footer-arrow{ opacity:1; transform:translateX(0); }

        .footer-bottom{
          padding:26px 0;
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:20px;
          flex-wrap:wrap;
          color:rgba(251,243,228,.55);
          font-family:var(--font-mono), 'Space Mono', monospace;
          font-size:11px;
          font-weight:700;
          letter-spacing:.03em;
        }
        .footer-bottom-left{ display:flex; align-items:center; gap:20px; flex-wrap:wrap; }
        .footer-addr{
          color:rgba(251,243,228,.7);
          line-height:1.5;
          font-size:.88rem;
          font-weight:600;
        }
        .footer-social{ display:flex; gap:20px; }
        .footer-social a{
          display:grid;
          place-items:center;
          font-size:1.3rem;
          font-weight:700;
          text-decoration:none;
          transition:.25s ease;
        }
        .footer-social a:hover{ transform:translateY(-3px) scale(1.12); }
        .footer-email-inline{
          display:none;
          font-family:var(--font-mono), 'Space Mono', monospace;
          font-size:.78rem;
          font-weight:700;
          letter-spacing:.03em;
          color:var(--peri);
          text-decoration:none;
        }
        .footer-email-inline:hover{ color:#fff; }
        .footer-bottom-meta{
          display:flex;
          align-items:center;
          gap:10px;
          flex-wrap:wrap;
          font-family:var(--font-body), 'Instrument Sans', sans-serif;
          font-size:.88rem;
          font-weight:600;
          letter-spacing:0;
        }
        .footer-bottom-meta a{ color:var(--peri); font-weight:700; text-decoration:none; }
        .footer-bottom-meta a:hover{ color:#fff; }
        .footer-bottom-meta .meta-sep{ color:rgba(251,243,228,.35); }

        @media(min-width:901px){
          .footer-link-group ul{ display:grid; }
        }
        @media(max-width:900px){
          .footer-main{ padding-top:18px; }
          .footer-hero{ grid-template-columns:1fr; gap:22px; padding-bottom:28px; }
          .footer-lockup span{ font-size:clamp(2.6rem, 27cqw, 5.6rem); }
          .footer-links-grid{ grid-template-columns:1fr 1fr; gap:8px 28px; padding-top:16px; }
          .footer-link-group{ border-bottom:1px solid rgba(251,243,228,.14); }
          .footer-link-group summary{ font-size:1rem; margin:0; padding:14px 0; cursor:pointer; -webkit-tap-highlight-color:transparent; }
          .footer-caret{ display:block; }
          .footer-link-group[open] .footer-caret{ transform:rotate(180deg); }
          .footer-link-group ul{ gap:10px; padding:2px 0 16px; }
          .footer-link-group a{ font-size:.78rem; }
          .footer-bottom{ padding:16px 0; }
          .footer-sun{ display:none; }
          .footer-email-inline{ display:inline-flex; align-items:center; }
        }
        @media(max-width:750px){
          .footer-bottom{ flex-direction:column; align-items:flex-start; }
        }
        @media(max-width:480px){
          .footer-links-grid{ gap:4px 22px; }
          .footer-link-group summary{ font-size:.94rem; padding:12px 0; }
          .footer-link-group a{ font-size:.74rem; }
        }
      `}</style>
    </footer>
  );
}
