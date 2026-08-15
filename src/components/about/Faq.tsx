import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import { AccordionWrap } from "@/components/ui/custom/Accordion";
import type { FaqItem } from "@/types/domain";
import { getCopy } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

interface FaqProps {
  items: FaqItem[];
}

export default async function AboutFaq({ items }: FaqProps) {
  const copy = getCopy(await getLocale());
  const accordionItems = items.map((item) => ({
    label: item.label,
    content: item.description,
  }));

  return (
    <GridContainer className="mt-4">
      <GridTwo>
        <span className="col-span-full">
          <h2 className="font-bold uppercase text-muted-foreground group-data-[variant=yellow]:text-black">
            {copy.studioFaqs}
          </h2>
        </span>
      </GridTwo>

      <GridFour>
        <div className="col-span-full">
          <AccordionWrap items={accordionItems} />
        </div>
      </GridFour>
    </GridContainer>
  );
}
