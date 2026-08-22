import GridTwo from "@/components/grids/grid-two";
import ScrollReveal from "@/components/scroll-reveal";
import { AccordionWrap } from "@/components/ui/custom/accordion";
import { Separator } from "@/components/ui/separator";
import type { FaqItem } from "@/types/domain";
import { getCopy, type Locale } from "@/lib/i18n";

interface FaqProps {
  items: FaqItem[];
}

export default function ContentFaq({
  items,
  locale,
}: FaqProps & { locale: Locale }) {
  const copy = getCopy(locale);
  const accordionItems = items.map((item) => ({
    label: item.label,
    content: item.description,
  }));

  return (
    <GridTwo className="mt-4 md:mt-0">
      <ScrollReveal className="col-span-full">
        <h2 className="font-bold uppercase text-muted-foreground group-data-[variant=yellow]:text-black">
          {copy.studioFaqs}
        </h2>
      </ScrollReveal>

      <ScrollReveal className="col-span-full" delay={0.15}>
        <AccordionWrap items={accordionItems} />
      </ScrollReveal>
    </GridTwo>
  );
}
