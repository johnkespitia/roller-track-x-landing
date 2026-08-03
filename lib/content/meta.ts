import type { Metadata } from "next";
import type { ContentListItem, ContentType } from "./types";
import { resolveContentImage } from "./image";

/** Mapeo de tipo de contenido → ruta pública en español. */
const TYPE_PATH: Partial<Record<ContentType, string>> = {
  news: "noticias",
  guides: "guias",
  events: "eventos",
  clubs: "clubes",
  schools: "escuelas",
  athletes: "deportistas",
};

/**
 * Genera la URL pública de un entry.
 */
export function contentUrl(type: ContentType, slug: string): string {
  const base = TYPE_PATH[type] ?? type;
  return `/${base}/${slug}`;
}

function absoluteImageUrl(baseUrl: string, image: string): string {
  return image.startsWith("http") ? image : `${baseUrl}${image}`;
}

/**
 * Genera el `Metadata` para la página de detalle de un entry.
 */
export function buildArticleMetadata(
  type: ContentType,
  entry: ContentListItem
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com";
  const url = `${baseUrl}${contentUrl(type, entry.slug)}`;
  const image = resolveContentImage(entry.image);
  const imageUrl = absoluteImageUrl(baseUrl, image);

  return {
    title: entry.title,
    description: entry.description,
    authors: [{ name: entry.author }],
    keywords: entry.tags,
    alternates: {
      canonical: entry.canonical ?? url,
    },
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.description,
      url,
      siteName: "Roller Track X",
      locale: "es_CO",
      publishedTime: entry.date,
      authors: [entry.author],
      tags: entry.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: entry.imageAlt ?? entry.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description: entry.description,
      images: [imageUrl],
    },
  };
}

/**
 * JSON-LD para un artículo.
 */
export function articleJsonLd(type: ContentType, entry: ContentListItem): Record<string, unknown> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com";
  const url = `${baseUrl}${contentUrl(type, entry.slug)}`;
  const image = resolveContentImage(entry.image);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.description,
    datePublished: entry.date,
    dateModified: entry.date,
    author: {
      "@type": "Person",
      name: entry.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Roller Track X",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: absoluteImageUrl(baseUrl, image),
    articleSection: entry.category,
    keywords: entry.tags.join(", "),
  };
}
