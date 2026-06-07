import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import Portrait from "@/components/ui/Portrait";
import { SITE } from "@/lib/site";
import { Handshake, Gavel, RefreshCw, Building2, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = { icon: LucideIcon; title: string; description: string };

const SERVICES: Service[] = [
  {
    icon: Handshake,
    title: "הסדרי חובות מורכבים",
    description:
      "מו״מ מול בנקים, נושים פרטיים וספקים — לצמצום והסדרת חובות מחוץ לכותלי בית המשפט.",
  },
  {
    icon: Gavel,
    title: "הליכי הוצאה לפועל",
    description:
      "ביטול עיקולים, הסרת הגבלות בנק ויציאה מהארץ ואיחוד תיקים — מענה מיידי ואפקטיבי.",
  },
  {
    icon: RefreshCw,
    title: "חדלות פירעון ושיקום כלכלי",
    description:
      "ליווי יחידים בהליך החדש עד הפטר חלוט, מחיקת חובות ופתיחת דף חדש.",
  },
  {
    icon: Building2,
    title: "פירוק והבראת חברות",
    description:
      "ייעוץ אסטרטגי לחברות ועסקים במצוקה — הקפאת הליכים והבראה מבנית.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"
    >
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Text column */}
        <div>
          <Reveal className="mb-6 flex items-center gap-4" amount={0.6}>
            <span className="h-px w-10 bg-gold" />
            <span className="text-shadow-lux text-xs font-light tracking-[0.4em] text-gold/85">
              אודות המשרד
            </span>
          </Reveal>

          <Reveal amount={0.4}>
            <h2 className="font-serif text-4xl font-bold leading-[1.14] text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
              הבית שלכם
              <br />
              <span className="text-gradient-gold">לביטחון כלכלי.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} amount={0.5}>
            <blockquote className="text-shadow-lux mt-8 border-r-2 border-gold/60 pr-6 text-base font-light leading-relaxed text-muted sm:text-lg">
              ״כל משבר כלכלי הוא נקודת מפנה. אנו בונים עבורכם אסטרטגיה מותאמת
              אישית, עם ליווי צמוד ודיסקרטי — מהצעד הראשון ועד להחזרת השליטה
              המלאה על חייכם.״
            </blockquote>
          </Reveal>

          {/* Service cards */}
          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <StaggerItem key={s.title}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.15} amount={0.6}>
            <a
              href="#contact"
              className="mt-12 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-l from-bronze via-gold to-gold-soft px-10 py-4 text-sm font-medium text-obsidian transition-all duration-300 hover:brightness-110 sm:w-auto"
            >
              תיאום פגישת אסטרטגיה
            </a>
          </Reveal>
        </div>

        {/* Portrait column */}
        <Reveal amount={0.3} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
            <Portrait
              src="/hadar-portrait.jpg"
              alt="הדר אלימלך"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Bottom fade + name overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
            <div className="absolute bottom-0 right-0 p-8 text-right">
              <p className="font-serif text-2xl font-bold tracking-[0.04em] text-ink">{SITE.name}</p>
              <p className="mt-1 text-xs tracking-[0.3em] text-gold/85">
                {SITE.tagline}
              </p>
            </div>
          </div>

          {/* Boutique badge */}
          <div className="absolute -bottom-8 left-6 flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-full border border-gold/40 bg-obsidian/90 text-center backdrop-blur-sm lg:-left-8">
            <Award className="h-6 w-6 text-gold" strokeWidth={1.4} />
            <span className="px-4 text-[0.7rem] font-light leading-tight text-muted">
              משרד בוטיק
              <br />
              לשיקום כלכלי
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="glass group relative h-full overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:border-gold/40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_65%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <Icon
        className="relative h-7 w-7 text-gold transition-transform duration-500 group-hover:-translate-y-1"
        strokeWidth={1.4}
      />
      <h3 className="relative mt-6 text-lg font-bold text-ink">{service.title}</h3>
      <p className="relative mt-2 text-sm font-light text-muted">
        {service.description}
      </p>
    </article>
  );
}
