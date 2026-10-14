import Link from "next/link";
import { notFound } from "next/navigation";
import ContentPage from "../../components/content/ContentPage";
import CtaPanel from "../../components/content/CtaPanel";
import Related from "../../components/content/Related";
import Sources from "../../components/content/Sources";
import { INDUSTRIES, getIndustry } from "../../content/industries";
import { FEATURES } from "../../content/product";
import { templatesFor } from "../../content/templates";
import { CATEGORY_LABELS, WHATSAPP_INDIA } from "../../content/facts";
import { pageMetadata } from "../../lib/metadata";
import { PRODUCT } from "../../lib/site";

const UPDATED = "2026-10-14";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ industry: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/for/[industry]">) {
  const industry = getIndustry((await params).industry);
  if (!industry) return {};
  return pageMetadata({ title: industry.title, description: industry.description, path: `/for/${industry.slug}` });
}

export default async function IndustryPage({ params }: PageProps<"/for/[industry]">) {
  const industry = getIndustry((await params).industry);
  if (!industry) notFound();
  const examples = templatesFor(industry.slug).filter((t) => t.featured).slice(0, 3);

  return (
    <ContentPage
      crumbs={[{ name: PRODUCT.name, path: PRODUCT.path }, { name: industry.label, path: `/for/${industry.slug}` }]}
      eyebrow={`${PRODUCT.name} // for ${industry.noun}`}
      title={industry.title}
      intro={industry.intro}
      updated={UPDATED}
    >
      <section id="when">
        <h2>When should {industry.noun} message customers on WhatsApp?</h2>
        <div className="card-grid">
          {industry.moments.map((m) => (
            <div className="card" key={m.heading}>
              <h3>{m.heading}</h3>
              <p>{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="examples">
        <h2>Three example messages for {industry.noun}</h2>
        <p>
          Adapt these, then submit them to Meta for approval as templates. Each is labelled with the category Meta would most likely charge it as; marketing messages cost {WHATSAPP_INDIA.marketing.display} and utility messages {WHATSAPP_INDIA.utility.display} to Indian numbers.
        </p>
        {examples.map((t) => (
          <div key={t.id} style={{ marginBottom: 22 }}>
            <h3>{t.name}</h3>
            <p className="note"><span className="tag">{CATEGORY_LABELS[t.category]}</span>{t.use}</p>
            <div className="msg">{t.body}</div>
          </div>
        ))}
        <p>
          More examples: <Link href={`/templates#${industry.slug}`}>WhatsApp templates for {industry.noun}</Link>.
        </p>
      </section>

      <section id="features">
        <h2>What {PRODUCT.name} gives {industry.noun}</h2>
        <ul className="bullets">
          {industry.features.map((k) => (
            <li key={k}><strong>{FEATURES[k].title}.</strong> {FEATURES[k].body}</li>
          ))}
        </ul>
        <p>
          Costs: see <Link href="/pricing">WhatsApp pricing in India</Link> or estimate your bill with the <Link href="/whatsapp-cost-calculator">cost calculator</Link>.
        </p>
      </section>

      <Sources sources={WHATSAPP_INDIA.marketing.sources} asOf={WHATSAPP_INDIA.effectiveFrom} />

      <CtaPanel heading={`See ${PRODUCT.name} for ${industry.noun}`} />

      <Related
        links={[
          ...INDUSTRIES.filter((i) => i.slug !== industry.slug).map((i) => ({ href: `/for/${i.slug}`, label: i.title })),
          { href: "/guides/whatsapp-error-131049", label: "Why some marketing messages aren't delivered (error 131049)" },
        ]}
      />
    </ContentPage>
  );
}
