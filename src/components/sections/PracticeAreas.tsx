import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { FileText, Building2, Landmark, ArrowUpLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Area = {
  icon: LucideIcon;
  index: string;
  title: string;
  description: string;
};

const AREAS: Area[] = [
  {
    icon: FileText,
    index: "01",
    title: "פשיטת רגל ליחידים",
    description:
      "ליווי הליך חדלות פירעון ליחידים — מהגשת הבקשה ועד צו ההפטר, תוך הגנה על נכסים חיוניים ובניית מסלול ברור לפתיחה כלכלית מחדש.",
  },
  {
    icon: Building2,
    index: "02",
    title: "חדלות פירעון תאגידים",
    description:
      "ייצוג חברות ובעלי תפקיד בהליכי הקפאה, פירוק והבראה — שמירה על ערך העסק והמשך הפעילות במקום בו ניתן.",
  },
  {
    icon: Landmark,
    index: "03",
    title: "הסדרי חוב ושיקום",
    description:
      "גיבוש הסדרים מול נושים, בנקים וגופים מוסדיים — פתרונות יצירתיים שמאזנים בין אינטרס החייב לבין ודאות הנושים.",
  },
];

export default function PracticeAreas() {
  return (
    <section
      id="practice"
      className="relative border-t border-line/60 bg-charcoal px-6 py-32 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="mb-4 flex items-center gap-4" amount={0.6}>
          <span className="h-px w-12 bg-gold" />
          <span className="text-xs font-light tracking-[0.4em] text-gold/85">
            תחומי עיסוק
          </span>
        </Reveal>

        <Reveal amount={0.5}>
          <h2 className="max-w-2xl text-balance text-4xl font-light leading-tight text-ink sm:text-5xl lg:text-6xl">
            מומחיות צרה. <span className="text-gradient-gold">עומק יוצא דופן.</span>
          </h2>
        </Reveal>

        <StaggerGroup className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {AREAS.map((area) => (
            <StaggerItem key={area.index}>
              <PracticeCard area={area} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function PracticeCard({ area }: { area: Area }) {
  const Icon = area.icon;
  return (
    <article className="group relative h-full overflow-hidden bg-obsidian p-10 transition-colors duration-500 lg:p-12">
      {/* Hover wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      {/* Top hairline that fills in on hover */}
      <span className="absolute inset-x-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <Icon
            className="h-9 w-9 text-gold transition-transform duration-500 group-hover:-translate-y-1"
            strokeWidth={1.2}
          />
          <span className="font-serif text-2xl text-line transition-colors duration-500 group-hover:text-bronze">
            {area.index}
          </span>
        </div>

        <h3 className="mt-10 text-2xl font-medium text-ink">{area.title}</h3>
        <p className="mt-5 text-sm font-light leading-relaxed text-muted">
          {area.description}
        </p>

        <span className="mt-8 inline-flex items-center gap-2 text-sm font-light text-gold/0 transition-all duration-500 group-hover:text-gold">
          קראו עוד
          <ArrowUpLeft className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </div>
    </article>
  );
}
