import type { Metadata } from "next";
import { PrivacyView, privacyMeta } from "@/views/PrivacyView";

export const metadata: Metadata = privacyMeta("bn");

export default function Page() {
  return <PrivacyView lang="bn" />;
}
