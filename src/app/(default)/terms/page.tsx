import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import LocalizedLegalTabs from "@/components/legal/LocalizedLegalTabs";
import { getTerms } from "@/lib/plank/fetch";
import PageContainer from "@/components/PageContainer";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Terms & conditions";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...baseMetadata,
    title: `${pageTitle} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} - AM25`,
      url: `${baseUrl}/terms`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} - AM25`,
    },
  };
}

export default async function TermsPage() {
  const [enPage, esPage] = await Promise.all([
    getTerms(),
    getTerms({ locale: "es" }),
  ]);

  return (
    <PageContainer>
      <LocalizedLegalTabs title={pageTitle} enPage={enPage} esPage={esPage} />
    </PageContainer>
  );
}
