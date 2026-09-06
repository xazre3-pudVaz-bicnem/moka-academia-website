import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import { threePromises } from '@/data/services';
import { ArrowIcon } from '@/components/ui/icons';

/**
 * 健康麻雀の3つの約束。
 *
 * 「雀荘ではない」ことを、いちばん短い言葉で伝える場所です。
 * カードを並べず、大きな文字と細い区切り線だけで見せています。
 */
export default function Promises() {
  return (
    <section className="border-y border-usu bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
        <Reveal variant="line">
          <p className="text-center text-[0.95rem] text-sumi-2">
            健康麻雀には、3つの約束があります。
          </p>
        </Reveal>

        <ul className="mt-8 grid divide-y divide-usu sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {threePromises.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 90} className="px-2 py-6 text-center sm:px-6 sm:py-2">
              <p className="display text-[1.9rem] leading-tight text-midori-3 sm:text-[2.15rem]">
                {p.title}
              </p>
              <p className="mx-auto mt-3 max-w-[19rem] text-[0.95rem] leading-[1.95] text-sumi-2">
                {p.text}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={280}>
          <p className="mt-8 text-center">
            <Link href="/mahjong" className="arrow-link text-midori-3">
              健康麻雀教室のことをくわしく見る
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
