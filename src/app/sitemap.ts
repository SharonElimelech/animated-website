import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// ponytail: single page today; add each new service/city/article route here.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE.url, changeFrequency: "monthly", priority: 1 }];
}
