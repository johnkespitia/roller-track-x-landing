/** Imagen por defecto para artículos sin asset propio. */
export const DEFAULT_CONTENT_IMAGE = "/images/content/default.png";

/** Placeholders genéricos que deben reemplazarse por la imagen de contenido. */
const FALLBACK_SOURCES = new Set([
  "/images/og-image.png",
  "/images/brand/og-image.png",
]);

/**
 * Resuelve la imagen pública de un artículo.
 * Si falta o apunta a un OG genérico, usa la imagen por defecto de contenido.
 */
export function resolveContentImage(image?: string | null): string {
  if (!image || FALLBACK_SOURCES.has(image)) {
    return DEFAULT_CONTENT_IMAGE;
  }
  return image;
}
