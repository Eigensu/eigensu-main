import { SERVICES, SLOW_MS, type CheckResult, type MonitoredService } from "../../lib/status";

/**
 * GET /api/status — checks every monitored service right now.
 * The CDN caches the answer for 60s so a busy status page never turns into
 * a flood of requests against client sites.
 */

const TIMEOUT_MS = 10000;

async function check(service: MonitoredService): Promise<CheckResult> {
  const started = performance.now();
  const base = {
    id: service.id,
    name: service.name,
    host: new URL(service.url).host,
    group: service.group,
    note: service.note,
    checkedAt: new Date().toISOString(),
  };
  try {
    const res = await fetch(service.url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": "EigensuStatus/1.0 (+https://eigensu.in/status)" },
    });
    // We only need the status line; don't download whole pages.
    res.body?.cancel().catch(() => {});
    const latencyMs = Math.round(performance.now() - started);
    const ok = res.status < 500;
    return {
      ...base,
      state: !ok ? "down" : latencyMs > SLOW_MS ? "slow" : "up",
      statusCode: res.status,
      latencyMs,
    };
  } catch {
    return { ...base, state: "down", statusCode: null, latencyMs: null };
  }
}

export async function GET() {
  const results = await Promise.all(SERVICES.map(check));
  return Response.json(
    { checkedAt: new Date().toISOString(), results },
    { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" } },
  );
}
