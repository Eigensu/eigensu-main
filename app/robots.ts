import type { MetadataRoute } from "next";
import { absoluteUrl } from "./lib/site";

/**
 * Crawler access. Everything is allowed; the named groups make the policy explicit
 * and easy to change per crawler. Note that a crawler matching a named group uses
 * that group only, not "*".
 *
 * Search engines:
 *   Googlebot, Bingbot (Bingbot also feeds Microsoft Copilot answers)
 *   https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
 *   https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0
 * AI search and user-requested fetches (needed to appear in AI answers):
 *   OAI-SearchBot, ChatGPT-User — https://developers.openai.com/docs/gptbot
 *   PerplexityBot, Perplexity-User — https://docs.perplexity.ai/docs/resources/perplexity-crawlers.md
 *   Claude-SearchBot, Claude-User — https://support.anthropic.com/en/articles/8896518
 * AI training crawlers (owner decision, 14 October 2026: allow):
 *   GPTBot (OpenAI), Google-Extended (Google), CCBot (Common Crawl), ClaudeBot (Anthropic)
 *   https://commoncrawl.org/ccbot
 */
const SEARCH_ENGINES = ["Googlebot", "Bingbot"];
const AI_SEARCH = ["OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "Claude-SearchBot", "Claude-User"];
const AI_TRAINING_ALLOWED = ["GPTBot", "Google-Extended", "CCBot", "ClaudeBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: SEARCH_ENGINES, allow: "/" },
      { userAgent: AI_SEARCH, allow: "/" },
      { userAgent: AI_TRAINING_ALLOWED, allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
