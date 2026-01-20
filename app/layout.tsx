import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SchemaOrg from "@/components/SchemaOrg";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"),
  title: "Roller Track X | The Next Revolution of Speed",
  description: "Eventos, comunidad y seguimiento deportivo para impulsar el talento del patinaje de velocidad. Empezamos con pilotos low-cost y registro gratuito.",
  keywords: ["patinaje de velocidad", "liga de patinaje", "escuela de patinaje", "roller track", "deporte colombia"],
  authors: [{ name: "Roller Track X" }],
  openGraph: {
    title: "Roller Track X | The Next Revolution of Speed",
    description: "Eventos, comunidad y seguimiento deportivo para impulsar el talento del patinaje de velocidad.",
    type: "website",
    locale: "es_CO",
    siteName: "Roller Track X",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com",
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Roller Track X - The Next Revolution of Speed",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roller Track X | The Next Revolution of Speed",
    description: "Eventos, comunidad y seguimiento deportivo para impulsar el talento del patinaje de velocidad.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/images/logo/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/images/logo/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <SchemaOrg />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
