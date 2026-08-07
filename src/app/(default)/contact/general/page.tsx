import ContactForm from "@/components/contact/ContactForm";
import ContactLinks from "@/components/contact/ContactLinks";
import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const baseUrl = process.env.BASE_URL;
const pageTitle = "General inquiries";

export function generateMetadata(): Metadata {
  return {
    ...baseMetadata,
    title: `${pageTitle} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} - AM25`,
      url: `${baseUrl}/contact/general`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} - AM25`,
    },
  };
}

export default function GeneralContactPage() {
  return (
    <GridContainer>
      <GridTwo className="mb-8">
        <div className="col-span-full">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">
            {pageTitle}
          </h1>
          <ContactLinks email="hi@am25.work" />
        </div>
      </GridTwo>

      <GridFour>
        <div className="col-span-full">
          <ContactForm mode="general" />
        </div>
      </GridFour>
    </GridContainer>
  );
}
