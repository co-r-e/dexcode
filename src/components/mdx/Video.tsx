"use client";

interface VideoProps {
  src: string;
  title?: string;
  autoPlay?: boolean;
}

export function Video({ src, title, autoPlay = false }: VideoProps) {
  const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");
  const isVimeo = src.includes("vimeo.com");

  if (isYouTube || isVimeo) {
    return (
      <div className="my-4 aspect-video w-full overflow-hidden rounded-xl">
        <iframe
          src={src}
          title={title ?? "Video"}
          className="h-full w-full"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    );
  }

  return (
    <video
      src={src}
      title={title}
      className="my-4 max-h-[60%] w-full rounded-xl"
      controls
      autoPlay={autoPlay}
      muted={autoPlay}
    />
  );
}
