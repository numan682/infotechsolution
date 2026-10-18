import type { Metadata } from "next";
import { WorkView, workMeta } from "@/views/WorkView";

export const metadata: Metadata = workMeta("bn");

export default function Page() {
  return <WorkView lang="bn" />;
}
