# Roller Track X — Portal

Portal de contenido y comunidad del patinaje de velocidad. Evolucionó desde
una landing page simple hacia un ecosistema con blog, formularios de leads,
eventos, escuelas, deportistas, clubes y rankings.

> 📋 **Roadmap completo y arquitectura**: ver [`PLAN_FASES.md`](./PLAN_FASES.md).

## Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Estilos**: Tailwind CSS + framer-motion
- **Contenido**: Markdown/MDX en `/content` (versionado en Git, sin CMS)
- **Leads**: `skate-manager` Laravel API + MySQL (misma DB)
- **Analítica**: Google Analytics 4
- **Deploy**: GitHub Pages (export estático)

## Desarrollo

### Prerrequisitos

- Node.js 20+
- Acceso a la API de `skate-manager` (Docker o URL remota)

### Instalación

```bash
npm install
cp env.local.example .env.local
# Edita .env.local con NEXT_PUBLIC_API_BASE_URL apuntando a tu API
```

### Variables de entorno

```env
NEXT_PUBLIC_BASE_URL=http://localhost:4000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
DB_HOST=127.0.0.1          # build-time only
DB_PORT=3308
DB_DATABASE=skate_manager
DB_USERNAME=skate
DB_PASSWORD=skate
```

### Levantar

```bash
# 1. API Laravel + MySQL (skate-manager)
cd ../skate-manager && docker compose up -d

# 2. Front
npm run dev   # http://localhost:4000
```

### Build de producción

```bash
npm run build
# Genera /out (export estático) listo para GitHub Pages
```

## Estructura

```
roller-track-x/
├── app/                    # Páginas y rutas (App Router)
│   ├── blog/               # Blog con MDX
│   ├── explorar/           # Hub del ecosistema
│   ├── feed.xml/           # RSS
│   ├── sitemap.ts          # Sitemap dinámico
│   └── ...
├── components/             # Componentes React
├── content/                # Artículos MDX (blog, news, guides, etc.)
├── lib/
│   ├── content/            # Lector MDX, metadata, SEO
│   ├── leads.ts            # Cliente HTTP para /api/public/leads
│   ├── db.ts               # Cliente MySQL build-time
│   ├── analytics.ts        # Tracking GA4
│   └── constants.ts        # Rutas y marca
├── public/                 # Assets estáticos
├── PLAN_FASES.md           # Roadmap y arquitectura
└── .github/workflows/      # CI/CD → GitHub Pages
```

## Agregar un artículo

1. Crear `content/blog/mi-articulo.mdx` con frontmatter:
   ```mdx
   ---
   title: "Título"
   description: "Resumen corto"
   date: 2026-08-01
   author: "Tu Nombre"
   category: "general"
   tags: ["ejemplo"]
   draft: false
   ---

   Contenido en MDX…
   ```
2. `npm run build` (necesario para export estático).
3. Aparece en `/blog`, `/blog/categoria/{category}`, `/blog/tag/{tag}`,
   `/sitemap.xml` y `/feed.xml`.

## SEO

- ✅ Metadata por página (title, description, canonical, OG, Twitter)
- ✅ JSON-LD `Article` por post
- ✅ Sitemap dinámico en `/sitemap.xml`
- ✅ RSS en `/feed.xml`
- ✅ Robots.txt en `/public/robots.txt`
- ✅ OpenGraph image por página

## Compliance

- Ley 1581/2012 (Colombia): consentimiento explícito, IP/UA registrados,
  honeypot en formularios.
- Cumplimiento RGPD-ready (consentimiento separado del submit).

## Deploy

Push a `main` → GitHub Actions (`/.github/workflows/nextjs.yml`) →
build + deploy a GitHub Pages.

## Documentación adicional

- [`PLAN_FASES.md`](./PLAN_FASES.md) — roadmap completo, estado por fase
- `docs/ASSETS.md` — convenciones de assets
- `docs/SETUP_ENV.md` — variables de entorno
