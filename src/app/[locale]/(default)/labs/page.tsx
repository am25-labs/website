import type { Metadata } from "next";
import GridContainer from "@/components/grids/grid-container";
import GridSix from "@/components/grids/grid-six";
import GridTwo from "@/components/grids/grid-two";
import LabsProjectGrid from "@/components/labs/labs-project-grid";
import ScrollReveal from "@/components/scroll-reveal";
import { AccordionWrap } from "@/components/ui/custom/accordion";
import { getCopy, getRouteLocale } from "@/lib/i18n";
import { getPageMetadata } from "@/lib/metadata";
import { getLabProjects, getLabs } from "@/lib/plank/fetch";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const labs = await getLabs({ locale });

  return getPageMetadata(locale, `AM25 ${getCopy(locale).labs}`, "/labs", labs.quote);
}

export default async function LabsPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const [{ data: projects }, labs] = await Promise.all([
    getLabProjects({ locale }),
    getLabs({ locale }),
  ]);
  const copy = getCopy(locale);

  return (
    <>
      <GridContainer className="pb-16">
        <GridSix>
          <ScrollReveal className="col-span-full" direction="down">
            <h1 className="text-6xl font-bold uppercase md:text-9xl">
              AM25 {copy.labs}
            </h1>
            <p className="mt-4 text-3xl text-neutral-400 md:text-4xl">
              {labs.quote}
            </p>
          </ScrollReveal>
        </GridSix>
      </GridContainer>

      {projects.length > 0 ? (
        <GridContainer className="pb-24">
          <GridTwo>
            <ScrollReveal className="col-span-full">
              <h2 className="text-sm font-bold uppercase text-muted-foreground group-data-[variant=yellow]:text-black group-data-[variant=light]:text-black">
                {copy.labsProjects}
              </h2>
            </ScrollReveal>
          </GridTwo>

          <GridSix>
            <div className="col-span-full">
              <LabsProjectGrid projects={projects} locale={locale} />
            </div>
          </GridSix>
        </GridContainer>
      ) : null}

      {labs.faq.length > 0 ? (
        <GridContainer className="pb-16">
          <GridTwo>
            <ScrollReveal className="col-span-full">
              <h2 className="text-sm font-bold uppercase text-muted-foreground group-data-[variant=yellow]:text-black group-data-[variant=light]:text-black">
                {copy.labsFaq}
              </h2>
            </ScrollReveal>
          </GridTwo>

          <GridSix>
            <ScrollReveal className="col-span-full" delay={0.15}>
              <AccordionWrap items={labs.faq} />
            </ScrollReveal>
          </GridSix>
        </GridContainer>
      ) : null}
    </>
  );
}
