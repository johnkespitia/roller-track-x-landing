import Link from "next/link";
import type { ContentEntry, ContentListItem } from "@/lib/content/types";
import { formatDate } from "@/lib/content/format";
import BlogCard from "@/components/blog/BlogCard";
import ArticleBody from "./ArticleBody";

const GENERIC_OG = "/images/og-image.png";

interface ArticleLayoutProps {
  entry: ContentEntry;
  backHref: string;
  backLabel: string;
  related: ContentListItem[];
  relatedTitle: string;
  relatedHref: (slug: string) => string;
  categoryHref?: string;
}

export default function ArticleLayout({
  entry,
  backHref,
  backLabel,
  related,
  relatedTitle,
  relatedHref,
  categoryHref,
}: ArticleLayoutProps) {
  const showImage = Boolean(entry.image && entry.image !== GENERIC_OG);

  return (
    <>
      <article className="container mx-auto px-4 py-14 max-w-3xl">
        <Link
          href={backHref}
          className="text-sm font-medium text-primary hover:underline mb-8 inline-block"
        >
          ← {backLabel}
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
            {categoryHref ? (
              <Link
                href={categoryHref}
                className="text-primary font-semibold hover:underline"
              >
                {entry.category}
              </Link>
            ) : (
              <span className="text-primary font-semibold">{entry.category}</span>
            )}
            <span aria-hidden>·</span>
            <time dateTime={entry.date}>{formatDate(entry.date, "long")}</time>
            <span aria-hidden>·</span>
            <span>{entry.readingTime}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-bold text-dark mb-5 leading-[1.15] text-balance">
            {entry.title}
          </h1>

          <p className="text-xl leading-relaxed text-gray-600 mb-8 text-balance">
            {entry.description}
          </p>

          <div className="flex items-center gap-3 pb-8 border-b border-gray-200">
            <div className="w-11 h-11 rounded-full bg-primary/15 flex items-center justify-center text-primary font-heading font-bold">
              {entry.author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-semibold text-dark">{entry.author}</div>
              {entry.authorRole && (
                <div className="text-xs text-gray-500">{entry.authorRole}</div>
              )}
            </div>
          </div>
        </header>

        {showImage && (
          <div className="mb-10 aspect-[16/9] overflow-hidden rounded-xl bg-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={entry.image}
              alt={entry.imageAlt ?? entry.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <ArticleBody source={entry.body} />

        {entry.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {entry.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-2xl font-heading font-bold text-dark mb-7">
              {relatedTitle}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <BlogCard key={r.slug} item={r} href={relatedHref(r.slug)} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
