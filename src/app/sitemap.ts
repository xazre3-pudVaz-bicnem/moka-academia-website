import type { MetadataRoute } from 'next';
import { allNav } from '@/lib/nav';
import { blogCategoryKeys, getAllPosts } from '@/lib/blog';
import { siteUrl } from '@/lib/site';

/**
 * サイトマップ。
 * 本番URLが未設定のあいだは空を返します（プレビューURLを送らないため）。
 */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  const base = siteUrl;
  const url = (path: string) => new URL(path, base).toString();
  const now = new Date();

  const posts = getAllPosts();
  const newestPost = posts[0]?.updatedAt;

  const staticPages: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...allNav.map((n) => ({
      url: url(n.href),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      // 主要導線（ヘッダーに出しているページ）を少しだけ高くする
      priority: n.href === '/mahjong' || n.href === '/beginner' ? 0.9 : 0.7,
    })),
  ];

  const blogPages: MetadataRoute.Sitemap = [
    ...blogCategoryKeys.map((key) => ({
      url: url(`/blog/category/${key}`),
      lastModified: newestPost ? new Date(newestPost) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
    ...posts.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  // /blog は allNav に入っているので重複させない
  return [...staticPages, ...blogPages];
}
