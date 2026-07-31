import PlaceholderPage, { buildPlaceholderMetadata } from "@/components/PlaceholderPage";

export const metadata = buildPlaceholderMetadata(
  "Eventos",
  "Calendario de competencias, válidas y eventos piloto del ecosistema Roller Track X."
);

export default function EventosPage() {
  return (
    <PlaceholderPage
      title="Eventos"
      description="Calendario de competencias, válidas y eventos piloto del ecosistema Roller Track X. Estamos preparando el primer calendario oficial."
    />
  );
}
