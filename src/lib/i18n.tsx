"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "he" | "en";

type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** Returns the string for the active language. */
  t: (he: string, en: string) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("he");

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "he" || saved === "en") setLang(saved);
  }, []);

  // Reflect language on <html> (lang + dir) and persist
  useEffect(() => {
    const el = document.documentElement;
    el.lang = lang;
    el.dir = lang === "he" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  }, [lang]);

  const value: Ctx = {
    lang,
    dir: lang === "he" ? "rtl" : "ltr",
    setLang,
    toggle: () => setLang((l) => (l === "he" ? "en" : "he")),
    t: (he, en) => (lang === "he" ? he : en),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
