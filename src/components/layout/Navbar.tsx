"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Scale } from "lucide-react";

const LINKS = [
  { label: "אודות", href: "#about" },
  { label: "המסלול שלך", href: "#process" },
  { label: "שאלות נפוצות", href: "#faq" },
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
      {/* Floating glass bar — centered & narrower than full width */}
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between gap-6 rounded-full px-6 py-3 transition-all duration-500 lg:px-8 ${
          scrolled
            ? "glass-dark"
            : "glass"
        }`}
      >
        {/* Brand */}
        <a href="#" className="group flex items-center gap-2.5">
          <Scale
            className="h-5 w-5 text-gold transition-transform duration-500 group-hover:rotate-6"
            strokeWidth={1.4}
          />
          <span className="font-serif text-lg tracking-[0.04em] text-ink">
            הדר אלימלך
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-sm font-light tracking-wide text-ink/80 transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute -bottom-1.5 right-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA — gold border + glow */}
        <a
          href="#contact"
          className="hidden rounded-full border border-gold px-6 py-2 text-sm font-medium tracking-wide text-gold shadow-[0_0_20px_-2px_rgba(212,175,55,0.45)] transition-all duration-300 hover:bg-gold hover:text-obsidian hover:shadow-[0_0_28px_0_rgba(212,175,55,0.6)] md:inline-block"
        >
          ייעוץ משפטי
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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark mx-auto mt-3 max-w-5xl overflow-hidden rounded-3xl md:hidden"
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
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full border border-gold py-3 text-center font-medium text-gold shadow-[0_0_20px_-2px_rgba(212,175,55,0.45)]"
              >
                ייעוץ משפטי
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
