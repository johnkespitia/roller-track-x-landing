# Roller Track X - Web MVP

Plataforma web para eventos, comunidad y seguimiento deportivo del patinaje de velocidad.

## Stack Tecnológico

- **Framework**: Next.js 14+ (App Router) con TypeScript
- **Estilos**: Tailwind CSS
- **Formularios**: Google Sheets vía Apps Script
- **Analítica**: Google Analytics 4
- **Deploy**: Vercel o Netlify

## Desarrollo

### Prerrequisitos

- Node.js 20+
- npm o yarn

### Instalación

```bash
npm install
```

### Variables de Entorno

Copia el archivo de ejemplo y configura:

```bash
cp env.local.example .env.local
```

Edita `.env.local` con tus valores:

```env
# Google Analytics (opcional en desarrollo)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Google Apps Script (requerido para formularios)
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Ver documentación completa**: `docs/SETUP_ENV.md`

### Desarrollo Local

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build

```bash
npm run build
npm start
```

## Estructura del Proyecto

```
roller-track-x/
├── app/                    # Páginas y rutas (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Home
│   ├── escuelas/          # Página para escuelas
│   ├── sponsors/          # Página para sponsors
│   ├── faq/               # FAQ
│   ├── legal/              # Privacidad y términos
│   └── api/               # API routes
├── components/             # Componentes React
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Logo.tsx
│   ├── FormSchool.tsx
│   ├── FormAthlete.tsx
│   └── FormSponsor.tsx
├── lib/                    # Utilidades
│   ├── analytics.ts       # Tracking GA4
│   ├── forms.ts           # Lógica de formularios
│   └── constants.ts       # Constantes
└── public/                 # Assets estáticos
    └── images/            # Imágenes y logos
```

## Assets

Los assets de marca (logos) deben estar en `public/images/logo/`:
- `logo-horizontal.png` - Para Header
- `logo-vertical.png` - Para Footer
- `logo-icon.png` - Para favicon (opcional)

**Instrucciones completas**: `docs/ASSETS_PROCESSING.md`

Para procesar los assets existentes en `assets/`:
```bash
./scripts/process-assets.sh
```

## Google Apps Script

Para que los formularios funcionen, necesitas configurar un Google Apps Script:

1. **Crea un Google Sheet** para almacenar los datos
2. **Crea un Google Apps Script** (https://script.google.com)
3. **Copia el código** de `docs/google-apps-script.js`
4. **Configura el SPREADSHEET_ID** en el script
5. **Despliega como aplicación web** (acceso: "Cualquiera")
6. **Copia la URL de despliegue** y úsala como `GOOGLE_APPS_SCRIPT_URL`

**Guía paso a paso**: `docs/GOOGLE_APPS_SCRIPT_SETUP.md`

## SEO

- ✅ Metadata configurada en cada página
- ✅ OpenGraph tags con og:image (generación dinámica)
- ✅ Schema.org (Organization + WebSite)
- ✅ Sitemap automático en `/sitemap.xml`
- ✅ Robots.txt en `/public/robots.txt`
- ✅ Twitter cards

## Analítica

Google Analytics 4 está configurado. Los eventos se trackean automáticamente:
- Clicks en CTAs
- Envíos de formularios

## Deploy

### Vercel

```bash
vercel
```

### Netlify

```bash
netlify deploy
```

## Documentación Adicional

- `SETUP_COMPLETO.md` - Guía completa de setup y deploy
- `ESTADO_IMPLEMENTACION.md` - Estado actual del proyecto
- `PLAN_CONSTRUCCION.md` - Plan original de construcción
- `docs/ASSETS_PROCESSING.md` - Procesamiento de assets
- `docs/SETUP_ENV.md` - Configuración de variables de entorno
- `docs/GOOGLE_APPS_SCRIPT_SETUP.md` - Setup del Google Apps Script

## Notas

- El seguimiento es manual en el MVP
- No se promete IA avanzada ni ranking oficial
- Cumplimiento Ley 1581/2012 (Colombia) para protección de datos
- Los formularios requieren Google Apps Script configurado