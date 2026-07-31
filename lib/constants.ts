// Constantes de la aplicación
export const BRAND = {
  name: "Roller Track X",
  tagline: "El ecosistema digital del patinaje de velocidad",
  shortName: "RTX",
  colors: {
    primary: "#E63946",
    dark: "#1C1C1C",
    white: "#FFFFFF",
    neonPurple: "#9D4EDD",
    neonGreen: "#06D6A0",
  },
} as const;

/**
 * Rutas del portal.
 * - Top-level: navegación principal
 * - explorarSub: sub-ítems del dropdown "Explorar"
 */
export const ROUTES = {
  home: "/",
  explorar: "/explorar",
  eventos: "/eventos",
  escuelas: "/escuelas",
  comunidad: "/comunidad",
  sponsors: "/sponsors",
  explorarSub: {
    noticias: "/noticias",
    blog: "/blog",
    guias: "/guias",
    tecnica: "/tecnica",
    deportistas: "/deportistas",
    clubes: "/clubes",
    entrenadores: "/entrenadores",
    rankings: "/rankings",
    resultados: "/resultados",
  },
  legal: "/legal",
  faq: "/faq",
  miPerfil: "/mi-perfil",
} as const;

export const EXPLORAR_LABELS: { href: string; label: string; description: string }[] = [
  {
    href: ROUTES.explorarSub.noticias,
    label: "Noticias",
    description: "Lo último del patinaje de velocidad",
  },
  {
    href: ROUTES.explorarSub.blog,
    label: "Blog",
    description: "Artículos, análisis y opinión",
  },
  {
    href: ROUTES.explorarSub.guias,
    label: "Guías",
    description: "Tutoriales paso a paso",
  },
  {
    href: ROUTES.explorarSub.tecnica,
    label: "Técnica",
    description: "Skating, equipo, biomecánica",
  },
  {
    href: ROUTES.explorarSub.deportistas,
    label: "Deportistas",
    description: "Perfiles y trayectorias",
  },
  {
    href: ROUTES.explorarSub.clubes,
    label: "Clubes",
    description: "Comunidades de patinaje",
  },
  {
    href: ROUTES.explorarSub.entrenadores,
    label: "Entrenadores",
    description: "Profesionales certificados",
  },
  {
    href: ROUTES.explorarSub.rankings,
    label: "Rankings",
    description: "Mejores marcas por categoría",
  },
  {
    href: ROUTES.explorarSub.resultados,
    label: "Resultados",
    description: "Resultados de competencias",
  },
];
