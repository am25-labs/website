import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import GridContainer from "@/components/grids/GridContainer";
import { getNotes } from "@/lib/plank/fetch";
import NoteCard from "@/components/notes/NoteCard";
import { getCopy, withLocale, type Locale } from "@/lib/i18n";

export default async function RecentEntries({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const { data: notes } = await getNotes({ locale });
  const entries = (notes ?? []).slice(0, 4).map((note) => ({
    id: note.id,
    title: note.title,
    slug: note.slug,
    cover: note.cover?.url ?? null,
    categories: note.category ? [note.category] : [],
    publishedAt: note.published_at,
    author: note.author,
  }));

  return (
    <>
      <GridContainer className="mb-0">
        <div className="col-span-full">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase text-muted-foreground group-data-[variant=yellow]:text-black">
              {copy.recentEntries}
            </h2>
            <Link
              href={withLocale(locale, "/notes")}
              className="flex items-center text-sm font-bold uppercase text-muted-foreground hover:underline group-data-[variant=yellow]:text-black"
            >
              {copy.viewAll}
              <ArrowRightIcon size={16} className="shrink-0" />
            </Link>
          </div>
        </div>
      </GridContainer>

      <GridContainer className="mt-4">
        {entries.map((entry) => (
          <div key={entry.id} className="col-span-2">
            <NoteCard
              cover={entry.cover}
              title={entry.title}
              href={withLocale(locale, `/notes/${entry.slug}`)}
              category={entry.categories
                .map((category) => category.title)
                .join(", ")}
              publishedAt={entry.publishedAt}
              author={entry.author}
              locale={locale}
            />
          </div>
        ))}
      </GridContainer>
    </>
  );
}
