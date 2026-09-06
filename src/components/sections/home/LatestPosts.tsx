import Link from 'next/link';
import PostList from '@/components/blog/PostList';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { getAllPosts } from '@/lib/blog';
import { ArrowIcon } from '@/components/ui/icons';

/** トップに出す最新記事。記事がまだ無いときはセクションごと出しません */
export default function LatestPosts() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section className="border-y border-usu bg-kinari-2">
      <div className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24">
        <SectionHeading
          en="BLOG"
          title="読みもの"
          lead="健康麻雀のこと、真岡のこと、英語や哲学のこと。教室から少しずつ書いていきます。"
        />
        <div className="mt-12">
          <PostList posts={posts} />
        </div>
        <Reveal delay={200}>
          <p className="mt-10">
            <Link href="/blog" className="arrow-link text-midori-3">
              記事の一覧を見る
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
