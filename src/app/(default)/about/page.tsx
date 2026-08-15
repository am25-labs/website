import ContentRenderer from "@/components/ContentRenderer";
import AboutFaq from "@/components/about/Faq";
import GenericContent from "@/components/GenericContent";
import { AlertWrap } from "@/components/ui/custom/AlertWrap";
import { getPageMetadata } from "@/lib/metadata";
import { getAbout } from "@/lib/plank/fetch";
import type { Metadata } from "next";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getCopy } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const baseUrl = process.env.BASE_URL;
const pageTitle = "About us";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return getPageMetadata(locale, getCopy(locale).aboutUs, "/about");
}

export default async function AboutPage() {
  const locale = await getLocale();
  const entry = await getAbout({ locale });
  const title = getCopy(locale).aboutUs;
  const brandPrompt = locale === "es"
    ? { title: "¿Te dio curiosidad?", text: "Conoce AM25 y mira lo que realmente hacemos" }
    : { title: "Curious enough?", text: "Fine. Meet AM25 and see what we actually do" };

  return (
    <>
      <GenericContent title={title} quote={entry.quote}>
        <img
          src={entry.profile.url}
          alt={entry.profile.alt ?? title}
          className="h-auto w-full object-cover mb-8"
        />

        <ContentRenderer content={entry.description} />

        <Link href="/brand">
          <AlertWrap className="mt-8" variant="info" title={brandPrompt.title}>
            <p>{brandPrompt.text}</p>
          </AlertWrap>
        </Link>
      </GenericContent>

      <Separator />

      <AboutFaq items={entry.faq} />
    </>
  );
}
