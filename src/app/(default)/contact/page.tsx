import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import ContactForm from "@/components/contact/ContactForm";
import ContactLinks from "@/components/contact/ContactLinks";
import { AlertWrap } from "@/components/ui/custom/AlertWrap";
import Link from "next/link";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Project inquiries";

export function generateMetadata(): Metadata {
  return {
    ...baseMetadata,
    title: `${pageTitle} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} - AM25`,
      url: `${baseUrl}/contact`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} - AM25`,
    },
  };
}

export default function ContactPage() {
  return (
    <GridContainer>
      <GridTwo className="mb-8">
        <div className="col-span-full">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">
            {pageTitle}
          </h1>
          <ContactLinks email="projects@am25.work" />
        </div>
      </GridTwo>

      <GridFour>
        <div className="col-span-full">
          <ContactForm mode="services" />

          <Link href="/contact/general">
            <AlertWrap
              className="mt-4"
              variant="info"
              title="General inquiries?"
            >
              <p>
                This contact form one&apos;s for projects. If that&apos;s not
                you, GO HERE INSTEAD.
              </p>
            </AlertWrap>
          </Link>
        </div>
      </GridFour>
    </GridContainer>
  );
}
