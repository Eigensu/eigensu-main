import Link from "next/link";
import ContentPage from "../components/content/ContentPage";
import CtaPanel from "../components/content/CtaPanel";
import Related from "../components/content/Related";
import Sources from "../components/content/Sources";
import TrackOnView from "../components/analytics/TrackOnView";
import { CATEGORY_DESCRIPTIONS, CATEGORY_LABELS, DISHIGEN_PLANS, GST_RATE, WHATSAPP_INDIA, type MessageCategory } from "../content/facts";
import { pageMetadata } from "../lib/metadata";
import { PRODUCT } from "../lib/site";

const UPDATED = "2026-10-14";
const R = WHATSAPP_INDIA;
const free = R.freeServicePerNumberPerMonth.value.toLocaleString("en-IN");

export const metadata = pageMetadata({
  title: "WhatsApp Business API pricing in India (October 2026)",
  description: `WhatsApp Business API pricing in India from 1 October 2026: marketing ${R.marketing.display}, utility, authentication and service ${R.utility.display.replace(" per message", "")}, ${free} free service messages per number. Plus ${PRODUCT.name} plans.`,
  path: "/pricing",
});

const CATEGORIES: MessageCategory[] = ["marketing", "utility", "authentication", "service"];

export default function PricingPage() {
  return (
    <ContentPage
      crumbs={[{ name: "Pricing", path: "/pricing" }]}
      eyebrow={`${PRODUCT.name} // pricing`}
      title="WhatsApp Business API pricing in India"
      intro={`WhatsApp Business API pricing in India has two parts: what Meta charges per message, and what your software provider charges. From 1 October 2026 Meta charges ${R.marketing.display} for marketing and ${R.utility.display} for utility, authentication and service messages, with the first ${free} service messages per number each month free.`}
      updated={UPDATED}
    >
      <section id="meta-rates">
          <h2>What does Meta charge per WhatsApp message in India?</h2>
          <p className="answer">
            Meta charges {R.marketing.display} for a marketing message and {R.utility.display} for a utility, authentication or service message sent to an Indian number. These rates exclude {GST_RATE.display}.
          </p>
          <div className="table-wrap">
            <table>
              <caption>Meta&apos;s rates for messages to Indian (+91) numbers from 1 October 2026, excluding GST</caption>
              <thead>
                <tr><th scope="col">Category</th><th scope="col">What it&apos;s for</th><th scope="col">Rate</th></tr>
              </thead>
              <tbody>
                {CATEGORIES.map((c) => (
                  <tr key={c}>
                    <th scope="row">{CATEGORY_LABELS[c]}</th>
                    <td>{CATEGORY_DESCRIPTIONS[c]}</td>
                    <td>
                      {R[c].display}
                      {c === "service" && <><br /><span className="note">First {free} per phone number per month free</span></>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">{R.utility.note} {R.freeServicePerNumberPerMonth.note}</p>
        </section>

        <section id="what-changed">
          <h2>What changed on 1 October 2026?</h2>
          <p className="answer">
            Service messages to Indian numbers are now charged at {R.service.display} after the first {free} per phone number each month, and utility templates sent inside the 24-hour customer service window are charged too. The marketing rate stayed at {R.marketing.display}.
          </p>
          <p>
            Read the full explanation in{" "}
            <Link href="/guides/whatsapp-service-message-charges">WhatsApp service message charges from 1 October 2026</Link>, or estimate your own bill with the{" "}
            <Link href="/whatsapp-cost-calculator">WhatsApp cost calculator</Link>.
          </p>
        </section>

      <TrackOnView event="pricing_view" location="pricing">
        <section id="plans">
          <h2>How much does {PRODUCT.name} cost?</h2>
          {DISHIGEN_PLANS.length ? (
            <div className="card-grid">
              {DISHIGEN_PLANS.map((p) => (
                <div className="card" key={p.name}>
                  <h3>{p.name}</h3>
                  <p>₹{p.priceInr.toLocaleString("en-IN")} per {p.period}</p>
                  <ul className="bullets">{p.includes.map((i) => <li key={i}>{i}</li>)}</ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="answer">
              {/* TODO(owner): plan names, prices and what each includes (content/facts.ts → DISHIGEN_PLANS). */}
              {`${PRODUCT.name} plan prices are not published yet. Book a demo and we'll walk you through the plans for your number of outlets and messages.`}
            </p>
          )}
          <p>Meta&apos;s message charges are separate from the {PRODUCT.name} subscription.</p>
        </section>
      </TrackOnView>

      <Sources sources={[...R.marketing.sources, ...GST_RATE.sources]} asOf={R.effectiveFrom} />

      <CtaPanel location="pricing" />

      <Related
        links={[
          { href: "/whatsapp-cost-calculator", label: "WhatsApp cost calculator", description: "Estimate your monthly Meta charges by message category." },
          { href: "/guides/whatsapp-service-message-charges", label: "Service message charges explained", description: "What changed on 1 October 2026 and who pays." },
          { href: "/templates", label: "WhatsApp message templates", description: "Ready-to-adapt templates for each industry." },
          { href: PRODUCT.path, label: PRODUCT.name, description: "WhatsApp marketing software for restaurants, salons and gyms." },
        ]}
      />
    </ContentPage>
  );
}
