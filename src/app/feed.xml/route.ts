import { getAllPosts } from '@/lib/blog';
import { siteName, siteUrl } from '@/lib/site';
import { defaultDescription } from '@/lib/site';

export const dynamic = 'force-static';

const escape = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/**
 * RSS。
 * 本番URLが未設定のときは、記事のリンクが作れないので空のフィードを返します。
 */
export function GET() {
  const posts = siteUrl ? getAllPosts() : [];
  const home = siteUrl ?? '';

  const items = posts
    .map((p) => {
      const link = new URL(`/blog/${p.slug}`, home).toString();
      return [
        '<item>',
        `<title>${escape(p.title)}</title>`,
        `<link>${escape(link)}</link>`,
        `<guid isPermaLink="true">${escape(link)}</guid>`,
        `<pubDate>${new Date(`${p.publishedAt}T09:00:00+09:00`).toUTCString()}</pubDate>`,
        `<description>${escape(p.description)}</description>`,
        '</item>',
      ].join('');
    })
    .join('');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    `<title>${escape(siteName)}</title>`,
    `<link>${escape(home || 'https://example.com')}</link>`,
    `<description>${escape(defaultDescription)}</description>`,
    '<language>ja</language>',
    home ? `<atom:link href="${escape(new URL('/feed.xml', home).toString())}" rel="self" type="application/rss+xml"/>` : '',
    items,
    '</channel>',
    '</rss>',
  ].join('');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
