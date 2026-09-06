import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

/**
 * 4つの名前。
 *
 * 由来についての公式な説明は資料に無いので、事実としては書きません。
 * ここに並べているのは、名前から受け取れる意味を言葉にしただけのものです
 * （デザイン上の演出であることが分かるよう、リード文でそう書いています）。
 */
const names = [
  { en: 'ACADEMIA', ja: 'あかでみあ', text: '学び続ける場所' },
  { en: 'ONE SPOT', ja: 'わんすぽ', text: '人と人が出会う場所' },
  { en: 'ONE MORE', ja: 'わんもあ', text: 'もうひとつ学んでみる' },
  { en: 'ONE QUESTION', ja: 'わんくえ', text: 'ひとつ問いを持ってみる' },
];

export default function Names() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24">
      <SectionHeading
        align="center"
        en="THE NAMES"
        title="4つの名前に、共通していること。"
        lead="ひとつの場所、もうひとつの学び、ひとつの問い。名前を並べてみると、どれも「ひとつ」から始まっています。ここに書いたのは、名前から受け取れる意味を言葉にしたものです。"
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-usu bg-usu sm:grid-cols-2 lg:grid-cols-4">
        {names.map((n, i) => (
          <Reveal as="li" key={n.en} delay={i * 90} className="bg-kinari px-6 py-9 text-center">
            <p className="eyebrow text-daidai">{n.en}</p>
            <p className="display mt-4 text-[1.35rem] text-midori-3">{n.ja}</p>
            <p className="mt-3 text-[0.95rem] leading-[1.9] text-sumi-2">{n.text}</p>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={380}>
        <p className="mx-auto mt-10 max-w-[34rem] text-center text-[1.05rem] leading-[2] text-sumi-2">
          遊ぶ。学ぶ。考える。つながる。
          <br />
          どれも、ひとりでは始まらないことばかりです。
        </p>
      </Reveal>
    </section>
  );
}
