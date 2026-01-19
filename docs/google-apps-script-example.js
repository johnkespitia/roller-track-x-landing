/**
 * Google Apps Script para recibir datos de formularios RTX
 * 
 * Instrucciones:
 * 1. Ve a https://script.google.com
 * 2. Crea un nuevo proyecto
 * 3. Pega este código
 * 4. Configura las variables SPREADSHEET_ID y SHEET_NAMES
 * 5. Despliega como aplicación web:
 *    - Ejecutar como: Yo
 *    - Quién tiene acceso: Cualquiera (incluso anónimos)
 * 6. Copia la URL de despliegue y úsala como GOOGLE_APPS_SCRIPT_URL
 */

// ID de tu Google Sheet (en la URL: /spreadsheets/d/ID_AQUI/edit)
const SPREADSHEET_ID = 'TU_SPREADSHEET_ID_AQUI';

// Nombres de las hojas en el Sheet
const SHEET_NAMES = {
  school: 'Escuelas',
  athlete: 'Deportistas',
  sponsor: 'Sponsors'
};

/**
 * Función principal que recibe POST requests
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { type, data: formData, timestamp } = data;

    if (!type || !formData) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Tipo y datos requeridos' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheetName = SHEET_NAMES[type];
    if (!sheetName) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, error: 'Tipo inválido' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = getOrCreateSheet(sheetName);
    const headers = getHeaders(type);
    
    // Verificar si es la primera fila (encabezados)
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }

    // Preparar fila de datos
    const row = headers.map(header => {
      const key = header.toLowerCase()
        .replace(/\s+/g, '')
        .replace(/[áéíóú]/g, (m) => {
          const map = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' };
          return map[m];
        });
      
      // Mapear campos según el tipo
      if (type === 'school') {
        return mapSchoolData(header, formData);
      } else if (type === 'athlete') {
        return mapAthleteData(header, formData);
      } else if (type === 'sponsor') {
        return mapSponsorData(header, formData);
      }
      return formData[key] || '';
    });

    // Agregar timestamp
    row.push(timestamp || new Date().toISOString());

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Obtiene o crea una hoja en el spreadsheet
 */
function getOrCreateSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  
  return sheet;
}

/**
 * Retorna los encabezados según el tipo de formulario
 */
function getHeaders(type) {
  if (type === 'school') {
    return [
      'Nombre Escuela',
      'Ciudad',
      'Nombre Contacto',
      'Rol',
      'WhatsApp',
      'Email',
      'Número Deportistas',
      'Interés',
      'Comentarios',
      'Timestamp'
    ];
  } else if (type === 'athlete') {
    return [
      'Nombre',
      'Edad/Categoría',
      'Ciudad',
      'Club',
      'WhatsApp',
      'Email',
      'Distancias',
      'Mejor Tiempo',
      'Link Video',
      'Timestamp'
    ];
  } else if (type === 'sponsor') {
    return [
      'Empresa',
      'Contacto',
      'Email',
      'WhatsApp',
      'Interés',
      'Presupuesto',
      'Objetivo Marca',
      'Timestamp'
    ];
  }
  return [];
}

/**
 * Mapea datos del formulario de escuela
 */
function mapSchoolData(header, data) {
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

/**
 * Mapea datos del formulario de deportista
 */
function mapAthleteData(header, data) {
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

/**
 * Mapea datos del formulario de sponsor
 */
function mapSponsorData(header, data) {
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
