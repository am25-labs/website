import { useEffect } from "react"
import type { PodcastEpisode } from "@/types/domain/podcast"

export default function useMediaSession(
  episode: PodcastEpisode | null,
  audioRef: React.RefObject<HTMLAudioElement | null>,
  isPlaying: boolean
) {
  useEffect(() => {
    if (!episode || !("mediaSession" in navigator)) return

    const { title, itunes } = episode

    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: "ALT-SIDE with Ale",
      album: `Temporada ${itunes.season}`,
      artwork: itunes.image ? [{ src: itunes.image, sizes: "512x512", type: "image/png" }] : [],
    })

    navigator.mediaSession.setActionHandler("play", () => {
      audioRef.current?.play()
    })

    navigator.mediaSession.setActionHandler("pause", () => {
      audioRef.current?.pause()
    })

    navigator.mediaSession.setActionHandler("seekbackward", () => {
      if (audioRef.current) audioRef.current.currentTime -= 10
    })

    navigator.mediaSession.setActionHandler("seekforward", () => {
      if (audioRef.current) audioRef.current.currentTime += 15
    })

    navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused"
  }, [episode, audioRef, isPlaying])
}
