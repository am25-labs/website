import { baseMetadata, getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import LocalizedLegalTabs from "@/components/legal/localized-legal-tabs";
import { getTerms } from "@/lib/plank/fetch";
import PageContainer from "@/components/page-container";
import { getCopy, getRouteLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Terms & conditions";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, getCopy(locale).terms, "/terms");
}

export default async function TermsPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const page = await getTerms({ locale });

  return (
    <PageContainer>
      <LocalizedLegalTabs title={getCopy(locale).terms} page={page} locale={locale} />
    </PageContainer>
  );
}
