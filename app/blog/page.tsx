import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAll, getCategories, getTags } from "@/lib/content/reader";
import BlogList from "@/components/blog/BlogList";
import { contentUrl } from "@/lib/content/meta";

export const metadata: Metadata = {
  title: "Blog | Roller Track X",
  description:
    "Artículos, guías, análisis y opinión sobre el patinaje de velocidad.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"}/blog`,
  },
  openGraph: {
    title: "Blog | Roller Track X",
    description:
      "Artículos, guías, análisis y opinión sobre el patinaje de velocidad.",
  },
};

export default async function BlogPage() {
  const all = await getAll("blog");
  const categories = await getCategories("blog");
  const tags = await getTags("blog");

  const items = all.map((a) => ({
    ...a,
    href: contentUrl("blog", a.slug),
  }));

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-dark py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary font-heading text-sm uppercase tracking-widest mb-3">
              Blog
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Artículos, guías y análisis
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Todo lo que escribimos sobre patinaje de velocidad, técnica,
              equipamiento y comunidad.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-[1fr_280px] gap-10">
            <div>
              <BlogList items={items} />
            </div>

            <aside className="space-y-8">
              <div>
                <h2 className="font-heading font-bold text-dark mb-3">Buscar</h2>
                <Link
                  href="/blog/buscar"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:border-primary hover:text-primary text-center"
                >
                  Buscar en el blog →
                </Link>
              </div>

              {categories.length > 0 && (
                <div>
                  <h2 className="font-heading font-bold text-dark mb-3">Categorías</h2>
                  <ul className="space-y-1">
                    {categories.map((c) => (
                      <li key={c.name}>
                        <Link
                          href={`/blog/categoria/${encodeURIComponent(c.name)}`}
                          className="text-sm text-gray-700 hover:text-primary flex justify-between"
                        >
                          <span>{c.name}</span>
                          <span className="text-gray-400">{c.count}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tags.length > 0 && (
                <div>
                  <h2 className="font-heading font-bold text-dark mb-3">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 15).map((t) => (
                      <Link
                        key={t.name}
                        href={`/blog/tag/${encodeURIComponent(t.name)}`}
                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-primary/10 text-gray-700 hover:text-primary rounded"
                      >
                        #{t.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-xs text-gray-400 pt-4 border-t">
                <p>
                  <a href={`${baseUrl}/feed.xml`} className="hover:text-primary">
                    Suscribirse al RSS →
                  </a>
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
