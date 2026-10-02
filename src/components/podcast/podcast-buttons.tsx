import clsx from "clsx"
import {
  SiSpotify,
  SiApplepodcasts,
  SiAmazonmusic,
  SiYoutubemusic,
} from "react-icons/si"
import type { PodcastPlatform } from "@/types/domain/podcast"

const icons: Record<PodcastPlatform, React.ReactNode> = {
  spotify: <SiSpotify size={20} />,
  apple: <SiApplepodcasts size={20} />,
  amazon: <SiAmazonmusic size={20} />,
  youtube: <SiYoutubemusic size={20} />,
}

const bgColors: Record<PodcastPlatform, string> = {
  spotify: "hover:bg-[#1ed760] hover:text-black",
  apple: "hover:bg-[#b150e2] hover:text-black",
  amazon: "hover:bg-[#25d1da] hover:text-black",
  youtube: "hover:bg-[#ff0000] hover:text-black",
}

interface PodcastButtonsProps {
  platform: PodcastPlatform
  url: string | undefined
  label?: string
}

export default function PodcastButtons({ platform, url, label }: PodcastButtonsProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center justify-center gap-2 p-3 rounded-full",
        "bg-muted text-sm font-bold uppercase w-full",
        bgColors[platform],
        ""
      )}
    >
      {icons[platform]}
      {label && <span>{label}</span>}
    </a>
  )
}
