import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { photos } from '@/data/photos';
import { ArrowIcon } from '@/components/ui/icons';

const spaces = [
  {
    photo: 'spaceMahjong',
    title: '麻雀スペース',
    sub: '健康麻雀教室',
    text: '全自動麻雀卓を2台備える予定です。初心者向けのルール説明と、やさしい指導で安心して学べます。',
  },
  {
    photo: 'spaceStudy',
    title: '自習スペース',
    sub: '最大16席',
    text: '窓に向かって机が並ぶ静かな空間です。勉強や読書、資格の学習などに自由にご利用いただけます。',
  },
  {
    photo: 'spaceLounge',
    title: '談話室・休憩スペース',
    sub: 'お茶とお菓子',
    text: 'お茶やお菓子を囲んで、ほっと一息。会話や交流を楽しめるスペースです。',
  },
] as const;

/**
 * 3つのスペース。
 * 「麻雀だけの場所ではない」ことが、写真で分かるようにしています。
 */
export default function Spaces() {
  return (
    <section className="border-y border-usu bg-kinari-2">
      <div className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24">
        <SectionHeading
          en="THREE SPACES"
          title="3つのスペースで、学びも、くつろぎも。"
          lead="オープンする教室には、性格の違う3つの部屋をつくります。写真は、チラシでご案内しているイメージです。"
        />

        <ul className="mt-12 grid gap-8 sm:grid-cols-3 sm:gap-6">
          {spaces.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 100}>
              <div className="overflow-hidden rounded-[1.5rem]">
                <Photo
                  photo={photos[s.photo]}
                  sizes="(min-width: 640px) 320px, 92vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-3">
                <span className="display text-[1.2rem] text-midori-3">{s.title}</span>
                <span className="text-[0.85rem] text-daidai">{s.sub}</span>
              </p>
              <p className="mt-2.5 text-[0.96rem] leading-[1.95] text-sumi-2">{s.text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={340}>
          <p className="mt-10">
            <Link href="/access" className="arrow-link text-midori-3">
              教室のご案内・開校のお知らせ
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
