// Funciones para tracking de eventos con Google Analytics 4

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

// Eventos específicos según ANALYTICS.md
export const trackCTAClick = (ctaType: "primary" | "school" | "athlete" | "sponsor") => {
  trackEvent(`cta_${ctaType}_click`, {
    cta_type: ctaType,
  });
};

export const trackFormSubmit = (formType: "school" | "athlete" | "sponsor") => {
  trackEvent(`form_${formType}_submit`, {
    form_type: formType,
  });
};
