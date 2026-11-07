import { generateText } from "ai";

/**
 * POST /api/refine — turns a visitor's loose notes into the brief template
 * the Eigensu team works from. Runs on Vercel AI Gateway (auth via the
 * project's OIDC token locally after `vercel env pull`, automatic on Vercel).
 */

const MODEL = "anthropic/claude-haiku-5.5";
// The team's AI Gateway is on free credits (Nov 2026), which blocks Anthropic
// models. The gateway falls back to this model until credits are added, so
// Refine keeps working either way.
const FALLBACK_MODELS = ["google/gemini-2.5-flash"];
const MAX_INPUT = 6000;

const KINDS = new Set(["Custom product", "Custom service", "Not sure yet"]);

const INSTRUCTIONS = `You turn a prospective client's rough request into a short project brief for Eigensu, a small software studio that builds custom software, websites and internal tools.

Rewrite the request into exactly this template, in plain text (no markdown symbols like # or *):

WHAT THEY WANT
<one or two sentences in plain language>

WHO USES IT
<the people or teams who will use it>

MUST-HAVES
- <one item per line, only what the request supports>

TOOLS TO CONNECT
- <existing systems, platforms or data mentioned; write "None mentioned" if none>

TIMELINE / BUDGET
<anything stated; otherwise "Not stated">

OPEN QUESTIONS
- <2-4 short questions the team should ask on the first call>

Rules: keep the client's facts, numbers and names exactly. Never invent requirements, budgets or deadlines. Write as the client (first person plural is fine). Keep it under 220 words.`;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send JSON with a `text` field." }, { status: 400 });
  }

  const { text, kind } = (body ?? {}) as { text?: unknown; kind?: unknown };
  if (typeof text !== "string" || text.trim().length < 12) {
    return Response.json({ error: "Write a sentence or two first, then refine." }, { status: 400 });
  }
  if (text.length > MAX_INPUT) {
    return Response.json({ error: `Keep it under ${MAX_INPUT} characters.` }, { status: 413 });
  }
  const requestKind = typeof kind === "string" && KINDS.has(kind) ? kind : "Not sure yet";

  try {
    const { text: brief } = await generateText({
      model: MODEL,
      instructions: INSTRUCTIONS,
      prompt: `Request type: ${requestKind}\n\nClient's notes:\n"""\n${text.trim()}\n"""`,
      maxOutputTokens: 1200,
      temperature: 0.2,
      providerOptions: { gateway: { models: FALLBACK_MODELS } },
    });
    return Response.json({ brief: brief.trim() });
  } catch (error) {
    console.error("[refine] generation failed", error);
    return Response.json({ error: "Refine is unavailable right now. You can still send your notes as they are." }, { status: 502 });
  }
}
