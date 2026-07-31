export type ContentType =
  | "blog"
  | "news"
  | "guides"
  | "events"
  | "clubs"
  | "schools"
  | "athletes";

export const CONTENT_TYPES: ContentType[] = [
  "blog",
  "news",
  "guides",
  "events",
  "clubs",
  "schools",
  "athletes",
];

export interface ContentMeta {
  slug: string;
  type: ContentType;
  title: string;
  description: string;
  date: string; // ISO
  author: string;
  authorRole?: string;
  category: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  /** Tiempo de lectura legible ("5 min"). */
  readingTime: string;
  /** Tiempo de lectura en minutos (número crudo). */
  readingMinutes: number;
  /** Indica si el artículo está publicado (draft: false). */
  published: boolean;
  /** Opcional: ruta canónica explícita. */
  canonical?: string;
}

export interface ContentEntry extends ContentMeta {
  body: string;
  /** Cuerpo compilado (MDX) — opcional. */
  compiled?: unknown;
}

export interface ContentListItem extends ContentMeta {}
