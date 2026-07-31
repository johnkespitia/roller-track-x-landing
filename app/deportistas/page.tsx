import PlaceholderPage, { buildPlaceholderMetadata } from "@/components/PlaceholderPage";

export const metadata = buildPlaceholderMetadata(
  "Deportistas",
  "Perfiles y trayectorias de los deportistas de patinaje de velocidad."
);

export default function DeportistasPage() {
  return (
    <PlaceholderPage
      title="Deportistas"
      description="Perfiles y trayectorias de los deportistas de patinaje de velocidad. Estamos preparando esta sección."
    />
  );
}
