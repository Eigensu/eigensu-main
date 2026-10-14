import { GST_RATE, WHATSAPP_INDIA, type MessageCategory } from "../content/facts";

export type CalculatorInput = Record<MessageCategory, number> & {
  /** WhatsApp business phone numbers sending messages; each gets its own free service allowance. */
  phoneNumbers: number;
};

export type CalculatorLine = { category: MessageCategory; messages: number; billable: number; rate: number; cost: number };

export type CalculatorResult = {
  lines: CalculatorLine[];
  freeServiceAllowance: number;
  subtotal: number;
  gst: number;
  total: number;
};

const round2 = (n: number) => Math.round(n * 100) / 100;
const clean = (n: number) => (Number.isFinite(n) && n > 0 ? Math.floor(n) : 0);

/** Monthly Meta message charges for Indian recipients, from the rates in content/facts.ts. */
export function estimateMonthlyCost(input: CalculatorInput): CalculatorResult {
  const phoneNumbers = Math.max(1, clean(input.phoneNumbers));
  const freeServiceAllowance = phoneNumbers * WHATSAPP_INDIA.freeServicePerNumberPerMonth.value;
  const categories: MessageCategory[] = ["marketing", "utility", "authentication", "service"];

  const lines = categories.map((category) => {
    const messages = clean(input[category]);
    const billable = category === "service" ? Math.max(0, messages - freeServiceAllowance) : messages;
    const rate = WHATSAPP_INDIA[category].value;
    return { category, messages, billable, rate, cost: round2(billable * rate) };
  });

  const subtotal = round2(lines.reduce((sum, l) => sum + l.cost, 0));
  const gst = round2(subtotal * GST_RATE.value);
  return { lines, freeServiceAllowance, subtotal, gst, total: round2(subtotal + gst) };
}
