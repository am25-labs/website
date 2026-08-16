import { getPageMetadata } from "@/lib/metadata";
import { getContentHub } from "@/lib/plank/fetch";
import type { Metadata } from "next";
import GridContainer from "@/components/grids/GridContainer";
import GridSix from "@/components/grids/GridSix";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import AccessDialog from "@/components/content/AccessDialog";
import FeaturedCarousel from "@/components/content/FeaturedCarousel";
import { getCopy, getRouteLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Content Hub";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  const description = locale === "es"
    ? "Una fuente única de verdad para el contenido detrás de tu trabajo."
    : "A single source of truth for the content behind your work.";
  return getPageMetadata(locale, pageTitle, "/content", description);
}

const slides = [
  {
    src: "https://cdn.am25.app/plank/media/fda43d8c-d24f-4cf8-bdc7-d196866a67db/49c183003edf3eea6ae4b1ae8994840e.webp",
    alt: "Assets grid",
  },
  {
    src: "https://cdn.am25.app/plank/media/fda43d8c-d24f-4cf8-bdc7-d196866a67db/eb7bbb4cddf65ae910e792d46ed6c221.webp",
    alt: "Paths grid",
  },
  {
    src: "https://cdn.am25.app/plank/media/fda43d8c-d24f-4cf8-bdc7-d196866a67db/cfbd01d5494e7e07888a9614e0e5b40e.webp",
    alt: "File sharing",
  },
  {
    src: "https://cdn.am25.app/plank/media/fda43d8c-d24f-4cf8-bdc7-d196866a67db/261c57fcd8405e4ae7a5ca601fb90db3.webp",
    alt: "Asset detail view",
  },
];

export default async function ContentHubPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const entry = await getContentHub({ locale });
  const copy = getCopy(locale);

  return (
    <>
      <GridContainer className="md:min-h-dvh mt-4 md:-mt-32 mb-0 md:items-center">
        <GridSix>
          <div className="col-span-full md:pt-28">
            <h2 className="whitespace-pre-line text-6xl md:text-9xl 2xl:text-[10rem] font-bold uppercase">
              {entry.hero_title}
            </h2>
          </div>
        </GridSix>

        <GridFour>
          <div className="col-span-full">
            <p className="text-lg text-muted-foreground">
              {entry.hero_description}
            </p>
          </div>
        </GridFour>

        <GridFour>
          <div className="col-span-full mt-4 mb-8 md:my-0">
            <div className="flex md:justify-end">
              <AccessDialog locale={locale} />
            </div>
          </div>
        </GridFour>
      </GridContainer>

      <Separator className="col-span-full" />

      <GridContainer>
        <div className="col-span-full mt-4">
          <FeaturedCarousel slides={slides} />

          <h2 className="my-8 text-lg font-bold uppercase">{copy.whyItExists}</h2>

          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
            {(entry.features ?? []).map((item) => (
              <Card
                key={item.label}
                className="min-h-48 gap-0 rounded-none border-0 py-6 text-sm ring-0 bg-black"
              >
                <div className="flex flex-col gap-4 px-6 py-4">
                  <span className="text-3xl font-bold uppercase">
                    {item.label}
                  </span>
                  <span className="text-muted-foreground">
                    {item.description}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </GridContainer>

      <Separator className="col-span-full" />

      <GridContainer>
        <GridSix>
          <div className="col-span-full mt-8">
            <h2 className="whitespace-pre-line text-6xl md:text-9xl 2xl:text-[10rem] font-bold uppercase">
              {entry.end_title}
            </h2>
          </div>
        </GridSix>

        <GridTwo className="self-end">
          <div className="col-span-full">
            <div className="flex flex-col gap-8">
              <p className="text-muted-foreground">{entry.end_description}</p>

              <AccessDialog className="w-fit" locale={locale} />
            </div>
          </div>
        </GridTwo>
      </GridContainer>
    </>
  );
}
