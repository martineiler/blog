# eiler.dk

Personal blog by Martin Eiler. Writing on technology, enterprise AI, platform architecture, and the organisational dynamics that shape how software gets built at scale.

Live at [eiler.dk](https://www.eiler.dk)

---

## Stack

| Concern | Tool |
|---|---|
| Framework | Astro 5 (static output) |
| Styling | Tailwind CSS v3 + `@tailwindcss/typography` |
| Diagrams | `rehype-mermaid` — build-time SVG rendering |
| Search | Pagefind — fully static, post-build index |
| Hosting | AWS S3 + Cloudflare |
| Deploy | GitHub Actions → S3 sync on push to `main` |

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Local dev server at `localhost:4321` |
| `npm run build` | Production build + Pagefind index |
| `npm run preview` | Preview the `dist/` output locally |
| `npm run check` | TypeScript type-checking |

## Content

Articles are `.md` files in `src/content/blog/`. Frontmatter schema:

```yaml
---
title: "Article Title"
description: "One or two sentence summary."
date: 2026-02-25
tags: ["ai", "platform", "architecture"]
draft: false
---
```

## Deploy

Push to `main` triggers the GitHub Actions deploy workflow: builds the site, syncs to S3, done. Cloudflare handles CDN and HTTPS.

Requires GitHub Secrets: `AWS_ROLE_ARN`, `S3_BUCKET`.
