import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import SchoolInfoTable from '@/components/ui/SchoolInfoTable';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/ui/CtaBand';
import RelatedLinks from '@/components/ui/RelatedLinks';
import JsonLd from '@/components/ui/JsonLd';

import { photos } from '@/data/photos';
import { school } from '@/data/school';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';

const PATH = '/access';
const TITLE = '教室のご案内・開校のお知らせ｜2027年1月末オープン予定';
const DESCRIPTION =
  '健康麻雀教室ぽかぽかあかでみあは、栃木県真岡市で2027年1月末のオープンを予定しています。現在まだ店舗はなく、健康麻雀教室のみ真岡市のレンタルスペース「コレカラ」で開催しています。3つのスペースとお問い合わせ先をご案内します。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ['真岡 麻雀教室 オープン', '真岡 健康麻雀 場所', '真岡市 麻雀教室'],
});

const crumbs = [HOME_CRUMB, { name: '教室のご案内', href: PATH }];

const spaces = [
  {
    photo: 'spaceMahjong',
    title: '麻雀スペース（健康麻雀教室）',
    text: '全自動麻雀卓を2台完備する予定です。初心者向けのルール説明と、やさしい指導で安心して学べます。',
  },
  {
    photo: 'spaceStudy',
    title: '自習スペース',
    text: '最大16席の静かな空間です。勉強や読書、資格の学習などに自由にご利用いただけます。',
  },
  {
    photo: 'spaceLounge',
    title: '談話室・休憩スペース',
    text: 'お茶やお菓子を囲んで、ほっと一息。会話や交流を楽しめるスペースです。ドリンクもご用意します。',
  },
] as const;

export default function AccessPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="OPENING"
        title={
          <>
            2027年1月末、
            <br />
            真岡でオープンします。
          </>
        }
        answer={`健康麻雀教室ぽかぽかあかでみあは、栃木県真岡市で${school.openingLabel}です。${school.address.note}${school.venue.text}お問い合わせはお電話（${school.tel}）へどうぞ。`}
        photo="poster"
      />

      {/* 場所について */}
      <Section tone="white" width="narrow">
        <Reveal>
          <div className="rounded-3xl border-2 border-daidai/35 bg-kinari p-7 sm:p-9">
            <p className="eyebrow text-daidai">お知らせ</p>
            <h2 className="display mt-4 text-[1.3rem] leading-[1.6] sm:text-[1.5rem]">
              現在、店舗はまだ持っておりません。
            </h2>
            <p className="mt-4 text-[1.02rem] leading-[2.05]">
              場所が決まりましたら、オープンの際に改めてこのページでお知らせします。
              住所・アクセス・駐車場についても、そのときにご案内します。
            </p>
            <div className="mt-6 border-t border-daidai/30 pt-6">
              <p className="text-[1.02rem] leading-[2.05]">{school.venue.text}</p>
              <dl className="mt-3 grid gap-1 sm:grid-cols-[4rem_1fr] sm:gap-4">
                <dt className="display text-[0.95rem] text-midori-3">住所</dt>
                <dd className="text-[1.02rem] leading-[1.9]">{school.venue.addressLine}</dd>
              </dl>
            </div>
            <p className="mt-4 text-[0.97rem] leading-[1.95] text-sumi-2">
              オープンまでのあいだも、施設へうかがう出張健康麻雀教室わんすぽと、
              まちの中での健康麻雀ボランティアは行っています。
              日程はお電話またはInstagramでお知らせしています。
            </p>
          </div>
        </Reveal>
      </Section>

      {/* 3つのスペース */}
      <Section>
        <SectionHeading
          en="THREE SPACES"
          title="教室にご用意する、3つのスペース"
          lead="麻雀をする部屋、静かに勉強する部屋、お茶を飲んで話す部屋。性格の違う3つの空間をつくります。写真は、チラシでご案内しているイメージです。"
        />
        <ul className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-7">
          {spaces.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 100}>
              <div className="overflow-hidden rounded-[1.5rem]">
                <Photo
                  photo={photos[s.photo]}
                  sizes="(min-width: 640px) 340px, 92vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <h3 className="display mt-5 text-[1.12rem] text-midori-3">{s.title}</h3>
              <p className="mt-2.5 text-[0.96rem] leading-[1.95] text-sumi-2">{s.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 基本情報 */}
      <Section tone="white">
        <SectionHeading en="INFORMATION" title="教室の基本情報" />
        <SchoolInfoTable className="mt-10" />
      </Section>

      {/* 補足 */}
      <Section tone="kinari-2" width="narrow">
        <SectionHeading en="NOTES" title="いまお答えできること・できないこと" />
        <ul className="mt-9 space-y-6">
          {[
            {
              t: 'オープンの時期',
              d: `${school.openingLabel}です。日程が近づきましたら、お電話・Instagram・このページでお知らせします。`,
            },
            {
              t: '場所・住所・駐車場',
              d: `店舗がまだ決まっていないため、お答えできません。決まり次第このページに載せます。${school.venue.text}住所は${school.venue.addressLine}です。`,
            },
            {
              t: '営業時間・定休日',
              d: 'オープンにあわせて決まります。決まりましたら、お電話・Instagram・このページでお知らせします。',
            },
            {
              t: '出張健康麻雀',
              d: `水曜日・日曜日にうかがっています。デイサービスセンターや老人ホームなどの団体様が対象です。`,
            },
            {
              t: 'お子さまのご利用',
              d: '小学生以上が対象です。未就学のお子さまのご利用はお断りしています。小学生が夜のあいだにご利用になる場合は、保護者の方の送迎をお願いしています。',
            },
            {
              t: '最新情報',
              d: school.lineOpenChat.note,
            },
          ].map((n, i) => (
            <Reveal as="li" key={n.t} delay={Math.min(i, 5) * 60}>
              <p className="display border-l-4 border-wakaba pl-3 text-[1.08rem] text-midori-3">
                {n.t}
              </p>
              <p className="mt-2.5 pl-4 text-[0.98rem] leading-[2] text-sumi-2">{n.d}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <RelatedLinks
        links={[
          { href: '/beginner', label: 'はじめての方へ', text: '初日の流れと、来る前に知っておきたいこと。' },
          { href: '/price', label: '料金一覧', text: '入会金・月謝・施設利用料。4つの学びの料金をまとめています。' },
          { href: '/contact', label: 'お問い合わせ', text: 'お電話・Instagram・フォームからご連絡いただけます。' },
        ]}
      />

      <CtaBand
        heading="オープンのお知らせを、お待ちください。"
        lead="開講の予定や体験のご相談は、お電話でお受けしています。「開いたら行ってみたい」だけでも構いません。"
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
