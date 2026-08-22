interface VimeoEmbedProps {
  url: string;
}

export default function VimeoEmbed({ url }: VimeoEmbedProps) {
  const videoId = url.split("/").pop();

  if (!videoId) return null;

  return (
    <div className="aspect-video w-full overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://player.vimeo.com/video/${videoId}`}
        title="Vimeo video player"
        allow="autoplay; fullscreen; picture-in-picture"
        referrerPolicy="origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
