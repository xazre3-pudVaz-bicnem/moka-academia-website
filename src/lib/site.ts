import { school } from '@/data/school';

/**
 * 本番URL。未設定のときは null を返し、canonical / OG / sitemap を出さず
 * robots.txt を Disallow にします。
 * こうしておくと、Vercel のプレビューURLが検索結果に出てしまう事故を構造的に防げます。
 *
 * 本番へ出すときは、環境変数 NEXT_PUBLIC_SITE_URL に
 * https://example.com のような「オリジンだけ」を設定してください。
 */
export const siteUrl: string | null = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
})();

export const isPublic = siteUrl !== null;

export function absoluteUrl(path = '/'): string | null {
  if (!siteUrl) return null;
  return new URL(path, siteUrl).toString();
}

/** OGなどで使うサイト名 */
export const siteName = `${school.name}｜栃木県真岡市`;

/** トップページのタイトル */
export const homeTitle =
  '真岡の健康麻雀教室ぽかぽかあかでみあ｜初心者から始める健康麻雀・英語多読・哲学';

/** トップページのディスクリプション */
export const defaultDescription =
  '健康麻雀教室ぽかぽかあかでみあは、栃木県真岡市田町で初心者から健康麻雀を学べる教室です（2026年12月オープン）。飲まない・吸わない・賭けない健康麻雀のほか、出張健康麻雀わんすぽ、英語多読塾わんもあ、哲学塾わんくえを運営。小学生からシニアまで、世代をこえて学べる場所です。';
