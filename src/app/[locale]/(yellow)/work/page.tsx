import type { Metadata } from "next";
import { baseMetadata, getPageMetadata } from "@/lib/metadata";
import PageContainer from "@/components/PageContainer";
import ScrollReveal from "@/components/ScrollReveal";
import WorkFilter from "@/components/work/WorkFilter";
import { getWorks } from "@/lib/plank/fetch";
import { getCopy, getRouteLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Work / Cases";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, getCopy(locale).work, "/work");
}

export default async function CasesPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const { data: works } = await getWorks({ locale });
  const title = getCopy(locale).work;

  return (
    <>
      <PageContainer>
        <ScrollReveal className="col-span-full mb-16 px-4" direction="down">
          <h1 className="text-6xl font-bold uppercase md:text-9xl">{title}</h1>
        </ScrollReveal>
      </PageContainer>

      {works.length > 0 ? <WorkFilter works={works} locale={locale} /> : null}
    </>
  );
}
