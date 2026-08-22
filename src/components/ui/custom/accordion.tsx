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
          className="group-data-[variant=yellow]:data-open:bg-muted/10 group-data-[variant=light]:data-open:bg-muted/10"
        >
          <AccordionTrigger className="group-data-[variant=yellow]:[&_svg]:text-black group-data-[variant=light]:[&_svg]:text-black text-base font-bold">
            {item.label}
          </AccordionTrigger>
          <AccordionContent className="text-neutral-400 text-base">
            <ContentRenderer content={item.content} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
