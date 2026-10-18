import type { Metadata } from "next";
import { ServicesView, servicesMeta } from "@/views/ServicesView";

export const metadata: Metadata = servicesMeta("bn");

export default function Page() {
  return <ServicesView lang="bn" />;
}
