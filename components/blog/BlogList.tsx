"use client";

import { useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import type { ContentListItem } from "@/lib/content/types";

interface ItemWithHref extends ContentListItem {
  href: string;
}

export default function BlogList({ items }: { items: ItemWithHref[] }) {
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [filterTag, setFilterTag] = useState<string>("");

  const visible = useMemo(() => {
    return items.filter((it) => {
      if (filterCategory && it.category !== filterCategory) return false;
      if (filterTag && !it.tags.includes(filterTag)) return false;
      return true;
    });
  }, [items, filterCategory, filterTag]);

  const allCategories = useMemo(
    () => Array.from(new Set(items.map((i) => i.category))).sort(),
    [items]
  );
  const allTags = useMemo(
    () => Array.from(new Set(items.flatMap((i) => i.tags))).sort(),
    [items]
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        >
          <option value="">Todas las categorías</option>
          {allCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos los tags</option>
          {allTags.map((t) => (
            <option key={t} value={t}>#{t}</option>
          ))}
        </select>
        {(filterCategory || filterTag) && (
          <button
            onClick={() => {
              setFilterCategory("");
              setFilterTag("");
            }}
            className="text-xs text-gray-500 hover:text-primary underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No hay artículos que coincidan con el filtro.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item) => (
            <BlogCard key={item.slug} item={item} href={item.href} />
          ))}
        </div>
      )}
    </>
  );
}
