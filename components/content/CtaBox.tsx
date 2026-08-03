import Link from "next/link";
import type { ReactNode } from "react";

interface CtaBoxProps {
  children: ReactNode;
  href?: string;
  label?: string;
  href2?: string;
  label2?: string;
  href3?: string;
  label3?: string;
}

export default function CtaBox({
  children,
  href,
  label,
  href2,
  label2,
  href3,
  label3,
}: CtaBoxProps) {
  const links = [
    href && label ? { href, label } : null,
    href2 && label2 ? { href: href2, label: label2 } : null,
    href3 && label3 ? { href: href3, label: label3 } : null,
  ].filter((x): x is { href: string; label: string } => x !== null);

  return (
    <aside className="not-prose my-10 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white px-6 py-7">
      <div className="text-lg font-heading font-bold text-dark leading-snug mb-4">
        {children}
      </div>
      {links.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                i === 0
                  ? "inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                  : "inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-dark hover:border-primary hover:text-primary transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </aside>
  );
}
