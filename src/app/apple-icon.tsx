import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0071e3, #7c3aed 55%, #ec4899)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 24, height: 24, borderRadius: 999, background: "white" }} />
            <div style={{ width: 24, height: 62, borderRadius: 12, background: "white" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 62, height: 22, borderRadius: 11, background: "white" }} />
            <div style={{ width: 22, height: 74, borderRadius: 11, background: "white", marginTop: -4 }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
