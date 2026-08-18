import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import ScrollReveal from "@/components/ScrollReveal";
import { RefreshCwIcon } from "lucide-react";

interface GenericContentProps {
  title: string;
  updated?: string | null;
  quote?: string | null;
  children: React.ReactNode;
}

export default function GenericContent({
  title,
  updated,
  quote,
  children,
}: GenericContentProps) {
  return (
    <GridContainer className="mb-16">
      <GridTwo className="mb-8">
        <ScrollReveal className="col-span-full" direction="down">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">{title}</h1>

          {updated && (
            <span
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
              title="Updated At"
            >
              <RefreshCwIcon size={16} />
              {updated}
            </span>
          )}
        </ScrollReveal>
      </GridTwo>

      <GridFour>
        {quote ? (
          <ScrollReveal className="col-span-full mb-4" delay={0.15}>
            <p className="text-2xl">{quote}</p>
          </ScrollReveal>
        ) : null}
        <ScrollReveal className="col-span-full" delay={quote ? 0.35 : 0.15}>
          {children}
        </ScrollReveal>
      </GridFour>
    </GridContainer>
  );
}
