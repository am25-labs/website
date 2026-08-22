import { baseMetadata, getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import LocalizedLegalTabs from "@/components/legal/localized-legal-tabs";
import { getCopyright } from "@/lib/plank/fetch";
import PageContainer from "@/components/page-container";
import { getCopy, getRouteLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Copyright";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, getCopy(locale).copyright, "/copyright");
}

export default async function CopyrightPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const page = await getCopyright({ locale });

  return (
    <PageContainer>
      <LocalizedLegalTabs title={getCopy(locale).copyright} page={page} locale={locale} />
    </PageContainer>
  );
}
