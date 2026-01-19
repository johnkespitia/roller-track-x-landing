# Plan de Construcción - Roller Track X Web MVP (Actualizado)

## Stack Tecnológico

- **Framework**: Next.js 14+ (App Router) con TypeScript
- **Estilos**: Tailwind CSS
- **Formularios**: Google Sheets vía Apps Script
- **Analítica**: Google Analytics 4
- **Deploy**: Vercel o Netlify
- **Fuentes**: Google Fonts (Montserrat/Bebas Neue para títulos, Roboto/Open Sans para texto)
- **Imágenes**: Next.js Image component con optimización automática

## Estructura del Proyecto

```
roller-track-x/
├── app/
│   ├── layout.tsx          # Layout principal con metadata global
│   ├── page.tsx            # Home (landing principal)
│   ├── escuelas/
│   │   └── page.tsx        # Página para escuelas/clubes
│   ├── sponsors/
│   │   └── page.tsx        # Página para sponsors
│   ├── faq/
│   │   └── page.tsx        # Preguntas frecuentes
│   ├── legal/
│   │   └── page.tsx        # Privacidad y términos
│   └── api/
│       └── forms/
│           └── route.ts    # Endpoint para enviar a Google Sheets
├── components/
│   ├── Header.tsx          # Navegación principal con logo
│   ├── Footer.tsx           # Footer con redes y legal
│   ├── Hero.tsx            # Sección hero del home
│   ├── Section.tsx         # Componente base para secciones
│   ├── CTAButton.tsx       # Botón CTA reutilizable
│   ├── FormSchool.tsx      # Formulario escuelas/clubes
│   ├── FormAthlete.tsx     # Formulario deportistas/familias
│   ├── FormSponsor.tsx     # Formulario sponsors
│   ├── AthleteProfile.tsx  # Perfil de deportista (seguimiento manual)
│   └── Testimonials.tsx    # Placeholder testimonios
├── lib/
│   ├── analytics.ts        # Funciones para eventos GA4
│   ├── forms.ts            # Lógica de envío a Google Sheets
│   └── constants.ts        # Constantes (colores, textos, links)
├── public/
│   ├── images/
│   │   ├── logo/           # Logo optimizado (SVG o PNG optimizado)
│   │   │   ├── logo-horizontal.svg (o .png)
│   │   │   ├── logo-vertical.svg (o .png)
│   │   │   └── logo-icon.svg (o .png)
│   │   └── brand/          # Otros elementos de marca optimizados
│   ├── robots.txt
│   └── sitemap.xml
└── styles/
    └── globals.css         # Estilos globales + Tailwind
```

## Gestión de Assets de Marca

### Fase 1: Revisión y Optimización
1. **Revisar assets existentes** en `assets/`:
   - Identificar qué contiene cada PNG (logo, variantes, elementos gráficos)
   - Determinar cuál es el logo principal y sus variantes
   - Identificar otros elementos de marca (iconos, gráficos, etc.)

2. **Optimización de imágenes**:
   - Convertir logo a SVG si es posible (mejor para web)
   - Si se mantiene PNG: optimizar con herramientas (ImageOptim, Squoosh)
   - Crear variantes necesarias:
     - Logo horizontal (para Header)
     - Logo vertical/stacked (para Footer o secciones)
     - Logo icono/favicon (para favicon.ico)
   - Generar versiones en diferentes tamaños si es necesario
   - Convertir a WebP para mejor performance (Next.js lo maneja automáticamente)

3. **Organización**:
   - Mover assets optimizados a `public/images/logo/` y `public/images/brand/`
   - Renombrar archivos con nombres descriptivos (no nombres genéricos de ChatGPT)
   - Documentar qué es cada asset en un README o comentario

### Fase 2: Integración en Componentes
- **Header.tsx**: Incluir logo horizontal en la navegación
- **Footer.tsx**: Incluir logo (versión más pequeña o vertical)
- **Hero.tsx**: Usar elementos gráficos de marca si aplican
- **Favicon**: Configurar favicon.ico usando el logo icono
- **OpenGraph**: Usar logo o imagen de marca para og:image

## Páginas a Construir

### 1. Home (`/`)
Secciones según [INFORMATION_ARCHITECTURE.md](INFORMATION_ARCHITECTURE.md):
1. **Hero**: Propuesta de valor + CTA primario "Únete al piloto" + CTA secundario "Soy escuela/club" + elementos visuales de marca
2. **Problema**: Visibilidad, métricas, oportunidades
3. **Solución**: Eventos + streaming + ranking independiente + comunidad
4. **Seguimiento gratuito**: Explicación del sistema manual + link a registro
5. **Para quién es**: 3 cards (Escuelas, Deportistas, Sponsors) con CTAs
6. **Cómo empezamos**: 3 pasos del piloto
7. **Social proof**: Placeholder logos/testimonios
8. **CTA final**: Formulario embebido o modal con 3 opciones

### 2. Escuelas (`/escuelas`)
- Copy específico para escuelas/clubes
- Beneficios: visibilidad, orden, comunidad, acceso a pilotos
- Formulario de contacto embebido
- CTA para agendar llamada/WhatsApp

### 3. Sponsors (`/sponsors`)
- Copy sobre alcance y activaciones
- Beneficios: audiencia deportiva, integración en eventos
- Formulario de interés embebido
- CTA para conversación

### 4. FAQ (`/faq`)
- Preguntas frecuentes sobre piloto, seguimiento, legalidad
- Acordeón o lista expandible
- Link a /legal

### 5. Legal (`/legal`)
- Política de privacidad (Ley 1581/2012)
- Términos de uso
- Consentimientos y derechos de datos
- Contacto para eliminación de datos

## Componentes Clave

### Logo Component
Crear componente `Logo.tsx` reutilizable que:
- Acepte variante (horizontal, vertical, icon)
- Acepte tamaño (sm, md, lg)
- Use Next.js Image para optimización
- Sea accesible (alt text apropiado)

### Formularios
Tres formularios según [FORMS_AND_DATA_MODEL.md](FORMS_AND_DATA_MODEL.md):
- **FormSchool**: Nombre escuela, ciudad, contacto, rol, WhatsApp/email, número deportistas (opc), interés, comentarios
- **FormAthlete**: Nombre, edad/categoría, ciudad, club, WhatsApp/email, distancias (opc), mejor tiempo (opc), link video (opc)
- **FormSponsor**: Empresa, contacto, email/WhatsApp, interés, presupuesto (opc), objetivo marca (opc)

Todos incluyen:
- Validación client-side
- Checkbox de consentimiento (requerido)
- Honeypot anti-spam
- Tracking de evento analítico al enviar
- Envío a Google Sheets vía Apps Script endpoint

### Sistema de Seguimiento Manual (MVP)
- **AthleteProfile**: Componente para mostrar perfil básico
- Formulario para agregar entrada manual: fecha, prueba/distancia, tiempo, lugar, notas, link video
- Vista de historial: lista de entradas ordenadas por fecha
- Estadísticas básicas: mejor marca por distancia, promedio mensual
- Almacenamiento: Google Sheets (misma estrategia que formularios)

## Integración Google Sheets

1. Crear Google Apps Script que reciba POST requests
2. Script guarda datos en hojas separadas: `Escuelas`, `Deportistas`, `Sponsors`, `HistorialDeportistas`
3. Endpoint en Next.js (`/api/forms/route.ts`) que hace POST al script
4. Variables de entorno: `GOOGLE_APPS_SCRIPT_URL`, `GOOGLE_SHEETS_ID`

## SEO y Metadata

Por página según [SEO_SEM.md](SEO_SEM.md):
- Title (50-60 chars) y meta description (140-160)
- OpenGraph tags (og:title, og:description, og:image usando logo/brand, og:url)
- Twitter cards
- Schema.org: Organization + WebSite
- sitemap.xml y robots.txt
- Favicon y apple-touch-icon usando logo
- Keywords: patinaje de velocidad, liga de patinaje, escuela de patinaje, etc.

## Analítica

Implementar según [ANALYTICS.md](ANALYTICS.md):
- Google Analytics 4 configurado
- Eventos trackeados:
  - `cta_primary_click` (Hero)
  - `cta_school_click`
  - `cta_athlete_click`
  - `cta_sponsor_click`
  - `form_school_submit`
  - `form_athlete_submit`
  - `form_sponsor_submit`
- Hook `useAnalytics` para tracking consistente

## Branding y Estilos

Según [BRAND.md](BRAND.md):
- **Colores**: 
  - Primario CTA: `#E63946` (rojo energía)
  - Fondo oscuro: `#1C1C1C` (negro carbón)
  - Blanco: `#FFFFFF`
  - Acentos: `#9D4EDD` (violeta neon), `#06D6A0` (verde neon) - usar con moderación
- **Tipografías**: Montserrat/Bebas Neue (títulos), Roboto/Open Sans (texto)
- **Principios UI**: Alto contraste, mucho espacio, secciones claras, hero visual fuerte
- **Logo**: Integrado en Header, Footer y usado como favicon/OG image

## Copy

Usar [COPY_ES.md](COPY_ES.md) como fuente de verdad. Nota: el archivo tiene algunas duplicaciones que se resolverán seleccionando la versión más completa de cada sección.

## Criterios de Aceptación

Según [PRD.md](PRD.md):
- ✅ Mobile-first, carga rápida (Lighthouse performance > 90)
- ✅ CTA visible en primer scroll
- ✅ Formularios funcionan y notifican éxito/error
- ✅ Copy coherente con tono de marca
- ✅ SEO básico completo (metadata, sitemap, OG tags)
- ✅ Todos los formularios validados y con tracking
- ✅ Cumplimiento Ley 1581 (consentimientos explícitos)
- ✅ No prometer IA avanzada ni ranking oficial
- ✅ Logo y assets de marca integrados y optimizados

## Checklist de Implementación

1. **Assets y Branding**:
   - [ ] Revisar y catalogar assets existentes en `assets/`
   - [ ] Optimizar logo (convertir a SVG o PNG optimizado)
   - [ ] Crear variantes necesarias (horizontal, vertical, icono)
   - [ ] Organizar assets en `public/images/`
   - [ ] Crear componente Logo reutilizable
   - [ ] Configurar favicon y apple-touch-icon

2. **Setup Proyecto**:
   - [ ] Setup Next.js 14+ con TypeScript, Tailwind CSS
   - [ ] Configurar estructura de carpetas
   - [ ] Configurar variables de entorno

3. **Componentes Base**:
   - [ ] Header con logo y navegación
   - [ ] Footer con logo, redes y legal
   - [ ] Section, CTAButton, layout principal

4. **Páginas**:
   - [ ] Home con todas las secciones
   - [ ] /escuelas, /sponsors, /faq, /legal

5. **Formularios y Backend**:
   - [ ] 3 formularios con validación
   - [ ] Google Apps Script y endpoint /api/forms
   - [ ] Sistema de seguimiento manual básico

6. **SEO y Performance**:
   - [ ] Metadata SEO en todas las páginas
   - [ ] OpenGraph con imagen de marca
   - [ ] sitemap.xml y robots.txt
   - [ ] Optimización de imágenes y performance

7. **Analítica**:
   - [ ] GA4 configurado
   - [ ] Eventos de tracking implementados

8. **Documentación**:
   - [ ] README.md con instrucciones
   - [ ] Documentar assets y su uso

## Notas Importantes

- **Assets**: Los 3 PNGs en `assets/` necesitan revisión para identificar logo vs otros elementos. Optimizar antes de usar en producción.
- El seguimiento manual es básico: formulario para agregar entradas que se guardan en Sheets. No requiere autenticación en MVP.
- Los formularios deben tener validación robusta y mensajes de error claros.
- Todos los CTAs deben tener tracking de eventos.
- El copy debe enfatizar que es un piloto y seguimiento manual, sin promesas de IA.
- Cumplir Ley 1581: consentimiento explícito en todos los formularios y política de privacidad accesible.
- El logo debe estar presente en Header, Footer y como favicon para reforzar identidad de marca.

## Decisiones Tomadas

- **Formularios**: Google Sheets vía Apps Script
- **Páginas opcionales**: Todas incluidas (/escuelas, /sponsors, /faq, /legal)
- **Seguimiento manual**: Incluido en MVP (perfil básico de deportista con registro manual de tiempos)
