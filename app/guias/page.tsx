import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAll } from "@/lib/content/reader";
import BlogList from "@/components/blog/BlogList";
import { contentUrl } from "@/lib/content/meta";

export const metadata: Metadata = {
  title: "Guías | Roller Track X",
  description:
    "Tutoriales y guías prácticas para deportistas, entrenadores y familias del patinaje de velocidad.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"}/guias`,
  },
  openGraph: {
    title: "Guías | Roller Track X",
    description:
      "Tutoriales y guías prácticas para deportistas, entrenadores y familias del patinaje de velocidad.",
  },
};

export default async function GuiasPage() {
  const all = await getAll("guides");

  const items = all.map((a) => ({
    ...a,
    href: contentUrl("guides", a.slug),
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-dark py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary font-heading text-sm uppercase tracking-widest mb-3">
              Guías
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Aprende paso a paso
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Recursos prácticos para deportistas, familias y entrenadores del
              patinaje de velocidad.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <BlogList items={items} />
        </section>
      </main>
      <Footer />
    </>
  );
}
