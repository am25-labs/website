"use client";

import usePodcastPlayer from "@/hooks/podcast/use-podcast-player";
import { useCurrentEpisode } from "@/hooks/podcast/use-episode-provider";
import useMediaSession from "@/hooks/podcast/use-media-session";
import { usePodcastAnalytics } from "@/hooks/podcast/use-podcast-analytics";
import { Progress } from "@/components/ui/progress";
import { getCopy, type Locale } from "@/lib/i18n";
import clsx from "clsx";
import {
  MicIcon,
  PlayIcon,
  PauseIcon,
  FastForwardIcon,
  RewindIcon,
  ShareIcon,
} from "lucide-react";

export default function PodcastPlayer({ locale }: { locale: Locale }) {
  const copy = getCopy(locale);
  const { currentEpisode: episode } = useCurrentEpisode();

  const {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    handleProgressClick,
    skip,
    progressPercentage,
    playbackRate,
    cyclePlaybackRate,
    handleShare,
  } = usePodcastPlayer(episode?.enclosure?.url ?? "", episode);

  useMediaSession(episode, audioRef, isPlaying);

  usePodcastAnalytics({
    title: episode?.title ?? "",
    season: episode?.itunes.season ?? 0,
    episodeNumber: episode?.itunes.episode ?? 0,
    type: episode?.itunes.episodeType ?? "",
    duration,
    currentTime,
  });

  if (!episode) {
    return <p className="text-center my-10">No episodes available</p>;
  }

  return (
    <>
      <audio ref={audioRef} src={episode?.enclosure?.url} />

      <div
        className={clsx("flex flex-col justify-between mt-4 md:mt-0 mb-10")}
      >
        <div className={clsx("flex flex-col items-center gap-2")}>
          <div
            className={clsx(
              "relative aspect-square overflow-hidden",
              "w-54 h-54 md:w-72 md:h-72 xl:w-96 xl:h-96 2xl:w-105 2xl:h-105",
            )}
          >
            <img
              src={episode?.itunes.image}
              alt={episode?.title}
              className={clsx("border object-cover")}
            />
          </div>

          <h3
            className={clsx(
              "flex items-center gap-2",
              "text-center text-xl font-bold uppercase mt-1",
            )}
          >
            {episode?.title}
            {episode?.itunes.explicit === true && (
              <span
                className={clsx(
                  "text-[0.5rem] font-bold border rounded px-1.5 py-0.5",
                )}
              >
                E
              </span>
            )}
          </h3>

          <div
            className={clsx(
              "text-muted-foreground text-sm uppercase -mt-2 mb-2",
            )}
          >
            {episode?.itunes.episodeType === "trailer" ? (
              <span className={clsx("flex items-center gap-0.5")}>
                <MicIcon size={16} />{copy.podcastSeasonLabel}{episode?.itunes.season} Trailer
              </span>
            ) : (
              <span className={clsx("flex items-center gap-0.5")}>
                <MicIcon size={16} />{copy.podcastSeasonLabel}{episode?.itunes.season} E
                {episode?.itunes.episode}
              </span>
            )}
          </div>
        </div>

        <div>
          <div className={clsx("md:px-15")}>
            <Progress
              value={progressPercentage}
              aria-label="Playback progress"
              className="h-1 cursor-pointer bg-white/25 [&_[data-slot=progress-indicator]]:bg-white group-data-[variant=light]:bg-electric/20 group-data-[variant=light]:[&_[data-slot=progress-indicator]]:bg-electric"
              onClick={handleProgressClick}
            />

            <div
              className={clsx("flex justify-between text-xs mt-2 mb-5 px-1")}
            >
              <span>
                {Math.floor(currentTime / 60)}:
                {Math.floor(currentTime % 60)
                  .toString()
                  .padStart(2, "0")}
              </span>
              <span>
                {Math.floor(duration / 60)}:
                {Math.floor(duration % 60)
                  .toString()
                  .padStart(2, "0")}
              </span>
            </div>
          </div>

          <div
            className={clsx(
              "flex flex-row items-center justify-center gap-7 md:gap-10",
            )}
          >
            <button
              onClick={cyclePlaybackRate}
              className={clsx("text-lg cursor-pointer")}
            >
              {playbackRate}x
            </button>

            <button
              onClick={() => skip(-10)}
              className={clsx("cursor-pointer")}
            >
              <RewindIcon size={32} />
            </button>

            <button onClick={togglePlay} className={clsx("cursor-pointer")}>
              {isPlaying ? <PauseIcon size={48} /> : <PlayIcon size={48} />}
            </button>

            <button onClick={() => skip(15)} className={clsx("cursor-pointer")}>
              <FastForwardIcon size={32} />
            </button>

            <button onClick={handleShare} className={clsx("cursor-pointer")}>
              <ShareIcon size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
