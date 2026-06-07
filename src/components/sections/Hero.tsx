"use client";

import { motion, type Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Crystal-clear glass bubble: near-transparent, lightly blurred, sharp.
   Children slide up in sequence (staggerChildren) and stay visible. */
const bubble: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: EASE,
      staggerChildren: 0.15,
      delayChildren: 0.25,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-32">
      {/* Crystal-clear glass — near-transparent, soft 5px blur, sharp rim + shadow */}
      <motion.div
        variants={bubble}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-3xl rounded-[2.5rem] border border-white/10 bg-white/[0.01] px-8 py-16 text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] backdrop-blur-sm sm:px-16 sm:py-20"
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="text-shadow-lux mb-7 text-xs font-light tracking-[0.45em] text-gold/90 sm:text-sm"
        >
          שיקום כלכלי · הסדרי חובות · חדלות פירעון
        </motion.p>

        {/* Main title — Frank Ruhl serif */}
        <motion.h1
          variants={item}
          className="font-serif text-5xl font-semibold leading-[1.05] tracking-[0.01em] text-platinum sm:text-7xl lg:text-8xl"
        >
          הדר אלימלך
          <span className="mt-4 block text-gradient-gold text-2xl font-medium tracking-normal sm:text-4xl lg:text-5xl">
            מנהיגות משפטית לשיקום כלכלי
          </span>
        </motion.h1>

        {/* Expanded, confident subtitle (Assistant) */}
        <motion.p
          variants={item}
          className="text-shadow-lux mx-auto mt-9 max-w-2xl font-sans text-lg font-medium leading-snug text-ink/95 sm:text-2xl"
        >
          אסטרטגיה אישית וממוקדת תוצאות להחזרת השליטה הפיננסית שלך.
        </motion.p>

        {/* New editorial body paragraph (Assistant) */}
        <motion.p
          variants={item}
          className="text-shadow-lux mx-auto mt-6 max-w-2xl font-sans text-sm font-light leading-8 text-ink/70 sm:text-base sm:leading-9"
        >
          אנו מספקים מעטפת משפטית דיסקרטית לניהול משברים פיננסיים, מחיקת חובות,
          הסדרי בנקים מורכבים ופירוק חברות. הגישה האסטרטגית שלנו הופכת משבר קיומי
          להזדמנות מוכחת להתחלה חדשה, ללא פשרות.
        </motion.p>

        {/* Two-button group */}
        <motion.div
          variants={item}
          className="mt-11 flex items-center justify-center gap-4"
        >
          <a
            href="#about"
            className="rounded-full border border-white/15 bg-white/10 px-8 py-3.5 text-sm font-medium text-ink backdrop-blur-md transition-all duration-300 hover:bg-white/20"
          >
            אודות
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/10 bg-black/80 px-8 py-3.5 text-sm font-medium text-ink shadow-lg transition-all duration-300 hover:bg-black"
          >
            קביעת פגישה
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 text-muted"
      >
        <span className="text-shadow-lux text-[0.7rem] tracking-[0.35em]">גלילה</span>
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
