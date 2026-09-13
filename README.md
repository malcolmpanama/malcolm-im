# malcolm.im

Personal site for Malcolm Daniels. Built with [Astro](https://astro.build), no
runtime framework, no CSS library.

## Running it

```sh
npm install
npm run dev -- --port 4321
```

| Command           | What it does                            |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Dev server with hot reload              |
| `npm run build`   | Static build into `./dist/`             |
| `npm run preview` | Serve the built output locally          |

## How it is put together

```
src/
  styles/global.css      design tokens + every shared style
  layouts/Layout.astro   the one shell: head, SEO, theme, page frame
  components/            Card, Cards, Icon, PickList, BackLink, ThemeToggle
  data/picks.ts          books, games, playlists, films by decade
  data/quotes.ts         quotes for /inspire
  lib/feeds.ts           Substack and YouTube feeds, fetched at build time
  pages/                 thin pages that pull from data/ and components/
```

Two rules keep it tidy:

1. **Pages hold no styling.** Anything visual lives in `global.css` as a token
   or a class. A page only reaches for a `<style>` block when a rule is genuinely
   used once and nowhere else.
2. **Lists are data, not markup.** To add a book, a game, a playlist or a film,
   edit `src/data/picks.ts`. Nothing else needs to change. Adding a whole new
   decade of films also creates its page automatically, because
   `pages/picks/movies/[decade].astro` builds one route per entry.

## Feeds

`/videos` and `/essays` render the latest from YouTube and Substack. Both are
fetched **at build time**, so visitors never wait on a third party and the pages
are plain static HTML. Neither needs an API key: Substack exposes `/feed`, and
YouTube exposes `videos.xml?channel_id=UCSLltHiDVUsVBw6nHvUEzqg`.

A failed fetch logs a warning rather than breaking the build. The practical
consequence is that **new posts and videos appear only when the site rebuilds**,
so set Netlify to rebuild on a schedule if that matters.

### Why /videos has a committed snapshot

YouTube rate-limits its own `feeds.xml` endpoint and starts answering **404** to
repeated automated requests. It did exactly that during development, which left
`/videos` blank on a live deploy. So the feed is no longer the only source:

1. Try the RSS feed. Best case, it works and carries exact publish dates.
2. Otherwise fall back to `src/data/videos.json`, a committed snapshot.

The page is therefore never empty, at worst slightly stale. Refresh the snapshot
with:

```sh
npm run refresh:videos
```

That script tries the feed first and falls back to parsing the channel page,
which uses YouTube's `lockupViewModel` layout. The channel page only gives
relative dates ("2 weeks ago"), localised to wherever the request comes from, so
snapshot entries carry no date and the site omits it for them. If YouTube
changes that layout the script will fail loudly, and the old snapshot keeps
serving until it is fixed.

## Theme

The site follows the operating system's light or dark setting. The toggle in the
top right overrides that and stores the choice in `localStorage`. An inline
script in `Layout.astro` applies the stored value before first paint so there is
no flash of the wrong theme.

## SEO

`astro.config.mjs` sets `site`, which drives canonical URLs, Open Graph and
Twitter card images, and the generated `/sitemap.xml` and `/robots.txt`. When a
page is added, add its path to the `routes` array in `src/pages/sitemap.xml.ts`.
Film decade pages are picked up from the data automatically.

## Copy style

No em dashes anywhere in site copy. Use commas, full stops, or restructure the
sentence. Separators in lists are drawn in CSS, not typed into the data.
