import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Photo from '@/components/ui/Photo';
import Faq from '@/components/ui/Faq';
import PostList from '@/components/blog/PostList';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import Reveal from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/icons';

import { photos, type PhotoKey } from '@/data/photos';
import { school } from '@/data/school';
import {
  blogCategories,
  formatDate,
  getAllPosts,
  getPost,
  getRelatedPosts,
} from '@/lib/blog';
import { renderMarkdown } from '@/lib/markdown';
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { allNav, HOME_CRUMB } from '@/lib/nav';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

/** カテゴリごとの既定のアイキャッチ。同じ絵が続かないように分けています */
const fallbackPhoto: Record<string, PhotoKey> = {
  'kenko-mahjong': 'spaceMahjong',
  shoshinsha: 'roomWide',
  moka: 'spaceLounge',
  onespot: 'onespotScene',
  onemore: 'onemoreReading',
  onequestion: 'onequestionScene',
  katsudo: 'onespotGroup',
};

function photoOf(eyecatch: string | undefined, category: string) {
  const key = eyecatch as PhotoKey | undefined;
  if (key && key in photos) return photos[key];
  return photos[fallbackPhoto[category] ?? 'spaceMahjong'];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogType: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    keywords: post.keywords,
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const category = blogCategories[post.category];
  const { html, headings } = renderMarkdown(post.content);
  const related = getRelatedPosts(post, 3);
  const eyecatch = photoOf(post.eyecatch, post.category);
  const primary = allNav.find((n) => n.href === category.primary);

  const crumbs = [
    HOME_CRUMB,
    { name: 'ブログ', href: '/blog' },
    { name: category.label, href: `/blog/category/${post.category}` },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <article>
        <header className="paper border-b border-usu">
          <div className="mx-auto max-w-3xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
            <Breadcrumbs crumbs={crumbs} />

            <p className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.85rem] text-sumi-2">
              <Link
                href={`/blog/category/${post.category}`}
                className="inline-flex min-h-11 items-center rounded-full bg-wakaba-2 px-3.5 text-midori-3"
              >
                {category.label}
              </Link>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.updatedAt !== post.publishedAt && (
                <span>更新 {formatDate(post.updatedAt)}</span>
              )}
            </p>

            <h1 className="display mt-5 text-[1.75rem] leading-[1.55] sm:text-[2.25rem]">
              {post.title}
            </h1>

            {post.description && (
              <p className="mt-6 text-[1.02rem] leading-[2.05] text-sumi-2">{post.description}</p>
            )}

            <p className="mt-6 text-[0.88rem] text-sumi-2">文／{post.author}</p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <figure className="-mt-2 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
            <Photo
              photo={eyecatch}
              alt={`${post.title}のイメージ`}
              sizes="(min-width: 768px) 720px, 92vw"
              priority
              quality={78}
              className="aspect-[16/9] w-full object-cover"
            />
          </figure>

          {/* 目次。見出しが3つ以上あるときだけ出します */}
          {headings.length >= 3 && (
            <nav aria-label="目次" className="mt-10 rounded-3xl border border-usu bg-white p-6 sm:p-7">
              <p className="display text-[1.02rem] text-midori-3">この記事の内容</p>
              <ol className="mt-4 space-y-2">
                {headings
                  .filter((h) => h.level === 2)
                  .map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="inline-block py-2 text-[0.96rem] leading-[1.8] text-sumi-2 underline-offset-4 hover:text-midori-3 hover:underline"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
              </ol>
            </nav>
          )}

          <div
            className="prose-poka mt-12"
            // renderMarkdown は入力をエスケープしてから組み立てるので、生のHTMLは通りません
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {post.faq.length > 0 && (
            <section className="mt-16">
              <h2 className="display text-[1.3rem] text-midori-3">この記事のよくある質問</h2>
              <div className="mt-6">
                <Faq items={post.faq} />
              </div>
            </section>
          )}

          {/* 記事から必ずサービスページへ戻す */}
          {primary && (
            <Reveal>
              <aside className="mt-16 rounded-3xl border-2 border-wakaba bg-white p-7 sm:p-8">
                <p className="text-[0.85rem] text-midori-2">この記事に関係のあるページ</p>
                <p className="display mt-3 text-[1.2rem] text-midori-3">{primary.label}</p>
                <p className="mt-3 text-[0.97rem] leading-[1.95] text-sumi-2">
                  {category.description}
                </p>
                <p className="mt-5">
                  <Link href={primary.href} className="arrow-link text-midori-3">
                    {primary.label}を見る
                    <ArrowIcon className="h-5 w-5" />
                  </Link>
                </p>
              </aside>
            </Reveal>
          )}

          <p className="mt-10 text-[0.92rem] leading-[1.9] text-sumi-2">
            健康麻雀は趣味として楽しんでいただくものです。病気の予防や治療を目的とした活動ではありません。
            料金や日程については、記事の内容ではなく
            <Link href="/price" className="text-midori-3 underline underline-offset-4">
              料金一覧
            </Link>
            と
            <a href={school.telLink} className="text-midori-3 underline underline-offset-4">
              お電話
            </a>
            でご確認ください。
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-20 border-t border-usu bg-kinari-2">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <h2 className="eyebrow text-midori-2">ほかの記事</h2>
            <div className="mt-8">
              <PostList posts={related} />
            </div>
            <p className="mt-10">
              <Link href="/blog" className="arrow-link text-midori-3">
                記事の一覧へ
                <ArrowIcon className="h-5 w-5" />
              </Link>
            </p>
          </div>
        </section>
      )}

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          path: `/blog/${post.slug}`,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          image: eyecatch.src,
        })}
      />
      <JsonLd data={faqJsonLd(post.faq)} />
    </>
  );
}
