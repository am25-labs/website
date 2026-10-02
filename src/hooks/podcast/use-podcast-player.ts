import { useState, useRef, useEffect } from "react"
import type { PodcastEpisode } from "@/types/domain/podcast"
import { track } from "@/lib/analytics"
import { usePathname } from "next/navigation"

export default function usePodcastPlayer(audioUrl: string, episode: PodcastEpisode | null) {
  const pathname = usePathname()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
    const updatePlaying = () => setIsPlaying(true)
    const updatePaused = () => setIsPlaying(false)
    const reset = () => {
      setCurrentTime(0)
      setDuration(0)
      setIsPlaying(false)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("play", updatePlaying)
    audio.addEventListener("pause", updatePaused)
    audio.addEventListener("ended", updatePaused)
    audio.addEventListener("emptied", reset)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("play", updatePlaying)
      audio.removeEventListener("pause", updatePaused)
      audio.removeEventListener("ended", updatePaused)
      audio.removeEventListener("emptied", reset)
    }
  }, [])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused === false) {
      audio.pause()
    } else {
      try {
        await audio.play()
      } catch (error) {
        console.error("Failed to play podcast episode:", error)
      }
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLElement>) => {
    const audio = audioRef.current
    const progressBar = e.currentTarget
    const bounds = progressBar.getBoundingClientRect()
    if (!bounds.width || !duration) return
    const fraction = Math.max(0, Math.min(1, (e.clientX - bounds.left) / bounds.width))
    const newTime = fraction * duration
    if (audio) audio.currentTime = newTime
  }

  const skip = (seconds: number) => {
    const audio = audioRef.current
    if (audio) audio.currentTime = Math.max(0, Math.min(duration || Infinity, audio.currentTime + seconds))
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.playbackRate = playbackRate
    }
  }, [playbackRate, audioUrl])

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate)
  }

  const cyclePlaybackRate = () => {
    const rates = [0.5, 1, 1.5, 2]
    const currentIndex = rates.indexOf(playbackRate)
    const nextIndex = (currentIndex + 1) % rates.length
    setPlaybackRate(rates[nextIndex])
  }

  const handleShare = async () => {
    if (!episode) return
    const title = `${episode.title} | ALT-SIDE with Ale`
    const text =
      "ALT-SIDE with Ale es un espacio para explorar creatividad, experimentación y todo lo que pasa detrás de mis proyectos creativos. Sin reglas, sin guion, solo ideas y curiosidad."
    const shareUrl = new URL(pathname, window.location.origin)
    shareUrl.searchParams.set("guid", episode.guid)
    const url = shareUrl.toString()

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url })

        if (episode) {
          const eventLabel = `T${episode.itunes.season}E${episode.itunes.episode ?? episode.itunes.episodeNumber ?? 0} ${episode.title}`

          track("podcast-shared", {
            title: eventLabel,
            season: episode.itunes.season,
            source: "player",
          })
        }
      } catch (err) {
        console.error("Error al compartir:", err)
      }
    } else {
      alert("Tu navegador no soporta la opción de compartir nativa.")
    }
  }

  return {
    audioRef,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    handleProgressClick,
    skip,
    progressPercentage,
    playbackRate,
    setPlaybackRate,
    changePlaybackRate,
    cyclePlaybackRate,
    handleShare,
  }
}
