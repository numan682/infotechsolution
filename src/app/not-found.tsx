import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80dvh] items-center overflow-hidden pt-24">
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div aria-hidden className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 animate-pulse-soft rounded-full bg-violet/25 blur-[120px]" />
      <div className="container-x relative text-center">
        <p className="text-gradient text-[clamp(7rem,24vw,16rem)] font-bold leading-none tracking-[-0.07em]">404</p>
        <h1 className="display-md mt-4 text-ink">This page took a wrong turn.</h1>
        <p className="lede mx-auto mt-4 max-w-md">The page you’re looking for doesn’t exist or has moved.</p>
        <Link href="/" className="btn btn-dark mt-10">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Back to home
        </Link>
      </div>
    </section>
  );
}
