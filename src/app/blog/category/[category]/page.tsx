import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import PostList from '@/components/blog/PostList';
import CategoryNav from '@/components/blog/CategoryNav';
import CtaBand from '@/components/ui/CtaBand';
import JsonLd from '@/components/ui/JsonLd';
import { ArrowIcon } from '@/components/ui/icons';

import {
  blogCategories,
  blogCategoryKeys,
  getPostsByCategory,
  type BlogCategory,
} from '@/lib/blog';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';
import { allNav } from '@/lib/nav';

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return blogCategoryKeys.map((category) => ({ category }));
}

function toCategory(v: string): BlogCategory | null {
  return (blogCategoryKeys as string[]).includes(v) ? (v as BlogCategory) : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const key = toCategory(category);
  if (!key) return {};
  const c = blogCategories[key];
  return buildMetadata({
    title: `${c.label}の記事｜ブログ`,
    description: `${c.description} 栃木県真岡市の健康麻雀教室ぽかぽかあかでみあのブログ、「${c.label}」の記事一覧です。`,
    path: `/blog/category/${key}`,
  });
}

export default async function BlogCategoryPage({ params }: Params) {
  const { category } = await params;
  const key = toCategory(category);
  if (!key) notFound();

  const c = blogCategories[key];
  const posts = getPostsByCategory(key);
  const primary = allNav.find((n) => n.href === c.primary);

  const crumbs = [
    HOME_CRUMB,
    { name: 'ブログ', href: '/blog' },
    { name: c.label, href: `/blog/category/${key}` },
  ];

  return (
    <>
      <PageHero crumbs={crumbs} eyebrow="BLOG CATEGORY" title={c.label} answer={c.description}>
        <CategoryNav current={key} />
      </PageHero>

      <Section>
        <h2 className="display text-[1.3rem] text-midori-3 sm:text-[1.5rem]">
          「{c.label}」の記事
          <span className="ml-3 text-[0.9rem] font-normal text-sumi-2">全{posts.length}件</span>
        </h2>
        <div className="mt-8">
          <PostList posts={posts} />
        </div>

        {primary && (
          <p className="mt-12">
            <Link href={primary.href} className="arrow-link text-midori-3">
              {primary.label}のページを見る
              <ArrowIcon className="h-5 w-5" />
            </Link>
          </p>
        )}
      </Section>

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
