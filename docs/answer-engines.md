# Answer engines: ChatGPT, Perplexity, Gemini and Google AI answers

The site side is done: AI search crawlers are allowed in `robots.txt`, the main pages answer questions in their first two sentences, and facts are in plain HTML text with sources. What decides whether answer engines **mention** Dishigen is mostly off-site: other sites describing it, reviews, and lists of WhatsApp tools. This document covers that work and a monthly check.

## How the site is set up

| What | Where |
| --- | --- |
| Crawler rules: Googlebot, Bingbot (also feeds Microsoft Copilot), OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Claude-SearchBot, Claude-User, and the training crawlers GPTBot, Google-Extended, CCBot and ClaudeBot are all allowed (owner decision, 14 October 2026) | `app/robots.ts` (sources in the comments) |
| One product name and one-sentence description, used in metadata, JSON-LD, the product page, the About page, page footers' call-to-action panels and `llms.txt` | `app/lib/site.ts` |
| Facts with sources and "as of" dates | `app/content/facts.ts` |
| Product questions and answers (only owner-confirmed answers are shown) | `app/content/product.ts` |
| `llms.txt`, a plain-text list of the main pages. Optional: Google says no special file is needed to appear in its AI features ([Google Search Central](https://developers.google.com/search/docs/appearance/ai-features)). | `app/llms.txt/route.ts` |

Keep the one-sentence description identical everywhere you control: Google Business Profile, LinkedIn, G2, Capterra, Product Hunt, partner listings and press mentions. Answer engines trust a description they see repeated in the same words on independent sites.

> Dishigen is a WhatsApp and email marketing platform for businesses built on repeat visits, made by Eigensu in Mumbai.

## Off-site work (by hand)

### Profiles
- [ ] **LinkedIn**: a showcase page for Dishigen under the Eigensu company page, using the exact description above, with a link to `https://eigensu.in/dishigen`.
- [ ] **G2**: claim or create the Dishigen listing in the WhatsApp marketing / SMS marketing categories. Add screenshots, the description, pricing once published, and the industries.
- [ ] **Capterra** (also covers GetApp and Software Advice): create a vendor listing with the same details.
- [ ] **Product Hunt**: plan a launch once the product page has real screenshots. Prepare a maker comment, a short demo video and three customer quotes (with permission).
- [ ] **Google Business Profile** for Eigensu in Mumbai, linking to the site.

### Reviews
- [ ] Ask every active client for a review on G2 or Capterra. Send a direct link and two prompts (what problem it solved, and what changed). Aim for a steady trickle rather than one burst.
- [ ] With permission, turn the best reviews into case studies on the site. This fills the case study section hidden in Phase 1 (`FEATURES.caseStudies`).
- [ ] Never offer incentives that break the review site's rules, and never write reviews on clients' behalf.

### Roundups and mentions
- [ ] Search for "best WhatsApp marketing tools India", "WhatsApp API providers for restaurants" and "AiSensy alternatives". List the articles that rank, and email their authors with a short pitch and a demo account.
- [ ] Offer the WhatsApp cost calculator and the service-charges guide as a resource to restaurant, salon and gym industry blogs and associations.
- [ ] Get listed in Meta's partner directories if Dishigen qualifies (TODO(owner): confirm partner status).
- [ ] Answer genuine questions on Reddit, Quora and LinkedIn about WhatsApp pricing or error 131049, linking to the guide when it actually helps. Say you work for Eigensu.

## Monthly check

On the first working day of each month, ask each engine the same ten questions in a fresh, logged-out or incognito session, with location set to India where the tool allows. Record whether Dishigen or eigensu.in appears, and note the position and what it says.

### The ten questions

1. What is the best WhatsApp marketing software for restaurants in India?
2. How much does the WhatsApp Business API cost per message in India?
3. Are WhatsApp service messages free in India after October 2026?
4. What does WhatsApp error 131049 mean and how do I fix it?
5. What are good WhatsApp marketing tools for salons and spas in India?
6. How can a gym send membership renewal reminders on WhatsApp?
7. Is there a WhatsApp API cost calculator for India?
8. What are good AiSensy alternatives for restaurants?
9. Do I need opt-in to send WhatsApp marketing messages to customers in India?
10. What is Dishigen?

### Log

Use ✓ (Dishigen or eigensu.in is mentioned or cited), ✗ (not mentioned) and a note on what was said or cited. Copy the block for each month.

| Month | # | ChatGPT | Perplexity | Gemini | Google AI answers | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-11 | 1 |  |  |  |  |  |
| 2026-11 | 2 |  |  |  |  |  |
| 2026-11 | 3 |  |  |  |  |  |
| 2026-11 | 4 |  |  |  |  |  |
| 2026-11 | 5 |  |  |  |  |  |
| 2026-11 | 6 |  |  |  |  |  |
| 2026-11 | 7 |  |  |  |  |  |
| 2026-11 | 8 |  |  |  |  |  |
| 2026-11 | 9 |  |  |  |  |  |
| 2026-11 | 10 |  |  |  |  |  |

### What to do with the results
- **A wrong fact** (for example an old price, or the old name "DishPatch"): fix it at the source it cites. Then check that our page states the right fact in its first two sentences.
- **A competitor is cited but we aren't**: look at what the cited page has that ours lacks (a table, a date, a number), and add it if it's true.
- **Nothing changes for three months**: put more effort into the off-site work above; on-site changes alone rarely move these answers.
