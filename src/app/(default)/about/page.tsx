import ContentRenderer from "@/components/ContentRenderer";
import AboutFaq from "@/components/about/Faq";
import GenericContent from "@/components/GenericContent";
import { AlertWrap } from "@/components/ui/custom/AlertWrap";
import { baseMetadata } from "@/lib/metadata";
import { getAbout } from "@/lib/plank/fetch";
import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const baseUrl = process.env.BASE_URL;
const pageTitle = "About us";

export function generateMetadata(): Metadata {
  return {
    ...baseMetadata,
    title: `${pageTitle} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} - AM25`,
      url: `${baseUrl}/about`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} - AM25`,
    },
  };
}

export default async function AboutPage() {
  const entry = await getAbout();

  return (
    <>
      <GenericContent title={pageTitle} quote={entry.quote}>
        <img
          src={entry.profile.url}
          alt={entry.profile.alt ?? pageTitle}
          className="h-auto w-full object-cover mb-8"
        />

        <ContentRenderer content={entry.description} />

        <Link href="/brand">
          <AlertWrap className="mt-8" variant="info" title="Curious enough?">
            <p>Fine. Meet AM25 and see what we actually do.</p>
          </AlertWrap>
        </Link>
      </GenericContent>

      <Separator />

      <AboutFaq items={entry.faq} />
    </>
  );
}
