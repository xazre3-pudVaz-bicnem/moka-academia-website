import type { ReactNode } from 'react';
import Breadcrumbs from './Breadcrumbs';
import Photo from './Photo';
import Reveal from './Reveal';
import { photos, type PhotoKey } from '@/data/photos';
import type { Crumb } from '@/lib/jsonld';

type Props = {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  /** ページ冒頭の「誰向けの、何のページか」。主語を省略しない1〜2文で書く */
  answer: string;
  photo?: PhotoKey;
  /** 写真を暗い背景で見せる（哲学塾） */
  tone?: 'light' | 'dark';
  children?: ReactNode;
};

/**
 * 下層ページの見出し。
 *
 * answer には必ず主語つきの1文を入れます。
 * AI検索に「これは誰向けの何なのか」をそのまま引用してもらうための場所です。
 */
export default function PageHero({
  crumbs,
  eyebrow,
  title,
  answer,
  photo,
  tone = 'light',
  children,
}: Props) {
  const dark = tone === 'dark';

  return (
    <header
      className={`relative overflow-hidden ${dark ? 'yoru-section' : 'paper border-b border-usu'}`}
    >
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-32">
        <Breadcrumbs crumbs={crumbs} tone={dark ? 'dark' : 'light'} />

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            {eyebrow && (
              <Reveal variant="line">
                <p className={`eyebrow ${dark ? 'text-kin' : 'text-daidai'}`}>{eyebrow}</p>
              </Reveal>
            )}
            <Reveal variant="line" delay={80}>
              <h1
                className={`display mt-4 text-[1.85rem] leading-[1.5] sm:text-[2.5rem] ${
                  dark ? 'text-kin-2' : ''
                }`}
              >
                {title}
              </h1>
            </Reveal>
            <Reveal variant="line" delay={170}>
              <p
                className={`mt-6 max-w-[38rem] text-[1.02rem] leading-[2.05] ${
                  dark ? 'text-kin-2/85' : 'text-sumi-2'
                }`}
              >
                {answer}
              </p>
            </Reveal>
            {children && (
              <Reveal variant="line" delay={250}>
                <div className="mt-8">{children}</div>
              </Reveal>
            )}
          </div>

          {photo && (
            <Reveal variant="clip" className="overflow-hidden rounded-[1.75rem] shadow-sm">
              <Photo
                photo={photos[photo]}
                sizes="(min-width: 1024px) 420px, 100vw"
                className="h-full w-full object-cover"
                priority
                quality={78}
              />
            </Reveal>
          )}
        </div>
      </div>
    </header>
  );
}
