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
  const all = await getAll("guides");
  return all.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const entry = await getBySlug("guides", params.slug);
  if (!entry) return { title: "No encontrado" };
  return buildArticleMetadata("guides", entry);
}

export default async function GuiaPage({ params }: PageProps) {
  const entry = await getBySlug("guides", params.slug);
  if (!entry) notFound();

  const related = await getRelated("guides", params.slug, 3);

  return (
    <>
      <Header tone="light" />
      <main className="min-h-screen bg-white">
        <ArticleLayout
          entry={entry}
          backHref="/guias"
          backLabel="Volver a guías"
          related={related}
          relatedTitle="Guías relacionadas"
          relatedHref={(slug) => contentUrl("guides", slug)}
        />
      </main>
      <Footer />
      <Script
        id={`jsonld-article-${entry.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd("guides", entry)),
        }}
      />
    </>
  );
}
