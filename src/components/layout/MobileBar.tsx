import Link from 'next/link';
import { school } from '@/data/school';
import { InstagramIcon, PhoneIcon } from '@/components/ui/icons';

/**
 * スマートフォンの下に出す固定の導線。
 *
 * 画面を圧迫しないよう高さは1行ぶんに抑え、
 * 本文が隠れないように body 側で下に余白を取っています（layout.tsx）。
 * 出すのは電話・問い合わせ・Instagramの3つだけです。
 */
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-usu bg-kinari/97 backdrop-blur-sm lg:hidden">
      <div className="mx-auto flex max-w-lg items-stretch gap-1.5 px-2 py-2">
        <a
          href={school.telLink}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-midori px-3 py-3 text-kinari"
        >
          <PhoneIcon className="h-4.5 w-4.5" />
          <span className="display text-[0.98rem] leading-none">電話する</span>
        </a>
        <Link
          href="/contact"
          className="flex flex-1 items-center justify-center rounded-full border-2 border-midori px-3 py-3 text-midori-3"
        >
          <span className="display text-[0.98rem] leading-none">お問い合わせ</span>
        </Link>
        <a
          href={school.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagramを見る（新しいタブで開きます）"
          className="flex items-center justify-center rounded-full bg-daidai px-4 text-white"
        >
          <InstagramIcon className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
