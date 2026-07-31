import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAll, getCategories } from "@/lib/content/reader";
import BlogList from "@/components/blog/BlogList";
import { contentUrl } from "@/lib/content/meta";
import { buildArticleMetadata } from "@/lib/content/meta";
import { getBySlug } from "@/lib/content/reader";

interface PageProps {
  params: { category: string };
}

export async function generateStaticParams(): Promise<{ category: string }[]> {
  const cats = await getCategories("blog");
  return cats.map((c) => ({ category: c.name }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Categoría: ${params.category} | Roller Track X`,
    description: `Artículos de la categoría ${params.category} en el blog de Roller Track X.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"}/blog/categoria/${encodeURIComponent(params.category)}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const all = await getAll("blog");
  const filtered = all.filter((a) => a.category === params.category);
  if (filtered.length === 0) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-dark py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary font-heading text-sm uppercase tracking-widest mb-2">
              Categoría
            </p>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white">
              {params.category}
            </h1>
            <p className="text-gray-300 mt-2">{filtered.length} artículo{filtered.length !== 1 ? "s" : ""}</p>
          </div>
        </section>
        <section className="container mx-auto px-4 py-12">
          <BlogList
            items={filtered.map((a) => ({
              ...a,
              href: contentUrl("blog", a.slug),
            }))}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
