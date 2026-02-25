# Design & UI Specification

Visual language: Swiss International Typographic Style (Josef Müller-Brockmann). Typography is the graphic element. No bitmaps, no gradients, no background colours. The page is white, the ink is near-black. Mermaid diagrams are the only illustrations.

See [`fonts.md`](fonts.md) for font setup instructions.

---

## Layout Principles

- No navigation menu — the header is the site name and a search icon only
- No hero images, no decorative elements, no coloured sections
- Sections are separated by whitespace and 1px horizontal rules — never by background colour fills
- The article title is the primary graphic on every article page
- The grid is the structure — spacing is mathematical, not decorative
- All pages share the same header and footer

---

## Global Header

```
eiler.dk                                                         [🔍]

─────────────────────────────────────────────────────────────────────
```

- `eiler.dk` — Sprat Light, links to `/`
- `[🔍]` — search icon, Hanken 400. On click: a search input slides down below the header rule and focuses. On dismiss (Escape or clicking away): input slides back up and hides.
- 1px bottom rule below header
- The search slide-down is the only interactive Astro island component on the site

**Search expanded state:**

```
eiler.dk                                                         [🔍]

─────────────────────────────────────────────────────────────────────

___________________________________________________________________

```

- Input has 1px bottom border only — no box, no background
- Pagefind results appear below in the same row format as the article listing

---

## Footer

```
─────────────────────────────────────────────────────────────────────

© 2026 Kasper Eiler                          RSS   Sitemap   llm.txt
```

- Hanken 300, small (0.75rem), secondary colour (`#555555`) throughout
- RSS links to `/rss.xml`
- Sitemap links to `/sitemap-index.xml`
- llm.txt links to `/llm.txt`
- No icons, no social links, no decorative elements

---

## Home Page

**Route:** `/`
**File:** `src/pages/index.astro`

```
eiler.dk                                                         [🔍]

─────────────────────────────────────────────────────────────────────

Writing on technology, enterprise AI
and the architecture of what comes next.


─────────────────────────────────────────────────────────────────────
25 Feb 2026                                                    4 min

How Enterprise AI is Reshaping
Platform Architecture

A look at how large organisations are adopting AI at the
infrastructure level, not just the application layer.

ENTERPRISE-AI   PLATFORM   ARCHITECTURE

─────────────────────────────────────────────────────────────────────

18 Feb 2026 · 7 min            │  10 Feb 2026 · 6 min
                               │
Product Development            │  The Platform Paradox
in the Age of AI               │
                               │  Why platform teams build
How AI changes the rhythm      │  for everyone and end up
of building products.          │  serving no one.
                               │
PRODUCT   AI                   │  PLATFORM   ARCHITECTURE
                               │
───────────────────────────────┴────────────────────────────────────

05 Feb 2026 · 5 min            │  01 Feb 2026 · 8 min
                               │
...                            │  ...

```

### Layout rules

- **Tagline** — Sprat Light, Display L (2.5rem). Two lines. Appears once at top, below the header rule.
- **Featured article** — most recent article, full width. Title in Sprat Light Display XL (3.5rem). Description in Hanken 300, body (1rem). Separated from grid by a 1px rule above and below.
- **Article grid** — all remaining articles in a 2-column grid. Each cell: date · reading time (Hanken 300, small, secondary), title (Sprat Light, Display M, 1.75rem), short description (Hanken 300, small), tags. Columns separated by a 1px vertical rule. Rows separated by a 1px horizontal rule.
- **Tags** — Hanken 400, uppercase, tracked (0.05em), small (0.75rem). Red (`#cc0000`) on hover.
- On mobile: grid collapses to single column. Featured article title scales down to Display L.

---

## Article Page

**Route:** `/blog/[slug]`
**File:** `src/pages/blog/[slug].astro`

```
eiler.dk                                                         [🔍]

─────────────────────────────────────────────────────────────────────

← Back

25 Feb 2026 · 4 min read
ENTERPRISE-AI   PLATFORM   ARCHITECTURE

How Enterprise AI is Reshaping
Platform Architecture

─────────────────────────────────────────────────────────────────────

Opening paragraph. Body text in Hanken Grotesk Light, 16px,
line-height 1.6, max-width 680px. Paragraphs breathe.

Second paragraph continues here. Whitespace between paragraphs
is generous — spacing is structural, not decorative.


A Section Heading

Body text continues. Mermaid diagrams sit flush with the column.

┌───────────────────────────────────────────────────────────────┐
│                                                               │
│   [mermaid diagram — inline SVG, 1px border]                 │
│                                                               │
└───────────────────────────────────────────────────────────────┘

Body text continues after diagram.


─────────────────────────────────────────────────────────────────────

Kasper Eiler
Writing about tech, enterprise AI, product development
and platform architecture.                            → About

─────────────────────────────────────────────────────────────────────

← Product Development in the Age of AI    The Platform Paradox →
```

### Layout rules

- **← Back** — Hanken 300, small, red (`#cc0000`). Links to `/`.
- **Meta line** — date · reading time in Hanken 300, small, secondary (`#555555`). Tags on the line below in Hanken 400, uppercase, tracked.
- **Title** — Sprat Light, Display XL (3.5rem). This is the primary graphic of the page. Line-height 1.1.
- **1px rule** between title and body.
- **Article body** — Hanken 300, 1rem, line-height 1.6, max-width 680px. `@tailwindcss/typography` prose styles, overridden to match the design system.
- **In-body headings** — Sprat Light, Display M (1.75rem) for H2, Display S (1.25rem) for H3. No bold.
- **Mermaid diagrams** — inline SVG, 1px border (`#e0e0e0`), full column width, generous vertical margin.
- **Code blocks** — Shiki-highlighted, 1px border, no coloured background beyond Shiki's own theme.
- **Author section** — 1px top rule. Author name in Sprat Light, Display S (1.25rem). Bio in Hanken 300, small. `→ About` link in Hanken 300, small, red.
- **Prev/next** — 1px top rule. Hanken 300, small. Previous article left-aligned, next article right-aligned.

---

## About Page

**Route:** `/about`
**File:** `src/pages/about.astro`

```
eiler.dk                                                         [🔍]

─────────────────────────────────────────────────────────────────────

Kasper Eiler

─────────────────────────────────────────────────────────────────────

Bio text. A few short paragraphs in Hanken Grotesk Light.
No photo. No icons. Just text.

```

### Layout rules

- Name as page title — Sprat Light, Display XL
- Body text — Hanken 300, 1rem, line-height 1.6, max-width 680px
- No photo, no avatar, no social icons — text only, consistent with the no-bitmap rule

---

## Search

**Route:** `/search` (fallback page for direct URL access)
**Primary interaction:** slide-down from header icon (Astro island)

The search input in the header is the primary search entry point. It is an Astro island (`client:load`) wrapping the Pagefind JS API. On icon click the input slides down below the header rule and focuses. Results render below in the same row format as the article listing on the home page. On Escape or click-away the input slides up and hides.

The `/search` page is a fallback for direct URL visits and uses the Pagefind prebuilt UI.

---

## llm.txt

**Route:** `/llm.txt`
**File:** `src/pages/llm.txt.ts`

A statically generated plain text file at build time. Follows the `llm.txt` convention — a machine-readable description of the site for LLMs, analogous to `robots.txt`.

Contents:

```
# eiler.dk

Personal blog by Kasper Eiler. Writing about technology,
enterprise AI, product development and platform architecture.

## Articles

- [title] — [description] — [url] — [date]
- ...

## About

[short bio text]
```

Generated from the content collection at build time. Updated on every deploy.

---

## Routing Summary

| Route | File | Description |
|---|---|---|
| `/` | `pages/index.astro` | Homepage — featured article + article grid |
| `/blog/[slug]` | `pages/blog/[slug].astro` | Article page |
| `/about` | `pages/about.astro` | About page |
| `/search` | `pages/search.astro` | Search fallback page |
| `/rss.xml` | `pages/rss.xml.ts` | RSS feed |
| `/sitemap-index.xml` | Generated by `@astrojs/sitemap` | Sitemap |
| `/llm.txt` | `pages/llm.txt.ts` | LLM-readable site index |

---

## Component Inventory

| Component | File | Notes |
|---|---|---|
| Header | `components/Header.astro` | Site name + search icon. Search island. |
| SearchIsland | `components/SearchIsland.tsx` | Astro island (`client:load`). Pagefind JS API. Slide-down interaction. |
| ArticleFeatured | `components/ArticleFeatured.astro` | Full-width featured article row |
| ArticleCard | `components/ArticleCard.astro` | Grid cell for 2-column grid |
| ArticleAuthor | `components/ArticleAuthor.astro` | Author block at bottom of article page |
| ArticleNav | `components/ArticleNav.astro` | Prev/next navigation |
| Footer | `components/Footer.astro` | Copyright + RSS/Sitemap/llm.txt links |

---

## Tailwind Typography Overrides

The `@tailwindcss/typography` prose styles are overridden in `tailwind.config.mjs` to match the design system:

- Body font: Hanken Grotesk Variable, weight 300
- Heading font: Sprat, weight 300 — never bold
- Link colour: `#cc0000`, no underline by default, underline on hover
- `max-width`: 680px on the prose container
- No coloured backgrounds on blockquotes or code — 1px border only
