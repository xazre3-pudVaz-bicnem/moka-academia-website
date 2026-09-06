import { yen, type PriceRow } from '@/data/pricing';
import Reveal from './Reveal';

/**
 * 料金の一覧。
 *
 * 表ではなく行の並びで見せています。
 * スマートフォンで横スクロールが出ないこと、数字が大きく読めることを優先しました。
 */
export default function PriceList({
  rows,
  notes,
  className = '',
}: {
  rows: PriceRow[];
  notes?: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <dl className="divide-y divide-usu border-y border-usu">
        {rows.map((row, i) => (
          <Reveal as="div" key={`${row.label}-${row.note ?? i}`} delay={Math.min(i, 6) * 45}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-4">
              <dt className="flex flex-wrap items-baseline gap-x-3">
                <span className={`display text-[1.05rem] ${row.highlight ? 'text-daidai' : ''}`}>
                  {row.label}
                </span>
                {row.note && <span className="text-[0.9rem] text-sumi-2">{row.note}</span>}
              </dt>
              <dd className="flex items-baseline gap-2">
                {row.wasYen && (
                  <span className="text-[0.9rem] text-sumi-2 line-through">{yen(row.wasYen)}</span>
                )}
                <span className="display text-[1.5rem] leading-none text-midori-3">
                  {row.yen !== undefined ? yen(row.yen) : 'お問い合わせください'}
                </span>
                {row.unit && <span className="text-[0.92rem] text-sumi-2">{row.unit}</span>}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>

      {notes && notes.length > 0 && (
        <ul className="mt-5 space-y-1.5 text-[0.92rem] leading-[1.85] text-sumi-2">
          {notes.map((n) => (
            <li key={n} className="pl-[1.2em] -indent-[1.2em]">
              ※ {n}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
