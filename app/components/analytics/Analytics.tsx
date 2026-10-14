"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useSyncExternalStore } from "react";
import { readConsent, subscribeConsent, type ConsentState } from "../../lib/consent";
import { GTM_ID } from "../../lib/analytics";
import ConsentBanner from "./ConsentBanner";

/**
 * Loads Tag Manager only after the visitor accepts, and shows the consent banner
 * until they choose. Renders nothing when Tag Manager is off (no ID, or not production).
 */
export default function Analytics() {
  const consent = useSyncExternalStore<ConsentState>(subscribeConsent, readConsent, () => "unknown");
  if (!GTM_ID) return null;
  return (
    <>
      {consent === "granted" && <GoogleTagManager gtmId={GTM_ID} />}
      {consent === "unset" && <ConsentBanner />}
    </>
  );
}
