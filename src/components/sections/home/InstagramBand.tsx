import Reveal from '@/components/ui/Reveal';
import { school } from '@/data/school';
import { InstagramIcon } from '@/components/ui/icons';

/**
 * Instagramへの導線。
 *
 * 埋め込みウィジェットは重く、表示も不安定なので置いていません。
 * ホームページでは伝えきれない日々の様子へ、リンクで送ります。
 */
export default function InstagramBand() {
  return (
    <section className="border-y border-usu bg-white">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-5 py-14 text-center sm:px-8 sm:py-16">
        <Reveal variant="line">
          <h2 className="display text-[1.4rem] leading-[1.6] sm:text-[1.75rem]">
            活動の様子は、
            <br className="sm:hidden" />
            Instagramでも発信しています。
          </h2>
        </Reveal>
        <Reveal variant="line" delay={90}>
          <p className="max-w-[32rem] text-[1rem] leading-[2] text-sumi-2">
            教室の準備の様子、イベントのお知らせ、日々のできごと。
            ホームページに載せきれないことは、こちらでお伝えしています。
          </p>
        </Reveal>
        <Reveal delay={160}>
          <a
            href={school.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-daidai"
          >
            <InstagramIcon className="h-5 w-5" />
            @{school.instagram.handle}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
