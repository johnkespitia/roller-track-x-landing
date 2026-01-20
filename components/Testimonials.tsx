"use client";

import Section from "./Section";

// Placeholder testimonios - se pueden reemplazar con datos reales más adelante
const testimonials = [
  {
    name: "Escuela de Patinaje Elite",
    role: "Director",
    text: "RTX nos ha ayudado a visibilizar el talento de nuestros deportistas. El seguimiento manual es simple y efectivo.",
    location: "Bogotá",
  },
  {
    name: "María González",
    role: "Deportista",
    text: "Me encanta poder ver mi progreso en un solo lugar. La comunidad RTX es muy motivadora.",
    location: "Medellín",
  },
  {
    name: "Club Velocidad Plus",
    role: "Entrenador",
    text: "Los eventos piloto son una excelente oportunidad para nuestros deportistas. Muy bien organizados.",
    location: "Cali",
  },
];

export default function Testimonials() {
  return (
    <Section id="testimonios" background="white" padding="lg">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12">
          Lo que dicen nuestros participantes
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg border-l-4 border-primary"
            >
              <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="border-t border-gray-200 pt-4">
                <p className="font-heading font-bold text-dark">
                  {testimonial.name}
                </p>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">
          * Testimonios de participantes del piloto RTX
        </p>
      </div>
    </Section>
  );
}
