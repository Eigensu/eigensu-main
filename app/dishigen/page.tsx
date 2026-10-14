import Hero from "./sections/Hero";
import ProblemSection from "./sections/ProblemSection";
import ModulesSection from "./sections/ModulesSection";
import ActionSection from "./sections/ActionSection";
import CampaignsSection from "./sections/CampaignsSection";
import CampaignsChartSection from "./sections/CampaignsChartSection";
import CtaSection from "./sections/CtaSection";
import { HowItWorks, ProductQuestions, WhoItsFor } from "./sections/GuideSections";
import JsonLd from "../components/content/JsonLd";
import { PRODUCT, absoluteUrl } from "../lib/site";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata({
  title: `${PRODUCT.name} — WhatsApp marketing software for restaurants, salons and gyms`,
  description: PRODUCT.description,
  path: PRODUCT.path,
  absoluteTitle: true,
});

export default function DishigenPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: PRODUCT.name,
          description: PRODUCT.description,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: absoluteUrl(PRODUCT.path),
          publisher: { "@id": absoluteUrl("/#organization") },
          // TODO(owner): add "offers" once plan prices are published (content/facts.ts → DISHIGEN_PLANS).
        }}
      />
      <Hero />
      <WhoItsFor />
      <HowItWorks />
      <ProblemSection />
      <ModulesSection />
      <ActionSection />
      <CampaignsSection />
      <CampaignsChartSection />
      <ProductQuestions />
      {/* TODO(owner): mobile app section once screenshots exist (content/product.ts → MOBILE_APP). */}
      <CtaSection />
    </div>
  );
}
