import GridContainer from "@/components/grids/GridContainer";

interface HeroProps {
  heading: string;
  description: string;
}

export default function Hero({ heading, description }: HeroProps) {
  return (
    <GridContainer className="md:min-h-dvh mt-4 md:-mt-32 mb-0 md:items-center">
      <div className="col-span-full md:pt-10">
        <div className="mx-auto w-full max-w-8xl">
          <h2 className="whitespace-pre-line text-6xl md:text-9xl 2xl:text-[10rem] font-bold uppercase md:text-center">
            {heading}
          </h2>
        </div>

        <div className="mx-auto w-full max-w-4xl mt-8 mb-12 md:mb-0">
          <p className="text-xl text-muted-foreground md:text-center md:text-3xl">
            {description}
          </p>
        </div>
      </div>
    </GridContainer>
  );
}
