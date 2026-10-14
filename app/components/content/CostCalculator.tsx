"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { estimateMonthlyCost, type CalculatorInput } from "../../lib/calculator";
import { CATEGORY_LABELS, GST_RATE, WHATSAPP_INDIA, formatDate, formatInr, type MessageCategory } from "../../content/facts";
import { track } from "../../lib/analytics";

const FIELDS: { key: keyof CalculatorInput; label: string; hint: string }[] = [
  { key: "marketing", label: "Marketing messages", hint: WHATSAPP_INDIA.marketing.display },
  { key: "utility", label: "Utility messages", hint: WHATSAPP_INDIA.utility.display },
  { key: "authentication", label: "Authentication messages", hint: WHATSAPP_INDIA.authentication.display },
  { key: "service", label: "Service messages (replies)", hint: `${WHATSAPP_INDIA.service.display} after the free allowance` },
  { key: "phoneNumbers", label: "WhatsApp numbers sending", hint: "Each number gets its own free service allowance" },
];

const START: CalculatorInput = { marketing: 2000, utility: 1000, authentication: 0, service: 1500, phoneNumbers: 1 };

/** Interactive monthly cost estimate. All rates come from content/facts.ts. */
export default function CostCalculator() {
  const [values, setValues] = useState<Record<keyof CalculatorInput, string>>(
    () => Object.fromEntries(Object.entries(START).map(([k, v]) => [k, String(v)])) as Record<keyof CalculatorInput, string>,
  );
  const input = useMemo(
    () => Object.fromEntries(Object.entries(values).map(([k, v]) => [k, Number(v.replace(/,/g, ""))])) as CalculatorInput,
    [values],
  );
  const result = estimateMonthlyCost(input);

  // calculator_used: once per page view, after the visitor changes an input.
  const tracked = useRef(false);
  const touched = useRef(false);
  useEffect(() => {
    if (touched.current && !tracked.current) {
      tracked.current = true;
      track("calculator_used", { cta_location: "calculator" });
    }
  }, [values]);

  return (
    <div className="calc">
      <form className="calc-inputs" onSubmit={(e) => e.preventDefault()} aria-label="Messages per month">
        {FIELDS.map((f) => (
          <label key={f.key} className="calc-field">
            <span className="calc-label">{f.label}</span>
            <input
              type="number"
              inputMode="numeric"
              min={f.key === "phoneNumbers" ? 1 : 0}
              step={1}
              value={values[f.key]}
              onChange={(e) => {
                touched.current = true;
                setValues((v) => ({ ...v, [f.key]: e.target.value }));
              }}
            />
            <span className="calc-hint">{f.hint}</span>
          </label>
        ))}
      </form>

      <div className="calc-result" aria-live="polite">
        <div className="table-wrap">
          <table>
            <caption>Estimated monthly Meta charges, Indian numbers</caption>
            <thead>
              <tr><th scope="col">Category</th><th scope="col">Charged messages</th><th scope="col">Cost</th></tr>
            </thead>
            <tbody>
              {result.lines.map((l) => (
                <tr key={l.category}>
                  <th scope="row">{CATEGORY_LABELS[l.category as MessageCategory]}</th>
                  <td>
                    {l.billable.toLocaleString("en-IN")}
                    {l.category === "service" && l.messages > 0 && (
                      <span className="note"> ({Math.min(l.messages, result.freeServiceAllowance).toLocaleString("en-IN")} free)</span>
                    )}
                  </td>
                  <td>{formatInr(l.cost)}</td>
                </tr>
              ))}
              <tr><th scope="row">Subtotal</th><td /><td>{formatInr(result.subtotal)}</td></tr>
              <tr><th scope="row">{GST_RATE.display}</th><td /><td>{formatInr(result.gst)}</td></tr>
              <tr><th scope="row">Total per month</th><td /><td><strong>{formatInr(result.total)}</strong></td></tr>
            </tbody>
          </table>
        </div>
        <p className="note">Meta&apos;s rates as of {formatDate(WHATSAPP_INDIA.effectiveFrom)}. Excludes any software subscription.</p>
      </div>
    </div>
  );
}
