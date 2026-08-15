import { baseMetadata, getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import LocalizedLegalTabs from "@/components/legal/LocalizedLegalTabs";
import { getCopyright } from "@/lib/plank/fetch";
import PageContainer from "@/components/PageContainer";
import { getCopy } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Copyright";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return getPageMetadata(locale, getCopy(locale).copyright, "/copyright");
}

export default async function CopyrightPage() {
  const locale = await getLocale();
  const page = await getCopyright({ locale });

  return (
    <PageContainer>
      <LocalizedLegalTabs title={getCopy(locale).copyright} page={page} locale={locale} />
    </PageContainer>
  );
}
