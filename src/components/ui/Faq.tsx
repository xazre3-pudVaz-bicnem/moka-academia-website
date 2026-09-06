import type { FaqItem } from '@/data/faq';
import Reveal from './Reveal';

/**
 * よくある質問。
 *
 * details/summary で作っているので、JSがなくても開閉できます。
 * 中身は最初からHTMLに含まれているため、検索エンジンにもAIにも読まれます。
 */
export default function Faq({ items, tone = 'light' }: { items: FaqItem[]; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  const line = dark ? 'border-kin/25' : 'border-usu';
  const answer = dark ? 'text-kin-2/85' : 'text-sumi-2';
  const mark = dark ? 'text-kin' : 'text-midori-2';

  return (
    <dl className={`border-t ${line}`}>
      {items.map((item, i) => (
        <Reveal as="div" key={item.q} delay={Math.min(i, 6) * 50}>
          <details className={`group border-b ${line}`}>
            <summary className="flex cursor-pointer list-none items-start gap-4 py-5 [&::-webkit-details-marker]:hidden">
              <span
                aria-hidden
                className={`mt-[0.15em] grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold ${
                  dark ? 'bg-kin/20 text-kin-2' : 'bg-wakaba-2 text-midori-3'
                }`}
              >
                Q
              </span>
              <dt className="display flex-1 text-[1.05rem] leading-[1.7]">{item.q}</dt>
              <span
                aria-hidden
                className={`relative mt-[0.55em] h-3.5 w-3.5 shrink-0 ${mark} transition-transform duration-500 group-open:rotate-45`}
              >
                <span className="absolute left-0 top-1/2 h-[2px] w-3.5 -translate-y-1/2 rounded-full bg-current" />
                <span className="absolute left-1/2 top-0 h-3.5 w-[2px] -translate-x-1/2 rounded-full bg-current" />
              </span>
            </summary>
            <dd className={`flex gap-4 pb-6 pr-6 text-[0.98rem] leading-[2] ${answer}`}>
              <span
                aria-hidden
                className={`mt-[0.15em] grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold ${
                  dark ? 'bg-kin/10 text-kin/80' : 'bg-kinari-2 text-daidai'
                }`}
              >
                A
              </span>
              <span>{item.a}</span>
            </dd>
          </details>
        </Reveal>
      ))}
    </dl>
  );
}
