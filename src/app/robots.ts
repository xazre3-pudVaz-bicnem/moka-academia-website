import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

/**
 * 本番URLが未設定のあいだは、すべてを Disallow にします。
 * Vercel のプレビューURLが検索結果に出てしまう事故を、構造的に防ぐためです。
 */
export default function robots(): MetadataRoute.Robots {
  if (!siteUrl) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: new URL('/sitemap.xml', siteUrl).toString(),
    host: new URL(siteUrl).host,
  };
}
