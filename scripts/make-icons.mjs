/**
 * ファビコン／アプリアイコンを作ります。
 *
 *   node scripts/make-icons.mjs
 *
 * 図案はロゴから。生成りの地に、深緑の丸、朝日、そして白い麻雀牌。
 * 文字は使いません（環境によって日本語フォントが無く、ラスタライズに失敗するため）。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APP = path.join(ROOT, 'src', 'app');
const PUBLIC = path.join(ROOT, 'public');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="sun" cx="50%" cy="42%" r="46%">
      <stop offset="0%" stop-color="#fbe9ae"/>
      <stop offset="60%" stop-color="#f2c23c" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#f2c23c" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="512" height="512" rx="112" fill="#fbf7ec"/>

  <!-- 外周の輪 -->
  <circle cx="256" cy="256" r="212" fill="none" stroke="#8fbf4d" stroke-width="16"/>

  <!-- 朝日 -->
  <circle cx="256" cy="222" r="140" fill="url(#sun)"/>
  <circle cx="256" cy="214" r="66" fill="#f2c23c"/>

  <!-- 山なみ -->
  <path d="M84 300 C 140 240, 200 260, 256 300 C 312 258, 372 240, 428 300 L 428 340 L 84 340 Z" fill="#8fbf4d" opacity="0.55"/>

  <!-- 卓 -->
  <rect x="84" y="332" width="344" height="96" rx="20" fill="#2c6b33"/>

  <!-- 麻雀牌を3枚（絵柄は入れず、白い札としてだけ抽象化） -->
  <g fill="#fffdf6" stroke="#e2d9c2" stroke-width="6">
    <rect x="146" y="334" width="62" height="86" rx="12"/>
    <rect x="225" y="334" width="62" height="86" rx="12"/>
    <rect x="304" y="334" width="62" height="86" rx="12"/>
  </g>
</svg>`;

async function main() {
  const buf = Buffer.from(svg);
  const out = [
    { file: path.join(APP, 'icon.png'), size: 512 },
    { file: path.join(APP, 'apple-icon.png'), size: 180 },
    { file: path.join(PUBLIC, 'icon-512.png'), size: 512 },
    { file: path.join(PUBLIC, 'icon-192.png'), size: 192 },
  ];

  for (const o of out) {
    fs.mkdirSync(path.dirname(o.file), { recursive: true });
    await sharp(buf, { density: 384 }).resize(o.size, o.size).png().toFile(o.file);
    console.log(`✓ ${path.relative(ROOT, o.file)} ${o.size}x${o.size}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
