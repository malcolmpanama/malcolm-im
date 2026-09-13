// Feeds are fetched once at build time, so visitors never wait on Substack or
// YouTube and the site keeps working if either is down. A failed fetch returns
// an empty list rather than breaking the build; the pages fall back to a plain
// link out when that happens.

import snapshot from "../data/videos.json";

export const SUBSTACK_URL = "https://malcolmdaniels.substack.com/";
export const YOUTUBE_URL = "https://www.youtube.com/@malcolmtalks";

const SUBSTACK_FEED = "https://malcolmdaniels.substack.com/feed";
const YOUTUBE_FEED =
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCSLltHiDVUsVBw6nHvUEzqg";

export interface Essay {
  title: string;
  url: string;
  summary: string;
  date: string;
}

export interface Video {
  title: string;
  url: string;
  videoId: string;
  thumbnail: string;
  date: string;
}

async function fetchFeed(url: string, label: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10_000),
      headers: { "user-agent": "malcolm.im build" },
    });
    if (!response.ok) {
      console.warn(`[feeds] ${label} returned ${response.status}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.warn(`[feeds] ${label} unreachable:`, (error as Error).message);
    return null;
  }
}

/** Pull one tag's text content out of an XML fragment. */
function tag(xml: string, name: string): string {
  const match = xml.match(
    new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"),
  );
  return match ? clean(match[1]) : "";
}

/** Pull one attribute off the first matching tag. */
function attr(xml: string, name: string, attribute: string): string {
  const match = xml.match(
    new RegExp(`<${name}[^>]*\\s${attribute}="([^"]*)"`, "i"),
  );
  return match ? match[1] : "";
}

function clean(value: string): string {
  return decodeEntities(
    value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1"),
  ).trim();
}

function decodeEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(parseInt(code, 16)),
    )
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export async function getEssays(limit = 12): Promise<Essay[]> {
  const xml = await fetchFeed(SUBSTACK_FEED, "Substack");
  if (!xml) return [];

  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]
    .map(([, item]) => ({
      title: tag(item, "title"),
      url: tag(item, "link"),
      summary: tag(item, "description"),
      date: formatDate(tag(item, "pubDate")),
    }))
    .filter((essay) => essay.title && essay.url)
    .slice(0, limit);
}

function toVideo(videoId: string, title: string, published: string): Video {
  return {
    videoId,
    title,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    // hqdefault is 4:3 with letterboxing, which the 16/9 crop in CSS
    // removes. It is higher resolution than the true-16:9 mqdefault.
    thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    date: published ? formatDate(published) : "",
  };
}

/**
 * YouTube rate-limits its own feeds.xml endpoint and starts answering 404 to
 * repeated automated requests, which would leave this page empty on a build
 * that happens to get blocked. The committed snapshot in data/videos.json is
 * the floor: worst case the list is slightly stale, never blank.
 * Refresh it with `npm run refresh:videos`.
 */
export async function getVideos(limit = 12): Promise<Video[]> {
  const xml = await fetchFeed(YOUTUBE_FEED, "YouTube");

  if (xml) {
    const live = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, entry]) =>
        toVideo(tag(entry, "yt:videoId"), tag(entry, "title"), tag(entry, "published")),
      )
      .filter((video) => video.videoId && video.title);

    if (live.length > 0) return live.slice(0, limit);
  }

  console.warn(
    `[feeds] using the committed snapshot from ${snapshot.capturedAt} (${snapshot.videos.length} videos)`,
  );
  return snapshot.videos
    .map((video) => toVideo(video.videoId, video.title, video.published))
    .filter((video) => video.videoId && video.title)
    .slice(0, limit);
}
