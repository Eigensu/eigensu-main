"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { CelestialLayer } from "./ThemeHero";
import LetsTalkDrawer from "./LetsTalkModal";

type ModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

type Theme = "dark" | "light";

type ThemeContextValue = { theme: Theme; setTheme: (t: Theme) => void };

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within PageShell");
  return ctx;
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within PageShell");
  }
  return context;
}

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Initialised from the data-theme the no-FOUC script (layout.tsx) already set,
  // falling back to "dark". Reading it here keeps React in sync with the DOM.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "dark";
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
  });

  // Reflect theme changes onto <html data-theme> (drives all CSS vars) and persist.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* storage unavailable (private mode / SSR) — toggle still works in-session */
    }
  }, [theme]);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
        <div className="font-body min-h-screen flex flex-col">
          <Navigation theme={theme} onContact={openModal} setTheme={setTheme} />
          <CelestialLayer theme={theme} />
          <main className="flex-1">{children}</main>
          <Footer onOpenModal={openModal} />
          <LetsTalkDrawer open={isModalOpen} onClose={closeModal} theme={theme} />
        </div>
      </ModalContext.Provider>
    </ThemeContext.Provider>
  );
}
