import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Validar que tenemos los datos necesarios
    if (!type || !data) {
      return NextResponse.json(
        { error: "Tipo y datos son requeridos" },
        { status: 400 }
      );
    }

    // Obtener URL del Google Apps Script desde variables de entorno
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!scriptUrl) {
      console.error("GOOGLE_APPS_SCRIPT_URL no está configurada");
      return NextResponse.json(
        { error: "Configuración del servidor incompleta" },
        { status: 500 }
      );
    }

    // Enviar datos a Google Apps Script
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Error al enviar datos a Google Sheets");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en /api/forms:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
