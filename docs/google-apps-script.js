/**
 * Google Apps Script para recibir datos de formularios RTX
 * 
 * INSTRUCCIONES DE INSTALACIÓN:
 * 
 * 1. Ve a https://script.google.com
 * 2. Crea un nuevo proyecto
 * 3. Pega este código completo
 * 4. Configura las variables SPREADSHEET_ID y SHEET_NAMES (líneas 20-25)
 * 5. Guarda el proyecto
 * 6. Despliega como aplicación web:
 *    - Haz clic en "Desplegar" > "Nueva implementación"
 *    - Tipo: Aplicación web
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquiera (incluso anónimos)
 *    - Haz clic en "Desplegar"
 * 7. Copia la URL de despliegue y úsala como GOOGLE_APPS_SCRIPT_URL en .env
 * 
 * CONFIGURACIÓN DE GOOGLE SHEETS:
 * 
 * 1. Crea un nuevo Google Sheet
 * 2. Copia el ID de la URL (entre /d/ y /edit)
 * 3. Pega el ID en SPREADSHEET_ID (línea 20)
 * 4. El script creará automáticamente las hojas: Escuelas, Deportistas, Sponsors
 */

// ============================================
// CONFIGURACIÓN - MODIFICA ESTOS VALORES
// ============================================

// ID de tu Google Sheet (en la URL: /spreadsheets/d/ID_AQUI/edit)
const SPREADSHEET_ID = 'TU_SPREADSHEET_ID_AQUI';

// Nombres de las hojas en el Sheet (puedes cambiarlos si quieres)
const SHEET_NAMES = {
  school: 'Escuelas',
  athlete: 'Deportistas',
  sponsor: 'Sponsors',
  athlete_history: 'HistorialDeportistas'
};

// ============================================
// CÓDIGO - NO MODIFICAR A PARTIR DE AQUÍ
// ============================================

/**
 * Función principal que recibe POST requests desde Next.js
 */
function doPost(e) {
  try {
    // Parsear datos recibidos
    const requestData = JSON.parse(e.postData.contents);
    const { type, data: formData, timestamp } = requestData;

    // Validar datos requeridos
    if (!type || !formData) {
      return createErrorResponse('Tipo y datos son requeridos', 400);
    }

    // Validar tipo de formulario
    const sheetName = SHEET_NAMES[type];
    if (!sheetName) {
      return createErrorResponse('Tipo de formulario inválido. Debe ser: school, athlete, sponsor o athlete_history', 400);
    }

    // Validar que el spreadsheet existe
    if (!SPREADSHEET_ID || SPREADSHEET_ID === 'TU_SPREADSHEET_ID_AQUI') {
      return createErrorResponse('SPREADSHEET_ID no configurado. Por favor configura el ID del Google Sheet.', 500);
    }

    // Obtener o crear la hoja
    const sheet = getOrCreateSheet(sheetName);
    
    // Obtener encabezados según el tipo
    const headers = getHeaders(type);
    
    // Verificar si es la primera fila (encabezados)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      // Formatear encabezados (negrita, fondo)
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#E63946');
      headerRange.setFontColor('#FFFFFF');
    }

    // Preparar fila de datos
    const row = headers.map(header => {
      if (header === 'Timestamp') {
        return timestamp || new Date().toISOString();
      }
      return mapFormData(header, formData, type) || '';
    });

    // Agregar la fila
    sheet.appendRow(row);

    // Retornar éxito
    return createSuccessResponse({ 
      message: 'Datos guardados correctamente',
      sheet: sheetName 
    });

  } catch (error) {
    // Log del error (visible en Executions del script)
    console.error('Error en doPost:', error);
    
    return createErrorResponse(
      'Error al procesar la solicitud: ' + error.toString(),
      500
    );
  }
}

/**
 * Función para manejar GET requests (útil para testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Google Apps Script RTX está funcionando',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Crea una respuesta de éxito
 */
function createSuccessResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      ...data
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Crea una respuesta de error
 */
function createErrorResponse(message, statusCode = 400) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: message,
      statusCode: statusCode
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Obtiene o crea una hoja en el spreadsheet
 */
function getOrCreateSheet(sheetName) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
    }
    
    return sheet;
  } catch (error) {
    throw new Error('No se pudo acceder al Google Sheet. Verifica que el SPREADSHEET_ID sea correcto y que tengas permisos.');
  }
}

/**
 * Retorna los encabezados según el tipo de formulario
 */
function getHeaders(type) {
  if (type === 'school') {
    return [
      'Timestamp',
      'Nombre Escuela',
      'Ciudad',
      'Nombre Contacto',
      'Rol',
      'WhatsApp',
      'Email',
      'Número Deportistas',
      'Interés',
      'Comentarios'
    ];
  } else if (type === 'athlete') {
    return [
      'Timestamp',
      'Nombre',
      'Edad/Categoría',
      'Ciudad',
      'Club',
      'WhatsApp',
      'Email',
      'Distancias',
      'Mejor Tiempo',
      'Link Video'
    ];
  } else if (type === 'sponsor') {
    return [
      'Timestamp',
      'Empresa',
      'Contacto',
      'Email',
      'WhatsApp',
      'Interés',
      'Presupuesto',
      'Objetivo Marca'
    ];
  } else if (type === 'athlete_history') {
    return [
      'Timestamp',
      'Nombre Deportista',
      'Email',
      'WhatsApp',
      'Fecha',
      'Prueba',
      'Distancia',
      'Tiempo',
      'Evento',
      'Lugar',
      'Notas',
      'Link Video'
    ];
  }
  return [];
}

/**
 * Mapea los datos del formulario a los encabezados
 */
function mapFormData(header, data, type) {
  // Mapeo para formulario de escuela
  if (type === 'school') {
    const map = {
      'Nombre Escuela': data.nombreEscuela,
      'Ciudad': data.ciudad,
      'Nombre Contacto': data.nombreContacto,
      'Rol': data.rol,
      'WhatsApp': data.whatsapp || '',
      'Email': data.email || '',
      'Número Deportistas': data.numeroDeportistas || '',
      'Interés': data.interes || '',
      'Comentarios': data.comentarios || ''
    };
    return map[header] || '';
  }
  
  // Mapeo para formulario de deportista
  if (type === 'athlete') {
    const map = {
      'Nombre': data.nombre,
      'Edad/Categoría': data.edadCategoria,
      'Ciudad': data.ciudad,
      'Club': data.club || '',
      'WhatsApp': data.whatsapp || '',
      'Email': data.email || '',
      'Distancias': data.distancias || '',
      'Mejor Tiempo': data.mejorTiempo || '',
      'Link Video': data.linkVideo || ''
    };
    return map[header] || '';
  }
  
  // Mapeo para formulario de sponsor
  if (type === 'sponsor') {
    const map = {
      'Empresa': data.empresa,
      'Contacto': data.contacto,
      'Email': data.email || '',
      'WhatsApp': data.whatsapp || '',
      'Interés': data.interes,
      'Presupuesto': data.presupuesto || '',
      'Objetivo Marca': data.objetivoMarca || ''
    };
    return map[header] || '';
  }
  
  // Mapeo para historial de deportista
  if (type === 'athlete_history') {
    const map = {
      'Nombre Deportista': data.athleteName,
      'Email': data.athleteEmail || '',
      'WhatsApp': data.athleteWhatsapp || '',
      'Fecha': data.fecha,
      'Prueba': data.prueba,
      'Distancia': data.distancia,
      'Tiempo': data.tiempo,
      'Evento': data.evento || '',
      'Lugar': data.lugar || '',
      'Notas': data.notas || '',
      'Link Video': data.linkVideo || ''
    };
    return map[header] || '';
  }
  
  return '';
}
