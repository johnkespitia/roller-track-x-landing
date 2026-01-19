import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AthleteProfile, { AthleteBasicInfo } from "@/components/AthleteProfile";
import Section from "@/components/Section";

// En el MVP, esto es una página de ejemplo/demo
// En producción, se podría conectar con una base de datos o API
// Por ahora, usamos datos estáticos o parámetros de URL

interface PageProps {
  params: {
    slug: string;
  };
}

export const metadata: Metadata = {
  title: "Perfil Deportista | Roller Track X",
  description:
    "Perfil y historial deportivo de seguimiento manual en Roller Track X",
  openGraph: {
    title: "Perfil Deportista | Roller Track X",
    description: "Perfil y historial deportivo de seguimiento manual",
  },
};

// En el MVP, esto es una demo. En producción, se obtendría de una base de datos
function getAthleteData(slug: string): AthleteBasicInfo | null {
  // Por ahora retornamos datos de ejemplo
  // En producción, esto vendría de una API o base de datos
  return {
    nombre: "Deportista Ejemplo",
    edadCategoria: "Juvenil",
    ciudad: "Bogotá",
    club: "Club de Patinaje",
    email: "deportista@example.com",
  };
}

export default function AthleteProfilePage({ params }: PageProps) {
  const athleteInfo = getAthleteData(params.slug);

  if (!athleteInfo) {
    return (
      <>
        <Header />
        <main>
          <Section background="white" padding="lg">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-heading font-bold text-dark mb-4">
                Deportista no encontrado
              </h1>
              <p className="text-gray-600">
                El perfil que buscas no existe o no está disponible.
              </p>
            </div>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Section background="primary" padding="md">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Perfil Deportivo
            </h1>
            <p className="text-white/90">
              Seguimiento manual de progreso y competencias
            </p>
          </div>
        </Section>

        <AthleteProfile athleteInfo={athleteInfo} />
      </main>
      <Footer />
    </>
  );
}
