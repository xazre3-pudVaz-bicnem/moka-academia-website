import Link from 'next/link';
import Image from 'next/image';
import { mainNav, subNav } from '@/lib/nav';
import { school } from '@/data/school';
import { PhoneIcon } from '@/components/ui/icons';

export const metadata = {
  title: 'ページが見つかりません',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="paper">
      <div className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <Image
          src="/photos/logo-academia.jpg"
          alt=""
          width={128}
          height={128}
          className="mx-auto h-24 w-24 rounded-full border border-usu object-cover"
        />

        <p className="eyebrow mt-8 text-daidai">404 NOT FOUND</p>
        <h1 className="display mt-5 text-[1.6rem] leading-[1.55] sm:text-[2.05rem]">
          お探しのページが
          <br className="sm:hidden" />
          見つかりませんでした。
        </h1>
        <p className="mx-auto mt-6 max-w-[30rem] text-[1rem] leading-[2] text-sumi-2">
          住所が変わったか、なくなってしまったようです。
          下から、行きたいページをお選びください。
        </p>

        <nav aria-label="サイト内メニュー" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {[...mainNav, ...subNav].map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="inline-block rounded-full border border-usu bg-white px-4 py-2.5 text-[0.95rem] text-sumi-2 transition-colors hover:border-midori hover:text-midori-3"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-midori">
            ホームへ戻る
          </Link>
          <a href={school.telLink} className="btn btn-outline text-midori-3">
            <PhoneIcon className="h-5 w-5" />
            {school.tel}
          </a>
        </div>
      </div>
    </div>
  );
}
