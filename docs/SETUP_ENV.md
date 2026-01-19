# Configuración de Variables de Entorno

## Desarrollo Local

1. Copia el archivo de ejemplo:
```bash
cp .env.local.example .env.local
```

2. Edita `.env.local` y configura:
```env
# Google Analytics (opcional en desarrollo)
NEXT_PUBLIC_GA_ID=

# Google Apps Script URL (necesario para probar formularios)
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Base URL local
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## Producción

### Vercel

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega las siguientes variables:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_BASE_URL=https://www.rollertrackx.com
```

### Netlify

1. Ve a tu proyecto en Netlify
2. Site settings > Environment variables
3. Agrega las mismas variables que en Vercel

## Variables Requeridas

### `NEXT_PUBLIC_GA_ID`
- **Qué es**: ID de Google Analytics 4
- **Dónde obtenerlo**: https://analytics.google.com/
- **Formato**: `G-XXXXXXXXXX`
- **Opcional**: Sí (pero recomendado para producción)

### `GOOGLE_APPS_SCRIPT_URL`
- **Qué es**: URL del Google Apps Script desplegado
- **Dónde obtenerlo**: Después de desplegar el script (ver `docs/google-apps-script.js`)
- **Formato**: `https://script.google.com/macros/s/SCRIPT_ID/exec`
- **Requerido**: Sí (para que funcionen los formularios)

### `NEXT_PUBLIC_BASE_URL`
- **Qué es**: URL base de tu sitio web
- **Desarrollo**: `http://localhost:3000`
- **Producción**: `https://www.rollertrackx.com` (o tu dominio)
- **Requerido**: Sí (para SEO y OpenGraph)

## Variables Opcionales

### `GOOGLE_SHEETS_ID`
- **Qué es**: ID del Google Sheet (solo si necesitas acceso directo)
- **Dónde obtenerlo**: De la URL del Sheet: `/spreadsheets/d/ID_AQUI/edit`
- **Opcional**: Sí (el Apps Script ya lo tiene configurado)

## Verificación

Para verificar que las variables están configuradas correctamente:

1. **Desarrollo**: Reinicia el servidor (`npm run dev`)
2. **Producción**: Haz un nuevo deploy después de agregar las variables

## Seguridad

⚠️ **IMPORTANTE**: 
- Nunca subas `.env.local` a git (ya está en `.gitignore`)
- Las variables con `NEXT_PUBLIC_` son públicas (se incluyen en el bundle del cliente)
- `GOOGLE_APPS_SCRIPT_URL` es pública pero el script debe validar los datos
