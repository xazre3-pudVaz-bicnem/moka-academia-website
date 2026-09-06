import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { photos } from '@/data/photos';
import { ArrowIcon } from '@/components/ui/icons';

/**
 * ここは何をする場所なのか。
 * 長い説明にせず、写真と短い文章の組み合わせで見せます。
 */
export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
        <div className="order-2 lg:order-1">
          <SectionHeading
            en="ABOUT"
            title={
              <>
                麻雀を教える場所であり、
                <br />
                人が集まる場所です。
              </>
            }
          />

          <Reveal variant="line" delay={220}>
            <p className="mt-7 text-[1.02rem] leading-[2.1]">
              ぽかぽかあかでみあには、麻雀卓のほかに、静かな自習スペースと、
              お茶を飲みながら話せる談話室があります。
              麻雀だけをしに来る場所にしたくなかったからです。
            </p>
          </Reveal>
          <Reveal variant="line" delay={280}>
            <p className="mt-5 text-[1.02rem] leading-[2.1]">
              牌を並べる人の隣で、誰かが英語の本を読んでいる。
              その向こうで、日曜日には「幸せってなんだろう」と話し込んでいる。
              年齢も目的もばらばらな人が、同じ屋根の下で、それぞれの学びをしている。
              そんな場所を、真岡につくります。
            </p>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-8">
              <Link href="/about" className="arrow-link text-midori-3">
                あかでみあについて
                <ArrowIcon className="h-5 w-5" />
              </Link>
            </p>
          </Reveal>
        </div>

        <div className="order-1 grid grid-cols-5 gap-3 sm:gap-4 lg:order-2">
          <Reveal variant="clip" className="col-span-3 overflow-hidden rounded-[1.5rem]">
            <Photo
              photo={photos.roomWide}
              sizes="(min-width: 1024px) 340px, 55vw"
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal variant="clip" delay={120} className="col-span-2 overflow-hidden rounded-[1.5rem]">
            <Photo
              photo={photos.spaceStudy}
              sizes="(min-width: 1024px) 230px, 38vw"
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal variant="clip" delay={180} className="col-span-2 overflow-hidden rounded-[1.5rem]">
            <Photo
              photo={photos.spaceLounge}
              sizes="(min-width: 1024px) 230px, 38vw"
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal variant="clip" delay={240} className="col-span-3 overflow-hidden rounded-[1.5rem]">
            <Photo
              photo={photos.onemoreReading}
              sizes="(min-width: 1024px) 340px, 55vw"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
