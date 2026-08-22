import Image from "next/image";
import type { Work } from "@/types/domain";
import GridContainer from "@/components/grids/grid-container";
import GridFour from "@/components/grids/grid-four";
import ScrollReveal from "@/components/scroll-reveal";
import WorkDescription from "@/components/work/work-description";

interface WorkHeaderProps {
  title: Work["title"];
  cover: Work["cover"];
  description?: Work["description"];
}

export default function WorkHeader({
  title,
  cover,
  description,
}: WorkHeaderProps) {
  return (
    <GridContainer>
      <ScrollReveal className="col-span-full">
        <div className="aspect-square relative md:aspect-video">
          {cover && (
            <Image
              src={cover.url}
              fill
              alt={cover.alt ?? title}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </ScrollReveal>

      <GridFour className="mt-4">
        <ScrollReveal className="col-span-full" delay={0.15}>
          <h1 className="text-3xl md:text-4xl font-bold uppercase">{title}</h1>
        </ScrollReveal>
      </GridFour>

      <GridFour className="mt-4">
        <ScrollReveal className="col-span-full" delay={0.25}>
          {description && <WorkDescription content={description} />}
        </ScrollReveal>
      </GridFour>
    </GridContainer>
  );
}
