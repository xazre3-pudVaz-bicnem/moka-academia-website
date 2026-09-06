import { school } from '@/data/school';

/**
 * 教室の基本情報（NAP）。
 * 表記のゆれが起きないよう、値はすべて data/school.ts から取っています。
 */
export default function SchoolInfoTable({ className = '' }: { className?: string }) {
  const rows: { th: string; td: React.ReactNode }[] = [
    { th: '名称', td: `${school.name}（${school.fullName}）` },
    {
      th: '所在地',
      td: (
        <>
          {school.address.full}
          <span className="mt-1 block text-[0.9rem] text-sumi-2">
            番地の詳細は確認中です。お越しの際はお電話でお尋ねください。
          </span>
        </>
      ),
    },
    {
      th: '電話番号',
      td: (
        <>
          <a href={school.telLink} className="display inline-flex min-h-11 items-center text-[1.35rem] text-midori-3 underline-offset-4 hover:underline">
            {school.tel}
          </a>
          <span className="mt-1 block text-[0.9rem] text-sumi-2">
            {school.telHours.map((h) => `${h.label} ${h.value}`).join('／')}
          </span>
        </>
      ),
    },
    { th: '代表・教室長', td: `${school.teacher.name}（${school.teacher.reading}）` },
    { th: '定休日', td: `${school.closedDays}（出張健康麻雀にうかがう日にしています）` },
    {
      th: '営業時間',
      td: (
        <>
          確認中
          <span className="mt-1 block text-[0.9rem] text-sumi-2">
            フリータイムの時間帯は{school.freeTimeHours}です。詳しい営業時間はお問い合わせください。
          </span>
        </>
      ),
    },
    { th: 'オープン', td: school.openingLabel },
    {
      th: '設備',
      td: '全自動麻雀卓2台／自習スペース（最大16席）／談話室・休憩スペース',
    },
    {
      th: 'Instagram',
      td: (
        <a
          href={school.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-midori-3 underline underline-offset-4"
        >
          @{school.instagram.handle}
        </a>
      ),
    },
    {
      th: '事業',
      td: '健康麻雀教室ぽかぽかあかでみあ／出張健康麻雀教室わんすぽ／英語多読塾わんもあ／哲学塾わんくえ',
    },
  ];

  return (
    <dl className={`divide-y divide-usu border-y border-usu ${className}`}>
      {rows.map((r) => (
        <div key={r.th} className="grid gap-1 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6 sm:py-5">
          <dt className="display text-[0.95rem] text-midori-3">{r.th}</dt>
          <dd className="text-[1rem] leading-[1.9]">{r.td}</dd>
        </div>
      ))}
    </dl>
  );
}
