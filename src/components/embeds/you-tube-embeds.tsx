interface YouTubeEmbedProps {
  url: string;
}

export default function YouTubeEmbed({ url }: YouTubeEmbedProps) {
  const videoId = url.split("v=")[1] || url.split("/").pop();

  if (!videoId) return null;

  return (
    <div className="aspect-video w-full overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
