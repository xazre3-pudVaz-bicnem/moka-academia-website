import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Photo from '@/components/ui/Photo';
import Faq from '@/components/ui/Faq';
import CtaBand from '@/components/ui/CtaBand';
import RelatedLinks from '@/components/ui/RelatedLinks';
import JsonLd from '@/components/ui/JsonLd';

import { photos } from '@/data/photos';
import { school } from '@/data/school';
import { faqItems } from '@/data/faq';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';

const PATH = '/beginner';
const TITLE = 'はじめて健康麻雀を始める方へ｜真岡市の麻雀教室';
const DESCRIPTION =
  '麻雀牌を触ったことがない方へ。真岡市の健康麻雀教室ぽかぽかあかでみあでは、牌の名前と持ち方から始められます。一人参加、女性、シニア、小学生からのご参加を歓迎。持ち物・服装・予約・料金など、はじめての方の不安にお答えします。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    '麻雀 初心者 真岡',
    '健康麻雀 初心者',
    '初心者 麻雀教室',
    '真岡 麻雀 はじめて',
    '女性 麻雀 初心者',
  ],
});

const crumbs = [HOME_CRUMB, { name: 'はじめての方へ', href: PATH }];

/** 初日の流れ。資料から言えることだけを書いています */
const steps = [
  {
    n: '1',
    title: 'お電話でご連絡ください',
    text: `まずはお電話（${school.tel}）を1本ください。席と講師の準備ができるので、当日ゆっくり過ごしていただけます。「麻雀は全然知りません」から言っていただいて大丈夫です。`,
  },
  {
    n: '2',
    title: '牌の名前と持ち方から',
    text: '初日は牌に触るところからです。萬子・筒子・索子・字牌。34種類の牌の顔を覚えるところから、講師が横についてお伝えします。',
  },
  {
    n: '3',
    title: 'テキストを見ながら卓へ',
    text: '「はじめての麻雀 入門テキスト」を使いながら、実際に卓に着いてみます。分からなくなったら、その場で止めて構いません。',
  },
  {
    n: '4',
    title: '談話室でひと息',
    text: 'お茶やお菓子をご用意しています。牌から離れて話す時間も、この教室の大事な部分です。',
  },
];

/** 不安に答える表。分からないことは正直に「確認中」と書いています */
const worries = [
  { q: '牌を触ったことがない', a: '大丈夫です。牌の名前と持ち方から始めます。', ok: true },
  { q: 'ルールを知らない', a: '大丈夫です。オリジナルの入門テキストで順を追って学べます。', ok: true },
  { q: '一人で行っても平気？', a: 'おひとりでの参加を歓迎しています。麻雀は4人で囲む遊びです。', ok: true },
  { q: '何歳くらいの人がいる？', a: '小学生以上が対象です。シニアの方から学生さんまで。', ok: true },
  { q: '持ち物は？', a: '要りません。麻雀卓も牌もテキストも教室にあります。', ok: true },
  { q: 'どんな服装？', a: '普段着で結構です。', ok: true },
  { q: '予約は必要？', a: '初めてのときは、お電話をいただけると安心です。', ok: true },
  { q: '料金は？', a: '月謝9,000円／月から。1回ごとの施設利用料でも利用できます。', ok: true },
  { q: '子どもも参加できる？', a: '小学生から参加できます。未就学のお子さまはお断りしています。', ok: true },
  { q: 'どれくらいの時間？', a: '3時間の枠と、フリータイム（9:00〜17:00）の枠があります。', ok: true },
  { q: '駐車場はある？', a: '確認中です。お越しの前にお電話でお尋ねください。', ok: false },
  { q: '営業時間は？', a: '確認中です。お電話でお尋ねください。定休日は水曜日・日曜日です。', ok: false },
];

export default function BeginnerPage() {
  const faq = faqItems('hajimete', 'kenko-mahjong');

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="FOR BEGINNERS"
        title={
          <>
            麻雀を、
            <br />
            一度もやったことがない方へ。
          </>
        }
        answer="健康麻雀教室ぽかぽかあかでみあは、麻雀牌を触ったことがない方が、いちばん多く来られる教室です。ルールを知らないまま来ていただいて構いません。牌の名前と持ち方から、講師が一からお伝えします。"
        photo="onespotSupport"
      />

      {/* いちばん多い不安 */}
      <Section tone="white" width="narrow" size="md">
        <Reveal variant="line">
          <p className="speech mx-auto max-w-[26rem] text-center text-[1.02rem] leading-[1.9]">
            「まわりに迷惑をかけたら、どうしよう」
          </p>
        </Reveal>
        <Reveal variant="line" delay={120}>
          <p className="mt-10 text-[1.05rem] leading-[2.1]">
            はじめての方から、いちばん多くいただくのがこの言葉です。
            でも、ここは勝ち負けを競う場所ではありません。
            分からないところで手が止まったら、その場で止めて聞いてください。
            まわりの人も、同じところで止まったことがある人ばかりです。
          </p>
        </Reveal>
        <Reveal variant="line" delay={180}>
          <p className="mt-5 text-[1.05rem] leading-[2.1]">
            それに、独学だと点数計算や牌効率で必ずつまずきます。
            そこを飛ばさずに教われるのが、教室に来ていただく意味だと思っています。
          </p>
        </Reveal>
      </Section>

      {/* 初日の流れ */}
      <Section>
        <SectionHeading
          en="FIRST DAY"
          title="はじめての日の、流れ。"
          lead="お電話をいただいてから、その日のうちに卓に着くところまで。だいたいこんな順番で進みます。"
        />
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90}>
              <p className="display flex h-11 w-11 items-center justify-center rounded-full bg-wakaba-2 text-[1.2rem] text-midori-3">
                {s.n}
              </p>
              <h3 className="display mt-4 text-[1.1rem]">{s.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-[1.95] text-sumi-2">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* 不安への答え */}
      <Section tone="kinari-2">
        <SectionHeading
          en="YOUR WORRIES"
          title="来る前に、知っておきたいこと。"
          lead="お問い合わせでよくいただくことをまとめました。まだ決まっていないことは、正直に「確認中」と書いています。"
        />
        <dl className="mt-11 grid gap-px overflow-hidden rounded-3xl border border-usu bg-usu sm:grid-cols-2">
          {worries.map((w, i) => (
            <Reveal as="div" key={w.q} delay={Math.min(i, 8) * 40} className="bg-kinari p-5 sm:p-6">
              <dt className="display flex items-start gap-2.5 text-[1.02rem]">
                <span
                  aria-hidden
                  className={`mt-[0.15em] grid h-6 w-6 shrink-0 place-items-center rounded-full text-[0.8rem] ${
                    w.ok ? 'bg-midori-2 text-white' : 'bg-yamabuki text-sumi'
                  }`}
                >
                  {w.ok ? '○' : '?'}
                </span>
                {w.q}
              </dt>
              <dd className="mt-2 pl-[2.15rem] text-[0.94rem] leading-[1.9] text-sumi-2">{w.a}</dd>
            </Reveal>
          ))}
        </dl>
      </Section>

      {/* 写真 */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <Reveal variant="clip" className="overflow-hidden rounded-[1.75rem]">
            <Photo
              photo={photos.onespotScene}
              sizes="(min-width: 1024px) 540px, 92vw"
              className="aspect-[16/10] w-full object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading
              en="AFTER THE FIRST DAY"
              title="2回目からが、たのしくなります。"
              lead="牌の顔がひととおり分かると、卓の景色が変わります。あとは、来るたびに少しずつです。急ぐ必要はありません。"
            />
            <Reveal delay={220}>
              <p className="mt-7">
                <Link href="/mahjong" className="arrow-link text-midori-3">
                  健康麻雀教室のことをくわしく見る
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="kinari-2" width="narrow">
        <SectionHeading en="FAQ" title="はじめての方のよくある質問" />
        <div className="mt-10">
          <Faq items={faq} />
        </div>
      </Section>

      <RelatedLinks
        links={[
          {
            href: '/mahjong',
            label: '健康麻雀教室 あかでみあ',
            text: '教室でしていること、特徴、料金、3つのスペースについて。',
          },
          {
            href: '/price',
            label: '料金一覧',
            text: '月謝と施設利用料。4つの学びの料金をまとめています。',
          },
          {
            href: '/faq',
            label: 'よくある質問',
            text: '健康麻雀から英語多読、哲学塾まで。すべての質問と答え。',
          },
        ]}
      />

      <CtaBand
        heading="「何も知らないんですけど」から、どうぞ。"
        lead="そのひと言でお電話をいただくことが、いちばん多いです。見学だけでも構いません。"
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />
    </>
  );
}
