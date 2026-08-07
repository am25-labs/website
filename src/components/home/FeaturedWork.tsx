import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import GridContainer from "@/components/grids/GridContainer";
import { getWorks } from "@/lib/plank/fetch";
import WorkCard from "@/components/work/WorkCard";

export default async function FeaturedWork() {
  const { data } = await getWorks({ onlyFeatured: true });
  const works = data.slice(0, 4);

  return (
    <>
      <GridContainer>
        <div className="col-span-full">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase text-muted-foreground group-data-[variant=yellow]:text-black">
              Featured work
            </h2>
            <Link
              href="/brand"
              className="flex items-center text-sm font-bold uppercase text-muted-foreground hover:underline group-data-[variant=yellow]:text-black"
            >
              OUR BRAND
              <ArrowRightIcon size={16} className="shrink-0" />
            </Link>
          </div>
        </div>
      </GridContainer>

      <GridContainer>
        {works.map((work) => (
          <div key={work.id} className="col-span-2">
            <WorkCard
              cover={work.cover?.url ?? null}
              title={work.title}
              href={`/cases/${work.slug}`}
              category={work.disciplines
                .map((discipline) => discipline.title)
                .join(", ")}
            />
          </div>
        ))}
      </GridContainer>
    </>
  );
}
