import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import ContactForm from "@/components/contact/ContactForm";
import ContactLinks from "@/components/contact/ContactLinks";
import { AlertWrap } from "@/components/ui/custom/AlertWrap";
import Link from "next/link";
import { getCopy } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Project inquiries";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return getPageMetadata(locale, getCopy(locale).projectInquiries, "/contact");
}

export default async function ContactPage() {
  const locale = await getLocale();
  const copy = getCopy(locale);
  const generalPrompt = locale === "es"
    ? { title: "¿Consultas generales?", text: "Este formulario es para proyectos. Si no es tu caso, ve aquí" }
    : { title: "General inquiries?", text: "This contact form is for projects. If that’s not you, go here instead" };
  return (
    <GridContainer>
      <GridTwo className="mb-8">
        <div className="col-span-full">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">
            {copy.projectInquiries}
          </h1>
          <ContactLinks email="projects@am25.work" />
        </div>
      </GridTwo>

      <GridFour>
        <div className="col-span-full">
          <ContactForm mode="services" locale={locale} />

          <Link href="/contact/general">
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
