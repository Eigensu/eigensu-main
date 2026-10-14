import "server-only";

/**
 * Sends a validated enquiry to its destinations. Server-only: reads secrets
 * from environment variables, which must never reach client code.
 *
 * - Email through Resend (required): RESEND_API_KEY, ENQUIRY_FROM, ENQUIRY_TO.
 * - Google Sheet webhook (optional): SHEET_WEBHOOK_URL, SHEET_WEBHOOK_SECRET.
 */

export type Enquiry = {
  form: string;
  page: string;
  submittedAt: string;
  replyTo: string;
  fields: { label: string; value: string }[];
};

const TIMEOUT_MS = 10_000;

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function sendEnquiryEmail(e: Enquiry): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM;
  const to = (process.env.ENQUIRY_TO || "contact@eigensu.in").split(",").map((s) => s.trim()).filter(Boolean);
  if (!apiKey || !from) {
    console.error("[enquiry] RESEND_API_KEY or ENQUIRY_FROM is not set; cannot send email");
    return false;
  }

  const rows = e.fields.filter((f) => f.value);
  const text = [
    `New enquiry from the ${e.form} (${e.page})`,
    `Submitted ${e.submittedAt}`,
    "",
    ...rows.map((f) => `${f.label}: ${f.value}`),
  ].join("\n");
  const html = `<p>New enquiry from the <b>${escapeHtml(e.form)}</b> (${escapeHtml(e.page)})<br>Submitted ${escapeHtml(e.submittedAt)}</p>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map((f) => `<tr><td style="vertical-align:top;color:#666">${escapeHtml(f.label)}</td><td style="white-space:pre-wrap">${escapeHtml(f.value)}</td></tr>`)
    .join("")}</table>`;
  const name = rows.find((f) => /name/i.test(f.label))?.value;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: e.replyTo,
        subject: `Website enquiry${name ? ` from ${name}` : ""} (${e.form})`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) console.error(`[enquiry] Resend responded ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error("[enquiry] Resend request failed:", err instanceof Error ? err.name : "unknown error");
    return false;
  }
}

/** Posts the enquiry to a Google Apps Script (or similar) webhook. Returns null when no webhook is configured. */
export async function postEnquiryToSheet(e: Enquiry): Promise<boolean | null> {
  const url = process.env.SHEET_WEBHOOK_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: process.env.SHEET_WEBHOOK_SECRET || undefined,
        form: e.form,
        page: e.page,
        submittedAt: e.submittedAt,
        fields: Object.fromEntries(e.fields.map((f) => [f.label, f.value])),
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) console.error(`[enquiry] Sheet webhook responded ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error("[enquiry] Sheet webhook request failed:", err instanceof Error ? err.name : "unknown error");
    return false;
  }
}
