import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import PreviewAutoRefresh from "@/components/PreviewAutoRefresh";
import LocalizedNoteTabs from "@/components/notes/LocalizedNoteTabs";
import WorkBackLink from "@/components/work/WorkBackLink";
import WorkGallery from "@/components/work/WorkGallery";
import WorkHeader from "@/components/work/WorkHeader";
import WorkMeta from "@/components/work/WorkMeta";
import { getPreviewNote, getPreviewWork } from "./fetch";

async function renderWorkDraftPreview(slug: string) {
  const result = await getPreviewWork(slug).catch(() => null);
  const work = result?.data[0] ?? null;

  if (!work) {
    notFound();
  }

  return (
    <PageShell>
      <PreviewAutoRefresh contentType="works" slug={slug} />

      <WorkHeader
        title={work.title}
        cover={work.cover}
        description={work.description}
      />

      <WorkMeta
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
      <WorkBackLink />
    </PageShell>
  );
}

async function renderNoteDraftPreview(slug: string) {
  const [enNote, esNote] = await Promise.all([
    getPreviewNote(slug)
      .then((result) => result.data[0] ?? null)
      .catch(() => null),
    getPreviewNote(slug, { locale: "es" })
      .then((result) => result.data[0] ?? null)
      .catch(() => null),
  ]);

  if (!enNote && !esNote) {
    notFound();
  }

  return (
    <PageShell>
      <PreviewAutoRefresh contentType="notes" slug={slug} />
      <LocalizedNoteTabs enNote={enNote} esNote={esNote} />
    </PageShell>
  );
}

export async function renderDraftPreview(
  contentType: string,
  slug: string,
): Promise<React.ReactNode | null> {
  if (contentType === "works") {
    return renderWorkDraftPreview(slug);
  }

  if (contentType === "notes") {
    return renderNoteDraftPreview(slug);
  }

  return null;
}
