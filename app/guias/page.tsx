import PlaceholderPage, { buildPlaceholderMetadata } from "@/components/PlaceholderPage";

export const metadata = buildPlaceholderMetadata(
  "Guías",
  "Tutoriales paso a paso para deportistas, entrenadores y familias."
);

export default function GuiasPage() {
  return (
    <PlaceholderPage
      title="Guías"
      description="Tutoriales paso a paso para deportistas, entrenadores y familias. Próximamente."
    />
  );
}
