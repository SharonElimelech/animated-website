"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

// YouTube video id (from https://www.youtube.com/watch?v=U6JKTjcFPPM)
const YOUTUBE_ID = "U6JKTjcFPPM";

export default function VideoFeature() {
  const { t } = useI18n();
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="video"
      className="relative mx-auto max-w-4xl px-6 py-28 text-center lg:py-36"
    >
      <Reveal amount={0.6}>
        <span className="text-shadow-lux text-xs font-light tracking-[0.4em] text-gold/85">
          {t("מי שפועל · שולט בסיטואציה", "Those who act · stay in control")}
        </span>
      </Reveal>

      <Reveal delay={0.05} amount={0.5}>
        <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-bold leading-tight text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
          {t(
            "צפו: למה אסור להתעלם ממכתבי הוצאה לפועל",
            "Watch: why you must never ignore execution-office letters",
          )}
        </h2>
      </Reveal>

      <Reveal delay={0.1} amount={0.4} fade>
        <div className="group relative mt-14 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-obsidian/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.8),0_0_90px_-20px_rgba(212,175,55,0.4)]">
          {playing && YOUTUBE_ID ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
              title={t("עורכת דין הדר אלימלך לחדלות פירעון", "Hadar Elimelech — Insolvency Law")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex flex-col items-center justify-center"
              aria-label={t("נגן סרטון", "Play video")}
            >
              {/* Real YouTube thumbnail, dimmed */}
              {YOUTUBE_ID && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity duration-500 group-hover:opacity-65"
                />
              )}
              {/* Poster glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(5,5,5,0.55),rgba(5,5,5,0.8))]" />
              <span className="absolute start-6 top-6 text-start text-sm text-ink">
                {t("עורכת דין הדר אלימלך לחדלות פירעון", "Hadar Elimelech — Insolvency Law")}
                <span className="mt-1 block text-xs font-light text-muted">
                  {t("שרון אלימלך", "Sharon Elimelech")}
                </span>
              </span>
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-l from-bronze via-gold to-gold-soft text-obsidian shadow-lg transition-transform duration-300 group-hover:scale-105">
                <Play className="relative h-8 w-8 translate-x-0.5 fill-obsidian" />
              </span>
              {!YOUTUBE_ID && (
                <span className="absolute bottom-6 text-xs font-light text-muted">
                  (הוסיפו מזהה YouTube ב־VideoFeature.tsx כדי להפעיל)
                </span>
              )}
            </button>
          )}
        </div>
      </Reveal>

      <Reveal delay={0.15} amount={0.7}>
        <a
          href={whatsappLink(
            t(
              "היי, ראיתי את הסרטון ואשמח להתייעצות לגבי המצב שלי",
              "Hi, I watched the video and would like a consultation about my situation",
            ),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center justify-center rounded-full bg-gradient-to-l from-bronze via-gold to-gold-soft px-10 py-4 text-sm font-medium text-obsidian transition-all duration-300 hover:brightness-110"
        >
          {t("רוצים לשלוט במצב? דברו איתי", "Want to take control? Talk to me")}
        </a>
      </Reveal>
    </section>
  );
}
