/**
 * 料金。すべてチラシに載っていた金額です（税込）。
 * チラシに無い金額は作らず、`ask: true` で「お問い合わせください」に落とします。
 */

export type PriceRow = {
  label: string;
  note?: string;
  /** 金額（円）。未確認のときは undefined */
  yen?: number;
  /** 「/月」「/60分」など */
  unit?: string;
  /** 取り消し線で見せる通常価格 */
  wasYen?: number;
  highlight?: boolean;
};

/** 健康麻雀教室の月謝（税込） */
export const monthlyFees: PriceRow[] = [
  { label: '初心者コース', note: '小学生以上', yen: 9000, unit: '／月', highlight: true },
  { label: '経験者コース', yen: 12000, unit: '／月' },
  { label: '学生コース', note: '学生のみ', yen: 10000, unit: '／月' },
  { label: '親子割', note: '2人分', yen: 16000, wasYen: 19000, unit: '／月' },
];

export const monthlyFeeNotes = [
  '入会金・年会費は無料です。',
  '月謝は最初の授業日にお支払いください。',
  '授業終了後に自習室・談話室をご利用いただけます。',
  '親子割は、通常19,000円／月のところ3,000円お得になります。',
];

/** 施設利用料（税込・1人） */
export const facilityFees: PriceRow[] = [
  { label: 'シニア・社会人', note: '3時間', yen: 1000 },
  { label: 'シニア・社会人', note: 'フリータイム（9:00〜17:00）', yen: 2000 },
  { label: '大学生', yen: 700 },
  { label: '中高生', yen: 500 },
  { label: '学生', note: '小学生〜高校生', yen: 200 },
];

export const facilityFeeNotes = [
  'フリータイムは営業終了まで出入り自由です。',
  'ドリンク1本付き（追加は1本200円）。',
  'サブスク会員は別途プランがあります。',
  '未就学のお子さまのご利用はお断りしています。',
  // チラシ上で「中高生」と「学生（小学生〜高校生）」の区分が重なっているため、
  // どちらの数字も消さずに載せたうえで、確認をお願いする一言を添えています。
  '学生料金は区分が重なる部分があります。どの料金になるかはお問い合わせください。',
];

/** 出張健康麻雀 わんすぽ */
export const onespotFee = {
  yen: 5000,
  unit: '／60分（税込）',
  capacity: '最大12名（2卓まで）',
  travelNote:
    '出張費が別途必要です。距離や時間に応じてお見積りしますので、お気軽にお問い合わせください。',
};

/** 英語多読塾 わんもあ */
export type OnemoreCourse = {
  name: string;
  day: string;
  time: string;
  minutes: number;
  yen: number;
  material: string;
  photo: 'onemoreClassJhs' | 'onemoreClassHs' | 'onemoreClassExam';
};

export const onemoreCourses: OnemoreCourse[] = [
  {
    name: '中学生コース',
    day: '毎週金曜日',
    time: '17:50〜19:20',
    minutes: 90,
    yen: 9800,
    material: 'オリジナル教材を使用',
    photo: 'onemoreClassJhs',
  },
  {
    name: '高校生コース',
    day: '毎週金曜日',
    time: '19:30〜21:00',
    minutes: 90,
    yen: 11800,
    material: '大学入試レベルの長文を使用',
    photo: 'onemoreClassHs',
  },
  {
    name: '試験対策特化コース',
    day: '毎週金曜日',
    time: '21:10〜22:40',
    minutes: 90,
    yen: 17800,
    material: '個人の目標に合わせて伴走',
    photo: 'onemoreClassExam',
  },
];

export const onemoreBundles = [
  { label: '中学生', normal: 9800 + 17800, price: 25600, save: 2000 },
  { label: '高校生', normal: 11800 + 17800, price: 27600, save: 2000 },
];

export const onemoreNotes = [
  'すべて月謝制、各コース定員8名です。',
  'まとめ割は、試験対策特化コースと通常コースを両方受講される方が対象です。',
  '無料体験授業を受け付けています。',
  '自習室と談話室をご利用いただけます。',
];

/** 哲学塾 わんくえ。料金は資料で確認できていないため、金額を作りません */
export const onequestionFee = {
  known: false,
  note: '受講料はお問い合わせください。',
};

export const yen = (n: number) => `${n.toLocaleString('ja-JP')}円`;
