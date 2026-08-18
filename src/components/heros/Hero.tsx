import GridContainer from "@/components/grids/GridContainer";
import ScrollReveal from "@/components/ScrollReveal";

interface HeroProps {
  heading: string;
  description: string;
}

export default function Hero({ heading, description }: HeroProps) {
  return (
    <GridContainer className="md:min-h-dvh mt-4 md:-mt-32 mb-0 md:items-center">
      <div className="col-span-full md:pt-10">
        <ScrollReveal className="mx-auto w-full max-w-8xl" direction="down">
          <h2 className="whitespace-pre-line text-6xl md:text-9xl 2xl:text-[10rem] font-bold uppercase md:text-center leading-[1.07]">
            {heading}
          </h2>
        </ScrollReveal>

        <ScrollReveal
          className="mx-auto mt-8 mb-12 w-full max-w-4xl md:mb-0"
          delay={0.2}
        >
          <p className="text-xl text-muted-foreground md:text-center md:text-3xl">
            {description}
          </p>
        </ScrollReveal>
      </div>
    </GridContainer>
  );
}
