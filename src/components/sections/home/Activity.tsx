import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { photos } from '@/data/photos';

/**
 * 活動のこと。
 *
 * オープン前なので「実績」を並べることはできません。
 * 実際に告知したボランティア開催と、配っているチラシだけを載せています。
 * つくり話をしないことが、いちばんの信頼になると考えました。
 */
export default function Activity() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24">
      <SectionHeading
        en="ACTIVITY"
        title="オープンの前から、まちの中で。"
        lead="オープンを前に、まちの中で健康麻雀のボランティア開催を行っています。"
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal variant="clip" className="overflow-hidden rounded-[1.5rem] border border-usu">
          <Photo
            photo={photos.flyerVolunteer}
            sizes="(min-width: 1024px) 360px, 92vw"
            quality={78}
            className="w-full object-cover"
          />
        </Reveal>

        <div>
          <Reveal>
            <div className="rounded-3xl border border-usu bg-white p-6 sm:p-8">
              <p className="text-[0.82rem] font-bold tracking-[0.14em] text-daidai">
                健康麻雀ボランティア
              </p>
              <h3 className="display mt-3 text-[1.3rem] leading-[1.6]">
                みんなで楽しく麻雀を楽しみませんか？
              </h3>
              <dl className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
                {[
                  { t: '開催日', d: '10月19日（日）' },
                  { t: '時間', d: '11:00〜12:30' },
                  { t: '場所', d: 'まちなか保健室 田町館' },
                  { t: '定員', d: '20名（満員御礼）' },
                ].map((r) => (
                  <div key={r.t} className="border-l-4 border-wakaba-2 pl-3">
                    <dt className="text-[0.82rem] text-midori-2">{r.t}</dt>
                    <dd className="display mt-0.5 text-[1.08rem]">{r.d}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[0.96rem] leading-[1.95] text-sumi-2">
                初心者の方も大歓迎。麻雀が初めての方にも分かりやすくサポートします。
                この回は定員に達しました。次回の開催はお電話またはInstagramでお知らせします。
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-6 text-[0.95rem] leading-[1.95] text-sumi-2">
              このほか、デイサービスセンターや老人ホームなどの施設へうかがう
              出張健康麻雀教室わんすぽも受け付けています。
              道具の準備から進行、片付けまでこちらで行いますので、職員様は見守りのみで大丈夫です。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
