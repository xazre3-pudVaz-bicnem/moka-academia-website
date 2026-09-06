import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { photos, type PhotoKey } from '@/data/photos';
import { blogCategories, formatDate, type BlogPost } from '@/lib/blog';
import { toPlainText } from '@/lib/markdown';

function eyecatchOf(post: BlogPost) {
  const key = post.eyecatch as PhotoKey | undefined;
  if (key && key in photos) return photos[key];
  // カテゴリごとの既定の写真。同じ絵が続かないように分けています
  const fallback: Record<string, PhotoKey> = {
    'kenko-mahjong': 'spaceMahjong',
    shoshinsha: 'roomWide',
    moka: 'spaceLounge',
    onespot: 'onespotScene',
    onemore: 'onemoreReading',
    onequestion: 'onequestionScene',
    katsudo: 'onespotGroup',
  };
  return photos[fallback[post.category] ?? 'spaceMahjong'];
}

export default function PostList({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) {
    return (
      <p className="rounded-3xl border border-usu bg-white p-8 text-center text-[0.98rem] text-sumi-2">
        まだ記事がありません。準備ができ次第、健康麻雀のことから書いていきます。
      </p>
    );
  }

  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <Reveal as="li" key={post.slug} delay={Math.min(i, 5) * 70}>
          <article className="h-full">
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <div className="overflow-hidden rounded-[1.35rem]">
                <Photo
                  photo={eyecatchOf(post)}
                  alt={`${post.title}のイメージ`}
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 92vw"
                  quality={70}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-4 flex flex-wrap items-center gap-x-3 text-[0.82rem] text-sumi-2">
                <span className="rounded-full bg-wakaba-2 px-3 py-1 text-midori-3">
                  {blogCategories[post.category].label}
                </span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </p>
              <h3 className="display mt-3 text-[1.1rem] leading-[1.65] underline-offset-4 group-hover:underline">
                {post.title}
              </h3>
              <p className="mt-2.5 text-[0.93rem] leading-[1.9] text-sumi-2">
                {post.description || toPlainText(post.content, 90)}
              </p>
            </Link>
          </article>
        </Reveal>
      ))}
    </ul>
  );
}
