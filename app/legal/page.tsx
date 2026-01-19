import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";

export const metadata: Metadata = {
  title: "Privacidad y Términos | Roller Track X",
  description:
    "Política de privacidad y términos de uso de Roller Track X. Cumplimiento con la Ley 1581/2012 de Colombia.",
  openGraph: {
    title: "Privacidad y Términos | Roller Track X",
    description:
      "Política de privacidad y términos de uso de Roller Track X. Cumplimiento con la Ley 1581/2012 de Colombia.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://www.rollertrackx.com"}/legal`,
    images: [
      {
        url: "/images/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Roller Track X - Privacidad y Términos",
      },
    ],
  },
};

export default function LegalPage() {
  return (
    <>
      <Header />
      <main>
        <Section background="primary" padding="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Privacidad y Términos
            </h1>
            <p className="text-xl text-white/90">
              Protegemos tus datos personales según la Ley 1581/2012
            </p>
          </div>
        </Section>

        <Section background="white" padding="lg">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <section className="mb-12">
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">
                Política de Privacidad
              </h2>
              <p className="text-gray-700 mb-4">
                Roller Track X (RTX) se compromete a proteger tus datos
                personales de acuerdo con la Ley 1581 de 2012 y el Decreto
                1377 de 2013 de Colombia.
              </p>

              <h3 className="text-2xl font-heading font-bold text-dark mt-8 mb-4">
                Datos que recopilamos
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>
                  <strong>Datos de contacto:</strong> nombre, ciudad, email,
                  WhatsApp
                </li>
                <li>
                  <strong>Datos deportivos:</strong> edad/categoría, club,
                  tiempos, pruebas, videos
                </li>
                <li>
                  <strong>Datos de interés:</strong> preferencias de
                  participación, objetivos
                </li>
              </ul>

              <h3 className="text-2xl font-heading font-bold text-dark mt-8 mb-4">
                Uso de los datos
              </h3>
              <p className="text-gray-700 mb-4">
                Utilizamos tus datos para:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Contactarte sobre eventos y oportunidades</li>
                <li>Organizar pilotos y competencias</li>
                <li>Crear contenido y visibilidad deportiva</li>
                <li>Generar estadísticas agregadas (sin datos personales)</li>
                <li>Comunicarnos contigo sobre RTX</li>
              </ul>

              <h3 className="text-2xl font-heading font-bold text-dark mt-8 mb-4">
                Consentimiento
              </h3>
              <p className="text-gray-700 mb-4">
                Al completar nuestros formularios, das tu consentimiento
                explícito para:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>El tratamiento de tus datos personales</li>
                <li>El uso de tu información para los fines descritos</li>
                <li>El uso de imágenes/videos si los compartes (con
                  autorización adicional)
                </li>
              </ul>

              <h3 className="text-2xl font-heading font-bold text-dark mt-8 mb-4">
                Tus derechos
              </h3>
              <p className="text-gray-700 mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Conocer, actualizar y rectificar tus datos</li>
                <li>Solicitar prueba de la autorización otorgada</li>
                <li>Revocar el consentimiento y solicitar la eliminación</li>
                <li>Acceder de forma gratuita a tus datos</li>
                <li>Presentar quejas ante la Superintendencia de Industria y
                  Comercio
                </li>
              </ul>

              <h3 className="text-2xl font-heading font-bold text-dark mt-8 mb-4">
                Contacto para ejercer tus derechos
              </h3>
              <p className="text-gray-700 mb-4">
                Para ejercer cualquiera de estos derechos o solicitar la
                eliminación de tus datos, contáctanos a través del formulario
                de contacto o por email indicando tu solicitud.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">
                Términos de Uso
              </h2>
              <h3 className="text-2xl font-heading font-bold text-dark mt-8 mb-4">
                Naturaleza del servicio
              </h3>
              <p className="text-gray-700 mb-4">
                RTX es un servicio complementario al sistema oficial de
                patinaje. No reemplazamos federaciones, ligas ni competencias
                oficiales. Nuestro objetivo es visibilidad, comunidad y orden
                en la información.
              </p>

              <h3 className="text-2xl font-heading font-bold text-dark mt-8 mb-4">
                Seguimiento manual
              </h3>
              <p className="text-gray-700 mb-4">
                El seguimiento en RTX es manual. Tú o tu entrenador son
                responsables de registrar tiempos, pruebas y videos. RTX no
                garantiza la exactitud de los datos reportados.
              </p>

              <h3 className="text-2xl font-heading font-bold text-dark mt-8 mb-4">
                Ranking independiente
              </h3>
              <p className="text-gray-700 mb-4">
                Nuestro ranking es informativo y no oficial. Se basa en datos
                reportados manualmente y no tiene validez oficial para
                federaciones o ligas.
              </p>

              <h3 className="text-2xl font-heading font-bold text-dark mt-8 mb-4">
                Limitación de responsabilidad
              </h3>
              <p className="text-gray-700 mb-4">
                RTX no se hace responsable por errores en los datos reportados,
                cambios en eventos, o decisiones de terceros. Los eventos piloto
                pueden cancelarse o modificarse con aviso previo.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-heading font-bold text-dark mb-6">
                Actualizaciones
              </h2>
              <p className="text-gray-700 mb-4">
                Esta política puede actualizarse. Te notificaremos de cambios
                significativos a través de nuestros canales de comunicación.
              </p>
              <p className="text-gray-600 text-sm">
                Última actualización: {new Date().toLocaleDateString("es-CO")}
              </p>
            </section>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
