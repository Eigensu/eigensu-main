import { get } from "@vercel/blob";
import { Resend } from "resend";

/**
 * Custom requests sent from the products and contact pages.
 * app/api/requests/route.ts stores each one in the private Blob store, then
 * calls sendRequestEmail() to tell the team.
 *
 * Env:
 *   RESEND_API_KEY  required to send; without it requests are stored but no email goes out
 *   REQUESTS_TO     optional, defaults to hello@eigensu.in
 *   REQUESTS_FROM   optional, defaults to requests@eigensu.in (the domain must be verified in Resend)
 */

export type StoredRequest = {
  id: string;
  receivedAt: string;
  kind: string;
  brief: string;
  refined: boolean;
  contact: { name: string; email: string; company: string };
  voiceNote: { url: string; pathname: string; contentType: string; seconds: number } | null;
};

const TO = process.env.REQUESTS_TO || "hello@eigensu.in";
const FROM = process.env.REQUESTS_FROM || "Eigensu requests <requests@eigensu.in>";
// Resend caps a whole email at 40MB after base64; stay well under it.
const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024;

const EXT: Record<string, string> = {
  "audio/webm": "webm",
  "audio/ogg": "ogg",
  "audio/mp4": "m4a",
  "audio/x-m4a": "m4a",
  "audio/aac": "aac",
  "audio/mpeg": "mp3",
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function duration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

async function readVoiceNote(note: NonNullable<StoredRequest["voiceNote"]>) {
  const result = await get(note.pathname, { access: "private" });
  if (!result || result.statusCode !== 200) return { file: null, reason: "not found in storage" } as const;
  if (result.blob.size > MAX_ATTACHMENT_BYTES) {
    await result.stream.cancel();
    return { file: null, reason: `too large to attach (${Math.round(result.blob.size / 1e6)}MB)` } as const;
  }
  const bytes = Buffer.from(await new Response(result.stream).arrayBuffer());
  const type = (result.blob.contentType || note.contentType).split(";")[0];
  return { file: { content: bytes, contentType: type, ext: EXT[type] ?? "webm" }, reason: null } as const;
}

/** Emails the team about a stored request. Resolves to false when email is not configured. */
export async function sendRequestEmail(record: StoredRequest): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info(`[requests] RESEND_API_KEY not set; request ${record.id} stored without an email`);
    return false;
  }

  const { contact, voiceNote } = record;
  let attachment: { content: Buffer; contentType: string; ext: string } | null = null;
  let voiceLine = "";
  if (voiceNote) {
    const read = await readVoiceNote(voiceNote).catch((error) => {
      console.error(`[requests] could not read voice note for ${record.id}`, error);
      return { file: null, reason: "could not be read from storage" } as const;
    });
    attachment = read.file;
    voiceLine = attachment
      ? `Voice note attached (${duration(voiceNote.seconds)}). We promised a reply within one hour.`
      : `Voice note (${duration(voiceNote.seconds)}) ${read.reason}. It's in Blob storage at ${voiceNote.pathname}.`;
  }

  const who = contact.company ? `${contact.name} (${contact.company})` : contact.name;
  const subject = voiceNote
    ? `Voice note from ${who}: reply within the hour`
    : `New ${record.kind.toLowerCase()} request from ${who}`;

  const rows: [string, string][] = [
    ["Type", record.kind],
    ["Name", contact.name],
    ["Email", contact.email],
    ...(contact.company ? ([["Company", contact.company]] as [string, string][]) : []),
    ["Received", new Date(record.receivedAt).toUTCString()],
    ["Request ID", record.id],
  ];

  const briefLabel = record.refined ? "Brief (refined with AI from what they typed)" : "What they wrote";
  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    ...(voiceLine ? [voiceLine, ""] : []),
    ...(record.brief ? [`${briefLabel}:`, record.brief, ""] : []),
    "Reply to this email to answer them directly.",
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#F5F0E6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1C1917">
<div style="max-width:620px;margin:0 auto;background:#FFFFFF;border:2px solid #1C1917;border-radius:18px;overflow:hidden">
  <div style="background:#1C1917;color:#FBF3E4;padding:18px 22px;font-size:13px;letter-spacing:.08em;text-transform:uppercase">New request · ${escapeHtml(record.kind)}</div>
  <div style="padding:22px">
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#78716C;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:6px 0">${k === "Email" ? `<a href="mailto:${escapeHtml(v)}" style="color:#3D5BD9">${escapeHtml(v)}</a>` : escapeHtml(v)}</td></tr>`).join("")}
    </table>
    ${voiceLine ? `<p style="margin:18px 0 0;padding:12px 14px;background:#FFF4D6;border-radius:12px;font-size:14px">${escapeHtml(voiceLine)}</p>` : ""}
    ${record.brief ? `<h3 style="margin:22px 0 8px;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:#78716C">${escapeHtml(briefLabel)}</h3><div style="white-space:pre-wrap;font-size:14px;line-height:1.6;background:#FAF7F2;border-radius:12px;padding:14px">${escapeHtml(record.brief)}</div>` : ""}
    <p style="margin:22px 0 0;font-size:13px;color:#78716C">Reply to this email to answer ${escapeHtml(contact.name)} directly.</p>
  </div>
</div></body></html>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send(
    {
      from: FROM,
      to: TO,
      replyTo: contact.email,
      subject,
      text,
      html,
      attachments: attachment
        ? [{ filename: `voice-note-${record.id.slice(0, 8)}.${attachment.ext}`, content: attachment.content, contentType: attachment.contentType }]
        : undefined,
      tags: [{ name: "type", value: voiceNote ? "voice_note" : "typed" }],
    },
    // A retried request never produces a second email.
    { idempotencyKey: `request-${record.id}` },
  );
  if (error) throw new Error(`Resend: ${error.name}: ${error.message}`);
  return true;
}
