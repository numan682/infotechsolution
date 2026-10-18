import type { Metadata, Viewport } from "next";
import { RootShell } from "@/components/layout/RootShell";
import { rootMeta } from "@/lib/seo";

export const metadata: Metadata = rootMeta("en");

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
