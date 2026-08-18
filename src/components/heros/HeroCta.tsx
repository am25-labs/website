import GridContainer from "@/components/grids/GridContainer";
import GridSix from "@/components/grids/GridSix";
import GridFour from "@/components/grids/GridFour";
import ScrollReveal from "@/components/ScrollReveal";

interface HeroProps {
  heading: string;
  description: string;
}

export default function HeroCTA({ heading, description }: HeroProps) {
  return (
    <GridContainer className="md:min-h-dvh mt-4 md:-mt-32 mb-0 md:items-center">
      <GridSix>
        <ScrollReveal className="col-span-full md:pt-28" direction="down">
          <h2 className="whitespace-pre-line text-6xl md:text-9xl 2xl:text-[10rem] font-bold uppercase">
            {heading}
          </h2>
        </ScrollReveal>
      </GridSix>

      <GridFour>
        <ScrollReveal className="col-span-full" delay={0.2}>
          <p className="text-lg text-muted-foreground">{description}</p>
        </ScrollReveal>
      </GridFour>

      <GridFour>
        <ScrollReveal className="col-span-full mt-4 mb-8 md:my-0" delay={0.3}>
          <div className="flex md:justify-end"></div>
        </ScrollReveal>
      </GridFour>
    </GridContainer>
  );
}
