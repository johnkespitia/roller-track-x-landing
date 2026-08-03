"use client";

import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";

export default function SponsorsHero() {
  return (
    <section className="relative overflow-hidden bg-dark pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-dark to-dark" />
      <div className="absolute inset-0 bg-speed-pattern opacity-70" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-neon-purple/15 rounded-full blur-[120px]" />

      <div className="absolute inset-y-0 right-[12%] hidden lg:flex flex-col justify-center gap-3 opacity-20 pointer-events-none">
        {[40, 70, 55, 85, 45].map((w, i) => (
          <motion.div
            key={i}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
            className="h-px bg-gradient-to-r from-transparent via-white to-transparent origin-right"
            style={{ width: w * 2 }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-heading font-bold tracking-[0.2em] uppercase text-sm mb-5"
          >
            Roller Track X
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-[0.95] mb-6"
          >
            Para
            <br />
            <span className="text-gradient-primary">Sponsors</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed mb-10"
          >
            Asocia tu marca con deporte, disciplina y comunidad dentro del
            ecosistema del patinaje de velocidad.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <CTAButton href="#beneficios" variant="glow" size="lg" ctaType="sponsor">
              Ver beneficios
            </CTAButton>
            <CTAButton
              href="#formulario"
              variant="outline"
              size="lg"
              ctaType="sponsor"
              className="border-white/25 text-white hover:border-neon-green hover:text-neon-green hover:bg-transparent"
            >
              Quiero patrocinar
            </CTAButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
