"use client";

import ContentFilter from "@/components/ContentFilter";
import GridContainer from "@/components/grids/GridContainer";
import ScrollReveal from "@/components/ScrollReveal";
import type { Discipline, Work } from "@/types/domain";
import WorkCard from "./WorkCard";
import type { Locale } from "@/lib/i18n";

interface CasesFilterProps {
  works: Work[];
  locale: Locale;
}

export default function CasesFilter({ works, locale }: CasesFilterProps) {
  const disciplines: Discipline[] = Array.from(
    new Map(
      works
        .flatMap((work) => work.disciplines)
        .map((discipline) => [discipline.id, discipline]),
    ).values(),
  );

  return (
    <ContentFilter
      options={disciplines.map((discipline) => ({
        id: discipline.id,
        label: discipline.title,
        value: discipline.slug,
      }))}
      items={works}
      allLabel={locale === "es" ? "Todo" : "All"}
      matches={(work, active) =>
        active === null ||
        work.disciplines.some((discipline) => discipline.slug === active)
      }
    >
      {(filteredWorks) => (
        <GridContainer className="mt-4">
          {filteredWorks.map((work, index) => (
            <ScrollReveal
              className="col-span-2"
              delay={index * 0.1}
              direction={index % 2 === 0 ? "left" : "right"}
              key={work.id}
            >
              <WorkCard
                cover={work.cover?.url ?? null}
                title={work.title}
                href={`/cases/${work.slug}`}
                category={work.disciplines
                  .map((discipline) => discipline.title)
                  .join(", ")}
              />
            </ScrollReveal>
          ))}
        </GridContainer>
      )}
    </ContentFilter>
  );
}
