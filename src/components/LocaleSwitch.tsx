"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
}

export default function LocaleSwitch({ locale }: Props) {
  const pathname = usePathname();
  const next = locale === "en" ? "es" : "en";
  const href = pathname.replace(/^\/(en|es)(?=\/|$)/, `/${next}`);

  return (
    <Link
      href={href}
      className="text-sm uppercase hover:underline"
      aria-label={locale === "en" ? "Cambiar a español" : "Switch to English"}
    >
      {next.toUpperCase()}
    </Link>
  );
}
