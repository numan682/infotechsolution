import { ImageResponse } from "next/og";
import en from "@/content/en";
import { serviceMeta } from "@/lib/services";
import { solutionMeta } from "@/lib/solutions";
import { site } from "@/lib/site";

// Branded link-preview cards (WhatsApp, LinkedIn, email, Slack…) for every service
// and solution page, emitted at build time as /og/<slug>.png.
export const dynamic = "force-static";
export const dynamicParams = false;

const pages = [
  ...solutionMeta.map((m) => ({ slug: m.slug, gradient: m.gradient, kind: "Solution", title: en.solutions[m.slug].title, line: en.solutions[m.slug].short })),
  ...serviceMeta.map((m) => ({ slug: m.slug, gradient: m.gradient, kind: "Service", title: en.services[m.slug].title, line: en.services[m.slug].short })),
];

// Geist 400 + 800 as TTF (the image renderer can't read woff2). Fetched once per build;
// if the network is unavailable the card still renders with the built-in font.
let fontsPromise: Promise<{ name: string; data: ArrayBuffer; weight: 400 | 800; style: "normal" }[]> | null = null;
function loadFonts() {
  fontsPromise ??= (async () => {
    try {
      const css = await (await fetch("https://fonts.googleapis.com/css2?family=Geist:wght@400;800", { headers: { "User-Agent": "Mozilla/4.0" } })).text();
      const urls = [...css.matchAll(/src: url\((.+?\.ttf)\)/g)].map((m) => m[1]);
      if (urls.length < 2) return [];
      const [regular, bold] = await Promise.all(urls.slice(0, 2).map(async (u) => (await fetch(u)).arrayBuffer()));
      return [
        { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
        { name: "Geist", data: bold, weight: 800 as const, style: "normal" as const },
      ];
    } catch {
      return [];
    }
  })();
  return fontsPromise;
}

export function generateStaticParams() {
  return pages.map((p) => ({ file: `${p.slug}.png` }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const page = pages.find((p) => `${p.slug}.png` === file) ?? pages[0];
  const [a, b] = page.gradient;
  const fonts = await loadFonts();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#ffffff", fontFamily: fonts.length ? "Geist" : "sans-serif", color: "#1c1410" }}>
        <div style={{ position: "absolute", top: -260, right: -180, width: 760, height: 760, borderRadius: 9999, background: `radial-gradient(circle, ${a}88, rgba(255,255,255,0) 70%)` }} />
        <div style={{ position: "absolute", bottom: -320, left: -200, width: 700, height: 700, borderRadius: 9999, background: `radial-gradient(circle, ${b}66, rgba(255,255,255,0) 70%)` }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 14, background: `linear-gradient(180deg, ${b}, ${a})` }} />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #ffa62b, #ff6b00 50%, #f43f1a)" }} />
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>{site.name}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "8px 18px",
                borderRadius: 999,
                background: "#fff1e6",
                color: "#c44100",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {page.kind}
            </div>
            <div style={{ fontSize: page.title.length > 22 ? 76 : 88, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, marginTop: 22, maxWidth: 980 }}>{page.title}</div>
            <div style={{ fontSize: 30, color: "#5d4f46", marginTop: 22, maxWidth: 940, lineHeight: 1.35 }}>{page.line}</div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26, color: "#75665c" }}>
            <div style={{ display: "flex" }}>{site.domain}</div>
            <div style={{ display: "flex", padding: "12px 26px", borderRadius: 999, background: "#cc4700", color: "#fff", fontWeight: 700 }}>{site.phone}</div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts },
  );
}
