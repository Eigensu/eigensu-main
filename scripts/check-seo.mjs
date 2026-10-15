// SEO checks against a running build: `npm run build && npm start`, then
// `npm run check:seo` (BASE defaults to http://localhost:3000).
//
// For every URL in the sitemap: 200 status, exactly one <h1>, a unique <title>
// and meta description, a canonical link equal to the URL, every JSON-LD block
// parses as JSON, any "₹" figure has a source on the page, and every internal
// link resolves. Pages listed in REVIEW_PATHS must be noindex and absent from the sitemap.

const BASE = process.env.BASE || "http://localhost:3000";
const SITE = "https://eigensu.in";
const REVIEW_PATHS = ["/compare/aisensy", "/compare/wati", "/compare/interakt", "/guides/whatsapp-opt-in-india", "/privacy", "/terms", "/refunds", "/cookies"];

const failures = [];
const fail = (page, msg) => failures.push(`${page}: ${msg}`);
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const titles = new Map();
const descriptions = new Map();
const links = new Set();
let jsonLdBlocks = 0;

for (const url of urls) {
  const path = url.replace(SITE, "") || "/";
  const res = await fetch(BASE + path);
  if (res.status !== 200) { fail(path, `status ${res.status}`); continue; }
  const html = await res.text();
  const head = html.slice(0, html.indexOf("</head>"));

  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length !== 1) fail(path, `${h1s.length} <h1> elements`);

  const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] || "");
  if (!title) fail(path, "missing <title>");
  else if (titles.has(title)) fail(path, `duplicate title with ${titles.get(title)}`);
  else titles.set(title, path);

  const desc = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] || "");
  if (!desc) fail(path, "missing description");
  else if (descriptions.has(desc)) fail(path, `duplicate description with ${descriptions.get(desc)}`);
  else descriptions.set(desc, path);

  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  if (canonical?.replace(/\/$/, "") !== url.replace(/\/$/, "")) fail(path, `canonical ${canonical} != ${url}`);

  if (/<meta name="robots" content="[^"]*noindex/.test(head)) fail(path, "in sitemap but noindex");

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    jsonLdBlocks++;
    try { const data = JSON.parse(m[1]); if (!data["@context"] || !data["@type"]) fail(path, "JSON-LD without @context/@type"); }
    catch (e) { fail(path, `invalid JSON-LD: ${e.message}`); }
  }

  const body = html.slice(html.indexOf("<body"));
  // Product mock-ups marked data-sample="true" show labelled sample data, not claims.
  const visible = body
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<section[^>]*data-sample="true"[\s\S]*?<\/section>/g, "");
  if (visible.includes("₹") && !/aria-label="Sources"|>Source:/.test(visible)) fail(path, "shows a ₹ figure without a source");

  for (const m of body.matchAll(/href="(\/[^"#?]*)/g)) if (!m[1].startsWith("/_next")) links.add(m[1]);
}

for (const path of REVIEW_PATHS) {
  if (urls.some((u) => u.replace(SITE, "") === path)) fail(path, "review page is in the sitemap");
  const res = await fetch(BASE + path);
  const html = await res.text();
  if (res.status !== 200) fail(path, `review page status ${res.status}`);
  if (!/<meta name="robots" content="noindex/.test(html)) fail(path, "review page is not noindex");
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    jsonLdBlocks++;
    try { JSON.parse(m[1]); } catch (e) { fail(path, `invalid JSON-LD: ${e.message}`); }
  }
}

for (const link of links) {
  const res = await fetch(BASE + link, { redirect: "manual" });
  if (res.status >= 400) fail(link, `internal link returns ${res.status}`);
}

// One name, one description: identical in metadata, JSON-LD and visible text.
import { readFileSync } from "node:fs";
const siteTs = readFileSync(new URL("../app/lib/site.ts", import.meta.url), "utf8");
const productBlock = siteTs.slice(siteTs.indexOf("export const PRODUCT"));
const NAME = productBlock.match(/name: "([^"]+)"/)[1];
const DESCRIPTION = productBlock.match(/description:\s*"([^"]+)"/)[1];
{
  const html = await (await fetch(BASE + "/dishigen")).text();
  const head = html.slice(0, html.indexOf("</head>"));
  const meta = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] || "");
  const og = decode(head.match(/<meta property="og:description" content="([^"]*)"/)?.[1] || "");
  if (meta !== DESCRIPTION) fail("/dishigen", `meta description differs: ${meta}`);
  if (og !== DESCRIPTION) fail("/dishigen", `og:description differs: ${og}`);
  const app = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1])).find((d) => d["@type"] === "SoftwareApplication");
  if (!app || app.name !== NAME || app.description !== DESCRIPTION) fail("/dishigen", "SoftwareApplication JSON-LD name/description differ");
  const text = decode(html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<!-- -->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
  if (!text.includes(DESCRIPTION)) fail("/dishigen", "description not in visible text");
  for (const path of ["/about", "/pricing", "/for/restaurants"]) {
    const t = decode((await (await fetch(BASE + path)).text()).replace(/<script[\s\S]*?<\/script>/g, "").replace(/<!-- -->/g, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " "));
    if (!t.includes(DESCRIPTION)) fail(path, "product description not in visible text");
  }
  const llms = await (await fetch(BASE + "/llms.txt")).text();
  if (!llms.includes(DESCRIPTION)) fail("/llms.txt", "description missing");
}

// Old product names must not appear on any page (redirects live in next.config.ts only).
for (const url of urls) {
  const path = url.replace(SITE, "") || "/";
  const html = await (await fetch(BASE + path)).text();
  if (/dishpatch|\bdispatch\b/i.test(html.replace(/<script[\s\S]*?<\/script>/g, ""))) fail(path, "old product name found");
}

console.log(`Checked ${urls.length} sitemap pages, ${REVIEW_PATHS.length} review pages, ${jsonLdBlocks} JSON-LD blocks, ${links.size} internal links.`);
if (failures.length) { console.log(failures.map((f) => `FAIL ${f}`).join("\n")); process.exit(1); }
console.log("All SEO checks passed.");
