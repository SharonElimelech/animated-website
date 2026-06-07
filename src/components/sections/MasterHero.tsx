"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scale } from "lucide-react";
import { whatsappLink } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Master Hero — the top-level 100vh entry point (replicates the reference
 * layout, mirrored to RTL). As the user scrolls past it, the section fades and
 * the fixed video-scrubbing background (behind it) takes over for the rest of
 * the site.
 */
export default function MasterHero() {
  const ref = useRef<HTMLDivElement>(null);
  const [imgOk, setImgOk] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Content fades first, then the background dissolves to reveal the video.
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  const bgOpacity = useTransform(scrollYProgress, [0.15, 1], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section id="home" ref={ref} className="relative h-screen w-full">
      {/* Background image (with elegant fallback) */}
      <motion.div
        style={{ opacity: bgOpacity, scale: bgScale }}
        className="absolute inset-0 transform-gpu will-change-transform"
      >
        {imgOk ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src="/master-hero.jpg"
            alt=""
            aria-hidden
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover object-center grayscale-[0.15]"
          />
        ) : (
          <Fallback />
        )}

        {/* Legibility: darken the right (where RTL text sits) + warm gold glow left */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-l from-obsidian via-obsidian/45 to-transparent"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_45%,rgba(212,175,55,0.22),transparent_48%)]"
        />
        <div aria-hidden className="absolute inset-0 bg-obsidian/20" />
      </motion.div>

      {/* Content — mirrored to the RIGHT for RTL */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10"
      >
        <div className="max-w-xl text-right">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            className="text-shadow-lux text-sm font-light tracking-wide text-ink/80"
          >
            צריכים עזרה משפטית?
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.32 }}
            className="mt-5 font-serif text-5xl font-medium leading-[1.05] gold-text sm:text-7xl lg:text-8xl"
          >
            נלחמים עבור
            <br />
            הצדק שלך
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="text-shadow-lux mr-auto mt-8 max-w-md text-base font-light leading-relaxed text-ink/85 sm:text-lg"
          >
            משרד עורכי דין המעניק מעטפת משפטית מקיפה. אנו פועלים בגישה אישית
            לכל לקוח ומשתמשים בשיטות מתקדמות ויצירתיות לפתרון מלא של בעיותיו.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.66 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href={whatsappLink("היי, אשמח לייעוץ ראשוני חינם")}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-bg rounded-full px-8 py-3.5 text-sm font-bold text-obsidian shadow-[0_0_25px_-6px_rgba(212,175,55,0.6)] transition-all duration-300 hover:brightness-110"
            >
              לייעוץ ראשוני חינם
            </a>
            <a
              href="#about"
              className="rounded-full border border-white/40 px-8 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              אודות המשרד
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Pagination dots (bottom-right for RTL) */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 right-8 z-10 flex items-center gap-2.5 lg:right-12"
      >
        <span className="flex h-3 w-3 items-center justify-center rounded-full border border-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
      </motion.div>
    </section>
  );
}

function Fallback() {
  return (
    <div className="relative h-full w-full bg-charcoal">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(212,175,55,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(138,106,53,0.16),transparent_55%)]" />
      <Scale className="absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 text-white/[0.04]" strokeWidth={0.6} />
    </div>
  );
}
