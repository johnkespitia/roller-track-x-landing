"use client";

import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";

export default function CTASection() {
  return (
    <section id="registro" className="bg-dark py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark to-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[180px]" />
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-heading text-white mb-4"
        >
          Únete a construir el futuro del patinaje
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl mx-auto"
        >
          Sé parte del ecosistema que está transformando el patinaje de velocidad en Latinoamérica.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <CTAButton
            href="/mi-perfil"
            variant="glow"
            size="lg"
            ctaType="athlete"
          >
            Quiero participar
          </CTAButton>
          <CTAButton
            href="/escuelas"
            variant="outline"
            size="lg"
            ctaType="school"
            className="border-white/20 text-white hover:border-neon-green hover:text-neon-green hover:glow-neon-green"
          >
            Quiero ser escuela
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
