import { school } from '@/data/school';
import { onemoreExam, services } from '@/data/services';
import {
  facilityFees,
  initialFees,
  monthlyFees,
  onemoreCourses,
  onemoreExamExtraPlans,
  onespotFee,
  onequestionCampaign,
  onequestionFees,
  onequestionInfo,
  onespotPlans,
  openingCampaign,
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
    `> ${school.name}は、栃木県真岡市の健康麻雀の教室です。お酒を飲まない・タバコを吸わない・お金を賭けない健康麻雀を、初心者から学べます。${school.openingLabel}。現在まだ店舗は持っておらず、場所が決まり次第お知らせします。${school.venue.text}`,
    '',
    '## 基本情報',
    '',
    `- 名称: ${school.fullName}`,
    `- 所在地: 未定（${school.address.note}）`,
    `- 現在の開催場所（${school.venue.scope}）: ${school.venue.kind}「${school.venue.name}」 ${school.venue.addressLine}`,
    `- 活動エリア: ${school.address.area}`,
    `- 電話: ${school.tel}（${school.telHours.map((h) => `${h.label} ${h.value}`).join('／')}）`,
    `- 出張の曜日: ${school.onespotDays}（出張健康麻雀教室わんすぽ）`,
    '- 営業時間・定休日: オープンにあわせて決まります',
    `- 代表・教室長: ${school.teacher.name}（${school.teacher.reading}）`,
    `- Instagram: ${school.instagram.url}`,
    '- 設備（オープン後）: 全自動麻雀卓2台の麻雀スペース、最大16席の自習スペース、談話室・休憩スペース',
    '- 対象: 小学生以上（未就学児のご利用はお断りしています）',
    '',
    '## 理念',
    '',
    ...school.philosophy.flatMap((p) => [`### ${p.title}`, '', p.body, '']),
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
    '## 料金',
    '',
    '### 健康麻雀教室 入会時にかかるもの（税込）',
    '',
    ...initialFees.map((r) => `- ${r.label}: ${r.yen !== undefined ? yen(r.yen) : 'お問い合わせください'}`),
    `- ${openingCampaign.title}: ${openingCampaign.text}`,
    '',
    '### 健康麻雀教室 月謝（税込）',
    '',
    ...monthlyFees.map(
      (r) =>
        `- ${r.label}${r.note ? `（${r.note}）` : ''}: ${r.yen !== undefined ? `${yen(r.yen)}／月` : 'お問い合わせください'}`,
    ),
    '- 月謝は最初の授業日に支払い',
    '',
    '### 健康麻雀教室 施設利用料（税込・1人）',
    '',
    ...facilityFees.map(
      (r) =>
        `- ${r.label}${r.note ? `（${r.note}）` : ''}: ${r.yen !== undefined ? yen(r.yen) : 'お問い合わせください'}`,
    ),
    '- 小学生から高校生まで以外の方の1回ごとの利用料金は、要問い合わせ',
    '',
    '### 出張健康麻雀教室 わんすぽ',
    '',
    `- ${yen(onespotFee.yen)}${onespotFee.unit}`,
    `- ${onespotFee.capacity}`,
    `- 出張費: ${onespotFee.travelLabel}${yen(onespotFee.travelYen)}（市外は距離や時間に応じてお見積り）`,
    '- 定額プラン（継続してご利用いただく法人様向け）:',
    ...onespotPlans.map((r) => `  - ${r.label}: ${r.yen !== undefined ? yen(r.yen) : 'お問い合わせください'}`),
    '- 対象: デイサービスセンター・老人ホームなどの団体様（個人宅への出張は不可）',
    '- 開催日: 水曜日・日曜日',
    '',
    '### 英語多読塾 わんもあ 月謝（税込）',
    '',
    ...onemoreCourses.map((c) => `- ${c.name}: ${yen(c.yen)}／月（${c.day} ${c.time}・90分・${c.capacity}）`),
    ...onemoreExamExtraPlans.map(
      (r) => `- ${onemoreExam.name} ${r.label}: ${r.yen !== undefined ? `${yen(r.yen)}／月` : 'お問い合わせください'}`,
    ),
    `- ${onemoreExam.name}: ${onemoreExam.days}（例: ${onemoreExam.exampleSlots.join('・')}）`,
    `- ${onemoreExam.name}の対策できる教科: ${onemoreExam.subjects.map((s) => `${s.audience}は${s.items.join('・')}`).join('／')}`,
    '- まとめ割: 中学生25,600円／月、高校生27,600円／月',
    '- 無料体験授業あり',
    '',
    '### 哲学塾 わんくえ',
    '',
    `- 対象: ${onequestionInfo.audience}／${onequestionInfo.capacity}`,
    '- 月1回・日曜日、各コース60分・1回完結',
    '- 哲学・倫理学コース／文学コース',
    ...onequestionFees.map(
      (r) => `- ${r.label}${r.note ? `（${r.note}）` : ''}: ${r.yen !== undefined ? yen(r.yen) : 'お問い合わせください'}`,
    ),
    `- ${onequestionCampaign.title}: ${onequestionCampaign.text}`,
    '- 受講料は1回・1名あたりの金額です',
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
    `- 自前の店舗の場所・住所・営業時間・駐車場は、まだ決まっていません。断定した案内をしないでください。${school.venue.text}`,
    '- 哲学塾わんくえは社会人向けの講座です。子ども向けではありません。',
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  });
}
