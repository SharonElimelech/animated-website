"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Scale, ShieldCheck, Award, Phone } from "lucide-react";
import { telLink, SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

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

  const badges = [
    { icon: Award, he: "5 שנות ניסיון", en: "5 Years' Experience" },
    { icon: ShieldCheck, he: "דיסקרטיות מלאה", en: "Full Discretion" },
    { icon: Scale, he: "מאות תיקים", en: "Hundreds of Cases" },
  ];
  const stats = [
    { he: "5+ שנות ניסיון", en: "5+ years' experience" },
    { he: "מאות לקוחות", en: "Hundreds of clients" },
    { he: "הפטר ומחיקת חובות", en: "Discharge & debt erasure" },
  ];

  return (
    <section id="home" ref={ref} className="relative min-h-screen w-full">
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
            className="h-full w-full object-cover object-center"
          />
        ) : (
          <Fallback />
        )}
        <div aria-hidden className="absolute inset-0 rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-obsidian/85 via-obsidian/20 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_15%_45%,rgba(212,175,55,0.18),transparent_52%)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-32 lg:px-10"
      >
        <div className="max-w-2xl text-start">
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="text-shadow-lux text-xs font-light tracking-[0.35em] text-gold/90 sm:text-sm"
          >
            {t("שיקום כלכלי · חדלות פירעון · הסדרי חובות", "Economic Recovery · Insolvency · Debt Settlements")}
          </motion.p>

          {/* Trust badges */}
          <motion.div variants={item} className="mt-6 flex flex-wrap gap-2.5">
            {badges.map((b) => (
              <span
                key={b.en}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-light text-ink/90 backdrop-blur-sm"
              >
                <b.icon className="h-3.5 w-3.5 text-gold" strokeWidth={1.6} />
                {t(b.he, b.en)}
              </span>
            ))}
          </motion.div>

          {/* Headline (Option A) */}
          <motion.h1
            variants={item}
            className="mt-7 font-serif text-4xl font-bold leading-[1.1] text-[#f4ecdd] [text-shadow:0_2px_24px_rgba(0,0,0,0.8)] sm:text-6xl lg:text-7xl"
          >
            {t("מחזירים לך את", "We give you back")}
            <span className="mt-1 block gold-text">
              {t("השליטה על החיים.", "control over your life.")}
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={item}
            className="text-shadow-lux mt-7 max-w-xl border-s-2 border-gold/70 ps-4 text-base font-light leading-relaxed text-ink/90 sm:text-lg"
          >
            {t(
              "ליווי משפטי מנוסה בהסדרי חובות, חדלות פירעון ושיקום כלכלי — בדיסקרטיות מלאה ובגישה אנושית, עד לפתיחת דף חדש.",
              "Experienced legal guidance in debt settlements, insolvency and economic recovery — with full discretion and a human touch, all the way to a fresh start.",
            )}
          </motion.p>

          {/* Extra paragraph */}
          <motion.p
            variants={item}
            className="text-shadow-lux mt-5 max-w-xl text-sm font-light leading-relaxed text-ink/70 sm:text-base"
          >
            {t(
              "כל תיק מתחיל בהקשבה. אנחנו לוקחים על עצמנו את הלחץ מול הנושים, בונים אסטרטגיה אישית וברורה, ומלווים אתכם צעד אחר צעד — עד למחיקת החובות וחזרה לשגרה רגועה ובטוחה.",
              "Every case starts with listening. We take the pressure off you, deal with the creditors, build a clear personal strategy and walk you through every step — until your debts are erased and calm is restored.",
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#calculator"
              className="gold-bg rounded-full px-8 py-3.5 text-sm font-bold text-obsidian shadow-[0_0_28px_-6px_rgba(212,175,55,0.6)] transition-all duration-300 hover:brightness-110"
            >
              {t("בדיקת זכאות חינם", "Free Eligibility Check")}
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/35 px-8 py-3.5 text-sm font-medium text-ink backdrop-blur-sm transition-all duration-300 hover:border-gold/60 hover:bg-white/10"
            >
              {t("שיחת ייעוץ ראשונית", "Initial Consultation")}
            </a>
            <a
              href={telLink}
              dir="ltr"
              className="inline-flex items-center gap-2 text-sm font-light text-ink/80 transition-colors hover:text-gold"
            >
              <Phone className="h-4 w-4 text-gold" strokeWidth={1.6} />
              {SITE.phone}
            </a>
          </motion.div>

          {/* Microcopy */}
          <motion.p variants={item} className="text-shadow-lux mt-5 text-xs font-light tracking-wide text-muted">
            {t(
              "ייעוץ ראשוני ללא עלות · ללא התחייבות · בדיסקרטיות מלאה",
              "Free initial consultation · No obligation · Fully confidential",
            )}
          </motion.p>

          {/* Stat strip */}
          <motion.div
            variants={item}
            className="mt-10 flex max-w-xl flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-7"
          >
            {stats.map((s) => (
              <div key={s.en} className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-sm font-medium text-ink/90">{t(s.he, s.en)}</span>
              </div>
            ))}
          </motion.div>
        </div>
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
