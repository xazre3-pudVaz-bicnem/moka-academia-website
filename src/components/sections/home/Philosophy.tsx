import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { school } from '@/data/school';
import { ArrowIcon } from '@/components/ui/icons';

/**
 * 教室の理念。
 *
 * 文章はご本人からいただいたものです（src/data/school.ts の philosophy）。
 * 言い回しを勝手に変えないでください。
 * カードで囲まず、番号と手書き風の線だけで3つを区切っています。
 */
export default function Philosophy() {
  return (
    <section className="paper border-y border-usu">
      <div className="mx-auto max-w-5xl px-5 py-18 sm:px-8 sm:py-24">
        <SectionHeading
          align="center"
          en="OUR PHILOSOPHY"
          title="教室の理念"
          lead="ロゴの帯に入っている3つの言葉が、そのまま教室の考え方です。"
        />

        <div className="mt-14 space-y-12 sm:space-y-14">
          {school.philosophy.map((p, i) => (
            <article key={p.title}>
              <Reveal variant="line" delay={i * 70}>
                <h3 className="display flex items-baseline gap-4 text-[1.3rem] leading-[1.6] text-midori-3 sm:text-[1.6rem]">
                  <span aria-hidden className="text-[0.92rem] text-daidai">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="handline">{p.title}</span>
                </h3>
              </Reveal>
              <Reveal variant="line" delay={i * 70 + 90}>
                <p className="mt-5 pl-0 text-[1.02rem] leading-[2.15] sm:pl-11">{p.body}</p>
              </Reveal>
            </article>
          ))}
        </div>

        <Reveal delay={280}>
          <p className="mt-14 text-center">
            <Link href="/about" className="arrow-link text-midori-3">
              あかでみあについて
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
