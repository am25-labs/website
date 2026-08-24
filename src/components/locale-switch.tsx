"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
}

export default function LocaleSwitch({ locale }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const next = locale === "en" ? "es" : "en";
  const isDraft = pathname.startsWith("/draft/");
  const href = isDraft
    ? `${pathname}?${new URLSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        locale: next,
      })}`
    : pathname.replace(/^\/(en|es)(?=\/|$)/, `/${next}`);

  return (
    <Link
      href={href}
      className="text-sm uppercase border p-2 hover:bg-accent"
      aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
    >
      {next.toUpperCase()}
    </Link>
  );
}
