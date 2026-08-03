import Link from "next/link";
import SearchInput from "@/components/blog/SearchInput";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAll } from "@/lib/content/reader";
import { contentUrl } from "@/lib/content/meta";

export const metadata = {
  title: "Buscar | Roller Track X",
  description: "Busca artículos, guías y contenido en el portal.",
};

export default async function SearchPage() {
  const all = await getAll("blog");
  const items = all.map((a) => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    category: a.category,
    tags: a.tags,
    author: a.author,
    date: a.date,
    href: contentUrl("blog", a.slug),
  }));

  return (
    <>
      <Header tone="light" />
      <main className="min-h-screen bg-white">
        <section className="container mx-auto px-4 py-16 max-w-3xl">
          <h1 className="text-4xl font-heading font-bold text-dark mb-2">
            Buscar en el blog
          </h1>
          <p className="text-gray-600 mb-8">
            Escribe una palabra clave para encontrar artículos, guías y análisis.
          </p>
          <SearchInput items={items} />
        </section>
      </main>
      <Footer />
    </>
  );
}
