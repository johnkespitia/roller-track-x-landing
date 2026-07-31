import PlaceholderPage, { buildPlaceholderMetadata } from "@/components/PlaceholderPage";

export const metadata = buildPlaceholderMetadata(
  "Noticias",
  "Las últimas noticias del patinaje de velocidad en Colombia y el mundo."
);

export default function NoticiasPage() {
  return (
    <PlaceholderPage
      title="Noticias"
      description="Las últimas noticias del patinaje de velocidad en Colombia y el mundo. Estamos preparando esta sección."
    />
  );
}
