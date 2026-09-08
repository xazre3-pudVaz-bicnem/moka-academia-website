/**
 * ブログのトピック一覧。
 *
 * 1記事 = 1クエリ で設計しています（intent が記事同士でぶつからないように）。
 * 「真岡 健康麻雀」だけを毎日書くのではなく、検索意図を散らすのが目的です。
 *
 * category … src/lib/blog.ts の blogCategories のキー
 * intent   … その記事が狙う検索。ここが重複すると同じ記事を二度書くことになる
 * angle    … 何をどう書くか。ここを具体的に書くほど記事がばらけます
 *
 * 主軸は健康麻雀なので、kenko-mahjong と shoshinsha の本数をいちばん多くしています。
 */

export const topics = [
  /* ───────── 健康麻雀のこと（主軸） ───────── */
  { category: 'kenko-mahjong', title: '健康麻雀とは？普通の麻雀との違い', intent: '健康麻雀 とは', angle: '健康麻雀という言葉が指すもの。飲まない・吸わない・賭けないの3つの約束。ルールそのものは同じで、場のつくり方が違うという整理。' },
  { category: 'kenko-mahjong', title: '「飲まない・吸わない・賭けない」ということ', intent: '健康麻雀 飲まない 吸わない 賭けない', angle: '3つの約束それぞれが、場に何をもたらすか。お酒がないと何が変わるか、賭けないと何が変わるか。' },
  { category: 'kenko-mahjong', title: '健康麻雀は雀荘と何が違うのか', intent: '健康麻雀 雀荘 違い', angle: '雀荘という言葉に持たれている印象と、健康麻雀の場の違い。他店の批判はせず、場の設計の話にとどめる。' },
  { category: 'kenko-mahjong', title: '麻雀は頭と指先を使う遊び', intent: '麻雀 頭を使う 遊び', angle: '牌を触る、点数を数える、捨て牌を見る。麻雀の中で自然に起きていることを分解する。医学的な効果には踏み込まない。' },
  { category: 'kenko-mahjong', title: '麻雀で会話が生まれる理由', intent: '麻雀 交流 会話', angle: '4人で1つの卓を囲むという形が、なぜ会話を生むのか。同じ時間を共有するということ。' },
  { category: 'kenko-mahjong', title: '女性でも楽しめる健康麻雀', intent: '女性 健康麻雀', angle: 'お酒とタバコがない場だからこそ入りやすいということ。女性が麻雀を始めるときのハードルと、その外し方。' },
  { category: 'kenko-mahjong', title: 'シニア世代の新しい趣味に健康麻雀', intent: 'シニア 健康麻雀 趣味', angle: '座ったまま長く楽しめる趣味としての麻雀。何歳からでも始められること。効能の断定はしない。' },
  { category: 'kenko-mahjong', title: '親子で麻雀を楽しむということ', intent: '親子 麻雀', angle: '世代の違う人が同じルールで遊べるということ。親子割という選択肢があること。' },
  { category: 'kenko-mahjong', title: '子どもが麻雀から学べること', intent: '子ども 麻雀 教育', angle: '確率と判断、相手の手を想像すること、負けを受け入れること。ゲームとしての麻雀の側面。' },
  { category: 'kenko-mahjong', title: '麻雀のマナーという考え方', intent: '麻雀 マナー', angle: '牌の扱い、待つこと、相手への声かけ。マナーが場を気持ちよくするということ。' },
  { category: 'kenko-mahjong', title: '全自動麻雀卓があるということ', intent: '全自動麻雀卓 メリット', angle: '牌を積む手間がなくなると、初心者にとって何が楽になるか。次の局までの時間の話。' },
  { category: 'kenko-mahjong', title: '麻雀を続けるとどう変わるか', intent: '麻雀 上達 過程', angle: '牌の顔を覚える段階、待ちが見える段階、相手を読む段階。上達の階段を言葉にする。' },
  { category: 'kenko-mahjong', title: '賭けない麻雀のおもしろさ', intent: '賭けない 麻雀 面白い', angle: 'お金を賭けないと麻雀はつまらないのか、という問いへ。勝ち負け以外の楽しみ方。' },
  { category: 'kenko-mahjong', title: '麻雀の点数計算とどう付き合うか', intent: '麻雀 点数計算 苦手', angle: '点数計算が初心者の壁になりやすい理由と、そこを飛ばさずに教わるということ。' },
  { category: 'kenko-mahjong', title: '牌効率という考え方', intent: '麻雀 牌効率 とは', angle: 'どの牌を残すと手が広がるか、という考え方の入り口。テキストで順を追って学べるということ。' },

  /* ───────── 麻雀をはじめる ───────── */
  { category: 'shoshinsha', title: '麻雀初心者が最初に覚えること', intent: '麻雀 初心者 最初', angle: '34種類の牌の名前、萬子・筒子・索子・字牌の区別。最初の一歩をどこに置くか。' },
  { category: 'shoshinsha', title: '麻雀牌を触ったことがなくても大丈夫か', intent: '麻雀 触ったことない 不安', angle: '牌に触れたことがない人が、初日に何をするのか。手が止まっていいということ。' },
  { category: 'shoshinsha', title: '一人でも麻雀教室に参加できる？', intent: '麻雀教室 一人 参加', angle: 'おひとりでの参加が普通であること。4人で囲む遊びだからこそ、ひとりで来ても卓ができる。' },
  { category: 'shoshinsha', title: '麻雀を独学で覚えるのは難しいのか', intent: '麻雀 独学 難しい', angle: 'アプリや本での独学で止まりやすいところ。教わることで飛ばさずに済む部分。' },
  { category: 'shoshinsha', title: '麻雀教室に行くときの持ち物と服装', intent: '麻雀教室 持ち物 服装', angle: '手ぶらで行けるということ。普段着でいいということ。来る前の不安を減らす。' },
  { category: 'shoshinsha', title: '麻雀のルールはどこまで覚えればいいか', intent: '麻雀 ルール どこまで', angle: '全部を覚えてから始める必要はないという話。役は少しずつ増えていく。' },
  { category: 'shoshinsha', title: '大人になってから新しい趣味を始める', intent: '大人 新しい趣味 始める', angle: '何歳からでも始められるということ。始めるときの気後れと、その外し方。' },
  { category: 'shoshinsha', title: '麻雀の役はいくつ覚えればいいか', intent: '麻雀 役 覚え方', angle: 'まず使う役から覚えるという順番。リーチ、タンヤオ、役牌あたりの話にとどめる。' },
  { category: 'shoshinsha', title: '麻雀教室ではじめての日に何をするか', intent: '麻雀教室 初日 流れ', angle: '電話をしてから、牌に触って、卓に着くまで。初日の流れを順に説明する。' },
  { category: 'shoshinsha', title: '麻雀は何歳から始められるか', intent: '麻雀 何歳から', angle: '小学生以上という対象と、上に年齢の制限がないということ。世代が混ざる卓のこと。' },

  /* ───────── 真岡のこと ───────── */
  { category: 'moka', title: '真岡市で健康麻雀を始めたい方へ', intent: '真岡 健康麻雀 始めたい', angle: '真岡市で健康麻雀を探している人へ向けて、場所・料金・始め方をまとめる。' },
  { category: 'moka', title: '真岡市で習い事を探すということ', intent: '真岡 習い事', angle: '真岡市で新しいことを始めるときの選択肢の広げ方。趣味と学びの間にあるもの。' },
  { category: 'moka', title: '真岡でシニアの居場所を探す', intent: '真岡 シニア 居場所', angle: '用事がなくても寄れる場所という考え方。人と会うために出かけるということ。' },
  { category: 'moka', title: '真岡市で子どもの習い事を選ぶ', intent: '真岡 子ども 習い事', angle: '子どもが通える場所を選ぶときの視点。健康麻雀（小学生以上）と英語多読（中高生）という選択肢があること。哲学塾わんくえは社会人向けなので入れないこと。' },
  { category: 'moka', title: '真岡でオープンを待つということ', intent: '真岡 健康麻雀 オープン', angle: '2027年1月末のオープンに向けて、いま何をしているか。場所はまだ決まっていないので、住所や建物の話は書かないこと。' },
  { category: 'moka', title: 'まちの中に学びの場所があるということ', intent: '地域 学びの場', angle: '地域に学べる場所があることの意味。世代をこえて人が交わるということ。' },
  { category: 'moka', title: '真岡で趣味の仲間を見つける', intent: '真岡 趣味 仲間', angle: '同じことをする人と出会う場所。趣味を続けるうえで人の存在が果たす役割。' },

  /* ───────── 出張健康麻雀 ───────── */
  { category: 'onespot', title: '出張健康麻雀教室とは？', intent: '出張健康麻雀 とは', angle: '施設へ講師がうかがう形の健康麻雀。道具・進行・片付けまで任せられるという中身。' },
  { category: 'onespot', title: '施設のレクリエーションに麻雀を取り入れる', intent: '介護施設 レクリエーション 麻雀', angle: 'レクリエーションとしての麻雀の性質。頭と手を使うこと、会話が生まれること。効能は断定しない。' },
  { category: 'onespot', title: 'デイサービスで健康麻雀を行うということ', intent: 'デイサービス 麻雀', angle: 'デイサービスセンターで麻雀を行うときの進め方。人数、時間、初めての方への配慮。' },
  { category: 'onespot', title: '職員が詳しくなくても麻雀はできる', intent: '施設 麻雀 職員 負担', angle: '進行と指導を外に任せるという考え方。職員が見守りに専念できること。' },
  { category: 'onespot', title: '出張健康麻雀の当日の流れ', intent: '出張健康麻雀 流れ', angle: '相談から当日まで。60分をどう組み立てるか。ルール説明から卓を囲むまで。' },
  { category: 'onespot', title: '地域の集まりで健康麻雀をする', intent: '地域交流 健康麻雀', angle: '自治会やサロンなど、地域の集まりで麻雀を囲むということ。対応の可否は問い合わせに誘導する。' },

  /* ───────── 英語多読のこと ───────── */
  { category: 'onemore', title: '英語多読とは？たくさん読む英語学習', intent: '英語多読 とは', angle: '多読という学び方の考え方。訳さずに読むということ。量を読むことで起きる変化。' },
  { category: 'onemore', title: '音読が英語の土台をつくる理由', intent: '英語 音読 効果', angle: '声に出して読むことで何が変わるか。発音・スピード・リズムの話。' },
  { category: 'onemore', title: '英語を英語のまま理解するということ', intent: '英語 英語のまま 理解', angle: '和訳を挟まない読み方へ移っていく過程。途中でつまずくところ。' },
  { category: 'onemore', title: '中学生の英語をどう伸ばすか', intent: '中学生 英語 伸ばす', angle: '単語と読解のつながり。読める量が増えると何が起きるか。' },
  { category: 'onemore', title: '高校生の英語長文とどう向き合うか', intent: '高校生 英語 長文', angle: '大学入試レベルの長文を前にしたときの読み方。要約という練習。' },
  { category: 'onemore', title: '英検の対策と多読の関係', intent: '英検 多読', angle: '級ごとの目標と、日々読む量の関係。試験対策と多読は別ものではないという整理。' },
  { category: 'onemore', title: '「もう1冊読みたい」が生まれるとき', intent: '英語 読書 楽しい', angle: '読めた実感が次の1冊につながるということ。わんもあという名前につながる話。' },

  /* ───────── 哲学と問い ───────── */
  { category: 'onequestion', title: '哲学対話とはどんな時間か', intent: '哲学対話 とは', angle: '答えを出すことより、問いを深めること。問答形式で進むということ。' },
  { category: 'onequestion', title: '大人になってから哲学を学ぶということ', intent: '社会人 哲学 学び直し', angle: '仕事や暮らしを続けながら、月に一度だけ問いの前で立ち止まるということ。学生時代の勉強との違い。わんくえは社会人向けなので、子ども向けの話にしないこと。' },
  { category: 'onequestion', title: '問いを持つことから始まる学び', intent: '問いを立てる 学び', angle: '問いを持つという行為そのものについて。知識を覚えることとの違い。' },
  { category: 'onequestion', title: '自分の言葉で考えるということ', intent: '自分の言葉で考える', angle: '借りものの言葉と、自分の言葉。話してみて初めて分かることがあるということ。' },
  { category: 'onequestion', title: '文学から人間を考える', intent: '文学 人間 考える', angle: '物語や詩を入口に、人生や社会を考えるということ。文学コースの考え方。' },
  { category: 'onequestion', title: '違う考え方に触れるということ', intent: '違う意見 対話', angle: '自分と違う考えに出会ったときに起きること。対話の場が持つ役割。' },

  /* ───────── 活動レポート ───────── */
  { category: 'katsudo', title: '健康麻雀ボランティアという取り組み', intent: '健康麻雀 ボランティア', angle: 'オープン前にまちの中で開いている会について。初心者へのサポートの仕方。' },
  { category: 'katsudo', title: '教室ができるまでに考えたこと', intent: '麻雀教室 開業 想い', angle: '麻雀卓だけでなく自習室と談話室を置いた理由。場所づくりの考え方。' },
  { category: 'katsudo', title: 'オリジナルテキストをつくるということ', intent: '麻雀 テキスト 自作', angle: '独学でつまずいた場所を覚えているからこそ書けるテキスト。順番の設計について。' },
];

/** 記事から必ず張る内部リンク（カテゴリごと） */
export const categoryLinks = {
  'kenko-mahjong': ['/mahjong', '/beginner', '/contact'],
  shoshinsha: ['/beginner', '/mahjong', '/price'],
  moka: ['/access', '/mahjong', '/about'],
  onespot: ['/onespot', '/contact'],
  onemore: ['/onemore', '/price'],
  onequestion: ['/onequestion', '/about'],
  katsudo: ['/about', '/mahjong', '/onespot'],
};

/** アイキャッチに使える写真キー（src/data/photos.ts のキー） */
export const photoKeys = [
  'roomWide',
  'spaceMahjong',
  'spaceStudy',
  'spaceLounge',
  'originalTexts',
  'onespotScene',
  'onespotTools',
  'onespotSupport',
  'onespotGroup',
  'onemoreReading',
  'onemoreStudent',
  'onequestionScene',
  'teacherPortrait',
];

/** カテゴリごとに使ってよい写真（同じ絵が続かないように分けています） */
export const categoryPhotos = {
  'kenko-mahjong': ['spaceMahjong', 'roomWide', 'onespotGroup', 'onespotTools'],
  shoshinsha: ['onespotSupport', 'originalTexts', 'spaceMahjong', 'roomWide'],
  moka: ['spaceLounge', 'roomWide', 'spaceStudy'],
  onespot: ['onespotScene', 'onespotGroup', 'onespotSupport', 'onespotTools'],
  onemore: ['onemoreReading', 'onemoreStudent', 'spaceStudy'],
  onequestion: ['onequestionScene', 'spaceLounge'],
  katsudo: ['onespotGroup', 'teacherPortrait', 'originalTexts', 'roomWide'],
};

/** 記事から張ってよい内部パス（存在しないページへのリンクを弾くために使います） */
export const validPaths = [
  '/',
  '/mahjong',
  '/beginner',
  '/onespot',
  '/onemore',
  '/onequestion',
  '/about',
  '/price',
  '/access',
  '/faq',
  '/contact',
  '/blog',
];
