import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import GridContainer from "@/components/grids/GridContainer";

export default function WorkBackLink() {
  return (
    <GridContainer className="pt-8 pb-16">
      <div className="col-span-full">
        <Link
          href="/cases"
          className="inline-flex items-center gap-2 uppercase hover:font-bold"
        >
          <ArrowLeftIcon
            size={20}
            className="text-am-y group-data-[variant=yellow]:text-black group-data-[variant=light]:text-black shrink-0"
          />
          Back to works
        </Link>
      </div>
    </GridContainer>
  );
}
