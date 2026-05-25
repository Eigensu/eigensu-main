"use client";

import { createContext, useCallback, useContext, useState } from "react";
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

export default function PageShell({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ModalContext.Provider value={{ openModal, closeModal, isModalOpen }}>
        <div className="min-h-screen flex flex-col">
          <Navigation theme={theme} onContact={openModal} setTheme={setTheme} />
          <div className="flex-1">{children}</div>
          <Footer onOpenModal={openModal} />
          <LetsTalkDrawer open={isModalOpen} onClose={closeModal} theme={theme} />
        </div>
      </ModalContext.Provider>
    </ThemeContext.Provider>
  );
}
