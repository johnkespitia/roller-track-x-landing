# Configuración de Google Apps Script para Formularios

Este documento explica cómo configurar el Google Apps Script para que los formularios de RTX guarden datos en Google Sheets.

## Paso 1: Crear Google Sheet

1. Ve a https://sheets.google.com/
2. Crea un nuevo Google Sheet
3. Nómbralo "RTX Formularios" (o el nombre que prefieras)
4. Copia el **ID del Sheet** de la URL:
   ```
   https://docs.google.com/spreadsheets/d/ID_AQUI/edit
   ```
   El ID es la parte entre `/d/` y `/edit`

## Paso 2: Crear Google Apps Script

1. Ve a https://script.google.com/
2. Haz clic en **"Nuevo proyecto"**
3. Nombra el proyecto: "RTX Formularios Handler"
4. Abre el archivo `docs/google-apps-script.js` en este repositorio
5. Copia TODO el contenido del archivo
6. Pega el código en el editor de Google Apps Script

## Paso 3: Configurar el Script

1. En el código, busca la línea:
   ```javascript
   const SPREADSHEET_ID = 'TU_SPREADSHEET_ID_AQUI';
   ```
2. Reemplaza `'TU_SPREADSHEET_ID_AQUI'` con el ID que copiaste en el Paso 1
3. (Opcional) Si quieres cambiar los nombres de las hojas, modifica:
   ```javascript
   const SHEET_NAMES = {
     school: 'Escuelas',
     athlete: 'Deportistas',
     sponsor: 'Sponsors'
   };
   ```

## Paso 4: Guardar el Script

1. Haz clic en **"Guardar"** (💾) o presiona `Ctrl+S` / `Cmd+S`
2. Nombra el proyecto si aún no lo has hecho

## Paso 5: Desplegar como Aplicación Web

1. Haz clic en **"Desplegar"** > **"Nueva implementación"**
2. En **"Tipo"**, selecciona: **"Aplicación web"**
3. Configura:
   - **Descripción**: "RTX Formularios v1" (o lo que prefieras)
   - **Ejecutar como**: **"Yo"**
   - **Quién tiene acceso**: **"Cualquiera"** (incluso anónimos)
4. Haz clic en **"Desplegar"**
5. **IMPORTANTE**: La primera vez te pedirá autorización:
   - Haz clic en **"Autorizar acceso"**
   - Selecciona tu cuenta de Google
   - Haz clic en **"Avanzado"** > **"Ir a [nombre del proyecto] (no seguro)"**
   - Haz clic en **"Permitir"**
6. Copia la **URL de despliegue** (algo como: `https://script.google.com/macros/s/.../exec`)

## Paso 6: Configurar en Next.js

1. Copia la URL de despliegue del Paso 5
2. Agrega la variable de entorno:
   - **Desarrollo**: Crea `.env.local` y agrega:
     ```env
     GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
     ```
   - **Producción**: Agrega la variable en Vercel/Netlify:
     - Vercel: Settings > Environment Variables
     - Netlify: Site settings > Environment variables

## Paso 7: Probar

1. Inicia el servidor de desarrollo: `npm run dev`
2. Ve a http://localhost:3000
3. Llena uno de los formularios (Escuelas, Deportistas o Sponsors)
4. Envía el formulario
5. Verifica en tu Google Sheet que los datos se guardaron correctamente

## Estructura de las Hojas

El script creará automáticamente 3 hojas en tu Google Sheet:

### Hoja "Escuelas"
Columnas:
- Timestamp
- Nombre Escuela
- Ciudad
- Nombre Contacto
- Rol
- WhatsApp
- Email
- Número Deportistas
- Interés
- Comentarios

### Hoja "Deportistas"
Columnas:
- Timestamp
- Nombre
- Edad/Categoría
- Ciudad
- Club
- WhatsApp
- Email
- Distancias
- Mejor Tiempo
- Link Video

### Hoja "Sponsors"
Columnas:
- Timestamp
- Empresa
- Contacto
- Email
- WhatsApp
- Interés
- Presupuesto
- Objetivo Marca

## Solución de Problemas

### Google devuelve HTML en lugar de JSON (página de login/consentimiento)
Si la API responde con un error que menciona "Google devolvió una página web (HTML)":
1. **Abre la URL del script en el navegador** (la misma que está en `GOOGLE_APPS_SCRIPT_URL`). Ejemplo: `https://script.google.com/macros/s/.../exec`
2. Si Google muestra una pantalla de autorización, inicia sesión con la cuenta que desplegó el script y haz clic en "Permitir" / "Avanzado" → "Ir a ... (no seguro)" → "Permitir".
3. Tras autorizar una vez, las llamadas desde el servidor (formularios) deberían recibir JSON y no HTML.
4. Comprueba que el despliegue sea **"Quién tiene acceso: Cualquiera (incluso anónimos)"** (Desplegar → Administrar implementaciones → editar).

### Error: "SPREADSHEET_ID no configurado"
- Verifica que hayas reemplazado `TU_SPREADSHEET_ID_AQUI` con el ID real del Sheet

### Error: "No se pudo acceder al Google Sheet"
- Verifica que el ID del Sheet sea correcto
- Asegúrate de que el Sheet existe y tienes permisos de edición
- Verifica que el script tenga permisos (revisa en "Ejecuciones" del script)

### Los datos no se guardan
1. Ve a Google Apps Script > "Ejecuciones"
2. Revisa si hay errores en las ejecuciones recientes
3. Verifica que la URL de despliegue sea correcta
4. Asegúrate de que la variable `GOOGLE_APPS_SCRIPT_URL` esté configurada correctamente

### Error 401 o 403
- Verifica que el despliegue esté configurado como "Cualquiera" (incluso anónimos)
- Re-despliega el script si hiciste cambios

## Actualizar el Script

Si necesitas actualizar el código del script:

1. Haz los cambios en el editor de Google Apps Script
2. Guarda los cambios
3. Ve a **"Desplegar"** > **"Administrar implementaciones"**
4. Haz clic en el ícono de edición (✏️) de la implementación activa
5. Haz clic en **"Nueva versión"**
6. Haz clic en **"Desplegar"**

No necesitas cambiar la URL de despliegue, seguirá funcionando con la misma.

## Seguridad

⚠️ **IMPORTANTE**:
- El script valida los datos antes de guardarlos
- Solo acepta tipos de formulario válidos: `school`, `athlete`, `sponsor`
- Los datos se guardan directamente en tu Google Sheet (asegúrate de tener backups)
- Considera agregar validaciones adicionales si es necesario
