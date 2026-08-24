import Image from "next/image";
import type { CaseStudy } from "@/types/domain";
import GridContainer from "@/components/grids/grid-container";
import GridFour from "@/components/grids/grid-four";
import ScrollReveal from "@/components/scroll-reveal";

interface CaseStudyHeaderProps {
  title: CaseStudy["title"];
  cover: CaseStudy["cover"];
  description: CaseStudy["description"];
}

export default function CaseStudyHeader({
  title,
  cover,
  description,
}: CaseStudyHeaderProps) {
  return (
    <GridContainer>
      <ScrollReveal className="col-span-full">
        <div className="relative aspect-square md:aspect-video">
          {cover ? (
            <Image
              src={cover.url}
              fill
              alt={cover.alt ?? title}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>
      </ScrollReveal>

      <GridFour className="mt-4">
        <ScrollReveal className="col-span-full" delay={0.15}>
          <h1 className="text-3xl font-bold uppercase md:text-4xl">{title}</h1>
        </ScrollReveal>
      </GridFour>

      {description ? (
        <GridFour className="mt-4">
          <ScrollReveal className="col-span-full" delay={0.25}>
            <p>{description}</p>
          </ScrollReveal>
        </GridFour>
      ) : null}
    </GridContainer>
  );
}
