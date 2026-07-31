import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PlaceholderPageProps {
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}

export function buildPlaceholderMetadata(
  title: string,
  description: string
): Metadata {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com";
  return {
    title: `${title} | Roller Track X`,
    description,
    openGraph: {
      title: `${title} | Roller Track X`,
      description,
      url: baseUrl,
    },
    robots: { index: false, follow: true },
  };
}

export default function PlaceholderPage({
  title,
  description,
  ctaHref = "/explorar",
  ctaLabel = "Ir a Explorar",
}: PlaceholderPageProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark flex items-center justify-center px-4 py-32">
        <div className="max-w-2xl text-center">
          <p className="text-primary font-heading text-sm uppercase tracking-widest mb-4">
            Próximamente
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10">{description}</p>
          <Link
            href={ctaHref}
            className="inline-block px-8 py-4 bg-primary text-white font-heading font-bold rounded-lg hover:bg-opacity-90 transition-all hover:scale-105"
          >
            {ctaLabel}
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
