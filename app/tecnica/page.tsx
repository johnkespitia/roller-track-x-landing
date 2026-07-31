import PlaceholderPage, { buildPlaceholderMetadata } from "@/components/PlaceholderPage";

export const metadata = buildPlaceholderMetadata(
  "Técnica",
  "Skating, equipo, biomecánica y todo lo que mejora tu rendimiento."
);

export default function TecnicaPage() {
  return (
    <PlaceholderPage
      title="Técnica"
      description="Skating, equipo, biomecánica y todo lo que mejora tu rendimiento. Estamos preparando esta sección."
    />
  );
}
