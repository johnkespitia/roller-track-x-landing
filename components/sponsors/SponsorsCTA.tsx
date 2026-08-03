"use client";

import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";

export default function SponsorsCTA() {
  return (
    <section className="relative overflow-hidden bg-dark py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-dark to-primary/10" />
      <div className="absolute inset-0 bg-dot-pattern opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[160px]" />

      <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="section-heading text-white mb-5"
        >
          ¿Interesado en patrocinar?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="text-lg text-gray-400 mb-10 leading-relaxed"
        >
          Completa el formulario y nos pondremos en contacto para conversar
          sobre oportunidades de patrocinio y activaciones.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.24 }}
        >
          <CTAButton href="#formulario" variant="glow" size="lg" ctaType="sponsor">
            Llenar formulario
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
