import PlaceholderPage, { buildPlaceholderMetadata } from "@/components/PlaceholderPage";

export const metadata = buildPlaceholderMetadata(
  "Rankings",
  "Mejores marcas por categoría y distancia."
);

export default function RankingsPage() {
  return (
    <PlaceholderPage
      title="Rankings"
      description="Mejores marcas por categoría y distancia. Estamos preparando esta sección."
    />
  );
}
