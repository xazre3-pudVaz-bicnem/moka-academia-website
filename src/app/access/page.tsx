import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import GoogleMap from '@/components/ui/GoogleMap';
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
const TITLE = 'アクセス・教室のご案内｜真岡市田町 まちなか保健室 田町館';
const DESCRIPTION =
  '健康麻雀教室ぽかぽかあかでみあは、栃木県真岡市田町の「まちなか保健室 田町館」にあります（〒321-4325）。全自動麻雀卓2台の麻雀スペース、最大16席の自習スペース、談話室・休憩スペースの3つの部屋があります。お問い合わせは090-1463-0709。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ['真岡市 田町 教室', 'まちなか保健室 田町館', '真岡 麻雀教室 場所'],
});

const crumbs = [HOME_CRUMB, { name: 'アクセス・教室案内', href: PATH }];

const spaces = [
  {
    photo: 'spaceMahjong',
    title: '麻雀スペース（健康麻雀教室）',
    text: '全自動麻雀卓を2台完備しています。初心者向けのルール説明と、やさしい指導で安心して学べます。',
  },
  {
    photo: 'spaceStudy',
    title: '自習スペース',
    text: '最大16席の静かな空間です。勉強や読書、資格の学習などに自由にご利用いただけます。',
  },
  {
    photo: 'spaceLounge',
    title: '談話室・休憩スペース',
    text: 'お茶やお菓子を囲んで、ほっと一息。会話や交流を楽しめるスペースです。ドリンクもご用意しています。',
  },
] as const;

export default function AccessPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="ACCESS"
        title={
          <>
            真岡市田町、
            <br />
            まちなか保健室 田町館。
          </>
        }
        answer={`健康麻雀教室ぽかぽかあかでみあは、${school.address.full}にあります。お問い合わせはお電話（${school.tel}）へどうぞ。番地の詳細と駐車場については確認中です。`}
        photo="roomWide"
      />

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <SectionHeading en="INFORMATION" title="教室の基本情報" />
            <SchoolInfoTable className="mt-8" />
          </div>
          <div>
            <h2 className="eyebrow text-midori-2">地図</h2>
            <Reveal variant="clip" className="mt-6">
              <GoogleMap />
            </Reveal>
            <p className="mt-4 text-[0.92rem] leading-[1.9] text-sumi-2">
              地図は「まちなか保健室田町館」を検索して表示しています。
              地図の上では、真岡市役所のすぐ近くに出てきます。
              番地の詳細と駐車場については確認中ですので、お越しになる前にお電話でお尋ねください。
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          en="THREE SPACES"
          title="3つのスペース"
          lead="麻雀をする部屋、静かに勉強する部屋、お茶を飲んで話す部屋。性格の違う3つの空間があります。"
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

      {/* 場所についての補足 */}
      <Section tone="kinari-2" width="narrow">
        <SectionHeading en="NOTES" title="お越しになる前に" />
        <ul className="mt-9 space-y-6">
          {[
            {
              t: 'オープンの時期',
              d: `${school.openingLabel}。オープン前も、まちなか保健室 田町館でボランティア開催を行っています。日程はお電話またはInstagramでお知らせしています。`,
            },
            {
              t: '定休日',
              d: `${school.closedDays}です。${school.closedNote}`,
            },
            {
              t: '営業時間',
              d: `確認中です。施設利用のフリータイムは${school.freeTimeHours}の時間帯です。詳しい営業時間はお電話でお尋ねください。`,
            },
            {
              t: '駐車場',
              d: '確認中です。お越しになる前にお電話でお尋ねください。',
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
          { href: '/price', label: '料金一覧', text: '月謝と施設利用料。4つの学びの料金をまとめています。' },
          { href: '/contact', label: 'お問い合わせ', text: 'お電話・Instagram・フォームからご連絡いただけます。' },
        ]}
      />

      <CtaBand
        heading="場所が分かりにくいときは、お電話ください。"
        lead="まちなか保健室 田町館までの行き方も、お電話でご案内します。"
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
