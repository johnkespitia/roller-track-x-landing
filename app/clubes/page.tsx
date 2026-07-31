import PlaceholderPage, { buildPlaceholderMetadata } from "@/components/PlaceholderPage";

export const metadata = buildPlaceholderMetadata(
  "Clubes",
  "Comunidades de patinaje de velocidad en Colombia."
);

export default function ClubesPage() {
  return (
    <PlaceholderPage
      title="Clubes"
      description="Comunidades de patinaje de velocidad en Colombia. Estamos preparando esta sección."
    />
  );
}
