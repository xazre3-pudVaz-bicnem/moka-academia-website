import { absoluteUrl, isPublic, siteName } from '@/lib/site';
import { school, telE164 } from '@/data/school';
import { faqItems, type FaqItem } from '@/data/faq';

/**
 * 構造化データ。
 *
 * 方針:
 * - 本番URLが未設定のあいだは出力しません（プレビューURLが混ざるのを防ぐため）。
 * - 口コミ・評価（aggregateRating / review）は、実在するものが無いので入れません。
 * - 金額は data/pricing.ts に載っている、確認できた数字だけを使います。
 * - 店舗がまだ無いので、住所は都道府県と市までしか出しません（address.settled）。
 *   物件が決まって settled を true にしたら、streetAddress と Place を出します。
 */

const ORG_ID = '#organization';
const PLACE_ID = '#place';

/**
 * 住所。
 * 店舗が決まるまでは都道府県と市までしか出しません。
 * 番地のない PostalAddress は Google も受け付けます（LocalBusiness の推奨は満たしませんが、
 * 存在しない住所を書くよりはずっと良いという判断です）。
 */
function postalAddress() {
  return {
    '@type': 'PostalAddress',
    addressCountry: 'JP',
    addressRegion: school.address.prefecture,
    addressLocality: school.address.city,
  };
}

export type Crumb = { name: string; href: string };

function url(path: string) {
  return absoluteUrl(path);
}

/** 教室そのもの。学びの場なので EducationalOrganization と LocalBusiness を兼ねさせる */
export function organizationJsonLd() {
  if (!isPublic) return null;
  return {
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': url(`/${ORG_ID}`),
    name: school.fullName,
    alternateName: [school.name, school.shortName, 'ぽかぽかあかでみあ'],
    description:
      '栃木県真岡市の健康麻雀教室。飲まない・吸わない・賭けない健康麻雀を初心者から学べます。出張健康麻雀わんすぽ、英語多読塾わんもあ、哲学塾わんくえも運営しています。2027年1月末オープン予定。',
    url: url('/'),
    telephone: telE164,
    logo: url('/photos/logo-academia.jpg'),
    image: url('/og.jpg'),
    slogan: school.tagline,
    address: postalAddress(),
    areaServed: [
      { '@type': 'City', name: '真岡市' },
      { '@type': 'AdministrativeArea', name: '栃木県' },
    ],
    sameAs: [school.instagram.url],
    founder: {
      '@type': 'Person',
      name: school.teacher.name,
      jobTitle: school.teacher.role,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: telE164,
      contactType: 'customer service',
      areaServed: 'JP',
      availableLanguage: ['ja'],
    },
  };
}

/**
 * 場所。
 * 店舗がまだ無いあいだは出しません（school.address.settled が false）。
 * 存在しない住所を構造化データに入れないための分岐です。
 * 物件が決まったら school.ts に番地を足して settled を true にしてください。
 * 営業時間も確認できていないので openingHours は出しません。
 */
export function placeJsonLd() {
  if (!isPublic || !school.address.settled) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': url(`/${PLACE_ID}`),
    name: school.name,
    address: postalAddress(),
    telephone: telE164,
  };
}

export function websiteJsonLd() {
  if (!isPublic) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: url('/'),
    inLanguage: 'ja',
    publisher: { '@id': url(`/${ORG_ID}`) },
  };
}

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  if (!isPublic || crumbs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: url(c.href),
    })),
  };
}

export function faqJsonLd(items: FaqItem[]) {
  if (!isPublic || items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** ページのFAQキーからそのまま作る */
export function faqJsonLdFor(...keys: string[]) {
  return faqJsonLd(faqItems(...keys));
}

type CourseArgs = {
  name: string;
  description: string;
  path: string;
  /** 「毎週金曜日 17:50〜19:20」など */
  schedule?: string;
  /** 月額（円） */
  monthlyYen?: number;
  /** 1回あたりの金額（円） */
  sessionYen?: number;
  audience?: string;
};

/** 講座。料金が分かっているものだけ offers を付けます */
export function courseJsonLd({
  name,
  description,
  path,
  schedule,
  monthlyYen,
  sessionYen,
  audience,
}: CourseArgs) {
  if (!isPublic) return null;

  const offers =
    monthlyYen !== undefined
      ? {
          '@type': 'Offer',
          price: String(monthlyYen),
          priceCurrency: 'JPY',
          category: '月謝',
          availability: 'https://schema.org/InStock',
        }
      : sessionYen !== undefined
        ? {
            '@type': 'Offer',
            price: String(sessionYen),
            priceCurrency: 'JPY',
            availability: 'https://schema.org/InStock',
          }
        : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    url: url(path),
    inLanguage: 'ja',
    provider: { '@id': url(`/${ORG_ID}`) },
    ...(audience ? { audience: { '@type': 'EducationalAudience', audienceType: audience } } : {}),
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      ...(schedule ? { courseSchedule: schedule } : {}),
      // Place を出していないあいだ（店舗が決まる前）は、参照先が無いので location を付けません
      ...(school.address.settled ? { location: { '@id': url(`/${PLACE_ID}`) } } : {}),
      ...(offers ? { offers } : {}),
    },
    ...(offers ? { offers } : {}),
  };
}

/** 出張健康麻雀。Service として出す */
export function serviceJsonLd() {
  if (!isPublic) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '出張健康麻雀教室 わんすぽ（One Spot）',
    serviceType: '出張健康麻雀レクリエーション',
    description:
      'デイサービスセンターや老人ホームなどの団体様へ講師がうかがい、健康麻雀のレクリエーションを行います。道具の準備・進行・片付けまでお任せいただけます。',
    url: url('/onespot'),
    provider: { '@id': url(`/${ORG_ID}`) },
    areaServed: [
      { '@type': 'City', name: '真岡市' },
      { '@type': 'AdministrativeArea', name: '栃木県' },
    ],
    offers: {
      '@type': 'Offer',
      price: '5000',
      priceCurrency: 'JPY',
      description:
        '60分5,000円（税込・定員8名）。真岡市内への出張費は一律1,000円。継続してご利用の法人様向けに月2回9,000円からの定額プランがあります。',
    },
  };
}

/** 代表 */
export function personJsonLd() {
  if (!isPublic) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: school.teacher.name,
    jobTitle: school.teacher.role,
    worksFor: { '@id': url(`/${ORG_ID}`) },
    url: url('/about'),
    image: url('/photos/teacher-portrait.jpg'),
  };
}

type ArticleArgs = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt: string;
  image?: string;
};

export function articleJsonLd({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  image,
}: ArticleArgs) {
  if (!isPublic) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: 'ja',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url(path) },
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: { '@id': url(`/${ORG_ID}`) },
    publisher: { '@id': url(`/${ORG_ID}`) },
    ...(image ? { image: url(image) } : {}),
  };
}
