import type { Metadata } from "next";
import { AboutView, aboutMeta } from "@/views/AboutView";

export const metadata: Metadata = aboutMeta("bn");

export default function Page() {
  return <AboutView lang="bn" />;
}
