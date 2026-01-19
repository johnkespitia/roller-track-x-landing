# Procesamiento de Assets de Marca

## Estado Actual

Los assets de logo se encuentran en `assets/` con nombres genéricos:
- `ChatGPT Image 19 ene 2026, 11_15_24 a.m..png`
- `ChatGPT Image 19 ene 2026, 11_15_31 a.m..png`
- `ChatGPT Image 19 ene 2026, 11_15_34 a.m..png`

## Proceso de Procesamiento

### Paso 1: Revisar Assets

1. Abre cada PNG en `assets/` y determina qué contiene:
   - ¿Es logo horizontal (ancho > alto)?
   - ¿Es logo vertical (alto > ancho)?
   - ¿Es un icono (cuadrado o casi cuadrado)?
   - ¿Qué elementos gráficos tiene?

2. Anota qué archivo corresponde a qué variante

### Paso 2: Optimizar Imágenes

**Opción A: Usar TinyPNG (Recomendado)**
1. Ve a https://tinypng.com/
2. Sube cada PNG
3. Descarga la versión optimizada

**Opción B: Usar Squoosh**
1. Ve a https://squoosh.app/
2. Sube cada imagen
3. Ajusta la calidad (recomendado: 80-90%)
4. Descarga la versión optimizada

**Opción C: Usar línea de comandos (ImageMagick)**
```bash
# Instalar ImageMagick (si no lo tienes)
# macOS: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Optimizar una imagen
magick input.png -strip -quality 85 output.png
```

### Paso 3: Crear Variantes Necesarias

Necesitas crear estas variantes:

#### `logo-horizontal.png`
- **Uso**: Header de la página
- **Dimensiones recomendadas**: 240x80px o proporción similar
- **Formato**: PNG con transparencia (si aplica)
- **Ubicación**: `public/images/logo/logo-horizontal.png`

#### `logo-vertical.png`
- **Uso**: Footer de la página
- **Dimensiones recomendadas**: 120x160px o proporción similar
- **Formato**: PNG con transparencia (si aplica)
- **Ubicación**: `public/images/logo/logo-vertical.png`

#### `logo-icon.png`
- **Uso**: Favicon (aunque actualmente se genera dinámicamente)
- **Dimensiones**: 32x32px o 64x64px
- **Formato**: PNG
- **Ubicación**: `public/images/logo/logo-icon.png`

### Paso 4: Crear og-image.png

**Dimensiones**: 1200x630px (ratio 1.91:1)

**Herramientas recomendadas**:
- **Canva**: https://www.canva.com/ (plantilla "Facebook Post")
- **Figma**: Crear frame de 1200x630px
- **Photoshop**: Nuevo documento 1200x630px

**Contenido sugerido**:
- Logo RTX (centrado o esquina superior izquierda)
- Tagline: "The Next Revolution of Speed"
- Texto: "Eventos, comunidad y seguimiento deportivo"
- Colores de marca: #E63946 (rojo), #1C1C1C (negro)

**Ubicación**: `public/images/brand/og-image.png`

**Nota**: Actualmente se genera dinámicamente con `app/opengraph-image.tsx`, pero puedes crear una imagen estática si prefieres.

### Paso 5: Organizar Archivos

```bash
# Mover archivos optimizados a las carpetas correctas
cp logo-horizontal-optimizado.png public/images/logo/logo-horizontal.png
cp logo-vertical-optimizado.png public/images/logo/logo-vertical.png
cp logo-icon-optimizado.png public/images/logo/logo-icon.png
cp og-image.png public/images/brand/og-image.png
```

### Paso 6: Verificar

1. Inicia el servidor de desarrollo: `npm run dev`
2. Verifica que el logo aparece en:
   - Header (logo horizontal)
   - Footer (logo vertical)
3. Verifica og:image:
   - Usa https://www.opengraph.xyz/ para probar
   - O comparte la URL en Twitter/Facebook para ver preview

## Script de Ayuda

Ejecuta el script para crear la estructura de carpetas:

```bash
chmod +x scripts/process-assets.sh
./scripts/process-assets.sh
```

## Checklist

- [ ] Revisados los 3 PNGs en `assets/`
- [ ] Creado `logo-horizontal.png` (optimizado)
- [ ] Creado `logo-vertical.png` (optimizado)
- [ ] Creado `logo-icon.png` (optimizado, 32x32 o 64x64px)
- [ ] Creado `og-image.png` (1200x630px)
- [ ] Archivos movidos a `public/images/logo/` y `public/images/brand/`
- [ ] Verificado que los logos aparecen en Header y Footer
- [ ] Verificado og:image en redes sociales

## Notas Técnicas

- El componente `Logo.tsx` ya está configurado para usar estas imágenes
- Next.js optimiza automáticamente las imágenes (WebP, AVIF)
- Los favicons se generan dinámicamente, pero puedes actualizar `app/icon.tsx` para usar `logo-icon.png` si prefieres
- El og-image se genera dinámicamente, pero puedes deshabilitarlo y usar la imagen estática si prefieres
