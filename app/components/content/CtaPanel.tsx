import Link from "next/link";
import { DemoButton, WhatsAppLink } from "../cta";
import { PRODUCT } from "../../lib/site";
import type { CtaLocation } from "../../lib/analytics";

/** Closing call to action on every content page: book a demo, see pricing, or message us. */
export default function CtaPanel({ heading = `See ${PRODUCT.name} with your own customer list`, location = "footer_cta" }: { heading?: string; location?: CtaLocation }) {
  return (
    <section className="cta-panel" aria-label="Get started">
      <h2>{heading}</h2>
      <p>{PRODUCT.description}</p>
      <div className="cta-row">
        <DemoButton className="cta-btn cta-primary" location={location}>Book a demo</DemoButton>
        <Link className="cta-btn cta-ghost" href="/pricing">See pricing</Link>
        <WhatsAppLink className="cta-btn cta-ghost" location={location}>Message us on WhatsApp</WhatsAppLink>
      </div>
    </section>
  );
}
