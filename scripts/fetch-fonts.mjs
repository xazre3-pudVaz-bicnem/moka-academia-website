/**
 * 見出し用の丸ゴシックを自前でホストします（使うのは太字1ウェイトだけ）。
 *
 *   node scripts/fetch-fonts.mjs
 *
 * なぜこれをするか:
 * next/font/google に日本語フォントを渡すと、Googleのunicode-range分割
 * （1ウェイトあたり約120個の@font-face）がページCSSに全部入りになります。
 * フォント本体は必要なチャンクしか落ちませんが、**CSS自体がレンダリングブロック**
 * なので FCP / LCP がはっきり悪化します。
 *
 * ここで woff2 と CSS を public/fonts へ落としておき、layout.tsx から
 * media="print" → onload で media="all" に切り替えて非同期に読み込みます。
 * 本文のゴシックはWebフォントを使わず端末標準（ヒラギノ／游ゴシック等）に任せます。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'public', 'fonts');

/** woff2 を返させるために Chrome の UA を送る */
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const FAMILIES = [
  {
    dir: 'zen-maru-gothic',
    css: 'zen-maru-gothic.css',
    url: 'https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@700&display=swap',
  },
];

async function main() {
  for (const family of FAMILIES) {
    const dir = path.join(OUT_DIR, family.dir);
    fs.mkdirSync(dir, { recursive: true });

    const res = await fetch(family.url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`CSSの取得に失敗しました: ${res.status} ${family.url}`);
    let css = await res.text();

    const urls = [...new Set([...css.matchAll(/url\((https:\/\/[^)]+)\)/g)].map((m) => m[1]))];
    console.log(`${family.dir}: ${urls.length} 個のフォントファイル`);

    let done = 0;
    for (const url of urls) {
      const name = path.basename(new URL(url).pathname);
      const file = path.join(dir, name);
      if (!fs.existsSync(file)) {
        const r = await fetch(url, { headers: { 'User-Agent': UA } });
        if (!r.ok) throw new Error(`フォントの取得に失敗しました: ${r.status} ${url}`);
        fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
      }
      css = css.split(url).join(`/fonts/${family.dir}/${name}`);
      done += 1;
      if (done % 40 === 0) console.log(`  ${done}/${urls.length}`);
    }

    fs.writeFileSync(path.join(OUT_DIR, family.css), css, 'utf8');
    const kb = (fs.statSync(path.join(OUT_DIR, family.css)).size / 1024).toFixed(0);
    const total = fs.readdirSync(dir).reduce((a, f) => a + fs.statSync(path.join(dir, f)).size, 0);
    console.log(
      `✓ public/fonts/${family.css}（${kb}KB） / woff2 ${(total / 1024 / 1024).toFixed(1)}MB`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
