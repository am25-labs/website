import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBaseMetadata } from "@/lib/metadata";
import { getSingleWork, getWorks } from "@/lib/plank/fetch";
import WorkBackLink from "@/components/work/WorkBackLink";
import WorkGallery from "@/components/work/WorkGallery";
import WorkHeader from "@/components/work/WorkHeader";
import WorkMeta from "@/components/work/WorkMeta";
import { getLocale } from "@/lib/i18n-server";

const baseUrl = process.env.BASE_URL;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data: works } = await getWorks({ locale: "en" });
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const baseMetadata = getBaseMetadata(locale);
  const work = await getSingleWork(slug, { locale });

  if (!work) {
    return baseMetadata;
  }

  const { title, cover } = work;
  const imageObj = cover
    ? {
        url: `${cover.url}`,
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
      url: `${baseUrl}/cases/${slug}`,
      images: imageObj ? [imageObj] : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} - AM25`,
      images: imageObj ? [imageObj] : baseMetadata.twitter?.images,
    },
  };
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = await getSingleWork(slug);

  if (!work) {
    notFound();
  }

  const {
    title,
    cover,
    description,
    quote,
    images_before,
    images_after,
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
  } = work;

  return (
    <>
      <WorkHeader title={title} cover={cover} description={description} />

      <WorkMeta
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

      <WorkGallery images={images_before} />
      <WorkGallery quote={quote} images={images_after} />
      <WorkBackLink />
    </>
  );
}
