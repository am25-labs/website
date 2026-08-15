import { baseMetadata, getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import LocalizedLegalTabs from "@/components/legal/LocalizedLegalTabs";
import { getTerms } from "@/lib/plank/fetch";
import PageContainer from "@/components/PageContainer";
import { getCopy } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Terms & conditions";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return getPageMetadata(locale, getCopy(locale).terms, "/terms");
}

export default async function TermsPage() {
  const locale = await getLocale();
  const page = await getTerms({ locale });

  return (
    <PageContainer>
      <LocalizedLegalTabs title={getCopy(locale).terms} page={page} locale={locale} />
    </PageContainer>
  );
}
