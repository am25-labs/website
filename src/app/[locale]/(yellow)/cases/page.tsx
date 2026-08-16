import type { Metadata } from "next";
import { baseMetadata, getPageMetadata } from "@/lib/metadata";
import PageContainer from "@/components/PageContainer";
import CasesFilter from "@/components/work/CasesFilter";
import { getWorks } from "@/lib/plank/fetch";
import { getCopy, getRouteLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Work / Cases";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, getCopy(locale).workCases, "/cases");
}

export default async function CasesPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const { data: works } = await getWorks({ locale });
  const title = getCopy(locale).workCases;

  return (
    <>
      <PageContainer>
        <div className="col-span-full mb-16 px-4">
          <h1 className="text-6xl font-bold uppercase md:text-9xl">
            {title}
          </h1>
        </div>
      </PageContainer>

      {works.length > 0 ? <CasesFilter works={works} locale={locale} /> : null}
    </>
  );
}
