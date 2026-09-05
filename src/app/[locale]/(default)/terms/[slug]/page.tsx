import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalizedLegalTabs from "@/components/legal/localized-legal-tabs";
import {
  getSingleTermsOfService,
  getTermsOfService,
} from "@/lib/plank/fetch";
import { getPageMetadata } from "@/lib/metadata";
import PageContainer from "@/components/page-container";
import { getRouteLocale } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const { data: terms } = await getTermsOfService({ locale: "en" });

  return ["es", "en"].flatMap((locale) =>
    terms.map((term) => ({ locale, slug: term.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRouteLocale(params);
  const term = await getSingleTermsOfService(slug, { locale });

  if (!term) {
    return getPageMetadata(locale, "Terms & conditions", "/terms");
  }

  return getPageMetadata(locale, term.title, `/terms/${slug}`);
}

export default async function TermsEntryPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getRouteLocale(params);
  const term = await getSingleTermsOfService(slug, { locale });

  if (!term) {
    notFound();
  }

  return (
    <PageContainer>
      <LocalizedLegalTabs
        title={term.title}
        page={term}
        locale={locale}
      />
    </PageContainer>
  );
}
