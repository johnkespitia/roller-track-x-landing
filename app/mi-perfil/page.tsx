"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AthleteProfile, { AthleteBasicInfo } from "@/components/AthleteProfile";
import Section from "@/components/Section";
import FormAthlete from "@/components/FormAthlete";

// Esta página permite a los deportistas ver/crear su perfil
// En el MVP, es una versión simplificada que usa localStorage
// En producción, se conectaría con autenticación y base de datos

export default function MiPerfilPage() {
  const [athleteInfo, setAthleteInfo] = useState<AthleteBasicInfo | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  useEffect(() => {
    // En el MVP, usamos localStorage para persistir datos básicos
    // En producción, esto vendría de una API autenticada
    const stored = localStorage.getItem("rtx_athlete_info");
    if (stored) {
      try {
        setAthleteInfo(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing stored athlete info", e);
      }
    } else {
      setShowRegisterForm(true);
    }
  }, []);

  const handleRegistrationSuccess = () => {
    // Después del registro, obtener los datos del formulario
    // En producción, esto vendría de una respuesta del servidor
    const formData = localStorage.getItem("rtx_last_registration");
    if (formData) {
      try {
        const data = JSON.parse(formData);
        const info: AthleteBasicInfo = {
          nombre: data.nombre,
          edadCategoria: data.edadCategoria,
          ciudad: data.ciudad,
          club: data.club,
          email: data.email,
          whatsapp: data.whatsapp,
        };
        setAthleteInfo(info);
        localStorage.setItem("rtx_athlete_info", JSON.stringify(info));
        setShowRegisterForm(false);
      } catch (e) {
        console.error("Error parsing registration data", e);
      }
    }
  };

  if (showRegisterForm) {
    return (
      <>
        <Header />
        <main>
          <Section background="primary" padding="lg">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Crea tu Perfil Deportivo
              </h1>
              <p className="text-xl text-white/90">
                Registra tus datos para comenzar a llevar tu historial
              </p>
            </div>
          </Section>

          <Section background="white" padding="lg">
            <div className="max-w-2xl mx-auto">
              <FormAthlete onSuccess={handleRegistrationSuccess} />
            </div>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  if (!athleteInfo) {
    return (
      <>
        <Header />
        <main>
          <Section background="white" padding="lg">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-gray-600">Cargando perfil...</p>
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
              Mi Perfil Deportivo
            </h1>
            <p className="text-white/90">
              Seguimiento manual de tu progreso y competencias
            </p>
          </div>
        </Section>

        <AthleteProfile athleteInfo={athleteInfo} />
      </main>
      <Footer />
    </>
  );
}
