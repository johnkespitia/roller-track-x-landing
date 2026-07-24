"use client";

import AnimatedSection from "./AnimatedSection";

const capabilities = [
  {
    title: "Comunidad",
    color: "primary",
    items: [
      "Comparte tus logros",
      "Sigue a otros deportistas",
      "Conecta con entrenadores",
      "Publica contenido",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Eventos",
    color: "neon-green",
    items: [
      "Inscríbete a competencias",
      "Resultados en vivo",
      "Streaming en vivo",
      "Calendario unificado",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "IA",
    color: "neon-purple",
    items: [
      "Análisis de video",
      "Corrección técnica",
      "Seguimiento de progreso",
      "Métricas avanzadas",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Escuelas",
    color: "primary",
    items: [
      "Administración simple",
      "Comunicación con padres",
      "Evaluaciones deportivas",
      "Control de asistencia",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  {
    title: "Ranking",
    color: "neon-green",
    items: [
      "Resultados consolidados",
      "Historial deportivo",
      "Medallas y logros",
      "Progreso en el tiempo",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: "Sponsors",
    color: "neon-purple",
    items: [
      "Visibilidad dirigida",
      "Patrocinios directos",
      "Conexión con marcas",
      "Campañas integradas",
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
];

const colorMap: Record<string, string> = {
  primary: "border-primary/20 hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(230,57,70,0.15)]",
  "neon-green": "border-neon-green/20 hover:border-neon-green/50 group-hover:shadow-[0_0_30px_rgba(6,214,160,0.15)]",
  "neon-purple": "border-neon-purple/20 hover:border-neon-purple/50 group-hover:shadow-[0_0_30px_rgba(157,78,221,0.15)]",
};

const bgColorMap: Record<string, string> = {
  primary: "bg-primary/10 text-primary group-hover:bg-primary/20",
  "neon-green": "bg-neon-green/10 text-neon-green group-hover:bg-neon-green/20",
  "neon-purple": "bg-neon-purple/10 text-neon-purple group-hover:bg-neon-purple/20",
};

export default function CapabilitiesSection() {
  return (
    <section id="capacidades" className="bg-[#151515] py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="section-heading text-white mb-4">
            Qué puedes <span className="text-gradient-primary">hacer</span>
          </h2>
          <p className="section-subheading">
            Todo lo que necesitas para vivir el patinaje está aquí.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {capabilities.map((cap, i) => (
            <AnimatedSection key={cap.title} delay={i * 0.1}>
              <div
                className={`bg-dark/50 backdrop-blur-sm border rounded-2xl p-8 h-full transition-all duration-500 group ${colorMap[cap.color]}`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors ${bgColorMap[cap.color]}`}
                >
                  {cap.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-4">
                  {cap.title}
                </h3>
                <ul className="space-y-3">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mt-0.5 shrink-0 text-neon-green"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
