import { put } from "@vercel/blob";
import { after } from "next/server";
import { sendRequestEmail, type StoredRequest } from "../../lib/requests";

/**
 * POST /api/requests — receives a custom request from the products page.
 * Every request is written to the private Blob store first (requests/<id>.json),
 * so nothing is lost even if the email notification fails. The email goes out
 * after the response is sent (see app/lib/requests.ts).
 */

const KINDS = new Set(["Custom product", "Custom service", "Not sure yet"]);
const MAX_BRIEF = 8000;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see the "website" field.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const contactIn = (body.contact ?? {}) as Record<string, unknown>;
  const contact = {
    name: clean(contactIn.name, 120),
    email: clean(contactIn.email, 200),
    company: clean(contactIn.company, 200),
  };
  if (!contact.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    return Response.json({ error: "Add your name and a valid email so we can reply." }, { status: 400 });
  }

  const brief = clean(body.brief, MAX_BRIEF);
  const kind = typeof body.kind === "string" && KINDS.has(body.kind) ? body.kind : "Not sure yet";

  let voiceNote: StoredRequest["voiceNote"] = null;
  const v = body.voiceNote as Record<string, unknown> | null | undefined;
  if (v && typeof v === "object") {
    const url = clean(v.url, 1000);
    const pathname = clean(v.pathname, 300);
    let host = "";
    try { host = new URL(url).hostname; } catch { /* invalid */ }
    if (!pathname.startsWith("requests/") || !host.endsWith(".blob.vercel-storage.com")) {
      return Response.json({ error: "That voice note didn't upload correctly. Please record it again." }, { status: 400 });
    }
    voiceNote = {
      url,
      pathname,
      contentType: clean(v.contentType, 60) || "audio/webm",
      seconds: Math.max(0, Math.min(300, Number(v.seconds) || 0)),
    };
  }

  if (!brief && !voiceNote) {
    return Response.json({ error: "Type a few lines or record a voice note first." }, { status: 400 });
  }

  const record: StoredRequest = {
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    kind,
    brief,
    refined: body.refined === true,
    contact,
    voiceNote,
  };

  try {
    await put(`requests/${record.receivedAt.slice(0, 10)}/${record.id}.json`, JSON.stringify(record, null, 2), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    });
  } catch (error) {
    console.error("[requests] could not store request", error);
    return Response.json({ error: "We couldn't save your request. Please email hello@eigensu.in instead." }, { status: 500 });
  }

  after(async () => {
    try {
      await sendRequestEmail(record);
    } catch (error) {
      console.error(`[requests] email for ${record.id} failed; the request is still stored`, error);
    }
  });

  return Response.json({ ok: true, id: record.id });
}
