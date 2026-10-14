/**
 * Visitor's analytics/ads consent, stored in localStorage and shared across
 * components through a tiny subscribe/get store (for useSyncExternalStore).
 * Google consent mode defaults are set by CONSENT_DEFAULTS_SCRIPT before Tag Manager loads.
 */

export type ConsentChoice = "granted" | "denied";
/** "unset" until the visitor chooses; "unknown" on the server, where storage can't be read. */
export type ConsentState = ConsentChoice | "unset" | "unknown";

/** Bump the version to ask everyone again (e.g. after adding a new kind of tracking). */
export const CONSENT_STORAGE_KEY = "consent.v1";
const CHANGE_EVENT = "consentchange";

export function readConsent(): ConsentState {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}

export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

type Gtag = (...args: unknown[]) => void;

/** Saves the choice and sends a consent mode update to the data layer. */
export function setConsent(choice: ConsentChoice | "unset") {
  try {
    if (choice === "unset") localStorage.removeItem(CONSENT_STORAGE_KEY);
    else localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* storage blocked: the choice applies to this page view only */
  }
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (choice !== "unset" && gtag) {
    gtag("consent", "update", {
      analytics_storage: choice,
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
    });
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/**
 * Inline script for <head>: defines gtag(), sets every consent type to "denied"
 * by default, then restores a previously granted choice. Runs before Tag Manager.
 */
export const CONSENT_DEFAULTS_SCRIPT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});try{if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='granted'){gtag('consent','update',{analytics_storage:'granted',ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted'});}}catch(e){}`;
