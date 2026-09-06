import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Faq from '@/components/ui/Faq';
import Reveal from '@/components/ui/Reveal';
import RelatedLinks from '@/components/ui/RelatedLinks';
import JsonLd from '@/components/ui/JsonLd';
import { InstagramIcon, PhoneIcon } from '@/components/ui/icons';
import ContactForm from './ContactForm';

import { school } from '@/data/school';
import { faqItems } from '@/data/faq';
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';

const PATH = '/contact';
const TITLE = 'お問い合わせ｜真岡の健康麻雀教室ぽかぽかあかでみあ';
const DESCRIPTION =
  '健康麻雀教室ぽかぽかあかでみあへのお問い合わせは、お電話 090-1463-0709 が確実です。受付時間は教室のお問い合わせが13:00〜17:00、出張健康麻雀のご相談が9:00〜17:00。Instagramのダイレクトメッセージ、お問い合わせフォームからもご連絡いただけます。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  keywords: ['真岡 健康麻雀 問い合わせ', '真岡 麻雀教室 予約', '出張健康麻雀 依頼'],
});

const crumbs = [HOME_CRUMB, { name: 'お問い合わせ', href: PATH }];

export default function ContactPage() {
  const faq = faqItems('contact');

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="CONTACT"
        title="お問い合わせ"
        answer={`健康麻雀教室ぽかぽかあかでみあへのご連絡は、お電話（${school.tel}）がいちばん確実です。見学だけ、質問だけでも構いません。Instagramのダイレクトメッセージ、下のお問い合わせフォームからもご連絡いただけます。`}
      />

      {/* 電話 */}
      <Section tone="white" size="md">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal className="min-w-0">
            <div className="flex h-full min-w-0 flex-col justify-between rounded-3xl border-2 border-midori bg-kinari p-7 sm:p-9">
              <div>
                <p className="eyebrow text-midori-2">おすすめ</p>
                <h2 className="display mt-4 text-[1.3rem] text-midori-3">お電話</h2>
                <p className="mt-3 text-[0.97rem] leading-[1.95] text-sumi-2">
                  いちばん早くつながります。「麻雀は全然知りません」から言っていただいて大丈夫です。
                </p>
              </div>
              <div className="mt-7">
                <a
                  href={school.telLink}
                  className="display flex flex-wrap items-center gap-x-3 gap-y-1 py-1.5 text-[1.65rem] leading-tight text-midori-3 underline-offset-8 hover:underline sm:text-[2.4rem]"
                >
                  <PhoneIcon className="h-7 w-7" />
                  {school.tel}
                </a>
                <ul className="mt-4 space-y-1 text-[0.93rem] text-sumi-2">
                  {school.telHours.map((h) => (
                    <li key={h.label}>
                      {h.label}　{h.value}
                    </li>
                  ))}
                  <li>定休日　{school.closedDays}</li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={110} className="min-w-0">
            <div className="flex h-full min-w-0 flex-col justify-between rounded-3xl border border-usu bg-kinari p-7 sm:p-9">
              <div>
                <p className="eyebrow text-daidai">SNS</p>
                <h2 className="display mt-4 text-[1.3rem] text-midori-3">Instagram</h2>
                <p className="mt-3 text-[0.97rem] leading-[1.95] text-sumi-2">
                  日々の活動の様子を発信しています。ダイレクトメッセージからのお問い合わせも承っています。
                </p>
              </div>
              <div className="mt-7">
                <a
                  href={school.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-daidai w-full"
                >
                  <InstagramIcon className="h-5 w-5" />@{school.instagram.handle}
                </a>
                <p className="mt-4 text-[0.93rem] leading-[1.9] text-sumi-2">
                  {school.lineOpenChat.note}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* フォーム */}
      <Section width="narrow">
        <SectionHeading
          en="FORM"
          title="お問い合わせフォーム"
          lead="お電話が難しい方はこちらから。お返事にお時間をいただくことがありますので、お急ぎの場合はお電話でご連絡ください。"
        />
        <div className="mt-10">
          <ContactForm />
        </div>
      </Section>

      <Section tone="kinari-2" width="narrow" size="md">
        <SectionHeading en="FAQ" title="お問い合わせについて" />
        <div className="mt-8">
          <Faq items={faq} />
        </div>
      </Section>

      <RelatedLinks
        links={[
          { href: '/beginner', label: 'はじめての方へ', text: '来る前に知っておきたいことをまとめています。' },
          { href: '/access', label: 'アクセス・教室案内', text: 'まちなか保健室 田町館の場所と、教室の設備。' },
          { href: '/faq', label: 'よくある質問', text: '4つの学びすべてについて、質問と答えをまとめています。' },
        ]}
      />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={faqJsonLd(faq)} />
    </>
  );
}
