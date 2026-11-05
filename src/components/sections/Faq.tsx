"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Lock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

import { FAQ } from "@/lib/faq";

export default function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"
    >
      <Reveal className="text-center" amount={0.6}>
        <span className="text-shadow-lux text-xs font-normal tracking-[0.4em] text-gold/85">
          {t("מרכז מידע", "Information Center")}
        </span>
        <h2 className="mt-6 font-serif text-4xl font-bold text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] sm:text-5xl">
          {t("שאלות ותשובות נפוצות", "Frequently Asked Questions")}
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Accordion */}
        <Reveal amount={0.1} fade className="flex flex-col gap-4">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.qEn}
                className={`glass overflow-hidden rounded-xl transition-all duration-300 ${
                  isOpen ? "!border-gold/40" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-gold text-gold" : "border-line text-muted"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                  <span className="text-base font-medium text-ink sm:text-lg">
                    {t(item.qHe, item.qEn)}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-6 text-start text-sm font-normal leading-relaxed text-muted">
                        {t(item.aHe, item.aEn)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>

        {/* Side CTA card */}
        <Reveal amount={0.2}>
          <div className="sticky top-28 rounded-2xl bg-gradient-to-br from-gold-soft via-gold to-bronze p-8 text-obsidian">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-obsidian/10 text-2xl font-bold">
              ?
            </span>
            <h3 className="mt-6 font-serif text-3xl font-bold">
              {t("לא מצאתם תשובה?", "Didn't find an answer?")}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-obsidian/80">
              {t(
                "אנחנו כאן לענות על כל שאלה. אל תישארו עם הספקות — התייעצו איתנו.",
                "We're here to answer every question. Don't stay with doubts — consult us.",
              )}
            </p>
            <a
              href={whatsappLink(
                t(
                  "היי, יש לי שאלה לגבי הליך חדלות פירעון",
                  "Hi, I have a question about the insolvency process",
                ),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 block rounded-full bg-obsidian px-6 py-3.5 text-center text-sm font-medium text-ink transition-colors hover:bg-charcoal"
            >
              {t("דברו איתנו עכשיו", "Talk to us now")}
            </a>

            <div className="mt-8 border-t border-obsidian/20 pt-5">
              <p className="flex items-center justify-end gap-2 text-sm font-bold">
                {t("סודיות מובטחת", "Confidentiality guaranteed")}
                <Lock className="h-4 w-4" />
              </p>
              <p className="mt-1 text-start text-xs text-obsidian/70">
                {t(
                  "כל פנייה למשרדנו חוסה תחת חיסיון עו״ד-לקוח.",
                  "Every inquiry is protected by attorney-client privilege.",
                )}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
