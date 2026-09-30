import { notFound } from "next/navigation";
import CaseStudyContent from "@/components/case-study/case-study-content";
import CaseStudyHeader from "@/components/case-study/case-study-header";
import LocalizedLegalTabs from "@/components/legal/localized-legal-tabs";
import PageContainer from "@/components/page-container";
import PageShell from "@/components/page-shell";
import PreviewAutoRefresh from "@/components/preview-auto-refresh";
import NoteDetail from "@/components/notes/note-detail";
import WorkBackLink from "@/components/work/work-back-link";
import WorkGallery from "@/components/work/work-gallery";
import WorkHeader from "@/components/work/work-header";
import WorkMeta from "@/components/work/work-meta";
import {
  getPreviewCaseStudy,
  getPreviewLegalPage,
  getPreviewNote,
  getPreviewWork,
} from "./fetch";
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
        locale={locale}
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

async function renderCaseStudyDraftPreview(slug: string, locale: Locale) {
  const caseStudy = await getPreviewCaseStudy(slug, { locale })
    .then((result) => result.data[0] ?? null)
    .catch(() => null);

  if (!caseStudy) {
    notFound();
  }

  return (
    <PageShell locale={locale}>
      <PreviewAutoRefresh contentType="case-studies" slug={slug} />

      <CaseStudyHeader
        title={caseStudy.title}
        cover={caseStudy.cover}
        description={caseStudy.description}
      />

      <WorkMeta
        locale={locale}
        client={caseStudy.client}
        campaign={caseStudy.campaign}
        country={caseStudy.country}
        creative={caseStudy.creative}
        strategy={caseStudy.strategy}
        lead_design={caseStudy.lead_design}
        design={caseStudy.design}
        copy={caseStudy.copy}
        illustration={caseStudy.illustration}
        animation={caseStudy.animation}
        photo={caseStudy.photo}
        develop={caseStudy.develop}
        work_team={caseStudy.work_team}
        disciplines={caseStudy.disciplines}
      />

      <CaseStudyContent
        locale={locale}
        scope={caseStudy.scope}
        problem={caseStudy.problem}
        research={caseStudy.research}
        solution={caseStudy.solution}
        outcome={caseStudy.outcome}
        learnings={caseStudy.learnings}
      />

      <WorkBackLink locale={locale} destination="notes" />
    </PageShell>
  );
}

async function renderLegalDraftPreview(
  contentType: "terms-of-service" | "privacy-policy",
  slug: string,
  locale: Locale,
) {
  const page = await getPreviewLegalPage(contentType, slug, { locale })
    .then((result) => result.data[0] ?? null)
    .catch(() => null);

  if (!page) {
    notFound();
  }

  return (
    <PageShell locale={locale}>
      <PreviewAutoRefresh contentType={contentType} slug={slug} />
      <PageContainer>
        <LocalizedLegalTabs title={page.title} page={page} locale={locale} />
      </PageContainer>
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

  if (contentType === "case-studies") {
    return renderCaseStudyDraftPreview(slug, locale);
  }

  if (contentType === "terms-of-service" || contentType === "privacy-policy") {
    return renderLegalDraftPreview(contentType, slug, locale);
  }

  return null;
}
