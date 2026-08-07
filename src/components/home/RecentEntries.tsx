import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import GridContainer from "@/components/grids/GridContainer";
import { getNotes } from "@/lib/plank/fetch";
import NoteCard from "@/components/notes/NoteCard";

export default async function RecentEntries() {
  const { data: notes } = await getNotes();
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
              Recent entries
            </h2>
            <Link
              href="/notes"
              className="flex items-center text-sm font-bold uppercase text-muted-foreground hover:underline group-data-[variant=yellow]:text-black"
            >
              View all
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
              href={`/notes/${entry.slug}`}
              category={entry.categories
                .map((category) => category.title)
                .join(", ")}
              publishedAt={entry.publishedAt}
              author={entry.author}
            />
          </div>
        ))}
      </GridContainer>
    </>
  );
}
