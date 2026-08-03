import type { ReactNode } from "react";

type CalloutType = "tip" | "note" | "key";

const STYLES: Record<CalloutType, { label: string; className: string }> = {
  tip: {
    label: "Tip",
    className: "border-neon-green/50 bg-neon-green/5",
  },
  note: {
    label: "Nota",
    className: "border-primary/40 bg-primary/[0.04]",
  },
  key: {
    label: "Clave",
    className: "border-dark/20 bg-gray-50",
  },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}

export default function Callout({ type = "note", title, children }: CalloutProps) {
  const style = STYLES[type] ?? STYLES.note;

  return (
    <aside
      className={`not-prose my-8 rounded-r-lg border-l-4 px-5 py-4 ${style.className}`}
    >
      <p className="mb-2 text-xs font-heading font-bold uppercase tracking-wider text-dark/70">
        {title ?? style.label}
      </p>
      <div className="text-base leading-relaxed text-gray-700 [&_p]:m-0 [&_p+p]:mt-2">
        {children}
      </div>
    </aside>
  );
}
