"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import SiteSearch from "./SiteSearch";

const LINKS = [
  { he: "בית", en: "Home", href: "#home" },
  { he: "אודות", en: "About", href: "#about" },
  { he: "מחשבון חובות", en: "Calculator", href: "#calculator" },
  { he: "המסלול", en: "Process", href: "#process" },
  { he: "צור קשר", en: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LangSwitch = () => (
    <span className="text-shadow-lux text-sm font-light tracking-wide">
      <button
        onClick={() => setLang("he")}
        className={lang === "he" ? "text-gold" : "text-ink/70 hover:text-ink"}
      >
        עב
      </button>
      <span className="mx-1.5 text-white/30">|</span>
      <button
        onClick={() => setLang("en")}
        className={lang === "en" ? "text-gold" : "text-ink/70 hover:text-ink"}
      >
        EN
      </button>
    </span>
  );

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-5 z-50 px-4"
    >
      <nav
        className={`relative mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-full border border-white/10 px-6 py-3 backdrop-blur-sm transition-all duration-500 lg:px-8 ${
          scrolled ? "bg-black/40" : "bg-white/[0.03]"
        }`}
      >
        {/* Brand — start side (right in RTL, left in LTR) */}
        <a href="#home" aria-label={t("הדר אלימלך — דף הבית", "Hadar Elimelech — Home")} className="group flex items-center">
          <Image
            src="/logo-float.png"
            alt={t("הדר אלימלך — משרד עורכי דין", "Hadar Elimelech — Law Office")}
            width={331}
            height={251}
            priority
            className="h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.03] sm:h-12"
          />
        </a>

        {/* Centered links */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-shadow-lux text-sm font-light tracking-wide text-ink/80 transition-colors hover:text-ink"
              >
                {t(l.he, l.en)}
                <span className="absolute -bottom-1.5 end-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* End side: search + language switcher */}
        <div className="hidden items-center gap-5 lg:flex">
          <SiteSearch />
          <LangSwitch />
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={t("תפריט", "Menu")}
          className="text-ink lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-black/70 backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-light text-ink/80 hover:text-gold"
                >
                  {t(l.he, l.en)}
                </a>
              </li>
            ))}
            <li className="mt-2 flex items-center justify-between border-t border-line pt-3">
              <SiteSearch />
              <LangSwitch />
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
