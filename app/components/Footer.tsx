import Link from "next/link";
import type { ReactNode } from "react";
import { PRODUCT, SITE } from "../lib/site";
import CookieSettingsButton from "./analytics/CookieSettingsButton";

const SERVICES_LINKS = [
  { label: "Operations Automation", href: "/services" },
  { label: "Internal Tooling",      href: "/services" },
  { label: "Systems Integration",   href: "/services" },
  { label: "Case Studies",          href: "/projects" },
];

const PRODUCT_LINKS = [
  { label: PRODUCT.name,      href: PRODUCT.path },
  { label: "Pricing",         href: "/pricing" },
  { label: "Cost calculator", href: "/whatsapp-cost-calculator" },
  { label: "Templates",       href: "/templates" },
  { label: "Guides",          href: "/guides" },
];

const COMPANY_LINKS = [
  { label: "About",    href: "/about" },
  { label: "Process",  href: "/process" },
  { label: "Careers",  href: "/careers" },
  { label: "FAQ",      href: "/#faq" },
];

const HELP_LINKS = [
  { label: "Contact",        href: "/contact" },
  { label: "Support",        href: `mailto:${SITE.supportEmail}` },
  { label: "Privacy policy", href: "/privacy" },
];

const SOCIAL_LINKS = [
  { label: "Eigensu on LinkedIn", href: SITE.linkedin, glyph: "in" },
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
    <div className="footer-link-group">
      <h4 style={{ color: color === "peri" ? "var(--peri)" : "var(--cream)" }}>{title}</h4>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterSun() {
  return (
    <svg className="footer-sun" viewBox="0 0 440 220" width="440" height="220">
      <path d="M0,220 A220,220 0 0 1 440,220 Z" fill="var(--peri)" aria-hidden="true" />
      <path id="footerSunTextArc" d="M60,220 A160,160 0 0 1 380,220" fill="none" aria-hidden="true" />
      <a href={`mailto:${SITE.supportEmail}`}>
        <text fontFamily="var(--font-mono), 'Space Mono', monospace" fontWeight={700} fontSize={16} letterSpacing={2} fill="var(--cream)">
          <textPath href="#footerSunTextArc" startOffset="50%" textAnchor="middle">
            {SITE.supportEmail}
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
              <FooterLinkGroup title="Product"   color="cream" links={PRODUCT_LINKS} />
              <FooterLinkGroup title="Company"   color="peri"  links={COMPANY_LINKS} />
              <FooterLinkGroup title="Help"      color="cream" links={HELP_LINKS} />
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <div className="footer-social">
                {SOCIAL_LINKS.map((s, i) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ color: i % 2 === 0 ? "var(--cream)" : "var(--peri)" }}>
                    <span aria-hidden="true">{s.glyph}</span>
                    <span className="sr-only">{s.label}</span>
                  </a>
                ))}
              </div>
              {/* TODO(owner): add the registered legal entity name and address. */}
              <span className="footer-addr">{SITE.legalName} · {SITE.location}</span>
            </div>
            <div className="footer-bottom-meta">
              <span>&copy; {new Date().getFullYear()} {SITE.legalName}. All rights reserved.</span>
              <span className="meta-sep">&middot;</span>
              <Link href="/privacy">Privacy policy</Link>
              <CookieSettingsButton className="footer-meta-btn" />
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
        .footer-link-group h4{
          font-family:var(--font-head), 'Bricolage Grotesque', sans-serif;
          font-weight:700;
          font-size:1.35rem;
          line-height:1;
          letter-spacing:-.02em;
          margin:0 0 18px;
        }
        .footer-link-group ul{
          list-style:none;
          margin:0;
          padding:0;
          display:grid;
          gap:12px;
          justify-items:end;
        }
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
        .footer-bottom-meta .footer-meta-btn{ color:var(--peri); font-weight:700; }
        .footer-bottom-meta .footer-meta-btn:hover{ color:#fff; }
        .footer-bottom-meta .meta-sep{ color:rgba(251,243,228,.35); }

        @media(max-width:900px){
          .footer-hero{ grid-template-columns:1fr; gap:36px; }
          .footer-links-grid{ grid-template-columns:1fr 1fr; gap:32px 40px; }
        }
        @media(max-width:750px){
          .footer-bottom{ flex-direction:column; align-items:flex-start; }
        }
      `}</style>
    </footer>
  );
}
