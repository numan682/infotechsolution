import type { Metadata } from "next";
import { serviceSlugs } from "@/lib/services";
import { isSolution, solutionSlugs } from "@/lib/solutions";
import { ServiceDetailView, serviceDetailMeta } from "@/views/ServiceDetailView";
import { SolutionView, solutionMeta } from "@/views/SolutionView";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

// Flagship solutions and regular services share /services/<slug>/.
export function generateStaticParams() {
  return [...solutionSlugs, ...serviceSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return isSolution(slug) ? solutionMeta("bn", slug) : serviceDetailMeta("bn", slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return isSolution(slug) ? <SolutionView lang="bn" slug={slug} /> : <ServiceDetailView lang="bn" slug={slug} />;
}
