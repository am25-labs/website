import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import GridContainer from "@/components/grids/grid-container";
import ScrollReveal from "@/components/scroll-reveal";
import { getWorks } from "@/lib/plank/fetch";
import WorkCard from "@/components/work/work-card";
import { getCopy, withLocale, type Locale } from "@/lib/i18n";

export default async function FeaturedWork({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const { data } = await getWorks({ onlyFeatured: true, locale });
  const works = data.slice(0, 4);

  return (
    <>
      <GridContainer>
        <ScrollReveal className="col-span-full">
          <div className="flex items-center justify-between">
            <h2 className="font-bold uppercase text-muted-foreground group-data-[variant=yellow]:text-black">
              {copy.featuredWork}
            </h2>
            <Link
              href={withLocale(locale, "/brand")}
              className="flex items-center font-bold uppercase text-muted-foreground hover:underline group-data-[variant=yellow]:text-black"
            >
              {copy.ourBrand}
              <ArrowRightIcon size={20} className="shrink-0" />
            </Link>
          </div>
        </ScrollReveal>
      </GridContainer>

      <GridContainer>
        {works.map((work, index) => (
          <ScrollReveal
            className="col-span-2"
            delay={index * 0.12}
            direction={index % 2 === 0 ? "left" : "right"}
            key={work.id}
          >
            <WorkCard
              cover={work.cover?.url ?? null}
              title={work.title}
              href={withLocale(locale, `/work/${work.slug}`)}
              category={work.disciplines
                .map((discipline) => discipline.title)
                .join(", ")}
            />
          </ScrollReveal>
        ))}
      </GridContainer>
    </>
  );
}
