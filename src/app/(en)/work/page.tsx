import type { Metadata } from "next";
import { WorkView, workMeta } from "@/views/WorkView";

export const metadata: Metadata = workMeta("en");

export default function Page() {
  return <WorkView lang="en" />;
}
