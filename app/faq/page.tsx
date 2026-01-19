import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Roller Track X",
  description:
    "Preguntas frecuentes sobre el piloto, seguimiento manual, legalidad y cómo participar en Roller Track X.",
  openGraph: {
    title: "Preguntas Frecuentes | Roller Track X",
    description:
      "Preguntas frecuentes sobre el piloto, seguimiento manual, legalidad y cómo participar en Roller Track X.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"}/faq`,
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Roller Track X - Preguntas Frecuentes",
      },
    ],
  },
};

const faqs = [
  {
    question: "¿Qué es Roller Track X?",
    answer:
      "RTX es una plataforma de eventos, comunidad y seguimiento deportivo para el patinaje de velocidad. Empezamos con pilotos low-cost y registro gratuito para construir visibilidad y comunidad.",
  },
  {
    question: "¿Es un ranking oficial?",
    answer:
      "No. RTX complementa el sistema oficial pero no lo reemplaza. Nuestro ranking es independiente e informativo, basado en resultados reportados manualmente. No reemplazamos federaciones ni ligas oficiales.",
  },
  {
    question: "¿Cómo funciona el seguimiento?",
    answer:
      "El seguimiento es manual y gratuito. Tú o tu entrenador registran tus tiempos, pruebas, competencias y videos. RTX usa esta información para organizar pilotos, contenidos y eventos.",
  },
  {
    question: "¿Hay costo para participar?",
    answer:
      "El registro y seguimiento básico son gratuitos. Los eventos piloto tienen un costo bajo (low-cost) para cubrir streaming y organización. Los precios se comunican con anticipación.",
  },
  {
    question: "¿Qué datos se recopilan?",
    answer:
      "Recopilamos datos básicos de contacto (nombre, ciudad, WhatsApp/email), información deportiva (tiempos, pruebas, videos) y preferencias de participación. Todo con tu consentimiento explícito según la Ley 1581/2012.",
  },
  {
    question: "¿Puedo eliminar mis datos?",
    answer:
      "Sí. Tienes derecho a solicitar la eliminación de tus datos en cualquier momento. Contacta a través del formulario en la página de Legal o por email.",
  },
  {
    question: "¿Cómo participo en eventos piloto?",
    answer:
      "Regístrate como deportista o escuela, comparte tus datos y videos, y te contactaremos cuando tengamos eventos piloto disponibles en tu región.",
  },
  {
    question: "¿RTX usa inteligencia artificial?",
    answer:
      "En el MVP, todo es manual. No prometemos IA avanzada ni automatización compleja. El seguimiento lo haces tú o tu entrenador, y nosotros organizamos la información.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main>
        <Section background="primary" padding="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl text-white/90">
              Resolvemos tus dudas sobre RTX y el piloto
            </p>
          </div>
        </Section>

        <Section background="white" padding="lg">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <h2 className="text-xl font-heading font-bold text-dark mb-3">
                    {faq.question}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section background="dark" padding="md">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-200 mb-4">
              ¿Tienes más preguntas?
            </p>
            <p className="text-gray-300 mb-6">
              Revisa nuestra{" "}
              <Link
                href="/legal"
                className="text-primary hover:underline font-medium"
              >
                política de privacidad y términos
              </Link>{" "}
              o contáctanos directamente.
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
