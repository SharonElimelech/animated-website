"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Scale } from "lucide-react";

const LINKS = [
  { label: "אודות", href: "#about" },
  { label: "תחומי עיסוק", href: "#practice" },
  { label: "סיפורי הצלחה", href: "#stories" },
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
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line/70 bg-obsidian/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        {/* Brand */}
        <a href="#" className="group flex items-center gap-3">
          <Scale
            className="h-5 w-5 text-gold transition-transform duration-500 group-hover:rotate-6"
            strokeWidth={1.4}
          />
          <span className="font-serif text-lg tracking-wide text-ink">
            הדר אלימלך
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm font-light text-muted transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1.5 right-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden rounded-full border border-gold/40 px-6 py-2.5 text-sm font-light text-gold transition-all duration-300 hover:bg-gold hover:text-obsidian md:inline-block"
        >
          תיאום פגישה
        </a>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="תפריט"
          className="text-ink md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden border-t border-line bg-obsidian/95 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-light text-muted hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full border border-gold/40 py-3 text-center text-gold"
              >
                תיאום פגישה
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
