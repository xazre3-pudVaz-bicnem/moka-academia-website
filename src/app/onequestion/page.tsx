import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Photo from '@/components/ui/Photo';
import Faq from '@/components/ui/Faq';
import CtaBand from '@/components/ui/CtaBand';
import RelatedLinks from '@/components/ui/RelatedLinks';
import JsonLd from '@/components/ui/JsonLd';

import PriceList from '@/components/ui/PriceList';
import { photos } from '@/data/photos';
import {
  onequestionCampaign,
  onequestionFees,
  onequestionInfo,
  onequestionNotes,
  yen,
} from '@/data/pricing';
import { faqItems } from '@/data/faq';
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';

const PATH = '/onequestion';
const TITLE = '哲学塾 わんくえ One Question｜真岡市の哲学・対話の教室';
const DESCRIPTION =
  '哲学塾わんくえ（寺﨑哲学塾）は、栃木県真岡市で月に一度の日曜日に開かれる、社会人向けの対話中心の講座です。哲学・倫理学コースと文学コース、各60分・1回1,000円（2コースで1,500円）、定員8名。初回は500円でご参加いただけます。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    '真岡 哲学',
    '真岡 哲学教室',
    '哲学対話',
    '社会人 哲学',
    '大人 学び直し',
    '考える力',
    '問いを立てる',
    '真岡 学び',
  ],
});

const crumbs = [HOME_CRUMB, { name: '哲学塾 わんくえ', href: PATH }];

/** チラシに書かれていた問いをそのまま */
const questions = [
  '幸せってなんだろう？',
  '正しさって誰が決めるの？',
  '自由ってなんだろう？',
  '愛とはなんだろう？',
  '人はなぜ生きるの？',
];

const courses = [
  {
    no: '①',
    name: '哲学・倫理学コース',
    minutes: '60分',
    lead: '日常の「なぜ？」を哲学的に考える',
    text: '善悪・正しさ・自由・責任……。身近なテーマを入り口に、一緒に問いを深めていきます。',
  },
  {
    no: '②',
    name: '文学コース',
    minutes: '60分',
    lead: '物語や詩を入口に、人間を考える',
    text: '文学作品の世界に触れながら、人生や社会、そして自分自身について問いを立て、語り合います。',
  },
];

const details = [
  { t: '対象', d: '社会人' },
  { t: '定員', d: '8名' },
  { t: '開催日', d: '月に1回・日曜日' },
  { t: '時間', d: '各コース60分' },
  { t: 'スタイル', d: '問答形式・対話中心／初参加の方も大歓迎' },
  { t: '休憩・交流', d: '気軽に話して、つながる時間も大切に' },
];

export default function OnequestionPage() {
  const faq = faqItems('onequestion');

  return (
    <>
      <PageHero
        crumbs={crumbs}
        tone="dark"
        eyebrow="ONE QUESTION｜哲学塾 わんくえ"
        title={
          <>
            ひとつの問いから、
            <br />
            世界は広がる。
          </>
        }
        answer="哲学塾わんくえ（One Question／寺﨑哲学塾）は、栃木県真岡市で月に一度の日曜日に開かれる、社会人を対象とした問答形式・対話中心の講座です。哲学・倫理学コースと文学コースがあり、それぞれ60分・1回完結。受講料は1コース1,000円、2コースで1,500円。定員8名で、初めて参加する方は初回500円です。"
        photo="onequestionScene"
      />

      {/* 問い */}
      <section className="yoru-section">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
          <Reveal variant="line">
            <p className="eyebrow text-kin">QUESTIONS</p>
          </Reveal>
          <ul className="mt-9 space-y-5">
            {questions.map((q, i) => (
              <Reveal as="li" key={q} delay={i * 90}>
                <p
                  className="text-[1.15rem] leading-[1.9] text-kin-2 sm:text-[1.4rem]"
                  style={{ fontFamily: 'var(--font-mincho)', letterSpacing: '0.08em' }}
                >
                  {q}
                </p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={520}>
            <p
              className="mt-12 text-[1.1rem] text-kin"
              style={{ fontFamily: 'var(--font-mincho)', letterSpacing: '0.14em' }}
            >
              答えはいらない。ただ問い続けること。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 何をする場所か */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              en="WHAT WE DO"
              title="哲学者の名前を、覚える塾ではありません。"
              lead="ここでするのは、問いを持つこと。自分の言葉で考えること。そして、自分とは違う考え方に触れることです。"
            />
            <Reveal variant="line" delay={200}>
              <p className="mt-7 text-[1.02rem] leading-[2.1]">
                進め方は問答形式です。講師が一方的に話すのではなく、
                「あなたはどう思いますか」と聞くところから始まります。
                答えが出ないまま終わる日もあります。それでいいと思っています。
              </p>
            </Reveal>
            <Reveal variant="line" delay={260}>
              <p className="mt-5 text-[1.02rem] leading-[2.1]">
                話すのが得意でない方は、聞いているだけでも構いません。
                途中に休憩と交流の時間もあります。
                月に一度、60分だけ、ふだん立ち止まらないことの前で立ち止まってみる。
                そういう時間です。
              </p>
            </Reveal>
          </div>
          <Reveal variant="clip" className="overflow-hidden rounded-[1.75rem]">
            <Photo
              photo={photos.onequestionScene}
              sizes="(min-width: 1024px) 460px, 92vw"
              quality={70}
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      {/* コース */}
      <Section>
        <SectionHeading
          en="COURSE"
          title="2つのコース"
          lead="各コースは1回完結です。どちらか一方だけのご参加もできます。"
        />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2">
          {courses.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i * 110}>
              <div className="h-full rounded-[1.5rem] border border-usu bg-white p-7 sm:p-8">
                <p className="flex items-baseline gap-3">
                  <span className="display text-[1.3rem] text-daidai">{c.no}</span>
                  <span className="display text-[1.22rem] text-midori-3">{c.name}</span>
                </p>
                <p className="mt-3 inline-block rounded-full bg-wakaba-2 px-3.5 py-1 text-[0.85rem] text-midori-3">
                  {c.minutes}
                </p>
                <p
                  className="mt-5 text-[1.05rem] leading-[1.85]"
                  style={{ fontFamily: 'var(--font-mincho)' }}
                >
                  {c.lead}
                </p>
                <p className="mt-3 text-[0.97rem] leading-[1.95] text-sumi-2">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-usu bg-usu sm:grid-cols-2 lg:grid-cols-3">
          {details.map((d, i) => (
            <Reveal as="div" key={d.t} delay={i * 70} className="bg-kinari px-6 py-7">
              <dt className="text-[0.85rem] text-midori-2">{d.t}</dt>
              <dd className="display mt-2 text-[1.05rem] leading-[1.7]">{d.d}</dd>
            </Reveal>
          ))}
        </dl>

      </Section>

      {/* 受講料 */}
      <Section tone="kinari-2" id="price">
        <SectionHeading
          en="PRICE"
          title="受講料"
          lead={`対象は${onequestionInfo.audience}、${onequestionInfo.capacity}です。1回ごとのお支払いなので、続けて通う約束はありません。`}
        />

        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-3xl border-2 border-daidai/40 bg-white p-6 sm:p-8">
            <div>
              <p className="eyebrow text-daidai">{onequestionCampaign.title}</p>
              <p className="display mt-3 text-[1.25rem] leading-[1.6] sm:text-[1.45rem]">
                {onequestionCampaign.text}
              </p>
              <p className="mt-2 text-[0.95rem] leading-[1.9] text-sumi-2">
                まずは一度、どんな時間か見にきてください。
              </p>
            </div>
            <p className="flex items-baseline gap-3">
              <span className="display text-[1.35rem] text-sumi-2 line-through">
                {yen(onequestionCampaign.wasYen)}
              </span>
              <span aria-hidden className="text-daidai">
                →
              </span>
              <span className="display text-[2.1rem] leading-none text-daidai">
                {yen(onequestionCampaign.yen)}
              </span>
            </p>
          </div>
        </Reveal>

        <PriceList className="mt-12" rows={onequestionFees} notes={onequestionNotes} />
      </Section>

      <Section tone="kinari-2" width="narrow">
        <SectionHeading en="FAQ" title="哲学塾わんくえのよくある質問" />
        <div className="mt-10">
          <Faq items={faq} />
        </div>
      </Section>

      <RelatedLinks
        links={[
          {
            href: '/onemore',
            label: '英語多読塾 わんもあ',
            text: '中学生・高校生対象。多読と音読で「読める」から「もっと読める」へ。',
          },
          {
            href: '/about',
            label: 'あかでみあについて',
            text: '4つの学びに共通していること。講師と教室のこと。',
          },
          {
            href: '/mahjong',
            label: '健康麻雀教室 あかでみあ',
            text: '栃木県真岡市の教室。飲まない・吸わない・賭けない健康麻雀。',
          },
        ]}
      />

      <CtaBand
        heading="月に一度、問いを囲む日曜日に。"
        lead="日程と受講料はお電話でご案内しています。初めての方も、聞いているだけの参加も歓迎です。"
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />
      {courses.map((c) => (
        <JsonLd
          key={c.name}
          data={courseJsonLd({
            name: `哲学塾わんくえ ${c.name}`,
            description: `栃木県真岡市の哲学塾わんくえ（寺﨑哲学塾）${c.name}。${c.lead}。${c.text}`,
            path: PATH,
            schedule: '月に1回・日曜日',
            sessionYen: 1000,
            audience: '社会人',
          })}
        />
      ))}
    </>
  );
}
