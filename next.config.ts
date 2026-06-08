import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Workers doesn't support Next.js built-in image optimization.
  // Images are served as-is from the /public directory.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
