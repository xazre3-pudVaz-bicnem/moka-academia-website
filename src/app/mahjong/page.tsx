import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Photo from '@/components/ui/Photo';
import Faq from '@/components/ui/Faq';
import PriceList from '@/components/ui/PriceList';
import CtaBand from '@/components/ui/CtaBand';
import RelatedLinks from '@/components/ui/RelatedLinks';
import JsonLd from '@/components/ui/JsonLd';
import { ArrowIcon, TileMark } from '@/components/ui/icons';

import { photos } from '@/data/photos';
import { school } from '@/data/school';
import { threePromises } from '@/data/services';
import { facilityFeeNotes, facilityFees, monthlyFeeNotes, monthlyFees } from '@/data/pricing';
import { faqItems } from '@/data/faq';
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';

const PATH = '/mahjong';
const TITLE = '健康麻雀教室 ぽかぽかあかでみあ｜真岡市の麻雀教室';
const DESCRIPTION =
  '健康麻雀教室ぽかぽかあかでみあは、栃木県真岡市田町で初心者から健康麻雀を学べる教室です。飲まない・吸わない・賭けない健康麻雀。全自動麻雀卓2台、自習スペース、談話室を備え、小学生からシニアまで同じ卓を囲みます。月謝9,000円から。2026年12月オープン。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    '真岡 麻雀教室',
    '真岡市 麻雀教室',
    '真岡 健康麻雀',
    '栃木 健康麻雀',
    '健康麻雀 初心者',
    'シニア 健康麻雀',
    '女性 健康麻雀',
  ],
});

const crumbs = [HOME_CRUMB, { name: '健康麻雀教室', href: PATH }];

const features = [
  {
    title: '多世代交流',
    text: '世代を超えた出会いとつながり。小学生からシニアまで、同じ卓を囲みます。',
  },
  {
    title: '頭と指先を使う',
    text: '牌を触り、数え、考える。座ったまま、頭と手を動かして過ごせる趣味です。',
  },
  {
    title: '初心者歓迎',
    text: 'やさしく丁寧にサポートします。牌に触ったことがない方から始められます。',
  },
  {
    title: 'お菓子・飲み物',
    text: 'お菓子・お茶・水をご用意しています（アルコール類の提供はありません）。',
  },
  {
    title: '夜間は送迎推奨',
    text: '小学生の夜のご利用は、保護者の方の送迎をお願いしています。',
  },
];

export default function MahjongPage() {
  const faq = faqItems('kenko-mahjong', 'kyoshitsu');

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="ACADEMIA｜健康麻雀教室"
        title={
          <>
            真岡の健康麻雀教室
            <br />
            ぽかぽかあかでみあ
          </>
        }
        answer="健康麻雀教室ぽかぽかあかでみあは、栃木県真岡市田町で、初心者から健康麻雀を学べる教室です。お酒を飲まない・タバコを吸わない・お金を賭けない健康麻雀を、麻雀プロを目指す講師が一からお伝えします。2026年12月にオープンします。"
        photo="roomWide"
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/beginner" className="btn btn-midori">
            はじめての方へ
            <ArrowIcon className="h-5 w-5" />
          </Link>
          <a href={school.telLink} className="btn btn-outline text-midori-3">
            電話で相談する
          </a>
        </div>
      </PageHero>

      {/* 3つの約束 */}
      <Section tone="white">
        <SectionHeading
          en="THREE PROMISES"
          title="勝つための雀荘ではありません。"
          lead="健康麻雀には3つの約束があります。この3つがあるから、麻雀を知らない方も、女性も、お子さんも、同じ卓につけます。"
        />
        <ul className="mt-12 grid gap-8 sm:grid-cols-3">
          {threePromises.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 90} className="text-center">
              <TileMark label={['酒', '煙', '金'][i]} className="h-14 w-11 text-[1.5rem] text-midori-3" />
              <p className="display mt-4 text-[1.6rem] text-midori-3">{p.title}</p>
              <p className="mt-3 text-[0.96rem] leading-[1.95] text-sumi-2">{p.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* この場所ですること */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              en="WHAT WE DO"
              title={
                <>
                  覚える。考える。会話する。
                  <br />
                  楽しむ。仲間をつくる。
                </>
              }
            />
            <Reveal variant="line" delay={200}>
              <p className="mt-7 text-[1.02rem] leading-[2.1]">
                ぽかぽかあかでみあでしていることを言葉にすると、この5つになります。
                点数を競うことよりも、牌を並べながら交わす会話や、
                「そこはこう切るといいですよ」と教え合う時間のほうが、ずっと長いかもしれません。
              </p>
            </Reveal>
            <Reveal variant="line" delay={260}>
              <p className="mt-5 text-[1.02rem] leading-[2.1]">
                麻雀は、頭と指先を使いながら人と向き合う遊びです。
                だからこそ、新しい趣味としても、久しぶりに人と話す場所としても、ちょうどいい。
                ここは、そういう場所にしたいと思っています。
              </p>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-4 text-[0.9rem] leading-[1.9] text-sumi-2">
                ※ 健康麻雀は趣味として楽しんでいただくものです。病気の予防や治療を目的とした活動ではありません。
              </p>
            </Reveal>
          </div>

          <Reveal variant="clip" className="overflow-hidden rounded-[1.75rem]">
            <Photo
              photo={photos.onespotGroup}
              sizes="(min-width: 1024px) 460px, 92vw"
              className="aspect-square w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      {/* 特徴 */}
      <Section tone="kinari-2">
        <SectionHeading en="FEATURES" title="ぽかぽかあかでみあの特徴" />
        <ul className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal as="li" key={f.title} delay={Math.min(i, 5) * 70}>
              <p className="display border-l-4 border-wakaba pl-3 text-[1.12rem] text-midori-3">
                {f.title}
              </p>
              <p className="mt-3 text-[0.96rem] leading-[1.95] text-sumi-2">{f.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* テキスト */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <Reveal variant="clip" className="overflow-hidden rounded-[1.5rem] border border-usu bg-kinari p-4">
            <Photo
              photo={photos.originalTexts}
              sizes="(min-width: 1024px) 400px, 92vw"
              className="w-full object-contain"
            />
          </Reveal>
          <div>
            <SectionHeading
              en="ORIGINAL TEXT"
              title="講師が作った、教室だけのテキスト。"
              lead="「はじめての麻雀 入門テキスト」と「基本の牌効率」。初心者でも理解しやすい内容で、牌の持ち方から戦術まで、ステップを追って学べます。実戦問題や例題も豊富です。"
            />
            <Reveal delay={220}>
              <p className="mt-6 text-[0.96rem] leading-[1.95] text-sumi-2">
                テキストのサンプルは、体験や見学の際にお持ちします。
                どんな順番で覚えていくのかを、先に見ていただけます。
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 料金 */}
      <Section id="price">
        <SectionHeading
          en="PRICE"
          title="料金"
          lead="毎週通う方は月謝、たまに来る方は施設利用料。どちらでもご利用いただけます。すべて税込です。"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h3 className="display text-[1.2rem] text-midori-3">月謝</h3>
            <PriceList className="mt-5" rows={monthlyFees} notes={monthlyFeeNotes} />
          </div>
          <div>
            <h3 className="display text-[1.2rem] text-midori-3">施設利用料（1人）</h3>
            <PriceList className="mt-5" rows={facilityFees} notes={facilityFeeNotes} />
          </div>
        </div>

        <Reveal delay={160}>
          <p className="mt-10">
            <Link href="/price" className="arrow-link text-midori-3">
              4つの学びの料金をまとめて見る
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section tone="kinari-2" width="narrow">
        <SectionHeading en="FAQ" title="健康麻雀教室のよくある質問" />
        <div className="mt-10">
          <Faq items={faq} />
        </div>
      </Section>

      <RelatedLinks
        links={[
          {
            href: '/beginner',
            label: 'はじめての方へ',
            text: '牌を触ったことがなくても大丈夫。初日の流れと、よくある不安への答え。',
          },
          {
            href: '/access',
            label: 'アクセス・教室案内',
            text: 'まちなか保健室 田町館の場所と、教室の設備について。',
          },
          {
            href: '/onespot',
            label: '出張健康麻雀 わんすぽ',
            text: '施設へうかがう出張健康麻雀。60分5,000円、最大12名まで。',
          },
        ]}
      />

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd
        data={courseJsonLd({
          name: '健康麻雀 初心者コース｜ぽかぽかあかでみあ',
          description:
            '栃木県真岡市の健康麻雀教室ぽかぽかあかでみあの初心者コース。小学生以上が対象で、牌の持ち方から点数計算まで、オリジナルテキストを使って学べます。',
          path: PATH,
          monthlyYen: 9000,
          audience: '麻雀初心者（小学生以上）',
        })}
      />
      <JsonLd
        data={courseJsonLd({
          name: '健康麻雀 経験者コース｜ぽかぽかあかでみあ',
          description:
            '栃木県真岡市の健康麻雀教室ぽかぽかあかでみあの経験者コース。牌効率や戦術など、一歩進んだ内容を学べます。',
          path: PATH,
          monthlyYen: 12000,
          audience: '麻雀経験者',
        })}
      />
    </>
  );
}
