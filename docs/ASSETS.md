# Gestión de Assets

## Ubicación

Los assets de marca deben estar en:
- `public/images/logo/` - Logos
- `public/images/brand/` - Otros elementos gráficos

## Assets Existentes

En la carpeta `assets/` hay 3 PNGs generados por ChatGPT que necesitan revisión:

1. `ChatGPT Image 19 ene 2026, 11_15_24 a.m..png`
2. `ChatGPT Image 19 ene 2026, 11_15_31 a.m..png`
3. `ChatGPT Image 19 ene 2026, 11_15_34 a.m..png`

## Tareas Pendientes

1. **Revisar assets**: Identificar qué contiene cada PNG (logo principal, variantes, elementos gráficos)
2. **Optimizar**: 
   - Convertir a SVG si es posible (mejor para web)
   - Si se mantiene PNG: optimizar con ImageOptim, Squoosh o similar
   - Generar versiones WebP (Next.js lo maneja automáticamente)
3. **Organizar**: 
   - Mover assets optimizados a `public/images/logo/`
   - Renombrar con nombres descriptivos:
     - `logo-horizontal.png` (o `.svg`)
     - `logo-vertical.png` (o `.svg`)
     - `logo-icon.png` (o `.svg`) - para favicon
4. **Configurar favicon**: 
   - Crear `favicon.ico` desde el logo icono
   - Agregar `apple-touch-icon.png`

## Uso en Componentes

El componente `Logo.tsx` está configurado para usar:
- `/images/logo/logo-horizontal.png` - Variante horizontal
- `/images/logo/logo-vertical.png` - Variante vertical
- `/images/logo/logo-icon.png` - Variante icono

Si los assets no existen, el componente mostrará un fallback de texto.

## OpenGraph Image

Para las meta tags de OpenGraph, se recomienda crear:
- `public/images/og-image.png` (1200x630px) con el logo y texto de marca
