"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
}

export default function LocaleSwitch({ locale }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next = locale === "en" ? "es" : "en";

  function change() {
    startTransition(async () => {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={change}
      disabled={pending}
      className="text-sm uppercase hover:underline disabled:opacity-50"
      aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
    >
      {next.toUpperCase()}
    </button>
  );
}
