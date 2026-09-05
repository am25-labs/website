import ContentRenderer from "@/components/content-renderer";
import AboutFaq from "@/components/about/faq";
import GenericContent from "@/components/generic-content";
import { AlertWrap } from "@/components/ui/custom/alert-wrap";
import { getPageMetadata } from "@/lib/metadata";
import { getAbout } from "@/lib/plank/fetch";
import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getCopy, getRouteLocale, withLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;
const pageTitle = "About us";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, getCopy(locale).aboutUs, "/about");
}

export default async function AboutPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const entry = await getAbout({ locale });
  const title = getCopy(locale).aboutUs;
  const brandPrompt =
    locale === "es"
      ? {
          title: "¿Te dio curiosidad?",
          text: "Conoce AM25 y mira lo que realmente hacemos",
        }
      : {
          title: "Curious enough?",
          text: "Fine. Meet AM25 and see what we actually do",
        };

  return (
    <>
      <GenericContent title={title} quote={entry.quote}>
        <img
          src={entry.profile.url}
          alt={entry.profile.alt ?? title}
          className="h-auto w-full object-cover mb-8"
        />

        <ContentRenderer content={entry.description} />

        {/* <Link href={withLocale(locale, "/brand")}>
          <AlertWrap className="mt-8" variant="info" title={brandPrompt.title}>
            <p>{brandPrompt.text}</p>
          </AlertWrap>
        </Link> */}
      </GenericContent>

      <Separator />

      <AboutFaq items={entry.faq} locale={locale} />
    </>
  );
}
