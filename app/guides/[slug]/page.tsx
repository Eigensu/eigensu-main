import Link from "next/link";
import { notFound } from "next/navigation";
import ContentPage from "../../components/content/ContentPage";
import CtaPanel from "../../components/content/CtaPanel";
import JsonLd from "../../components/content/JsonLd";
import Related from "../../components/content/Related";
import Sources from "../../components/content/Sources";
import { GUIDES, getGuide } from "../../content/guides";
import { robotsFor } from "../../content/status";
import { pageMetadata } from "../../lib/metadata";
import { PRODUCT, SITE, absoluteUrl } from "../../lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">) {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return { ...pageMetadata({ title: g.title, description: g.description, path: `/guides/${g.slug}` }), robots: robotsFor(g.status) };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const url = absoluteUrl(`/guides/${g.slug}`);

  return (
    <ContentPage
      crumbs={[{ name: "Guides", path: "/guides" }, { name: g.title, path: `/guides/${g.slug}` }]}
      eyebrow="Guide"
      title={g.title}
      intro={g.intro}
      published={g.published}
      updated={g.updated}
      author={g.author}
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: g.title,
          description: g.description,
          datePublished: g.published,
          dateModified: g.updated,
          author: { "@type": "Organization", name: g.author, url: absoluteUrl("/") },
          publisher: { "@id": absoluteUrl("/#organization"), "@type": "Organization", name: SITE.name },
          mainEntityOfPage: url,
          url,
          inLanguage: "en-IN",
        }}
      />

      <nav aria-label="On this page" className="note" style={{ marginBottom: 36 }}>
        <strong>On this page:</strong>{" "}
        {g.sections.map((s, i) => (
          <span key={s.id}>{i > 0 && " · "}<a href={`#${s.id}`}>{s.question}</a></span>
        ))}
      </nav>

      {g.sections.map((s) => (
        <section key={s.id} id={s.id}>
          <h2>{s.question}</h2>
          <p className="answer">{s.answer}</p>
          {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
          {s.list && <ul className="bullets">{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
          {s.table && (
            <div className="table-wrap">
              <table>
                <caption>{s.table.caption}</caption>
                <thead><tr>{s.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr></thead>
                <tbody>{s.table.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => (i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>))}</tr>)}</tbody>
              </table>
            </div>
          )}
        </section>
      ))}

      {g.disclaimer && <p className="note">{g.disclaimer}</p>}

      <p>
        Estimate your own costs with the <Link href="/whatsapp-cost-calculator">WhatsApp cost calculator</Link> or see <Link href="/pricing">pricing</Link>.
      </p>

      <Sources sources={g.sources} />

      <CtaPanel />

      <Related
        links={[
          ...GUIDES.filter((x) => x.slug !== g.slug && x.status === "published").map((x) => ({ href: `/guides/${x.slug}`, label: x.title })),
          { href: "/templates", label: "WhatsApp message templates by industry" },
          { href: PRODUCT.path, label: PRODUCT.name },
        ]}
      />
    </ContentPage>
  );
}
