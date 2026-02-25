export type AnalyticsProps = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(eventName: string, props: AnalyticsProps = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event: eventName,
    ...props,
  };

  // Generic dataLayer support (GTM, custom pipelines)
  const w = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  };

  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(payload);
  }

  // GA4-style optional support
  if (typeof w.gtag === "function") {
    w.gtag("event", eventName, props);
  }
}
