import ContentNavigation from "@/components/content-navigation";
import ContentRenderer from "@/components/content-renderer";
import ScrollReveal from "@/components/scroll-reveal";
import { formatDate } from "@/lib/utils";
import { dateLocale, getCopy, withLocale, type Locale } from "@/lib/i18n";
import type { Note } from "@/types/domain";

interface NoteDetailProps {
  note: Note;
  locale: Locale;
}

export default function NoteDetail({ note, locale }: NoteDetailProps) {
  const copy = getCopy(locale);

  return (
    <div className="mb-4 grid grid-cols-2 gap-4 px-4 md:grid-cols-8">
      <ScrollReveal className="col-span-full mb-8">
        <div className="relative aspect-square md:aspect-video">
          {note.cover ? (
            <img
              src={note.cover.url}
              alt={note.cover.alt ?? note.title}
              className="h-full w-full border object-cover"
            />
          ) : null}
        </div>
      </ScrollReveal>

      <section className="col-span-2 mb-8">
        <ScrollReveal className="grid grid-cols-2 gap-4" direction="down">
          <div className="col-span-full">
            <h1 className="text-3xl font-bold uppercase md:text-4xl">
              {note.title}
            </h1>

            {note.published_at ? (
              <p className="mt-4 flex items-center gap-2 text-muted-foreground">
                {formatDate(note.published_at, {
                  locale: dateLocale(locale),
                })}
              </p>
            ) : null}

            <div className="mt-8 flex flex-col">
              <div className="flex items-center gap-2">
                {note.author.avatar_url ? (
                  <img
                    src={note.author.avatar_url}
                    alt={`${note.author.first_name} ${note.author.last_name}`}
                    className="size-9 rounded-full object-cover"
                  />
                ) : null}

                <div>
                  <p className="font-bold">
                    {note.author.first_name} {note.author.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {note.author.job_title} {locale === "es" ? "en" : "at"}{" "}
                    {note.author.organization}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="col-span-2 md:col-span-4">
        <ScrollReveal
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
          delay={0.15}
          viewportAmount={0.01}
        >
          <div className="col-span-full">
            <ContentRenderer content={note.content} revealBlocks />
          </div>
        </ScrollReveal>
      </section>
      <ScrollReveal className="col-span-full">
        <ContentNavigation
          href={withLocale(locale, "/notes")}
          label={copy.backToNotes}
          plankLabel={copy.publishedViaPlank}
        />
      </ScrollReveal>
    </div>
  );
}
