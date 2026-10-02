import type { PodcastEpisode } from "@/types/domain/podcast"

type PodcastFeedEpisode = Omit<PodcastEpisode, "itunes"> & {
  itunes: Omit<PodcastEpisode["itunes"], "season" | "episode" | "episodeNumber" | "explicit"> & {
    season: number | string
    episode?: number | string
    episodeNumber?: number | string
    explicit?: boolean | string
  }
}

export async function fetchPodcast(): Promise<PodcastEpisode[]> {
  if (!process.env.PODCAST_API) throw new Error("PODCAST_API is required")
  const res = await fetch(process.env.PODCAST_API!, {
    cache: "no-store",
  })

  if (!res.ok) throw new Error("Failed to fetch podcast episodes")

  const episodes: PodcastFeedEpisode[] = await res.json()
  return episodes.map((episode) => ({
    ...episode,
    itunes: {
      ...episode.itunes,
      season: Number(episode.itunes.season),
      episode: episode.itunes.episode == null ? undefined : Number(episode.itunes.episode),
      episodeNumber: episode.itunes.episodeNumber == null ? undefined : Number(episode.itunes.episodeNumber),
      explicit: episode.itunes.explicit === true || episode.itunes.explicit === "true" || episode.itunes.explicit === "yes",
    },
  }))
}
