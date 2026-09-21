"use client";

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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { getCopy, type Locale } from "@/lib/i18n";
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

function ProjectDialog({ project, locale }: { project: LabProject; locale: Locale }) {
  const copy = getCopy(locale);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="group/tile w-full cursor-pointer text-left">
          <Card className="aspect-square justify-center rounded-none bg-card py-0 group-data-[variant=yellow]:bg-am-y group-data-[variant=light]:bg-white group-data-[variant=yellow]:ring-black group-data-[variant=light]:ring-black">
            {project.icon ? (
              <img
                src={project.icon.url}
                alt={project.icon.alt ?? project.title}
                className="h-full w-full object-contain p-8 group-data-[variant=yellow]:brightness-0 group-data-[variant=light]:brightness-0"
              />
            ) : (
              <span className="p-4 text-center text-2xl font-bold uppercase">
                {project.title}
              </span>
            )}
          </Card>
          <span className="mt-2 block text-center text-xs text-muted-foreground group-hover/tile:underline group-data-[variant=yellow]:text-black group-data-[variant=light]:text-black">
            {project.title}
          </span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center gap-4 pr-8">
            {project.icon ? (
              <div className="aspect-square border p-2">
                <img
                  src={project.icon.url}
                  alt=""
                  className="size-6 group-data-[variant=yellow]:brightness-0 group-data-[variant=light]:brightness-0"
                />
              </div>
            ) : null}
            <DialogTitle className="text-2xl font-bold uppercase">
              {project.title}
            </DialogTitle>
          </div>
          {project.quote ? (
            <DialogDescription>{project.quote}</DialogDescription>
          ) : null}
        </DialogHeader>

        <div className="space-y-8">
          <ContentRenderer content={project.description} />

          {project.details.length > 0 ? (
            <Table>
              <TableBody>
                {project.details.map((detail) => (
                  <TableRow key={detail.label}>
                    <TableCell className="w-1/3 align-top font-bold whitespace-normal">
                      {detail.label}
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      <ContentRenderer content={detail.content} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : null}

          {project.meta.length > 0 ? (
            <Card className="gap-0 rounded-none py-4">
              <ul className="space-y-4 px-6">
                {project.meta.map((item) => {
                  const Icon = metaIconMap[item.label.toLowerCase()];

                  return (
                    <li className="flex items-start gap-2" key={item.label}>
                      {Icon ? (
                        <Icon className="mt-1 size-4 shrink-0 text-muted-foreground" />
                      ) : null}
                      <div>
                        <span className="sr-only">{item.label}</span>
                        <ContentRenderer content={item.content} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          ) : null}

          {project.get_started ? (
            <section className="border-t pt-6">
              <h2 className="mb-4 font-bold uppercase">{copy.getStarted}</h2>
              <ContentRenderer content={project.get_started} />
            </section>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function LabsProjectGrid({
  projects,
  locale,
}: LabsProjectGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
      {projects.map((project, index) => (
        <ScrollReveal
          className="col-span-1"
          delay={index * 0.1}
          direction={index % 2 === 0 ? "left" : "right"}
          key={project.id}
        >
          <ProjectDialog project={project} locale={locale} />
        </ScrollReveal>
      ))}
    </div>
  );
}
