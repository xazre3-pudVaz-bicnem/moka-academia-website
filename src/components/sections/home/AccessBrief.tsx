import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { photos } from '@/data/photos';
import { school } from '@/data/school';
import { ArrowIcon, PhoneIcon, PinIcon } from '@/components/ui/icons';

/**
 * 開校のお知らせ。
 *
 * まだ店舗を持っていないので、住所も地図も出しません。
 * 場所が決まったら、ここに地図とアクセス情報が戻ります。
 */
export default function AccessBrief() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div>
          <SectionHeading
            en="OPENING"
            title={
              <>
                真岡に、
                <br />
                まもなく開きます。
              </>
            }
            lead={`健康麻雀教室ぽかぽかあかでみあは、${school.openingLabel}です。栃木県真岡市を中心に活動しています。`}
          />

          <Reveal delay={200}>
            <dl className="mt-8 space-y-5">
              <div className="flex gap-3">
                <PinIcon className="mt-1 h-5 w-5 shrink-0 text-midori-2" />
                <div>
                  <dt className="text-[0.85rem] text-midori-2">場所</dt>
                  <dd className="mt-1 text-[1rem] leading-[1.9]">
                    準備中
                    <span className="mt-1 block text-[0.93rem] text-sumi-2">
                      {school.address.note}
                    </span>
                    <span className="mt-2 block">{school.venue.text}</span>
                    <span className="mt-1 block text-[0.95rem]">{school.venue.addressLine}</span>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <PhoneIcon className="mt-1 h-5 w-5 shrink-0 text-midori-2" />
                <div>
                  <dt className="text-[0.85rem] text-midori-2">電話</dt>
                  <dd className="mt-1">
                    <a
                      href={school.telLink}
                      className="display inline-flex min-h-11 items-center text-[1.5rem] text-midori-3 underline-offset-4 hover:underline"
                    >
                      {school.tel}
                    </a>
                    <span className="mt-1 block text-[0.88rem] text-sumi-2">
                      {school.telHours.map((h) => `${h.label} ${h.value}`).join('／')}
                    </span>
                  </dd>
                </div>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-8 rounded-2xl bg-yamabuki-2/50 px-6 py-5 text-[0.96rem] leading-[1.95]">
              オープンまでのあいだも、出張健康麻雀教室わんすぽと、
              まちの中での健康麻雀ボランティアは行っています。
              日程はお電話またはInstagramでお知らせしています。
            </p>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-7">
              <Link href="/access" className="arrow-link text-midori-3">
                教室のご案内・開校のお知らせ
                <ArrowIcon className="h-5 w-5" />
              </Link>
            </p>
          </Reveal>
        </div>

        <Reveal variant="clip" className="overflow-hidden rounded-[1.75rem]">
          <Photo
            photo={photos.spaceLounge}
            sizes="(min-width: 1024px) 520px, 92vw"
            className="aspect-[4/3] w-full object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
