import Link from "next/link";
import ContentPage from "../components/content/ContentPage";
import CtaPanel from "../components/content/CtaPanel";
import Related from "../components/content/Related";
import Sources from "../components/content/Sources";
import { INDUSTRIES } from "../content/industries";
import { templatesFor } from "../content/templates";
import { CATEGORY_LABELS, WHATSAPP_INDIA } from "../content/facts";
import { pageMetadata } from "../lib/metadata";
import { PRODUCT } from "../lib/site";

const UPDATED = "2026-10-14";

export const metadata = pageMetadata({
  title: "WhatsApp message templates by industry",
  description: "WhatsApp message templates for restaurants, salons, gyms, clinics and retail stores: booking confirmations, reminders, win-backs and offers, ready to adapt and submit to Meta.",
  path: "/templates",
});

export default function TemplatesPage() {
  return (
    <ContentPage
      crumbs={[{ name: PRODUCT.name, path: PRODUCT.path }, { name: "Templates", path: "/templates" }]}
      eyebrow="Templates"
      title="WhatsApp message templates by industry"
      intro="These WhatsApp message templates are starting points for businesses built on repeat visits. Adapt the wording, keep the {{1}}-style variables for each customer's details, and submit them to Meta for approval before sending."
      updated={UPDATED}
    >
      <nav aria-label="Industries" className="note" style={{ marginBottom: 36 }}>
        <strong>Jump to:</strong>{" "}
        {INDUSTRIES.map((i, n) => (
          <span key={i.slug}>{n > 0 && " · "}<a href={`#${i.slug}`}>{i.label}</a></span>
        ))}
      </nav>

      <section id="categories">
        <h2>Which template category should you choose?</h2>
        <p className="answer">
          Choose utility for updates about something the customer started, such as a booking or an order, and marketing for offers and re-engagement. Meta charges {WHATSAPP_INDIA.utility.display} for utility and {WHATSAPP_INDIA.marketing.display} for marketing messages to Indian numbers.
        </p>
        <p>Meta decides the final category when it reviews a template. Every marketing example below ends with a way to opt out.</p>
      </section>

      {INDUSTRIES.map((i) => (
        <section key={i.slug} id={i.slug}>
          <h2>WhatsApp templates for {i.noun}</h2>
          {templatesFor(i.slug).map((t) => (
            <div key={t.id} style={{ marginBottom: 20 }}>
              <h3>{t.name}</h3>
              <p className="note"><span className="tag">{CATEGORY_LABELS[t.category]}</span>{t.use}</p>
              <div className="msg">{t.body}</div>
            </div>
          ))}
          <p><Link href={`/for/${i.slug}`}>How {PRODUCT.name} works for {i.noun} →</Link></p>
        </section>
      ))}

      <Sources sources={WHATSAPP_INDIA.marketing.sources} asOf={WHATSAPP_INDIA.effectiveFrom} />

      <CtaPanel />

      <Related
        links={[
          { href: "/pricing", label: "WhatsApp Business API pricing in India" },
          { href: "/whatsapp-cost-calculator", label: "WhatsApp cost calculator" },
          { href: "/guides/whatsapp-error-131049", label: "Error 131049 and marketing message limits" },
        ]}
      />
    </ContentPage>
  );
}
