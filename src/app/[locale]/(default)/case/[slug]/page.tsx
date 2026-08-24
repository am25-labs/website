import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyContent from "@/components/case-study/case-study-content";
import CaseStudyHeader from "@/components/case-study/case-study-header";
import WorkBackLink from "@/components/work/work-back-link";
import WorkMeta from "@/components/work/work-meta";
import { getBaseMetadata } from "@/lib/metadata";
import { getCaseStudies, getSingleCaseStudy } from "@/lib/plank/fetch";
import { getRouteLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;

interface PageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateStaticParams() {
  const { data: caseStudies } = await getCaseStudies({ locale: "en" });
  return ["es", "en"].flatMap((locale) =>
    caseStudies.map((caseStudy) => ({ locale, slug: caseStudy.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRouteLocale(params);
  const baseMetadata = getBaseMetadata(locale);
  const caseStudy = await getSingleCaseStudy(slug, { locale });

  if (!caseStudy) {
    return baseMetadata;
  }

  const { title, cover } = caseStudy;
  const image = cover
    ? {
        url: cover.url,
        width: 1200,
        height: 630,
        alt: title,
      }
    : undefined;

  return {
    ...baseMetadata,
    title: `${title} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} - AM25`,
      url: `${baseUrl}/case/${slug}`,
      images: image ? [image] : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} - AM25`,
      images: image ? [image] : baseMetadata.twitter?.images,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getRouteLocale(params);
  const caseStudy = await getSingleCaseStudy(slug, { locale });

  if (!caseStudy) {
    notFound();
  }

  const {
    title,
    cover,
    description,
    client,
    campaign,
    country,
    creative,
    strategy,
    lead_design,
    design,
    copy,
    illustration,
    animation,
    photo,
    develop,
    work_team,
    disciplines,
    scope,
    problem,
    research,
    solution,
    outcome,
    learnings,
  } = caseStudy;

  return (
    <>
      <CaseStudyHeader
        title={title}
        cover={cover}
        description={description}
      />

      <WorkMeta
        locale={locale}
        client={client}
        campaign={campaign}
        country={country}
        creative={creative}
        strategy={strategy}
        lead_design={lead_design}
        design={design}
        copy={copy}
        illustration={illustration}
        animation={animation}
        photo={photo}
        develop={develop}
        work_team={work_team}
        disciplines={disciplines}
      />

      <CaseStudyContent
        locale={locale}
        scope={scope}
        problem={problem}
        research={research}
        solution={solution}
        outcome={outcome}
        learnings={learnings}
      />

      <WorkBackLink locale={locale} />
    </>
  );
}
