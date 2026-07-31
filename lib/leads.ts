/**
 * LeadService — cliente único para el envío de leads.
 *
 * Centraliza TODA captura de leads (escuelas, sponsors, atletas, contacto, etc.)
 * hacia el endpoint público del Laravel API de `skate-manager`.
 *
 * Reemplaza el envío a Google Apps Script. Mantiene la misma forma de uso que
 * `lib/forms.ts` (antiguo) para que el refactor de los formularios sea mínimo.
 */

export type LeadType =
  | "school"
  | "sponsor"
  | "athlete"
  | "parent"
  | "coach"
  | "contact";

export type LeadStatus = "NEW" | "CONTACTED" | "QUALIFIED" | "CONVERTED" | "REJECTED";

export interface LeadInput {
  type: LeadType;
  name?: string | null;
  organization?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  interest?: string | null;
  message?: string | null;
  /** Ruta o identificador de la página de origen (ej. "/escuelas", "/sponsors") */
  source_page: string;
  /** Consentimiento Ley 1581/2012 (Colombia). Debe ser true para enviar. */
  consent: boolean;
  /** Honeypot — si viene con contenido, se descarta silenciosamente. */
  website?: string;
  /** Payload crudo adicional (mapeo de campos legacy) que se guarda en `metadata`. */
  metadata?: Record<string, unknown>;
}

export interface LeadResult {
  ok: boolean;
  status?: number;
  error?: string;
  /** ID devuelto por el backend cuando el envío fue exitoso. */
  leadId?: number;
}

function apiBaseUrl(): string {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000/api/v1"
  );
}

function leadsPath(): string {
  return process.env.NEXT_PUBLIC_LEADS_ENDPOINT ?? "/public/leads";
}

/**
 * Envía un lead al endpoint público del Laravel API.
 * Devuelve `{ ok: true }` si el backend respondió 2xx, `{ ok: false, error }` en caso contrario.
 * NUNCA lanza excepciones — el caller solo necesita revisar `ok`.
 */
export async function submitLead(input: LeadInput): Promise<LeadResult> {
  // Honeypot: si el bot completó el campo oculto, abortar silenciosamente.
  if (input.website && input.website.trim().length > 0) {
    return { ok: true };
  }

  if (!input.consent) {
    return { ok: false, error: "Debes aceptar la política de privacidad." };
  }

  const url = `${apiBaseUrl()}${leadsPath()}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        type: input.type,
        name: input.name ?? null,
        organization: input.organization ?? null,
        email: input.email ?? null,
        phone: input.phone ?? null,
        city: input.city ?? null,
        interest: input.interest ?? null,
        message: input.message ?? null,
        source_page: input.source_page,
        consent: input.consent,
        metadata: input.metadata ?? {},
      }),
    });

    const text = await response.text();
    let parsed: { success?: boolean; error?: string; leadId?: number; id?: number } = {};
    try {
      parsed = text ? JSON.parse(text) : {};
    } catch {
      // respuesta no es JSON
    }

    if (response.ok && (parsed.success === true || response.status === 201)) {
      return {
        ok: true,
        status: response.status,
        leadId: parsed.leadId ?? parsed.id,
      };
    }

    return {
      ok: false,
      status: response.status,
      error: parsed.error || `Error ${response.status} al enviar el formulario`,
    };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Error de red",
    };
  }
}

/** Healthcheck rápido del endpoint público. */
export async function pingLeadsEndpoint(): Promise<LeadResult> {
  const url = `${apiBaseUrl()}/public/ping`;
  try {
    const r = await fetch(url, { method: "GET" });
    return { ok: r.ok, status: r.status, error: r.ok ? undefined : `HTTP ${r.status}` };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Error de red" };
  }
}
