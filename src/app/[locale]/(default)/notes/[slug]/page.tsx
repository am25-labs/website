import { notFound } from "next/navigation";
import { getBaseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import NoteDetail from "@/components/notes/note-detail";
import { getNotes, getSingleNote } from "@/lib/plank/fetch";
import PageContainer from "@/components/page-container";
import { getRouteLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;

interface NotePageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const { data: notes } = await getNotes({ locale: "en" });
  return ["es", "en"].flatMap((locale) => notes.map((note) => ({ locale, slug: note.slug })));
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRouteLocale(params);
  const baseMetadata = getBaseMetadata(locale);
  const noteForMeta = await getSingleNote(slug, { locale });

  if (!noteForMeta) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: `${noteForMeta.title} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${noteForMeta.title} - AM25`,
      url: `${baseUrl}/notes/${slug}`,
      images: noteForMeta.cover?.url
        ? [noteForMeta.cover.url]
        : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${noteForMeta.title} - AM25`,
      images: noteForMeta.cover?.url
        ? [noteForMeta.cover.url]
        : baseMetadata.twitter?.images,
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const locale = await getRouteLocale(params);
  const note = await getSingleNote(slug, { locale });

  if (!note) {
    notFound();
  }

  return (
    <PageContainer>
      <NoteDetail note={note} locale={locale} />
    </PageContainer>
  );
}
