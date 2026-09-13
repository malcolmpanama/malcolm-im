import type { APIRoute } from "astro";
import { decades } from "../data/picks.ts";

const routes = [
  "/",
  "/about",
  "/contact",
  "/videos",
  "/essays",
  "/inspire",
  "/picks",
  "/picks/books",
  "/picks/games",
  "/picks/music",
  "/picks/movies",
  ...decades.map((decade) => `/picks/movies/${decade.slug}`),
];

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL("https://malcolm.im");

  const urls = routes
    .map((route) => `  <url><loc>${new URL(route, origin).href}</loc></url>`)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
