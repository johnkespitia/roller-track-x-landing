import { cache } from "react";
import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { CONTENT_TYPES, type ContentEntry, type ContentListItem, type ContentType } from "./types";

const CONTENT_DIR = resolve(process.cwd(), "content");

/**
 * Lista de slugs de un tipo de contenido, sin leer archivos.
 */
async function listSlugs(type: ContentType): Promise<string[]> {
  const dir = join(CONTENT_DIR, type);
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && /\.mdx?$/.test(e.name))
      .map((e) => e.name.replace(/\.mdx?$/, ""));
  } catch {
    return [];
  }
}

function parseFile(type: ContentType, slug: string, raw: string): ContentEntry {
  const { data, content } = matter(raw);
  const minutes = readingTime(content);

  const meta: ContentEntry = {
    slug,
    type,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: data.date instanceof Date ? data.date.toISOString() : String(data.date ?? new Date().toISOString()),
    author: String(data.author ?? "Roller Track X"),
    authorRole: data.authorRole ? String(data.authorRole) : undefined,
    category: String(data.category ?? "general"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    readingTime: minutes.text,
    readingMinutes: Math.max(1, Math.round(minutes.minutes)),
    published: data.draft === true ? false : true,
    canonical: data.canonical ? String(data.canonical) : undefined,
    body: content,
  };

  return meta;
}

/**
 * Devuelve todos los entries de un tipo, ordenados por fecha descendente.
 * Cacheado por request.
 */
export const getAll = cache(async (type: ContentType): Promise<ContentListItem[]> => {
  const slugs = await listSlugs(type);
  const items = await Promise.all(
    slugs.map(async (slug) => {
      try {
        const raw = await readFile(join(CONTENT_DIR, type, `${slug}.mdx`), "utf8");
        return parseFile(type, slug, raw);
      } catch {
        return null;
      }
    })
  );

  return items
    .filter((x): x is ContentEntry => x !== null && x.published)
    .map(({ body: _body, ...meta }) => meta)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
});

/**
 * Devuelve un entry por tipo + slug, con su body MDX crudo.
 */
export const getBySlug = cache(async (type: ContentType, slug: string): Promise<ContentEntry | null> => {
  try {
    const path = join(CONTENT_DIR, type, `${slug}.mdx`);
    const raw = await readFile(path, "utf8");
    return parseFile(type, slug, raw);
  } catch {
    return null;
  }
});

/**
 * Devuelve N artículos relacionados (mismo type, misma categoría o tags compartidos).
 */
export const getRelated = cache(
  async (type: ContentType, slug: string, n = 3): Promise<ContentListItem[]> => {
    const current = await getBySlug(type, slug);
    if (!current) return [];
    const all = await getAll(type);
    const others = all.filter((x) => x.slug !== slug);

    const score = (x: ContentListItem): number => {
      let s = 0;
      if (x.category && x.category === current.category) s += 3;
      const sharedTags = x.tags.filter((t) => current.tags.includes(t)).length;
      s += sharedTags * 2;
      return s;
    };

    return others
      .map((x) => ({ x, s: score(x) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, n)
      .map((p) => p.x);
  }
);

/**
 * Devuelve todos los entries de TODOS los tipos, ordenados por fecha.
 * Útil para RSS, sitemap, búsqueda global, etc.
 */
export const getAllFlat = cache(async (): Promise<ContentListItem[]> => {
  const all = await Promise.all(CONTENT_TYPES.map((t) => getAll(t)));
  return all.flat().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
});

/**
 * Devuelve categorías únicas para un tipo (con conteo).
 */
export const getCategories = cache(async (type: ContentType): Promise<{ name: string; count: number }[]> => {
  const all = await getAll(type);
  const map = new Map<string, number>();
  for (const item of all) {
    const c = item.category || "general";
    map.set(c, (map.get(c) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
});

/**
 * Devuelve tags únicos para un tipo (con conteo).
 */
export const getTags = cache(async (type: ContentType): Promise<{ name: string; count: number }[]> => {
  const all = await getAll(type);
  const map = new Map<string, number>();
  for (const item of all) {
    for (const t of item.tags) {
      map.set(t, (map.get(t) ?? 0) + 1);
    }
  }
  return Array.from(map.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
});
