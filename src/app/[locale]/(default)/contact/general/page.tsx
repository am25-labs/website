import ContactForm from "@/components/contact/ContactForm";
import ContactLinks from "@/components/contact/ContactLinks";
import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import ScrollReveal from "@/components/ScrollReveal";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { getCopy, getRouteLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;
const pageTitle = "General inquiries";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, getCopy(locale).generalInquiries, "/contact/general");
}

export default async function GeneralContactPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const copy = getCopy(locale);
  return (
    <GridContainer>
      <GridTwo className="mb-8">
        <ScrollReveal className="col-span-full" direction="down">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">
            {copy.generalInquiries}
          </h1>
          <ContactLinks email="hi@am25.work" />
        </ScrollReveal>
      </GridTwo>

      <GridFour>
        <div className="col-span-full">
          <ContactForm mode="general" locale={locale} />
        </div>
      </GridFour>
    </GridContainer>
  );
}
