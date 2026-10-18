import type { Metadata } from "next";
import { ProcessView, processMeta } from "@/views/ProcessView";

export const metadata: Metadata = processMeta("en");

export default function Page() {
  return <ProcessView lang="en" />;
}
