import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared 1200×630 share-image layout in the site palette (wine / cream / ember). */
export function renderOgImage({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#3B0A22",
          color: "#FBF3E4",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, textTransform: "uppercase", color: "#FFC53D" }}>{eyebrow}</div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 28 }}>
          <span style={{ color: "rgba(251,243,228,0.75)" }}>{footer}</span>
          <span style={{ width: 120, height: 12, borderRadius: 6, background: "#F0491F" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
