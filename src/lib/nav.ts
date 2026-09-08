/**
 * サイト全体の導線。
 *
 * ここを1か所にしておくことで、ヘッダー・フッター・サイトマップ・パンくずの
 * 表記とURLがずれないようにしています。
 * （fs を使う処理はここに置かないこと。クライアント側からも読むファイルです）
 */

export type NavItem = {
  href: string;
  label: string;
  /** 英語だけで意味が分からなくならないよう、補足を必ず持たせる */
  sub?: string;
};

/** ヘッダーに出す主要導線 */
export const mainNav: NavItem[] = [
  { href: '/mahjong', label: '健康麻雀教室', sub: 'あかでみあ' },
  { href: '/beginner', label: 'はじめての方へ', sub: '牌を触ったことがなくても' },
  { href: '/onespot', label: '出張健康麻雀', sub: 'わんすぽ' },
  { href: '/onemore', label: '英語多読塾', sub: 'わんもあ' },
  { href: '/onequestion', label: '哲学塾', sub: 'わんくえ' },
  { href: '/about', label: 'あかでみあについて', sub: '4つの学び' },
  { href: '/blog', label: 'ブログ', sub: '読みもの' },
];

/** フッターに出す、上記に入りきらないページ */
export const subNav: NavItem[] = [
  { href: '/price', label: '料金一覧' },
  { href: '/access', label: '教室のご案内' },
  { href: '/faq', label: 'よくある質問' },
  { href: '/contact', label: 'お問い合わせ' },
];

export const allNav: NavItem[] = [...mainNav, ...subNav];

/** パンくずの共通部分 */
export const HOME_CRUMB = { name: 'ホーム', href: '/' };
