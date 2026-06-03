"use client";

import Link from "next/link";
import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";

type Theme = "dark" | "light";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

interface CardNavProps {
  logo: React.ReactNode;
  items: CardNavItem[];
  baseColor: string;
  menuColor: string;
  buttonBgColor: string;
  buttonTextColor: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  onLinkClick?: (link: CardNavLink, event: React.MouseEvent<HTMLAnchorElement>) => void;
  topActions?: React.ReactNode;
  ease?: string;
}

function CardNav({
  logo,
  items,
  baseColor,
  menuColor,
  buttonBgColor,
  buttonTextColor,
  ctaLabel = "Contact",
  onCtaClick,
  onLinkClick,
  topActions,
  ease = "power3.out",
}: CardNavProps) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";
        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, "-=0.1");

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className="card-nav-container fixed left-1/2 z-[100] top-4 w-[92%] max-w-[860px] -translate-x-1/2 md:top-6">
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} relative block h-[60px] overflow-hidden rounded-xl p-0 shadow-lg will-change-[height]`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 z-[2] flex h-[60px] items-center justify-between p-2 pl-[1.1rem]">
          <button
            type="button"
            className={`hamburger-menu group order-2 flex h-full cursor-pointer flex-col items-center justify-center gap-[6px] md:order-none ${isHamburgerOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            aria-expanded={isExpanded}
            style={{ color: menuColor }}
          >
            <span
              className={`hamburger-line h-[2px] w-[30px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`hamburger-line h-[2px] w-[30px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>

          <div className="logo-container order-1 flex cursor-pointer items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:order-none">
            {logo}
          </div>

          <div className="flex h-full items-center gap-2 md:gap-3">
            {topActions}
            <button
              type="button"
              className="card-nav-cta-button hidden h-full items-center rounded-[calc(0.75rem-0.2rem)] border-0 px-4 font-body text-sm font-medium transition-colors duration-300 md:inline-flex"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              onClick={onCtaClick}
            >
              {ctaLabel}
            </button>
          </div>
        </div>

        <div
          className={`card-nav-content absolute top-[60px] right-0 bottom-0 left-0 z-[1] flex flex-col items-stretch justify-start gap-2 p-2 ${
            isExpanded ? "visible pointer-events-auto" : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-3`}
          aria-hidden={!isExpanded}
        >
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              ref={setCardRef(idx)}
              className="nav-card relative flex h-auto min-h-[60px] min-w-0 flex-[1_1_auto] select-none flex-col gap-2 rounded-[calc(0.75rem-0.2rem)] p-3 md:h-full md:min-h-0 md:flex-[1_1_0%]"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-heading text-lg tracking-wide md:text-xl">{item.label}</div>
              <div className="nav-card-links mt-auto flex flex-col gap-0.5">
                {item.links.map((lnk) => (
                  <Link
                    key={`${lnk.label}-${lnk.href}`}
                    href={lnk.href}
                    className="nav-card-link inline-flex cursor-pointer items-center gap-1.5 font-body text-[15px] no-underline transition-opacity duration-300 hover:opacity-75 md:text-base"
                    aria-label={lnk.ariaLabel}
                    onClick={(event) => {
                      onLinkClick?.(lnk, event);
                      if (isExpanded) toggleMenu();
                    }}
                  >
                    <GoArrowUpRight className="shrink-0" aria-hidden="true" />
                    {lnk.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}

function EigensuLogo({ isDark }: { isDark: boolean }) {
  const accent = isDark ? "#00f0c3" : "#0d9488";
  const text = isDark ? "#ffffff" : "#0f172a";

  return (
    <Link href="/" className=" flex items-center gap-2 text-sm tracking-wide no-underline" style={{ color: text }}>
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="10" height="10" rx="2" fill={accent} />
        <rect x="16" y="2" width="10" height="10" rx="2" fill={accent} fillOpacity="0.4" />
        <rect x="2" y="16" width="10" height="10" rx="2" fill={accent} fillOpacity="0.4" />
        <rect x="16" y="16" width="10" height="10" rx="2" fill={accent} fillOpacity="0.15" />
      </svg>
      eigensu.in
    </Link>
  );
}

function ThemeToggle({
  theme,
  setTheme,
  isDark,
  menuColor,
  linkHoverBg,
}: {
  theme: Theme;
  setTheme?: (t: Theme) => void;
  isDark: boolean;
  menuColor: string;
  linkHoverBg: string;
}) {
  const activeClr = isDark ? "#ffffff" : "#0f172a";
  const mutedClr = isDark ? "rgba(255,255,255,0.65)" : "rgba(15,23,42,0.6)";

  return (
    <div
      className="font-body hidden items-center gap-1 rounded-lg border px-1 py-0.5 text-xs md:flex"
      style={{
        color: menuColor,
        borderColor: isDark ? "rgba(255,255,255,0.14)" : "rgba(15,23,42,0.12)",
      }}
    >
      <button
        type="button"
        onClick={() => setTheme?.("light")}
        className="rounded px-2 py-1 transition"
        style={{
          background: theme === "light" ? linkHoverBg : "transparent",
          color: theme === "light" ? activeClr : mutedClr,
          cursor: setTheme ? "pointer" : "default",
        }}
      >
        Light
      </button>
      <span style={{ opacity: 0.35 }}>|</span>
      <button
        type="button"
        onClick={() => setTheme?.("dark")}
        className="rounded px-2 py-1 transition"
        style={{
          background: theme === "dark" ? linkHoverBg : "transparent",
          color: theme === "dark" ? activeClr : mutedClr,
          cursor: setTheme ? "pointer" : "default",
        }}
      >
        Dark
      </button>
    </div>
  );
}

function buildNavItems(isDark: boolean): CardNavItem[] {
  const cardA = isDark ? "rgba(0,200,180,0.14)" : "rgba(251,191,36,0.16)";
  const cardB = isDark ? "rgba(0,153,204,0.14)" : "rgba(245,158,11,0.14)";
  const cardC = isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.05)";
  const text = isDark ? "#f8fafc" : "#0f172a";

  return [
    {
      label: "Home",
      bgColor: cardA,
      textColor: text,
      links: [
        { label: "Home", href: "/", ariaLabel: "Go to home" },
        // { label: "Solutions", href: "/solutions", ariaLabel: "View solutions" },
        { label: "Process", href: "/process", ariaLabel: "Our process" },
      ],
    },
    {
      label: "Projects",
      bgColor: cardB,
      textColor: text,
      links: [
        { label: "Projects", href: "/projects", ariaLabel: "View projects" },
        { label: "Automation", href: "/automation", ariaLabel: "View automation" },
        { label: "Websites", href: "/websites", ariaLabel: "View websites" },
        { label: "Dispatch", href: "/dispatch", ariaLabel: "View dispatch" },
      ],
    },
    {
      label: "About",
      bgColor: cardC,
      textColor: text,
      links: [
        { label: "About", href: "/about", ariaLabel: "About eigensu" },
        { label: "Careers", href: "/careers", ariaLabel: "Careers at eigensu" },
        { label: "Blog", href: "/blog", ariaLabel: "View blog" },
        { label: "Contact", href: "#", ariaLabel: "Contact eigensu" },
      ],
    },
  ];
}

export default function Navigation({
  theme,
  onContact,
  setTheme,
}: {
  theme: Theme;
  onContact: () => void;
  setTheme?: (t: Theme) => void;
}) {
  const isDark = theme === "dark";
  const baseColor = isDark ? "rgba(10,14,20,0.92)" : "rgba(255,255,255,0.94)";
  const menuColor = isDark ? "#ffffff" : "#0f172a";
  const buttonBgColor = isDark ? "#00c8b4" : "#f59e0b";
  const buttonTextColor = isDark ? "#020608" : "#ffffff";
  const linkHoverBg = isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.08)";

  const items = buildNavItems(isDark);

  return (
    <CardNav
      logo={<EigensuLogo isDark={isDark} />}
      items={items}
      baseColor={baseColor}
      menuColor={menuColor}
      buttonBgColor={buttonBgColor}
      buttonTextColor={buttonTextColor}
      ctaLabel="Contact"
      onCtaClick={onContact}
      onLinkClick={(link, event) => {
        if (link.label === "Contact") {
          event.preventDefault();
          onContact();
        }
      }}
      topActions={
        <>
          <ThemeToggle theme={theme} setTheme={setTheme} isDark={isDark} menuColor={menuColor} linkHoverBg={linkHoverBg} />
          <button
            type="button"
            className="font-body rounded-lg border px-3 py-1.5 text-xs font-medium md:hidden"
            style={{
              color: menuColor,
              borderColor: isDark ? "rgba(255,255,255,0.14)" : "rgba(15,23,42,0.12)",
              background: linkHoverBg,
            }}
            onClick={() => setTheme?.(isDark ? "light" : "dark")}
          >
            {isDark ? "Light" : "Dark"}
          </button>
        </>
      }
    />
  );
}
