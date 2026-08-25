import Hero from "./sections/Hero";
import ProblemSection from "./sections/ProblemSection";
import ModulesSection from "./sections/ModulesSection";
import ActionSection from "./sections/ActionSection";
import CampaignsSection from "./sections/CampaignsSection";
import CampaignsChartSection from "./sections/CampaignsChartSection";
import CtaSection from "./sections/CtaSection";

export default function DispatchPage() {
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
