"use client";

import type { CSSProperties, ReactNode } from "react";
import { useModal } from "./PageShell";
import { DEMO_URL, whatsappHref } from "../lib/site";

type CtaProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Where the button sits on the page, e.g. "hero" or "footer". Used for analytics. */
  location: string;
};

/** Opens the demo booking link, or the enquiry drawer when no booking link is configured. */
export function DemoButton({ children, className, style, location }: CtaProps) {
  const { openModal } = useModal();
  if (DEMO_URL) {
    return (
      <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className={className} style={style} data-cta-location={location}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={openModal} className={className} style={style} data-cta-location={location}>
      {children}
    </button>
  );
}

/** Opens the enquiry drawer. */
export function EnquiryButton({ children, className, style }: Omit<CtaProps, "location">) {
  const { openModal } = useModal();
  return (
    <button type="button" onClick={openModal} className={className} style={style}>
      {children}
    </button>
  );
}

/** Opens a WhatsApp chat with a prefilled message. Renders nothing until a number is configured. */
export function WhatsAppLink({ children, className, style, location, message }: CtaProps & { message?: string }) {
  const href = whatsappHref(message);
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style} data-cta-location={location}>
      {children}
    </a>
  );
}
