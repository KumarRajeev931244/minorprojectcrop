// components/VideoCard.tsx
import React from "react";
import { Play } from "lucide-react";
import clsx from "clsx";

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channel: string;
};

type Props = {
  video: VideoItem;
  className?: string;
  onWatch?: (videoId: string) => void;
};

export const VideoCard: React.FC<Props> = ({ video, className, onWatch }) => {
  return (
    <article
      className={clsx(
        "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200",
        className
      )}
    >
      <div className="relative w-full aspect-video bg-gray-100">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition">
          <button
            aria-label="Watch"
            onClick={() => onWatch?.(video.id)}
            className="bg-white/90 p-3 rounded-full shadow-md hover:scale-105 transition"
          >
            <Play className="w-6 h-6 text-green-700" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2">
          {video.title}
        </h3>
        <p className="text-xs text-gray-500 mt-2">{video.channel}</p>
        <div className="mt-3 flex items-center justify-between">
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:underline"
          >
            Watch on YouTube
          </a>
          <span className="text-xs text-gray-400">•</span>
        </div>
      </div>
    </article>
  );
};
