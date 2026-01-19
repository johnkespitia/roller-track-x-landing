import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/constants";

// Genera og-image dinámicamente (1200x630px)
export const alt = "Roller Track X - The Next Revolution of Speed";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${BRAND.colors.dark} 0%, ${BRAND.colors.primary} 100%)`,
          fontSize: 80,
          fontWeight: "bold",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ fontSize: 100, fontWeight: 900 }}>RTX</div>
          <div style={{ fontSize: 40, opacity: 0.9 }}>
            {BRAND.tagline}
          </div>
          <div
            style={{
              fontSize: 32,
              marginTop: 40,
              opacity: 0.8,
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            Eventos, comunidad y seguimiento deportivo
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
