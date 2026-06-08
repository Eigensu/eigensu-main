"use client";

import Link from "next/link";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
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
  ctaHref?: string;
  onCtaClick?: () => void;
  onLinkClick?: (link: CardNavLink, event: React.MouseEvent<HTMLAnchorElement>) => void;
  ease?: string;
}

function CardNav({
  logo,
  items,
  baseColor,
  menuColor,
  buttonBgColor,
  buttonTextColor,
  ctaLabel = "Start a Project",
  ctaHref = "/onboard",
  onCtaClick,
  onLinkClick,
  ease = "power3.out",
}: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isOpenRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const collapseTlRef = useRef<gsap.core.Timeline | null>(null);

  const COLLAPSED_HEIGHT = 60;

  const getCardElements = () => cardsRef.current.filter(Boolean);

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return 260;

    const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
    if (!contentEl) return 260;

    const cards = getCardElements();

    const savedContent = {
      visibility: contentEl.style.visibility,
      position: contentEl.style.position,
      height: contentEl.style.height,
      opacity: contentEl.style.opacity,
      overflow: contentEl.style.overflow,
      pointerEvents: contentEl.style.pointerEvents,
    };

    const savedCards = cards.map((c) => ({
      transform: c.style.transform,
      opacity: c.style.opacity,
    }));

    contentEl.style.visibility = "visible";
    contentEl.style.position = "static";
    contentEl.style.height = "auto";
    contentEl.style.opacity = "1";
    contentEl.style.overflow = "visible";
    contentEl.style.pointerEvents = "auto";
    cards.forEach((c) => {
      c.style.transform = "none";
      c.style.opacity = "1";
    });

    void contentEl.offsetHeight;

    const contentHeight = contentEl.scrollHeight;

    Object.assign(contentEl.style, savedContent);
    cards.forEach((c, i) => {
      c.style.transform = savedCards[i].transform;
      c.style.opacity = savedCards[i].opacity;
    });

    return COLLAPSED_HEIGHT + contentHeight + 16;
  }, []);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const expandedHeight = calculateHeight();
    const cards = getCardElements();

    gsap.set(navEl, { height: COLLAPSED_HEIGHT, overflow: "hidden" });
    gsap.set(cards, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, { height: expandedHeight, duration: 0.4, ease });
    tl.to(cards, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, "-=0.1");

    return tl;
  }, [calculateHeight, ease]);

  const clearTimelineCallbacks = (tl: gsap.core.Timeline) => {
    tl.eventCallback("onComplete", null);
    tl.eventCallback("onReverseComplete", null);
  };

  const applyOpenState = useCallback(
    (tl: gsap.core.Timeline) => {
      const navEl = navRef.current;
      if (!navEl) return;
      gsap.set(navEl, { height: calculateHeight(), overflow: "hidden" });
      gsap.set(getCardElements(), { y: 0, opacity: 1 });
      tl.progress(1);
    },
    [calculateHeight]
  );

  const applyClosedState = useCallback((tl: gsap.core.Timeline) => {
    const navEl = navRef.current;
    if (!navEl) return;
    gsap.set(navEl, { height: COLLAPSED_HEIGHT, overflow: "hidden" });
    gsap.set(getCardElements(), { y: 50, opacity: 0 });
    tl.progress(0);
  }, []);

  const rebuildTimeline = useCallback(
    (keepOpen: boolean) => {
      tlRef.current?.kill();
      const tl = createTimeline();
      tlRef.current = tl;
      if (!tl) return null;
      if (keepOpen) applyOpenState(tl);
      else applyClosedState(tl);
      return tl;
    },
    [applyClosedState, applyOpenState, createTimeline]
  );

  useLayoutEffect(() => {
    rebuildTimeline(isOpenRef.current);
    return () => {
      collapseTlRef.current?.kill();
      collapseTlRef.current = null;
      tlRef.current?.kill();
      tlRef.current = null;
    };
  }, [rebuildTimeline]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const tl = tlRef.current;
      if (!tl) return;
      if (isOpenRef.current) applyOpenState(tl);
      else applyClosedState(tl);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [applyOpenState, applyClosedState]);

  const openMenu = useCallback(() => {
    if (isOpenRef.current || isAnimatingRef.current) return;
    const navEl = navRef.current;
    if (!navEl) return;

    const tl = rebuildTimeline(false);
    if (!tl) return;
    tlRef.current = tl;

    collapseTlRef.current?.kill();
    collapseTlRef.current = null;

    isAnimatingRef.current = true;
    isOpenRef.current = true;
    setIsOpen(true);
    clearTimelineCallbacks(tl);

    tl.eventCallback("onComplete", () => {
      isAnimatingRef.current = false;
      clearTimelineCallbacks(tl);
    });
    tl.play(0);
  }, [rebuildTimeline]);

  const closeMenu = useCallback(() => {
    if (!isOpenRef.current || isAnimatingRef.current) return;
    const navEl = navRef.current;
    const tl = tlRef.current;
    if (!navEl || !tl) return;

    isAnimatingRef.current = true;
    isOpenRef.current = false;
    setIsOpen(false);
    clearTimelineCallbacks(tl);
    tl.pause();
    tl.progress(1);

    collapseTlRef.current?.kill();
    const cards = getCardElements();

    collapseTlRef.current = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        applyClosedState(tl);
        collapseTlRef.current = null;
      },
    });

    collapseTlRef.current
      .to(cards, { y: 30, opacity: 0, duration: 0.2, ease, stagger: 0.04 }, 0)
      .to(navEl, { height: COLLAPSED_HEIGHT, duration: 0.35, ease }, 0.05);
  }, [applyClosedState, ease]);

  const toggleMenu = useCallback(() => {
    if (isOpenRef.current) closeMenu();
    else openMenu();
  }, [closeMenu, openMenu]);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className="card-nav-container fixed left-1/2 z-[90] top-6 w-[92%] max-w-[860px] -translate-x-1/2">
      <nav
        ref={navRef}
        className={`card-nav ${isOpen ? "open" : ""} relative block overflow-hidden rounded-xl p-0 shadow-lg will-change-[height]`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 z-[2] flex h-[60px] items-center justify-between p-2 pl-[1.1rem]">
          <button
            type="button"
            className={`hamburger-menu group order-2 flex h-full cursor-pointer flex-col items-center justify-center gap-[6px] md:order-none ${isOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            style={{ color: menuColor }}
          >
            <span
              className={`hamburger-line h-[2px] w-[30px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`hamburger-line h-[2px] w-[30px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>

          <div className="logo-container order-1 flex cursor-pointer items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:order-none">
            {logo}
          </div>

          <div className="flex h-full items-center gap-2 md:gap-3">
            {onCtaClick ? (
              <button
                type="button"
                className="card-nav-cta-button hidden h-full items-center rounded-[calc(0.75rem-0.2rem)] border-0 px-4 text-sm font-medium transition-colors duration-300 md:inline-flex"
                style={{
                  backgroundColor: buttonBgColor,
                  color: buttonTextColor,
                  fontFamily: "var(--font-body), 'Hanken Grotesk', sans-serif",
                  fontWeight: 600,
                }}
                onClick={onCtaClick}
              >
                {ctaLabel}
              </button>
            ) : (
              <Link
                href={ctaHref}
                className="card-nav-cta-button hidden h-full items-center rounded-[calc(0.75rem-0.2rem)] border-0 px-4 text-sm font-medium transition-colors duration-300 md:inline-flex"
                style={{
                  backgroundColor: buttonBgColor,
                  color: buttonTextColor,
                  fontFamily: "var(--font-body), 'Hanken Grotesk', sans-serif",
                  fontWeight: 600,
                }}
              >
                {ctaLabel}
              </Link>
            )}
          </div>
        </div>

        <div
          className="card-nav-content absolute top-[60px] right-0 bottom-0 left-0 z-[1] flex flex-col items-stretch justify-start gap-2 p-2 md:flex-row md:items-end md:gap-3"
          aria-hidden={!isOpen}
        >
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              ref={setCardRef(idx)}
              className="nav-card relative flex h-auto min-h-[60px] min-w-0 flex-[1_1_auto] select-none flex-col gap-2 rounded-[calc(0.75rem-0.2rem)] p-3 md:h-full md:min-h-0 md:flex-[1_1_0%]"
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div
                className="nav-card-label text-lg tracking-wide md:text-xl"
                style={{ fontFamily: "var(--font-head), 'Sora', sans-serif", fontWeight: 700, letterSpacing: "-0.01em" }}
              >
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-0.5">
                {item.links.map((lnk) => (
                  <Link
                    key={`${lnk.label}-${lnk.href}`}
                    href={lnk.href}
                    className="nav-card-link inline-flex cursor-pointer items-center gap-1.5 text-[15px] no-underline transition-opacity duration-300 hover:opacity-75 md:text-base"
                    style={{ fontFamily: "var(--font-body), 'Hanken Grotesk', sans-serif" }}
                    aria-label={lnk.ariaLabel}
                    onClick={(event) => {
                      onLinkClick?.(lnk, event);
                      if (isOpenRef.current) closeMenu();
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

function EigensuLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 no-underline"
      style={{
        color: "#f3f4f6",
        fontFamily: "var(--font-logo), 'Montserrat', sans-serif",
        fontWeight: 800,
        fontSize: "1.1rem",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 2,
          background: "#3b82f6",
          boxShadow: "0 0 12px #3b82f6",
          flexShrink: 0,
        }}
      />
      EIGENSU
    </Link>
  );
}

function buildNavItems(): CardNavItem[] {
  const cardA = "#0f1a2e";
  const cardB = "#0d1828";
  const cardC = "#101420";
  const text  = "#f3f4f6";

  return [
    {
      label: "Home",
      bgColor: cardA,
      textColor: text,
      links: [
        { label: "Home",     href: "/",         ariaLabel: "Go to home" },
        { label: "Services", href: "/services", ariaLabel: "View services" },
      ],
    },
    {
      label: "Work",
      bgColor: cardB,
      textColor: text,
      links: [
        { label: "Projects", href: "/projects", ariaLabel: "View projects" },
        { label: "Dispatch", href: "/dispatch", ariaLabel: "View dispatch" },
      ],
    },
    {
      label: "Company",
      bgColor: cardC,
      textColor: text,
      links: [
        { label: "About",   href: "/about",   ariaLabel: "About Eigensu" },
        { label: "Contact", href: "/contact", ariaLabel: "Contact us" },
        { label: "Blog",    href: "/blog",    ariaLabel: "View blog" },
      ],
    },
  ];
}

export default function Navigation({
  theme: _theme,
  onContact: _onContact,
  setTheme: _setTheme,
}: {
  theme?: Theme;
  onContact?: () => void;
  setTheme?: (t: Theme) => void;
}) {
  const baseColor      = "rgba(8,9,11,0.92)";
  const menuColor      = "#f3f4f6";
  const buttonBgColor  = "#3b82f6";
  const buttonTextColor = "#00112e";

  const items = buildNavItems();

  return (
    <CardNav
      logo={<EigensuLogo />}
      items={items}
      baseColor={baseColor}
      menuColor={menuColor}
      buttonBgColor={buttonBgColor}
      buttonTextColor={buttonTextColor}
      ctaLabel="Start a Project"
      ctaHref="/onboard"
    />
  );
}
