import { school } from '@/data/school';

/**
 * 教室の基本情報（NAP）。
 * 表記のゆれが起きないよう、値はすべて data/school.ts から取っています。
 *
 * 店舗はまだ決まっていないので、住所は「準備中」と正直に出します。
 * 物件が決まったら school.ts に住所を足して `address.settled` を true にしてください。
 * 健康麻雀教室だけは、レンタルスペース（school.venue）を借りて開いているので、その住所を添えています。
 */
export default function SchoolInfoTable({ className = '' }: { className?: string }) {
  const rows: { th: string; td: React.ReactNode }[] = [
    { th: '名称', td: `${school.name}（${school.fullName}）` },
    {
      th: '所在地',
      td: (
        <>
          準備中
          <span className="mt-1 block text-[0.9rem] text-sumi-2">{school.address.note}</span>
          <span className="mt-2 block">{school.venue.text}</span>
          <span className="mt-1 block text-[0.95rem]">{school.venue.addressLine}</span>
        </>
      ),
    },
    { th: '活動エリア', td: `${school.address.area}を中心に活動しています` },
    {
      th: '電話番号',
      td: (
        <>
          <a
            href={school.telLink}
            className="display inline-flex min-h-11 items-center text-[1.35rem] text-midori-3 underline-offset-4 hover:underline"
          >
            {school.tel}
          </a>
          <span className="mt-1 block text-[0.9rem] text-sumi-2">
            {school.telHours.map((h) => `${h.label} ${h.value}`).join('／')}
          </span>
        </>
      ),
    },
    { th: '代表・教室長', td: `${school.teacher.name}（${school.teacher.reading}）` },
    { th: 'オープン', td: school.openingLabel },
    {
      th: '出張の曜日',
      td: `${school.onespotDays}（出張健康麻雀教室わんすぽでうかがっています）`,
    },
    { th: '営業時間', td: 'オープンにあわせてお知らせします' },
    {
      th: '設備',
      td: '全自動麻雀卓2台／自習スペース（最大16席）／談話室・休憩スペース（いずれもオープン後）',
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
