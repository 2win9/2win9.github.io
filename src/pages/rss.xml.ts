import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import settings from '../config/site.json';
import { getPosts, postUrl } from '../lib/blog';
export async function GET(context: APIContext) {
  return rss({
    title: settings.name,
    description: settings.description,
    site: context.site!,
    items: (await getPosts()).map((post) => ({ title: post.data.title, description: post.data.description, pubDate: post.data.pubDate, link: postUrl(post) })),
    customData: '<language>ko-kr</language>',
  });
}
