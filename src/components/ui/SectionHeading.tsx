import type { ReactNode } from 'react';
import Reveal from './Reveal';

type Props = {
  /** ローマ字の小見出し。日本語の意味は title 側で必ず伝える */
  en?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'midori' | 'daidai' | 'kin';
  className?: string;
  /** h2 以外にしたいとき */
  as?: 'h2' | 'h3';
};

/**
 * セクションの見出し。
 * カードで囲まず、細い罫線と手書き風の線だけで区切りを作ります。
 */
export default function SectionHeading({
  en,
  title,
  lead,
  align = 'left',
  tone = 'midori',
  className = '',
  as: Tag = 'h2',
}: Props) {
  const center = align === 'center';
  const eyebrowColor =
    tone === 'daidai' ? 'text-daidai' : tone === 'kin' ? 'text-kin' : 'text-midori-2';

  return (
    <div className={`${center ? 'text-center' : ''} ${className}`}>
      {en && (
        <Reveal variant="line">
          <p className={`eyebrow flex items-center gap-3 ${eyebrowColor} ${center ? 'justify-center' : ''}`}>
            <span aria-hidden className="h-0.5 w-6 rounded-full bg-current opacity-70" />
            <span>{en}</span>
          </p>
        </Reveal>
      )}
      <Reveal variant="line" delay={90}>
        <Tag className="display mt-4 text-[1.55rem] leading-[1.55] sm:text-[2rem]">{title}</Tag>
      </Reveal>
      {lead && (
        <Reveal variant="line" delay={170}>
          <div
            className={`mt-5 max-w-[40rem] text-[1rem] leading-[2] ${center ? 'mx-auto' : ''}`}
          >
            {lead}
          </div>
        </Reveal>
      )}
    </div>
  );
}
