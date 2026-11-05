import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { visibleArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: 'מאמרים: חדלות פירעון, הפטר ועיקולים | עו"ד הדר אלימלך',
  description:
    "מדריכים מעשיים מעו\"ד הדר אלימלך על חדלות פירעון, צו הפטר, ביטול עיקולים והוצאה לפועל — מבוססים על לשון החוק.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesIndex() {
  const list = visibleArticles();
  if (list.length === 0) notFound(); // nothing approved yet

  return (
    <MainLayout>
      <section className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6 lg:pt-36">
        <div className="glass-dark rounded-[2rem] p-6 sm:p-12">
          <h1 className="font-serif text-3xl font-bold text-ink sm:text-5xl">מאמרים ומדריכים</h1>
          <p className="mt-4 text-lg text-ink/85">
            תשובות לשאלות שלקוחות שואלים אותנו בכל יום — על חדלות פירעון, הפטר, עיקולים והוצאה לפועל.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {list.map((a) => (
              <li key={a.slug}>
                <a
                  href={`/articles/${a.slug}`}
                  className="block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-gold/50"
                >
                  <h2 className="font-serif text-xl font-bold leading-snug text-ink">{a.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/80">{a.description}</p>
                  <span className="mt-4 inline-block text-sm text-gold">לקריאה ←</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MainLayout>
  );
}
