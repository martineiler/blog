# Font Setup

The blog uses two typefaces:

| Role | Font | Source | License |
|---|---|---|---|
| Display / Headings | Sprat Condensed | Collletttivo / GitHub | OFL 1.1 |
| Body / UI | Hanken Grotesk | Fontsource / npm | OFL 1.1 |

---

## Sprat Condensed (Display / Headings)

Sprat is a high-contrast condensed serif by Ethan Nakache, distributed by Collletttivo. It is not available via npm or @fontsource — it must be self-hosted.

### Download

1. Go to https://www.collletttivo.it/typefaces/sprat
2. Click **Download** to get the zip archive
3. Alternatively, download directly from GitHub: https://github.com/EthanNakache/Sprat-type

The release contains:
- `/static/` — 18 static font files (3 widths × 6 weights, roman only)
- `/variable/` — variable font files with `wdth` and `wght` axes

### Which files to use

Use the **variable font** for web:

```
Sprat[wdth,wght].woff2      ← primary variable file
SpratItalic[wdth,wght].woff2 ← italic variable file (if included in release)
```

If the italic variable file is not present in the current release, use the static Condensed Light file:

```
Sprat-CondensedLight.woff2
```

### Where to place the files

Copy the `.woff2` files into the project:

```
public/
  fonts/
    Sprat[wdth,wght].woff2
    SpratItalic[wdth,wght].woff2   ← if available
```

Astro serves everything in `public/` as static assets, so fonts at `public/fonts/` are accessible at `/fonts/` on the site.

### CSS `@font-face` declaration

Add to `src/styles/global.css`:

```css
@font-face {
  font-family: 'Sprat';
  src: url('/fonts/Sprat[wdth,wght].woff2') format('woff2 supports variations'),
       url('/fonts/Sprat[wdth,wght].woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Sprat';
  src: url('/fonts/SpratItalic[wdth,wght].woff2') format('woff2 supports variations'),
       url('/fonts/SpratItalic[wdth,wght].woff2') format('woff2');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
```

### Usage in Tailwind / CSS

```css
/* Heading usage — Condensed Light (wdth: 75, wght: 300) */
font-family: 'Sprat', serif;
font-weight: 300;
font-variation-settings: 'wdth' 75;
```

In `tailwind.config.mjs`:

```js
theme: {
  extend: {
    fontFamily: {
      display: ['Sprat', 'serif'],
    },
  },
}
```

### Variable font axes

| Axis | Tag | Min | Max | Recommended for headings |
|---|---|---|---|---|
| Width | `wdth` | 50 (Condensed) | 150 (Extended) | 75 (Condensed) |
| Weight | `wght` | 100 (Thin) | 900 (Black) | 300 (Light) |

---

## Hanken Grotesk (Body / UI)

Hanken Grotesk is a neutral grotesque sans-serif by Alfredo Marco Pradil. It is available via npm through @fontsource.

### Install

```bash
npm install @fontsource-variable/hanken-grotesk
```

This installs the variable font (weight axis 100–900, with italic).

### Import in Astro

Import once in the base layout (`src/layouts/Base.astro`) or in `src/styles/global.css`:

```js
// In Base.astro frontmatter or a global CSS import
import '@fontsource-variable/hanken-grotesk';
import '@fontsource-variable/hanken-grotesk/wght-italic.css'; // italic axis
```

Or in `global.css`:

```css
@import '@fontsource-variable/hanken-grotesk';
@import '@fontsource-variable/hanken-grotesk/wght-italic.css';
```

### Usage in Tailwind / CSS

```css
/* Body text — Light (300) */
font-family: 'Hanken Grotesk Variable', sans-serif;
font-weight: 300;

/* UI labels / nav — Roman (400) */
font-family: 'Hanken Grotesk Variable', sans-serif;
font-weight: 400;
```

In `tailwind.config.mjs`:

```js
theme: {
  extend: {
    fontFamily: {
      sans: ['Hanken Grotesk Variable', 'sans-serif'],
    },
  },
}
```

### Available weights

100 (Thin) · 200 (ExtraLight) · 300 (Light) · 400 (Regular) · 500 (Medium) · 600 (SemiBold) · 700 (Bold) · 800 (ExtraBold) · 900 (Black)

---

## Font stack summary

```css
:root {
  --font-display: 'Sprat', serif;
  --font-body:    'Hanken Grotesk Variable', sans-serif;
}
```

---

## Checklist

- [ ] Download Sprat from https://www.collletttivo.it/typefaces/sprat
- [ ] Copy `.woff2` files to `public/fonts/`
- [ ] Add `@font-face` declarations to `src/styles/global.css`
- [ ] Run `npm install @fontsource-variable/hanken-grotesk`
- [ ] Import Hanken Grotesk in `Base.astro` or `global.css`
- [ ] Configure both families in `tailwind.config.mjs`
