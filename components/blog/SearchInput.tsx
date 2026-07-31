"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/content/format";

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  href: string;
}

export default function SearchInput({ items }: { items: SearchItem[] }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    return items
      .filter((it) => {
        const hay = `${it.title} ${it.description} ${it.category} ${it.tags.join(" ")} ${it.author}`.toLowerCase();
        return hay.includes(query);
      })
      .slice(0, 30);
  }, [q, items]);

  return (
    <div>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar…"
        className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-lg"
        autoFocus
      />

      <div className="mt-6 space-y-4">
        {q.length >= 2 && results.length === 0 && (
          <p className="text-gray-500 text-sm">No se encontraron resultados.</p>
        )}
        {results.map((r) => (
          <Link
            key={r.slug}
            href={r.href}
            className="block p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <div className="text-xs text-gray-500 mb-1 flex gap-2">
              <span className="text-primary font-medium">{r.category}</span>
              <span>·</span>
              <span>{formatDate(r.date, "short")}</span>
            </div>
            <h2 className="font-heading font-bold text-dark mb-1">{r.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{r.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
