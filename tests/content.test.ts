import { test } from "node:test";
import assert from "node:assert/strict";
import { PRODUCT_QUESTIONS } from "../app/content/product";
import { WHATSAPP_INDIA } from "../app/content/facts";
import robots from "../app/robots";

test("every shown Q&A answer is backed by the owner's brief or the facts file", () => {
  for (const q of PRODUCT_QUESTIONS) {
    if (q.answer === null) {
      assert.equal(q.source, null, `${q.q}: no answer but a source`);
      continue;
    }
    assert.ok(q.source === "owner" || q.source === "facts", `${q.q}: answer without a source`);
    // Any rupee figure must be one of the facts-file figures.
    for (const figure of q.answer.match(/₹[\d.,]+/g) ?? []) {
      const known = Object.values(WHATSAPP_INDIA).some((f) => typeof f === "object" && f.display.includes(figure));
      assert.ok(known && q.source === "facts", `${q.q}: ${figure} is not from the facts file`);
    }
  }
});

test("the eight product questions from the brief are all present", () => {
  assert.equal(PRODUCT_QUESTIONS.length, 8);
});

test("robots.txt allows search engines and the AI crawlers the owner approved", () => {
  const { rules } = robots();
  const groups = Array.isArray(rules) ? rules : [rules];
  const allowed = new Set(groups.filter((g) => g.allow === "/").flatMap((g) => (Array.isArray(g.userAgent) ? g.userAgent : [g.userAgent])));
  for (const ua of ["Googlebot", "Bingbot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "Claude-SearchBot", "Claude-User", "GPTBot", "Google-Extended", "CCBot", "ClaudeBot", "*"]) {
    assert.ok(allowed.has(ua), `${ua} is not allowed`);
  }
  for (const g of groups) assert.equal(g.disallow, undefined, `a disallow rule exists for ${g.userAgent}`);
});
