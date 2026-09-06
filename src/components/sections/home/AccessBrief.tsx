import Link from 'next/link';
import GoogleMap from '@/components/ui/GoogleMap';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { school } from '@/data/school';
import { ArrowIcon, PhoneIcon, PinIcon } from '@/components/ui/icons';

export default function AccessBrief() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-18 sm:px-8 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <SectionHeading
            en="ACCESS"
            title={
              <>
                真岡市田町、
                <br />
                まちなか保健室 田町館。
              </>
            }
            lead="健康麻雀教室ぽかぽかあかでみあは、栃木県真岡市田町の「まちなか保健室 田町館」にあります。"
          />

          <Reveal delay={200}>
            <dl className="mt-8 space-y-5">
              <div className="flex gap-3">
                <PinIcon className="mt-1 h-5 w-5 shrink-0 text-midori-2" />
                <div>
                  <dt className="text-[0.85rem] text-midori-2">所在地</dt>
                  <dd className="mt-1 text-[1rem] leading-[1.9]">{school.address.full}</dd>
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
            <p className="mt-8">
              <Link href="/access" className="arrow-link text-midori-3">
                アクセス・教室のご案内
                <ArrowIcon className="h-5 w-5" />
              </Link>
            </p>
          </Reveal>
        </div>

        <Reveal variant="clip">
          <GoogleMap />
        </Reveal>
      </div>
    </section>
  );
}
