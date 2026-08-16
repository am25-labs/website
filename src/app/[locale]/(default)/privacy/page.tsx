import { baseMetadata, getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import LocalizedLegalTabs from "@/components/legal/LocalizedLegalTabs";
import { getPrivacy } from "@/lib/plank/fetch";
import PageContainer from "@/components/PageContainer";
import { getCopy, getRouteLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Privacy";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, getCopy(locale).privacy, "/privacy");
}

export default async function PrivacyPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const page = await getPrivacy({ locale });

  return (
    <PageContainer>
      <LocalizedLegalTabs title={getCopy(locale).privacy} page={page} locale={locale} />
    </PageContainer>
  );
}
