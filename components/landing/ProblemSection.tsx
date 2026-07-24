"use client";

import AnimatedSection from "./AnimatedSection";

const problems = [
  {
    title: "Poca visibilidad",
    description:
      "El talento existe, pero no tiene dónde brillar. Los deportistas entrenan sin que nadie los vea.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Pocos patrocinadores",
    description:
      "Las marcas no encuentran a los deportistas. No hay datos, no hay exposición, no hay conexión.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Tecnología ausente",
    description:
      "El patinaje merece las mismas herramientas que los grandes deportes: métricas, video, datos.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Competencias aisladas",
    description:
      "Cada evento es una isla. Sin conexión entre competencias, los resultados se pierden.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
      </svg>
    ),
  },
  {
    title: "Comunidad fragmentada",
    description:
      "Deportistas, entrenadores, escuelas y fans están desconectados. No hay un punto de encuentro.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function ProblemSection() {
  return (
    <section id="problema" className="bg-dark py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="section-heading text-white mb-4">
            El talento existe.
            <br />
            <span className="text-primary">Las oportunidades no.</span>
          </h2>
          <p className="section-subheading">
            El patinaje de velocidad está lleno de potencial sin explotar.
            Estos son los problemas que venimos a resolver.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {problems.map((problem, i) => (
            <AnimatedSection key={problem.title} delay={i * 0.1}>
              <div className="glass-light rounded-2xl p-6 h-full border border-white/5 hover:border-primary/30 transition-all duration-500 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  {problem.icon}
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-3">
                  {problem.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
