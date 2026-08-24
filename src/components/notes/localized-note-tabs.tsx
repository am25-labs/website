import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import ContentRenderer from "@/components/content-renderer";
import ScrollReveal from "@/components/scroll-reveal";
import { BannerPoweredBy } from "@/components/powered-by";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import { dateLocale, getCopy, withLocale, type Locale } from "@/lib/i18n";
import type { Note } from "@/types/domain";

interface LocalizedNoteTabsProps {
  note: Note;
  locale: Locale;
}

export default function LocalizedNoteTabs({
  note,
  locale,
}: LocalizedNoteTabsProps) {
  const copy = getCopy(locale);

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 px-4 md:grid-cols-8">
      <section className="col-span-2 mb-8">
        <ScrollReveal className="grid grid-cols-2 gap-4" direction="down">
          <div className="col-span-full">
            <h1 className="text-3xl font-bold uppercase md:text-4xl">
              {note.title}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-muted-foreground">
              {formatDate(note.published_at, {
                locale: dateLocale(locale),
              })}
            </p>

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
        <div className="relative mb-4 aspect-square md:aspect-video">
          {note.cover ? (
            <img
              src={note.cover.url}
              alt={note.cover.alt ?? note.title}
              className="h-full w-full object-cover border"
            />
          ) : null}
        </div>

        <ScrollReveal
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
          delay={0.15}
        >
          <div className="col-span-full">
            <ContentRenderer content={note.content} />

            <div className="flex flex-col items-center py-16">
              <Separator />
              <Link
                href={withLocale(locale, "/notes")}
                className="mt-8 flex items-center gap-2 text-center font-bold uppercase hover:underline"
              >
                <ChevronLeftIcon size={21} />
                {copy.backToNotes}
              </Link>
            </div>

            <BannerPoweredBy
              logoSrc="/plank-logo-w.svg"
              logoAlt="Plank CMS"
              label={copy.publishedViaPlank}
              link="https://plank-cms.com"
              mode="dark"
            />
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
