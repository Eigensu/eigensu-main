import Link from "next/link";
import ContentPage from "../components/content/ContentPage";
import CtaPanel from "../components/content/CtaPanel";
import Sources from "../components/content/Sources";
import { GUIDES } from "../content/guides";
import { pageMetadata } from "../lib/metadata";

const UPDATED = "2026-10-14";

export const metadata = pageMetadata({
  title: "WhatsApp Business guides for Indian businesses",
  description: "Plain-English WhatsApp Business guides for Indian businesses: message charges, delivery errors and opt-in rules, each with sources.",
  path: "/guides",
});

export default function GuidesIndex() {
  const published = GUIDES.filter((g) => g.status === "published");
  return (
    <ContentPage
      crumbs={[{ name: "Guides", path: "/guides" }]}
      eyebrow="Guides"
      title="WhatsApp Business guides"
      intro="WhatsApp Business guides for Indian businesses that message their customers: what Meta charges, why messages fail and what the rules say. Each guide answers the question first and lists its sources."
      updated={UPDATED}
    >
      <section>
        <ul className="related" style={{ listStyle: "none", padding: 0 }}>
          {published.map((g) => (
            <li key={g.slug} className="card" style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: "1.2rem" }}><Link href={`/guides/${g.slug}`}>{g.title}</Link></h2>
              <p>{g.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <Sources sources={published.flatMap((g) => g.sources)} />
      <CtaPanel />
    </ContentPage>
  );
}
