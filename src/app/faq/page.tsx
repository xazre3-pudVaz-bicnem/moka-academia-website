import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import Faq from '@/components/ui/Faq';
import CtaBand from '@/components/ui/CtaBand';
import RelatedLinks from '@/components/ui/RelatedLinks';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';

import { faqGroups } from '@/data/faq';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';

const PATH = '/faq';
const TITLE = 'よくある質問｜健康麻雀・出張健康麻雀・英語多読・哲学塾';
const DESCRIPTION =
  '健康麻雀とは何か、初心者でも参加できるか、料金はいくらか。ぽかぽかあかでみあによくいただく質問と答えをまとめました。健康麻雀教室、出張健康麻雀わんすぽ、英語多読塾わんもあ、哲学塾わんくえのそれぞれについてお答えしています。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ['健康麻雀とは', '健康麻雀 初心者', '真岡 麻雀教室 料金', '出張健康麻雀 とは'],
});

const crumbs = [HOME_CRUMB, { name: 'よくある質問', href: PATH }];

const allItems = faqGroups.flatMap((g) => g.items);

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="FAQ"
        title="よくある質問"
        answer="健康麻雀教室ぽかぽかあかでみあによくいただく質問と、その答えです。健康麻雀そのもののこと、はじめての方のこと、教室と料金のこと、出張健康麻雀・英語多読塾・哲学塾のことに分けています。ここに無いことは、お電話でお気軽にお尋ねください。"
      >
        <nav aria-label="質問のカテゴリ">
          <ul className="flex flex-wrap gap-2">
            {faqGroups.map((g) => (
              <li key={g.key}>
                <a
                  href={`#${g.key}`}
                  className="inline-block rounded-full border border-usu bg-white px-4 py-2.5 text-[0.92rem] text-sumi-2 transition-colors hover:border-midori hover:text-midori-3"
                >
                  {g.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {faqGroups.map((g, i) => (
        <Section key={g.key} id={g.key} tone={i % 2 === 0 ? 'kinari' : 'white'} width="narrow" size="md">
          <Reveal variant="line">
            <h2 className="display text-[1.4rem] text-midori-3 sm:text-[1.65rem]">{g.label}</h2>
          </Reveal>
          <Reveal variant="line" delay={80}>
            <p className="mt-3 text-[0.98rem] leading-[1.95] text-sumi-2">{g.lead}</p>
          </Reveal>
          <div className="mt-8">
            <Faq items={g.items} />
          </div>
        </Section>
      ))}

      <RelatedLinks
        links={[
          { href: '/beginner', label: 'はじめての方へ', text: '牌を触ったことがない方へ。初日の流れと不安への答え。' },
          { href: '/price', label: '料金一覧', text: '4つの学びの料金を、まとめてご覧いただけます。' },
          { href: '/contact', label: 'お問い合わせ', text: 'お電話・Instagram・フォームからご連絡いただけます。' },
        ]}
      />

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(allItems)} />
    </>
  );
}
