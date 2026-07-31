import PlaceholderPage, { buildPlaceholderMetadata } from "@/components/PlaceholderPage";

export const metadata = buildPlaceholderMetadata(
  "Entrenadores",
  "Profesionales certificados del patinaje de velocidad."
);

export default function EntrenadoresPage() {
  return (
    <PlaceholderPage
      title="Entrenadores"
      description="Profesionales certificados del patinaje de velocidad. Estamos preparando esta sección."
    />
  );
}
