"use client";

import CTAButton from "./CTAButton";

export default function Hero() {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-dark via-dark to-primary/20">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6">
          El patinaje de velocidad entra a una nueva era.
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Eventos, comunidad y seguimiento deportivo para impulsar el talento.
          Empezamos con pilotos low-cost y registro gratuito.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <CTAButton
            href="#registro"
            variant="primary"
            size="lg"
            ctaType="primary"
          >
            Únete al piloto
          </CTAButton>
          <CTAButton
            href="/escuelas"
            variant="outline"
            size="lg"
            ctaType="school"
            className="border-white text-white hover:bg-white hover:text-dark"
          >
            Soy escuela/club
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
