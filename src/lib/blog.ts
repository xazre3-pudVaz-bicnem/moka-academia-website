import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * ブログのカテゴリ。
 *
 * 主軸は健康麻雀です。検索意図がばらけるように分けたうえで、
 * 各カテゴリに「必ずリンクするサービスページ」を持たせています。
 * これで、記事が孤立せず、読んだ人が次に行く場所が決まります。
 */
export const blogCategories = {
  'kenko-mahjong': {
    label: '健康麻雀のこと',
    description:
      '飲まない・吸わない・賭けない健康麻雀とは何か。普通の麻雀との違いや、教室での過ごし方について。',
    /** この記事から必ず張るサービスページ */
    primary: '/mahjong',
  },
  shoshinsha: {
    label: '麻雀をはじめる',
    description: '牌を触ったことがない方へ。最初に覚えること、初日の流れ、よくある不安について。',
    primary: '/beginner',
  },
  moka: {
    label: '真岡のこと',
    description: '真岡市で趣味や習い事を探している方へ。この街で学べる場所と、地域のつながりについて。',
    primary: '/access',
  },
  onespot: {
    label: '出張健康麻雀',
    description: '施設のレクリエーションとしての健康麻雀。出張の流れや、当日の様子について。',
    primary: '/onespot',
  },
  onemore: {
    label: '英語多読のこと',
    description: '多読と音読で英語を学ぶということ。読める量が増えていく過程について。',
    primary: '/onemore',
  },
  onequestion: {
    label: '哲学と問い',
    description: '問いを持つこと、自分の言葉で考えること、違う考え方に触れることについて。',
    primary: '/onequestion',
  },
  katsudo: {
    label: '活動レポート',
    description: 'イベントや教室での出来事。実際にあったことの記録です。',
    primary: '/about',
  },
} as const;

export type BlogCategory = keyof typeof blogCategories;

export const blogCategoryKeys = Object.keys(blogCategories) as BlogCategory[];

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: BlogCategory;
  keywords: string[];
  author: string;
  /** アイキャッチに使う写真のキー（data/photos.ts） */
  eyecatch?: string;
  /** 想定検索クエリ。1記事1クエリで管理してカニバリを防ぐ */
  intent?: string;
  /** 記事末尾のFAQ */
  faq: { q: string; a: string }[];
  /** 本文（Markdown） */
  content: string;
};

function isCategory(v: unknown): v is BlogCategory {
  return typeof v === 'string' && v in blogCategories;
}

function toDateString(v: unknown, fallback: string): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
  return fallback;
}

function toFaq(v: unknown): { q: string; a: string }[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const rec = item as Record<string, unknown>;
      const q = typeof rec.q === 'string' ? rec.q.trim() : '';
      const a = typeof rec.a === 'string' ? rec.a.trim() : '';
      return q && a ? { q, a } : null;
    })
    .filter((x): x is { q: string; a: string } => x !== null);
}

let cache: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(BLOG_DIR)) {
    cache = [];
    return cache;
  }

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const slug = String(data.slug ?? file.replace(/\.mdx?$/, '')).trim();
      const published = toDateString(data.date ?? data.publishedAt, '1970-01-01');

      const post: BlogPost = {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ''),
        publishedAt: published,
        updatedAt: toDateString(data.updatedAt, published),
        category: isCategory(data.category) ? data.category : 'kenko-mahjong',
        keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
        author: String(data.author ?? '健康麻雀教室 ぽかぽかあかでみあ'),
        eyecatch: typeof data.eyecatch === 'string' ? data.eyecatch : undefined,
        intent: typeof data.intent === 'string' ? data.intent : undefined,
        faq: toFaq(data.faq),
        content,
      };
      return post;
    })
    .filter((p) => p.title && p.publishedAt !== '1970-01-01')
    .sort((a, b) =>
      a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.slug < b.slug ? 1 : -1,
    );

  cache = posts;
  return posts;
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

/** 同カテゴリ → 同じキーワード → 新着 の順で埋める。記事を孤立させないための導線 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  const sameCategory = all.filter((p) => p.category === post.category);
  const sharedKeyword = all.filter(
    (p) => p.category !== post.category && p.keywords.some((t) => post.keywords.includes(t)),
  );
  const rest = all.filter((p) => !sameCategory.includes(p) && !sharedKeyword.includes(p));
  return [...sameCategory, ...sharedKeyword, ...rest].slice(0, limit);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${y}年${Number(m)}月${Number(d)}日`;
}
