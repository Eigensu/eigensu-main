# Tracking: Google Tag Manager and Analytics

This site sends a small set of events to Google Tag Manager (GTM). Tag Manager forwards them to Google Analytics 4 (GA4). The code side is done; the steps below are done by hand in the Tag Manager and Analytics dashboards.

## How it works in code

| Piece | Where |
| --- | --- |
| Container ID | `NEXT_PUBLIC_GTM_ID` (Vercel env). Tag Manager loads only in **production builds** with an ID set. |
| Consent defaults | `app/lib/consent.ts` → inline script in `<head>` sets `analytics_storage`, `ad_storage`, `ad_user_data` and `ad_personalization` to `denied` before anything else. |
| Consent banner | `app/components/analytics/ConsentBanner.tsx`, shown to **all visitors** until they choose. The choice is stored in `localStorage` (`consent.v1`). "Cookie settings" in the footer reopens it. |
| Loading | `gtm.js` is requested **only after the visitor clicks Accept** (basic consent mode). After Reject, no Google script loads at all. |
| Events | `track(event, params)` in `app/lib/analytics.ts`. It does nothing when Tag Manager is off or consent is not granted, and drops any parameter outside the allow-list. |

### Events

Every event carries `page_path` (for example `/dishigen`). Only these parameters can be sent: `page_path`, `cta_location` and `form_name`. Values must be short lower-case identifiers or paths. Names, emails, phone numbers and free text are never sent.

| Event | Fires when | Extra parameters |
| --- | --- | --- |
| `generate_lead` | An enquiry form is **delivered** (the server confirmed the email or Sheet accepted it), not on click | `form_name`: `drawer`, `contact` or `onboard` |
| `demo_click` | "Book a demo" is clicked | `cta_location`: `hero`, `footer_cta`, … |
| `whatsapp_click` | "Message us on WhatsApp" is clicked | `cta_location`: `hero`, `footer_cta`, `contact`, `drawer` |
| `pricing_view` | The plans section of `/pricing` scrolls into view, once per page view | `cta_location`: `pricing` |
| `calculator_used` | A visitor changes an input on `/whatsapp-cost-calculator` and gets a new result, once per page view | `cta_location`: `calculator` |
| `sign_up` | Reserved for product sign-ups; not sent yet | none |

## Steps to do by hand

### 1. Create the GA4 property
1. In [Google Analytics](https://analytics.google.com), go to Admin → Create → Property. Name it "eigensu.in", set the time zone to India and the currency to INR.
2. Add a **Web** data stream for `https://eigensu.in`. Copy the **Measurement ID** (`G-…`).
3. In the data stream, open **Enhanced measurement** and make sure these are on:
   - Page views, with **"Page changes based on browser history events"** enabled (this site navigates without full page loads);
   - Scrolls;
   - **Outbound clicks**;
   - Form interactions: **off**. We send our own `generate_lead`, and the built-in one fires on submit attempts, not deliveries.

### 2. Create the Tag Manager container
1. In [Tag Manager](https://tagmanager.google.com), create a **Web** container for `eigensu.in`. Copy the ID (`GTM-…`).
2. Set `NEXT_PUBLIC_GTM_ID` in Vercel (Production, and Preview if you want to test there) and redeploy.
3. Admin → Container settings → enable **"Enable consent overview"**.

### 3. Google tag (all pages, with consent checks)
1. Tags → New → **Google tag**. Tag ID: your `G-…` Measurement ID.
2. Trigger: **Initialization – All Pages**.
3. Advanced settings → Consent settings → **Require additional consent for tag to fire**: `analytics_storage`.
4. Save as "GA4 – Google tag".

### 4. One trigger and one GA4 event tag per event
For each event (`generate_lead`, `demo_click`, `whatsapp_click`, `pricing_view`, `calculator_used`, and later `sign_up`):

1. **Variables**: create these Data Layer Variables once (Variables → New → Data Layer Variable):
   - `DLV – page_path` (name `page_path`)
   - `DLV – cta_location` (name `cta_location`)
   - `DLV – form_name` (name `form_name`)
2. **Trigger**: Triggers → New → **Custom Event**. Event name: the exact event, e.g. `demo_click`. This trigger fires on all custom events.
3. **Tag**: Tags → New → **Google Analytics: GA4 Event**.
   - Measurement ID: your `G-…`
   - Event name: the same, e.g. `demo_click`
   - Event parameters: `page_path` = `{{DLV – page_path}}`, `cta_location` = `{{DLV – cta_location}}`, `form_name` = `{{DLV – form_name}}` (only the ones that event uses)
   - Consent settings: require `analytics_storage`
   - Trigger: the custom event trigger from step 2.

### 5. Custom dimensions and key events in GA4
1. Admin → Custom definitions → Create custom dimension (scope: Event) for `cta_location` and `form_name`. `page_path` is already covered by GA4's own page dimensions, but you can add it too.
2. Admin → Events (or Key events) → mark **`generate_lead`**, **`demo_click`** and **`whatsapp_click`** as **key events**. They appear after the first time each event is received; you can also create them in advance with "New key event".

### 6. Internal traffic filter
1. GA4 Admin → Data streams → your stream → Configure tag settings → **Define internal traffic**. Add a rule `traffic_type = internal` for each office or home IP address (or range).
2. Admin → Data filters → "Internal Traffic" filter: start it in **Testing**, check that your visits appear under the "Test data filter name" dimension, then set it to **Active**.
3. Optional: add a **Developer traffic** filter for preview and debug sessions.

### 7. Link Analytics to Search Console
1. Verify the site in Search Console first (set `GOOGLE_SITE_VERIFICATION`, see the Phase 1 PR).
2. GA4 Admin → Product links → **Search Console links** → Link → choose the `https://eigensu.in` property and the web stream.

### 8. Test before publishing
1. In Tag Manager, click **Preview**, enter `https://eigensu.in` and open it in the Tag Assistant window.
2. Accept the cookie banner. Check that:
   - the consent default shows all four types as `denied`, and the update after Accept shows them as `granted`;
   - "GA4 – Google tag" fires on the page;
   - clicking "Book a demo" fires `demo_click` with `cta_location` and `page_path`;
   - sending a test enquiry fires `generate_lead` only after the success message appears;
   - no event shows a name, email, phone number or message.
3. Repeat in a private window and click **Reject**: no tags may fire, and `gtm.js` should not load.
4. In GA4 → Admin → **DebugView**, confirm the events arrive.
5. Only then click **Submit → Publish** in Tag Manager, with a version name such as "Initial GA4 setup".

## UTM naming convention

Add UTM parameters to every link you share outside the site, so GA4 can tell channels apart.

- **Lower case only**, words separated by hyphens, no spaces.
- `utm_source`: where the link is posted (the platform or sender).
- `utm_medium`: the type of channel.
- `utm_campaign`: what the push is about, with a month if it's time-bound (`dishigen-launch`, `diwali-2026`).
- Optional `utm_content`: which variant or placement, when you post several links in one campaign.

| Channel | utm_source | utm_medium | Example |
| --- | --- | --- | --- |
| WhatsApp | `whatsapp` | `messaging` | `https://eigensu.in/dishigen?utm_source=whatsapp&utm_medium=messaging&utm_campaign=dishigen-launch` |
| LinkedIn | `linkedin` | `social` (organic) or `paid-social` | `https://eigensu.in/dishigen?utm_source=linkedin&utm_medium=social&utm_campaign=dishigen-launch&utm_content=founder-post` |
| Instagram | `instagram` | `social` (organic) or `paid-social` | `https://eigensu.in/dishigen?utm_source=instagram&utm_medium=social&utm_campaign=restaurant-reels-oct-2026` |
| Email | `newsletter` (or the list name) | `email` | `https://eigensu.in/dishigen?utm_source=newsletter&utm_medium=email&utm_campaign=oct-2026-update` |
| Partner | the partner's name, e.g. `reservego` | `partner` | `https://eigensu.in/dishigen?utm_source=reservego&utm_medium=partner&utm_campaign=partner-referral` |

Keep a shared list of campaign names so the same campaign isn't spelled two ways.
