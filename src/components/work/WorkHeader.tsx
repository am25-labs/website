import Image from "next/image";
import type { Work } from "@/types/domain";
import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import WorkDescription from "@/components/work/WorkDescription";

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
      <div className="col-span-full">
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
      </div>

      <GridFour className="mt-4">
        <div className="col-span-full">
          <h1 className="text-3xl md:text-4xl font-bold uppercase">{title}</h1>
        </div>
      </GridFour>

      <GridFour className="mt-4">
        <div className="col-span-full">
          {description && <WorkDescription content={description} />}
        </div>
      </GridFour>
    </GridContainer>
  );
}
