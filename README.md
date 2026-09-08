# 真岡の健康麻雀教室 ぽかぽかあかでみあ 公式サイト

栃木県真岡市田町「まちなか保健室 田町館」の健康麻雀教室と、そこから生まれた3つの学びの公式サイトです。

- 健康麻雀教室 ぽかぽかあかでみあ（ACADEMIA）
- 出張健康麻雀教室 わんすぽ（One Spot）
- 英語多読塾 わんもあ（One More）
- 哲学塾 わんくえ（One Question／寺﨑哲学塾）

Next.js 16（App Router）／TypeScript／Tailwind CSS v4。デプロイ先は Vercel を想定しています。

---

## いちばん大事な約束ごと

このサイトは、いただいたチラシ・ポスター・ロゴから読み取れた**一次情報だけ**で作っています。

- 確認できていないことは書きません。「確認中です。お問い合わせください」と正直に書きます。
- 健康・医療の効果（認知症の予防、脳機能の改善など）は**断定しません**。
  書けるのは「頭と指先を使う」「会話が生まれる」といった、実際に起きることだけです。
- 口コミ・評価・実績は、実在するものがないので構造化データにも本文にも入れません。

事実の置き場所は2つだけです。新しいことが確認できたら、まずここを直してください。

| ファイル | 役割 |
| --- | --- |
| `src/data/school.ts` | 名前・住所・電話・定休日など（NAP）。画面表示と構造化データの唯一の出どころ |
| `src/data/verified-facts.json` | ブログ自動生成が事実として扱ってよいことの一覧 |

料金は `src/data/pricing.ts`、FAQは `src/data/faq.ts`、写真は `src/data/photos.ts` にまとまっています。

### いま「確認中」にしていること

- **店舗の場所・住所**（まだ決まっていません。オープンの際にお知らせします）
- 営業時間・定休日（オープンにあわせて決まります。フリータイムが 9:00〜17:00 であることだけ判明）
- 駐車場の有無
- 哲学塾わんくえの受講料と対象年齢
- 出張健康麻雀の市外の対応地域
- LINEオープンチャットの招待URL（`src/data/school.ts` の `lineOpenChat.url`）

### 物件が決まったら

`src/data/school.ts` の `address` に `postalCode` / `street` / `building` を足して
`settled: true` にしてください。これだけで次がまとめて切り替わります。

- 教室情報テーブル・フッター・トップの「準備中」表示 → 住所表示
- 構造化データの `PostalAddress`（いまは都道府県と市まで）と `Place`（いまは出していません）
- `llms.txt` の所在地

地図（Google Maps の iframe）は住所が決まるまで外してあります。戻すときは
`/access` と `components/sections/home/AccessBrief.tsx` に埋め込みを足してください。

---

## 開発

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # 本番ビルド
npm run typecheck    # 型チェック
npm run lint         # ESLint
```

### 環境変数

`.env.example` をコピーして `.env.local` を作ってください。

| 変数 | 説明 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 本番URL（オリジンのみ）。**未設定のあいだは canonical / OG / sitemap を出さず、robots.txt を Disallow にします**。Vercel のプレビューURLが検索結果に出る事故を構造的に防ぐためです |
| `CONTACT_WEBHOOK_URL` | お問い合わせフォームの送信先。JSONをPOSTします（Formspree / Google Apps Script / Slack の Incoming Webhook など）。未設定のときは「お電話ください」の案内が出ます |
| `ANTHROPIC_API_KEY` | ブログ自動生成用。GitHub Secrets に登録します |

**公開前に `NEXT_PUBLIC_SITE_URL` を必ず設定してください。** 設定するまで検索エンジンには載りません。

---

## 素材の作り直し

いただいた元画像は `assets/originals/`（gitignore済み）へ退避しています。

```bash
node scripts/prepare-images.mjs   # チラシの最適化と、中の写真の切り出し
node scripts/make-icons.mjs       # ファビコン／アプリアイコン
node scripts/fetch-fonts.mjs      # 見出しの丸ゴシックを public/fonts へ
```

### 写真について

いただいたのはチラシ・ポスター・ロゴです。実際の活動写真ではありません。
`scripts/prepare-images.mjs` でチラシの中の写真を切り出して使っていますが、
`alt` には「写っているもの」だけを書き、教室の実写と確認できないものには「イメージ」と明記しています。

**実際の教室写真・活動写真が撮れたら、差し替えてください。**
`public/photos/` に同じファイル名で置き、`src/data/photos.ts` の実寸と `alt` を直せば全ページに反映されます。

### フォント

見出しだけ Zen Maru Gothic（太字1ウェイト）を自前ホストしています。

`next/font/google` に日本語フォントを渡すと、unicode-range で分割された `@font-face` が
100個以上ページCSSに入り、大きなレンダリングブロックCSSになります。
そのため `public/fonts/` へ落として、`layout.tsx` から `media="print"` → `onload` で
`media="all"` に切り替えて非同期に読み込んでいます。本文は端末標準のゴシックです。

`public/fonts/` はリポジトリにコミットしています（Vercel で配信するため）。

---

## ページ構成

| URL | 内容 |
| --- | --- |
| `/` | トップ |
| `/mahjong` | 健康麻雀教室 ぽかぽかあかでみあ |
| `/beginner` | はじめて健康麻雀を始める方へ |
| `/onespot` | 出張健康麻雀 わんすぽ |
| `/onemore` | 英語多読塾 わんもあ |
| `/onequestion` | 哲学塾 わんくえ |
| `/about` | あかでみあについて（理念・代表・4つの学び） |
| `/price` | 料金一覧 |
| `/access` | 教室のご案内・開校のお知らせ |
| `/faq` | よくある質問 |
| `/contact` | お問い合わせ |
| `/blog` `/blog/[slug]` `/blog/category/[category]` | ブログ |

このほかに `sitemap.xml` `robots.txt` `feed.xml` `llms.txt` `manifest.webmanifest` を出しています。

`llms.txt` は、ChatGPT / Gemini / Perplexity などに読ませるための平文のまとめです。
料金・場所・FAQ・「確認中のこと」まで載せているので、
**新しい事実が確定したら `src/data/` を直せば `llms.txt` にも自動で反映されます。**

導線は `src/lib/nav.ts` の1か所で管理しています。ページを足すときはここにも追加してください
（ヘッダー・フッター・サイトマップ・404ページが同時に更新されます）。

---

## ブログの自動投稿

Claude（Haiku）と GitHub Actions で、毎日1本ずつ記事を生成します。
日本時間の毎朝 10:05 に走り、`content/blog/` へ追加してそのまま push します。

```bash
# 手元で試す（APIを呼びます）
ANTHROPIC_API_KEY=xxx DRY_RUN=1 node scripts/generate-blog-post.mjs

# APIを呼ばずに、検証ルールだけ試す
DRY_RUN_FIXTURE=path/to/article.json node scripts/generate-blog-post.mjs
```

### 準備

リポジトリの Settings → Secrets and variables → Actions で登録します。

- Secret `ANTHROPIC_API_KEY`（必須）
- Variable `CLAUDE_MODEL`（任意。未設定なら `claude-haiku-4-5`）
- Variable `NEXT_PUBLIC_SITE_URL`（ビルド確認に使います）

### 仕組み

- テーマは `scripts/topics.mjs` の一覧から、`intent`（狙う検索）が未使用のものを日付で決定的に選びます。
  直近3本とカテゴリが続かないようにローテーションします。
- 生成後、`scripts/generate-blog-post.mjs` の `validate()` が機械的に検査します。
  通らなければ指摘を返して最大3回まで書き直させ、それでもだめなら**その日は投稿しません**。
- 検査しているのは主に次の3つです。
  1. **医療・健康の断定**（認知症・脳の活性化・予防・効果 など）が入っていないか
  2. **教室を主語にした文**が、`verified-facts.json` の範囲に収まっているか
  3. 内部リンクが本文にあるか／リンク先が実在するか／タイトルが既存記事と似すぎていないか
- カテゴリごとに「必ず張るサービスページ」を決めてあるので（`src/lib/blog.ts` の `primary`）、
  記事が孤立しません。記事末尾にもそのページへの導線が自動で入ります。

トピックを書き終えたら `scripts/topics.mjs` に足してください。
自動生成に頼りきらず、実際の活動を書いた記事を手で足せるよう、
`content/blog/*.md` は普通のMarkdownにしています（現在6本は手書きです）。

---

## デザインの決めごと

- 背景は白ではなく**生成り**（`--color-kinari` #fbf7ec）。紙の色に寄せています。
- ブランドカラーはロゴから。深緑・若草・山吹、アクセントに橙。
  橙はチラシの色そのままだとコントラストが 2.6:1 しかないため、
  文字と塗りに使う色は暗いほうへ寄せています（`--color-daidai` #a54c05）。
- 哲学塾わんくえのページとトップの該当セクションだけ、チラシに合わせて夜と金に切り替えます。
- 本文は 17px から。行間 1.95。高齢の方も読むため、小さくしません。
- ボタンとタップ領域は 44px 以上。
- スクロールで現れるアニメーションは `html.js` が付いているときだけ要素を隠すので、
  **JSが無効・失敗しても本文は最初から見えています**。`prefers-reduced-motion` にも対応しています。

`src/app/globals.css` の `@layer components` に、手書き風の下線（`.handline`）、
吹き出し（`.speech`）、麻雀牌のモチーフ（`.tile`）などをまとめています。

> Tailwind v4 では、`globals.css` に素で書いたクラスがユーティリティを打ち消します。
> カスタムクラスは必ず `@layer components` の中に書いてください。

---

## 検証済みのこと

- `npm run build` / `npm run typecheck` / `npm run lint` すべて通過
- 全34ルートを 390 / 768 / 1440px で確認。横スクロールなし、CLS 0
- 内部リンクの死活、h1の重複、見出しレベルの飛び、alt欠落：いずれもなし
- 文字色のコントラスト：全ページ WCAG AA を満たしています
- `prefers-reduced-motion` / JS無効でも本文が隠れないこと

## 公開までに残っていること

1. `NEXT_PUBLIC_SITE_URL` に本番ドメインを設定（これをしないと検索に載りません）
2. `CONTACT_WEBHOOK_URL` を設定（フォームの送信先）
3. GitHub Secrets に `ANTHROPIC_API_KEY` を登録
4. 実際の教室写真・活動写真への差し替え
5. 物件が決まったら `school.address` を更新して `settled: true` に（上の手順）
6. 「確認中」にしている項目（営業時間・定休日・駐車場・哲学塾の受講料と対象年齢）の記入
7. Googleビジネスプロフィールとの NAP 表記の突き合わせ

### 表現についてのご確認をひとつ

ポスター画像（`poster-academia.jpg`）の中に「脳の活性化 記憶力・集中力・判断力をアップ！」という
文言が入っています。サイトの本文ではこうした断定を避けていますが、画像の中はそのままです。
気になる場合は、この画像を使っている `/access` と `/about` で別の写真に差し替えてください。
