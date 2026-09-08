import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import PriceList from '@/components/ui/PriceList';
import Reveal from '@/components/ui/Reveal';
import CtaBand from '@/components/ui/CtaBand';
import RelatedLinks from '@/components/ui/RelatedLinks';
import JsonLd from '@/components/ui/JsonLd';
import { ArrowIcon } from '@/components/ui/icons';

import {
  facilityFeeNotes,
  facilityFees,
  initialFees,
  monthlyFeeNotes,
  monthlyFees,
  onemoreBundles,
  onemoreCourses,
  onemoreNotes,
  onequestionFee,
  onespotFee,
  onespotPlanNotes,
  onespotPlans,
  openingCampaign,
  yen,
} from '@/data/pricing';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';

const PATH = '/price';
const TITLE = '料金一覧｜健康麻雀・出張健康麻雀・英語多読・哲学塾';
const DESCRIPTION =
  'ぽかぽかあかでみあの料金です。健康麻雀教室は入会金5,500円、月謝9,000円／月から。オープンキャンペーンで定員8名様まで入会金無料。出張健康麻雀わんすぽは60分5,000円・真岡市内出張費一律1,000円。英語多読塾わんもあは月謝9,800円から。すべて税込。栃木県真岡市。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ['真岡 健康麻雀 料金', '健康麻雀 月謝', '出張健康麻雀 料金', '真岡 英語塾 月謝'],
});

const crumbs = [HOME_CRUMB, { name: '料金一覧', href: PATH }];

export default function PricePage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="PRICE"
        title="料金一覧"
        answer="ぽかぽかあかでみあの料金をまとめたページです。健康麻雀教室は入会金5,500円とオリジナルテキスト代2,000円、そのうえで月謝または1回ごとの施設利用料をお選びいただけます。出張健康麻雀わんすぽは60分5,000円、英語多読塾わんもあは月謝制です。金額はすべて税込です。"
      />

      {/* 健康麻雀 */}
      <Section tone="white" id="mahjong">
        <SectionHeading
          en="ACADEMIA"
          title="健康麻雀教室 ぽかぽかあかでみあ"
          lead="はじめに入会金5,500円とオリジナルテキスト代2,000円。そのうえで、毎週通う方は月謝、たまに来る方は施設利用料をお選びいただけます。"
        />
        {/* オープンキャンペーン */}
        <Reveal delay={80}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 rounded-3xl border-2 border-daidai/40 bg-kinari p-6 sm:p-8">
            <div>
              <p className="eyebrow text-daidai">{openingCampaign.title}</p>
              <p className="display mt-3 text-[1.25rem] leading-[1.6] sm:text-[1.45rem]">
                {openingCampaign.text}
              </p>
              <p className="mt-2 text-[0.95rem] leading-[1.9] text-sumi-2">
                {openingCampaign.detail}
              </p>
            </div>
            <p className="flex items-baseline gap-3">
              <span className="display text-[1.35rem] text-sumi-2 line-through">
                {yen(5500)}
              </span>
              <span aria-hidden className="text-daidai">
                →
              </span>
              <span className="display text-[2.1rem] leading-none text-daidai">0円</span>
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-12">
          <div>
            <h3 className="display text-[1.2rem] text-midori-3">入会のときにかかるもの</h3>
            <PriceList
              className="mt-5"
              rows={initialFees}
              notes={[
                'オープンキャンペーンとして、定員8名様まで入会金が無料になります。',
                'オリジナルテキストは「はじめての麻雀 入門テキスト」と「基本の牌効率」です。',
              ]}
            />
          </div>
          <div>
            <h3 className="display text-[1.2rem] text-midori-3">月謝</h3>
            <PriceList className="mt-5" rows={monthlyFees} notes={monthlyFeeNotes} />
          </div>
          <div>
            <h3 className="display text-[1.2rem] text-midori-3">施設利用料（1人）</h3>
            <PriceList className="mt-5" rows={facilityFees} notes={facilityFeeNotes} />
          </div>
        </div>
        <Reveal delay={140}>
          <p className="mt-9">
            <Link href="/mahjong" className="arrow-link text-midori-3">
              健康麻雀教室のことをくわしく見る
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* わんすぽ */}
      <Section id="onespot">
        <SectionHeading
          en="ONE SPOT"
          title="出張健康麻雀教室 わんすぽ"
          lead="デイサービスセンターや老人ホームなどの団体様へうかがいます。個人のお宅への出張は行っておりません。"
        />
        <div className="mt-11 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: '料金', d: `${yen(onespotFee.yen)}`, s: onespotFee.unit },
            { t: '定員', d: onespotFee.capacity, s: '' },
            {
              t: '出張費',
              d: yen(onespotFee.travelYen),
              s: `${onespotFee.travelLabel}（市外はお見積り）`,
            },
            { t: '開催日', d: '水曜日・日曜日', s: '60分が基本（相談可）' },
          ].map((r, i) => (
            <Reveal as="div" key={r.t} delay={i * 80} className="rounded-2xl border border-usu bg-white p-6">
              <p className="text-[0.85rem] text-midori-2">{r.t}</p>
              <p className="display mt-2 text-[1.45rem] leading-tight text-midori-3">{r.d}</p>
              {r.s && <p className="mt-1.5 text-[0.88rem] text-sumi-2">{r.s}</p>}
            </Reveal>
          ))}
        </div>
        <Reveal delay={260}>
          <p className="mt-7 rounded-2xl bg-yamabuki-2/50 px-6 py-4 text-[0.95rem] leading-[1.9]">
            {onespotFee.travelNote}
          </p>
        </Reveal>
        <div className="mt-12">
          <h3 className="display text-[1.2rem] text-midori-3">
            定額プラン（継続してご利用いただく法人様向け）
          </h3>
          <PriceList className="mt-5" rows={onespotPlans} notes={onespotPlanNotes} />
        </div>

        <Reveal delay={300}>
          <p className="mt-9">
            <Link href="/onespot" className="arrow-link text-midori-3">
              出張健康麻雀わんすぽを見る
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* わんもあ */}
      <Section tone="white" id="onemore">
        <SectionHeading
          en="ONE MORE"
          title="英語多読塾 わんもあ"
          lead="中学生・高校生対象。すべて毎週金曜日、90分授業、月謝制、各コース定員8名です。"
        />
        <div className="mt-11 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-usu">
                <th scope="col" className="display py-3 pr-4 text-[0.95rem] text-midori-3">
                  コース
                </th>
                <th scope="col" className="display py-3 pr-4 text-[0.95rem] text-midori-3">
                  曜日・時間
                </th>
                <th scope="col" className="display py-3 text-right text-[0.95rem] text-midori-3">
                  月謝
                </th>
              </tr>
            </thead>
            <tbody>
              {onemoreCourses.map((c) => (
                <tr key={c.name} className="border-b border-usu">
                  <th scope="row" className="py-4 pr-4 text-left font-normal">
                    <span className="display text-[1.02rem]">{c.name}</span>
                    <span className="mt-1 block text-[0.88rem] text-sumi-2">{c.material}</span>
                  </th>
                  <td className="py-4 pr-4 text-[0.95rem] text-sumi-2">
                    {c.day}
                    <span className="mt-0.5 block">
                      {c.time}（{c.minutes}分）
                    </span>
                  </td>
                  <td className="display py-4 text-right text-[1.3rem] text-daidai">{yen(c.yen)}</td>
                </tr>
              ))}
              {onemoreBundles.map((b) => (
                <tr key={b.label} className="border-b border-usu bg-kinari-2/60">
                  <th scope="row" className="py-4 pr-4 text-left font-normal">
                    <span className="display text-[1.02rem] text-momo">まとめ割・{b.label}</span>
                    <span className="mt-1 block text-[0.88rem] text-sumi-2">
                      試験対策特化コース＋通常コース
                    </span>
                  </th>
                  <td className="py-4 pr-4 text-[0.95rem] text-sumi-2">
                    通常 {yen(b.normal)}／月 のところ
                  </td>
                  <td className="py-4 text-right">
                    <span className="display text-[1.3rem] text-momo">{yen(b.price)}</span>
                    <span className="mt-1 block text-[0.82rem] text-sumi-2">
                      {yen(b.save)}お得
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-6 space-y-1.5 text-[0.92rem] leading-[1.85] text-sumi-2">
          {onemoreNotes.map((n) => (
            <li key={n} className="pl-[1.2em] -indent-[1.2em]">
              ※ {n}
            </li>
          ))}
        </ul>
        <Reveal delay={200}>
          <p className="mt-8">
            <Link href="/onemore" className="arrow-link text-midori-3">
              英語多読塾わんもあを見る
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        </Reveal>
      </Section>

      {/* わんくえ */}
      <Section id="onequestion">
        <SectionHeading
          en="ONE QUESTION"
          title="哲学塾 わんくえ"
          lead="月に1回・日曜日、各コース60分の1回完結です。"
        />
        <Reveal delay={140}>
          <p className="mt-8 rounded-2xl border border-usu bg-white px-6 py-6 text-[1rem] leading-[2]">
            {onequestionFee.note}
            <br />
            <span className="text-[0.94rem] text-sumi-2">
              受講料と対象年齢は確認中です。決まり次第このページに掲載します。
            </span>
          </p>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-7">
            <Link href="/onequestion" className="arrow-link text-midori-3">
              哲学塾わんくえを見る
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        </Reveal>
      </Section>

      <RelatedLinks
        links={[
          { href: '/beginner', label: 'はじめての方へ', text: '牌を触ったことがない方へ。初日の流れと不安への答え。' },
          { href: '/faq', label: 'よくある質問', text: '料金の細かいところも、ここで答えています。' },
          { href: '/contact', label: 'お問い合わせ', text: 'お電話・Instagram・フォームからご連絡いただけます。' },
        ]}
      />

      <CtaBand
        heading="料金でご不明な点は、お電話でどうぞ。"
        lead="どの料金になるか迷われたときは、お電話でお尋ねください。使い方に合わせてご案内します。"
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
