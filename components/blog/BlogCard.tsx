import Link from "next/link";
import Image from "next/image";
import type { ContentListItem } from "@/lib/content/types";
import { formatDate } from "@/lib/content/format";

interface BlogCardProps {
  item: ContentListItem;
  href: string;
}

export default function BlogCard({ item, href }: BlogCardProps) {
  return (
    <article className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={href} className="block">
        {item.image ? (
          <div className="aspect-[1200/630] bg-gray-100 relative overflow-hidden">
            <Image
              src={item.image}
              alt={item.imageAlt ?? item.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
          </div>
        ) : (
          <div className="aspect-[1200/630] bg-gradient-to-br from-primary/20 to-neon-purple/20" />
        )}
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
          <span className="text-primary font-medium">{item.category}</span>
          <span>·</span>
          <time dateTime={item.date}>{formatDate(item.date, "short")}</time>
        </div>

        <h3 className="font-heading font-bold text-lg text-dark mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          <Link href={href}>{item.title}</Link>
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
          <span>{item.author}</span>
          <span>{item.readingTime}</span>
        </div>
      </div>
    </article>
  );
}
