import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import GridContainer from "@/components/grids/GridContainer";
import { BannerPoweredBy } from "@/components/PoweredBy";
import { Separator } from "@/components/ui/separator";
import { getCopy } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export default async function WorkBackLink() {
  const copy = getCopy(await getLocale());
  return (
    <GridContainer>
      <div className="col-span-full">
        <div className="flex flex-col items-center py-16">
          <Separator />
          <Link
            href="/cases"
            className="mt-8 flex items-center gap-2 text-center font-bold uppercase hover:underline"
          >
            <ChevronLeftIcon size={21} />
            {copy.backToWorks}
          </Link>
        </div>

        <div className="mx-auto max-w-2xl">
          <BannerPoweredBy
            logoSrc="/plank-logo-w.svg"
            logoAlt="Plank CMS"
            label={copy.poweredByPlank}
            link="https://plank-cms.com"
            mode="dark"
          />
        </div>
      </div>
    </GridContainer>
  );
}
