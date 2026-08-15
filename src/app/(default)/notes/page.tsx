import { baseMetadata, getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import PageContainer from "@/components/PageContainer";
import NotesFilter from "@/components/notes/NotesFilter";
import { getNotes } from "@/lib/plank/fetch";
import { getCopy } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Notes";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return getPageMetadata(locale, getCopy(locale).notes, "/notes");
}

export default async function NotesPage() {
  const locale = await getLocale();
  const { data: notes } = await getNotes({ locale });
  const title = getCopy(locale).notes;
  const entries = notes.map((note) => ({
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
      <PageContainer>
        <div className="col-span-full mb-16 px-4">
          <h1 className="text-6xl font-bold uppercase md:text-9xl">
            {title}
          </h1>
        </div>
      </PageContainer>

      {entries.length > 0 ? (
        <NotesFilter entries={entries} baseHref="/notes" locale={locale} />
      ) : null}
    </>
  );
}
