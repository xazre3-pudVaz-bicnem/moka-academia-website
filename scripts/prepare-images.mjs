/**
 * public 直下に置かれた元画像（LINEアルバムのファイル名のまま）を、
 * 内容がわかるファイル名に変えつつ最適化して public/photos へ書き出します。
 * 元画像は assets/originals へ退避します（.gitignore 済み）。
 *
 *   node scripts/prepare-images.mjs
 *
 * 頂いた素材はチラシとロゴです。
 * チラシは1枚ずつ目で確認し、そのまま使うもの（FULL）と、
 * 中に入っている写真だけを切り出して使うもの（CROPS）に分けています。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const PHOTOS = path.join(PUBLIC, 'photos');
const ORIGINALS = path.join(ROOT, 'assets', 'originals');

const P = 'LINE_ALBUM_20260906_260906_';
const SRC = {
  onemore: `${P}1.jpg`, // 英語多読塾わんもあ チラシ
  volunteer: `${P}2.jpg`, // 健康麻雀ボランティア チラシ
  onemoreFlow: `${P}3.jpg`, // わんもあ 90分授業フロー
  academia: `${P}4.jpg`, // ぽかぽかあかでみあ 12月OPEN チラシ
  onespot: `${P}5.jpg`, // 出張健康麻雀教室 チラシ
  poster: `${P}6.jpg`, // ぽかぽかあかでみあ ポスター
  onequestion: `${P}7.jpg`, // 寺﨑哲学塾 チラシ
  logo: `${P}8.jpg`, // ロゴ
};

/** チラシをそのまま出すもの */
const FULL = {
  [SRC.onemore]: 'flyer-onemore.jpg',
  [SRC.volunteer]: 'flyer-volunteer.jpg',
  [SRC.onemoreFlow]: 'flyer-onemore-flow.jpg',
  [SRC.academia]: 'flyer-academia.jpg',
  [SRC.onespot]: 'flyer-onespot.jpg',
  [SRC.poster]: 'poster-academia.jpg',
  [SRC.onequestion]: 'flyer-onequestion.jpg',
  [SRC.logo]: 'logo-academia.jpg',
};

/** チラシの中の写真を切り出すもの（left/top/width/height は元画像のピクセル） */
const CROPS = [
  // ── ぽかぽかあかでみあ チラシ（1054x1492）
  { from: SRC.academia, out: 'room-mahjong-wide.jpg', box: { left: 700, top: 258, width: 354, height: 150 } },
  { from: SRC.academia, out: 'space-mahjong.jpg', box: { left: 24, top: 628, width: 234, height: 172 } },
  { from: SRC.academia, out: 'space-study.jpg', box: { left: 283, top: 628, width: 234, height: 172 } },
  { from: SRC.academia, out: 'space-lounge.jpg', box: { left: 501, top: 628, width: 234, height: 172 } },
  { from: SRC.academia, out: 'teacher-trophy.jpg', box: { left: 508, top: 248, width: 168, height: 238 } },
  { from: SRC.academia, out: 'original-texts.jpg', box: { left: 555, top: 1188, width: 195, height: 78 } },
  // ── 出張健康麻雀教室 チラシ（1254x1254）
  { from: SRC.onespot, out: 'onespot-scene.jpg', box: { left: 760, top: 145, width: 494, height: 272 } },
  { from: SRC.onespot, out: 'onespot-tools.jpg', box: { left: 24, top: 800, width: 104, height: 104 } },
  { from: SRC.onespot, out: 'onespot-support.jpg', box: { left: 174, top: 800, width: 104, height: 104 } },
  { from: SRC.onespot, out: 'onespot-group.jpg', box: { left: 324, top: 800, width: 104, height: 104 } },
  { from: SRC.onespot, out: 'teacher-portrait.jpg', box: { left: 405, top: 1022, width: 130, height: 165 } },
  // ── 英語多読塾わんもあ チラシ（1254x1254）
  { from: SRC.onemore, out: 'onemore-reading.jpg', box: { left: 20, top: 25, width: 240, height: 235 } },
  { from: SRC.onemore, out: 'onemore-student.jpg', box: { left: 980, top: 20, width: 274, height: 285 } },
  { from: SRC.onemore, out: 'onemore-class-jhs.jpg', box: { left: 60, top: 718, width: 218, height: 100 } },
  { from: SRC.onemore, out: 'onemore-class-hs.jpg', box: { left: 340, top: 718, width: 218, height: 100 } },
  { from: SRC.onemore, out: 'onemore-class-exam.jpg', box: { left: 620, top: 718, width: 218, height: 100 } },
  // ── 寺﨑哲学塾 チラシ（1254x1254）
  { from: SRC.onequestion, out: 'onequestion-scene.jpg', box: { left: 140, top: 258, width: 980, height: 560 } },
];

/** OG画像に使う（ポスターを1200x630に） */
const OG_SOURCE = 'poster-academia.jpg';

function resolveSource(name) {
  const inPublic = path.join(PUBLIC, name);
  const kept = path.join(ORIGINALS, name);
  if (fs.existsSync(inPublic)) return { from: inPublic, shouldMove: true };
  if (fs.existsSync(kept)) return { from: kept, shouldMove: false };
  return null;
}

async function main() {
  fs.mkdirSync(PHOTOS, { recursive: true });
  fs.mkdirSync(ORIGINALS, { recursive: true });

  const sizes = [];

  // 1. 切り出しは元ファイルを動かす前に済ませる
  for (const crop of CROPS) {
    const src = resolveSource(crop.from);
    if (!src) {
      console.warn(`! 元ファイルが見つかりません: ${crop.from}`);
      continue;
    }
    const out = path.join(PHOTOS, crop.out);
    await sharp(src.from)
      .extract(crop.box)
      .jpeg({ quality: 86, mozjpeg: true, progressive: true })
      .toFile(out);
    const meta = await sharp(out).metadata();
    sizes.push({ name: crop.out, width: meta.width, height: meta.height, kb: (fs.statSync(out).size / 1024).toFixed(0) });
    console.log(`✓ photos/${crop.out}  ${meta.width}x${meta.height}`);
  }

  // 2. チラシ全体
  for (const [srcName, outName] of Object.entries(FULL)) {
    const src = resolveSource(srcName);
    if (!src) {
      console.warn(`! 元ファイルが見つかりません: ${srcName}`);
      continue;
    }
    const out = path.join(PHOTOS, outName);
    await sharp(src.from)
      .rotate()
      .resize({ width: 1400, withoutEnlargement: true })
      // チラシは文字が入るので、写真より少し高めの品質で書き出す
      .jpeg({ quality: 84, mozjpeg: true, progressive: true })
      .toFile(out);
    const meta = await sharp(out).metadata();
    sizes.push({ name: outName, width: meta.width, height: meta.height, kb: (fs.statSync(out).size / 1024).toFixed(0) });
    console.log(`✓ photos/${outName}  ${meta.width}x${meta.height}`);
  }

  // 3. 元ファイルを退避
  for (const name of Object.keys(FULL)) {
    const inPublic = path.join(PUBLIC, name);
    if (fs.existsSync(inPublic)) fs.renameSync(inPublic, path.join(ORIGINALS, name));
  }

  // 4. OG画像
  const ogSrc = path.join(PHOTOS, OG_SOURCE);
  if (fs.existsSync(ogSrc)) {
    await sharp(ogSrc)
      .resize(1200, 630, { fit: 'cover', position: 'top' })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(path.join(PUBLIC, 'og.jpg'));
    console.log('✓ og.jpg 1200x630');
  }

  console.log('\n--- data/photos.ts に貼る実寸 ---');
  for (const s of sizes) console.log(`${s.name}: ${s.width}x${s.height} (${s.kb}KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
