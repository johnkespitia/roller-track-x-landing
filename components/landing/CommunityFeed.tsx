"use client";

import AnimatedSection from "./AnimatedSection";

const posts = [
  {
    type: "logro",
    user: "María G.",
    content: "¡Nuevo récord personal en 300m! 27.4s en la pista de Cali.",
    time: "2h",
    bg: "from-primary/20 to-primary/5",
    accent: "#E63946",
  },
  {
    type: "foto",
    user: "Club Velocidad",
    content: "Equipo completo listo para el campeonato departamental.",
    time: "5h",
    bg: "from-neon-green/20 to-neon-green/5",
    accent: "#06D6A0",
    image: true,
  },
  {
    type: "competencia",
    user: "Liga Valle",
    content: "Resultados oficiales de la 3ra válida departamental. ¡Felicitaciones a todos!",
    time: "8h",
    bg: "from-neon-purple/20 to-neon-purple/5",
    accent: "#9D4EDD",
  },
  {
    type: "video",
    user: "Carlos R.",
    content: "Técnica de arranque. Compartiendo lo aprendido con mi entrenador.",
    time: "12h",
    bg: "from-primary/20 to-dark/50",
    accent: "#E63946",
    image: true,
  },
  {
    type: "logro",
    user: "Escuela Elite",
    content: "3 medallas de oro en el nacional. ¡Este equipo no se detiene!",
    time: "1d",
    bg: "from-neon-green/20 to-neon-green/5",
    accent: "#06D6A0",
  },
  {
    type: "evento",
    user: "RTX Oficial",
    content: "Se acerca el primer piloto RTX. Inscripciones abiertas.",
    time: "2d",
    bg: "from-neon-purple/20 to-neon-purple/5",
    accent: "#9D4EDD",
  },
];

const typeIcons: Record<string, JSX.Element> = {
  logro: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  foto: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  competencia: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  ),
  video: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  evento: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
};

export default function CommunityFeed() {
  return (
    <section id="comunidad" className="bg-[#151515] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="section-heading text-white mb-4">
            La <span className="text-gradient-primary">comunidad</span> en acción
          </h2>
          <p className="section-subheading">
            Así se vive el patinaje dentro del ecosistema RTX. Comparte, conecta y crece.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {posts.map((post, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div
                className={`rounded-2xl bg-gradient-to-br ${post.bg} border border-white/5 p-5 hover:border-white/10 transition-all duration-300 group`}
              >
                {post.image && (
                  <div className="rounded-xl bg-dark/50 h-32 mb-4 flex items-center justify-center border border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" opacity="0.3">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-heading font-bold"
                    style={{ backgroundColor: `${post.accent}30`, color: post.accent }}
                  >
                    {post.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{post.user}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-white/80" style={{ color: post.accent }}>
                        {typeIcons[post.type]}
                      </span>
                      <span className="text-xs text-gray-500">{post.time}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed">{post.content}</p>

                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5">
                  <span className="text-xs text-gray-500 flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1 hover:text-neon-green transition-colors cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1 hover:text-neon-purple transition-colors cursor-pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
