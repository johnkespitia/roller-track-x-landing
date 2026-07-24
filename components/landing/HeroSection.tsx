"use client";

import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      <div className="absolute inset-0 bg-speed-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/60 to-dark" />

      <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-neon-purple/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float-delayed" />
      <div className="absolute top-[50%] right-[25%] w-48 h-48 bg-neon-green/10 rounded-full blur-[80px] animate-float" />

      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        <div
          className="absolute -inset-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L40 20 L30 30 L20 20 Z' fill='none' stroke='white' stroke-width='0.5'/%3E%3Ccircle cx='50' cy='50' r='3' fill='white'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
            transform: "rotate(15deg)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-neon-green font-heading text-sm md:text-base tracking-[0.3em] uppercase mb-6">
            Ecosistema Digital del Patinaje de Velocidad
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white mb-6 leading-[1.05] text-balance"
        >
          El futuro del patinaje<br />
          <span className="text-gradient-primary">comienza aquí.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto text-balance"
        >
          Una comunidad donde el deporte, la tecnología y los eventos
          trabajan juntos para impulsar el talento.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <CTAButton
            href="#registro"
            variant="glow"
            size="lg"
            ctaType="primary"
          >
            Unirme al piloto
          </CTAButton>
          <CTAButton
            href="/escuelas"
            variant="outline"
            size="lg"
            ctaType="school"
            className="border-white/20 text-white hover:border-neon-green hover:text-neon-green hover:glow-neon-green"
          >
            Soy escuela
          </CTAButton>
          <CTAButton
            href="#comunidad"
            variant="ghost"
            size="lg"
            className="text-gray-400 hover:text-white"
          >
            Explorar comunidad
          </CTAButton>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="animate-bounce"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.div>
    </section>
  );
}
