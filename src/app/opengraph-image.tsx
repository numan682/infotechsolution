import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = `${site.name}: IT Company & Digital Agency in Bangladesh`;
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
          background: "#000",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -150,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(124,58,237,0.65), rgba(0,0,0,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -120,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(0,113,227,0.6), rgba(0,0,0,0) 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #0071e3, #7c3aed 55%, #ec4899)",
            }}
          />
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
              backgroundImage: "linear-gradient(90deg, #38bdf8, #a78bfa, #f472b6)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            engineered to move you.
          </div>
          <div style={{ fontSize: 30, color: "#a1a1aa", marginTop: 28 }}>
            Web · Mobile Apps · Software · Cloud · SEO · AI — from Dhaka, Bangladesh
          </div>
        </div>
      </div>
    ),
    size,
  );
}
