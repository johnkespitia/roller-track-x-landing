import { notFound } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAll, getBySlug, getRelated } from "@/lib/content/reader";
import { articleJsonLd, buildArticleMetadata, contentUrl } from "@/lib/content/meta";
import { formatDate } from "@/lib/content/format";
import BlogCard from "@/components/blog/BlogCard";

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
      <Header />
      <main className="min-h-screen bg-white">
        <article className="container mx-auto px-4 py-12 max-w-3xl">
          <Link
            href="/guias"
            className="text-sm text-primary hover:underline mb-6 inline-block"
          >
            ← Volver a guías
          </Link>

          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
              <span className="text-primary font-medium">{entry.category}</span>
              <span>·</span>
              <time dateTime={entry.date}>{formatDate(entry.date, "long")}</time>
              <span>·</span>
              <span>{entry.readingTime}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-dark mb-4 leading-tight">
              {entry.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">{entry.description}</p>
            <div className="flex items-center gap-3 pb-6 border-b">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {entry.author.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-medium text-dark">{entry.author}</div>
                {entry.authorRole && (
                  <div className="text-xs text-gray-500">{entry.authorRole}</div>
                )}
              </div>
            </div>
          </header>

          {entry.image && (
            <div className="mb-8 aspect-[1200/630] overflow-hidden rounded-xl bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={entry.image}
                alt={entry.imageAlt ?? entry.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <MDXRemote
              source={entry.body}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                  ],
                },
              }}
            />
          </div>

          {entry.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {related.length > 0 && (
          <section className="bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-2xl font-heading font-bold text-dark mb-6">
                Guías relacionadas
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((r) => (
                  <BlogCard
                    key={r.slug}
                    item={r}
                    href={contentUrl("guides", r.slug)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
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
