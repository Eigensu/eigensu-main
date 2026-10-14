import { test } from "node:test";
import assert from "node:assert/strict";
import { estimateMonthlyCost } from "../app/lib/calculator";

// Hand calculations use: marketing ₹0.8631, utility/authentication/service ₹0.115,
// 1,000 free service messages per number per month, 18% GST.

test("restaurant: 5,000 marketing, 2,000 utility, 1,500 service on one number", () => {
  const r = estimateMonthlyCost({ marketing: 5000, utility: 2000, authentication: 0, service: 1500, phoneNumbers: 1 });
  // 5000 × 0.8631 = 4315.50; 2000 × 0.115 = 230.00; (1500 − 1000) × 0.115 = 57.50
  assert.equal(r.lines.find((l) => l.category === "marketing")!.cost, 4315.5);
  assert.equal(r.lines.find((l) => l.category === "utility")!.cost, 230);
  assert.equal(r.lines.find((l) => l.category === "service")!.billable, 500);
  assert.equal(r.subtotal, 4603); // 4315.50 + 230 + 57.50
  assert.equal(r.gst, 828.54); // 4603 × 0.18
  assert.equal(r.total, 5431.54);
});

test("service messages within the free allowance cost nothing", () => {
  const r = estimateMonthlyCost({ marketing: 0, utility: 0, authentication: 0, service: 900, phoneNumbers: 1 });
  assert.equal(r.lines.find((l) => l.category === "service")!.billable, 0);
  assert.equal(r.total, 0);
});

test("two numbers double the free allowance; authentication is charged", () => {
  const r = estimateMonthlyCost({ marketing: 1000, utility: 0, authentication: 300, service: 2600, phoneNumbers: 2 });
  // allowance 2000 → 600 billable service × 0.115 = 69.00; 1000 × 0.8631 = 863.10; 300 × 0.115 = 34.50
  assert.equal(r.freeServiceAllowance, 2000);
  assert.equal(r.subtotal, 966.6); // 863.10 + 34.50 + 69.00
  assert.equal(r.gst, 173.99); // 966.60 × 0.18 = 173.988
  assert.equal(r.total, 1140.59);
});

test("bad input is treated as zero, and at least one number is assumed", () => {
  const r = estimateMonthlyCost({ marketing: -5, utility: Number.NaN, authentication: 2.7, service: 0, phoneNumbers: 0 });
  assert.equal(r.freeServiceAllowance, 1000);
  assert.equal(r.lines.find((l) => l.category === "authentication")!.messages, 2);
  assert.equal(r.total, 0.27); // 2 × 0.115 = 0.23 + 18% = 0.2714
});
