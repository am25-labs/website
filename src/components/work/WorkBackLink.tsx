import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import GridContainer from "@/components/grids/GridContainer";
import { BannerPoweredBy } from "@/components/PoweredBy";
import { Separator } from "@/components/ui/separator";

export default function WorkBackLink() {
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
            Back to works
          </Link>
        </div>

        <div className="mx-auto max-w-2xl">
          <BannerPoweredBy
            logoSrc="/plank-logo-w.svg"
            logoAlt="Plank CMS"
            label="Powered by Plank CMS"
            link="https://plank-cms.com"
            mode="dark"
          />
        </div>
      </div>
    </GridContainer>
  );
}
