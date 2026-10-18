import { ImageResponse } from "next/og";

// Square PNG logo for structured data (Google prefers raster logos >= 112px).
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #ffa62b, #ff6b00 50%, #f43f1a)",
          borderRadius: 120,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 50 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
            <div style={{ width: 66, height: 66, borderRadius: 999, background: "white" }} />
            <div style={{ width: 66, height: 172, borderRadius: 33, background: "white" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 172, height: 62, borderRadius: 31, background: "white" }} />
            <div style={{ width: 62, height: 206, borderRadius: 31, background: "white", marginTop: -10 }} />
          </div>
        </div>
      </div>
    ),
    { width: 512, height: 512 },
  );
}
