import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('blog', ({ data }) => !data.draft);
  articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const articleLines = articles
    .map((article) => {
      const url = new URL(`/blog/${article.slug}/`, context.site).href;
      const date = article.data.date.toISOString().split('T')[0];
      return `- ${article.data.title} — ${article.data.description} — ${url} — ${date}`;
    })
    .join('\n');

  const text = `# eiler.dk

Personal blog by Kasper Eiler. Writing about technology,
enterprise AI, product development and platform architecture.

## Articles

${articleLines}

## About

Kasper Eiler works at the intersection of technology strategy, platform architecture,
and enterprise AI. Based in Copenhagen. This blog covers enterprise AI adoption,
platform and infrastructure design, and the organisational dynamics that shape how
technology gets built and used at scale.
`;

  return new Response(text, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
