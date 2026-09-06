'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** ミリ秒 */
  delay?: number;
  /** 'up' = 下から浮かぶ / 'clip' = 写真が下から開く / 'line' = 文字が現れる */
  variant?: 'up' | 'clip' | 'line';
  slow?: boolean;
  as?: 'div' | 'section' | 'figure' | 'article' | 'li' | 'header' | 'p' | 'span';
};

const variantClass = {
  up: 'reveal',
  clip: 'reveal-clip',
  line: 'reveal-line',
} as const;

/**
 * スクロールで一度だけ現れる。
 *
 * 表示状態は data-visible を直接書き換えて切り替えます。
 * React の state を経由しないので、要素が画面に入るたびに再レンダリングが走りません。
 * 隠すスタイルは html.js が付いているときだけ効くので（globals.css）、
 * JSが無効な環境でも本文は最初から見えています。
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up',
  slow = false,
  as = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.visible = 'true';
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = 'true';
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as 'div';

  return (
    <Tag
      ref={ref}
      className={`${variantClass[variant]} ${slow ? 'reveal-slow' : ''} ${className}`}
      data-visible="false"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
