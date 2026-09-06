import { school } from '@/data/school';
import { services } from '@/data/services';
import {
  facilityFees,
  monthlyFees,
  onemoreCourses,
  onespotFee,
  yen,
} from '@/data/pricing';
import { faqGroups } from '@/data/faq';
import { allNav } from '@/lib/nav';
import { siteUrl } from '@/lib/site';

export const dynamic = 'force-static';

/**
 * llms.txt
 *
 * ChatGPT / Gemini / Perplexity などが読む前提で、
 * 「誰向けの何なのか」「どこにあるのか」「いくらか」を平文でまとめています。
 * 画像の中だけにある情報を残さないための場所でもあります。
 */
export function GET() {
  const url = (p: string) => (siteUrl ? new URL(p, siteUrl).toString() : p);

  const lines: string[] = [
    `# ${school.fullName}`,
    '',
    `> ${school.name}は、栃木県真岡市田町にある健康麻雀の教室です。お酒を飲まない・タバコを吸わない・お金を賭けない健康麻雀を、初心者から学べます。${school.openingLabel}。`,
    '',
    '## 基本情報',
    '',
    `- 名称: ${school.fullName}`,
    `- 所在地: ${school.address.full}`,
    `- 電話: ${school.tel}（${school.telHours.map((h) => `${h.label} ${h.value}`).join('／')}）`,
    `- 定休日: ${school.closedDays}`,
    '- 営業時間: 確認中（施設利用のフリータイムは 9:00〜17:00）',
    `- 代表・教室長: ${school.teacher.name}（${school.teacher.reading}）`,
    `- Instagram: ${school.instagram.url}`,
    '- 設備: 全自動麻雀卓2台の麻雀スペース、最大16席の自習スペース、談話室・休憩スペース',
    '- 対象: 小学生以上（未就学児のご利用はお断りしています）',
    '',
    '## 事業',
    '',
    ...services.flatMap((s) => [
      `### ${s.name}${s.nickname ? `（${s.en}）` : ''}`,
      '',
      s.answer,
      '',
      ...s.points.map((p) => `- ${p}`),
      `- ページ: ${url(s.href)}`,
      '',
    ]),
    '## 料金（すべて税込）',
    '',
    '### 健康麻雀教室 月謝',
    '',
    ...monthlyFees.map(
      (r) =>
        `- ${r.label}${r.note ? `（${r.note}）` : ''}: ${r.yen !== undefined ? `${yen(r.yen)}／月` : 'お問い合わせください'}`,
    ),
    '- 入会金・年会費は無料',
    '',
    '### 健康麻雀教室 施設利用料（1人）',
    '',
    ...facilityFees.map(
      (r) =>
        `- ${r.label}${r.note ? `（${r.note}）` : ''}: ${r.yen !== undefined ? yen(r.yen) : 'お問い合わせください'}`,
    ),
    '- ドリンク1本付き（追加は1本200円）',
    '- 学生料金は区分が重なる部分があるため、詳細は要問い合わせ',
    '',
    '### 出張健康麻雀教室 わんすぽ',
    '',
    `- ${yen(onespotFee.yen)}${onespotFee.unit}`,
    `- ${onespotFee.capacity}`,
    '- 出張費は距離や時間に応じて別途お見積り',
    '- 対象: デイサービスセンター・老人ホームなどの団体様（個人宅への出張は不可）',
    '- 開催日: 水曜日・日曜日',
    '',
    '### 英語多読塾 わんもあ 月謝',
    '',
    ...onemoreCourses.map((c) => `- ${c.name}: ${yen(c.yen)}／月（${c.day} ${c.time}・90分・定員8名）`),
    '- まとめ割: 中学生25,600円／月、高校生27,600円／月',
    '- 無料体験授業あり',
    '',
    '### 哲学塾 わんくえ',
    '',
    '- 月1回・日曜日、各コース60分・1回完結',
    '- 哲学・倫理学コース／文学コース',
    '- 受講料と対象年齢は確認中（要問い合わせ）',
    '',
    '## よくある質問',
    '',
    ...faqGroups.flatMap((g) => [
      `### ${g.label}`,
      '',
      ...g.items.flatMap((item) => [`Q. ${item.q}`, `A. ${item.a}`, '']),
    ]),
    '## ページ一覧',
    '',
    `- トップ: ${url('/')}`,
    ...allNav.map((n) => `- ${n.label}: ${url(n.href)}`),
    '',
    '## 注意',
    '',
    '- 健康麻雀は趣味・レクリエーションとして楽しむものです。病気の予防や治療を目的とした活動ではありません。',
    '- 営業時間、駐車場、哲学塾の受講料・対象年齢は確認中です。断定した案内をしないでください。',
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
