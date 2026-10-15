import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Magnetic } from "@/components/ui/Magnetic";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";

export function CTA({
  title = "Have an idea? Let’s build it together.",
  lede = "Tell us about your project and get a free consultation, a clear roadmap and a fixed quote within 24 hours.",
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="px-3 py-3 md:px-5 md:py-5">
      <div className="noise relative isolate overflow-hidden rounded-[32px] bg-night px-6 py-24 text-center md:rounded-[44px] md:py-36">
        <div aria-hidden className="grid-bg-dark absolute inset-0" />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full opacity-60 blur-[90px]"
          style={{ background: "conic-gradient(from 0deg, #0071e3, #7c3aed, #ec4899, #f59e0b, #10b981, #0071e3)" }}
        />
        <div className="relative mx-auto max-w-3xl">
          <SplitText text={title} highlight={["build", "it"]} className="display-lg text-white" />
          <Reveal delay={0.2}>
            <p className="lede mx-auto mt-6 max-w-xl !text-neutral-300">{lede}</p>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Magnetic>
                <Link href="/contact/" className="btn btn-light !px-7 !text-base">
                  Get a free quote <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Magnetic>
              <Magnetic>
                {site.whatsapp ? (
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn !px-7 !text-base text-white ring-1 ring-white/25 hover:bg-white/10"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden /> Chat on WhatsApp
                  </a>
                ) : (
                  <a href={`tel:${site.phoneHref}`} className="btn !px-7 !text-base text-white ring-1 ring-white/25 hover:bg-white/10">
                    <Phone className="h-4 w-4" aria-hidden /> Call {site.phone}
                  </a>
                )}
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
