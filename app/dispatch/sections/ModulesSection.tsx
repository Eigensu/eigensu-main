"use client";

import { Container, Eyebrow } from "./shared";
import { MODULES_STYLES } from "./modules/styles";
import {
  GuestIntelligenceTile,
  SmartSegmentationTile,
  CampaignEngineTile,
  ReservationsTile,
  FinanceTile,
  InboxTile,
  MultiRestaurantTile,
  AnalyticsChartTile,
  AdminTile,
} from "./modules/tiles";

const STYLES = `
.dsp-modules{width:100%;padding:112px 0;position:relative;background:var(--butter);border-radius:48px;overflow:hidden;}
.dsp-modules h2{margin:0;max-width:920px;font-family:var(--font-head);font-weight:800;font-size:clamp(2.6rem,5vw,5rem);line-height:.95;letter-spacing:-.05em;color:var(--wine);}
.dsp-modules .bd{margin:12px 0 0;max-width:64ch;font-size:.96rem;line-height:1.65;color:var(--muted);}
${MODULES_STYLES}
`;

export default function ModulesSection() {
  return (
    <section id="dsp-modules" className="dsp-modules">
      <style>{STYLES}</style>
      <Container>
        <Eyebrow>THE DISHPATCH PLATFORM</Eyebrow>
        <h2>One platform. Every part of the guest relationship.</h2>
        <p className="bd">
          Connect customer data, engagement, operations and business intelligence across every
          restaurant you manage.
        </p>

        <div className="bb-board">
          <GuestIntelligenceTile />
          <SmartSegmentationTile />
          <CampaignEngineTile />

          <div className="bb-col-group">
            <div className="bb-col bb-s5">
              <ReservationsTile />
              <FinanceTile />
            </div>
            <div className="bb-col bb-s3">
              <InboxTile />
              <MultiRestaurantTile />
            </div>
            <div className="bb-col bb-s4">
              <AnalyticsChartTile />
              <AdminTile />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
