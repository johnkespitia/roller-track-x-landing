import { getAll } from "@/lib/content/reader";
import { contentUrl } from "@/lib/content/meta";

export const dynamic = "force-static";

function escape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET(): Promise<Response> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com";
  const all = await getAll("blog");
  const items = all.slice(0, 20);

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>Roller Track X — Blog</title>
<link>${baseUrl}/blog</link>
<description>Artículos, guías y análisis sobre el patinaje de velocidad.</description>
<language>es-CO</language>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items
  .map(
    (it) => `<item>
<title>${escape(it.title)}</title>
<link>${baseUrl}${contentUrl("blog", it.slug)}</link>
<guid isPermaLink="true">${baseUrl}${contentUrl("blog", it.slug)}</guid>
<description>${escape(it.description)}</description>
<category>${escape(it.category)}</category>
<author>noreply@${escape(baseUrl.replace(/^https?:\/\//, ""))} (${escape(it.author)})</author>
<pubDate>${new Date(it.date).toUTCString()}</pubDate>
</item>`
  )
  .join("\n")}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
