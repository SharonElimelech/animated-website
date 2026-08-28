"use client";

import { SITE, whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const NAV = [
  { he: "אודות המשרד", en: "About", href: "/#about" },
  { he: "המסלול שלך", en: "Your Process", href: "/#process" },
  { he: "שאלות נפוצות", en: "FAQ", href: "/#faq" },
  { he: "צור קשר", en: "Contact", href: "/#contact" },
];

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative z-10 border-t border-line bg-obsidian/80 px-6 py-16 backdrop-blur-xl lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl font-bold tracking-[0.15em] text-ink">
              {SITE.nameEn}
            </p>
            <p className="mt-1 text-xs tracking-[0.3em] text-gold/85">
              {SITE.tagline}
            </p>
          </div>

          {/* Quick nav */}
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-light text-muted transition-colors hover:text-gold"
              >
                {t(l.he, l.en)}
              </a>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            {[
              { Icon: FacebookIcon, href: SITE.social.facebook, label: t("פייסבוק", "Facebook") },
              { Icon: InstagramIcon, href: SITE.social.instagram, label: t("אינסטגרם", "Instagram") },
              { Icon: TiktokIcon, href: SITE.social.tiktok, label: t("טיקטוק", "TikTok") },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-gold/50 hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href={whatsappLink()}
              aria-label={t("וואטסאפ", "WhatsApp")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all hover:border-gold/50 hover:text-gold"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.99-1.046zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-12 h-px w-full rule-gold opacity-30" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs font-light text-muted/60 sm:flex-row">
          <p>
            ©{" "}{new Date().getFullYear()}{" "}
            {t(
              `כל הזכויות שמורות למשרד עו״ד ${SITE.name}.`,
              `All rights reserved — ${SITE.nameEn} Law Office.`,
            )}
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="transition-colors hover:text-gold">
              {t("מדיניות פרטיות", "Privacy Policy")}
            </a>
            <a href="/accessibility" className="transition-colors hover:text-gold">
              {t("הצהרת נגישות", "Accessibility")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
