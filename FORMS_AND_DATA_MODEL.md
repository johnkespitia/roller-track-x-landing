# Formularios y modelo de datos (MVP)

Nota: en el MVP se puede guardar en: Google Sheets / Airtable / Supabase / Email. No requiere backend complejo.

## Form 1: Escuela / Club (Lead)
Campos requeridos:
- Nombre de la escuela/club
- Ciudad
- Nombre del contacto
- Rol (director/entrenador/otro)
- WhatsApp o email
Campos opcionales:
- Numero de deportistas
- Interes: piloto / eventos / seguimiento / sponsorship
- Comentarios

## Form 2: Deportista / Familia (Registro)
Requeridos:
- Nombre completo
- Edad/categoria
- Ciudad
- Club (si aplica)
- WhatsApp o email
Opcionales:
- Distancias principales
- Mejor tiempo reciente (texto)
- Link a video (YouTube/Drive/IG)

## Form 3: Sponsor
Requeridos:
- Empresa
- Contacto
- Email/WhatsApp
- Interes (evento, digital, ... )
Opcionales:
- Presupuesto estimado
- Objetivo de marca

## Modelo de Perfil Deportivo (manual, futuro)
Entidad: AthleteProfile
- athleteId
- nombre, ciudad, club, categoria
- pruebas[] (distancia, tiempo, fecha, lugar)
- videos[] (url, fecha, nota)
- notas tecnicas
- consentimientos (datos, imagen)

## Form 2: Deportista / Familia (Registro)
Requeridos:
- Nombre del deportista
- Edad o categoria
- Ciudad
- Escuela/club (si aplica)
- WhatsApp o email
Opcionales:
- Distancias favoritas (200/500/1000/etc)
- Mejor tiempo (texto)
- Link de video (YouTube/Drive/IG)
- Objetivo (texto corto)

## Form 3: Sponsor (Lead)
Requeridos:
- Empresa/marca
- Contacto
- Email/WhatsApp
- Interes (evento / contenido / becas)
Opcionales:
- Presupuesto aproximado / tipo de apoyo

## Modelo “Perfil de deportista” (manual)
- Datos basicos: nombre, categoria, club, ciudad
- Historial: lista de entradas {fecha, prueba, distancia, tiempo, evento/lugar, notas, link video}
- Medidas derivadas: vel promedio = distancia/tiempo (calculable)

## Consentimiento (requerido)
- Checkbox: acepto terminos y politica de privacidad; autorizo uso de datos para contacto y estadisticas agregadas.

## Seguimiento gratuito manual (concepto)
Si se implementa en MVP, hacerlo simple:
- Perfil publico/privado (segun alcance).
- Registro manual de marcas (tabla): fecha, prueba/distancia, tiempo, lugar, notas, link video.
- Estadisticas basicas calculadas: mejor marca por distancia, promedio mensual.

## Legal (resumen)
- Consentimiento expreso para uso de datos e imagen.
- Politica de privacidad (Ley 1581/2012 CO) y contacto para eliminar datos.
