import type { Metadata } from "next";
import { baseMetadata, getPageMetadata } from "@/lib/metadata";
import PageContainer from "@/components/PageContainer";
import CasesFilter from "@/components/work/CasesFilter";
import { getWorks } from "@/lib/plank/fetch";
import { getCopy } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Work / Cases";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return getPageMetadata(locale, getCopy(locale).workCases, "/cases");
}

export default async function CasesPage() {
  const locale = await getLocale();
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
