# PLAN_FASES — Roller Track X: Evolución a portal de contenido y comunidad

> Este plan describe la evolución de `roller-track-x` (Next.js, landing page)
> hacia un portal de contenido y comunidad del patinaje de velocidad.
> El portal se integra con `skate-manager` (Laravel API + MySQL) para leads
> y datos de deportistas.

## Estado de las fases

| Fase | Descripción | Estado | Notas |
|------|-------------|--------|-------|
| 0 | Wiring (CORS, env, `lib/db.ts`, `lib/leads.ts`) | ✅ | `mysql2` instalado, smoke test listo |
| 1 | Menú nuevo + placeholders | ✅ | Header con dropdown Explorar, 10 placeholders |
| 2 | Sistema de contenido MDX | ✅ | `lib/content/`, 3 artículos de ejemplo |
| 3 | Blog completo | ✅ | Listado, búsqueda, categorías, tags, relacionados |
| 4 | Página Explorar (hub) | ✅ | 9 cards con conteos por sección |
| 5.1 | Laravel: leads + CORS + tests | ✅ | 11/11 tests pasando, CORS verificado |
| 5.2 | Refactor de 3 forms a `submitLead` | ✅ | `lib/forms.ts` y `/api/forms` eliminados |
| 6 | Tabla `leads` | ✅ | Migración aplicada, FKs CRM-ready |
| 7 | Arquitectura CRM-ready | ✅ | `docs/CRM_FUTURO.md` con roadmap |
| 8 | SEO (Article JSON-LD, RSS, sitemap) | ✅ | Sitemap dinámico, RSS en `/feed.xml` |
| 9-10 | Optimizaciones y código | ✅ | 0 errores de lint, 0 errores TS, 44 rutas estáticas |

## Stack final

- **Front**: Next.js 14 (App Router, export estático), TypeScript, Tailwind, framer-motion.
- **Backend**: Laravel 11 + MySQL 8 (en `skate-manager/api`).
- **Contenido**: MDX en `content/{blog,news,guides,events,clubs,schools,athletes}/`.
- **Build**: `output: 'export'` se mantiene. 44 rutas pre-renderizadas.

## Cambios clave

### Estructura de carpetas nueva

```
roller-track-x/
├── app/
│   ├── blog/                       # Blog
│   │   ├── page.tsx                # Listado con filtros client-side
│   │   ├── [slug]/page.tsx         # Detalle de artículo
│   │   ├── buscar/page.tsx         # Búsqueda client-side
│   │   ├── categoria/[category]/   # Filtro estático por categoría
│   │   └── tag/[tag]/              # Filtro estático por tag
│   ├── explorar/page.tsx           # Hub del ecosistema
│   ├── eventos/comunidad/.../page.tsx  # 9 placeholders
│   ├── contacto/page.tsx           # NUEVO: FormContact
│   ├── feed.xml/route.ts           # RSS 2.0
│   └── sitemap.ts                  # Sitemap dinámico con blog posts
├── content/                        # NUEVO: contenido MDX
│   ├── blog/{slug}.mdx
│   ├── news/{slug}.mdx
│   └── guides/...
├── lib/
│   ├── content/                    # NUEVO: lector MDX
│   │   ├── types.ts
│   │   ├── reader.ts               # getAll, getBySlug, getRelated, getCategories, getTags
│   │   ├── meta.ts                 # buildArticleMetadata, articleJsonLd
│   │   └── format.ts               # formatDate (es-CO)
│   ├── leads.ts                    # NUEVO: LeadService (cliente HTTP)
│   ├── db.ts                       # NUEVO: cliente MySQL build-time
│   └── constants.ts                # ACTUALIZADO: ROUTES + EXPLORAR_LABELS
├── components/
│   ├── Header.tsx                  # REESCRITO: dropdown Explorar
│   ├── Footer.tsx                  # ACTUALIZADO: 4 columnas
│   ├── FormSchool.tsx              # REFACTOR: usa submitLead
│   ├── FormSponsor.tsx             # REFACTOR: usa submitLead
│   ├── FormAthlete.tsx             # REFACTOR: usa submitLead
│   ├── FormContact.tsx             # NUEVO
│   ├── PlaceholderPage.tsx         # NUEVO: página "Próximamente"
│   └── blog/                       # NUEVO
│       ├── BlogCard.tsx
│       ├── BlogList.tsx
│       └── SearchInput.tsx
└── scripts/
    └── check-api.ts                # NUEVO: smoke test contra /public/leads

skate-manager/
├── api/
│   ├── app/Http/Controllers/Api/
│   │   ├── PublicLeadController.php        # NUEVO
│   │   └── PublicAthleteController.php     # NUEVO
│   ├── app/Models/
│   │   ├── Lead.php                        # NUEVO
│   │   └── Student.php                     # ACTUALIZADO: publication_status
│   ├── app/Services/
│   │   └── LeadService.php                 # NUEVO
│   ├── database/migrations/
│   │   ├── 2026_07_31_000001_create_leads_table.php
│   │   └── 2026_07_31_000002_add_publication_to_students.php
│   ├── routes/api.php                      # ACTUALIZADO: rutas /public/*
│   ├── config/cors.php                     # NUEVO: lee CORS_ORIGINS
│   ├── bootstrap/app.php                   # ACTUALIZADO: removido CorsMiddleware custom
│   └── tests/Feature/Api/
│       ├── PublicLeadTest.php              # NUEVO (11 tests)
│       └── PublicAthleteTest.php           # NUEVO (3 tests)
└── docs/
    └── CRM_FUTURO.md                       # NUEVO: roadmap CRM
```

### Endpoints públicos nuevos

- `GET  /api/public/ping` — healthcheck.
- `POST /api/public/leads` — captura de leads (rate-limit 30/min).
- `GET  /api/public/athletes` — deportistas aprobados (rate-limit 60/min).
- `GET  /api/public/athletes/{slug}` — detalle de un deportista aprobado.

### Variables de entorno

**`roller-track-x/.env.local`**:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:4000
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_LEADS_ENDPOINT=/public/leads
DB_HOST=127.0.0.1
DB_PORT=3308
DB_DATABASE=skate_manager
DB_USERNAME=skate
DB_PASSWORD=skate
```

**`skate-manager/api/.env`** (nuevo):
```env
CORS_ORIGINS=http://localhost:3000,http://localhost:4000,https://www.rollertrackx.com
```

## Cómo desarrollar

### Levantar todo

```bash
# 1. Skate Manager API + MySQL
cd skate-manager
docker compose up -d mysql minio minio-init mailpit api

# 2. Roller Track X (front)
cd ../roller-track-x
cp env.local.example .env.local
npm install
npm run dev
# → http://localhost:4000
```

### Verificar el flujo de leads

```bash
# Smoke test desde la línea de comandos
cd roller-track-x
node --env-file=.env.local --import tsx scripts/check-api.ts
```

O desde un formulario en el navegador:
1. Ir a http://localhost:4000/escuelas
2. Llenar el formulario y enviar
3. Verificar en la DB:
   ```sql
   SELECT * FROM leads ORDER BY id DESC LIMIT 1;
   ```

### Agregar un artículo al blog

1. Crear `content/blog/mi-articulo.mdx` con frontmatter:
   ```mdx
   ---
   title: "Mi artículo"
   description: "Resumen en una línea"
   date: 2026-08-01
   author: "Tu Nombre"
   category: "general"
   tags: ["ejemplo", "demo"]
   image: "/images/og-image.png"
   draft: false
   ---

   # Mi artículo

   Contenido en MDX…
   ```
2. Rebuild: `npm run build`
3. Aparece automáticamente en `/blog`, `/blog/categoria/{category}`, `/blog/tag/{tag}`,
   `/sitemap.xml`, `/feed.xml`.

## Métricas de éxito (90 días)

- ≥ 10 escuelas interesadas (leads tipo `school`).
- ≥ 50 deportistas registrados (leads tipo `athlete`).
- ≥ 1 sponsor en conversación (leads tipo `sponsor`).
- ≥ 1 evento piloto con landing `/eventos/[slug]`.
- ≥ 5 artículos en el blog.
- 0 errores en consola, Lighthouse > 90.

## Próximos pasos (post-MVP)

1. **CRM UI** en `skate-manager/apps/web` (panel admin).
2. **Workflow de publicación de deportistas** (escuela pide → admin aprueba).
3. **Búsqueda global** cross-tipo (no solo blog).
4. **i18n** (inglés además de español).
5. **Newsletter** (captura de emails con consentimiento separado).
6. **Migración a Next.js server** si el contenido crece > 1000 artículos
   o se necesitan comentarios/búsqueda server-side.

## Decisiones congeladas

- **Sin WordPress / CMS externo** (decidido por el dueño del proyecto).
- **Deploy de `roller-track-x` = export estático** (GitHub Pages / Vercel static).
- **Leads van al Laravel API** (misma MySQL que `skate-manager`).
- **Estilo visual intacto** (paleta `#E63946`, `#1C1C1C`, `#FFFFFF`).
- **Cumplimiento Ley 1581/2012** (consentimiento explícito, honeypot, IP/UA registrados).
