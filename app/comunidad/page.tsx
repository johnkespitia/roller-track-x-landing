import PlaceholderPage, { buildPlaceholderMetadata } from "@/components/PlaceholderPage";

export const metadata = buildPlaceholderMetadata(
  "Comunidad",
  "El espacio donde deportistas, escuelas, entrenadores y fans del patinaje de velocidad se conectan."
);

export default function ComunidadPage() {
  return (
    <PlaceholderPage
      title="Comunidad"
      description="El espacio donde deportistas, escuelas, entrenadores y fans del patinaje de velocidad se conectan. Próximamente."
    />
  );
}
