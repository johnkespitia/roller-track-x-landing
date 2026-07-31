/**
 * Helpers de formato de fechas, locales (es-CO).
 */
const LOCALE = "es-CO";

export function formatDate(
  iso: string | Date,
  style: "short" | "long" | "iso" = "long"
): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return "";
  if (style === "iso") return d.toISOString();
  if (style === "short") {
    return d.toLocaleDateString(LOCALE, { day: "2-digit", month: "short", year: "numeric" });
  }
  return d.toLocaleDateString(LOCALE, { day: "numeric", month: "long", year: "numeric" });
}
