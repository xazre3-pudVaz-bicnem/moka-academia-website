import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { photos } from '@/data/photos';
import { ArrowIcon } from '@/components/ui/icons';

/**
 * 哲学塾わんくえ。
 *
 * この事業だけチラシの世界観が明確に違う（夜と金、明朝）ので、
 * サイトの中でも背景を切り替えて、そこだけ空気が変わるようにしています。
 * ページを色で分けるのではなく、ここで一度だけ暗くして印象を残す狙いです。
 */
export default function PhilosophyTeaser() {
  return (
    <section className="yoru-section relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-18 sm:px-8 sm:py-24 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <Reveal variant="line">
            <p className="eyebrow text-kin">ONE QUESTION</p>
          </Reveal>
          <Reveal variant="line" delay={90}>
            <h2
              className="mt-5 text-[1.7rem] leading-[1.65] text-kin-2 sm:text-[2.15rem]"
              style={{ fontFamily: 'var(--font-mincho)', letterSpacing: '0.06em' }}
            >
              ひとつの問いから、
              <br />
              世界は広がる。
            </h2>
          </Reveal>
          <Reveal variant="line" delay={160}>
            <p className="mt-7 max-w-[32rem] text-[1rem] leading-[2.05] text-kin-2/80">
              哲学塾わんくえ（寺﨑哲学塾）は、月に一度の日曜日に開かれる、
              問答形式・対話中心の講座です。
              哲学者の名前を覚えるのではなく、
              「幸せってなんだろう？」「正しさって誰が決めるの？」を、
              自分の言葉で考えてみる時間です。
            </p>
          </Reveal>
          <Reveal delay={230}>
            <p
              className="mt-8 text-[1.05rem] text-kin"
              style={{ fontFamily: 'var(--font-mincho)', letterSpacing: '0.12em' }}
            >
              答えはいらない。ただ問い続けること。
            </p>
          </Reveal>
          <Reveal delay={290}>
            <p className="mt-8">
              <Link href="/onequestion" className="arrow-link text-kin-2">
                哲学塾わんくえを見る
                <ArrowIcon className="h-5 w-5" />
              </Link>
            </p>
          </Reveal>
        </div>

        <Reveal variant="clip" className="overflow-hidden rounded-[1.75rem] ring-1 ring-kin/30">
          <Photo
            photo={photos.onequestionScene}
            sizes="(min-width: 1024px) 520px, 92vw"
            quality={70}
            className="aspect-[16/10] w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
