"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { track, type CtaLocation } from "../../lib/analytics";

/**
 * Fires a view event the first time its content scrolls into view, once per page view.
 * Wrap the pricing section in <TrackOnView event="pricing_view"> (Phase 3).
 */
export default function TrackOnView({ event, location, children }: { event: "pricing_view"; location?: CtaLocation; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        track(event, location ? { cta_location: location } : {});
        obs.disconnect();
      }
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [event, location]);
  return <div ref={ref}>{children}</div>;
}
