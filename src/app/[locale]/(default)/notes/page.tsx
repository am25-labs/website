import { baseMetadata, getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import PageContainer from "@/components/page-container";
import ScrollReveal from "@/components/scroll-reveal";
import NotesFilter from "@/components/notes/notes-filter";
import { getNotes } from "@/lib/plank/fetch";
import { getCopy, getRouteLocale, withLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Notes";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, getCopy(locale).notes, "/notes");
}

export default async function NotesPage({ params }: Props) {
  const locale = await getRouteLocale(params);
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
        <ScrollReveal className="col-span-full mb-16 px-4" direction="down">
          <h1 className="text-6xl font-bold uppercase md:text-9xl">
            {title}
          </h1>
        </ScrollReveal>
      </PageContainer>

      {entries.length > 0 ? (
        <NotesFilter entries={entries} baseHref={withLocale(locale, "/notes")} locale={locale} />
      ) : null}
    </>
  );
}
