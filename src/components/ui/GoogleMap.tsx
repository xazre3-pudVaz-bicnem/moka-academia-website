import { school } from '@/data/school';

/**
 * 地図。
 *
 * 番地までは資料で確認できていないので、施設名でのキーワード検索を埋め込んでいます。
 * APIキーの要らない埋め込み方式を使い、loading="lazy" で初期表示を軽くしています。
 */
export default function GoogleMap({ className = '' }: { className?: string }) {
  const q = encodeURIComponent(school.address.mapQuery);
  return (
    <div className={`map-frame overflow-hidden rounded-3xl border border-usu bg-kinari-2 ${className}`}>
      <iframe
        title={`${school.name}（${school.address.building}）の地図`}
        src={`https://maps.google.com/maps?q=${q}&hl=ja&z=16&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[320px] w-full border-0 sm:h-[400px]"
        allowFullScreen
      />
    </div>
  );
}
