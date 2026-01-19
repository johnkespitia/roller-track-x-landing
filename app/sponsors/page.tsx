import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import FormSponsor from "@/components/FormSponsor";

export const metadata: Metadata = {
  title: "Para Sponsors | Roller Track X",
  description:
    "Asocia tu marca con deporte, disciplina y comunidad. Patrocina eventos piloto y contenido digital con alto engagement local.",
  openGraph: {
    title: "Para Sponsors | Roller Track X",
    description:
      "Asocia tu marca con deporte, disciplina y comunidad. Patrocina eventos piloto y contenido digital con alto engagement local.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"}/sponsors`,
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Roller Track X - Para Sponsors",
      },
    ],
  },
};

export default function SponsorsPage() {
  return (
    <>
      <Header />
      <main>
        <Section background="primary" padding="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Para Sponsors
            </h1>
            <p className="text-xl text-white/90">
              Asocia tu marca con deporte, disciplina y comunidad
            </p>
          </div>
        </Section>

        <Section background="white" padding="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-dark mb-8 text-center">
              Beneficios para tu marca
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border-l-4 border-primary">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Audiencia deportiva real y local
                </h3>
                <p className="text-gray-700">
                  Conecta con una audiencia comprometida con el deporte:
                  deportistas, familias, entrenadores y fans del patinaje de
                  velocidad.
                </p>
              </div>
              <div className="p-6 border-l-4 border-primary">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Integración en eventos
                </h3>
                <p className="text-gray-700">
                  Presencia en eventos piloto, streaming en vivo, menciones en
                  contenido digital y activaciones durante competencias.
                </p>
              </div>
              <div className="p-6 border-l-4 border-primary">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Streaming y redes sociales
                </h3>
                <p className="text-gray-700">
                  Tu marca visible en transmisiones en vivo, highlights de
                  eventos y contenido en redes sociales con alto engagement.
                </p>
              </div>
              <div className="p-6 border-l-4 border-primary">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Reporte básico de impacto
                </h3>
                <p className="text-gray-700">
                  Métricas de vistas, menciones, leads generados y alcance para
                  medir el retorno de tu inversión.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section background="dark" padding="lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-6">
              ¿Interesado en patrocinar?
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Completa el formulario y nos pondremos en contacto para
              conversar sobre oportunidades de patrocinio y activaciones.
            </p>
            <CTAButton
              href="#formulario"
              variant="primary"
              size="lg"
              ctaType="sponsor"
            >
              Llenar formulario
            </CTAButton>
          </div>
        </Section>

        {/* Formulario */}
        <Section id="formulario" background="white" padding="lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-dark mb-6 text-center">
              Formulario de interés
            </h2>
            <FormSponsor />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
