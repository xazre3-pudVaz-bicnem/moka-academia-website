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
import { PhoneIcon } from '@/components/ui/icons';

import { photos } from '@/data/photos';
import { school } from '@/data/school';
import { onemoreBundles, onemoreCourses, onemoreNotes, yen } from '@/data/pricing';
import { onemoreLessonFlow, onemorePhilosophy } from '@/data/services';
import { faqItems } from '@/data/faq';
import { breadcrumbJsonLd, courseJsonLd, faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';

const PATH = '/onemore';
const TITLE = '英語多読塾 わんもあ One More｜真岡市の英語塾';
const DESCRIPTION =
  '英語多読塾わんもあは、栃木県真岡市で中学生・高校生を対象に、多読と音読で英語を学ぶ塾です。毎週金曜日、90分授業、各コース定員8名。中学生9,800円／高校生11,800円／試験対策17,800円（月謝・税込）。無料体験授業を受け付けています。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    '真岡 英語塾',
    '真岡 英語教室',
    '真岡 英語 多読',
    '栃木 英語多読',
    '真岡 中学生 英語',
    '真岡 高校生 英語',
  ],
});

const crumbs = [HOME_CRUMB, { name: '英語多読塾 わんもあ', href: PATH }];

const strengths = [
  { t: '多読×音読で読解力UP', d: '大量に読む・繰り返し読むことで、英語を英語のまま理解できるようにしていきます。' },
  { t: '圧倒的な単語力を育てる', d: 'セットで学習し、読解を「楽しい」にする独自設計です。' },
  { t: '音読で英語の土台を強化', d: '発音・スピード・リズムを意識。英語を英語のまま理解する力を養います。' },
  { t: '一人ひとりに合わせた指導', d: '目標に応じた学習を提案。受験・英検などの対策も行います。' },
  { t: '試験対策も万全', d: '定期テスト・大学受験の英語に特化。英検は級ごと・目標まで対応します。' },
];

const cycle = ['自分で読む', '分からない所を見つける', '講師に教わる', '声に出して読む', 'もう一度読む'];

export default function OnemorePage() {
  const faq = faqItems('onemore');

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="ONE MORE｜英語多読塾 わんもあ"
        title={
          <>
            「読める」から
            <br />
            <span className="handline-midori handline">「もっと読める」</span>へ。
          </>
        }
        answer="英語多読塾わんもあ（One More）は、栃木県真岡市で中学生・高校生を対象に、多読と音読で英語を学ぶ塾です。毎週金曜日、90分授業、各コース定員8名。英語を日本語に訳してから理解するのではなく、英語のまま読める状態を目指します。"
        photo="onemoreReading"
      >
        <a href={school.telLink} className="btn btn-daidai">
          <PhoneIcon className="h-5 w-5" />
          無料体験のお申し込み
        </a>
      </PageHero>

      {/* 教室理念（ご本人の言葉。言い回しを変えないこと） */}
      <Section tone="kinari-2" width="narrow" size="md">
        <Reveal variant="line">
          <p className="eyebrow text-center text-daidai">OUR PHILOSOPHY</p>
        </Reveal>
        <Reveal variant="line" delay={90}>
          <h2 className="display mt-5 text-center text-[1.5rem] leading-[1.6] sm:text-[2rem]">
            <span className="handline-midori handline">{onemorePhilosophy.title}</span>
          </h2>
        </Reveal>
        <ul className="mt-10 space-y-5">
          {onemorePhilosophy.lines.map((line, i) => (
            <Reveal as="li" key={line} delay={160 + i * 90}>
              <p className="text-center text-[1.05rem] leading-[2.05] sm:text-[1.15rem]">{line}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 多読とは */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              en="TADOKU"
              title="訳さずに、読む。"
              lead="多読とは、英語をたくさん読むことで、英語を英語のまま受け取れるようにしていく学び方です。単語を1つずつ日本語に置き換える読み方から、少しずつ離れていきます。"
            />
            <Reveal variant="line" delay={200}>
              <p className="mt-7 text-[1.02rem] leading-[2.1]">
                読めた量が増えると、次の1冊に手が伸びます。
                わんもあという名前は、その「もう1冊」から来ています。
                英語を勉強するというより、英語の本を読むことを楽しむ。
                その先に、テストの点も受験もついてきます。
              </p>
            </Reveal>
            <Reveal delay={260}>
              <ol className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.92rem]">
                {cycle.map((c, i) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="rounded-full bg-wakaba-2 px-3.5 py-1.5 text-midori-3">{c}</span>
                    {i < cycle.length - 1 && (
                      <span aria-hidden className="text-midori-2">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal variant="clip" className="overflow-hidden rounded-[1.75rem]">
            <Photo
              photo={photos.onemoreStudent}
              sizes="(min-width: 1024px) 460px, 92vw"
              className="w-full object-cover"
            />
          </Reveal>
        </div>
      </Section>

      {/* 特長 */}
      <Section>
        <SectionHeading en="STRENGTHS" title="わんもあの特長" />
        <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, i) => (
            <Reveal as="li" key={s.t} delay={Math.min(i, 5) * 70}>
              <p className="display border-l-4 border-wakaba pl-3 text-[1.12rem] text-midori-3">
                {s.t}
              </p>
              <p className="mt-3 text-[0.96rem] leading-[1.95] text-sumi-2">{s.d}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* コース */}
      <Section tone="kinari-2" id="course">
        <SectionHeading
          en="COURSE"
          title="コースと料金"
          lead="すべて毎週金曜日、90分授業、月謝制、各コース定員8名です。金額は税込です。"
        />

        <ul className="mt-12 grid gap-8 lg:grid-cols-3">
          {onemoreCourses.map((c, i) => (
            <Reveal as="li" key={c.name} delay={i * 90} className="overflow-hidden rounded-[1.5rem] bg-white">
              <Photo
                photo={photos[c.photo]}
                sizes="(min-width: 1024px) 340px, 92vw"
                className="aspect-[16/7] w-full object-cover"
              />
              <div className="p-6">
                <h3 className="display text-[1.2rem] text-midori-3">{c.name}</h3>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-3 text-[0.95rem] text-sumi-2">
                  <span className="rounded-full bg-wakaba-2 px-3 py-1 text-[0.85rem] text-midori-3">
                    {c.day}
                  </span>
                  <span>
                    {c.time}（{c.minutes}分授業）
                  </span>
                </p>
                <p className="mt-5 flex items-baseline gap-2">
                  <span className="text-[0.85rem] text-sumi-2">月謝</span>
                  <span className="display text-[1.9rem] leading-none text-daidai">{yen(c.yen)}</span>
                </p>
                <p className="mt-4 border-t border-usu pt-4 text-[0.94rem] leading-[1.9] text-sumi-2">
                  {c.material}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* まとめ割 */}
        <Reveal delay={280}>
          <div className="mt-10 rounded-3xl border-2 border-momo/30 bg-white p-6 sm:p-8">
            <p className="display text-[1.12rem] text-momo">まとめ割で断然お得！</p>
            <p className="mt-2 text-[0.96rem] leading-[1.9] text-sumi-2">
              試験対策特化コースと通常コースを受講される方は、まとめ割の価格になります。
            </p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {onemoreBundles.map((b) => (
                <li key={b.label} className="rounded-2xl bg-kinari p-5">
                  <p className="display text-[1.05rem]">{b.label}</p>
                  <p className="mt-2 text-[0.92rem] text-sumi-2">
                    通常 {yen(b.normal)}／月 のところ
                  </p>
                  <p className="mt-2 flex items-baseline gap-2">
                    <span className="display text-[1.85rem] leading-none text-momo">
                      {yen(b.price)}
                    </span>
                    <span className="text-[0.88rem] text-sumi-2">／月</span>
                    <span className="rounded-full bg-momo px-3 py-1 text-[0.78rem] text-white">
                      {yen(b.save)}お得
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <ul className="mt-6 space-y-1.5 text-[0.92rem] leading-[1.85] text-sumi-2">
          {onemoreNotes.map((n) => (
            <li key={n} className="pl-[1.2em] -indent-[1.2em]">
              ※ {n}
            </li>
          ))}
        </ul>
      </Section>

      {/* 90分の流れ */}
      <Section tone="white">
        <SectionHeading
          en="90 MINUTES"
          title="90分授業の、流れ。"
          lead="自分の力で読む → 分からないところを見つける → 教わる → 声に出す → もう一度読む。この往復を、90分の中で1周します。"
        />

        <ol className="mt-12 divide-y divide-usu border-y border-usu">
          {onemoreLessonFlow.map((step, i) => (
            <Reveal as="li" key={step.time} delay={Math.min(i, 8) * 45}>
              <div className="grid gap-1 py-5 sm:grid-cols-[6.5rem_9rem_1fr] sm:items-baseline sm:gap-6">
                <span className="display text-[0.95rem] text-daidai">{step.time}</span>
                <span className="display text-[1.05rem]">{step.title}</span>
                <span className="text-[0.95rem] leading-[1.9] text-sumi-2">{step.text}</span>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={200}>
          <p className="mt-8 rounded-2xl bg-wakaba-2/60 px-6 py-5 text-[0.97rem] leading-[1.95]">
            <span className="display text-midori-3">同じ英文を、3回読みます。</span>
            <br />
            初見で読み、教わってから音読し、最後にもう一度読む。
            同じ文章が読めるようになっていく手ごたえが、次の1冊につながります。
          </p>
        </Reveal>
      </Section>

      {/* 自習室 */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
          <Reveal variant="clip" className="overflow-hidden rounded-[1.75rem]">
            <Photo
              photo={photos.spaceStudy}
              sizes="(min-width: 1024px) 440px, 92vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading
              en="STUDY ROOM"
              title="自習室と談話室も、使えます。"
              lead="授業の前後に、最大16席の静かな自習スペースと、お茶を飲める談話室をご利用いただけます。授業が終わってから、もう少し読んでいく生徒もいます。"
            />
          </div>
        </div>
      </Section>

      <Section tone="kinari-2" width="narrow">
        <SectionHeading en="FAQ" title="英語多読塾わんもあのよくある質問" />
        <div className="mt-10">
          <Faq items={faq} />
        </div>
      </Section>

      <RelatedLinks
        links={[
          {
            href: '/onequestion',
            label: '哲学塾 わんくえ',
            text: '月に一度の日曜日、ひとつの問いを囲んで語り合う時間。',
          },
          {
            href: '/about',
            label: 'あかでみあについて',
            text: '4つの学びに共通していること。講師と教室のこと。',
          },
          {
            href: '/access',
            label: '教室のご案内',
            text: 'オープンの予定と、教室でご用意する3つのスペース。',
          },
        ]}
      />

      <CtaBand
        heading="まずは、無料体験授業へ。"
        lead="教室の空気と、読む時間の長さを見てから決めていただけます。お気軽にお電話ください。"
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />
      {onemoreCourses.map((c) => (
        <JsonLd
          key={c.name}
          data={courseJsonLd({
            name: `英語多読塾わんもあ ${c.name}`,
            description: `栃木県真岡市の英語多読塾わんもあ ${c.name}。${c.day} ${c.time}、${c.minutes}分授業、定員8名。${c.material}。`,
            path: PATH,
            schedule: `${c.day} ${c.time}`,
            monthlyYen: c.yen,
            audience: c.name.startsWith('中学生') ? '中学生' : '高校生',
          })}
        />
      ))}
    </>
  );
}
