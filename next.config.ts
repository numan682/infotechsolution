import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `npm run build` emits a plain `out/` folder that can be
  // uploaded to any shared cPanel host (public_html) — no Node.js server needed.
  output: "export",
  // `/about` -> `/about/index.html`, served natively by Apache without rewrites.
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
