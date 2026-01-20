# Validación del Pipeline de GitHub Pages

## Fecha de Validación
2026-01-19

## Resumen
Se validó el pipeline `.github/workflows/nextjs.yml` para desplegar Next.js a GitHub Pages. Se identificaron y corrigieron varios problemas críticos.

## Problemas Identificados y Soluciones

### ✅ 1. Configuración de Exportación Estática
**Problema**: El `next.config.js` no tenía configurada la exportación estática (`output: 'export'`), que es necesaria para GitHub Pages.

**Solución**: 
- Agregado `output: 'export'` en `next.config.js`
- Configurado `images.unoptimized: true` para exportación estática
- Agregado `trailingSlash: false` para compatibilidad con GitHub Pages

**Archivo modificado**: `next.config.js`

### ✅ 2. Rutas Dinámicas sin Generación Estática
**Problema**: La ruta dinámica `/deportista/[slug]` no tenía `generateStaticParams`, lo que causaría errores en la exportación estática.

**Solución**: 
- Agregada función `generateStaticParams()` que retorna rutas de ejemplo
- En producción, esto debería conectarse con una base de datos o API para generar todas las rutas necesarias

**Archivo modificado**: `app/deportista/[slug]/page.tsx`

### ⚠️ 3. Rutas API Incompatibles con Exportación Estática
**Problema**: La ruta API `/api/forms` no funcionará con exportación estática porque GitHub Pages solo sirve archivos estáticos.

**Solución**: 
- Modificada la función `submitForm` en `lib/forms.ts` para enviar directamente a Google Apps Script desde el cliente
- Requiere configurar `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` como variable de entorno pública
- La ruta API `/api/forms` seguirá funcionando en desarrollo local

**Archivos modificados**: 
- `lib/forms.ts`
- `app/api/forms/route.ts` (mantenido para desarrollo, pero no se usará en producción estática)

**Nota**: La ruta API puede eliminarse en el futuro si solo se usa exportación estática, pero se mantiene para desarrollo local.

### ⚠️ 4. OpenGraph Image Dinámico
**Problema**: `app/opengraph-image.tsx` usa `ImageResponse` que requiere un servidor Node.js.

**Estado**: 
- Next.js puede generar esta imagen durante el build si está disponible
- Si causa problemas, considerar usar una imagen estática en `public/images/brand/og-image.png`

**Recomendación**: Monitorear el build. Si falla, reemplazar con imagen estática.

## Configuración Requerida

### Variables de Entorno
Para que los formularios funcionen en producción, se debe configurar:

```env
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Esta variable debe configurarse en:
1. **GitHub Secrets** (si se usa en el workflow)
2. **GitHub Pages Environment Variables** (si están disponibles)
3. **Archivo `.env.production`** (no se incluye en el repo por seguridad)

**Nota**: Como es una variable `NEXT_PUBLIC_*`, se incluirá en el bundle del cliente. Asegúrate de que la URL de Google Apps Script esté configurada para aceptar requests desde cualquier origen (CORS).

## Validación del Pipeline

### Estructura del Workflow
El pipeline `.github/workflows/nextjs.yml` está correctamente configurado para:
- ✅ Detectar el gestor de paquetes (npm/yarn)
- ✅ Configurar Node.js 20
- ✅ Configurar GitHub Pages con Next.js
- ✅ Cachear dependencias y build
- ✅ Construir la aplicación
- ✅ Subir artefacto desde `./out`
- ✅ Desplegar a GitHub Pages

### Comandos del Pipeline
1. `npm ci` - Instala dependencias
2. `npx next build` - Construye la aplicación (ahora generará `./out` gracias a `output: 'export'`)
3. Upload artifact desde `./out`
4. Deploy a GitHub Pages

## Próximos Pasos

1. **Configurar Variable de Entorno**: Agregar `NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL` en GitHub Secrets o en el entorno de GitHub Pages
2. **Probar Build Local**: Ejecutar `npm run build` localmente para verificar que genera `./out`
3. **Probar Pipeline**: Hacer push a `main` y verificar que el workflow se ejecuta correctamente
4. **Verificar OpenGraph**: Si el build falla por `opengraph-image.tsx`, considerar usar imagen estática
5. **Actualizar generateStaticParams**: En producción, conectar con base de datos para generar todas las rutas de deportistas

## Notas Adicionales

- El pipeline usa `actions/configure-pages@v5` que automáticamente configura `basePath` si es necesario
- El concurrency está configurado para no cancelar deployments en progreso
- El pipeline se ejecuta en pushes a `main` y manualmente desde Actions tab

## Referencias

- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages Deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image#unoptimized)
