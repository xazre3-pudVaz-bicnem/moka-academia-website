import Link from 'next/link';
import { school } from '@/data/school';
import Reveal from './Reveal';
import { InstagramIcon, PhoneIcon } from './icons';

/**
 * ページの終わりに置く問い合わせ導線。
 *
 * 一番大きく出すのは電話です。
 * スマートフォンではそのままタップして発信できます。
 */
export default function CtaBand({
  heading = 'まずは、お気軽にご相談ください。',
  lead = '見学だけでも、質問だけでも構いません。麻雀をやったことがない方からのお電話がいちばん多いです。',
}: {
  heading?: string;
  lead?: string;
}) {
  return (
    <section className="bg-midori text-kinari">
      <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 sm:py-20">
        <Reveal variant="line">
          <h2 className="display text-[1.5rem] leading-[1.6] sm:text-[1.95rem]">{heading}</h2>
        </Reveal>
        <Reveal variant="line" delay={90}>
          <p className="mx-auto mt-5 max-w-[34rem] text-[1rem] leading-[2] text-kinari/85">{lead}</p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-9">
            <a
              href={school.telLink}
              className="inline-flex flex-col items-center gap-1 rounded-3xl bg-kinari px-9 py-5 text-midori-3 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="text-[0.78rem] font-bold tracking-[0.18em] text-midori-2">
                お電話でのお問い合わせ
              </span>
              <span className="display flex items-center gap-3 text-[1.85rem] leading-none sm:text-[2.25rem]">
                <PhoneIcon className="h-6 w-6" />
                {school.tel}
              </span>
            </a>
            <ul className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-1 text-[0.9rem] text-kinari/80">
              {school.telHours.map((h) => (
                <li key={h.label}>
                  {h.label}　{h.value}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="btn btn-outline text-kinari">
              お問い合わせページへ
            </Link>
            <a
              href={school.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-daidai"
            >
              <InstagramIcon className="h-5 w-5" />
              Instagramを見る
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
