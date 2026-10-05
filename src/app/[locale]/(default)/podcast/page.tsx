import { Suspense } from "react";
import type { Metadata } from "next";
import { fetchPodcast } from "@/lib/fetch-podcast";
import { getPodcastLinks } from "@/lib/plank/fetch";
import { getPageMetadata } from "@/lib/metadata";
import { getRouteLocale, withLocale } from "@/lib/i18n";
import { EpisodeProvider } from "@/hooks/podcast/use-episode-provider";
import PodcastPlayer from "@/components/podcast/podcast-player";
import PodcastEpisodes from "@/components/podcast/podcast-episodes";
import PodcastButtons from "@/components/podcast/podcast-buttons";
import GridContainer from "@/components/grids/grid-container";
import GridSix from "@/components/grids/grid-six";
import GridTwo from "@/components/grids/grid-two";
import ScrollReveal from "@/components/scroll-reveal";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, "ALT-SIDE with Ale Podcast", withLocale(locale, "/podcast"));
}

export default async function PodcastPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const [episodes, links] = await Promise.all([fetchPodcast(), getPodcastLinks()]);

  return (
    <>
      <Suspense>
        <EpisodeProvider initialEpisode={episodes[0] ?? null} episodes={episodes}>
          <GridContainer className="mt-0 md:pt-2 mb-0">
            <GridSix>
              <ScrollReveal className="col-span-full" direction="left">
                <PodcastPlayer />
              </ScrollReveal>
            </GridSix>
            <GridTwo>
              <ScrollReveal className="col-span-full" direction="right" delay={0.15}>
                <p className="text-center font-bold md:hidden">Episode list:</p>
                <PodcastEpisodes episodes={episodes} locale={locale} />
              </ScrollReveal>
            </GridTwo>
          </GridContainer>
        </EpisodeProvider>
      </Suspense>
      <GridContainer className="mt-0">
        <ScrollReveal className="col-span-full" delay={0.25}>
          <div className="border-t mb-8" />
          <h3 className="text-center font-bold mb-4">Also available in:</h3>
          <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto gap-2 md:gap-5">
            {links.filter((link) => link.url).map((link) => (
              <PodcastButtons key={link.platform} {...link} />
            ))}
          </div>
        </ScrollReveal>
      </GridContainer>
    </>
  );
}
