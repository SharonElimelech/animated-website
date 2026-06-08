"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, CornerDownLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

type Entry = { he: string; en: string; href: string; kw: string };

const ENTRIES: Entry[] = [
  { he: "אודות המשרד", en: "About the firm", href: "#about", kw: "הדר אלימלך about" },
  { he: "מחשבון חובות", en: "Debt calculator", href: "#calculator", kw: "אבחון בדיקת זכאות calculator debt" },
  { he: "הסדרי חובות מורכבים", en: "Complex debt settlements", href: "#about", kw: "בנקים נושים settlement" },
  { he: "הליכי הוצאה לפועל", en: "Execution proceedings", href: "#about", kw: "עיקולים הגבלות foreclosure" },
  { he: "חדלות פירעון ושיקום כלכלי", en: "Insolvency & rehabilitation", href: "#about", kw: "הפטר insolvency" },
  { he: "פירוק והבראת חברות", en: "Corporate liquidation & recovery", href: "#about", kw: "חברות עסקים company" },
  { he: "המסלול שלך", en: "Your process", href: "#process", kw: "תהליך שלבים process steps" },
  { he: "סרטון הסבר", en: "Explainer video", href: "#video", kw: "וידאו video" },
  { he: "שאלות נפוצות", en: "FAQ", href: "#faq", kw: "שאלות תשובות questions" },
  { he: "צור קשר", en: "Contact", href: "#contact", kw: "טלפון מייל כתובת contact phone email" },
];

export default function SiteSearch() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQ("");
  };

  // Cmd/Ctrl+K to open, Esc to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (v) setQ("");
          return !v;
        });
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return ENTRIES;
    return ENTRIES.filter((e) =>
      `${e.he} ${e.en} ${e.kw}`.toLowerCase().includes(term),
    );
  }, [q]);

  const go = (href: string) => {
    close();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t("חיפוש", "Search")}
        className="text-ink/70 transition-colors hover:text-gold"
      >
        <Search className="h-5 w-5" strokeWidth={1.6} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[70] flex items-start justify-center bg-black/70 px-4 pt-28 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-charcoal shadow-[0_8px_40px_0_rgba(0,0,0,0.8)]"
            >
              {/* Input row */}
              <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                <Search className="h-5 w-5 shrink-0 text-gold" strokeWidth={1.6} />
                <input
                  ref={inputRef}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && results[0]) go(results[0].href);
                  }}
                  placeholder={t("חיפוש באתר…", "Search the site…")}
                  className="w-full bg-transparent text-ink outline-none placeholder:text-muted"
                />
                <button
                  onClick={close}
                  aria-label={t("סגירה", "Close")}
                  className="text-muted transition-colors hover:text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Results */}
              <ul className="max-h-80 overflow-y-auto py-2">
                {results.length === 0 ? (
                  <li className="px-5 py-6 text-center text-sm font-light text-muted">
                    {t("לא נמצאו תוצאות", "No results found")}
                  </li>
                ) : (
                  results.map((e) => (
                    <li key={`${e.href}-${e.en}`}>
                      <button
                        onClick={() => go(e.href)}
                        className="group flex w-full items-center justify-between gap-3 px-5 py-3 text-start transition-colors hover:bg-white/[0.04]"
                      >
                        <span className="text-sm text-ink/85 group-hover:text-ink">
                          {lang === "he" ? e.he : e.en}
                        </span>
                        <CornerDownLeft className="h-4 w-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    </li>
                  ))
                )}
              </ul>

              <div className="border-t border-line px-5 py-2.5 text-center text-[0.7rem] font-light text-muted">
                {t("טיפ: לחצו", "Tip: press")} <kbd className="text-gold">Ctrl/⌘ K</kbd>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
