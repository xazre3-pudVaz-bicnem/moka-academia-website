/**
 * 料金。チラシに載っていた金額と、ご本人からいただいた修正だけです（税込）。
 * ここに無い金額は作らず、`yen` を省いて「お問い合わせください」に落とします。
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

/** 入会のときにかかるもの（初期費用） */
export const initialFees: PriceRow[] = [
  { label: '入会金', yen: 5500, highlight: true },
  { label: 'オリジナルテキスト代', yen: 2000 },
];

/** オープンキャンペーン */
export const openingCampaign = {
  title: 'オープンキャンペーン',
  text: '定員8名様まで、入会金が無料になります。',
  detail: '5,500円の入会金が0円に。定員に達し次第、受付を終了します。',
};

/** 健康麻雀教室の月謝（税込） */
export const monthlyFees: PriceRow[] = [
  { label: '初心者コース', note: '小学生以上', yen: 9000, unit: '／月', highlight: true },
  { label: '経験者コース', yen: 12000, unit: '／月' },
  { label: '学生コース', note: '学生のみ', yen: 10000, unit: '／月' },
  { label: '親子割', note: '2人分', yen: 16000, wasYen: 19000, unit: '／月' },
];

export const monthlyFeeNotes = [
  '入会金5,500円と、オリジナルテキスト代2,000円が別途必要です。',
  'オープンキャンペーンとして、定員8名様まで入会金が無料になります。',
  '月謝は最初の授業日にお支払いください。',
  '授業終了後に自習室・談話室をご利用いただけます。',
  '親子割は、通常19,000円／月のところ3,000円お得になります。',
];

/**
 * 施設利用料（税込・1人）。オープン後の料金です。
 * 2026年10月、ご本人からの修正で「小学生から高校生まで一律300円」の1行だけになりました
 * （シニア・社会人、大学生、中高生の行と、フリータイム・ドリンク・サブスク会員の注記は削除）。
 */
export const facilityFees: PriceRow[] = [
  { label: '小学生〜高校生', note: '一律', yen: 300, highlight: true },
];

export const facilityFeeNotes = [
  '未就学のお子さまのご利用はお断りしています。',
  '施設利用料は、オープン後にご利用いただける料金です。',
];

/** 出張健康麻雀 わんすぽ */
export const onespotFee = {
  yen: 5000,
  unit: '／60分（税込）',
  capacity: '定員8名',
  /** 出張費 */
  travelYen: 1000,
  travelLabel: '真岡市内 一律',
  travelNote:
    '真岡市内への出張費は一律1,000円です。市外へうかがう場合は、距離や時間に応じてお見積りしますので、お気軽にお問い合わせください。',
};

/** 継続してご利用いただく法人様向けの定額プラン */
export const onespotPlans: PriceRow[] = [
  { label: '月2回プラン', yen: 9000, unit: '／月' },
  { label: '月3回プラン', yen: 13000, unit: '／月', highlight: true },
  { label: '月4回プラン', yen: 17000, unit: '／月' },
];

export const onespotPlanNotes = [
  '継続して健康麻雀を取り入れたい法人様向けのプランです。',
  '1回あたり60分・定員8名を基本としています。',
  '出張費のお取り扱いを含め、詳しくはお電話でご相談ください。',
];

/** 英語多読塾 わんもあ */
export type OnemoreCourse = {
  name: string;
  day: string;
  time: string;
  minutes: number;
  yen: number;
  material: string;
  /** 定員の書き方（コースによって数え方が違います） */
  capacity: string;
  /** 対象（構造化データ用） */
  audience: string;
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
    capacity: '定員8名',
    audience: '中学生',
    photo: 'onemoreClassJhs',
  },
  {
    name: '高校生コース',
    day: '毎週金曜日',
    time: '19:30〜21:00',
    minutes: 90,
    yen: 11800,
    material: '大学入試レベルの長文を使用',
    capacity: '定員8名',
    audience: '高校生',
    photo: 'onemoreClassHs',
  },
  {
    name: '受験対策特化コース',
    day: '毎週金曜日',
    time: '21:10〜22:40',
    minutes: 90,
    yen: 17800,
    material: '個人の目標に合わせて伴走',
    capacity: '各曜日定員3名',
    audience: '中学生・高校生',
    photo: 'onemoreClassExam',
  },
];

/**
 * 受験対策特化コースで、通う日を増やす場合の月謝（税込）。
 * 2026年10月にご本人からいただいた金額です。週3日まで追加できます。
 */
export const onemoreExamExtraPlans: PriceRow[] = [
  { label: '週2日の場合', yen: 32800, unit: '／月' },
  { label: '週3日の場合', yen: 43800, unit: '／月' },
];

export const onemoreBundles = [
  { label: '中学生', normal: 9800 + 17800, price: 25600, save: 2000 },
  { label: '高校生', normal: 11800 + 17800, price: 27600, save: 2000 },
];

export const onemoreNotes = [
  'すべて月謝制です。中学生コース・高校生コースは各コース定員8名、受験対策特化コースは各曜日定員3名です。',
  '受験対策特化コースは、週3日まで通う日を追加できます（各曜日に1教科が目安です）。',
  'まとめ割は、受験対策特化コースと通常コースを両方受講される方が対象です。',
  '無料体験授業を受け付けています。',
  '自習室と談話室をご利用いただけます。',
];

/** 哲学塾 わんくえ */
export const onequestionFees: PriceRow[] = [
  { label: '1コース受講', note: '哲学・倫理学／文学のどちらか', yen: 1000, highlight: true },
  { label: '2コース受講', note: '哲学・倫理学＋文学', yen: 1500 },
];

/** わんくえの初回キャンペーン */
export const onequestionCampaign = {
  title: '初回キャンペーン',
  text: '初めてご参加の方は500円です。',
  yen: 500,
  wasYen: 1000,
};

export const onequestionInfo = {
  audience: '社会人',
  capacity: '定員8名',
};

export const onequestionNotes = [
  '受講料は1回・1名あたりの金額です。',
  '各コース60分・1回完結です。どちらか一方だけのご参加もできます。',
  '2コースを続けて受講される場合は1,500円になります（別々に申し込むより500円お得です）。',
  '初めてご参加の方は、初回キャンペーンとして500円でご受講いただけます。',
];

export const yen = (n: number) => `${n.toLocaleString('ja-JP')}円`;
