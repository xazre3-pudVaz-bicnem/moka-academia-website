import Link from 'next/link';
import { blogCategories, blogCategoryKeys, type BlogCategory } from '@/lib/blog';

export default function CategoryNav({ current }: { current?: BlogCategory }) {
  return (
    <nav aria-label="ブログのカテゴリ">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/blog"
            aria-current={current ? undefined : 'page'}
            className={`inline-block rounded-full border px-4 py-2.5 text-[0.92rem] transition-colors ${
              current
                ? 'border-usu text-sumi-2 hover:border-midori hover:text-midori-3'
                : 'border-midori bg-midori text-kinari'
            }`}
          >
            すべて
          </Link>
        </li>
        {blogCategoryKeys.map((key) => {
          const active = current === key;
          return (
            <li key={key}>
              <Link
                href={`/blog/category/${key}`}
                aria-current={active ? 'page' : undefined}
                className={`inline-block rounded-full border px-4 py-2.5 text-[0.92rem] transition-colors ${
                  active
                    ? 'border-midori bg-midori text-kinari'
                    : 'border-usu text-sumi-2 hover:border-midori hover:text-midori-3'
                }`}
              >
                {blogCategories[key].label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
