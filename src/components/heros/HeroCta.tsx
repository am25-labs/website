import GridContainer from "@/components/grids/GridContainer";
import GridSix from "@/components/grids/GridSix";
import GridFour from "@/components/grids/GridFour";

interface HeroProps {
  heading: string;
  description: string;
}

export default function HeroCTA({ heading, description }: HeroProps) {
  return (
    <GridContainer className="md:min-h-dvh mt-4 md:-mt-32 mb-0 md:items-center">
      <GridSix>
        <div className="col-span-full md:pt-28">
          <h2 className="whitespace-pre-line text-6xl md:text-9xl 2xl:text-[10rem] font-bold uppercase">
            {heading}
          </h2>
        </div>
      </GridSix>

      <GridFour>
        <div className="col-span-full">
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>
      </GridFour>

      <GridFour>
        <div className="col-span-full mt-4 mb-8 md:my-0">
          <div className="flex md:justify-end"></div>
        </div>
      </GridFour>
    </GridContainer>
  );
}
