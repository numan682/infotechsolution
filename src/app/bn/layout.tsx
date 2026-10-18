import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { RootShell } from "@/components/layout/RootShell";
import { rootMeta } from "@/lib/seo";


export const metadata: Metadata = rootMeta("bn");

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function BanglaLayout({ children }: { children: React.ReactNode }) {
  // Bangla text above the fold uses both weights, so fetch them alongside the HTML.
  for (const w of [400, 700]) preload(`/fonts/anek-bangla-${w}.woff2`, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return <RootShell lang="bn">{children}</RootShell>;
}
