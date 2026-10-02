type EventValue = string | number | boolean | null;

export function track(
  event: string,
  data?: Record<string, EventValue>,
  attempt = 0,
) {
  if (typeof window === "undefined") return;

  if (window.umami) {
    window.umami.track(event, data);
    return;
  }

  if (attempt >= 20) return;

  window.setTimeout(() => track(event, data, attempt + 1), 250);
}
