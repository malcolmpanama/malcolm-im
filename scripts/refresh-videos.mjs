// Regenerates src/data/videos.json, the fallback used when YouTube's RSS feed
// is unavailable at build time.
//
//   npm run refresh:videos
//
// YouTube rate-limits its own feeds.xml endpoint and starts returning 404 to
// repeated automated requests, which would otherwise leave /videos empty. This
// script tries the feed first and falls back to parsing the channel page.

import { writeFile } from "node:fs/promises";

const CHANNEL_ID = "UCSLltHiDVUsVBw6nHvUEzqg";
const FEED = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CHANNEL_PAGE = `https://www.youtube.com/channel/${CHANNEL_ID}/videos`;
const OUT = new URL("../src/data/videos.json", import.meta.url);
const LIMIT = 12;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

async function get(url) {
  const response = await fetch(url, {
    headers: { "user-agent": UA },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) throw new Error(`${response.status} from ${url}`);
  return response.text();
}

function decode(value) {
  return value
    .replace(/&#(\d+);/g, (_, c) => String.fromCodePoint(Number(c)))
    .replace(/&#x([0-9a-f]+);/gi, (_, c) => String.fromCodePoint(parseInt(c, 16)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

/** Preferred source: the real feed, which carries exact publish dates. */
function fromFeed(xml) {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
    .map(([, entry]) => ({
      videoId: (entry.match(/<yt:videoId>([^<]+)</) ?? [])[1] ?? "",
      title: decode((entry.match(/<title[^>]*>([\s\S]*?)<\/title>/) ?? [])[1] ?? ""),
      published: (entry.match(/<published>([^<]+)</) ?? [])[1] ?? "",
    }))
    .filter((v) => v.videoId && v.title);
}

/**
 * Fallback: the channel page. Its embedded JSON has ids and titles but only
 * relative dates ("2 weeks ago"), so entries carry no `published` field and
 * the site simply omits the date for them.
 */
function fromChannelPage(html) {
  const start = html.indexOf("ytInitialData");
  if (start === -1) throw new Error("ytInitialData not found on channel page");

  const open = html.indexOf("{", start);
  let depth = 0;
  let end = open;
  let inString = false;
  let escaped = false;

  for (let i = open; i < html.length; i += 1) {
    const char = html[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') inString = true;
    else if (char === "{") depth += 1;
    else if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }

  const data = JSON.parse(html.slice(open, end));
  const found = new Map();

  // YouTube's current channel layout wraps each video in a `lockupViewModel`.
  // The id is only present inside the thumbnail URL, and the title sits in a
  // nested `lockupMetadataViewModel`, so each lockup subtree is searched as a
  // unit to keep the pairing correct.
  const lockups = [];
  (function collect(node) {
    if (node === null || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(collect);
    if (node.lockupViewModel) lockups.push(node.lockupViewModel);
    Object.values(node).forEach(collect);
  })(data);

  function findTitle(node) {
    if (node === null || typeof node !== "object") return "";
    if (Array.isArray(node)) {
      for (const item of node) {
        const hit = findTitle(item);
        if (hit) return hit;
      }
      return "";
    }
    if (typeof node.lockupMetadataViewModel?.title?.content === "string") {
      return node.lockupMetadataViewModel.title.content;
    }
    for (const value of Object.values(node)) {
      const hit = findTitle(value);
      if (hit) return hit;
    }
    return "";
  }

  for (const lockup of lockups) {
    const videoId = (JSON.stringify(lockup).match(/i\.ytimg\.com\/vi\/([\w-]{11})\//) ?? [])[1];
    const title = findTitle(lockup);
    if (videoId && title && !found.has(videoId)) {
      found.set(videoId, { videoId, title, published: "" });
    }
  }

  return [...found.values()];
}

let videos = [];
let source = "";

try {
  videos = fromFeed(await get(FEED));
  source = "RSS feed";
} catch (feedError) {
  console.warn(`feed unavailable (${feedError.message}), falling back to channel page`);
  videos = fromChannelPage(await get(CHANNEL_PAGE));
  source = "channel page";
}

if (videos.length === 0) throw new Error("no videos found from either source");

const snapshot = {
  channelId: CHANNEL_ID,
  capturedAt: new Date().toISOString(),
  source,
  videos: videos.slice(0, LIMIT),
};

await writeFile(OUT, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
console.log(`wrote ${snapshot.videos.length} videos from the ${source}`);
for (const video of snapshot.videos) console.log(`  ${video.videoId}  ${video.title}`);
