import { notFound } from "next/navigation";
import { renderDraftPreview } from "@/lib/plank/draft";
import { defaultLocale, isLocale } from "@/lib/i18n";

export const metadata = {
  robots: { index: false, follow: false },
};

interface DraftEntryPageProps {
  params: Promise<{ contentType: string; slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}

export default async function DraftEntryPage({
  params,
  searchParams,
}: DraftEntryPageProps) {
  const { contentType, slug } = await params;
  const { locale: requestedLocale } = await searchParams;
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;
  const preview = await renderDraftPreview(contentType, slug, locale);

  if (!preview) {
    notFound();
  }

  return preview;
}
