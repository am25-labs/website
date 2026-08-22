"use client";

import { useEffect } from "react";

interface PreviewStateResponse {
  triggeredAt: string | null;
  previewUrl: string | null;
}

interface PreviewAutoRefreshProps {
  contentType: string;
  slug: string;
}

export default function PreviewAutoRefresh({
  contentType,
  slug,
}: PreviewAutoRefreshProps) {
  useEffect(() => {
    let cancelled = false;
    const storageKey = `plank-preview:${contentType}:${slug}`;

    async function poll() {
      try {
        const response = await fetch(
          `/api/plank/preview-state/${contentType}/${slug}`,
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          return;
        }

        const state = (await response.json()) as PreviewStateResponse;

        if (!state.triggeredAt) {
          return;
        }

        const lastTriggeredAt = window.localStorage.getItem(storageKey);

        if (!lastTriggeredAt) {
          window.localStorage.setItem(storageKey, state.triggeredAt);
          return;
        }

        if (state.triggeredAt === lastTriggeredAt) {
          return;
        }

        window.localStorage.setItem(storageKey, state.triggeredAt);

        if (state.previewUrl && state.previewUrl !== window.location.href) {
          window.location.assign(state.previewUrl);
          return;
        }

        window.location.reload();
      } catch {}
    }

    const interval = window.setInterval(() => {
      if (!cancelled) {
        void poll();
      }
    }, 2000);

    void poll();

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [contentType, slug]);

  return null;
}
