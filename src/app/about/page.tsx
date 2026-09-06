import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import Photo from '@/components/ui/Photo';
import CtaBand from '@/components/ui/CtaBand';
import RelatedLinks from '@/components/ui/RelatedLinks';
import SchoolInfoTable from '@/components/ui/SchoolInfoTable';
import JsonLd from '@/components/ui/JsonLd';
import { ArrowIcon } from '@/components/ui/icons';

import { photos } from '@/data/photos';
import { school } from '@/data/school';
import { services } from '@/data/services';
import { breadcrumbJsonLd, personJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';

const PATH = '/about';
const TITLE = 'ぽかぽかあかでみあについて｜真岡の学びの場';
const DESCRIPTION =
  '健康麻雀教室ぽかぽかあかでみあは、栃木県真岡市田町にある学びの場です。健康麻雀、出張健康麻雀わんすぽ、英語多読塾わんもあ、哲学塾わんくえ。4つの学びに共通する考え方と、代表・寺崎聖のこと、教室の基本情報をご紹介します。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ['真岡 習い事', '真岡 シニア 習い事', '真岡 子ども 習い事', '真岡 趣味'],
});

const crumbs = [HOME_CRUMB, { name: 'あかでみあについて', href: PATH }];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="ABOUT"
        title={
          <>
            真岡に、
            <br />
            世代をこえて学べる場所を。
          </>
        }
        answer="ぽかぽかあかでみあは、栃木県真岡市田町の「まちなか保健室 田町館」にある学びの場です。健康麻雀教室を軸に、出張健康麻雀わんすぽ、英語多読塾わんもあ、哲学塾わんくえを運営しています。小学生からシニアまで、いくつからでも新しいことを始められる場所を目指しています。"
        photo="poster"
      />

      {/* 考えていること */}
      <Section tone="white" width="narrow">
        <SectionHeading
          en="OUR IDEA"
          title="遊びの中に真理あり。"
          lead="ロゴの帯には、3つの言葉が入っています。「遊びの中に真理あり。」「好きこそものの上手なれ。」「憩いの空間で楽しく脳活」。"
        />
        <Reveal variant="line" delay={200}>
          <p className="mt-8 text-[1.05rem] leading-[2.15]">
            麻雀は遊びです。英語の本を読むのも、哲学の問いを考えるのも、
            突きつめれば「おもしろいからやっている」ことに変わりはありません。
            誰かに言われて始めることより、自分が「もう少しやってみたい」と思って続けることのほうが、
            ずっと遠くまで行けると思っています。
          </p>
        </Reveal>
        <Reveal variant="line" delay={260}>
          <p className="mt-5 text-[1.05rem] leading-[2.15]">
            だから、この場所には麻雀卓だけでなく、静かな自習席と、
            お茶を飲みながら話せる談話室があります。
            誰かが牌を並べている隣で、誰かが本を読んでいる。
            用事がなくても寄れる場所。それが、ぽかぽかあかでみあです。
          </p>
        </Reveal>
      </Section>

      {/* 4つの学び */}
      <Section>
        <SectionHeading
          en="FOUR LEARNINGS"
          title="4つの学び"
          lead="健康麻雀、出張健康麻雀、英語多読、哲学。それぞれ入り口は違いますが、どれも「知らなかったことが分かるようになる」という同じ楽しさでできています。"
        />
        <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-usu bg-usu sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal as="li" key={s.key} delay={i * 80} className="bg-kinari">
              <Link href={s.href} className="group flex h-full flex-col p-7 transition-colors hover:bg-white sm:p-8">
                <p className="eyebrow text-daidai">{s.en}</p>
                <h3 className="display mt-3 flex items-center gap-2 text-[1.2rem] text-midori-3">
                  {s.name}
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </h3>
                <p className="mt-1.5 text-[0.9rem] text-sumi-2">{s.motto}</p>
                <p className="mt-4 text-[0.96rem] leading-[1.95] text-sumi-2">{s.answer}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 代表 */}
      <Section tone="kinari-2">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-16">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <Reveal variant="clip" className="overflow-hidden rounded-[1.5rem]">
              <Photo
                photo={photos.teacherTrophy}
                sizes="(min-width: 1024px) 280px, 45vw"
                className="w-full object-cover"
              />
            </Reveal>
            <Reveal variant="clip" delay={110} className="overflow-hidden rounded-[1.5rem]">
              <Photo
                photo={photos.teacherPortrait}
                sizes="(min-width: 1024px) 280px, 45vw"
                className="w-full object-cover"
              />
            </Reveal>
          </div>

          <div>
            <SectionHeading
              en="TEACHER"
              title={
                <>
                  代表・教室長
                  <br />
                  {school.teacher.name}（{school.teacher.reading}）
                </>
              }
            />
            <Reveal variant="line" delay={200}>
              <p className="mt-7 text-[1.02rem] leading-[2.1]">
                コロナ禍に麻雀の沼にはまり、麻雀歴は5年。
                いまはプロ試験の受験を予定しています。
                自分が独学でつまずいたところを覚えているからこそ、
                初めての方がどこで止まるかが分かる。
                そう思って、入門テキストと牌効率のテキストを自分で作りました。
              </p>
            </Reveal>
            <Reveal delay={260}>
              <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-sumi-2">
                {school.teacher.facts.map((f) => (
                  <li key={f} className="flex items-baseline gap-2">
                    <span aria-hidden className="text-midori-2">
                      ✿
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={310}>
              <blockquote className="mt-7 border-l-4 border-yamabuki bg-white px-6 py-5 text-[1.02rem] leading-[2]">
                {school.teacher.message}
              </blockquote>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-8 flex items-center gap-5 rounded-2xl border border-usu bg-white p-5">
                <div className="w-28 shrink-0 overflow-hidden rounded-xl sm:w-36">
                  <Photo photo={photos.originalTexts} sizes="144px" className="w-full object-contain" />
                </div>
                <p className="text-[0.94rem] leading-[1.9] text-sumi-2">
                  「はじめての麻雀 入門テキスト」と「基本の牌効率」。
                  牌の持ち方から戦術まで、ステップを追って学べます。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 場所 */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              en="THE PLACE"
              title="まちなか保健室 田町館という場所。"
              lead="教室があるのは、栃木県真岡市田町の「まちなか保健室 田町館」です。まちの中にある、人が集まるための建物です。"
            />
            <Reveal variant="line" delay={200}>
              <p className="mt-7 text-[1.02rem] leading-[2.1]">
                {school.closedNote}
                教室が休みの日に、施設へ出張してうかがう。
                建物の中と外の両方で、健康麻雀を届けたいと思っています。
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-7">
                <Link href="/access" className="arrow-link text-midori-3">
                  アクセス・教室のご案内
                  <ArrowIcon className="h-5 w-5" />
                </Link>
              </p>
            </Reveal>
          </div>

          <div>
            <h3 className="eyebrow text-midori-2">教室の基本情報</h3>
            <SchoolInfoTable className="mt-6" />
          </div>
        </div>
      </Section>

      <RelatedLinks
        links={[
          {
            href: '/mahjong',
            label: '健康麻雀教室 あかでみあ',
            text: '飲まない・吸わない・賭けない健康麻雀。料金と3つのスペース。',
          },
          { href: '/price', label: '料金一覧', text: '4つの学びの料金を、まとめてご覧いただけます。' },
          { href: '/blog', label: 'ブログ', text: '健康麻雀のこと、真岡のこと、英語や哲学のこと。' },
        ]}
      />

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={personJsonLd()} />
    </>
  );
}
