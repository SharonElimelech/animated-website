"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useI18n } from "@/lib/i18n";

export type Bi = { he: string; en: string };
export type LegalSection = { heading: Bi; body: Bi[] };

/**
 * Shared styled shell for the firm's legal pages (privacy policy, accessibility
 * statement). Matches the site's dark-luxury system: gold kicker, serif title,
 * a glass prose panel. Content is passed in as bilingual props.
 */
export default function LegalPage({
  kicker,
  title,
  updated,
  intro,
  sections,
}: {
  kicker: Bi;
  title: Bi;
  updated: Bi;
  intro: Bi;
  sections: LegalSection[];
}) {
  const { t } = useI18n();
  return (
    <section className="relative mx-auto max-w-3xl px-6 pb-28 pt-36 lg:px-10 lg:pb-40 lg:pt-44">
      <Reveal className="mb-6 flex items-center gap-4" amount={0.6}>
        <span className="h-px w-10 bg-gold" />
        <span className="text-shadow-lux text-xs font-light tracking-[0.4em] text-gold/85">
          {t(kicker.he, kicker.en)}
        </span>
      </Reveal>

      <Reveal amount={0.5}>
        <h1 className="font-serif text-4xl font-bold leading-[1.14] text-ink sm:text-5xl">
          <span className="text-gradient-gold">{t(title.he, title.en)}</span>
        </h1>
      </Reveal>

      <Reveal delay={0.05} amount={0.6}>
        <p className="mt-4 text-xs font-light tracking-wide text-muted/60">
          {t(updated.he, updated.en)}
        </p>
      </Reveal>

      <Reveal delay={0.1} amount={0.4}>
        <p className="mt-8 border-s-2 border-gold/60 ps-6 text-base font-light leading-relaxed text-muted">
          {t(intro.he, intro.en)}
        </p>
      </Reveal>

      <Reveal delay={0.1} amount={0.2}>
        <div className="glass mt-12 space-y-10 rounded-3xl p-8 lg:p-12">
          {sections.map((s, i) => (
            <article key={i}>
              <h2 className="text-xl font-bold text-ink">{t(s.heading.he, s.heading.en)}</h2>
              <div className="mt-3 space-y-3">
                {s.body.map((p, j) => (
                  <p key={j} className="text-sm font-light leading-relaxed text-muted sm:text-[0.95rem]">
                    {t(p.he, p.en)}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} amount={0.6}>
        <a
          href="/"
          className="mt-12 inline-flex items-center gap-2 text-sm font-light text-gold/85 transition-colors hover:text-gold"
        >
          <span aria-hidden>←</span>
          {t("חזרה לדף הבית", "Back to home")}
        </a>
      </Reveal>
    </section>
  );
}
