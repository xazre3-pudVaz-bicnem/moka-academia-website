import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  id?: string;
  /** 背景。段ごとに変えて、カードを増やさずに区切りを作ります */
  tone?: 'kinari' | 'white' | 'kinari-2' | 'paper' | 'midori' | 'yoru';
  size?: 'md' | 'lg' | 'sm';
  width?: 'narrow' | 'wide';
  className?: string;
};

const toneClass = {
  kinari: 'bg-kinari',
  white: 'bg-white border-y border-usu',
  'kinari-2': 'bg-kinari-2 border-y border-usu',
  paper: 'paper border-y border-usu',
  midori: 'bg-midori text-kinari',
  yoru: 'yoru-section',
} as const;

const sizeClass = {
  sm: 'py-12 sm:py-16',
  md: 'py-16 sm:py-20',
  lg: 'py-18 sm:py-24',
} as const;

export default function Section({
  children,
  id,
  tone = 'kinari',
  size = 'lg',
  width = 'wide',
  className = '',
}: Props) {
  return (
    <section id={id} className={`${toneClass[tone]} ${className}`}>
      <div
        className={`mx-auto px-5 sm:px-8 ${sizeClass[size]} ${
          width === 'narrow' ? 'max-w-3xl' : 'max-w-6xl'
        }`}
      >
        {children}
      </div>
    </section>
  );
}
