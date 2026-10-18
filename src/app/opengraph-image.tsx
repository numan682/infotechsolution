import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import en from "@/content/en";

export const dynamic = "force-static";
export const alt = en.meta.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#ffffff",
          color: "#1c1410",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -200,
            width: 820,
            height: 820,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,107,0,0.55), rgba(255,255,255,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            left: -160,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,166,43,0.45), rgba(255,255,255,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg, #ffa62b, #ff6b00 50%, #f43f1a)" }} />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -4, lineHeight: 1.02 }}>Technology,</div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: -4,
              lineHeight: 1.02,
              backgroundImage: "linear-gradient(90deg, #ff8a00, #ff5a00, #ff3d3d)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            engineered to move you.
          </div>
          <div style={{ fontSize: 30, color: "#75665c", marginTop: 28 }}>Web · Apps · Software · GPS Tracking · SEO · AI — Dhaka, Bangladesh</div>
        </div>
      </div>
    ),
    size,
  );
}
