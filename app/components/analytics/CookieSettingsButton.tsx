"use client";

import { setConsent } from "../../lib/consent";
import { GTM_ID } from "../../lib/analytics";

/** Footer link that reopens the consent banner. Hidden when Tag Manager is off. */
export default function CookieSettingsButton({ className }: { className?: string }) {
  if (!GTM_ID) return null;
  return (
    <>
      <span className="meta-sep">&middot;</span>
      <button
        type="button"
        className={className}
        onClick={() => setConsent("unset")}
        style={{ background: "none", border: 0, padding: 0, cursor: "pointer", font: "inherit" }}
      >
        Cookie settings
      </button>
    </>
  );
}
