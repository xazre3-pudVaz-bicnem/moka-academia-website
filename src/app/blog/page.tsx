import type { Metadata } from 'next';

import PageHero from '@/components/ui/PageHero';
import Section from '@/components/ui/Section';
import PostList from '@/components/blog/PostList';
import CategoryNav from '@/components/blog/CategoryNav';
import CtaBand from '@/components/ui/CtaBand';
import RelatedLinks from '@/components/ui/RelatedLinks';
import JsonLd from '@/components/ui/JsonLd';

import { getAllPosts } from '@/lib/blog';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { HOME_CRUMB } from '@/lib/nav';

const PATH = '/blog';
const TITLE = 'ブログ｜健康麻雀・真岡・英語多読・哲学の読みもの';
const DESCRIPTION =
  '健康麻雀教室ぽかぽかあかでみあのブログです。健康麻雀とは何か、麻雀のはじめ方、真岡での学びのこと、出張健康麻雀、英語多読、哲学の話。栃木県真岡市の教室から書いています。';

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
});

const crumbs = [HOME_CRUMB, { name: 'ブログ', href: PATH }];

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        crumbs={crumbs}
        eyebrow="BLOG"
        title="読みもの"
        answer="健康麻雀教室ぽかぽかあかでみあのブログです。健康麻雀のこと、麻雀のはじめ方、真岡での学びのこと、英語多読や哲学のことを書いています。"
      >
        <CategoryNav />
      </PageHero>

      <Section>
        <h2 className="display text-[1.3rem] text-midori-3 sm:text-[1.5rem]">
          記事の一覧
          <span className="ml-3 text-[0.9rem] font-normal text-sumi-2">全{posts.length}件</span>
        </h2>
        <div className="mt-8">
          <PostList posts={posts} />
        </div>
      </Section>

      <RelatedLinks
        links={[
          { href: '/mahjong', label: '健康麻雀教室 あかでみあ', text: '飲まない・吸わない・賭けない健康麻雀。' },
          { href: '/beginner', label: 'はじめての方へ', text: '牌を触ったことがない方へ。初日の流れ。' },
          { href: '/faq', label: 'よくある質問', text: '4つの学びすべてについての質問と答え。' },
        ]}
      />

      <CtaBand />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
