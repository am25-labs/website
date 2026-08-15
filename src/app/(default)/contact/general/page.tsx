import ContactForm from "@/components/contact/ContactForm";
import ContactLinks from "@/components/contact/ContactLinks";
import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { getCopy } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const baseUrl = process.env.BASE_URL;
const pageTitle = "General inquiries";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return getPageMetadata(locale, getCopy(locale).generalInquiries, "/contact/general");
}

export default async function GeneralContactPage() {
  const locale = await getLocale();
  const copy = getCopy(locale);
  return (
    <GridContainer>
      <GridTwo className="mb-8">
        <div className="col-span-full">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">
            {copy.generalInquiries}
          </h1>
          <ContactLinks email="hi@am25.work" />
        </div>
      </GridTwo>

      <GridFour>
        <div className="col-span-full">
          <ContactForm mode="general" locale={locale} />
        </div>
      </GridFour>
    </GridContainer>
  );
}
