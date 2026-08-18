import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import ScrollReveal from "@/components/ScrollReveal";
import { AccordionWrap } from "@/components/ui/custom/Accordion";
import type { FaqItem } from "@/types/domain";
import { getCopy, type Locale } from "@/lib/i18n";

interface FaqProps {
  items: FaqItem[];
}

export default function AboutFaq({ items, locale }: FaqProps & { locale: Locale }) {
  const copy = getCopy(locale);
  const accordionItems = items.map((item) => ({
    label: item.label,
    content: item.description,
  }));

  return (
    <GridContainer className="mt-4">
      <GridTwo>
        <ScrollReveal className="col-span-full">
          <h2 className="font-bold uppercase text-muted-foreground group-data-[variant=yellow]:text-black">
            {copy.studioFaqs}
          </h2>
        </ScrollReveal>
      </GridTwo>

      <GridFour>
        <ScrollReveal className="col-span-full" delay={0.15}>
          <AccordionWrap items={accordionItems} />
        </ScrollReveal>
      </GridFour>
    </GridContainer>
  );
}
