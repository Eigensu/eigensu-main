"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/** Fades content in once it scrolls into view. Lets server components keep the scroll-reveal effect. */
export default function Reveal({
  as: Tag = "div",
  children,
  className,
  style,
  threshold = 0.1,
  duration = 0.7,
}: {
  as?: "div" | "article" | "section";
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setOn(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ ...style, opacity: on ? 1 : 0, transform: on ? "translateY(0)" : "translateY(20px)", transition: `opacity ${duration}s, transform ${duration}s` }}
    >
      {children}
    </Tag>
  );
}
