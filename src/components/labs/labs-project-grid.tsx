"use client";

import { useSearchParams } from "next/navigation";
import {
  BookOpenIcon,
  CalendarIcon,
  PackageIcon,
  RefreshCwIcon,
  ServerIcon,
  TagIcon,
  type LucideIcon,
} from "lucide-react";
import ContentRenderer from "@/components/content-renderer";
import ScrollReveal from "@/components/scroll-reveal";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { getCopy, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { LabProject } from "@/types/domain";

interface LabsProjectGridProps {
  projects: LabProject[];
  locale: Locale;
}

const metaIconMap: Record<string, LucideIcon> = {
  repository: PackageIcon,
  repositorio: PackageIcon,
  deployment: ServerIcon,
  despliegue: ServerIcon,
  started: CalendarIcon,
  iniciado: CalendarIcon,
  updated: RefreshCwIcon,
  actualizado: RefreshCwIcon,
  version: TagIcon,
  versión: TagIcon,
  documentation: BookOpenIcon,
  documentación: BookOpenIcon,
};

function ProjectDialog({
  project,
  locale,
  open,
  onOpenChange,
}: {
  project: LabProject;
  locale: Locale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const copy = getCopy(locale);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group/tile w-full cursor-pointer text-left"
        >
          <Card className="aspect-square justify-center rounded-none bg-card py-0 group-data-[variant=light]:bg-white group-data-[variant=light]:ring-plot">
            {project.icon ? (
              <img
                src={project.icon.url}
                alt={project.icon.alt ?? project.title}
                className="h-full w-full object-contain p-8 group-data-[variant=light]:brightness-0"
              />
            ) : (
              <span className="p-4 text-center text-2xl font-bold uppercase">
                {project.title}
              </span>
            )}
          </Card>
          <span className="mt-2 block text-center text-xs text-muted-foreground group-hover/tile:underline group-data-[variant=light]:text-plot">
            {project.title}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent
        aria-describedby={undefined}
        className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-5xl"
      >
        <DialogHeader className="shrink-0 p-6 md:p-8 pr-12 md:pr-12 text-left">
          <div className="flex items-center gap-4">
            {project.icon ? (
              <div className="flex size-10 shrink-0 items-center justify-center">
                <img
                  src={project.icon.url}
                  alt=""
                  className="size-full object-contain group-data-[variant=light]:brightness-0"
                />
              </div>
            ) : null}
            <DialogTitle className="min-w-0 text-2xl font-bold uppercase wrap-anywhere">
              {project.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <Separator />

        <div className="min-h-0 overflow-y-auto overscroll-contain">
          <div
            className={cn(
              "grid min-h-full grid-cols-1",
              project.meta.length > 0 && "md:grid-cols-[minmax(0,1fr)_16rem]",
            )}
          >
            <div className="flex min-w-0 flex-col wrap-anywhere">
              <div className="flex flex-col gap-8 p-6 md:p-8">
                <ContentRenderer content={project.description} />

                {project.details.length > 0 ? (
                  <>
                    <div className="-mx-6 md:-mx-8">
                      <Separator />
                    </div>
                    <dl className="flex flex-col gap-6">
                      {project.details.map((detail) => (
                        <div
                          className="grid grid-cols-1 sm:grid-cols-[8rem_minmax(0,1fr)] gap-2 sm:gap-6"
                          key={detail.label}
                        >
                          <dt className="text-xs font-bold uppercase text-muted-foreground">
                            {detail.label}
                          </dt>
                          <dd className="min-w-0">
                            <ContentRenderer content={detail.content} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </>
                ) : null}
              </div>

              {project.get_started ? (
                <section className="mt-auto flex flex-col">
                  <Separator />
                  <div className="flex flex-col gap-4 p-6 md:p-8">
                    <h2 className="font-bold uppercase">{copy.getStarted}</h2>
                    <ContentRenderer content={project.get_started} />
                  </div>
                </section>
              ) : null}
            </div>

            {project.meta.length > 0 ? (
              <aside className="min-w-0 border-t md:border-t-0 md:border-l bg-muted/30 p-6">
                <dl className="flex flex-col gap-6 wrap-anywhere">
                  {project.meta.map((item) => {
                    const Icon = metaIconMap[item.label.toLowerCase()];

                    return (
                      <div className="flex flex-col gap-2" key={item.label}>
                        <dt className="flex items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
                          {Icon ? (
                            <Icon className="size-4 shrink-0" aria-hidden="true" />
                          ) : null}
                          {item.label}
                        </dt>
                        <dd className="min-w-0 text-sm">
                          <ContentRenderer content={item.content} />
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </aside>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function LabsProjectGrid({
  projects,
  locale,
}: LabsProjectGridProps) {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("project");

  function handleOpenChange(slug: string, open: boolean) {
    const url = new URL(window.location.href);

    if (open) {
      url.searchParams.set("project", slug);
    } else {
      url.searchParams.delete("project");
    }

    window.history.replaceState(null, "", url);
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
      {projects.map((project, index) => (
        <ScrollReveal
          className="col-span-1"
          delay={index * 0.1}
          direction={index % 2 === 0 ? "left" : "right"}
          key={project.id}
        >
          <ProjectDialog
            project={project}
            locale={locale}
            open={activeSlug === project.slug}
            onOpenChange={(open) => handleOpenChange(project.slug, open)}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}
