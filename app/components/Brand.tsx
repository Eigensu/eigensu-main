/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";

/**
 * Eigensu brand marks. The logo files come straight from the brand kit
 * (public/brand/*), so the lettering is outlined and needs no font.
 *
 * Brand-kit rules worth remembering when placing these:
 *  - light version on light surfaces, dark version on dark ones;
 *  - full logo never narrower than 80px, mark never smaller than 16px;
 *  - never recolour, stretch or add effects to the key.
 */

const LOGO_RATIO = 558.78 / 132; // viewBox of eigensu-logo-*.svg

export function EigensuLogo({
  tone = "light",
  height = 28,
  className,
  style,
}: {
  /** "light" = for light backgrounds, "dark" = for dark backgrounds. */
  tone?: "light" | "dark";
  height?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src={`/brand/eigensu-logo-${tone}.svg`}
      alt="Eigensu"
      width={Math.round(height * LOGO_RATIO)}
      height={height}
      className={className}
      style={{ height, width: "auto", display: "block", ...style }}
    />
  );
}

export function EigensuMark({
  tone = "light",
  size = 32,
  className,
  style,
}: {
  tone?: "light" | "dark";
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src={`/brand/eigensu-mark-${tone}.svg`}
      alt="Eigensu"
      width={Math.round((size * 108) / 112)}
      height={size}
      className={className}
      style={{ height: size, width: "auto", display: "block", ...style }}
    />
  );
}

/* ── Product keys ─────────────────────────────────────────────────────────
   Every product gets its own key, drawn on the exact geometry of the
   Eigensu "e" key (option 51): the same base, gap and status light, so the
   family reads as one keyboard. What changes per product is the key-top
   colour, the letter and, where orange would disappear, the light colour. */

const KEY_BASE =
  "M7.03 9.88C6.23 12.04 5.8 14.37 5.8 16.8V65.2C5.8 76.25 14.75 85.2 25.8 85.2H74.2C85.25 85.2 94.2 76.25 94.2 65.2V16.8C94.2 14.37 93.77 12.04 92.97 9.88C97.29 13.9 100 19.63 100 26V82C100 94.15 90.15 104 78 104H22C9.85 104 0 94.15 0 82V26C0 19.63 2.71 13.9 7.03 9.88Z";
const KEY_TOP =
  "M26 0H74C83.39 0 91 7.61 91 17V65C91 74.39 83.39 82 74 82H26C16.61 82 9 74.39 9 65V17C9 7.61 16.61 0 26 0Z";

export type ProductKeySpec = {
  /** Key-top colour. */
  face: string;
  /** Letter (or glyph) printed on the key. */
  glyph: string;
  /** Glyph colour. */
  ink: string;
  /** Status-light colour; defaults to the brand orange. */
  light?: string;
};

export function ProductKey({
  spec,
  size = 64,
  tone = "light",
  pressed = false,
  title,
  className,
  style,
}: {
  spec: ProductKeySpec;
  size?: number;
  /** "light" draws the base in warm black (for light surfaces), "dark" in cream. */
  tone?: "light" | "dark";
  /** Pushes the key-top down into its base, like a key being pressed. */
  pressed?: boolean;
  title?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const base = tone === "dark" ? "#FBF3E4" : "#1C1917";
  const isSymbol = !/[a-z]/i.test(spec.glyph);
  return (
    <svg
      viewBox="-4 -4 108 112"
      width={Math.round((size * 108) / 112)}
      height={size}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={className}
      style={{ display: "block", overflow: "visible", ...style }}
    >
      <path d={KEY_BASE} fill={base} />
      <g style={{ transform: pressed ? "translateY(9px)" : "translateY(0)", transition: "transform .18s cubic-bezier(.3,1.6,.5,1)" }}>
        <path d={KEY_TOP} fill={spec.face} />
        <text
          x={52}
          y={isSymbol ? 60 : 64}
          textAnchor="middle"
          fill={spec.ink}
          style={{
            fontFamily: "var(--font-logo), 'Bricolage Grotesque', sans-serif",
            fontWeight: 800,
            fontSize: isSymbol ? 58 : 62,
            letterSpacing: "-0.04em",
          }}
        >
          {spec.glyph}
        </text>
        <circle cx={23} cy={15} r={5.2} fill={spec.light ?? "#F0491F"} />
      </g>
    </svg>
  );
}
