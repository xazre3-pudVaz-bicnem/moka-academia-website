import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { photos } from '@/data/photos';
import { services } from '@/data/services';
import { ArrowIcon } from '@/components/ui/icons';

/**
 * 4つの学び。
 *
 * 角丸カードを4枚並べるのではなく、写真と文章を左右に振った行で見せています。
 * 1つずつ順番に読ませたいのと、写真を大きく出したいからです。
 */
export default function FourLearnings() {
  return (
    <section id="learnings" className="border-y border-usu bg-white">
      <div className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24">
        <SectionHeading
          align="center"
          en="FOUR LEARNINGS"
          title={
            <>
              4つの学びが、
              <br className="sm:hidden" />
              ひとつの場所にあります。
            </>
          }
          lead="健康麻雀、出張健康麻雀、英語多読、哲学。ばらばらに見えて、どれも「知らなかったことが分かるようになる」という同じ楽しさでできています。"
        />

        <div className="mt-14 space-y-16 sm:space-y-20">
          {services.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={s.key}
                className="grid items-center gap-7 sm:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14"
              >
                <Reveal
                  variant="clip"
                  className={`overflow-hidden rounded-[1.75rem] ${flip ? 'lg:order-2' : ''}`}
                >
                  <Photo
                    photo={photos[s.photo]}
                    sizes="(min-width: 1024px) 480px, 92vw"
                    className="aspect-[16/10] w-full object-cover"
                  />
                </Reveal>

                <div className={flip ? 'lg:order-1' : ''}>
                  <Reveal variant="line">
                    <p className="eyebrow text-daidai">{s.en}</p>
                  </Reveal>
                  <Reveal variant="line" delay={80}>
                    <h3 className="display mt-3 text-[1.4rem] leading-[1.55] sm:text-[1.7rem]">
                      <Link href={s.href} className="underline-offset-8 hover:underline">
                        {s.name}
                      </Link>
                    </h3>
                  </Reveal>
                  <Reveal variant="line" delay={140}>
                    <p className="mt-4 text-[1rem] leading-[2] text-sumi-2">{s.summary}</p>
                  </Reveal>
                  <Reveal delay={200}>
                    <ul className="mt-5 space-y-2">
                      {s.points.map((p) => (
                        <li key={p} className="flex gap-3 text-[0.96rem] leading-[1.85]">
                          <span
                            aria-hidden
                            className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-wakaba"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={260}>
                    <p className="mt-6">
                      <Link href={s.href} className="arrow-link text-midori-3">
                        {s.nickname ? `${s.nickname}をくわしく見る` : 'くわしく見る'}
                        <ArrowIcon className="h-5 w-5" />
                      </Link>
                    </p>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
