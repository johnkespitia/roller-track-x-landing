import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAll, getTags } from "@/lib/content/reader";
import BlogList from "@/components/blog/BlogList";
import { contentUrl } from "@/lib/content/meta";

interface PageProps {
  params: { tag: string };
}

export async function generateStaticParams(): Promise<{ tag: string }[]> {
  const tags = await getTags("blog");
  return tags.map((t) => ({ tag: t.name }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Tag: #${params.tag} | Roller Track X`,
    description: `Artículos etiquetados con #${params.tag} en el blog de Roller Track X.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"}/blog/tag/${encodeURIComponent(params.tag)}`,
    },
  };
}

export default async function BlogTagPage({ params }: PageProps) {
  const all = await getAll("blog");
  const filtered = all.filter((a) => a.tags.includes(params.tag));
  if (filtered.length === 0) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-dark py-16">
          <div className="container mx-auto px-4 text-center">
            <p className="text-primary font-heading text-sm uppercase tracking-widest mb-2">
              Tag
            </p>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white">
              #{params.tag}
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
