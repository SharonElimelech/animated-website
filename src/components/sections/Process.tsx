"use client";

import { Reveal, StaggerGroup, StaggerItem, GrowLine } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

type Step = {
  num: string;
  titleHe: string;
  titleEn: string;
  descHe: string;
  descEn: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    titleHe: "אבחון וניתוח",
    titleEn: "Assessment & Analysis",
    descHe: "פגישת אסטרטגיה לבניית תוכנית פעולה מותאמת אישית.",
    descEn: "A strategy meeting to build a tailor-made action plan.",
  },
  {
    num: "02",
    titleHe: "עצירת הליכים",
    titleEn: "Halting Proceedings",
    descHe: "ביטול עיקולים וקבלת הגנה משפטית מיידית.",
    descEn: "Cancelling foreclosures and securing immediate legal protection.",
  },
  {
    num: "03",
    titleHe: "תוכנית שיקום",
    titleEn: "Rehabilitation Plan",
    descHe: "קביעת צו תשלומים נוח המותאם ליכולת הכלכלית.",
    descEn: "Setting a comfortable payment order matched to your means.",
  },
  {
    num: "04",
    titleHe: "הפטר וחופש",
    titleEn: "Discharge & Freedom",
    descHe: "קבלת הפטר, מחיקת חובות ויציאה לדרך חדשה.",
    descEn: "Obtaining a discharge, erasing debts and starting anew.",
  },
];

export default function Process() {
  const { t } = useI18n();
  return (
    <section
      id="process"
      className="relative mx-auto max-w-7xl px-6 py-28 text-center lg:px-10 lg:py-40"
    >
      <Reveal amount={0.6}>
        <span className="text-shadow-lux text-xs font-light tracking-[0.4em] text-gold/85">
          {t("התהליך שלכם", "Your Process")}
        </span>
      </Reveal>

      <Reveal delay={0.05} amount={0.5}>
        <h2 className="mx-auto mt-6 font-serif text-4xl font-bold leading-tight text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
          {t("המסלול הבטוח ", "The safe path ")}
          <span className="text-gradient-gold">{t("אל החופש", "to freedom")}</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} amount={0.5}>
        <p className="text-shadow-lux mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-muted">
          {t(
            "אנחנו מלווים אתכם צעד אחר צעד, בשקיפות מלאה, עד לניצחון הסופי.",
            "We guide you step by step, in full transparency, all the way to the final win.",
          )}
        </p>
      </Reveal>

      <StaggerGroup className="relative mt-24 grid gap-y-16 md:grid-cols-4 md:gap-x-8">
        <GrowLine className="absolute inset-x-[12.5%] top-8 hidden h-px rule-gold opacity-60 md:block" />

        {STEPS.map((step) => (
          <StaggerItem key={step.num} className="group relative">
            <div className="flex flex-col items-center">
              <span className="glass-dark relative z-10 flex h-16 w-16 items-center justify-center rounded-full !border-gold/40 font-serif text-xl text-gold transition-all duration-500 group-hover:scale-110 group-hover:!border-gold group-hover:shadow-[0_0_28px_-4px_rgba(212,175,55,0.55)]">
                {step.num}
              </span>
              <h3 className="mt-7 text-xl font-bold text-ink">
                {t(step.titleHe, step.titleEn)}
              </h3>
              <p className="mt-3 max-w-[14rem] text-sm font-light leading-relaxed text-muted">
                {t(step.descHe, step.descEn)}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
