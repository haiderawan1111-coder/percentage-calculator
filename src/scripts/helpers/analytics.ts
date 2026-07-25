export interface AnalyticsEvent {
  name: string;
  data?: Record<string, unknown>;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: AnalyticsEvent) {
  // Google Tag Manager / GA4
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: event.name,
      ...event.data,
    });
  }

  // Development logging
  if (import.meta.env.DEV) {
    console.info("[Analytics]", event.name, event.data ?? {});
  }
}