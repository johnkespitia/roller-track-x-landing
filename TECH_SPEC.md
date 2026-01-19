# Tech Spec (sugerido)

## Stack recomendado (simple)
- Next.js + TypeScript (o Vite React) + Tailwind.
- Deploy: Vercel/Netlify (o hosting estatico si aplica).
- Forms: Netlify Forms / Formspree / Supabase / Google Apps Script -> Sheets.
- Analytics: GA4.

## Requisitos no-funcionales
- Performance: lighthouse alto, imagenes optimizadas.
- SEO: metadata, OpenGraph, sitemap.xml, robots.txt.
- Accesibilidad: contraste, focus states, alt text.

## Entregables de dev
- Paginas segun IA.
- Componentes reusables.
- Variables de config (links redes, WhatsApp, email).
- README con pasos de deploy.

## Accesibilidad
- Contraste adecuado, labels en forms, foco visible, navegacion por teclado.

## Seguridad
- Sanitizar inputs (si hay backend).
- Honeypot/recaptcha opcional si hay spam.

## Entregables de codigo
- README con pasos run/build/deploy.
- Variables de entorno documentadas (si aplica).
- Componentes reutilizables y estructura clara.
