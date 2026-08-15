import { baseMetadata, getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import LocalizedLegalTabs from "@/components/legal/LocalizedLegalTabs";
import { getPrivacy } from "@/lib/plank/fetch";
import PageContainer from "@/components/PageContainer";
import { getCopy } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Privacy";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return getPageMetadata(locale, getCopy(locale).privacy, "/privacy");
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const page = await getPrivacy({ locale });

  return (
    <PageContainer>
      <LocalizedLegalTabs title={getCopy(locale).privacy} page={page} locale={locale} />
    </PageContainer>
  );
}
