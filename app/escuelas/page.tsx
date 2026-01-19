import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import FormSchool from "@/components/FormSchool";

export const metadata: Metadata = {
  title: "Para Escuelas y Clubes | Roller Track X",
  description:
    "Visibilidad, orden y comunidad para tu escuela de patinaje. Acceso a pilotos y eventos RTX.",
  openGraph: {
    title: "Para Escuelas y Clubes | Roller Track X",
    description:
      "Visibilidad, orden y comunidad para tu escuela de patinaje. Acceso a pilotos y eventos RTX.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"}/escuelas`,
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Roller Track X - Para Escuelas y Clubes",
      },
    ],
  },
};

export default function EscuelasPage() {
  return (
    <>
      <Header />
      <main>
        <Section background="primary" padding="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Para Escuelas y Clubes
            </h1>
            <p className="text-xl text-white/90">
              Visibilidad, orden y comunidad para impulsar a tus deportistas
            </p>
          </div>
        </Section>

        <Section background="white" padding="lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-dark mb-8 text-center">
              Beneficios para tu escuela
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border-l-4 border-primary">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Visibilidad para deportistas
                </h3>
                <p className="text-gray-700">
                  Tus deportistas tendrán un perfil visible con su historial,
                  tiempos y videos. Mayor exposición en eventos y contenido
                  digital.
                </p>
              </div>
              <div className="p-6 border-l-4 border-primary">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Orden en el seguimiento
                </h3>
                <p className="text-gray-700">
                  Sistema organizado para registrar y seguir el progreso de tus
                  deportistas. Material listo para mostrar a familias.
                </p>
              </div>
              <div className="p-6 border-l-4 border-primary">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Material para familias
                </h3>
                <p className="text-gray-700">
                  Genera reportes y visualizaciones del progreso de tus
                  deportistas para compartir con familias y sponsors.
                </p>
              </div>
              <div className="p-6 border-l-4 border-primary">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Acceso a pilotos y circuito RTX
                </h3>
                <p className="text-gray-700">
                  Participa en eventos piloto low-cost, accede a contenido
                  exclusivo y forma parte de la comunidad RTX desde el inicio.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section background="dark" padding="lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-6">
              ¿Listo para empezar?
            </h2>
            <p className="text-lg text-gray-200 mb-8">
              Completa el formulario y nos pondremos en contacto contigo para
              agendar una llamada o conversación por WhatsApp.
            </p>
            <CTAButton
              href="#formulario"
              variant="primary"
              size="lg"
              ctaType="school"
            >
              Llenar formulario
            </CTAButton>
          </div>
        </Section>

        {/* Formulario */}
        <Section id="formulario" background="white" padding="lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-dark mb-6 text-center">
              Formulario de contacto
            </h2>
            <FormSchool />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
