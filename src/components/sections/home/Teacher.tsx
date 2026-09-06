import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { photos } from '@/data/photos';
import { school } from '@/data/school';
import { ArrowIcon } from '@/components/ui/icons';

/**
 * 代表・教室長の紹介。
 *
 * 経歴を作らないこと。
 * チラシに書かれていた3行と、ご本人のメッセージだけを載せています。
 */
export default function Teacher() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <Reveal variant="clip" className="mx-auto w-full max-w-[19rem] overflow-hidden rounded-[1.75rem]">
          <Photo
            photo={photos.teacherTrophy}
            sizes="(min-width: 1024px) 300px, 70vw"
            className="w-full object-cover"
          />
        </Reveal>

        <div>
          <SectionHeading
            en="TEACHER"
            title={
              <>
                独学でつまずいたところを、
                <br />
                隣で見ている人がいます。
              </>
            }
          />

          <Reveal variant="line" delay={200}>
            <p className="mt-7 text-[1.02rem] leading-[2.1]">
              牌効率、点数計算。ひとりで覚えようとすると、どうしても限界があります。
              ぽかぽかあかでみあでは、麻雀プロを目指す講師が、
              自作のテキストを使って一から丁寧にお伝えします。
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-7 rounded-3xl border border-usu bg-white p-6 sm:p-7">
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-[0.82rem] text-midori-2">{school.teacher.role}</span>
                <span className="display text-[1.35rem] text-midori-3">{school.teacher.name}</span>
                <span className="text-[0.85rem] text-sumi-2">（{school.teacher.reading}）</span>
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.93rem] text-sumi-2">
                {school.teacher.facts.map((f) => (
                  <li key={f} className="flex items-baseline gap-2">
                    <span aria-hidden className="text-midori-2">
                      ✿
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-usu pt-4 text-[0.98rem] leading-[1.95]">
                「{school.teacher.message}」
              </p>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-7">
              <Link href="/about" className="arrow-link text-midori-3">
                講師とオリジナルテキストのこと
                <ArrowIcon className="h-5 w-5" />
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
