/**
 * アイコン。
 * 数が少ないのでライブラリを足さず、必要なぶんだけSVGで持っています。
 * 装飾なので aria-hidden。意味はそばのテキストで伝えます。
 */

type Props = { className?: string };

export function PhoneIcon({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.3 2.2Z" />
    </svg>
  );
}

export function InstagramIcon({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.1 0-3.5 0-4.8.1-1.1 0-1.7.2-2.1.3-.5.2-.9.4-1.2.8-.4.3-.6.7-.8 1.2-.1.4-.3 1-.3 2.1-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c0 1.1.2 1.7.3 2.1.2.5.4.9.8 1.2.3.4.7.6 1.2.8.4.1 1 .3 2.1.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1.1 0 1.7-.2 2.1-.3.5-.2.9-.4 1.2-.8.4-.3.6-.7.8-1.2.1-.4.3-1 .3-2.1.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c0-1.1-.2-1.7-.3-2.1-.2-.5-.4-.9-.8-1.2-.3-.4-.7-.6-1.2-.8-.4-.1-1-.3-2.1-.3-1.3-.1-1.7-.1-4.8-.1Zm0 3.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8Zm0 8.1a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm6.2-8.3a1.1 1.1 0 1 1-2.3 0 1.1 1.1 0 0 1 2.3 0Z" />
    </svg>
  );
}

export function ArrowIcon({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden className={className}>
      <path d="M4 12h15" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

export function ClockIcon({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.4 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function YenIcon({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className={className}>
      <path d="m6 4 6 8 6-8M7 13h10M7 17h10M12 12v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PeopleIcon({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7.5.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM9 12.5c-3 0-6 1.5-6 4V19h12v-2.5c0-2.5-3-4-6-4Zm7.5.5c-.6 0-1.2.1-1.7.2 1.1.9 1.7 2 1.7 3.3V19H22v-2.2c0-2-2.5-3.3-5.5-3.3Z" />
    </svg>
  );
}

/**
 * 麻雀牌のモチーフ。
 * 実際の牌の絵柄は使わず、白い札としてだけ抽象化しています。
 */
export function TileMark({
  label,
  className = '',
}: {
  /** 牌の面に置く一文字（發・中 など） */
  label: string;
  className?: string;
}) {
  return (
    <span aria-hidden className={`tile ${className}`}>
      {label}
    </span>
  );
}

export function TruckIcon({ className = '' }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden className={className}>
      <path d="M2 7h11v9H2z" strokeLinejoin="round" />
      <path d="M13 10h4l4 3.5V16h-8z" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.8" />
      <circle cx="17" cy="18" r="1.8" />
    </svg>
  );
}
