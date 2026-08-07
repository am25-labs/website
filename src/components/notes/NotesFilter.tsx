"use client";

import { useMemo } from "react";
import ContentFilter from "@/components/ContentFilter";
import GridContainer from "@/components/grids/GridContainer";
import type { Author, Category } from "@/types/domain";
import NoteCard from "./NoteCard";

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
}

export default function NotesFilter({ entries, baseHref }: NotesFilterProps) {
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
      matches={(entry, active) =>
        active === null ||
        entry.categories.some((category) => category.slug === active)
      }
    >
      {(filteredEntries) => (
        <GridContainer className="pt-4">
          {filteredEntries.map((entry) => (
            <div key={entry.id} className="col-span-2">
              <NoteCard
                cover={entry.cover}
                title={entry.title}
                href={`${baseHref}/${entry.slug}`}
                category={entry.categories
                  .map((category) => category.title)
                  .join(", ")}
                publishedAt={entry.publishedAt}
                author={entry.author}
              />
            </div>
          ))}
        </GridContainer>
      )}
    </ContentFilter>
  );
}
