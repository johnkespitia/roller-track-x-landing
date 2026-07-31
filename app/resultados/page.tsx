import PlaceholderPage, { buildPlaceholderMetadata } from "@/components/PlaceholderPage";

export const metadata = buildPlaceholderMetadata(
  "Resultados",
  "Resultados de competencias nacionales e internacionales."
);

export default function ResultadosPage() {
  return (
    <PlaceholderPage
      title="Resultados"
      description="Resultados de competencias nacionales e internacionales. Estamos preparando esta sección."
    />
  );
}
