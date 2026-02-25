import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const articles = await getCollection('blog', ({ data }) => !data.draft);
  articles.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'eiler.dk',
    description: 'Writing on technology, enterprise AI and the architecture of what comes next.',
    site: context.site!,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.date,
      link: `/blog/${article.slug}/`,
    })),
    customData: '<language>en</language>',
  });
}
