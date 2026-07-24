"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const nodes = [
  { label: "Comunidad", angle: 0, color: "#E63946" },
  { label: "Eventos", angle: 32.7, color: "#06D6A0" },
  { label: "IA", angle: 65.5, color: "#9D4EDD" },
  { label: "Escuelas", angle: 98.2, color: "#E63946" },
  { label: "Ranking", angle: 130.9, color: "#06D6A0" },
  { label: "Streaming", angle: 163.6, color: "#9D4EDD" },
  { label: "Sponsors", angle: 196.4, color: "#E63946" },
  { label: "Fantasy", angle: 229.1, color: "#06D6A0" },
  { label: "Liga", angle: 261.8, color: "#9D4EDD" },
  { label: "Marketplace", angle: 294.5, color: "#E63946" },
  { label: "Contenido", angle: 327.3, color: "#06D6A0" },
];

export default function VisionEcosystem() {
  const cx = 320;
  const cy = 320;
  const orbitRadius = 175;
  const nodeRadius = 60;

  return (
    <section id="ecosistema" className="bg-dark py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="section-heading text-white mb-4">
            Nuestra <span className="text-gradient-neon">visión</span>
          </h2>
          <p className="section-subheading">
            Un ecosistema donde cada actor del patinaje de velocidad está conectado.
          </p>
        </AnimatedSection>

        <div className="flex justify-center">
          <motion.svg
            viewBox="0 0 640 640"
            className="w-full max-w-[640px] h-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {nodes.map((node) => {
              const rad = (node.angle * Math.PI) / 180;
              const nx = cx + orbitRadius * Math.cos(rad);
              const ny = cy + orbitRadius * Math.sin(rad);

              return (
                <g key={node.label}>
                  <motion.line
                    x1={cx}
                    y1={cy}
                    x2={nx}
                    y2={ny}
                    stroke={node.color}
                    strokeOpacity={0.2}
                    strokeWidth={1}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    strokeDasharray="4 4"
                  />
                  <motion.circle
                    cx={nx}
                    cy={ny}
                    r={28}
                    fill={node.color}
                    fillOpacity={0.1}
                    stroke={node.color}
                    strokeOpacity={0.4}
                    strokeWidth={1}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <animate
                      attributeName="fillOpacity"
                      values="0.1;0.2;0.1"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </motion.circle>
                  <motion.text
                    x={nx}
                    y={ny + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="9"
                    fontFamily="Montserrat, sans-serif"
                    fontWeight="600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 }}
                  >
                    {node.label}
                  </motion.text>
                </g>
              );
            })}

            <motion.circle
              cx={cx}
              cy={cy}
              r={52}
              fill="#1C1C1C"
              stroke="#E63946"
              strokeWidth={2}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
              className="drop-shadow-[0_0_30px_rgba(230,57,70,0.4)]"
            />
            <motion.text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize="12"
              fontFamily="Montserrat, sans-serif"
              fontWeight="800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              ROLLER
            </motion.text>
            <motion.text
              x={cx}
              y={cy + 11}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#E63946"
              fontSize="12"
              fontFamily="Montserrat, sans-serif"
              fontWeight="800"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              TRACK X
            </motion.text>

            <motion.circle
              cx={cx}
              cy={cy}
              r={orbitRadius}
              fill="none"
              stroke="white"
              strokeOpacity={0.03}
              strokeWidth={1}
              strokeDasharray="6 6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            />
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
