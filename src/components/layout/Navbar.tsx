"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu, X, Search } from "lucide-react";

const LINKS = [
  { label: "בית", href: "#home" },
  { label: "אודות", href: "#about" },
  { label: "מחשבון חובות", href: "#calculator" },
  { label: "המסלול", href: "#process" },
  { label: "צור קשר", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        {/* Brand — right (RTL start) */}
        <a href="#home" aria-label="הדר אלימלך — דף הבית" className="group flex items-center">
          <Image
            src="/logo-float.png"
            alt="הדר אלימלך — משרד עורכי דין"
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
                {l.label}
                <span className="absolute -bottom-1.5 right-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Left: search + language switcher */}
        <div className="hidden items-center gap-5 lg:flex">
          <button
            aria-label="חיפוש"
            className="text-ink/70 transition-colors hover:text-gold"
          >
            <Search className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <span className="text-shadow-lux text-sm font-light tracking-wide text-ink/70">
            <span className="text-gold">עב</span>
            <span className="mx-1.5 text-white/30">|</span>
            <span className="cursor-pointer transition-colors hover:text-ink">EN</span>
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="תפריט"
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
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
