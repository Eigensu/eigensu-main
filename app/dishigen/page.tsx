import Hero from "./sections/Hero";
import ProblemSection from "./sections/ProblemSection";
import ModulesSection from "./sections/ModulesSection";
import ActionSection from "./sections/ActionSection";
import CampaignsSection from "./sections/CampaignsSection";
import CampaignsChartSection from "./sections/CampaignsChartSection";
import CtaSection from "./sections/CtaSection";
import { PRODUCT } from "../lib/site";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata({
  title: `${PRODUCT.name} — WhatsApp and email marketing platform`,
  description: PRODUCT.description,
  path: PRODUCT.path,
  absoluteTitle: true,
});

export default function DishigenPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Hero />
      <ProblemSection />
      <ModulesSection />
      <ActionSection />
      <CampaignsSection />
      <CampaignsChartSection />
      <CtaSection />
    </div>
  );
}
