import clsx from "clsx";
import {
  SiSpotify,
  SiApplepodcasts,
  SiAmazonmusic,
  SiYoutubemusic,
} from "react-icons/si";
import type { PodcastPlatform } from "@/types/domain/podcast";

const icons: Record<PodcastPlatform, React.ReactNode> = {
  spotify: <SiSpotify size={20} />,
  apple: <SiApplepodcasts size={20} />,
  amazon: <SiAmazonmusic size={20} />,
  youtube: <SiYoutubemusic size={20} />,
};

interface PodcastButtonsProps {
  platform: PodcastPlatform;
  url: string | undefined;
  label?: string;
}

export default function PodcastButtons({
  platform,
  url,
  label,
}: PodcastButtonsProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        "inline-flex items-center justify-center gap-2 p-3 rounded-full",
        "w-full border border-white bg-plot text-white text-sm font-bold uppercase hover:border-white hover:bg-white hover:text-plot",
      )}
    >
      {icons[platform]}
      {label && <span>{label}</span>}
    </a>
  );
}
