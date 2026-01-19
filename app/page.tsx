import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CTAButton from "@/components/CTAButton";
import FormAthlete from "@/components/FormAthlete";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />

        {/* Sección Problema */}
        <Section id="problema" background="white" padding="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-8">
              Mucho talento, poca visibilidad.
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Visibilidad limitada
                </h3>
                <p className="text-gray-700">
                  Mucho talento, poca visibilidad. Los deportistas no tienen
                  suficientes oportunidades para mostrar su progreso.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Métricas inconsistentes
                </h3>
                <p className="text-gray-700">
                  Progreso sin métricas consistentes. Es difícil seguir el
                  crecimiento deportivo de manera objetiva.
                </p>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-primary mb-4">
                  Pocas oportunidades
                </h3>
                <p className="text-gray-700">
                  Pocas oportunidades de mostrar historial deportivo y
                  conectar con escuelas, sponsors y la comunidad.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Sección Solución */}
        <Section id="solucion" background="dark" padding="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8">
              La solución: eventos, comunidad y seguimiento
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-6 bg-white/10 rounded-lg">
                <h3 className="text-xl font-heading font-bold text-neon-green mb-4">
                  Eventos con streaming
                </h3>
                <p className="text-gray-200">
                  Eventos con streaming y highlights para dar visibilidad a los
                  deportistas y crear contenido atractivo.
                </p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg">
                <h3 className="text-xl font-heading font-bold text-neon-green mb-4">
                  Ranking independiente
                </h3>
                <p className="text-gray-200">
                  Ranking independiente (no oficial) basado en resultados
                  reportados para organizar y visibilizar el talento.
                </p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg">
                <h3 className="text-xl font-heading font-bold text-neon-green mb-4">
                  Seguimiento manual gratuito
                </h3>
                <p className="text-gray-200">
                  Historial de tiempos y competencias registrado manualmente.
                  Gratis y comunitario.
                </p>
              </div>
              <div className="p-6 bg-white/10 rounded-lg">
                <h3 className="text-xl font-heading font-bold text-neon-green mb-4">
                  Comunidad
                </h3>
                <p className="text-gray-200">
                  Comunidad para escuelas, familias y fans. Un espacio para
                  conectar y crecer juntos.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Seguimiento gratuito */}
        <Section id="seguimiento" background="white" padding="lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-6">
              Tu historial deportivo, en un solo lugar (gratis).
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Crea tu perfil y registra manualmente tus tiempos, pruebas,
              competencias y videos. RTX lo usa para organizar pilotos,
              contenidos y eventos.
            </p>
            <CTAButton href="/mi-perfil" variant="primary" size="lg" ctaType="athlete">
              Crear mi perfil
            </CTAButton>
          </div>
        </Section>

        {/* Para quién es */}
        <Section id="audiencias" background="dark" padding="lg">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white text-center mb-12">
              Para quién es RTX
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Escuelas
                </h3>
                <ul className="text-gray-200 space-y-2 mb-6 text-left">
                  <li>• Visibilidad para deportistas</li>
                  <li>• Orden en el seguimiento</li>
                  <li>• Material para mostrar progreso</li>
                  <li>• Acceso a pilotos y circuito RTX</li>
                </ul>
                <CTAButton
                  href="/escuelas"
                  variant="primary"
                  size="md"
                  ctaType="school"
                >
                  Para escuelas
                </CTAButton>
              </div>
              <div className="bg-white/10 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Deportistas
                </h3>
                <ul className="text-gray-200 space-y-2 mb-6 text-left">
                  <li>• Historial deportivo gratuito</li>
                  <li>• Motivación y seguimiento</li>
                  <li>• Visibilidad en eventos</li>
                  <li>• Comunidad de patinadores</li>
                </ul>
                <CTAButton
                  href="/mi-perfil"
                  variant="primary"
                  size="md"
                  ctaType="athlete"
                >
                  Registrarme
                </CTAButton>
              </div>
              <div className="bg-white/10 p-8 rounded-lg text-center">
                <h3 className="text-2xl font-heading font-bold text-primary mb-4">
                  Sponsors
                </h3>
                <ul className="text-gray-200 space-y-2 mb-6 text-left">
                  <li>• Audiencia deportiva real</li>
                  <li>• Integración en eventos</li>
                  <li>• Streaming y redes</li>
                  <li>• Reporte de impacto</li>
                </ul>
                <CTAButton
                  href="/sponsors"
                  variant="primary"
                  size="md"
                  ctaType="sponsor"
                >
                  Para sponsors
                </CTAButton>
              </div>
            </div>
          </div>
        </Section>

        {/* Cómo empezamos */}
        <Section id="como-empezamos" background="white" padding="lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark mb-12">
              Cómo empezamos (Piloto)
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-heading font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  Te registras
                </h3>
                <p className="text-gray-700">
                  Registra tu escuela o deportista. Comparte tus datos básicos
                  y videos.
                </p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-heading font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  Participas en el piloto
                </h3>
                <p className="text-gray-700">
                  Participa en el primer evento piloto y mide tu progreso con
                  nosotros.
                </p>
              </div>
              <div className="p-6">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-heading font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-heading font-bold text-dark mb-4">
                  Construimos comunidad
                </h3>
                <p className="text-gray-700">
                  Publicamos highlights, medimos interés y construimos la
                  comunidad RTX.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Social Proof - Testimonios */}
        <Testimonials />

        {/* Mensaje de confianza */}
        <Section id="confianza" background="dark" padding="md">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-200 mb-4">
              RTX complementa el sistema oficial: no reemplaza federaciones ni
              ligas.
            </p>
            <p className="text-gray-300">
              Nuestro foco es visibilidad, comunidad y orden en la información.
              Protegemos tus datos personales según la Ley 1581/2012 (Colombia).
            </p>
          </div>
        </Section>

        {/* CTA Final */}
        <Section id="registro" background="primary" padding="lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              ¿Quieres ser parte del inicio?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Déjanos tu contacto y te escribimos. Elige tu perfil:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <CTAButton
                href="/escuelas"
                variant="secondary"
                size="lg"
                ctaType="school"
              >
                Soy escuela/club
              </CTAButton>
              <CTAButton
                href="#formulario-deportista"
                variant="outline"
                size="lg"
                ctaType="athlete"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Soy deportista
              </CTAButton>
              <CTAButton
                href="/sponsors"
                variant="secondary"
                size="lg"
                ctaType="sponsor"
              >
                Soy sponsor
              </CTAButton>
            </div>
          </div>
        </Section>

        {/* Formulario de deportista */}
        <Section id="formulario-deportista" background="white" padding="lg">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-dark mb-6 text-center">
              Registro de deportista
            </h2>
            <FormAthlete />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
