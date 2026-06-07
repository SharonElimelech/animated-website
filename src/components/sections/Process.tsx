import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

type Step = { num: string; title: string; description: string };

const STEPS: Step[] = [
  {
    num: "01",
    title: "אבחון וניתוח",
    description: "פגישת אסטרטגיה לבניית תוכנית פעולה מותאמת אישית.",
  },
  {
    num: "02",
    title: "עצירת הליכים",
    description: "ביטול עיקולים וקבלת הגנה משפטית מיידית.",
  },
  {
    num: "03",
    title: "תוכנית שיקום",
    description: "קביעת צו תשלומים נוח המותאם ליכולת הכלכלית.",
  },
  {
    num: "04",
    title: "הפטר וחופש",
    description: "קבלת הפטר, מחיקת חובות ויציאה לדרך חדשה.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative mx-auto max-w-7xl px-6 py-28 text-center lg:px-10 lg:py-40"
    >
      <Reveal amount={0.6}>
        <span className="text-shadow-lux text-xs font-light tracking-[0.4em] text-gold/85">
          התהליך שלכם
        </span>
      </Reveal>

      <Reveal delay={0.05} amount={0.5}>
        <h2 className="mx-auto mt-6 font-serif text-4xl font-bold leading-tight text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
          המסלול הבטוח <span className="text-gradient-gold">אל החופש</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1} amount={0.5}>
        <p className="text-shadow-lux mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-muted">
          אנחנו מלווים אתכם צעד אחר צעד, בשקיפות מלאה, עד לניצחון הסופי.
        </p>
      </Reveal>

      <StaggerGroup className="relative mt-24 grid gap-y-16 md:grid-cols-4 md:gap-x-8">
        {/* Connecting line (desktop) */}
        <div className="absolute right-[12.5%] left-[12.5%] top-8 hidden h-px bg-line md:block" />

        {STEPS.map((step) => (
          <StaggerItem key={step.num} className="relative">
            <div className="flex flex-col items-center">
              <span className="glass-dark relative z-10 flex h-16 w-16 items-center justify-center rounded-full !border-gold/40 font-serif text-xl text-gold">
                {step.num}
              </span>
              <h3 className="mt-7 text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-3 max-w-[14rem] text-sm font-light leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
