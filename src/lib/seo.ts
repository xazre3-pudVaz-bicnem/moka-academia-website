import type { Metadata } from 'next';
import { absoluteUrl, defaultDescription, isPublic, siteName } from '@/lib/site';
import { school } from '@/data/school';

type BuildMetaArgs = {
  /** ページ固有のタイトル（サイト名はテンプレートで自動的に付きます） */
  title: string;
  description: string;
  /** '/mahjong' のようなパス */
  path: string;
  /** OG画像に使う絶対パス。省略時はサイト共通の /og.jpg */
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
  keywords?: string[];
};

/**
 * ページごとの metadata を組み立てます。
 * canonical / OG / Twitter は本番URLが設定されているときだけ出力します。
 */
export function buildMetadata({
  title,
  description,
  path,
  ogImage = '/og.jpg',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
  keywords,
}: BuildMetaArgs): Metadata {
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(ogImage);

  const meta: Metadata = {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    robots:
      noindex || !isPublic
        ? { index: false, follow: false }
        : { index: true, follow: true, 'max-image-preview': 'large' },
  };

  if (canonical) {
    meta.alternates = { canonical };
    meta.openGraph = {
      type: ogType,
      title: `${title}｜${school.name}`,
      description,
      url: canonical,
      siteName,
      locale: 'ja_JP',
      images: image ? [{ url: image, width: 1200, height: 630, alt: school.name }] : undefined,
      ...(ogType === 'article' ? { publishedTime, modifiedTime } : {}),
    };
    meta.twitter = {
      card: 'summary_large_image',
      title: `${title}｜${school.name}`,
      description,
      images: image ? [image] : undefined,
    };
  }

  return meta;
}

export { defaultDescription };
