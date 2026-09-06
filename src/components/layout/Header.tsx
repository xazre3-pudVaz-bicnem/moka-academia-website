'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { mainNav, subNav } from '@/lib/nav';
import { school } from '@/data/school';
import { PhoneIcon } from '@/components/ui/icons';

/**
 * ヘッダー。
 *
 * 注意:
 * 半透明のぼかし（backdrop-filter）を持つ要素の中に position: fixed を置くと、
 * 子要素の位置がヘッダーを基準に計算されてメニューが潰れます。
 * そのため、開いたメニューは header 内で absolute + top-full に置いています。
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  /*
   * ページを移動したら閉じる。
   * useEffect で setState すると余計な再レンダリングが1回増えるので、
   * 「前回のパスと違っていたらレンダリング中に閉じる」形にしています
   * （Reactが勧めている、描画中に状態を調整するやり方）。
   */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // 開いているあいだは背景をスクロールさせない
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc で閉じる
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-usu/70 bg-kinari/92 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label={`${school.name} ホームへ`}>
          <Image
            src="/photos/logo-academia.jpg"
            alt=""
            width={56}
            height={56}
            priority
            quality={78}
            className="h-11 w-11 rounded-full border border-usu object-cover sm:h-12 sm:w-12"
          />
          <span className="leading-tight">
            <span className="block text-[0.66rem] tracking-[0.12em] text-midori-2">
              真岡の健康麻雀教室
            </span>
            <span className="display block text-[1.02rem] text-midori-3 sm:text-[1.15rem]">
              ぽかぽかあかでみあ
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={school.telLink}
            className="hidden items-center gap-2 rounded-full bg-midori px-5 py-2.5 text-kinari transition-colors hover:bg-midori-3 lg:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="display text-[1.05rem] leading-none">{school.tel}</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            className="flex min-h-11 items-center gap-2.5 rounded-full border-2 border-midori px-4 py-2 text-midori-3"
          >
            <span aria-hidden className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 block h-[2.5px] w-5 rounded-full bg-current transition-transform duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-[2.5px] w-5 rounded-full bg-current transition-opacity duration-200 ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 block h-[2.5px] w-5 rounded-full bg-current transition-transform duration-300 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
            <span className="display text-[0.9rem] leading-none">{open ? '閉じる' : 'メニュー'}</span>
          </button>
        </div>
      </div>

      {/*
        fixed ではなく absolute + top-full。
        親に backdrop-blur があると fixed の基準がヘッダーになってしまうため。
      */}
      <div
        id={menuId}
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100svh-4.5rem)] overflow-y-auto border-b border-usu bg-kinari shadow-lg"
      >
        <nav aria-label="サイト内メニュー" className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <ul className="grid gap-1 sm:grid-cols-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-baseline gap-3 rounded-2xl px-4 py-3.5 transition-colors hover:bg-kinari-2"
                >
                  <span className="display text-[1.08rem] text-midori-3">{item.label}</span>
                  {item.sub && <span className="text-[0.85rem] text-sumi-2">{item.sub}</span>}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1 border-t border-usu pt-4">
            {subNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block rounded-full px-4 py-2.5 text-[0.95rem] text-sumi-2 transition-colors hover:bg-kinari-2 hover:text-midori-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href={school.telLink}
            className="btn btn-midori mt-5 w-full lg:hidden"
            aria-label={`電話をかける ${school.tel}`}
          >
            <PhoneIcon className="h-5 w-5" />
            {school.tel}
          </a>
        </nav>
      </div>
    </header>
  );
}
