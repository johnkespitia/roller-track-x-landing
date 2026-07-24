"use client";

import AnimatedSection from "./AnimatedSection";

const phases = [
  {
    phase: "Fase 1",
    title: "Fundación",
    period: "2024 — Presente",
    items: ["Eventos piloto", "Comunidad inicial", "Plataforma para escuelas"],
    active: true,
    color: "#E63946",
  },
  {
    phase: "Fase 2",
    title: "Tecnología",
    period: "Próximamente",
    items: ["IA para análisis de video", "Streaming de competencias", "Ranking nacional unificado"],
    active: false,
    color: "#06D6A0",
  },
  {
    phase: "Fase 3",
    title: "Ecosistema",
    period: "En desarrollo",
    items: ["Fantasy League", "Marketplace de patrocinios", "Liga oficial RTX"],
    active: false,
    color: "#9D4EDD",
  },
  {
    phase: "Fase 4",
    title: "Expansión",
    period: "Visión",
    items: ["Expansión Latinoamérica", "Eventos internacionales", "Comunidad global"],
    active: false,
    color: "#06D6A0",
  },
];

export default function GrowthRoadmap() {
  return (
    <section id="roadmap" className="bg-dark py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="section-heading text-white mb-4">
            Cómo <span className="text-gradient-neon">crecemos</span>
          </h2>
          <p className="section-subheading">
            Un camino claro para construir la comunidad más grande del patinaje en Latinoamérica.
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          {phases.map((phase, i) => (
            <AnimatedSection key={phase.phase} delay={i * 0.15}>
              <div className="flex gap-6 relative pb-12 last:pb-0">
                {i < phases.length - 1 && (
                  <div
                    className="absolute left-[19px] top-14 bottom-0 w-px"
                    style={{
                      background: `linear-gradient(to bottom, ${phase.color}, ${
                        phases[i + 1].color
                      })`,
                    }}
                  />
                )}

                <div className="relative shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all"
                    style={{
                      borderColor: phase.color,
                      backgroundColor: phase.active ? phase.color : "transparent",
                    }}
                  >
                    {phase.active && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {!phase.active && (
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: phase.color }} />
                    )}
                  </div>
                </div>

                <div className="flex-1 pb-4">
                  <div className="flex flex-wrap items-baseline gap-3 mb-2">
                    <span
                      className="text-xs font-heading font-bold tracking-wider uppercase px-3 py-1 rounded-full"
                      style={{
                        color: phase.color,
                        backgroundColor: `${phase.color}15`,
                      }}
                    >
                      {phase.phase}
                    </span>
                    <span className="text-sm text-gray-500">{phase.period}</span>
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-3">
                    {phase.title}
                  </h3>
                  <ul className="space-y-2">
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: phase.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
