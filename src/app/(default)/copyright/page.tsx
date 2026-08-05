import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import LocalizedLegalTabs from "@/components/legal/LocalizedLegalTabs";
import { getCopyright } from "@/lib/plank/fetch";
import PageContainer from "@/components/PageContainer";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Copyright";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...baseMetadata,
    title: `${pageTitle} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} - AM25`,
      url: `${baseUrl}/copyright`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} - AM25`,
    },
  };
}

export default async function CopyrightPage() {
  const [enPage, esPage] = await Promise.all([
    getCopyright(),
    getCopyright({ locale: "es" }),
  ]);

  return (
    <PageContainer>
      <LocalizedLegalTabs title={pageTitle} enPage={enPage} esPage={esPage} />
    </PageContainer>
  );
}
