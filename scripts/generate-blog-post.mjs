#!/usr/bin/env node
/**
 * ぽかぽかあかでみあ｜ブログ記事の自動生成（1日1本）
 *
 * 実行は GitHub Actions からのみ。Vercel のビルド時・リクエスト時には走りません。
 * APIキーは環境変数から読み込みます（ソースには絶対に書かない）。
 *
 *   ANTHROPIC_API_KEY … 必須（GitHub Secrets から渡す）
 *   CLAUDE_MODEL      … 使用モデル。未設定なら claude-haiku-4-5
 *                       （古いモデル名をコードに固定しないため、必ず環境変数で変えられるようにしています）
 *   DRY_RUN=1         … ファイルを書かずに標準出力へ
 *   DRY_RUN_FIXTURE   … JSONファイルを渡すと、APIを呼ばずに検証だけ試せます
 *
 * 生成された記事は content/blog/YYYY-MM-DD-slug.md に保存されます。
 *
 * 教室固有の情報は src/data/verified-facts.json だけを正とします。
 * そこに無いことは書かせません（検証で弾きます）。
 * とくに、健康・医療の効果を断定する書き方はここで機械的に落としています。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

import { topics, categoryLinks, categoryPhotos, photoKeys, validPaths } from './topics.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const FACTS = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src', 'data', 'verified-facts.json'), 'utf8'),
);

/** モデル名はコードに固定せず、環境変数で差し替えられるようにする */
const MODEL =
  process.env.CLAUDE_MODEL?.trim() || process.env.ANTHROPIC_MODEL?.trim() || 'claude-haiku-4-5';
const DRY_RUN = process.env.DRY_RUN === '1';

/** 重複チェックでAIに渡す過去記事の本数 */
const HISTORY_SIZE = 40;

/* ───────────── ユーティリティ ───────────── */

/** 日本時間の今日（Actions は UTC で動くため必ず JST に直す） */
function todayJst() {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function readExistingPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
      const fm = /^---\n([\s\S]*?)\n---/.exec(raw);
      const get = (key) => {
        const m = fm ? new RegExp(`^${key}:\\s*(.*)$`, 'm').exec(fm[1]) : null;
        return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
      };
      return {
        file: f,
        slug: get('slug'),
        title: get('title'),
        intent: get('intent'),
        category: get('category'),
      };
    });
}

/** バイグラムの Dice 係数。既存記事と似すぎたタイトルを弾く。 */
function similarity(a, b) {
  const grams = (s) => {
    const t = String(s).replace(/[\s　「」『』（）()・、。！？!?]/g, '');
    const out = new Set();
    for (let i = 0; i < t.length - 1; i += 1) out.add(t.slice(i, i + 2));
    return out;
  };
  const A = grams(a);
  const B = grams(b);
  if (A.size === 0 || B.size === 0) return 0;
  let hit = 0;
  for (const g of A) if (B.has(g)) hit += 1;
  return (2 * hit) / (A.size + B.size);
}

/**
 * まだ書いていないトピックを選ぶ。
 * 直近の記事とカテゴリが続かないようにローテーションさせる。
 */
function pickTopic(existing) {
  const usedIntents = new Set(existing.map((p) => p.intent).filter(Boolean));
  const unused = topics.filter((t) => !usedIntents.has(t.intent));
  if (unused.length === 0) return null;

  const recentCategories = existing.slice(-3).map((p) => p.category);
  const preferred = unused.filter((t) => !recentCategories.includes(t.category));
  const pool = preferred.length > 0 ? preferred : unused;

  // 日付から決定的に選ぶ（同じ日に二重実行しても同じ記事になる）
  const seed = Number(todayJst().replace(/-/g, ''));
  return pool[seed % pool.length];
}

function slugify(intent, category) {
  let h = 0;
  const src = String(intent);
  for (let i = 0; i < src.length; i += 1) h = (h * 31 + src.charCodeAt(i)) >>> 0;
  return `${category}-${h.toString(36)}`;
}

function escapeYaml(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/* ───────────── プロンプト ───────────── */

function buildSystemPrompt() {
  const s = FACTS.school;
  return `あなたは、栃木県真岡市にある「${s.name}」の公式サイトで読みものを書く書き手です。

## この教室について（ここにあることだけを事実として書いてよい）
${FACTS.facts.map((f) => `- ${f}`).join('\n')}

教室の情報:
- 名称: ${s.fullName}
- 住所: ${s.address}
- 電話: ${s.tel}（${s.telHours}）
- 定休日: ${s.closedDays}
- オープン: ${s.opening}
- 代表・教室長: ${s.teacher}
- Instagram: ${s.instagram}

## まだ確認できていないこと（断定せず、「お問い合わせください」にとどめる）
${FACTS.unknown.map((f) => `- ${f}`).join('\n')}

## 絶対に書いてはいけないこと
${FACTS.forbidden.map((f) => `- ${f}`).join('\n')}

上のどれかに当てはまりそうな内容は、書かずに省いてください。
**「確認できていないことは書かない」が最優先のルールです。**

## いちばん大事なルール1：健康・医療の書き方
麻雀と健康については、**起きることだけ**を書いてください。効果を断定してはいけません。

書いてよい例:
- 「牌を触り、点数を数え、捨て牌を見て考えます」
- 「同じ卓を囲むと、自然と会話が生まれます」
- 「座ったまま、頭と指先を使って過ごせます」
- 「趣味として、人と交流するきっかけになります」

書いてはいけない例:
- 「認知症の予防になります」
- 「脳の機能が改善します」
- 「記憶力が向上します」
- 「健康になれます」「元気になります」（体への効果の断定）

「脳活」「脳トレ」という言葉も、効果を約束しているように読めるので使わないでください。

## いちばん大事なルール2：教室を主語にした文
「ぽかぽかあかでみあでは〜」「教室には〜があります」のように、
**この教室を主語にした記述は、上の「この教室について」に書かれていることだけ**にしてください。
そこに無いことは、想像で補わずに書かないでください。
「当教室」という言い方はサイト全体で使っていないので、使わないでください。

一般論は自由に書いてかまいませんが、**そのときは主語を教室にしないでください。**
「はじめて牌に触るときは、誰でも手が止まります」は一般論なので書けます。
「ぽかぽかあかでみあなら、手が止まっても大丈夫です」は教室の主張になるので、
上のリストに根拠がなければ書けません。

## 文章のトーン
- 明るく、あたたかく、親しみやすい。押しつけがましくない。
- 大げさな広告コピーは使わない。「究極」「絶対」「必ず」のような表現は禁止。
- 一文は短く。60文字を目安に。
- 敬体（です・ます）で統一する。
- 高齢の方も読むので、むずかしい言い回しや横文字を並べない。
- 教室を宣伝するというより、学ぶことそのものについて書いている調子。

## 書き方の決まり
- 見出しは ## と ### のみ（# は使わない）。
- 冒頭に見出しは置かず、150〜250字ほどの導入から始める。
- ## 見出しは4〜5本。それぞれの下に2〜3段落。
- 箇条書きは多くても2か所まで。
- 本文中に、指定された内部リンクを自然な文脈で必ず入れる。記法は [表示テキスト](/パス)。
- 記事末尾に「## 教室情報」のような見出しは作らない（サイト側で自動的に付きます）。
- 全体で1,000〜1,800字程度。文字数を稼ぐための繰り返しはしない。`;
}

function buildUserPrompt(topic, existing, related) {
  const links = categoryLinks[topic.category] ?? ['/mahjong', '/contact'];
  const photos = categoryPhotos[topic.category] ?? photoKeys;
  const history = existing.slice(-HISTORY_SIZE);

  return `次の記事を書いてください。

- テーマ: ${topic.title}
- 想定している検索: 「${topic.intent}」
- 切り口: ${topic.angle}
- 本文に必ず入れるサービスページへの内部リンク（2〜3本）: ${links.join(' , ')}
${
  related.length > 0
    ? `- 本文に必ず入れる過去記事へのリンク（1本）: ${related
        .map((r) => `[${r.title}](/blog/${r.slug})`)
        .join(' または ')}`
    : '- 過去記事へのリンクは、まだ記事が少ないため不要です。'
}
- eyecatch に指定できる写真キー（この中から1つだけ選ぶ）: ${photos.join(', ')}

すでに公開している記事（内容・タイトルが重ならないようにしてください）:
${
  history.length
    ? history.map((p) => `- ${p.title}（狙い: ${p.intent || '不明'}）`).join('\n')
    : '（まだありません）'
}

次の形式のJSONだけを返してください。前後に説明文やコードフェンスを付けないでください。

{
  "title": "32文字以内。検索意図に沿い、具体的であること。教室名を無理に入れない",
  "description": "80〜120文字。この記事を読むと何がわかるかを説明する",
  "keywords": ["3〜5個", "日本語の短い語"],
  "eyecatch": "上の写真キーから1つ",
  "faq": [
    { "q": "この記事の内容に関する質問", "a": "確認できている事実の範囲で答える。60〜140文字" },
    { "q": "もう1つの質問", "a": "同上" }
  ],
  "body": "Markdown本文。## と ### の見出しを使う"
}`;
}

/* ───────────── 生成 ───────────── */

function extractJson(text) {
  const trimmed = text
    .trim()
    .replace(/^```(?:json)?\n?/, '')
    .replace(/\n?```$/, '');
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('JSONが見つかりませんでした');
  return JSON.parse(trimmed.slice(start, end + 1));
}

/** 空白を除いた文字数 */
function countChars(md) {
  return String(md)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#*>\-`]/g, '')
    .replace(/\s/g, '').length;
}

/**
 * 事実に反する書き方を機械的に拾う。
 * 上から順に、いちばん落としたいもの（医療の断定）から並べています。
 */
const BANNED = [
  {
    re: /認知症|物忘れ|ボケ防止|痴呆/,
    msg: '認知症に触れています（医学的な効果は書けません）',
  },
  {
    re: /脳(の)?(活性化|機能|血流)|脳活|脳トレ|記憶力が?(上が|向上|よくな|良くな)|集中力が?(上が|向上)|判断力が?(上が|向上)/,
    msg: '脳や能力への効果を書いています（「頭と指先を使う」までにとどめてください）',
  },
  {
    re: /予防(に|でき|になり)|効果が(あり|期待)|健康に(なれ|なり|良い|よい)|体にいい|若返|寿命|治療|改善(します|され)/,
    msg: '健康・医療の効果を断定しています',
  },
  {
    re: /(?<![0-9,])[0-9０-９][0-9０-９,，]*\s*円/,
    msg: '価格を書いています（金額はページ側で管理しているので本文には書きません）',
  },
  { re: /駐車場|駐輪場|コインパーキング/, msg: '駐車場について書いています（確認できていません）' },
  {
    re: /営業時間は|[0-9０-９]{1,2}\s*時\s*(から|〜|～)\s*[0-9０-９]{1,2}\s*時まで営業/,
    msg: '営業時間を書いています（確認できていません）',
  },
  {
    re: /口コミ|評判|生徒の声|受講者の声|人気(の教室|です|があ)|満足度|実績が|合格実績|生徒数|[0-9０-９]+\s*(名|人)が(通|参加|在籍)/,
    msg: '口コミ・実績を創作しています',
  },
  { re: /究極|絶対|必ず|日本一|随一|最高級|至高|感動の/, msg: '大げさな表現があります' },
  {
    re: /賭け(て|る|られ)|お金を賭ける(のも|こと)は?(楽し|面白)|レート|点ピン/,
    msg: '賭け麻雀を肯定するように読めます',
  },
  { re: /当教室|当校|当塾/, msg: '「当教室」は使いません（「ぽかぽかあかでみあ」と書いてください）' },
  {
    re: /雀荘(は|が)[^。]{0,12}(危険|怖い|汚い|悪い)|他の(教室|雀荘)より/,
    msg: '他店を下げる書き方になっています',
  },
  { re: /徒歩\s*[0-9０-９]+\s*分|真岡駅から\s*[0-9０-９]/, msg: '駅からの距離を書いています（確認できていません）' },
  {
    re: /未就学|幼稚園児|保育園児|[0-9０-９]\s*歳から(参加|通え)/,
    msg: '対象年齢を作っています（小学生以上、という書き方にしてください）',
  },
];

/** 教室を主語にした文で使ってよい語。verified-facts.json の facts に出てくる言葉です */
const ALLOWED_CLAIM_TERMS = [
  // 教室・設備
  '麻雀卓', '全自動', '麻雀スペース', '自習スペース', '自習室', '談話室', '休憩スペース', '16席', '2台',
  'テキスト', '入門テキスト', '牌効率', 'ドリンク', 'お茶', 'お菓子', '冷蔵庫', '水',
  // 約束
  '飲まない', '吸わない', '賭けない', 'アルコール', 'タバコ', 'たばこ', '賭け',
  // 対象
  '小学生', '中学生', '高校生', '大学生', '学生', 'シニア', '社会人', '初心者', '経験者',
  '未就学', '保護者', '送迎', '親子',
  // 料金・制度
  '月謝', '施設利用料', 'コース', '入会金', '年会費', 'フリータイム', 'サブスク', '無料体験',
  '定員', 'まとめ割', '親子割',
  // 事業
  '健康麻雀', '出張', 'わんすぽ', 'わんもあ', 'わんくえ', '英語', '多読', '音読', '哲学', '文学',
  '倫理', '読書会', '単語テスト', '個別読解', '要約', '宿題',
  // 場所・営業
  '真岡', '田町', 'まちなか保健室', '栃木', '水曜', '日曜', '金曜', '定休', 'オープン', '12月',
  '電話', '090-1463-0709', 'Instagram', 'LINE', 'オープンチャット', 'ボランティア',
  // 人
  '寺崎', '寺﨑', '教室長', '講師', '代表',
];

/** 教室を主語にしていて、かつ何かを主張している文か */
const SCHOOL_SUBJECT = /(ぽかぽかあかでみあ|あかでみあ|当教室|この教室|教室では|教室には|わんすぽ|わんもあ|わんくえ)/;
const CLAIM_VERB =
  /(あります|ございます|できます|できる|しています|いたします|いただけます|ご用意|歓迎|対応|向いています|過ごせます|楽しめます|学べます|受け付け)/;

function validate(article, existing, topic, related) {
  const errors = [];

  if (!article.title || typeof article.title !== 'string') errors.push('title がありません');
  if (article.title && article.title.length > 40) errors.push('title が長すぎます（40文字以内）');
  if (!article.description || String(article.description).length < 50)
    errors.push('description が短すぎます（80〜120文字）');
  if (String(article.description ?? '').length > 160)
    errors.push('description が長すぎます（120文字程度に）');
  if (!Array.isArray(article.keywords) || article.keywords.length < 2)
    errors.push('keywords が足りません');
  if (!Array.isArray(article.faq) || article.faq.length < 2) errors.push('faq が2つ未満です');
  else if (article.faq.some((f) => !f || !f.q || !f.a)) errors.push('faq の q または a が空です');

  if (!photoKeys.includes(article.eyecatch))
    errors.push(`eyecatch が写真キーの一覧にありません: ${article.eyecatch}`);

  const body = String(article.body ?? '');
  const length = countChars(body);
  if (length < 900) errors.push(`本文が短すぎます（${length}字。1,000〜1,800字が目安）`);
  if (length > 2200) errors.push(`本文が長すぎます（${length}字。1,000〜1,800字が目安）`);

  if (/^#\s/m.test(body)) errors.push('本文に h1（#）が含まれています');

  const headings = body.match(/^##\s+/gm) ?? [];
  if (headings.length < 3) errors.push('## の見出しが3本未満です');

  // サービスページへの内部リンクが必ず要る
  if (!/\]\(\/(mahjong|beginner|onespot|onemore|onequestion|about|price|access|faq|contact)/.test(body))
    errors.push('サービスページへの内部リンクが本文にありません');

  // 過去記事へのリンク（記事が溜まってきたら必須）
  if (related.length > 0 && !/\]\(\/blog\//.test(body))
    errors.push('過去記事へのリンクが本文にありません');

  // 存在しないパスへリンクしていないか
  const known = new Set([...validPaths, ...existing.map((p) => `/blog/${p.slug}`)]);
  for (const m of body.matchAll(/\]\((\/[^)\s#]*)/g)) {
    if (!known.has(m[1])) {
      errors.push(`存在しないページへのリンクがあります: ${m[1]}`);
      break;
    }
  }

  // タイトルの重複
  for (const p of existing) {
    if (p.title && similarity(article.title, p.title) > 0.6) {
      errors.push(`既存記事「${p.title}」とタイトルが似すぎています`);
      break;
    }
  }

  const haystack = `${article.title}\n${article.description}\n${body}\n${(article.faq ?? [])
    .map((f) => `${f?.q ?? ''}${f?.a ?? ''}`)
    .join('\n')}`;

  for (const b of BANNED) {
    if (b.re.test(haystack)) errors.push(b.msg);
  }

  /*
   * 教室を主語にした文が、確認できている話題の範囲に収まっているか。
   * 「ぽかぽかあかでみあでは静かに過ごせます」のような、根拠のない主張を弾く。
   * 前の文を受けて書く言い方があるので、直前の文まで含めて判定します。
   */
  {
    const sentences = haystack.split(/[。\n]/).map((x) => x.trim());
    for (let i = 0; i < sentences.length; i += 1) {
      const s = sentences[i];
      if (!s || !SCHOOL_SUBJECT.test(s) || !CLAIM_VERB.test(s)) continue;
      const withContext = `${sentences[i - 1] ?? ''}${s}`;
      if (!ALLOWED_CLAIM_TERMS.some((t) => withContext.includes(t))) {
        errors.push(
          `「${s.slice(0, 40)}」— 教室を主語にしていますが、確認できている事実の範囲外です`,
        );
        break;
      }
    }
  }

  // 定休日の取り違え（「日曜も教室が開いている」のような書き方だけを弾く）
  for (const sentence of haystack.split(/[。\n]/)) {
    if (!/(水曜|日曜)/.test(sentence)) continue;
    if (!SCHOOL_SUBJECT.test(sentence)) continue;
    const ok = /定休|休み|お休み|閉ま|出張|うかが|哲学|わんくえ|ボランティア/.test(sentence);
    if (!ok) {
      errors.push(`「${sentence.trim().slice(0, 34)}」— 水曜日・日曜日は教室の定休日です`);
      break;
    }
  }

  return errors;
}

async function generate(client, topic, existing, related, attempt, feedback) {
  const messages = [{ role: 'user', content: buildUserPrompt(topic, existing, related) }];
  if (feedback) {
    messages.push({
      role: 'user',
      content: `前回の記事には次の問題がありました。修正して、同じJSON形式で書き直してください。\n${feedback
        .map((f) => `- ${f}`)
        .join('\n')}`,
    });
  }

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 6000,
    temperature: attempt === 0 ? 0.85 : 0.7,
    system: buildSystemPrompt(),
    messages,
  });

  const text = res.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('');
  return extractJson(text);
}

/* ───────────── main ───────────── */

async function main() {
  const date = todayJst();
  const existing = readExistingPosts();

  if (existing.some((p) => p.file.startsWith(date))) {
    console.log(`${date} の記事はすでにあります。何もしません。`);
    return;
  }

  const topic = pickTopic(existing);
  if (!topic) {
    console.log('すべてのトピックを書き終えています。scripts/topics.mjs に追加してください。');
    return;
  }

  // 同じカテゴリの直近記事を、内部リンク先の候補として渡す
  const related = existing
    .filter((p) => p.category === topic.category && p.slug)
    .slice(-2)
    .concat(existing.filter((p) => p.slug).slice(-1))
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, 2);

  console.log(`テーマ: ${topic.title}（${topic.category} ／ ${topic.intent}）`);
  console.log(`モデル: ${MODEL}`);

  // DRY_RUN_FIXTURE を指定すると、APIを呼ばずに検証だけ試せます
  const fixture = process.env.DRY_RUN_FIXTURE;
  let article = null;

  if (fixture) {
    const candidate = JSON.parse(fs.readFileSync(fixture, 'utf8'));
    const errors = validate(candidate, existing, topic, related);
    console.log(errors.length ? `検証NG: ${errors.join(' / ')}` : '検証OK');
    if (errors.length) process.exit(1);
    article = candidate;
  } else {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY が設定されていません。');
      process.exit(1);
    }
    const client = new Anthropic({ apiKey });

    let feedback = null;
    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        const candidate = await generate(client, topic, existing, related, attempt, feedback);
        const errors = validate(candidate, existing, topic, related);
        if (errors.length === 0) {
          article = candidate;
          break;
        }
        console.warn(`検証に通りませんでした（${attempt + 1}回目）: ${errors.join(' / ')}`);
        feedback = errors;
      } catch (err) {
        console.warn(`生成に失敗しました（${attempt + 1}回目）: ${err.message}`);
        feedback = ['出力がJSONとして読み取れませんでした。JSONだけを返してください。'];
      }
    }
  }

  if (!article) {
    console.error('3回試しましたが、公開できる記事になりませんでした。今日は投稿しません。');
    process.exit(1);
  }

  const slug = slugify(topic.intent, topic.category);
  const filename = `${date}-${slug}.md`;
  const keywords = article.keywords
    .slice(0, 5)
    .map((t) => `"${escapeYaml(t)}"`)
    .join(', ');

  const faqYaml = article.faq
    .slice(0, 3)
    .map((f) => `  - q: "${escapeYaml(f.q)}"\n    a: "${escapeYaml(f.a)}"`)
    .join('\n');

  const frontmatter = [
    '---',
    `title: "${escapeYaml(article.title)}"`,
    `slug: "${slug}"`,
    `description: "${escapeYaml(article.description)}"`,
    `date: "${date}"`,
    `updatedAt: "${date}"`,
    `category: "${topic.category}"`,
    `intent: "${escapeYaml(topic.intent)}"`,
    `author: "${escapeYaml(FACTS.school.name)}"`,
    `eyecatch: "${escapeYaml(article.eyecatch)}"`,
    `keywords: [${keywords}]`,
    'faq:',
    faqYaml,
    '---',
    '',
  ].join('\n');

  const content = `${frontmatter}${String(article.body).trim()}\n`;

  if (DRY_RUN) {
    console.log('--- DRY RUN ---');
    console.log(filename);
    console.log(content);
    return;
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.writeFileSync(path.join(BLOG_DIR, filename), content, 'utf8');
  console.log(`書き出しました: content/blog/${filename}`);
  console.log(`タイトル: ${article.title}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
