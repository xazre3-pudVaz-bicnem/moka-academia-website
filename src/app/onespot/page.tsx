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
import { ClockIcon, PeopleIcon, PhoneIcon, YenIcon } from '@/components/ui/icons';

import { photos } from '@/data/photos';
import { school } from '@/data/school';
import { onespotFee, yen } from '@/data/pricing';
import { faqItems } from '@/data/faq';
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';

const PATH = '/onespot';
const TITLE = '出張健康麻雀教室 わんすぽ One Spot｜真岡・栃木';
const DESCRIPTION =
  '出張健康麻雀教室わんすぽは、デイサービスセンターや老人ホームなどの施設へ講師がうかがい、健康麻雀のレクリエーションを行うサービスです。60分5,000円（税込）、最大12名まで。道具の準備・進行・片付けまでお任せいただけます。栃木県真岡市から。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    '出張健康麻雀',
    '健康麻雀 出張',
    '真岡 出張健康麻雀',
    '栃木 出張健康麻雀',
    '高齢者施設 麻雀',
    '介護施設 レクリエーション 麻雀',
    '地域交流 健康麻雀',
  ],
});

const crumbs = [HOME_CRUMB, { name: '出張健康麻雀 わんすぽ', href: PATH }];

const merits = [
  {
    title: '頭と指先を使う',
    text: '牌を触り、数え、相手の捨て牌を見て考える。記憶・判断・集中と、手先をあわせて使うレクリエーションです。',
  },
  {
    title: 'コミュニケーションの促進',
    text: '同じ卓を囲むと、自然と会話や笑顔が生まれます。利用者様同士の交流が深まります。',
  },
  {
    title: '初心者も安心',
    text: 'ルールがわからない方も教室長が丁寧にサポート。経験者だけでなく、どなたでも楽しめます。',
  },
  {
    title: '職員様の負担軽減',
    text: '麻雀の進行・指導はすべてこちらで行います。職員様は見守りのみで大丈夫です。',
  },
];

const flow = [
  { n: '1', t: 'お電話でご相談', d: `${school.tel} へご連絡ください。ご希望の日程、人数、場所をお聞かせください。` },
  { n: '2', t: '内容とお見積り', d: '時間や進め方を施設様のご希望に合わせて調整します。出張費は距離や時間に応じてお見積りします。' },
  { n: '3', t: '当日、うかがいます', d: '麻雀卓と牌はこちらで用意します。準備から進行、片付けまでお任せください。' },
  { n: '4', t: '60分のレクリエーション', d: 'ルール説明から始めて、実際に卓を囲みます。時間は60分を基本にご相談に応じます。' },
];

const suited = [
  '新しいレクリエーションを探している',
  '利用者様同士の交流を増やしたい',
  '頭や手先を使う活動を取り入れたい',
  '麻雀は好きだけど、職員が詳しくない',
];

export default function OnespotPage() {
  const faq = faqItems('onespot');

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="ONE SPOT｜出張健康麻雀教室 わんすぽ"
        title={
          <>
            楽しく、考えて、つながる
            <br />
            レクリエーション。
          </>
        }
        answer="出張健康麻雀教室わんすぽ（One Spot）は、デイサービスセンターや老人ホームなどの団体様へ教室長がうかがい、健康麻雀のレクリエーションを行うサービスです。道具の準備・進行・片付けまですべてこちらで行います。60分5,000円（税込）、最大12名様まで。"
        photo="onespotScene"
      >
        <a href={school.telLink} className="btn btn-daidai">
          <PhoneIcon className="h-5 w-5" />
          {school.tel}
        </a>
        <p className="mt-3 text-[0.9rem] text-sumi-2">受付時間 9:00〜17:00</p>
      </PageHero>

      {/* 概要3点 */}
      <Section tone="white" size="md">
        <ul className="grid gap-8 sm:grid-cols-3">
          {[
            { icon: <YenIcon className="h-6 w-6" />, t: '料金', d: `${yen(onespotFee.yen)}${onespotFee.unit}` },
            { icon: <PeopleIcon className="h-6 w-6" />, t: '定員', d: onespotFee.capacity },
            { icon: <ClockIcon className="h-6 w-6" />, t: '開催日', d: '水曜日・日曜日／60分が基本' },
          ].map((r, i) => (
            <Reveal as="li" key={r.t} delay={i * 90} className="text-center">
              <p className="flex justify-center text-midori-2">{r.icon}</p>
              <p className="mt-3 text-[0.85rem] text-midori-2">{r.t}</p>
              <p className="display mt-1.5 text-[1.28rem] text-midori-3">{r.d}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={280}>
          <p className="mx-auto mt-9 max-w-[36rem] rounded-2xl bg-yamabuki-2/50 px-6 py-4 text-center text-[0.95rem] leading-[1.9]">
            {onespotFee.travelNote}
          </p>
        </Reveal>
      </Section>

      {/* わんすぽとは */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              en="WHAT IS ONE SPOT"
              title="わんすぽとは。"
              lead="教室長が施設へうかがい、麻雀を通じて利用者様に楽しく充実した時間を提供します。道具の準備・進行・片付けまで、すべてお任せください。"
            />
            <Reveal variant="line" delay={200}>
              <p className="mt-7 text-[1.02rem] leading-[2.1]">
                麻雀は、頭と指先を使い、会話が生まれる遊びです。
                けれど「職員が詳しくない」「道具がない」という理由で、
                レクリエーションに取り入れられていない施設は少なくありません。
                わんすぽは、そこを引き受けるためのサービスです。
              </p>
            </Reveal>
            <Reveal variant="line" delay={260}>
              <p className="mt-5 text-[0.94rem] leading-[1.95] text-sumi-2">
                ※ 健康麻雀は趣味・レクリエーションとして楽しんでいただくものです。病気の予防や治療を目的とした活動ではありません。
              </p>
            </Reveal>
          </div>

          <ul className="grid grid-cols-3 gap-3 sm:gap-5">
            {(
              [
                { key: 'onespotTools', label: '道具はすべて\nこちらで用意' },
                { key: 'onespotSupport', label: '丁寧な説明と\nサポートで安心' },
                { key: 'onespotGroup', label: '最大12名まで\n（2卓まで対応）' },
              ] as const
            ).map((item, i) => (
              <Reveal as="li" key={item.key} delay={i * 110}>
                <div className="overflow-hidden rounded-full">
                  <Photo
                    photo={photos[item.key]}
                    sizes="(min-width: 1024px) 150px, 30vw"
                    className="aspect-square w-full object-cover"
                  />
                </div>
                <p className="mt-3 whitespace-pre-line text-center text-[0.86rem] leading-[1.7] text-sumi-2">
                  {item.label}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* 4つの良さ */}
      <Section tone="kinari-2">
        <SectionHeading en="MERIT" title="麻雀は、“考える”と“交流”のレクリエーション。" />
        <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
          {merits.map((m, i) => (
            <Reveal as="li" key={m.title} delay={i * 80}>
              <p className="display border-l-4 border-wakaba pl-3 text-[1.14rem] text-midori-3">
                {m.title}
              </p>
              <p className="mt-3 text-[0.97rem] leading-[1.95] text-sumi-2">{m.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 対象と流れ */}
      <Section tone="white">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading en="FOR" title="こんな施設様におすすめです" />
            <ul className="mt-8 space-y-3">
              {suited.map((s, i) => (
                <Reveal as="li" key={s} delay={i * 70} className="flex gap-3 text-[1rem] leading-[1.9]">
                  <span aria-hidden className="mt-[0.25em] text-daidai">
                    ✓
                  </span>
                  {s}
                </Reveal>
              ))}
            </ul>
            <Reveal delay={320}>
              <div className="mt-8 rounded-2xl border border-usu bg-kinari p-5 text-[0.94rem] leading-[1.9] text-sumi-2">
                <p className="display text-[1rem] text-midori-3">対象について</p>
                <p className="mt-2">
                  主にデイサービスセンター・老人ホームなどの団体様が対象です。
                  個人のお宅への出張は行っておりません。
                  対応できる地域は施設様の場所によって変わりますので、まずはお電話でご相談ください。
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <SectionHeading en="FLOW" title="開催までの流れ" />
            <ol className="mt-8 space-y-7">
              {flow.map((f, i) => (
                <Reveal as="li" key={f.n} delay={i * 80} className="flex gap-5">
                  <span className="display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-wakaba-2 text-[1.05rem] text-midori-3">
                    {f.n}
                  </span>
                  <span>
                    <span className="display block text-[1.08rem]">{f.t}</span>
                    <span className="mt-1.5 block text-[0.96rem] leading-[1.95] text-sumi-2">
                      {f.d}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* 教室長 */}
      <Section>
        <div className="grid items-center gap-10 sm:grid-cols-[auto_1fr] sm:gap-12">
          <Reveal variant="clip" className="mx-auto w-40 overflow-hidden rounded-3xl sm:w-52">
            <Photo photo={photos.teacherPortrait} sizes="208px" className="w-full object-cover" />
          </Reveal>
          <div>
            <p className="eyebrow text-daidai">TEACHER</p>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
              <span className="text-[0.9rem] text-midori-2">{school.name} 教室長</span>
              <span className="display text-[1.5rem] text-midori-3">{school.teacher.name}</span>
              <span className="text-[0.9rem] text-sumi-2">（{school.teacher.reading}）</span>
            </p>
            <p className="mt-4 text-[1rem] leading-[2]">{school.teacher.message}</p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.93rem] text-sumi-2">
              {school.teacher.facts.map((f) => (
                <li key={f} className="flex items-baseline gap-2">
                  <span aria-hidden className="text-midori-2">
                    ✿
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="kinari-2" width="narrow">
        <SectionHeading en="FAQ" title="出張健康麻雀のよくある質問" />
        <div className="mt-10">
          <Faq items={faq} />
        </div>
      </Section>

      <RelatedLinks
        links={[
          {
            href: '/mahjong',
            label: '健康麻雀教室 あかでみあ',
            text: '真岡市田町の教室。飲まない・吸わない・賭けない健康麻雀。',
          },
          {
            href: '/beginner',
            label: 'はじめての方へ',
            text: '牌を触ったことがない方へ。初日の流れと、よくある不安への答え。',
          },
          {
            href: '/contact',
            label: 'お問い合わせ',
            text: '出張のご相談は9:00〜17:00に承っています。',
          },
        ]}
      />

      <CtaBand
        heading="利用者様の笑顔と生きがいづくりを、お手伝いします。"
        lead="日程や人数が決まっていなくても構いません。まずはお電話でご相談ください。"
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />
      <JsonLd data={serviceJsonLd()} />
    </>
  );
}
