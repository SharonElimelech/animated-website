import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { visibleArticles } from "@/lib/articles";

// Drafts are excluded automatically (visibleArticles) until Hadar approves them.
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = visibleArticles();
  return [
    { url: SITE.url, changeFrequency: "monthly", priority: 1 },
    ...(articles.length ? [{ url: `${SITE.url}/articles`, changeFrequency: "weekly" as const, priority: 0.8 }] : []),
    ...articles.map((a) => ({ url: `${SITE.url}/articles/${a.slug}`, lastModified: a.date, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
