import type { Metadata } from "next";
import { serviceSlugs } from "@/lib/services";
import { ServiceDetailView, serviceDetailMeta } from "@/views/ServiceDetailView";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return serviceDetailMeta("bn", (await params).slug);
}

export default async function Page({ params }: Props) {
  return <ServiceDetailView lang="bn" slug={(await params).slug} />;
}
