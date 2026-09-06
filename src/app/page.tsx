import type { Metadata } from 'next';
import Link from 'next/link';

import Hero from '@/components/sections/home/Hero';
import Promises from '@/components/sections/home/Promises';
import About from '@/components/sections/home/About';
import FourLearnings from '@/components/sections/home/FourLearnings';
import Names from '@/components/sections/home/Names';
import Spaces from '@/components/sections/home/Spaces';
import Teacher from '@/components/sections/home/Teacher';
import PhilosophyTeaser from '@/components/sections/home/PhilosophyTeaser';
import Activity from '@/components/sections/home/Activity';
import InstagramBand from '@/components/sections/home/InstagramBand';
import LatestPosts from '@/components/sections/home/LatestPosts';
import AccessBrief from '@/components/sections/home/AccessBrief';

import CtaBand from '@/components/ui/CtaBand';
import Faq from '@/components/ui/Faq';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { ArrowIcon } from '@/components/ui/icons';

import { faqItems } from '@/data/faq';
import { faqJsonLd } from '@/lib/jsonld';
import { defaultDescription, homeTitle } from '@/lib/site';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: homeTitle,
  description: defaultDescription,
  ...(absoluteUrl('/') ? { alternates: { canonical: absoluteUrl('/')! } } : {}),
};

/** トップに出すのは、いちばん多く聞かれる6つだけ。残りは /faq へ */
const topFaq = faqItems('kenko-mahjong').slice(0, 3).concat(faqItems('hajimete').slice(0, 3));

export default function HomePage() {
  return (
    <>
      <Hero />
      <Promises />
      <About />
      <FourLearnings />
      <Names />
      <Spaces />
      <Teacher />
      <PhilosophyTeaser />
      <Activity />
      <InstagramBand />
      <LatestPosts />

      <section className="mx-auto max-w-4xl px-5 py-18 sm:px-8 sm:py-24">
        <SectionHeading
          en="FAQ"
          title="よくある質問"
          lead="はじめての方からよくいただく質問です。ここに無いことは、お電話でお気軽にお尋ねください。"
        />
        <div className="mt-10">
          <Faq items={topFaq} />
        </div>
        <Reveal delay={160}>
          <p className="mt-8">
            <Link href="/faq" className="arrow-link text-midori-3">
              よくある質問をすべて見る
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        </Reveal>
      </section>

      <AccessBrief />
      <CtaBand />

      <JsonLd data={faqJsonLd(topFaq)} />
    </>
  );
}
