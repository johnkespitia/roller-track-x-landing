"use client";

import AnimatedSection from "./AnimatedSection";

const events = [
  {
    city: "Cali",
    date: "15 Ago 2026",
    title: "Piloto RTX - 1ra Válida",
    category: "Velocidad",
    color: "#E63946",
  },
  {
    city: "Medellín",
    date: "12 Sep 2026",
    title: "Piloto RTX - 2da Válida",
    category: "Fondo",
    color: "#06D6A0",
  },
  {
    city: "Bogotá",
    date: "10 Oct 2026",
    title: "Piloto RTX - 3ra Válida",
    category: "Velocidad",
    color: "#9D4EDD",
  },
  {
    city: "Barranquilla",
    date: "14 Nov 2026",
    title: "Gran Final RTX",
    category: "Combinada",
    color: "#E63946",
  },
];

export default function EventsSection() {
  return (
    <section id="eventos" className="bg-dark py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="section-heading text-white mb-4">
            Próximos <span className="text-gradient-neon">eventos</span>
          </h2>
          <p className="section-subheading">
            El calendario del patinaje. Un solo lugar para encontrar todas las competencias.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {events.map((event, i) => (
            <AnimatedSection key={event.title} delay={i * 0.12}>
              <div className="glass-light rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 group">
                <div
                  className="h-32 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${event.color}20, ${event.color}05)`,
                  }}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='8' fill='none' stroke='white' stroke-width='1'/%3E%3Ccircle cx='20' cy='20' r='1.5' fill='white'/%3E%3C/svg%3E")`,
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-heading font-bold"
                    style={{ backgroundColor: `${event.color}20`, color: event.color }}
                  >
                    {event.date.split(" ")[0]}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-heading font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                      style={{
                        color: event.color,
                        backgroundColor: `${event.color}15`,
                      }}
                    >
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {event.city}
                    <span className="text-gray-600">·</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {event.date}
                  </div>
                  <button className="text-sm font-semibold text-neon-green hover:text-neon-green/80 transition-colors flex items-center gap-1 group/btn">
                    Ver evento
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="group-hover/btn:translate-x-0.5 transition-transform"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
