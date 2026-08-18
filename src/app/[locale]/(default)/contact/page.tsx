import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/contact/ContactForm";
import ContactLinks from "@/components/contact/ContactLinks";
import { AlertWrap } from "@/components/ui/custom/AlertWrap";
import Link from "next/link";
import { getCopy, getRouteLocale, withLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Project inquiries";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, getCopy(locale).projectInquiries, "/contact");
}

export default async function ContactPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const copy = getCopy(locale);
  const generalPrompt = locale === "es"
    ? { title: "¿Consultas generales?", text: "Este formulario es para proyectos. Si no es tu caso, ve aquí" }
    : { title: "General inquiries?", text: "This contact form is for projects. If that’s not you, go here instead" };
  return (
    <GridContainer>
      <GridTwo className="mb-8">
        <ScrollReveal className="col-span-full" direction="down">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">
            {copy.projectInquiries}
          </h1>
          <ContactLinks email="projects@am25.work" />
        </ScrollReveal>
      </GridTwo>

      <GridFour>
        <div className="col-span-full">
          <ContactForm mode="services" locale={locale} />

          <Link href={withLocale(locale, "/contact/general")}>
            <AlertWrap
              className="mt-4"
              variant="info"
              title={generalPrompt.title}
            >
              <p>
                {generalPrompt.text}
              </p>
            </AlertWrap>
          </Link>
        </div>
      </GridFour>
    </GridContainer>
  );
}
