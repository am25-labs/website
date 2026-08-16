import PageShell from "@/components/PageShell";
import { isLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function YellowLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <PageShell variant="yellow" locale={locale}>{children}</PageShell>;
}
