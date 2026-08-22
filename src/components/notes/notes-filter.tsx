"use client";

import { useMemo } from "react";
import ContentFilter from "@/components/content-filter";
import GridContainer from "@/components/grids/grid-container";
import ScrollReveal from "@/components/scroll-reveal";
import type { Author, Category } from "@/types/domain";
import NoteCard from "./note-card";
import type { Locale } from "@/lib/i18n";

type Entry = {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  categories: Category[];
  publishedAt?: string;
  author?: Author | null;
};

interface NotesFilterProps {
  entries: Entry[];
  baseHref: string;
  locale: Locale;
}

export default function NotesFilter({
  entries,
  baseHref,
  locale,
}: NotesFilterProps) {
  const categories = useMemo(
    () =>
      Array.from(
        new Map(
          entries
            .flatMap((entry) => entry.categories)
            .map((category) => [category.id, category]),
        ).values(),
      ),
    [entries],
  );

  return (
    <ContentFilter
      options={categories.map((category) => ({
        id: category.id,
        label: category.title,
        value: category.slug,
      }))}
      items={entries}
      allLabel={locale === "es" ? "Todo" : "All"}
      matches={(entry, active) =>
        active === null ||
        entry.categories.some((category) => category.slug === active)
      }
    >
      {(filteredEntries) => (
        <GridContainer className="pt-4">
          {filteredEntries.map((entry, index) => (
            <ScrollReveal
              className="col-span-2"
              delay={index * 0.1}
              direction={index % 2 === 0 ? "left" : "right"}
              key={entry.id}
            >
              <NoteCard
                cover={entry.cover}
                title={entry.title}
                href={`${baseHref}/${entry.slug}`}
                category={entry.categories
                  .map((category) => category.title)
                  .join(", ")}
                publishedAt={entry.publishedAt}
                author={entry.author}
                locale={locale}
              />
            </ScrollReveal>
          ))}
        </GridContainer>
      )}
    </ContentFilter>
  );
}
