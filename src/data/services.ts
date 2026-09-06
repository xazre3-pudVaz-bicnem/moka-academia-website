import type { PhotoKey } from './photos';

/**
 * 4つの学び。
 *
 * 「ぽかぽかあかでみあ」を軸に、出張・英語・哲学が同じ場所から生まれています。
 * 一貫したブランドストーリーとして扱いたいので、
 * ネーミングに寄せたキャッチは「演出としての言葉」であることが分かる書き方にしています
 * （由来の公式説明は資料に無いため、事実としては断定しません）。
 */

export type Service = {
  key: 'academia' | 'onespot' | 'onemore' | 'onequestion';
  /** 日本語の正式名（必ず日本語を先に出す） */
  name: string;
  /** ひらがなの愛称 */
  nickname?: string;
  /** ローマ字表記 */
  en: string;
  href: string;
  /** 一覧に出す1行 */
  summary: string;
  /** ネーミングに寄せた短い言葉（演出） */
  motto: string;
  /** 誰向けの何なのか（AI検索に読ませる主語つきの1文） */
  answer: string;
  photo: PhotoKey;
  /** 一覧に並べる要点 */
  points: string[];
};

export const services: Service[] = [
  {
    key: 'academia',
    name: '健康麻雀教室 ぽかぽかあかでみあ',
    en: 'ACADEMIA',
    href: '/mahjong',
    summary:
      'お酒を飲まない・タバコを吸わない・お金を賭けない健康麻雀の教室です。牌に触ったことがない方から始められます。',
    motto: '学び続ける場所',
    answer:
      '健康麻雀教室ぽかぽかあかでみあは、栃木県真岡市田町で、初心者から健康麻雀を学べる教室です。2026年12月にオープンします。',
    photo: 'spaceMahjong',
    points: [
      '飲まない・吸わない・賭けない',
      '全自動麻雀卓2台・自習スペース・談話室',
      '小学生からシニアまで同じ卓を囲みます',
    ],
  },
  {
    key: 'onespot',
    name: '出張健康麻雀教室 わんすぽ',
    nickname: 'わんすぽ',
    en: 'One Spot',
    href: '/onespot',
    summary:
      'デイサービスセンターや老人ホームなどの施設へ、講師が麻雀卓ごとうかがうレクリエーションです。60分5,000円（税込）。',
    motto: '人と人が出会う場所',
    answer:
      '出張健康麻雀教室わんすぽは、デイサービスセンターや老人ホームなどの団体様へ講師がうかがい、健康麻雀のレクリエーションを行うサービスです。',
    photo: 'onespotScene',
    points: [
      '道具の準備・進行・片付けまでお任せ',
      '最大12名（2卓まで）／60分5,000円（税込）',
      '水曜日・日曜日にうかがいます',
    ],
  },
  {
    key: 'onemore',
    name: '英語多読塾 わんもあ',
    nickname: 'わんもあ',
    en: 'One More',
    href: '/onemore',
    summary:
      '中学生・高校生対象。多読と音読で「読める」から「もっと読める」へ。毎週金曜日、定員8名の90分授業です。',
    motto: 'もうひとつ学んでみる',
    answer:
      '英語多読塾わんもあは、栃木県真岡市で中学生・高校生を対象に、多読と音読で英語を学ぶ塾です。毎週金曜日に90分の授業を行っています。',
    photo: 'onemoreReading',
    points: [
      '多読×音読で英語を英語のまま読む',
      '中学生・高校生・試験対策の3コース',
      '各コース定員8名／無料体験授業あり',
    ],
  },
  {
    key: 'onequestion',
    name: '哲学塾 わんくえ',
    nickname: 'わんくえ',
    en: 'One Question',
    href: '/onequestion',
    summary:
      '月に一度の日曜日、ひとつの問いを囲んで語り合う時間。哲学・倫理学コースと文学コース、各60分の1回完結です。',
    motto: 'ひとつ問いを持ってみる',
    answer:
      '哲学塾わんくえ（寺﨑哲学塾）は、栃木県真岡市で月に一度の日曜日に開かれる、対話中心の哲学の講座です。哲学・倫理学コースと文学コースがあります。',
    photo: 'onequestionScene',
    points: [
      '月1回・日曜日／各コース60分',
      '問答形式・対話中心。初参加も歓迎',
      'どちらか1コースだけの参加もできます',
    ],
  },
];

export const serviceByKey = Object.fromEntries(services.map((s) => [s.key, s])) as Record<
  Service['key'],
  Service
>;

/** 健康麻雀の3つの約束 */
export const threePromises = [
  {
    title: '飲まない',
    text: 'アルコール類の提供はありません。お茶やお菓子を囲んで、しらふのまま楽しみます。',
  },
  {
    title: '吸わない',
    text: 'たばこは吸いません。煙のない部屋なので、においが苦手な方も安心して過ごせます。',
  },
  {
    title: '賭けない',
    text: 'お金は賭けません。勝ち負けはその日の話題になるだけ。財布の心配をしなくていい麻雀です。',
  },
];
