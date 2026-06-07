"use client";

import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import Portrait from "@/components/ui/Portrait";
import Parallax from "@/components/ui/Parallax";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { Handshake, Gavel, RefreshCw, Building2, Award } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  titleHe: string;
  titleEn: string;
  descHe: string;
  descEn: string;
};

const SERVICES: Service[] = [
  {
    icon: Handshake,
    titleHe: "הסדרי חובות מורכבים",
    titleEn: "Complex Debt Settlements",
    descHe: "מו״מ מול בנקים, נושים פרטיים וספקים — לצמצום והסדרת חובות מחוץ לכותלי בית המשפט.",
    descEn: "Negotiation with banks, private creditors and suppliers — reducing and settling debts outside the courtroom.",
  },
  {
    icon: Gavel,
    titleHe: "הליכי הוצאה לפועל",
    titleEn: "Execution Proceedings",
    descHe: "ביטול עיקולים, הסרת הגבלות בנק ויציאה מהארץ ואיחוד תיקים — מענה מיידי ואפקטיבי.",
    descEn: "Cancelling foreclosures, lifting bank & travel restrictions, consolidating files — an immediate, effective response.",
  },
  {
    icon: RefreshCw,
    titleHe: "חדלות פירעון ושיקום כלכלי",
    titleEn: "Insolvency & Economic Recovery",
    descHe: "ליווי יחידים בהליך החדש עד הפטר חלוט, מחיקת חובות ופתיחת דף חדש.",
    descEn: "Guiding individuals through the new process to a full discharge, debt erasure and a fresh start.",
  },
  {
    icon: Building2,
    titleHe: "פירוק והבראת חברות",
    titleEn: "Corporate Liquidation & Recovery",
    descHe: "ייעוץ אסטרטגי לחברות ועסקים במצוקה — הקפאת הליכים והבראה מבנית.",
    descEn: "Strategic counsel for companies and businesses in distress — freezing proceedings and structural recovery.",
  },
];

export default function About() {
  const { t } = useI18n();
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
              {t("אודות המשרד", "About the Firm")}
            </span>
          </Reveal>

          <Reveal amount={0.4}>
            <h2 className="font-serif text-4xl font-bold leading-[1.14] text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
              {t("הבית שלכם", "Your home")}
              <br />
              <span className="text-gradient-gold">
                {t("לביטחון כלכלי.", "for financial security.")}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} amount={0.5}>
            <blockquote className="text-shadow-lux mt-8 border-s-2 border-gold/60 ps-6 text-base font-light leading-relaxed text-muted sm:text-lg">
              {t(
                "״כל משבר כלכלי הוא נקודת מפנה. אנו בונים עבורכם אסטרטגיה מותאמת אישית, עם ליווי צמוד ודיסקרטי — מהצעד הראשון ועד להחזרת השליטה המלאה על חייכם.״",
                "“Every financial crisis is a turning point. We build a tailor-made strategy for you, with close and discreet guidance — from the first step to fully restoring control over your life.”",
              )}
            </blockquote>
          </Reveal>

          {/* Service cards */}
          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <StaggerItem key={s.titleEn}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal delay={0.15} amount={0.6}>
            <a
              href="#contact"
              className="mt-12 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-l from-bronze via-gold to-gold-soft px-10 py-4 text-sm font-medium text-obsidian transition-all duration-300 hover:brightness-110 sm:w-auto"
            >
              {t("תיאום פגישת אסטרטגיה", "Book a Strategy Meeting")}
            </a>
          </Reveal>
        </div>

        {/* Portrait column */}
        <Reveal amount={0.3} className="relative">
          <Parallax distance={28}>
            <div className="group/portrait relative aspect-[4/5] overflow-hidden rounded-3xl border border-line">
              <Portrait
                src="/hadar-portrait.jpg"
                alt={t("הדר אלימלך", "Hadar Elimelech")}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover/portrait:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/10 to-transparent" />
              <div className="absolute bottom-0 start-0 p-8 text-start">
                <p className="font-serif text-2xl font-bold tracking-[0.04em] text-ink">
                  {t(SITE.name, "Hadar Elimelech")}
                </p>
                <p className="mt-1 text-xs tracking-[0.3em] text-gold/85">
                  {SITE.tagline}
                </p>
              </div>
            </div>
          </Parallax>

          {/* Boutique badge */}
          <div className="absolute -bottom-8 end-6 flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-full border border-gold/40 bg-obsidian/90 text-center backdrop-blur-sm lg:-end-8">
            <Award className="h-6 w-6 text-gold" strokeWidth={1.4} />
            <span className="px-4 text-[0.7rem] font-light leading-tight text-muted">
              {t("משרד בוטיק", "Boutique firm")}
              <br />
              {t("לשיקום כלכלי", "for economic recovery")}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { t } = useI18n();
  const Icon = service.icon;
  return (
    <article className="glass group relative h-full overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.1),transparent_65%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <Icon
        className="relative h-7 w-7 text-gold transition-transform duration-500 group-hover:-translate-y-1"
        strokeWidth={1.4}
      />
      <h3 className="relative mt-6 text-lg font-bold text-ink">
        {t(service.titleHe, service.titleEn)}
      </h3>
      <p className="relative mt-2 text-sm font-light text-muted">
        {t(service.descHe, service.descEn)}
      </p>
    </article>
  );
}
