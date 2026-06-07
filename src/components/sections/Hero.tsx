"use client";

import { motion, type Variants } from "framer-motion";
import { whatsappLink } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* Right-aligned editorial hero over the looping background video.
   Staggered on-load entrance; static thereafter (smooth scroll). */
export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-6 py-32 lg:px-16">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl transform-gpu rounded-3xl border border-white/10 bg-black/60 p-8 text-right backdrop-blur-3xl sm:p-10 lg:max-w-3xl"
      >
        {/* A. Eyebrow tag — metallic gradient border + text */}
        <motion.div variants={item}>
          <span className="gold-edge inline-block rounded-sm px-3 py-1.5">
            <span className="gold-text text-[0.7rem] font-light tracking-[0.2em] sm:text-xs">
              סביבה משפטית ללא פשרות
            </span>
          </span>
        </motion.div>

        {/* B. Dual-color massive headline (Heebo Black) */}
        <motion.h1
          variants={item}
          className="text-shadow-lux mt-7 font-heebo text-4xl font-black leading-[0.98] tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="gold-text block">החובות חונקים?</span>
          <span className="block text-white">אנחנו כאן</span>
          <span className="block text-white">לעצור את זה.</span>
        </motion.h1>

        {/* C. Accented subtitle with vertical gold line */}
        <motion.p
          variants={item}
          className="text-shadow-lux gold-rule-r mr-auto mt-8 max-w-xl pr-4 text-sm font-light leading-relaxed text-ink/85 sm:text-base"
        >
          משרד עו״ד הדר אלימלך - מומחיות בחדלות פירעון, מחיקת חובות ושיקום
          כלכלי. החזירו את השליטה לחיים שלכם עם אסטרטגיה מנצחת.
        </motion.p>

        {/* D. Button group */}
        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="gold-bg rounded-full px-8 py-3.5 text-sm font-bold text-obsidian shadow-[0_0_25px_-4px_rgba(212,175,55,0.55)] transition-all duration-300 hover:brightness-110"
          >
            בדיקת זכאות
          </a>
          <a
            href={whatsappLink("היי, זו פנייה דחופה — אשמח לתיאום שיחת חירום")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/80 px-8 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:bg-white hover:text-obsidian"
          >
            תיאום שיחת חירום
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
