import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MainLayout from "@/components/layout/MainLayout";
import { getArticle, readingMinutes, visibleArticles, type Block } from "@/lib/articles";
import { SITE, telLink, whatsappLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Unknown slugs (and drafts in production) 404 instead of rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return visibleArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  const url = `/articles/${a.slug}`;
  return {
    title: `${a.title} | עו"ד הדר אלימלך`,
    description: a.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.description,
      url,
      locale: "he_IL",
      publishedTime: a.date,
      images: ["/og.png"],
    },
  };
}

function BlockView({ b }: { b: Block }) {
  if ("tldr" in b)
    return (
      <p className="rounded-2xl border border-gold/30 bg-gold/[0.07] p-5 text-base leading-7 text-ink sm:p-6">
        {b.tldr}
      </p>
    );
  if ("h2" in b)
    return <h2 className="pt-6 font-serif text-2xl font-bold text-gold-soft sm:text-3xl">{b.h2}</h2>;
  if ("ul" in b)
    return (
      <ul className="list-disc space-y-2 ps-6 marker:text-gold">
        {b.ul.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    );
  return <p>{b.p}</p>;
}

export default async function ArticlePage({ params }: Props) {
  const a = getArticle((await params).slug);
  if (!a) notFound();

  const url = `${SITE.url}/articles/${a.slug}`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.date,
    inLanguage: "he",
    image: `${SITE.url}/og.png`,
    mainEntityOfPage: url,
    author: { "@id": `${SITE.url}/#hadar` },
    publisher: { "@id": `${SITE.url}/#office` },
  };
  const more = visibleArticles().filter((x) => x.slug !== a.slug);

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }}
      />
      <article className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 lg:pt-36">
        <div className="glass-dark rounded-[2rem] p-6 sm:p-12">
          <nav aria-label="פירורי לחם" className="text-sm text-muted">
            <a href="/" className="hover:text-gold">דף הבית</a>
            <span className="mx-2">/</span>
            <a href="/articles" className="hover:text-gold">מאמרים</a>
          </nav>

          <h1 className="mt-5 font-serif text-3xl font-bold leading-tight text-ink sm:text-5xl">
            {a.title}
          </h1>
          <p className="mt-4 text-sm text-muted">
            עו&quot;ד הדר אלימלך · {new Date(a.date).toLocaleDateString("he-IL")} · {readingMinutes(a)} דקות קריאה
          </p>

          <div className="mt-10 space-y-6 text-lg leading-8 text-ink/90">
            {a.blocks.map((b, i) => (
              <BlockView key={i} b={b} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="font-serif text-xl font-bold text-ink">רוצים לבדוק מה נכון במקרה שלכם?</p>
            <p className="mt-2 text-ink/80">פגישת ייעוץ ראשונה ללא עלות וללא התחייבות, בדיסקרטיות מלאה.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={telLink} dir="ltr" className="gold-bg rounded-full px-7 py-3.5 text-sm font-bold text-obsidian">
                {SITE.phone}
              </a>
              <a
                href={whatsappLink(`שלום, קראתי את המאמר "${a.title}" ואשמח לייעוץ`)}
                className="rounded-full border border-white/35 px-7 py-3.5 text-sm font-medium text-ink hover:border-gold/60"
              >
                וואטסאפ
              </a>
              <a href="/#calculator" className="rounded-full px-4 py-3.5 text-sm text-ink/90 underline-offset-4 hover:text-gold hover:underline">
                בדיקת זכאות חינם
              </a>
            </div>
          </div>

          <p className="mt-10 text-sm leading-6 text-muted">
            המידע במאמר הוא מידע כללי ואינו מהווה ייעוץ משפטי או תחליף לו. כל מקרה נבחן לגופו.
          </p>

          <div className="mt-6 text-sm text-muted">
            <p className="font-bold text-ink/80">מקורות</p>
            <ul className="mt-2 space-y-1">
              {a.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-gold hover:underline">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {more.length > 0 && (
            <div className="mt-12 border-t border-white/10 pt-8">
              <p className="font-serif text-xl font-bold text-ink">מאמרים נוספים</p>
              <ul className="mt-4 space-y-3">
                {more.map((m) => (
                  <li key={m.slug}>
                    <a href={`/articles/${m.slug}`} className="text-gold-soft underline-offset-4 hover:underline">
                      {m.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </MainLayout>
  );
}
