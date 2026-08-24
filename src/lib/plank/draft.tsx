import { notFound } from "next/navigation";
import PageShell from "@/components/page-shell";
import PreviewAutoRefresh from "@/components/preview-auto-refresh";
import NoteDetail from "@/components/notes/note-detail";
import WorkBackLink from "@/components/work/work-back-link";
import WorkGallery from "@/components/work/work-gallery";
import WorkHeader from "@/components/work/work-header";
import WorkMeta from "@/components/work/work-meta";
import { getPreviewNote, getPreviewWork } from "./fetch";
import { defaultLocale, type Locale } from "@/lib/i18n";

async function renderWorkDraftPreview(slug: string, locale: Locale) {
  const result = await getPreviewWork(slug, { locale }).catch(() => null);
  const work = result?.data[0] ?? null;

  if (!work) {
    notFound();
  }

  return (
    <PageShell locale={locale}>
      <PreviewAutoRefresh contentType="works" slug={slug} />

      <WorkHeader
        title={work.title}
        cover={work.cover}
        description={work.description}
      />

      <WorkMeta locale={locale}
        client={work.client}
        campaign={work.campaign}
        country={work.country}
        creative={work.creative}
        strategy={work.strategy}
        lead_design={work.lead_design}
        design={work.design}
        copy={work.copy}
        illustration={work.illustration}
        animation={work.animation}
        photo={work.photo}
        develop={work.develop}
        work_team={work.work_team}
        disciplines={work.disciplines}
      />

      <WorkGallery images={work.images_before} />
      <WorkGallery quote={work.quote} images={work.images_after} />
      <WorkBackLink locale={locale} />
    </PageShell>
  );
}

async function renderNoteDraftPreview(slug: string, locale: Locale) {
  const note = await getPreviewNote(slug, { locale })
    .then((result) => result.data[0] ?? null)
    .catch(() => null);

  if (!note) {
    notFound();
  }

  return (
    <PageShell locale={locale}>
      <PreviewAutoRefresh contentType="notes" slug={slug} />
      <NoteDetail note={note} locale={locale} />
    </PageShell>
  );
}

export async function renderDraftPreview(
  contentType: string,
  slug: string,
  locale: Locale = defaultLocale,
): Promise<React.ReactNode | null> {
  if (contentType === "works") {
    return renderWorkDraftPreview(slug, locale);
  }

  if (contentType === "notes") {
    return renderNoteDraftPreview(slug, locale);
  }

  return null;
}
