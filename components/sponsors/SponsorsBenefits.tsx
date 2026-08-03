"use client";

import AnimatedSection from "@/components/landing/AnimatedSection";

const visibilityFeatures = [
  "Audiencia deportiva real y local",
  "Presencia en eventos y streaming",
  "Activaciones durante competencias",
  "Contenido digital con tu marca",
  "Conexión con deportistas emergentes",
  "Campañas integradas al ecosistema",
];

const secondaryBenefits = [
  {
    title: "Integración en eventos",
    description:
      "Presencia en eventos piloto, streaming en vivo, menciones en contenido digital y activaciones durante competencias.",
    accent: "primary" as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Streaming y redes sociales",
    description:
      "Tu marca visible en transmisiones en vivo, highlights de eventos y contenido en redes con alto engagement local.",
    accent: "green" as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    title: "Reporte básico de impacto",
    description:
      "Métricas de vistas, menciones, leads generados y alcance para medir el retorno de tu inversión con claridad.",
    accent: "purple" as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Patrocinios directos",
    description:
      "Conecta con talentos y escuelas reales. Apoya trayectorias concretas y asocia tu marca a historias que importan.",
    accent: "primary" as const,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const accentStyles = {
  primary: {
    icon: "bg-primary/15 text-primary group-hover:bg-primary/25",
    line: "from-primary/80 to-primary/0",
    number: "text-primary/40",
  },
  green: {
    icon: "bg-neon-green/15 text-neon-green group-hover:bg-neon-green/25",
    line: "from-neon-green/80 to-neon-green/0",
    number: "text-neon-green/40",
  },
  purple: {
    icon: "bg-neon-purple/15 text-neon-purple group-hover:bg-neon-purple/25",
    line: "from-neon-purple/80 to-neon-purple/0",
    number: "text-neon-purple/40",
  },
};

export default function SponsorsBenefits() {
  return (
    <section id="beneficios" className="relative overflow-hidden bg-[#111111] py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] bg-primary/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-neon-purple/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-primary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Para sponsors
          </p>
          <h2 className="section-heading text-white mb-5">
            Beneficios de ser parte de{" "}
            <span className="text-gradient-primary">Roller Track X</span>
          </h2>
          <p className="section-subheading">
            Conecta tu marca con una comunidad deportiva real y mide el impacto
            de cada activación.
          </p>
        </AnimatedSection>

        <AnimatedSection className="mb-20">
          <div className="relative max-w-6xl mx-auto">
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/40 via-white/10 to-neon-purple/30 opacity-70" />
            <div className="relative rounded-3xl bg-[#161616] overflow-hidden">
              <div className="absolute inset-0 bg-speed-pattern opacity-60" />
              <div className="absolute -right-24 top-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
              <div className="absolute -left-16 bottom-0 w-64 h-64 bg-neon-purple/15 rounded-full blur-[90px]" />

              <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-14 p-8 md:p-12 lg:p-14">
                <div>
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-primary">
                      Beneficio principal
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-heading font-extrabold text-white mb-5 leading-tight">
                    Visibilidad dirigida para tu marca
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
                    Llega a deportistas, familias, entrenadores y fans del
                    patinaje con presencia integrada en eventos, contenido y
                    comunidad — no con publicidad genérica.
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                    {visibilityFeatures.map((item, i) => (
                      <AnimatedSection key={item} delay={0.1 + i * 0.05} direction="left">
                        <li className="flex items-start gap-2.5 text-sm text-gray-200">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neon-green/15 text-neon-green">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          {item}
                        </li>
                      </AnimatedSection>
                    ))}
                  </ul>
                </div>

                <div className="relative min-h-[280px] lg:min-h-full flex items-center">
                  <div className="w-full space-y-3">
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-neon-purple animate-pulse" />
                        <span className="text-sm text-white/80 font-medium">Impacto de marca</span>
                      </div>
                      <span className="text-xs text-gray-500 tracking-wide">PILOTO</span>
                    </div>

                    {[
                      { label: "Alcance en comunidad", value: "12.4k", bar: "w-[88%]", color: "bg-primary" },
                      { label: "Engagement en contenido", value: "6.8%", bar: "w-[68%]", color: "bg-neon-green" },
                      { label: "Menciones en eventos", value: "47", bar: "w-[52%]", color: "bg-neon-purple" },
                      { label: "Leads generados", value: "31", bar: "w-[41%]", color: "bg-primary" },
                    ].map((row, i) => (
                      <AnimatedSection key={row.label} delay={0.2 + i * 0.08}>
                        <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3.5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400">{row.label}</span>
                            <span className="text-sm font-heading font-bold text-white">{row.value}</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                            <div className={`h-full rounded-full ${row.color} ${row.bar}`} />
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-2">
          {secondaryBenefits.map((benefit, i) => {
            const styles = accentStyles[benefit.accent];
            return (
              <AnimatedSection key={benefit.title} delay={i * 0.1}>
                <div className="group relative py-8 border-t border-white/10">
                  <div
                    className={`absolute top-0 left-0 h-px w-24 bg-gradient-to-r ${styles.line} opacity-80 group-hover:w-40 transition-all duration-500`}
                  />
                  <div className="flex gap-5">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${styles.icon}`}
                    >
                      {benefit.icon}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className={`font-heading text-sm font-bold ${styles.number}`}>
                          0{i + 2}
                        </span>
                        <h3 className="text-xl font-heading font-bold text-white">
                          {benefit.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed text-[15px]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
