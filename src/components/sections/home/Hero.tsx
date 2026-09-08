import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import { photos } from '@/data/photos';
import { school } from '@/data/school';
import { ArrowIcon, PhoneIcon } from '@/components/ui/icons';

/**
 * トップのヒーロー。
 *
 * 写真を大きく出し、「雀荘ではない」ことが一目で分かるようにしています。
 * h1 には「真岡」「健康麻雀教室」「ぽかぽかあかでみあ」を自然な形で入れています。
 *
 * アニメーションはCSSのみ（reveal ではなく hero-fade）。
 * 最初の描画で見える範囲なので、JSの実行を待たせないためです。
 */
export default function Hero() {
  return (
    <section className="paper relative overflow-hidden">
      {/* 背景の弧。若草色をごく薄く敷いて、紙に絵の具を置いたような地にする */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full bg-wakaba/12 blur-[2px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-72 h-[22rem] w-[22rem] rounded-full bg-yamabuki/12"
      />

      {/*
        並び順について。
        スマートフォンでは「見出し → 写真 → 説明文 → ボタン」の順で見せたいので、
        3つのブロックに分けて order で並べ替えています。
        画面が広いときは、左に文章・右に写真の2段組みに置き直します。
      */}
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32 lg:grid-cols-[1.02fr_0.98fr] lg:gap-x-14 lg:gap-y-6 lg:pb-24 lg:pt-36">
        <div className="order-1 lg:col-start-1 lg:row-start-1">
          <p className="hero-fade flex flex-wrap items-center gap-2 text-[0.82rem]">
            <span className="rounded-full bg-daidai px-3.5 py-1.5 font-bold text-white">
              {school.openingLabel}
            </span>
            <span className="rounded-full border border-midori/30 px-3.5 py-1.5 text-midori-3">
              栃木県真岡市
            </span>
          </p>

          <h1 className="hero-fade display mt-6 text-[2.05rem] leading-[1.42] sm:text-[2.75rem] lg:text-[3rem]" style={{ ['--hero-delay' as string]: '0.1s' }}>
            いくつになっても、
            <br />
            <span className="handline">学ぶっておもしろい。</span>
          </h1>
        </div>

        {/* 写真。大きい1枚に小さい1枚を重ねて、教室の空気と場所の両方を見せる */}
        <div
          className="hero-fade order-2 relative mb-6 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mb-0 lg:self-center"
          style={{ ['--hero-delay' as string]: '0.16s' }}
        >
          <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_18px_50px_-24px_rgba(44,40,34,0.45)]">
            <Photo
              photo={photos.onespotScene}
              sizes="(min-width: 1024px) 560px, 92vw"
              priority
              quality={78}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-8 -left-2 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-lg sm:-left-6 sm:w-48">
            <Photo
              photo={photos.spaceMahjong}
              sizes="192px"
              quality={78}
              className="h-full w-full object-cover"
            />
          </div>

          <p className="speech absolute -right-1 -top-6 max-w-[13rem] text-[0.88rem] leading-[1.7] sm:-right-4">
            初心者の方も
            <br />
            <strong className="text-daidai">大歓迎です。</strong>
          </p>
        </div>

        <div className="order-3 lg:col-start-1 lg:row-start-2">
          <p
            className="hero-fade mt-6 max-w-[34rem] text-[1.05rem] leading-[2.05] text-sumi-2"
            style={{ ['--hero-delay' as string]: '0.2s' }}
          >
            真岡の健康麻雀教室 ぽかぽかあかでみあは、
            お酒を飲まない・タバコを吸わない・お金を賭けない
            <strong className="marker font-bold text-sumi">健康麻雀</strong>
            の教室です。
            牌を触ったことがない方から、小学生からシニアまで、同じ卓を囲みます。
          </p>

          <p
            className="hero-fade mt-4 max-w-[34rem] text-[0.98rem] leading-[1.95] text-sumi-2"
            style={{ ['--hero-delay' as string]: '0.26s' }}
          >
            健康麻雀のほかに、施設へうかがう
            <Link href="/onespot" className="text-midori-3 underline underline-offset-4">
              出張健康麻雀わんすぽ
            </Link>
            、
            <Link href="/onemore" className="text-midori-3 underline underline-offset-4">
              英語多読塾わんもあ
            </Link>
            、
            <Link href="/onequestion" className="text-midori-3 underline underline-offset-4">
              哲学塾わんくえ
            </Link>
            も。遊ぶ、学ぶ、考える、つながる。真岡の小さな学び舎です。
          </p>

          <div
            className="hero-fade mt-9 flex flex-wrap items-center gap-3"
            style={{ ['--hero-delay' as string]: '0.34s' }}
          >
            <Link href="/beginner" className="btn btn-midori">
              はじめての方へ
              <ArrowIcon className="h-5 w-5" />
            </Link>
            <a href={school.telLink} className="btn btn-daidai">
              <PhoneIcon className="h-5 w-5" />
              {school.tel}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
