"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Hero content layered over the persistent ScrubBackground video. */
export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="mb-8 text-xs font-light tracking-[0.55em] text-gold/90 sm:text-sm"
      >
        עריכת דין · חדלות פירעון
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        className="font-serif text-6xl font-semibold leading-[1.02] tracking-[0.02em] text-platinum drop-shadow-[0_2px_40px_rgba(0,0,0,0.85)] sm:text-8xl lg:text-[7.5rem]"
      >
        הדר אלימלך
        <span className="mt-4 block text-gradient-gold drop-shadow-none">
          עוצמה משפטית
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.6 }}
        className="balance mt-10 max-w-2xl text-lg font-light leading-relaxed text-ink/85 [text-shadow:0_1px_20px_rgba(0,0,0,0.8)] sm:text-xl"
      >
        חדלות פירעון היא לא סוף הדרך, אלא התחלה חדשה.
      </motion.p>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-muted"
      >
        <span className="text-[0.7rem] tracking-[0.35em]">גלילה</span>
        <span className="relative flex h-12 w-px overflow-hidden bg-line/60">
          <motion.span
            animate={{ y: ["-100%", "120%"] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-x-0 h-1/2 bg-gold"
          />
        </span>
      </motion.div>
    </section>
  );
}
