import type { Metadata } from "next";
import { ContactView, contactMeta } from "@/views/ContactView";

export const metadata: Metadata = contactMeta("bn");

export default function Page() {
  return <ContactView lang="bn" />;
}
