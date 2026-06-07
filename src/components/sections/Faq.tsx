"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Lock } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { whatsappLink } from "@/lib/site";

/**
 * NOTE: the questions are transcribed from the live site. The ANSWERS were not
 * visible in the screenshots, so these are professional drafts based on general
 * Israeli insolvency practice — please review/replace with the firm's wording.
 */
const FAQ: { q: string; a: string }[] = [
  {
    q: "מה המשמעות של הליך חדלות פירעון הלכה למעשה?",
    a: "מדובר בהליך מסודר בליווי בית המשפט או הממונה על חדלות פירעון, שמטרתו לאזן בין החזר חלקי לנושים לבין מתן הזדמנות אמיתית לפתיחת דף חדש. בסיומו ניתן צו הפטר שמוחק את יתרת החובות.",
  },
  {
    q: "האם הדירה שלי בסכנה במהלך התהליך?",
    a: "לא בהכרח. ברוב המקרים ניתן לגבש פתרון השומר על בית המגורים, בהתאם לשווי הנכס, גובה המשכנתה ויכולת ההחזר. נבחן עבורכם את כל החלופות לפני כל מהלך.",
  },
  {
    q: "כמה זמן באמת לוקח עד למחיקת החובות?",
    a: "תקופת התשלומים הסטנדרטית נעה סביב שלוש שנים, אך משך ההליך משתנה בהתאם לנסיבות. כבר בתחילת הדרך מתקבלת הגנה מפני הנושים, כך שהלחץ פוחת באופן מיידי.",
  },
  {
    q: "האם ייקחו לי את רישיון הנהיגה?",
    a: "כניסה להליך חדלות פירעון מביאה בדרך כלל לביטול מגבלות שהוטלו בהוצאה לפועל, לרבות עיכוב רישיון נהיגה, ומאפשרת לכם להמשיך בשגרת חייכם.",
  },
  {
    q: "האם חובות למס הכנסה וביטוח לאומי נכללים?",
    a: "ברוב המקרים גם חובות לרשויות המדינה נכללים בהליך וניתנים להסדר במסגרתו. נבחן את תיק החובות המלא שלכם ונסביר מה בדיוק כלול.",
  },
  {
    q: "האם אפשר לצאת לחו״ל?",
    a: "ניתן לבקש אישור יציאה מהארץ במהלך ההליך. בכפוף לעמידה בתנאים ולאישור הגורם המוסמך, יציאה לחו״ל אפשרית גם בתקופת ההליך.",
  },
  {
    q: "האם ההליך פוגע בבן/בת הזוג?",
    a: "ההליך הוא אישי ומתנהל על שמכם בלבד. עם זאת, כאשר קיימים חובות או נכסים משותפים נבחן זאת בקפידה כדי להגן על האינטרסים של כל המשפחה.",
  },
  {
    q: "האם מותר לי לעבוד בזמן ההליך?",
    a: "בהחלט. אתם ממשיכים לעבוד ולהשתכר. צו התשלומים נקבע באופן המותאם ליכולת הכלכלית שלכם, כך שתוכלו לקיים את עצמכם בכבוד לאורך כל הדרך.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40"
    >
      <Reveal className="text-center" amount={0.6}>
        <span className="text-shadow-lux text-xs font-light tracking-[0.4em] text-gold/85">
          מרכז מידע
        </span>
        <h2 className="mt-6 font-serif text-4xl font-bold text-ink [text-shadow:0_2px_30px_rgba(0,0,0,0.85)] sm:text-5xl">
          שאלות ותשובות נפוצות
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        {/* Accordion */}
        <Reveal amount={0.1} className="flex flex-col gap-4">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className={`glass overflow-hidden rounded-xl transition-all duration-300 ${
                  isOpen ? "!border-gold/40" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-gold text-gold"
                        : "border-line text-muted"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                  <span className="text-base font-medium text-ink sm:text-lg">
                    {item.q}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-6 pb-6 text-right text-sm font-light leading-relaxed text-muted">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>

        {/* Side CTA card */}
        <Reveal amount={0.2}>
          <div className="sticky top-28 rounded-2xl bg-gradient-to-br from-gold-soft via-gold to-bronze p-8 text-obsidian">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-obsidian/10 text-2xl font-bold">
              ?
            </span>
            <h3 className="mt-6 font-serif text-3xl font-bold">
              לא מצאתם תשובה?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-obsidian/80">
              אנחנו כאן לענות על כל שאלה. אל תישארו עם הספקות — התייעצו איתנו.
            </p>
            <a
              href={whatsappLink("היי, יש לי שאלה לגבי הליך חדלות פירעון")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 block rounded-full bg-obsidian px-6 py-3.5 text-center text-sm font-medium text-ink transition-colors hover:bg-charcoal"
            >
              דברו איתנו עכשיו
            </a>

            <div className="mt-8 border-t border-obsidian/20 pt-5">
              <p className="flex items-center justify-end gap-2 text-sm font-bold">
                סודיות מובטחת
                <Lock className="h-4 w-4" />
              </p>
              <p className="mt-1 text-left text-xs text-obsidian/70">
                כל פנייה למשרדנו חוסה תחת חיסיון עו״ד-לקוח.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
