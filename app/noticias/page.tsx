import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAll } from "@/lib/content/reader";
import BlogList from "@/components/blog/BlogList";
import { contentUrl } from "@/lib/content/meta";

export const metadata: Metadata = {
  title: "Noticias | Roller Track X",
  description:
    "Las últimas noticias del patinaje de velocidad en Colombia y el ecosistema Roller Track X.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"}/noticias`,
  },
  openGraph: {
    title: "Noticias | Roller Track X",
    description:
      "Las últimas noticias del patinaje de velocidad en Colombia y el ecosistema Roller Track X.",
  },
};

export default async function NoticiasPage() {
  const all = await getAll("news");

  const items = all.map((a) => ({
    ...a,
    href: contentUrl("news", a.slug),
  }));

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-dark py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary font-heading text-sm uppercase tracking-widest mb-3">
              Noticias
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Lo último del ecosistema
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Anuncios, convocatorias y novedades del patinaje de velocidad y
              de Roller Track X.
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
