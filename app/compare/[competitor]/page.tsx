import Link from "next/link";
import { notFound } from "next/navigation";
import ContentPage from "../../components/content/ContentPage";
import CtaPanel from "../../components/content/CtaPanel";
import Related from "../../components/content/Related";
import { COMPETITORS, getCompetitor } from "../../content/competitors";
import { FEATURES } from "../../content/product";
import { formatDate } from "../../content/facts";
import { robotsFor } from "../../content/status";
import { pageMetadata } from "../../lib/metadata";
import { PRODUCT } from "../../lib/site";

const UPDATED = "2026-10-14";

export const dynamicParams = false;

export function generateStaticParams() {
  return COMPETITORS.map((c) => ({ competitor: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/compare/[competitor]">) {
  const c = getCompetitor((await params).competitor);
  if (!c) return {};
  return {
    ...pageMetadata({
      title: `${c.name} alternative for repeat-visit businesses: ${PRODUCT.name} compared`,
      description: `Looking for a ${c.name} alternative? A side-by-side look at ${c.name} and ${PRODUCT.name} pricing and features, with a source and date for every ${c.name} figure.`,
      path: `/compare/${c.slug}`,
    }),
    robots: robotsFor(c.status),
  };
}

export default async function ComparePage({ params }: PageProps<"/compare/[competitor]">) {
  const c = getCompetitor((await params).competitor);
  if (!c) notFound();

  return (
    <ContentPage
      crumbs={[{ name: PRODUCT.name, path: PRODUCT.path }, { name: `${c.name} alternative`, path: `/compare/${c.slug}` }]}
      eyebrow={`Compare // ${c.name}`}
      title={`${c.name} alternative: how ${PRODUCT.name} compares`}
      intro={`If you are looking for a ${c.name} alternative, this page puts the two side by side. ${PRODUCT.description} Every ${c.name} figure below links to a public source with the date it was checked, so you can verify it before deciding.`}
      updated={UPDATED}
      wide
    >
      <section id="comparison">
        <h2>How do {c.name} and {PRODUCT.name} compare on price?</h2>
        <div className="table-wrap">
          <table>
            <caption>{c.name} figures as published by the sources listed; check {c.name}&apos;s own pricing page for current prices</caption>
            <thead>
              <tr><th scope="col"> </th><th scope="col">{c.name}</th><th scope="col">{PRODUCT.name}</th></tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>
                    {r.competitor.text}
                    {r.competitor.caveat && <><br /><span className="note">{r.competitor.caveat}</span></>}
                    <br />
                    <span className="note">
                      Source:{" "}
                      {r.competitor.sources.map((s, i) => (
                        <span key={s.url}>{i > 0 && "; "}<a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></span>
                      ))}
                      , checked {formatDate(r.competitor.checked)}
                    </span>
                  </td>
                  <td>{r.dishigen}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">
          {c.name}&apos;s official pricing: <a href={c.officialPricingUrl} target="_blank" rel="noopener noreferrer">{c.officialPricingUrl}</a>. Prices exclude GST unless stated.
        </p>
      </section>

      <section id="dishigen">
        <h2>What does {PRODUCT.name} focus on?</h2>
        <p className="answer">{PRODUCT.name} is built around repeat visits: customer profiles, visit history and segments for restaurants, salons, gyms, clinics and local retail.</p>
        <ul className="bullets">
          {(["customerProfiles", "reservations", "segmentation", "retries", "outlets"] as const).map((k) => (
            <li key={k}><strong>{FEATURES[k].title}.</strong> {FEATURES[k].body}</li>
          ))}
        </ul>
      </section>

      <section id="questions">
        <h2>What should you ask any WhatsApp provider?</h2>
        <ul className="bullets">
          <li>What do you charge per message on top of Meta&apos;s rate, for each category?</li>
          <li>How many team members are included, and what does each extra seat cost?</li>
          <li>Can I see why each message failed, and retry only the failed ones?</li>
          <li>Are opt-outs applied to every campaign automatically?</li>
          <li>Can I manage several outlets or locations from one account?</li>
        </ul>
        <p>Meta&apos;s own rates are listed on <Link href="/pricing">WhatsApp pricing in India</Link>.</p>
      </section>

      <CtaPanel />

      <Related
        links={[
          ...COMPETITORS.filter((x) => x.slug !== c.slug && x.status === "published").map((x) => ({ href: `/compare/${x.slug}`, label: `${x.name} alternative` })),
          { href: "/pricing", label: "WhatsApp Business API pricing in India" },
          { href: "/whatsapp-cost-calculator", label: "WhatsApp cost calculator" },
        ]}
      />
    </ContentPage>
  );
}
