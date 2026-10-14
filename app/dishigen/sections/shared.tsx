"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setOn(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, on };
}

export function Eyebrow({
  children,
  dot = false,
  center = false,
  color = "var(--ember)",
}: {
  children: ReactNode;
  dot?: boolean;
  center?: boolean;
  color?: string;
}) {
  return (
    <div
      className="flex items-center gap-[9px] mb-[22px]"
      style={{
        justifyContent: center ? "center" : undefined,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: ".13em",
        textTransform: "uppercase",
        color,
      }}
    >
      {dot && (
        <span style={{ display: "block", width: 7, height: 7, flex: "0 0 7px", borderRadius: "50%", background: "currentColor" }} />
      )}
      {children}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mx-auto ${className}`}
      style={{ width: "min(1380px, calc(100% - 48px))", maxWidth: 1380 }}
    >
      {children}
    </div>
  );
}
