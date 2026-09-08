/**
 * 写真の登録簿。
 *
 * いただいた素材はチラシ・ポスター・ロゴです。
 * チラシの中に入っている写真は scripts/prepare-images.mjs で切り出して使っています。
 * alt は「その画像に写っているもの」を正確に書き、
 * 実際の教室風景として確認できていないものは「イメージ」と明記しています。
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const p = (src: string, width: number, height: number, alt: string): Photo => ({
  src: `/photos/${src}`,
  width,
  height,
  alt,
});

export const photos = {
  // ── ブランド ─────────────────────────────
  logo: p(
    'logo-academia.jpg',
    1254,
    1254,
    '真岡の健康麻雀教室ぽかぽかあかでみあのロゴ。麻雀牌を並べたパンダと、竹と朝日を丸く囲んだデザイン',
  ),
  poster: p(
    'poster-academia.jpg',
    1054,
    1405,
    '「遊びで脳も心もぽかぽか」と書かれた、真岡の健康麻雀教室ぽかぽかあかでみあのポスター',
  ),

  // ── 教室のスペース ────────────────────────
  roomWide: p(
    'room-mahjong-wide.jpg',
    354,
    150,
    '窓から光が入る明るい教室に、全自動麻雀卓が2台並んでいる様子',
  ),
  spaceMahjong: p(
    'space-mahjong.jpg',
    234,
    172,
    '健康麻雀教室の麻雀スペース。全自動麻雀卓と、背もたれのある椅子が置かれている',
  ),
  spaceStudy: p(
    'space-study.jpg',
    234,
    172,
    '窓に向かって長机と椅子が並ぶ自習スペース。最大16席の静かな空間',
  ),
  spaceLounge: p(
    'space-lounge.jpg',
    234,
    172,
    'ソファとローテーブル、ドリンクの冷蔵庫が置かれた談話室・休憩スペース',
  ),
  originalTexts: p(
    'original-texts.jpg',
    195,
    78,
    '教室長が作成したオリジナルテキスト「はじめての麻雀 入門テキスト」と「基本の牌効率」',
  ),

  // ── 講師 ────────────────────────────────
  teacherTrophy: p(
    'teacher-trophy.jpg',
    168,
    238,
    '健康麻雀教室ぽかぽかあかでみあ代表の寺崎聖さん。麻雀大会のトロフィーを手にしている',
  ),
  teacherPortrait: p(
    'teacher-portrait.jpg',
    130,
    165,
    '健康麻雀教室ぽかぽかあかでみあ 教室長の寺崎聖さん',
  ),

  // ── 出張健康麻雀 わんすぽ ─────────────────
  onespotScene: p(
    'onespot-scene.jpg',
    494,
    272,
    '麻雀卓を囲んで笑顔で牌を並べるシニアの方々と、そばで進行を支える講師（出張健康麻雀教室のイメージ）',
  ),
  onespotTools: p(
    'onespot-tools.jpg',
    104,
    104,
    '牌が並べられた全自動麻雀卓。道具はすべて教室側で用意します（イメージ）',
  ),
  onespotSupport: p(
    'onespot-support.jpg',
    104,
    104,
    '麻雀卓のそばで、参加者に牌の並べ方を説明する講師（イメージ）',
  ),
  onespotGroup: p(
    'onespot-group.jpg',
    104,
    104,
    '1つの麻雀卓を囲んで談笑しながら麻雀を楽しむ参加者のみなさん（イメージ）',
  ),

  // ── 英語多読塾 わんもあ ───────────────────
  onemoreReading: p(
    'onemore-reading.jpg',
    240,
    235,
    '英語の本を開いて読んでいる中高生（英語多読塾わんもあのイメージ）',
  ),
  onemoreStudent: p(
    'onemore-student.jpg',
    274,
    248,
    '机に向かってペンを持ち、英語の長文に取り組む高校生（英語多読塾わんもあのイメージ）',
  ),
  onemoreClassJhs: p(
    'onemore-class-jhs.jpg',
    218,
    100,
    '英語多読塾わんもあ 中学生コースで学習に取り組む生徒（イメージ）',
  ),
  onemoreClassHs: p(
    'onemore-class-hs.jpg',
    218,
    100,
    '英語多読塾わんもあ 高校生コースで長文読解に取り組む生徒（イメージ）',
  ),
  onemoreClassExam: p(
    'onemore-class-exam.jpg',
    218,
    100,
    '英語多読塾わんもあ 試験対策特化コースで問題演習に取り組む生徒（イメージ）',
  ),

  // ── 哲学塾 わんくえ ──────────────────────
  onequestionScene: p(
    'onequestion-scene.jpg',
    980,
    560,
    '本を開いて語りかける講師と、円を描いて座り耳を傾ける参加者たち（哲学塾わんくえのイメージ）',
  ),

  // ── チラシそのもの ───────────────────────
  flyerAcademia: p(
    'flyer-academia.jpg',
    1054,
    1492,
    '健康麻雀教室ぽかぽかあかでみあ 2026年12月オープンのチラシ。3つのスペース、月謝、施設利用料、アクセスが載っている',
  ),
  flyerOnespot: p(
    'flyer-onespot.jpg',
    1254,
    1254,
    'デイサービスセンター様向け 出張健康麻雀教室のチラシ。60分5,000円、最大12名までの案内が載っている',
  ),
  flyerOnemore: p(
    'flyer-onemore.jpg',
    1254,
    1254,
    '中学生・高校生対象 英語多読塾わんもあのチラシ。3コースの時間と月謝、まとめ割の案内が載っている',
  ),
  flyerOnemoreFlow: p(
    'flyer-onemore-flow.jpg',
    1254,
    1254,
    '英語多読塾わんもあ 90分授業の流れを示した図。単語テストから学習記録までの8ステップ',
  ),
  flyerOnequestion: p(
    'flyer-onequestion.jpg',
    1254,
    1254,
    '寺﨑哲学塾のチラシ。哲学・倫理学コースと文学コース、月に一度日曜日の開催案内が載っている',
  ),
  flyerVolunteer: p(
    'flyer-volunteer.jpg',
    1254,
    1254,
    '健康麻雀ボランティアのチラシ。10月19日日曜日11時からまちなか保健室田町館で開催、定員20名',
  ),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
