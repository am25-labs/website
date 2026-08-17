"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { NoteCardProps } from "@/types/domain";
import { formatDate } from "@/lib/utils";
import { dateLocale, type Locale } from "@/lib/i18n";

export default function NoteCard({
  cover,
  title,
  href,
  category,
  publishedAt,
  author,
  locale = "en",
}: NoteCardProps) {
  const isExternal = href.startsWith("https");
  const authorName = author
    ? `${author.first_name} ${author.last_name}`.trim()
    : "";
  const authorInitials = author
    ? `${author.first_name?.[0] ?? ""}${author.last_name?.[0] ?? ""}`.toUpperCase()
    : "";

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener" : undefined}
      title={title}
      className="group/card"
    >
      <Card className="gap-0 overflow-hidden bg-black p-0 text-white">
        {cover ? (
          <>
            <div className="aspect-[5/4] overflow-hidden">
              <img
                src={cover}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
            <Separator />
          </>
        ) : null}

        <div className="flex h-full flex-col justify-between p-6">
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">{category}</span>
              {publishedAt ? (
                <span className="text-xs text-muted-foreground">
                  {formatDate(publishedAt, { locale: dateLocale(locale) })}
                </span>
              ) : null}
            </div>

            <p className="mb-8 min-h-[4rem] text-2xl font-bold uppercase group-hover/card:underline">
              {title}
            </p>
          </div>

          {author ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={author.avatar_url ?? undefined}
                  alt={authorName}
                />
                <AvatarFallback>{authorInitials}</AvatarFallback>
              </Avatar>

              <div>
                <div className="font-bold">
                  {author.first_name} {author.last_name}
                </div>
                {author.job_title ? (
                  <div className="text-xs text-muted-foreground">
                    {author.job_title} {locale === "es" ? "en" : "at"}{" "}
                    {author.organization}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    </Link>
  );
}
