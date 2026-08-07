import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import { AccordionWrap } from "@/components/ui/custom/Accordion";
import type { FaqItem } from "@/types/domain";

interface FaqProps {
  items: FaqItem[];
}

export default function AboutFaq({ items }: FaqProps) {
  const accordionItems = items.map((item) => ({
    label: item.label,
    content: item.description,
  }));

  return (
    <GridContainer className="mt-4">
      <GridTwo>
        <span className="col-span-full">
          <h2 className="font-bold uppercase text-muted-foreground group-data-[variant=yellow]:text-black">
            Studio FAQs
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
