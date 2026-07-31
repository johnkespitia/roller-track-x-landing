import type { MetadataRoute } from "next";
import { getAll, getAllFlat, getCategories, getTags } from "@/lib/content/reader";
import { EXPLORAR_LABELS, ROUTES } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com";
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/explorar`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/blog/buscar`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/eventos`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/escuelas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/comunidad`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/sponsors`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    ...EXPLORAR_LABELS.map((item) => ({
      url: `${baseUrl}${item.href}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    { url: `${baseUrl}${ROUTES.faq}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}${ROUTES.legal}`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}${ROUTES.miPerfil}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  // Contenido: blog posts
  const blogEntries: MetadataRoute.Sitemap = (await getAll("blog")).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Categorías y tags
  const categories = await getCategories("blog");
  const categoryEntries: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${baseUrl}/blog/categoria/${encodeURIComponent(c.name)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const tags = await getTags("blog");
  const tagEntries: MetadataRoute.Sitemap = tags.map((t) => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(t.name)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries, ...categoryEntries, ...tagEntries];
}
