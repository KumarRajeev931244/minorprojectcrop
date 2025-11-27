import { NextResponse } from "next/server";

const API_KEY = process.env.YOUTUBE_API_KEY!;
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "agriculture farming";
    const pageToken = searchParams.get("pageToken") || "";

    const url = `${BASE_URL}?part=snippet&type=video&maxResults=12&q=${q}&key=${API_KEY}&pageToken=${pageToken}`;

    const response = await fetch(url);
    const data = await response.json();

    const videos = data.items?.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail:
        item.snippet.thumbnails.high?.url ||
        item.snippet.thumbnails.medium?.url ||
        item.snippet.thumbnails.default?.url,
      channel: item.snippet.channelTitle,
    }));

    return NextResponse.json({
      videos,
      nextPageToken: data.nextPageToken || null,
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { error: "Failed to load videos" },
      { status: 500 }
    );
  }
}
