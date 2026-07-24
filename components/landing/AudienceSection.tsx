"use client";

import AnimatedSection from "./AnimatedSection";

const audiences = [
  {
    title: "Deportistas",
    description: "Muestra tu progreso, compite, consigue patrocinadores y sé descubierto por clubes.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Escuelas",
    description: "Administra, comunica, evalúa y haz visible a tus deportistas en un solo lugar.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    title: "Entrenadores",
    description: "Sigue a tus deportistas, analiza su rendimiento y conecta con otros profesionales.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    title: "Familias",
    description: "Acompaña el crecimiento deportivo de tus hijos con métricas claras y seguimiento real.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    title: "Patrocinadores",
    description: "Conecta con deportistas reales, mide tu impacto y apoya al talento emergente.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Organizadores",
    description: "Crea eventos, gestiona inscripciones, publica resultados y transmite en vivo.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Fans",
    description: "Sigue a tus deportistas favoritos, participa en Fantasy y vive el patinaje como nunca.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
];

export default function AudienceSection() {
  return (
    <section id="audiencia" className="bg-[#151515] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="section-heading text-white mb-4">
            Para <span className="text-gradient-primary">todos</span>
          </h2>
          <p className="section-subheading">
            El patinaje de velocidad es un deporte colectivo. Todos tienen un lugar en el ecosistema.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {audiences.map((audience, i) => (
            <AnimatedSection key={audience.title} delay={i * 0.08}>
              <div className="glass-light rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 group h-full">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  {audience.icon}
                </div>
                <h3 className="text-base font-heading font-bold text-white mb-2">
                  {audience.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {audience.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Y esto es solo el comienzo. El ecosistema crece cada día.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
