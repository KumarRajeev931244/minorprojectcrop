// app/agri-videos/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { VideoCard,VideoItem } from "@/components/ui/videoCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

const CATEGORY_PRESETS = [
  "agriculture farming",
  "crop disease management",
  "organic farming",
  "smart farming",
  "drip irrigation",
  "pest management",
];

export default function AgriVideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [query, setQuery] = useState("agriculture farming");
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchVideos = async (searchQuery?: string, pageToken?: string) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ q: searchQuery || query });
      if (pageToken) params.set("pageToken", pageToken);

      const res = await fetch(`/api/videos?${params.toString()}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to fetch videos");
      }

      const data = await res.json();
      const items = data.videos || [];

      if (pageToken) {
        setVideos((prev) => [...prev, ...items]);
      } else {
        setVideos(items);
      }

      setNextPageToken(data.nextPageToken || null);
    } catch (err: any) {
      console.error("Fetch videos error:", err);
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(); // initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-green-100 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-green-800">
              🌾 Agriculture Videos
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Tutorials, disease management, smart farming and more.
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search agriculture topics..."
                className="pl-10 pr-4 py-2 w-64 md:w-96 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
            <button
              onClick={() => fetchVideos(query)}
              className="px-4 py-2 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
            >
              Search
            </button>
          </div>
        </header>

        {/* Category chips */}
        <div className="mb-6 flex flex-wrap gap-3">
          {CATEGORY_PRESETS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setQuery(c);
                fetchVideos(c);
              }}
              className="px-3 py-1 rounded-full border border-green-200 text-sm text-green-700 bg-white hover:bg-green-50 shadow-sm"
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <main>
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && videos.length === 0
              ? Array.from({ length: 6 }).map((_, i: number) => <Skeleton key={i} />)
              : videos.map((v: VideoItem) => (
                <VideoCard
                key={v.id}
                video={v}
                onWatch={(id: string) =>
                  window.open(`https://www.youtube.com/watch?v=${id}`, "_blank")
                }
                />
              ))}
          </div>

          {/* Empty state */}
          {!loading && videos.length === 0 && !error && (
            <div className="mt-10 text-center text-gray-600">
              No videos found for <strong>{query}</strong>
            </div>
          )}

          {/* Load more */}
          {nextPageToken && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => fetchVideos(query, nextPageToken)}
                disabled={loading}
                className="px-5 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition"
              >
                {loading ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
