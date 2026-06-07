"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

const DEBT_OPTIONS = [
  "עד 50,000 ₪",
  "50,000 – 150,000 ₪",
  "150,000 – 500,000 ₪",
  "מעל חצי מיליון ₪",
];
const CREDITORS = [
  "בנקים וחברות אשראי",
  "הוצאה לפועל / מרכז לגביית קנסות",
  "ספקים / חובות עסקיים",
  "שוק אפור / אנשים פרטיים",
];
const FORECLOSURES = [
  "עיקול משכורת / עו״ש",
  "הגבלת רישיון נהיגה",
  "צו עיכוב יציאה מהארץ",
  "אין עיקולים כרגע",
];

const STEPS = [
  "מהו סך החובות המשוער שלך?",
  "מול אילו גופים מתנהלים החובות?",
  "האם ישנם עיקולים או הגבלות פעילים כרגע?",
  "כמעט סיימנו — לאן לשלוח את האבחון?",
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function DebtCalculator() {
  const [step, setStep] = useState(0);
  const [debt, setDebt] = useState("");
  const [creditors, setCreditors] = useState<string[]>([]);
  const [foreclosures, setForeclosures] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void,
  ) =>
    setList(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canContinue =
    (step === 0 && debt) ||
    (step === 1 && creditors.length > 0) ||
    (step === 2 && foreclosures.length > 0) ||
    (step === 3 && name.trim() && phone.trim() && emailValid);

  const submit = async () => {
    setStatus("loading");
    try {
      const [res] = await Promise.all([
        fetch("/api/calculator-submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, email, debt, creditors, foreclosures, company }),
        }),
        sleep(1900), // premium "calculating strategy" beat
      ]);
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="calculator" className="relative mx-auto max-w-3xl px-6 py-28 lg:py-36">
      {/* Heading */}
      <div className="mb-12 text-center">
        <span className="text-shadow-lux text-xs font-light tracking-[0.4em] text-gold/90">
          אבחון ראשוני · 60 שניות
        </span>
        <h2 className="mt-6 font-serif text-4xl font-bold text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] sm:text-5xl">
          מחשבון חובות
        </h2>
        <p className="text-shadow-lux mx-auto mt-5 max-w-xl text-base font-light leading-relaxed text-ink/80">
          כלי אבחון דיסקרטי שיבחן את התאמתך למסלולי הפחתת חובות, ביטול עיקולים
          ושיקום כלכלי — ללא התחייבות.
        </p>
      </div>

      {/* Glass card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-7 shadow-[0_8px_40px_0_rgba(0,0,0,0.6)] backdrop-blur-sm sm:p-10">
        {/* gold top accent */}
        <span className="absolute inset-x-0 top-0 h-px gold-bg" aria-hidden />

        {status === "success" ? (
          <SuccessState />
        ) : status === "loading" ? (
          <LoadingState />
        ) : (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between text-xs font-light text-muted">
                <span>
                  שלב {step + 1} מתוך {STEPS.length}
                </span>
                <span className="text-gold/90">{Math.round(((step + 1) / STEPS.length) * 100)}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full gold-bg"
                  initial={false}
                  animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
            </div>

            {/* Step heading */}
            <h3 className="mb-6 text-right font-serif text-2xl font-bold text-ink">
              {STEPS[step]}
            </h3>

            {/* Steps */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {step === 0 && (
                  <div className="grid gap-3">
                    {DEBT_OPTIONS.map((o) => (
                      <OptionRow
                        key={o}
                        label={o}
                        selected={debt === o}
                        type="radio"
                        onClick={() => setDebt(o)}
                      />
                    ))}
                  </div>
                )}
                {step === 1 && (
                  <div className="grid gap-3">
                    {CREDITORS.map((o) => (
                      <OptionRow
                        key={o}
                        label={o}
                        selected={creditors.includes(o)}
                        type="check"
                        onClick={() => toggle(o, creditors, setCreditors)}
                      />
                    ))}
                  </div>
                )}
                {step === 2 && (
                  <div className="grid gap-3">
                    {FORECLOSURES.map((o) => (
                      <OptionRow
                        key={o}
                        label={o}
                        selected={foreclosures.includes(o)}
                        type="check"
                        onClick={() => toggle(o, foreclosures, setForeclosures)}
                      />
                    ))}
                  </div>
                )}
                {step === 3 && (
                  <div className="grid gap-4">
                    <Field label="שם מלא">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="cal-input"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="טלפון">
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="cal-input"
                        inputMode="tel"
                        dir="ltr"
                        autoComplete="tel"
                      />
                    </Field>
                    <Field label="דואר אלקטרוני">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="cal-input"
                        inputMode="email"
                        dir="ltr"
                        autoComplete="email"
                      />
                    </Field>
                    {/* Honeypot (hidden from humans) */}
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="absolute left-[-9999px] h-0 w-0 opacity-0"
                    />
                    <p className="flex items-center justify-end gap-1.5 text-xs font-light text-muted">
                      <ShieldCheck className="h-3.5 w-3.5 text-gold/80" />
                      הפרטים נשמרים בדיסקרטיות מלאה תחת חיסיון עו״ד–לקוח
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {status === "error" && (
              <p className="mt-5 text-right text-sm text-red-400">
                אירעה שגיאה בשליחה. נסו שוב או חייגו אלינו.
              </p>
            )}

            {/* Nav */}
            <div className="mt-9 flex items-center justify-between gap-4">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-light text-muted transition-colors hover:text-ink"
                >
                  <ArrowRight className="h-4 w-4" />
                  חזרה
                </button>
              ) : (
                <span />
              )}

              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => canContinue && setStep((s) => s + 1)}
                  disabled={!canContinue}
                  className="gold-bg inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold text-obsidian shadow-[0_0_25px_-6px_rgba(212,175,55,0.6)] transition-all duration-300 enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  המשך
                  <ArrowLeft className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={() => canContinue && submit()}
                  disabled={!canContinue}
                  className="gold-bg inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold text-obsidian shadow-[0_0_25px_-6px_rgba(212,175,55,0.6)] transition-all duration-300 enabled:hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  קבלת תוצאות האבחון
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ---------- sub-components ---------- */

function OptionRow({
  label,
  selected,
  type,
  onClick,
}: {
  label: string;
  selected: boolean;
  type: "radio" | "check";
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 text-right transition-all duration-300 ${
        selected
          ? "border-gold/60 bg-gold/10"
          : "border-white/10 bg-white/[0.02] hover:border-white/25"
      }`}
    >
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center border transition-all ${
          type === "radio" ? "rounded-full" : "rounded-md"
        } ${selected ? "border-gold bg-gold text-obsidian" : "border-white/30"}`}
      >
        {selected && <Check className="h-4 w-4" strokeWidth={3} />}
      </span>
      <span className={`text-sm sm:text-base ${selected ? "text-ink" : "text-ink/80"}`}>
        {label}
      </span>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-right">
      <span className="mb-2 block text-xs font-light tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Loader2 className="h-10 w-10 animate-spin text-gold" />
      <p className="mt-6 font-serif text-2xl text-ink">מחשב אסטרטגיית שיקום…</p>
      <p className="mt-2 text-sm font-light text-muted">מנתחים את הנתונים מול מסלולי החוק</p>
    </div>
  );
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="py-10 text-center"
    >
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
        <Check className="h-8 w-8 text-gold" strokeWidth={2.5} />
      </span>
      <h3 className="mt-7 font-serif text-2xl font-bold text-ink sm:text-3xl">
        אסטרטגיית השיקום שלך מוכנה
      </h3>
      <p className="text-shadow-lux mx-auto mt-4 max-w-md text-base font-light leading-relaxed text-ink/85">
        נמצאה התאמה ראשונית גבוהה להפחתת חובות ומחיקת עיקולים. נציג מהמשרד יחזור
        אליך בהקדם עם הפירוט המלא.
      </p>
    </motion.div>
  );
}
