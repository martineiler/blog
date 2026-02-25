// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

/** Build a slug → date map by reading frontmatter from markdown files */
function buildArticleDates() {
  /** @type {Record<string, Date>} */
  const dates = {};
  try {
    const dir = './src/content/blog';
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const content = readFileSync(join(dir, file), 'utf-8');
      const match = content.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m);
      if (match) dates[file.replace('.md', '')] = new Date(match[1]);
    }
  } catch {}
  return dates;
}

const articleDates = buildArticleDates();
const buildDate = new Date();
import rehypeMermaid from 'rehype-mermaid';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkUnwrapImages from 'remark-unwrap-images';

export default defineConfig({
  site: 'https://eiler.dk',
  integrations: [
    tailwind(),
    sitemap({
      serialize(item) {
        const match = new URL(item.url).pathname.match(/^\/blog\/(.+?)\/$/);
        if (match) {
          const date = articleDates[match[1]];
          if (date) return { ...item, lastmod: date };
        }
        return { ...item, lastmod: buildDate };
      },
    }),
    react(),
  ],
  vite: {
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js'],
      },
    },
  },
  markdown: {
    remarkPlugins: [remarkGfm, /** @type {any} */ (remarkSmartypants), remarkUnwrapImages],
    rehypePlugins: [
      [rehypeMermaid, {
        mermaidConfig: {
          theme: 'base',
          themeVariables: {
            primaryColor: '#ffffff',
            primaryBorderColor: '#0d0d0d',
            primaryTextColor: '#0d0d0d',
            lineColor: '#0d0d0d',
            secondaryColor: '#f5f5f5',
            tertiaryColor: '#ffffff',
            fontFamily: '"Hanken Grotesk Variable", sans-serif',
            fontSize: '13px',
            edgeLabelBackground: 'transparent',
            clusterBkg: '#f5f5f5',
            clusterBorder: '#0d0d0d',
            noteBkgColor: '#f5f5f5',
            noteTextColor: '#0d0d0d',
            noteBorderColor: '#0d0d0d',
            actorBkg: '#ffffff',
            actorBorder: '#0d0d0d',
            actorTextColor: '#0d0d0d',
            actorLineColor: '#0d0d0d',
            signalColor: '#0d0d0d',
            signalTextColor: '#0d0d0d',
            labelBoxBkgColor: '#f5f5f5',
            labelBoxBorderColor: '#0d0d0d',
            labelTextColor: '#0d0d0d',
            loopTextColor: '#0d0d0d',
            activationBorderColor: '#0d0d0d',
            activationBkgColor: '#f5f5f5',
          },
        },
      }],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
    ],
    shikiConfig: {
      theme: 'github-light',
      transformers: [
        {
          name: 'preserve-mermaid',
          root(hast) {
            if (this.options.lang === 'mermaid') {
              return {
                type: 'element',
                tagName: 'pre',
                properties: {},
                children: [{
                  type: 'element',
                  tagName: 'code',
                  properties: { className: ['language-mermaid'] },
                  children: [{ type: 'text', value: this.source }],
                }],
              };
            }
          },
        },
      ],
    },
  },
});
