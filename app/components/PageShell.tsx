"use client";

import { createContext, useCallback, useContext, useState, useSyncExternalStore } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
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

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // The pre-paint script in layout.tsx sets <html data-theme> before hydration.
  // Reading it through useSyncExternalStore keeps the server render ("dark")
  // and the first client render identical, then updates without a mismatch.
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark" as Theme);
  const setTheme = useCallback((t: Theme) => {
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("theme", t);
    } catch {
      /* storage unavailable (private mode) — the change still applies in-session */
    }
  }, []);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
        <div className="font-body min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <LetsTalkDrawer open={isModalOpen} onClose={closeModal} />
        </div>
      </ModalContext.Provider>
    </ThemeContext.Provider>
  );
}
