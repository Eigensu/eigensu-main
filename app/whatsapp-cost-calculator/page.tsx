import Link from "next/link";
import ContentPage from "../components/content/ContentPage";
import CostCalculator from "../components/content/CostCalculator";
import CtaPanel from "../components/content/CtaPanel";
import Related from "../components/content/Related";
import Sources from "../components/content/Sources";
import { GST_RATE, WHATSAPP_INDIA, formatDate } from "../content/facts";
import { pageMetadata } from "../lib/metadata";
import { PRODUCT } from "../lib/site";

const UPDATED = "2026-10-14";
const R = WHATSAPP_INDIA;
const free = R.freeServicePerNumberPerMonth.value.toLocaleString("en-IN");

export const metadata = pageMetadata({
  title: "WhatsApp API cost calculator for India",
  description: `Free WhatsApp API cost calculator for India: enter your monthly marketing, utility, authentication and service messages to estimate Meta's charges with GST, using rates as of ${formatDate(R.effectiveFrom)}.`,
  path: "/whatsapp-cost-calculator",
});

export default function CalculatorPage() {
  return (
    <ContentPage
      crumbs={[{ name: "Pricing", path: "/pricing" }, { name: "Cost calculator", path: "/whatsapp-cost-calculator" }]}
      eyebrow="Tools // calculator"
      title="WhatsApp API cost calculator"
      intro={`This WhatsApp API cost calculator estimates what Meta will charge you each month for messages to Indian numbers. Enter how many messages you send in each category; it applies Meta's rates as of ${formatDate(R.effectiveFrom)}, the ${free} free service messages per number, and ${GST_RATE.display}.`}
      updated={UPDATED}
      wide
    >
      <section id="calculator" aria-label="Calculator">
        <CostCalculator />
      </section>

      <section id="how-it-works">
        <h2>How is the estimate calculated?</h2>
        <p className="answer">
          Each category&apos;s message count is multiplied by Meta&apos;s rate: {R.marketing.display} for marketing and {R.utility.display} for utility, authentication and service. Service messages are charged only above {free} per WhatsApp number per month, and {GST_RATE.display} is added to the total.
        </p>
        <p>
          The result covers Meta&apos;s charges only, not your software subscription. See <Link href="/pricing">WhatsApp pricing in India</Link> for what each category means and what changed on 1 October 2026.
        </p>
      </section>

      <Sources sources={[...R.marketing.sources, ...GST_RATE.sources]} asOf={R.effectiveFrom} />

      <CtaPanel location="calculator" />

      <Related
        links={[
          { href: "/pricing", label: "WhatsApp Business API pricing in India", description: "Meta's rates by category, and how much " + PRODUCT.name + " costs." },
          { href: "/guides/whatsapp-service-message-charges", label: "Service message charges explained", description: "What changed on 1 October 2026." },
          { href: "/guides/whatsapp-error-131049", label: "Error 131049", description: "Why some marketing messages aren't delivered, and when to retry." },
        ]}
      />
    </ContentPage>
  );
}
