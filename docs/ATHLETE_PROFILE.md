# Sistema de Seguimiento Manual - AthleteProfile

## Descripción

El componente `AthleteProfile` permite a los deportistas llevar un seguimiento manual de su historial deportivo. Es parte del MVP y funciona de forma simple y directa.

## Funcionalidades

### 1. Perfil Básico
- Muestra información básica del deportista:
  - Nombre
  - Categoría/Edad
  - Ciudad
  - Club (opcional)
  - Email/WhatsApp (opcional)

### 2. Agregar Entradas al Historial
- Formulario para registrar:
  - Fecha de la competencia
  - Nombre de la prueba
  - Distancia (ej: 500m, 1000m)
  - Tiempo (ej: 45.2s, 1:23.45)
  - Evento (opcional)
  - Lugar (opcional)
  - Notas (opcional)
  - Link a video (opcional)

### 3. Vista del Historial
- Lista todas las entradas ordenadas por fecha (más recientes primero)
- Muestra información completa de cada entrada
- Links a videos si están disponibles

### 4. Estadísticas Básicas
- **Mejores Marcas**: Mejor tiempo por distancia
- **Promedio Mensual**: Promedio de tiempos del último mes

## Páginas Disponibles

### `/mi-perfil`
Página principal para que los deportistas accedan a su perfil.

**Funcionamiento en MVP**:
- Usa `localStorage` para persistir datos básicos
- Si no hay perfil, muestra formulario de registro
- Después del registro, muestra el perfil con opción de agregar entradas

**En Producción**:
- Se conectaría con autenticación (email/WhatsApp)
- Datos vendrían de una base de datos o API
- Historial se cargaría desde Google Sheets o base de datos

### `/deportista/[slug]`
Página de ejemplo para perfiles públicos (opcional en MVP).

## Almacenamiento

### MVP (Actual)
- **Datos básicos**: `localStorage` (solo en el navegador)
- **Historial**: Google Sheets vía Google Apps Script
  - Hoja: `HistorialDeportistas`
  - Se guarda cada entrada con timestamp

### Producción (Futuro)
- Base de datos (Supabase, Firebase, etc.)
- Autenticación de usuarios
- API REST para CRUD de historial

## Integración con Google Sheets

El historial se guarda en Google Sheets usando el mismo sistema que los formularios:

1. **Tipo**: `athlete_history`
2. **Hoja**: `HistorialDeportistas`
3. **Columnas**:
   - Timestamp
   - Nombre Deportista
   - Email
   - WhatsApp
   - Fecha
   - Prueba
   - Distancia
   - Tiempo
   - Evento
   - Lugar
   - Notas
   - Link Video

## Uso del Componente

```tsx
import AthleteProfile, { AthleteBasicInfo } from "@/components/AthleteProfile";

const athleteInfo: AthleteBasicInfo = {
  nombre: "Juan Pérez",
  edadCategoria: "Juvenil",
  ciudad: "Bogotá",
  club: "Club de Patinaje",
  email: "juan@example.com",
};

<AthleteProfile athleteInfo={athleteInfo} />
```

## Limitaciones del MVP

1. **Sin autenticación**: Cualquiera puede agregar entradas (se identifica por nombre/email)
2. **Sin validación de datos**: Los tiempos no se validan automáticamente
3. **Sin edición/eliminación**: Solo se pueden agregar entradas, no editar ni eliminar
4. **Estadísticas básicas**: Solo mejores marcas y promedio mensual
5. **Sin búsqueda/filtros**: El historial se muestra completo

## Mejoras Futuras

- [ ] Autenticación de usuarios
- [ ] Edición y eliminación de entradas
- [ ] Validación de formatos de tiempo
- [ ] Gráficos de progreso
- [ ] Comparación con otros deportistas
- [ ] Exportar historial (PDF, Excel)
- [ ] Notificaciones de nuevos records
- [ ] Integración con dispositivos (smartwatch, etc.)

## Notas Técnicas

- El componente es completamente client-side en el MVP
- Las estadísticas se calculan en tiempo real desde el historial
- El ordenamiento por fecha es automático
- Los tiempos se comparan como strings (mejora futura: parsear a segundos)
