"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Scale } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function MasterHero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const [imgOk, setImgOk] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  const bgOpacity = useTransform(scrollYProgress, [0.15, 1], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section id="home" ref={ref} className="relative h-screen w-full">
      {/* Background */}
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
        {/* darken the text side + warm gold glow on the other */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-l from-obsidian via-obsidian/45 to-transparent rtl:bg-gradient-to-l ltr:bg-gradient-to-r" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_15%_45%,rgba(212,175,55,0.22),transparent_48%)]" />
        <div aria-hidden className="absolute inset-0 bg-obsidian/20" />
      </motion.div>

      {/* Content — start side (right in RTL, left in LTR) */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10"
      >
        <div className="max-w-xl text-start">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="font-serif text-4xl font-bold leading-[1.12] sm:text-6xl lg:text-7xl"
          >
            <span className="block gold-text">
              {t("החובות חונקים?", "Are debts choking you?")}
            </span>
            <span className="block text-[#f4ecdd] [text-shadow:0_2px_18px_rgba(0,0,0,0.75)]">
              {t("אנחנו כאן לעצור את זה.", "We're here to stop it.")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
            className="me-auto mt-7 max-w-md font-serif text-base font-light italic tracking-wide text-gold/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:text-lg"
          >
            {t(
              "משרד עורכי דין מומחה — הגנה וליווי מלא בהליכי חובות ובשיקום כלכלי.",
              "Expert law office — full protection and guidance through debt and economic recovery.",
            )}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.66 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#calculator"
              className="rounded-full border border-gold/60 bg-gold/15 px-8 py-3.5 text-sm font-semibold text-gold shadow-[0_0_25px_-8px_rgba(212,175,55,0.55)] backdrop-blur-md transition-all duration-300 hover:bg-gold/25"
            >
              {t("בדיקת זכאות", "Eligibility Check")}
            </a>
            <a
              href={whatsappLink(
                t(
                  "היי, זו פנייה דחופה — אשמח לתיאום שיחת חירום",
                  "Hi, this is urgent — I'd like to arrange an emergency call",
                ),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-sm font-medium text-ink backdrop-blur-md transition-all duration-300 hover:border-gold/50 hover:bg-white/10"
            >
              {t("תיאום שיחת חירום", "Emergency Call")}
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Pagination dots (end side) */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-10 end-8 z-10 flex items-center gap-2.5 lg:end-12"
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
