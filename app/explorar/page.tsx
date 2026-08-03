import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAll } from "@/lib/content/reader";
import { EXPLORAR_LABELS, ROUTES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Explorar | Roller Track X",
  description:
    "El centro de navegación del ecosistema Roller Track X. Noticias, blog, guías, técnica, deportistas, clubes, entrenadores, rankings y resultados.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"}/explorar`,
  },
};

interface ExploreCard {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  accent: string;
}

const icons: Record<string, React.ReactNode> = {
  noticias: <NewsIcon />,
  blog: <BlogIcon />,
  guias: <GuideIcon />,
  tecnica: <TechIcon />,
  deportistas: <AthleteIcon />,
  clubes: <ClubIcon />,
  entrenadores: <CoachIcon />,
  rankings: <RankingIcon />,
  resultados: <ResultsIcon />,
};

const accents: Record<string, string> = {
  noticias: "#E63946",
  blog: "#9D4EDD",
  guias: "#06D6A0",
  tecnica: "#F59E0B",
  deportistas: "#3B82F6",
  clubes: "#10B981",
  entrenadores: "#8B5CF6",
  rankings: "#EF4444",
  resultados: "#06B6D4",
};

export default async function ExplorarPage() {
  const counts = await getAll("blog").then((b) => b.length);

  // Conteos por sección (clave = segmento de URL pública).
  const sectionCounts: Record<string, number> = {
    blog: counts,
    noticias: (await getAll("news")).length,
    guias: (await getAll("guides")).length,
    eventos: (await getAll("events")).length,
    clubes: (await getAll("clubs")).length,
    escuelas: (await getAll("schools")).length,
    deportistas: (await getAll("athletes")).length,
  };

  const cards: ExploreCard[] = EXPLORAR_LABELS.map((item) => {
    const key = item.href.replace(/^\//, "");
    return {
      href: item.href,
      title: item.label,
      description: item.description,
      icon: icons[key] ?? <BlogIcon />,
      count: sectionCounts[key] ?? 0,
      accent: accents[key] ?? "#E63946",
    };
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-dark">
        <section className="container mx-auto px-4 py-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-primary font-heading text-sm uppercase tracking-widest mb-3">
              Explorar
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Todo el ecosistema
            </h1>
            <p className="text-lg text-gray-300">
              Desde noticias y guías hasta perfiles de deportistas, clubes y
              rankings. Este es el centro de navegación del patinaje de
              velocidad.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {cards.map((c) => (
              <ExploreCard key={c.href} card={c} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ExploreCard({ card }: { card: ExploreCard }) {
  return (
    <Link
      href={card.href}
      className="group relative block p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/40 hover:bg-white/[0.07] transition-all overflow-hidden"
    >
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"
        style={{ background: card.accent }}
      />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${card.accent}25`, color: card.accent }}
      >
        {card.icon}
      </div>
      <h2 className="font-heading font-bold text-xl text-white mb-1 group-hover:text-primary transition-colors">
        {card.title}
      </h2>
      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{card.description}</p>
      <div className="text-xs text-gray-500">
        {card.count > 0 ? `${card.count} disponibles` : "Próximamente"} →
      </div>
    </Link>
  );
}

// --- Iconos SVG inline (sin dependencia de una librería) ---

function NewsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h6M7 12h10M7 16h10" />
    </svg>
  );
}
function BlogIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4V4z" />
      <path d="M4 4v12a4 4 0 004 4" />
    </svg>
  );
}
function GuideIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  );
}
function TechIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v9l6 3" />
    </svg>
  );
}
function AthleteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <circle cx="12" cy="7" r="4" />
      <path d="M5 21v-1a7 7 0 0114 0v1" />
    </svg>
  );
}
function ClubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function CoachIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <path d="M12 2l3 6 6 .9-4.5 4.4 1 6.3L12 16.8 6.5 19.6l1-6.3L3 8.9 9 8z" />
    </svg>
  );
}
function RankingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 4 4 5-5" />
    </svg>
  );
}
function ResultsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
      <path d="M6 9l6 6 6-6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
