import Link from 'next/link';
import type { Crumb } from '@/lib/jsonld';

export default function Breadcrumbs({
  crumbs,
  tone = 'light',
}: {
  crumbs: Crumb[];
  /** 'light' = 明るい背景の上 / 'dark' = 暗い背景の上 */
  tone?: 'light' | 'dark';
}) {
  const color = tone === 'dark' ? 'text-kin-2/70' : 'text-sumi-2';
  return (
    <nav aria-label="パンくずリスト" className={`text-[0.8rem] ${color}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="inline-block py-2.5">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="inline-block py-2.5 underline-offset-4 hover:underline">
                    {c.name}
                  </Link>
                  <span aria-hidden className="opacity-50">
                    ›
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
