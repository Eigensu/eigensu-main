"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const MONO = "var(--font-mono), 'JetBrains Mono', ui-monospace, monospace";
export const HEAD = "var(--font-head), 'Sora', sans-serif";
export const BODY = "var(--font-body), 'Hanken Grotesk', sans-serif";

export function Eyebrow({
  children,
  muted = false,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        fontFamily: MONO,
        fontSize: "0.72rem",
        letterSpacing: "2px",
        textTransform: "uppercase" as const,
        color: muted ? "#565c66" : "#3b82f6",
        marginBottom: 16,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: muted ? "#565c66" : "#3b82f6",
          boxShadow: muted ? "none" : "0 0 10px #3b82f6",
          flexShrink: 0,
        }}
      />
      {children}
    </div>
  );
}

export function BtnPrimary({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const s: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: BODY,
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "12px 22px",
    borderRadius: 100,
    background: "#3b82f6",
    color: "#00112e",
    boxShadow: "0 0 0 1px rgba(59,130,246,0.35), 0 8px 28px -8px #3b82f6",
    textDecoration: "none",
    whiteSpace: "nowrap",
    border: "none",
    cursor: "pointer",
  };
  if (href) return <Link href={href} style={s}>{children}</Link>;
  return <button type="button" onClick={onClick} style={s}>{children}</button>;
}

export function BtnGhost({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const s: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: BODY,
    fontWeight: 600,
    fontSize: "0.9rem",
    padding: "12px 22px",
    borderRadius: 100,
    color: "#f3f4f6",
    border: "1px solid rgba(255,255,255,0.16)",
    textDecoration: "none",
    whiteSpace: "nowrap",
    background: "none",
    cursor: "pointer",
  };
  if (href) return <Link href={href} style={s}>{children}</Link>;
  return <button type="button" onClick={onClick} style={s}>{children}</button>;
}

export function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, on };
}

export function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        color: "#8b919c",
        fontSize: "0.9rem",
        lineHeight: 1.5,
      }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "rgba(56,232,176,0.1)",
          border: "1px solid rgba(56,232,176,0.28)",
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 12 12" width={10} height={10} fill="none">
          <path
            d="M2 6l3 3 5-5"
            stroke="#38e8b0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {children}
    </li>
  );
}

export function CtaBlock({
  heading,
  sub,
  primary,
  primaryHref,
  ghost,
  ghostHref,
  ghostFn,
}: {
  heading: string;
  sub: string;
  primary: string;
  primaryHref: string;
  ghost: string;
  ghostHref?: string;
  ghostFn?: () => void;
}) {
  const { ref, on } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        textAlign: "center",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 20,
        padding: "clamp(52px,8vw,88px) clamp(28px,5vw,60px)",
        overflow: "hidden",
        background: "#08090b",
        opacity: on ? 1 : 0,
        transform: on ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .7s, transform .7s",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 480,
          height: 320,
          background: "#3b82f6",
          filter: "blur(120px)",
          opacity: 0.14,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Eyebrow>Get started</Eyebrow>
        <h2
          style={{
            fontFamily: HEAD,
            fontWeight: 700,
            fontSize: "clamp(1.7rem,3vw,2.6rem)",
            letterSpacing: "-0.025em",
            lineHeight: 1.15,
            color: "#f3f4f6",
            maxWidth: "22ch",
            margin: "0 auto 18px",
          }}
        >
          {heading}
        </h2>
        <p
          style={{
            color: "#8b919c",
            fontSize: "clamp(0.92rem,1.3vw,1.05rem)",
            maxWidth: "52ch",
            margin: "0 auto 32px",
            lineHeight: 1.75,
          }}
        >
          {sub}
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <BtnPrimary href={primaryHref}>{primary}</BtnPrimary>
          {ghostFn ? (
            <BtnGhost onClick={ghostFn}>{ghost}</BtnGhost>
          ) : (
            <BtnGhost href={ghostHref ?? "/contact"}>{ghost}</BtnGhost>
          )}
        </div>
      </div>
    </div>
  );
}
