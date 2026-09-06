import Link from 'next/link';
import Image from 'next/image';
import { school } from '@/data/school';
import { mainNav, subNav } from '@/lib/nav';
import { InstagramIcon, PhoneIcon } from '@/components/ui/icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-usu bg-kinari-2">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
          {/* 教室の情報（NAPはここでもサイト内と同じ表記にそろえています） */}
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/photos/logo-academia.jpg"
                alt=""
                width={72}
                height={72}
                quality={78}
                className="h-16 w-16 rounded-full border border-usu object-cover"
              />
              <p className="leading-tight">
                <span className="block text-[0.72rem] tracking-[0.12em] text-midori-2">
                  真岡の健康麻雀教室
                </span>
                <span className="display block text-[1.25rem] text-midori-3">
                  ぽかぽかあかでみあ
                </span>
              </p>
            </div>

            <p className="mt-6 text-[0.98rem] leading-[1.95] text-sumi-2">
              健康麻雀教室ぽかぽかあかでみあは、栃木県真岡市田町で初心者から健康麻雀を学べる教室です。
              出張健康麻雀教室わんすぽ、英語多読塾わんもあ、哲学塾わんくえも運営しています。
            </p>

            <address className="mt-6 not-italic text-[0.98rem] leading-[1.95]">
              {school.address.full}
              <br />
              <a
                href={school.telLink}
                className="display mt-1 inline-flex min-h-11 items-center gap-2 py-1 text-[1.4rem] text-midori-3 underline-offset-4 hover:underline"
              >
                <PhoneIcon className="h-5 w-5" />
                {school.tel}
              </a>
            </address>
            <ul className="mt-2 text-[0.88rem] text-sumi-2">
              {school.telHours.map((h) => (
                <li key={h.label}>
                  {h.label}　{h.value}
                </li>
              ))}
              <li>定休日　{school.closedDays}</li>
            </ul>

            <a
              href={school.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-midori px-5 py-2.5 text-[0.95rem] text-midori-3 transition-colors hover:bg-midori hover:text-kinari"
            >
              <InstagramIcon className="h-5 w-5" />
              @{school.instagram.handle}
            </a>
          </div>

          {/* サイト内の導線 */}
          <nav aria-label="フッターメニュー" className="grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="eyebrow text-midori-2">4つの学びと教室</h2>
              <ul className="mt-4 space-y-1">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block py-1.5 text-[0.98rem] underline-offset-4 hover:underline"
                    >
                      {item.label}
                      {item.sub && <span className="ml-2 text-[0.85rem] text-sumi-2">{item.sub}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-midori-2">ご案内</h2>
              <ul className="mt-4 space-y-1">
                {subNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block py-1.5 text-[0.98rem] underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <p className="mt-12 border-t border-usu pt-6 text-[0.85rem] text-sumi-2">
          © {year} {school.name}
        </p>
      </div>
    </footer>
  );
}
