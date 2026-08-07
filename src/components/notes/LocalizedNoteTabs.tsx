"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import ContentRenderer from "@/components/ContentRenderer";
import { BannerPoweredBy } from "@/components/PoweredBy";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import type { Note } from "@/types/domain";

interface LocalizedNoteTabsProps {
  enNote: Note | null;
  esNote: Note | null;
}

type Locale = "en" | "es";

export default function LocalizedNoteTabs({
  enNote,
  esNote,
}: LocalizedNoteTabsProps) {
  const initialLocale: Locale = enNote ? "en" : "es";
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const activeNote = useMemo(() => {
    if (locale === "en") {
      return enNote ?? esNote;
    }

    return esNote ?? enNote;
  }, [locale, enNote, esNote]);

  if (!activeNote) {
    return null;
  }

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 px-4 md:grid-cols-8">
      <section className="col-span-2 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-full">
            <h1 className="text-3xl font-bold uppercase md:text-4xl">
              {activeNote.title}
            </h1>

            <p className="mt-4 flex items-center gap-2 text-muted-foreground">
              {formatDate(activeNote.published_at, {
                locale: locale === "es" ? "es-SV" : "en-US",
              })}
            </p>

            <div className="mt-8 flex flex-col">
              <div className="flex items-center gap-2">
                {activeNote.author.avatar_url ? (
                  <img
                    src={activeNote.author.avatar_url}
                    alt={`${activeNote.author.first_name} ${activeNote.author.last_name}`}
                    className="size-9 rounded-full object-cover"
                  />
                ) : null}

                <div>
                  <p className="font-bold">
                    {activeNote.author.first_name} {activeNote.author.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activeNote.author.job_title} at{" "}
                    {activeNote.author.organization}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="col-span-2 md:col-span-4">
        <div className="relative mb-4 aspect-square md:aspect-5/4">
          {activeNote.cover ? (
            <img
              src={activeNote.cover.url}
              alt={activeNote.cover.alt ?? activeNote.title}
              className="h-full w-full object-cover border"
            />
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Tabs
            value={locale}
            onValueChange={(next) => setLocale(next as Locale)}
          >
            <TabsList>
              <TabsTrigger value="en" disabled={!enNote}>
                EN
              </TabsTrigger>
              <TabsTrigger value="es" disabled={!esNote}>
                ES
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="col-span-full">
            <ContentRenderer content={activeNote.content} />

            <div className="flex flex-col items-center py-16">
              <Separator />
              <Link
                href="/notes"
                className="mt-8 flex items-center gap-2 text-center font-bold uppercase hover:underline"
              >
                <ChevronLeftIcon size={21} />
                Back to all notes
              </Link>
            </div>

            <BannerPoweredBy
              logoSrc="/plank-logo-w.svg"
              logoAlt="Plank CMS"
              label="Published via Plank CMS"
              link="https://plank-cms.com"
              mode="dark"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
