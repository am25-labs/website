import ContentRenderer from "@/components/content-renderer";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { AccordionWrapItem } from "@/types/domain";

interface Props {
  items: AccordionWrapItem[];
}

export function AccordionWrap({ items }: Props) {
  return (
    <Accordion type="single" collapsible>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="group-data-[variant=light]:data-open:bg-muted/10"
        >
          <AccordionTrigger className="group-data-[variant=light]:[&_svg]:text-electric text-base font-bold">
            {item.label}
          </AccordionTrigger>
          <AccordionContent className="text-neutral-400 group-data-[variant=default]:text-white text-base group-data-[variant=light]:text-electric">
            <ContentRenderer content={item.content} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
