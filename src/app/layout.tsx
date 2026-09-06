import type { Metadata, Viewport } from 'next';
import './globals.css';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBar from '@/components/layout/MobileBar';
import JsonLd from '@/components/ui/JsonLd';
import { organizationJsonLd, placeJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { defaultDescription, homeTitle, isPublic, siteName, siteUrl } from '@/lib/site';
import { school } from '@/data/school';

/*
 * フォントの方針
 *
 * 本文のゴシックはWebフォントを使わず、端末標準（ヒラギノ／游ゴシック等）に任せています。
 * 見出しの丸ゴシックだけを自前でホストし、レンダリングをブロックしないように読み込みます。
 *
 * next/font/google に日本語フォントを渡すと、unicode-range で分割された @font-face が
 * 1ファミリ200個以上ページCSSに入り、大きなレンダリングブロックCSSになります
 * （モバイルの FCP / LCP がはっきり悪化します）。
 * そのため public/fonts へ落として（scripts/fetch-fonts.mjs）、
 * 下の inline script から media="print" → onload で media="all" に切り替えています。
 * 実際に配信されるのは、使っている文字を含む woff2 が数チャンクだけです。
 */
const FONT_CSS = '/fonts/zen-maru-gothic.css';

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: homeTitle,
    template: `%s｜${school.name}`,
  },
  description: defaultDescription,
  applicationName: school.name,
  keywords: [
    '真岡 健康麻雀',
    '真岡市 健康麻雀',
    '真岡 麻雀教室',
    '真岡市 麻雀教室',
    '栃木 健康麻雀',
    '健康麻雀 初心者',
    'シニア 健康麻雀',
    '出張健康麻雀',
    '真岡 英語塾',
    '真岡 英語多読',
    '真岡 哲学',
    '真岡 習い事',
  ],
  authors: [{ name: school.fullName }],
  creator: school.fullName,
  publisher: school.fullName,
  formatDetection: { telephone: true, address: false, email: false },
  robots: isPublic
    ? { index: true, follow: true, 'max-image-preview': 'large' }
    : { index: false, follow: false },
  ...(isPublic
    ? {
        openGraph: {
          type: 'website',
          siteName,
          locale: 'ja_JP',
          url: siteUrl!,
          title: homeTitle,
          description: defaultDescription,
          images: [{ url: '/og.jpg', width: 1200, height: 630, alt: school.fullName }],
        },
        twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
        alternates: {
          types: { 'application/rss+xml': `${siteUrl}/feed.xml` },
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: '#fbf7ec',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: 下の script が hydration 前に <html> へ .js を付けるため、
    // className の差分警告だけを抑えている（他の要素には影響しない）
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* JSが無効なときだけ、丸ゴシックのCSSを普通に読む（下の script は動かないため） */}
        <noscript>
          <link rel="stylesheet" href={FONT_CSS} />
        </noscript>
      </head>
      <body className="pb-16 lg:pb-0">
        {/*
          1. JSが動く環境でだけ <html> に .js を付ける。
             スクロールで現れるアニメーション（.reveal）はこのクラスの下でだけ要素を隠すので、
             JSが無効・失敗しても本文が消えることはない。
          2. 丸ゴシックのCSSを media="print" で足し、読み終わってから media="all" にする。
             React では <link media="print" onLoad="..."> と書けない（onLoad が属性として出ない）ので、
             ここは inline script で link 要素を作るのが確実。
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${FONT_CSS}';l.media='print';l.onload=function(){l.media='all'};document.head.appendChild(l)})();`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-midori focus:px-5 focus:py-3 focus:text-kinari"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={placeJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
