import { notFound } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleLayout from "@/components/content/ArticleLayout";
import { getAll, getBySlug, getRelated } from "@/lib/content/reader";
import { articleJsonLd, buildArticleMetadata, contentUrl } from "@/lib/content/meta";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const all = await getAll("blog");
  return all.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const entry = await getBySlug("blog", params.slug);
  if (!entry) return { title: "No encontrado" };
  return buildArticleMetadata("blog", entry);
}

export default async function BlogPostPage({ params }: PageProps) {
  const entry = await getBySlug("blog", params.slug);
  if (!entry) notFound();

  const related = await getRelated("blog", params.slug, 3);

  return (
    <>
      <Header tone="light" />
      <main className="min-h-screen bg-white">
        <ArticleLayout
          entry={entry}
          backHref="/blog"
          backLabel="Volver al blog"
          related={related}
          relatedTitle="Artículos relacionados"
          relatedHref={(slug) => contentUrl("blog", slug)}
          categoryHref={`/blog?category=${encodeURIComponent(entry.category)}`}
        />
      </main>
      <Footer />
      <Script
        id={`jsonld-article-${entry.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd("blog", entry)),
        }}
      />
    </>
  );
}
