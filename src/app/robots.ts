import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Cloudflare prepends its managed AI-crawler rules to this file in production.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
