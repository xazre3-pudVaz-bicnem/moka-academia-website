import Link from 'next/link';
import Reveal from './Reveal';
import { ArrowIcon } from './icons';

export type RelatedLink = { href: string; label: string; text: string };

/**
 * ページの終わりに置く、次に行く場所。
 * どのページからも他のページへ行けるようにして、孤立ページを作らないための部品です。
 */
export default function RelatedLinks({
  links,
  heading = 'あわせてご覧ください',
}: {
  links: RelatedLink[];
  heading?: string;
}) {
  return (
    <section className="border-t border-usu bg-kinari-2">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <h2 className="eyebrow text-midori-2">{heading}</h2>
        <ul className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-usu bg-usu sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l, i) => (
            <Reveal as="li" key={l.href} delay={Math.min(i, 5) * 60} className="bg-kinari">
              <Link href={l.href} className="group flex h-full flex-col gap-2 p-6 transition-colors hover:bg-white">
                <span className="display flex items-center gap-2 text-[1.08rem] text-midori-3">
                  {l.label}
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="text-[0.92rem] leading-[1.85] text-sumi-2">{l.text}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
