// Lógica para envío de formularios a Google Sheets vía Apps Script

export interface FormSchoolData {
  nombreEscuela: string;
  ciudad: string;
  nombreContacto: string;
  rol: string;
  whatsapp?: string;
  email?: string;
  numeroDeportistas?: string;
  interes?: string;
  comentarios?: string;
}

export interface FormAthleteData {
  nombre: string;
  edadCategoria: string;
  ciudad: string;
  club?: string;
  whatsapp?: string;
  email?: string;
  distancias?: string;
  mejorTiempo?: string;
  linkVideo?: string;
}

export interface FormSponsorData {
  empresa: string;
  contacto: string;
  email?: string;
  whatsapp?: string;
  interes: string;
  presupuesto?: string;
  objetivoMarca?: string;
}

// Historial de deportista (seguimiento manual)
export interface AthleteHistoryEntry {
  athleteName: string;
  athleteEmail?: string;
  athleteWhatsapp?: string;
  fecha: string;
  prueba: string; // Nombre de la prueba/competencia
  distancia: string; // Ej: "500m", "1000m"
  tiempo: string; // Ej: "45.2s", "1:23.45"
  lugar?: string; // Lugar del evento
  evento?: string; // Nombre del evento
  notas?: string;
  linkVideo?: string;
}

export const submitForm = async (
  formType: "school" | "athlete" | "sponsor" | "athlete_history",
  data: FormSchoolData | FormAthleteData | FormSponsorData | AthleteHistoryEntry
): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch("/api/forms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: formType,
        data,
      }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar el formulario");
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
