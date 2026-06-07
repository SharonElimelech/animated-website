"use client";

import { useState } from "react";
import { Phone, MapPin, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SITE, telLink, mapsEmbed, whatsappLink } from "@/lib/site";

export default function Contact() {
  const [name, setName] = useState("");
  const [prefix, setPrefix] = useState("050");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text =
      `שם: ${name}\n` +
      `טלפון: ${prefix}-${phone}\n` +
      (message ? `הודעה: ${message}` : "");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"
    >
      <Reveal className="mb-14 text-center" amount={0.6}>
        <span className="text-shadow-lux text-xs font-light tracking-[0.4em] text-gold/85">
          תהיו איתנו בקשר
        </span>
      </Reveal>

      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: copy + contact cards + map */}
        <div>
          <Reveal amount={0.4}>
            <h2 className="font-serif text-4xl font-bold leading-tight text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] sm:text-5xl lg:text-6xl">
              ייעוץ משפטי ראשוני
              <br />
              <span className="text-gradient-gold">ללא התחייבות</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} amount={0.5}>
            <p className="text-shadow-lux mt-6 max-w-md text-base font-light leading-relaxed text-muted">
              המשרד זמין עבורכם לכל שאלה. אנחנו כאן כדי להעניק לכם את השקט הנפשי
              שמגיע לכם ולהוציא אתכם לדרך חדשה.
            </p>
          </Reveal>

          <Reveal delay={0.15} amount={0.4} fade className="mt-10 grid gap-4 sm:grid-cols-2">
            <a
              href={telLink}
              className="glass group flex items-center justify-between rounded-xl p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-obsidian">
                <Phone className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <span className="text-right">
                <span className="block text-xs font-light text-muted">
                  חייגו עכשיו
                </span>
                <span className="mt-1 block text-base font-bold text-ink" dir="ltr">
                  {SITE.phone}
                </span>
              </span>
            </a>

            <div className="glass flex items-center justify-between rounded-xl p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/10 text-gold">
                <MapPin className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <span className="text-right">
                <span className="block text-xs font-light text-muted">
                  כתובת המשרד
                </span>
                <span className="mt-1 block text-base font-bold text-ink">
                  {SITE.address}
                </span>
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2} amount={0.3}>
            <div className="mt-6 overflow-hidden rounded-xl border border-line">
              <iframe
                title="מפת המשרד"
                src={mapsEmbed}
                className="h-64 w-full grayscale"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <Reveal amount={0.2} fade>
          <form
            onSubmit={submit}
            className="glass-dark rounded-2xl p-8 lg:p-10"
          >
            <h3 className="font-serif text-3xl font-bold text-ink">
              שלחו פנייה דיסקרטית
            </h3>
            <p className="mt-2 text-sm font-light text-muted">
              נחזור אליכם תוך 24 שעות עם מענה
            </p>

            <div className="mt-8 space-y-6">
              <Field label="שם מלא">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-line bg-obsidian px-4 py-3 text-ink outline-none transition-colors focus:border-gold/60"
                />
              </Field>

              <Field label="טלפון נייד">
                <div className="flex gap-3">
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    placeholder="1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    className="w-full rounded-lg border border-line bg-obsidian px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted/50 focus:border-gold/60"
                  />
                  <select
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    className="rounded-lg border border-line bg-obsidian px-3 py-3 text-ink outline-none focus:border-gold/60"
                    aria-label="קידומת"
                  >
                    {["050", "052", "053", "054", "055", "058"].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </Field>

              <Field label="הודעה (אופציונלי)">
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-lg border border-line bg-obsidian px-4 py-3 text-ink outline-none transition-colors focus:border-gold/60"
                />
              </Field>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-l from-bronze via-gold to-gold-soft px-8 py-4 text-sm font-medium text-obsidian transition-all duration-300 hover:brightness-110"
              >
                לשליחת הבקשה לייעוץ
                <ArrowLeft className="h-4 w-4" />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-right">
      <span className="mb-2 block text-xs font-light tracking-wide text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}
