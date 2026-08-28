/**
 * Blog content.
 *
 * Plain data + helpers only — no React, no "use client" — so this can be
 * imported from the server component that generates /blog/[slug] routes and
 * from the client components that render them.
 */

export type Block =
  | { t: "p"; text: string }
  | { t: "h2"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "quote"; text: string }
  | { t: "code"; file: string; lines: string[] }
  | { t: "stat"; items: { num: string; label: string }[] }
  | { t: "note"; label: string; text: string };

export type Post = {
  slug: string;
  category: string;
  date: string;
  iso: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  body: Block[];
};

/** Category → tile colours, drawn from the site palette. */
export const CATEGORY_STYLE: Record<string, { bg: string; fg: string }> = {
  Operations:  { bg: "var(--ember)",  fg: "var(--cream)" },
  Engineering: { bg: "var(--basil)",  fg: "var(--cream)" },
  Product:     { bg: "var(--peri)",   fg: "var(--cream)" },
  Cloud:       { bg: "var(--wine)",   fg: "var(--cream)" },
  Security:    { bg: "var(--butter)", fg: "var(--wine)" },
  Data:        { bg: "var(--peri)",   fg: "var(--cream)" },
  Process:     { bg: "var(--butter)", fg: "var(--wine)" },
};

export function categoryStyle(category: string) {
  return CATEGORY_STYLE[category] ?? { bg: "var(--wine)", fg: "var(--cream)" };
}

/** Stable anchor id for an h2, used by the in-article table of contents. */
export function headingId(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const POSTS: Post[] = [
  /* ── 01 ────────────────────────────────────────────────────────────────── */
  {
    slug: "why-spreadsheets-fail-at-scale",
    category: "Operations",
    date: "Aug 12, 2026",
    iso: "2026-08-12",
    readTime: "6 min read",
    title: "Why spreadsheets fail at scale",
    excerpt:
      "The hidden cost of manual reconciliation, and the tipping point where automation starts paying for itself.",
    author: "Eigensu Operations",
    body: [
      { t: "p", text: "A spreadsheet is the best tool in the world for the first eighteen months of a process. It costs nothing, it ships the same afternoon somebody thinks of it, and it never needs a ticket to change. Most of the good operational thinking inside a company starts life in one, and that is genuinely a healthy thing." },
      { t: "p", text: "The failure is never the spreadsheet itself. It is that nobody notices the moment it stopped being adequate, because the failure arrives as a slow tax rather than an outage." },
      { t: "h2", text: "The three failures, in order" },
      { t: "p", text: "In our experience the collapse is always the same sequence, and it always happens in this order. Recognising which stage you are in tells you how urgent the problem is." },
      { t: "ul", items: [
        "Concurrency. Two people edit the same range on the same afternoon. One of them wins, silently. Nobody finds out until a number is challenged in a meeting three weeks later.",
        "Provenance. A cell contains 4,182 and nobody alive can say where it came from. The formula that produced it was pasted over as a value in some forgotten cleanup.",
        "Validation. The sheet accepts anything. A date typed as text, a negative quantity, a duplicated ID — all of it flows downstream, and the correction cost compounds with every hop.",
      ] },
      { t: "quote", text: "If two people have ever had to ask each other which version is current, the spreadsheet has already failed. Everything after that is the invoice arriving late." },
      { t: "h2", text: "The tipping point is a number, not a feeling" },
      { t: "p", text: "Teams tend to argue about this on instinct, which is why the argument never resolves. It is worth doing the arithmetic instead. Take the hours per week spent maintaining the sheet, add the hours spent correcting what it got wrong, and multiply by loaded cost. Then compare that to a fixed build cost amortised over eighteen months." },
      { t: "p", text: "For a typical mid-sized operations process we see numbers in this range:" },
      { t: "stat", items: [
        { num: "6–11", label: "Hours per week maintaining the sheet" },
        { num: "3–5", label: "Additional hours correcting its output" },
        { num: "4–7", label: "Months to break even on a replacement" },
      ] },
      { t: "p", text: "The correction hours are the ones people forget, and they are usually the larger half. They also fall on your most senior operators, because juniors cannot tell which number is wrong." },
      { t: "h2", text: "What replaces it — and what does not" },
      { t: "p", text: "The wrong answer is a bigger spreadsheet, and the second wrong answer is a general-purpose SaaS tool that models a process adjacent to yours. Both defer the problem at meaningful cost." },
      { t: "p", text: "The right answer is usually smaller than people expect. Most spreadsheet replacements are three things: a schema that refuses bad data at the point of entry, a job that pulls from the systems of record on a schedule, and a single read-only view that everyone agrees is the truth. That is often two to four weeks of work, not a platform migration." },
      { t: "note", label: "Rule of thumb", text: "If the sheet feeds a decision that costs money to get wrong, and more than three people touch it, it has outgrown the format. Cost it out before the next quarter-end rather than after." },
      { t: "p", text: "None of this is an argument against spreadsheets. It is an argument for noticing the handover point — and for treating the drift after it as a cost you are choosing to pay, rather than one you cannot see." },
    ],
  },

  /* ── 02 ────────────────────────────────────────────────────────────────── */
  {
    slug: "tools-operators-actually-want",
    category: "Product",
    date: "Jul 24, 2026",
    iso: "2026-07-24",
    readTime: "4 min read",
    title: "Designing tools operators actually want",
    excerpt:
      "Consumer-grade UX principles applied to internal dashboards, and why adoption is the only metric that matters.",
    author: "Eigensu Product",
    body: [
      { t: "p", text: "Internal software gets graded on the wrong scale. It ships, it meets the spec, the project closes green — and six months later half the team has quietly gone back to the old process with the new tool open in a tab for appearances." },
      { t: "h2", text: "Internal software has a captive audience, and that is the problem" },
      { t: "p", text: "A consumer product that nobody enjoys using dies immediately, which is a brutal but extremely effective feedback loop. An internal tool that nobody enjoys using survives indefinitely, because usage is mandated. The feedback never arrives as churn. It arrives as shadow processes, stale data, and a quiet reluctance to trust anything the system reports." },
      { t: "quote", text: "Adoption is not a rollout problem you solve after launch. It is a design constraint you either respected during the build or did not." },
      { t: "h2", text: "Four things operators ask for, every time" },
      { t: "p", text: "We have sat with dispatch desks, warehouse supervisors, finance approvers and clinical intake staff. The requests are remarkably consistent across all of them:" },
      { t: "ul", items: [
        "Speed over completeness. A screen that loads in 200ms and shows 80% of the answer beats a screen that loads in three seconds and shows everything.",
        "Keyboard paths for the ten things they do a hundred times a day. Mouse-only workflows are the single most common complaint we hear.",
        "Undo, everywhere. Operators move fast because they are trusted to. Fast people make mistakes, and a system without undo makes them slow down permanently.",
        "Honest empty and error states. \"No results for this filter\" is useful. A spinner that never resolves teaches people to stop trusting the tool.",
      ] },
      { t: "h2", text: "Design for the worst day, not the demo" },
      { t: "p", text: "Every internal tool looks good with twelve rows of clean seed data. The question that matters is what it does at 4pm on the worst Friday of the quarter, with 9,000 rows, three conflicting updates and someone from finance standing behind the operator's chair." },
      { t: "p", text: "That is the scenario worth prototyping first. If the interface holds under it, the ordinary Tuesday takes care of itself. If it does not, no amount of onboarding will rescue the rollout." },
      { t: "note", label: "What we do", text: "We run the first working demo against a copy of real production volume, never seed data. It is less flattering, and it surfaces the design problems while they are still cheap to fix." },
      { t: "p", text: "The goal is not for people to praise the tool. It is for them to stop noticing it — which is a much higher bar, and the only one that predicts whether the thing is still in use two years later." },
    ],
  },

  /* ── 03 ────────────────────────────────────────────────────────────────── */
  {
    slug: "declarative-workflows",
    category: "Engineering",
    date: "Jun 30, 2026",
    iso: "2026-06-30",
    readTime: "8 min read",
    title: "Declarative workflows over drag-and-drop",
    excerpt:
      "Why versioned, code-first automation beats black-box builders for anything mission-critical.",
    author: "Eigensu Engineering",
    body: [
      { t: "p", text: "Visual workflow builders are excellent at the first version of an automation and increasingly poor at every version after it. That trade is fine for a marketing trigger and genuinely dangerous for anything that moves money, stock or patient records." },
      { t: "h2", text: "What drag-and-drop optimises for" },
      { t: "p", text: "Builders optimise for time-to-first-run by a non-engineer. That is a real and valuable thing, and it explains their popularity honestly. The cost is that the workflow's definition lives in a vendor's database as opaque state rather than in your repository as text." },
      { t: "p", text: "Everything downstream follows from that one fact. You cannot diff opaque state, so you cannot review it. You cannot review it, so you cannot approve changes. You cannot approve changes, so you cannot roll them back with confidence." },
      { t: "h2", text: "What breaks at 2am" },
      { t: "ul", items: [
        "Nobody can answer \"what changed?\" A workflow that worked yesterday fails today, and the only audit trail is a last-modified timestamp and a name.",
        "There is no staging copy that is genuinely identical to production, because the copy is made by hand.",
        "Error handling is per-node and invisible. Retry counts and dead-letter behaviour are configured in eleven separate dialogs, and nobody has read all eleven.",
        "Testing means running it. There is no way to assert on the logic without triggering the side effects.",
      ] },
      { t: "p", text: "A declarative definition removes all four at once, because the workflow becomes an ordinary file that ordinary tooling already understands:" },
      { t: "code", file: "invoice-sync.workflow.ts", lines: [
        "// Reconcile vendor invoices against the ledger, nightly.",
        "export const invoiceSync = workflow({",
        "  trigger: schedule(\"0 2 * * *\"),",
        "  retries: 3,",
        "  onFailure: alert(\"#ops-oncall\"),",
        "",
        "  run: async ({ step }) => {",
        "    const rows    = await step.fetch(\"erp.invoices\", { since: \"24h\" });",
        "    const matched = await step.run(\"reconcile\", () => reconcile(rows, ledger));",
        "",
        "    await step.commit(matched);",
        "    return { synced: matched.length, skipped: rows.length - matched.length };",
        "  },",
        "});",
      ] },
      { t: "p", text: "Nothing here is clever. That is the point. The trigger, the retry policy and the failure route are declared in one place, the business logic is an ordinary function you can unit-test without a network, and the whole thing is forty lines that a reviewer can hold in their head." },
      { t: "h2", text: "Diffs, reviews and rollbacks come free" },
      { t: "p", text: "Once the definition is text, your existing engineering process applies to it without modification. A change to the retry policy shows up in a pull request. It gets reviewed by someone who understands the consequences. It deploys through the same pipeline as everything else, and it reverts with a single command at 2am when the person who has to fix it is not the person who wrote it." },
      { t: "quote", text: "The value is not that code is more powerful than a canvas. It is that a diff is more powerful than a memory." },
      { t: "h2", text: "When a builder is genuinely the right answer" },
      { t: "p", text: "We are not absolutists about this. A visual builder is the correct choice when all of the following hold:" },
      { t: "ul", items: [
        "The workflow is owned and edited by a non-engineering team, and will stay that way.",
        "A silent failure costs an opportunity rather than money, data integrity or compliance standing.",
        "The logic fits on one screen and is expected to stay there.",
      ] },
      { t: "p", text: "Marketing sequences, internal notifications and lead routing all pass that test comfortably. Invoice reconciliation, inventory movements, approval chains and anything touching a regulated record do not — and the moment a builder-based workflow becomes load-bearing, the migration is far more expensive than starting it in code would have been." },
    ],
  },

  /* ── 04 ────────────────────────────────────────────────────────────────── */
  {
    slug: "zero-downtime-cloud-migration",
    category: "Cloud",
    date: "Mar 12, 2026",
    iso: "2026-03-12",
    readTime: "6 min read",
    title: "Zero-downtime cloud migration without the drama",
    excerpt:
      "How we moved a 2,400-seat financial institution to hybrid AWS and Azure while keeping payment pipelines at 99.99% SLA.",
    author: "Eigensu Engineering",
    body: [
      { t: "p", text: "Every migration plan contains one honest sentence and a lot of scaffolding around it. The honest sentence is usually: we do not fully know what depends on this. Most of the risk in a large migration comes from that gap, not from the technology on either side of it." },
      { t: "h2", text: "Migrate the boring things first" },
      { t: "p", text: "The instinct is to prove the hard case early. We do the opposite, and move the least interesting workloads first — internal reporting, batch exports, the document store. Not because they matter least, but because they exercise every piece of the new environment while nobody's payment is in flight." },
      { t: "p", text: "By the time the first workload that matters moves, the network path, the identity federation, the observability pipeline and the deployment process have all been used in anger for six weeks. The scary migration then only tests one new thing instead of nine." },
      { t: "h2", text: "The strangler pattern, applied to a payment path" },
      { t: "p", text: "Payment flows do not get a cutover window. They get a dial. We put a routing layer in front of the service, moved traffic in fractions, and held each fraction long enough to see a full business cycle before turning it further." },
      { t: "code", file: "traffic-split.yaml", lines: [
        "route: payments.authorise",
        "guard:",
        "  error_rate_max: 0.05%      # auto-halt the ramp",
        "  p99_latency_max: 400ms",
        "  compare_against: legacy    # shadow every request",
        "",
        "stages:",
        "  - { weight: 1,   hold: 24h }",
        "  - { weight: 5,   hold: 48h }",
        "  - { weight: 25,  hold: 72h }",
        "  - { weight: 100, hold: 168h, rollback_window: 168h }",
      ] },
      { t: "p", text: "The shadow comparison is the part that earns its cost. For the whole ramp, every request ran against both implementations and the responses were diffed offline. Three genuine behavioural differences surfaced that way, all in rounding and currency edge cases, and all found before a customer met them." },
      { t: "stat", items: [
        { num: "0", label: "Minutes of planned downtime" },
        { num: "99.99%", label: "Payment SLA held through the ramp" },
        { num: "11 wk", label: "First workload to full cutover" },
      ] },
      { t: "quote", text: "A migration you can stop at any percentage is not really a migration. It is a series of small, reversible decisions that happen to end somewhere new." },
      { t: "h2", text: "The rollback you hope not to use" },
      { t: "p", text: "We kept the legacy path warm and receiving shadow traffic for a full week after 100%. It cost real money to run two systems for that week, and it was the cheapest insurance in the programme. The rules we hold to:" },
      { t: "ul", items: [
        "Rollback must be a config change, never a redeploy.",
        "Anyone on the on-call rota can trigger it without waking an architect.",
        "Data written during the ramp must be readable by both systems, which usually means no schema change ships in the same window as the traffic move.",
      ] },
      { t: "p", text: "That last rule is the one teams break most often, and it is the one that turns a reversible migration into a one-way door." },
    ],
  },

  /* ── 05 ────────────────────────────────────────────────────────────────── */
  {
    slug: "zero-trust-in-90-days",
    category: "Security",
    date: "Feb 28, 2026",
    iso: "2026-02-28",
    readTime: "8 min read",
    title: "Zero trust in 90 days: a healthcare case study",
    excerpt:
      "Deploying identity-first security across 14 hospitals — and reaching ISO 27001 ahead of schedule.",
    author: "Eigensu Engineering",
    body: [
      { t: "p", text: "Ninety days is not enough time to do zero trust properly, and everyone involved knew it at the start. It was enough time to do one architectural thing properly and sequence the rest behind it, which turned out to be the more useful goal." },
      { t: "h2", text: "Ninety days buys you exactly one architectural decision" },
      { t: "p", text: "The temptation across fourteen sites is to run fourteen parallel workstreams. That fails predictably, because the sites have different network vintages, different clinical systems and very different appetites for disruption during a shift." },
      { t: "p", text: "So we picked one decision to make everywhere, in the same way, before anything else moved:" },
      { t: "ul", items: [
        "Every request carries a verified identity. No exceptions for internal networks, no exceptions for legacy clinical devices — those got a broker rather than a bypass.",
        "Authorisation is evaluated at the resource, not at the perimeter.",
        "Every allow and every deny is logged with the identity, the resource and the policy that decided it.",
      ] },
      { t: "h2", text: "Identity first, network second" },
      { t: "p", text: "The traditional order is to segment the network and then layer identity on top. In a hospital that order is close to impossible: the network has grown for twenty-five years, and a segmentation mistake takes an imaging suite offline during a list." },
      { t: "p", text: "Inverting it meant the network stayed flat for the first two months while identity became load-bearing. That felt uncomfortable to the security team and it was the correct call — because once every request was identified, we could see exactly what talked to what, and the segmentation design stopped being guesswork." },
      { t: "quote", text: "You cannot segment a network you cannot describe. Two months of honest traffic logs is worth more than a year of architectural diagrams." },
      { t: "stat", items: [
        { num: "14", label: "Sites moved to identity-first access" },
        { num: "0", label: "Clinical sessions interrupted by rollout" },
        { num: "−6 wk", label: "ISO 27001 audit ahead of schedule" },
      ] },
      { t: "h2", text: "The audit became a by-product" },
      { t: "p", text: "The ISO timeline was originally a separate programme running alongside. It finished early because roughly two-thirds of the evidence the auditors wanted — access reviews, authorisation records, change history on policy — was already being produced automatically by the thing we had built for operational reasons." },
      { t: "note", label: "Worth knowing", text: "If your security controls require someone to assemble evidence by hand before an audit, the controls are documentation rather than architecture. Real controls emit their own evidence as a side effect of running." },
      { t: "p", text: "Ninety days did not deliver zero trust. It delivered the foundation that made the following nine months tractable, and an audit position that no longer depended on a spreadsheet of screenshots." },
    ],
  },

  /* ── 06 ────────────────────────────────────────────────────────────────── */
  {
    slug: "event-driven-logistics",
    category: "Engineering",
    date: "Feb 14, 2026",
    iso: "2026-02-14",
    readTime: "5 min read",
    title: "Sub-100ms tracking with an event-driven backbone",
    excerpt:
      "Why an append-only log beat polling for a pan-India operator managing 18,000+ daily shipments.",
    author: "Eigensu Engineering",
    body: [
      { t: "p", text: "The brief was to make shipment tracking faster. The actual problem was that six different systems each held a partial, differently-stale view of where a parcel was, and every one of them found out by asking." },
      { t: "h2", text: "Polling is a tax you pay per consumer" },
      { t: "p", text: "With polling, adding a seventh consumer of shipment state adds a seventh load pattern on the source database. Freshness and cost move in opposite directions: to halve the staleness you double the queries. Nobody ever wins that negotiation, so in practice the interval gets set once and then defended for years." },
      { t: "stat", items: [
        { num: "18k+", label: "Shipments tracked daily" },
        { num: "90s → 80ms", label: "Position staleness, p95" },
        { num: "−64%", label: "Read load on the source database" },
      ] },
      { t: "h2", text: "One log, many readers" },
      { t: "p", text: "Inverting it is conceptually simple: the scanner, the driver app and the depot terminal write events; everything else reads the log at whatever pace it needs. Consumers become independent, and adding the seventh one costs the source system nothing." },
      { t: "code", file: "shipment-events.ts", lines: [
        "// One event type per real-world thing that happened.",
        "type ShipmentEvent =",
        "  | { kind: \"scanned\";   at: Timestamp; hub: HubId;    awb: string }",
        "  | { kind: \"loaded\";    at: Timestamp; vehicle: Id;   awb: string }",
        "  | { kind: \"departed\";  at: Timestamp; vehicle: Id;   awb: string }",
        "  | { kind: \"delivered\"; at: Timestamp; pod: PodRef;   awb: string };",
        "",
        "// Consumers project the log into whatever shape they need.",
        "//   tracking-api  → latest position per AWB      (keyed, compacted)",
        "//   ops-console   → live exceptions              (windowed, 15m)",
        "//   billing       → completed legs               (batch, nightly)",
      ] },
      { t: "p", text: "The discipline that makes this work is that events describe what happened, never what should happen next. A scan is a fact. \"Notify the customer\" is a decision, and decisions belong to consumers — otherwise the log becomes a queue of instructions and you have rebuilt the coupling you were trying to remove." },
      { t: "quote", text: "Events are facts about the past. The moment one contains an instruction, you have a distributed monolith with extra steps." },
      { t: "h2", text: "What we would do differently" },
      { t: "ul", items: [
        "Version the event schema from day one. We added versioning in month four and paid for it twice.",
        "Decide the retention and replay story before the first consumer, not after the first incident that needs a replay.",
        "Keep the projections genuinely disposable. If rebuilding one takes longer than a lunch break, it will not get rebuilt when it should be.",
      ] },
      { t: "p", text: "None of this required exotic infrastructure. It required agreeing, once, that the log is the source of truth and that everything else is a view of it." },
    ],
  },

  /* ── 07 ────────────────────────────────────────────────────────────────── */
  {
    slug: "managed-services-sre",
    category: "Operations",
    date: "Jan 30, 2026",
    iso: "2026-01-30",
    readTime: "7 min read",
    title: "What 24/7 managed services actually looks like",
    excerpt:
      "MTTD under four minutes, MTTR under twenty-two — sustained across three years of SRE ownership.",
    author: "Eigensu Operations",
    body: [
      { t: "p", text: "\"24/7 support\" appears in almost every managed services contract and means almost nothing on its own. It describes when somebody is contractually obliged to answer, not what happens after they do." },
      { t: "h2", text: "24/7 is a staffing model, not a promise" },
      { t: "p", text: "The questions that determine whether an arrangement is real are unglamorous, and they are worth asking before signing rather than during an incident:" },
      { t: "ul", items: [
        "Does the person who answers at 3am have write access, or do they escalate to someone who does?",
        "How many systems is that rota covering simultaneously, and what is the realistic concurrent-incident capacity?",
        "Who writes the runbook — the team that built the system, or the team that answers the phone?",
        "What is measured: time to acknowledge, or time to resolve? Only one of those is the customer's problem.",
      ] },
      { t: "stat", items: [
        { num: "3:48", label: "Mean time to detect" },
        { num: "21:30", label: "Mean time to restore" },
        { num: "3 yr", label: "Sustained under one rota" },
      ] },
      { t: "h2", text: "Alerts that earn their interruption" },
      { t: "p", text: "The single biggest lever on MTTR is not tooling. It is the ratio of alerts that require action to alerts that do not. A rota that gets woken four times a night for things that resolve themselves will be slower on the one that matters, and no dashboard fixes that." },
      { t: "p", text: "We hold every alert to one test: if this fires and the responder does nothing, does something get worse? If the answer is no, it is a dashboard entry, not a page. Applying that rule cut the overnight page volume by roughly two-thirds in the first quarter, and the detection time improved as a direct consequence." },
      { t: "quote", text: "Every alert that does not need a human is stealing attention from one that does. Alert hygiene is a latency optimisation, not a comfort measure." },
      { t: "note", label: "The review that matters", text: "Once a month, read every page from the last thirty days and delete or downgrade the ones nobody acted on. It takes an hour and it is the highest-return hour in the whole practice." },
      { t: "h2", text: "The handover that never quite happens" },
      { t: "p", text: "The failure mode of long-running managed services is that operational knowledge accumulates in the vendor and never returns. Three years in, the client cannot run their own system, which is a commercially convenient outcome and a bad one." },
      { t: "p", text: "We write runbooks against the assumption that we will not be here. Every incident produces a documented resolution path, every recurring manual step becomes a scheduled job, and the client's own engineers sit on the rota on a rotation. If the relationship ends, it ends without a cliff." },
    ],
  },

  /* ── 08 ────────────────────────────────────────────────────────────────── */
  {
    slug: "lakehouse-analytics",
    category: "Data",
    date: "Jan 18, 2026",
    iso: "2026-01-18",
    readTime: "6 min read",
    title: "From fragmented BI to a modern lakehouse",
    excerpt:
      "Eleven data sources, one warehouse, and analyst turnaround that went from days to minutes.",
    author: "Eigensu Engineering",
    body: [
      { t: "p", text: "The request was for a better BI tool. The third dashboard we were shown had a caveat written into its title, and the fourth had two. That is usually the real diagnosis: people had stopped trusting the numbers and started annotating them." },
      { t: "h2", text: "The problem was never the BI tool" },
      { t: "p", text: "Eleven sources fed reporting, and each analyst had built their own path from raw table to answer. The paths disagreed in small, defensible ways, which is far worse than disagreeing loudly:" },
      { t: "ul", items: [
        "Three different definitions of an active customer, all of them reasonable in isolation.",
        "Revenue recognised at order in two dashboards and at fulfilment in three others.",
        "Time zones applied at query time by some pipelines and at ingest by others.",
      ] },
      { t: "p", text: "Swapping the visualisation layer would have rendered exactly the same disagreements in a nicer typeface." },
      { t: "h2", text: "Contracts before pipelines" },
      { t: "p", text: "We wrote the definitions down first, as code, and made them the only sanctioned way to compute those numbers. The warehouse work followed the contract rather than the other way round." },
      { t: "code", file: "metrics/active_customer.sql", lines: [
        "-- The single sanctioned definition. Referenced, never copied.",
        "-- Owner: Commercial Ops · Reviewed: quarterly",
        "",
        "SELECT customer_id",
        "FROM   fct_orders",
        "WHERE  fulfilled_at >= DATEADD(day, -90, CURRENT_DATE)",
        "  AND  status = 'FULFILLED'          -- not 'PLACED'",
        "  AND  channel <> 'INTERNAL_TEST'",
        "GROUP BY customer_id",
        "HAVING COUNT(*) >= 1;",
      ] },
      { t: "p", text: "The comment about ownership is not decoration. A metric with no named owner drifts within two quarters, because the first person with a good reason to bend it will bend it and nobody has standing to object." },
      { t: "quote", text: "A data platform is an agreement about definitions that happens to have storage attached. Get the agreement wrong and the storage cannot save you." },
      { t: "stat", items: [
        { num: "11 → 1", label: "Sources to one warehouse" },
        { num: "2 days → 4 min", label: "Typical analyst turnaround" },
        { num: "38", label: "Contracted metric definitions" },
      ] },
      { t: "h2", text: "Cost, honestly" },
      { t: "p", text: "Warehouse spend went up. It went up by less than the analyst hours it returned, but anyone promising that a consolidation reduces infrastructure cost is selling something. The saving is in time-to-answer and in decisions that stop being re-litigated, and those are the numbers worth putting in the business case." },
    ],
  },

  /* ── 09 ────────────────────────────────────────────────────────────────── */
  {
    slug: "ai-assisted-delivery",
    category: "Process",
    date: "Jan 5, 2026",
    iso: "2026-01-05",
    readTime: "4 min read",
    title: "AI tools in enterprise delivery, without the hype",
    excerpt:
      "Where AI coding assistants genuinely save time on client work — and where they quietly cost you.",
    author: "Eigensu Engineering",
    body: [
      { t: "p", text: "We use AI coding tools daily and we bill clients for outcomes, not keystrokes, so the question of where they actually help is a commercial one rather than a philosophical one. Two years in, the pattern is clear enough to write down." },
      { t: "h2", text: "Where it pays" },
      { t: "ul", items: [
        "Translation between well-understood forms. Schema to types, types to validators, an API spec to a typed client. High volume, low ambiguity, easy to verify.",
        "The first draft of tests for code that already exists. It is genuinely good at enumerating the cases a tired engineer skips.",
        "Reading unfamiliar code. Asking what a 2,000-line legacy module does is faster than reading it, and the answer is checkable against the code in front of you.",
        "Boilerplate with a strong existing pattern in the repository. It matches house style better than most new joiners do in week one.",
      ] },
      { t: "h2", text: "Where it costs" },
      { t: "ul", items: [
        "Anywhere the requirement is genuinely ambiguous. It will resolve the ambiguity confidently and invisibly, and you will find out in review — or later.",
        "Code with implicit business rules that live in nobody's documentation. It cannot know that a status of 4 means something different for one client, and it will not ask.",
        "Novel architecture. It produces plausible, average designs, which is exactly the wrong output when the problem is why the average design does not fit.",
        "Anything where review load is already the bottleneck. Generating more code faster does not help a team whose constraint is reviewing it.",
      ] },
      { t: "quote", text: "The tools moved our bottleneck from writing code to reviewing it. That is a real gain, but only if you also move review capacity." },
      { t: "note", label: "House rule", text: "Anything AI-assisted gets the same review as anything else, and the author is fully accountable for it. \"The tool wrote it\" has never been an acceptable answer in a post-incident review, and it never will be." },
      { t: "p", text: "The honest summary is unexciting: a solid improvement on the mechanical half of the job, no improvement at all on the hard half, and a modest new tax on review. Worth using, not worth restructuring a delivery model around." },
    ],
  },
];

export const CATEGORIES = Array.from(new Set(POSTS.map(p => p.category)));

export function getPost(slug: string) {
  return POSTS.find(p => p.slug === slug);
}

export function relatedPosts(slug: string, count = 3) {
  const current = getPost(slug);
  if (!current) return POSTS.slice(0, count);
  const sameCategory = POSTS.filter(p => p.slug !== slug && p.category === current.category);
  const rest = POSTS.filter(p => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}
