import type { Metadata } from "next";
import { HomeView, homeMeta } from "@/views/HomeView";

export const metadata: Metadata = homeMeta("en");

export default function Page() {
  return <HomeView lang="en" />;
}
