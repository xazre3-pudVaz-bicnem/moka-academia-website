'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { initialContactState, submitContact } from './actions';
import { SUBJECTS } from './subjects';

/**
 * お問い合わせフォーム。
 *
 * React 19 のフォームは action を実行すると入力欄が初期化されます。
 * エラーで戻ってきたときに全部消えるのを防ぐため、
 * サーバー側から値と attempt を返し、defaultValue + key で書き戻しています。
 *
 * 高齢の方も使うので、入力欄の高さとラベルの文字は大きめにしています。
 */
export default function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialContactState);
  const okRef = useRef<HTMLParagraphElement>(null);

  /*
   * ページを開いた時刻。自動送信を見分けるために使います。
   * hidden の値としてレンダリングするとサーバーとクライアントで食い違うので、
   * ref に持っておいて、送信するときに FormData へ足しています。
   */
  const startedAt = useRef(0);

  // 画面が出た時刻を控える（レンダリング中に Date.now() は呼べないため、効果の中で入れる）
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // 送信できたら、その知らせにフォーカスを移す
  useEffect(() => {
    if (state.status === 'ok') okRef.current?.focus();
  }, [state.status, state.attempt]);

  if (state.status === 'ok') {
    return (
      <p
        ref={okRef}
        tabIndex={-1}
        className="rounded-3xl border-2 border-wakaba bg-white p-8 text-[1.05rem] leading-[2]"
      >
        お問い合わせをお送りしました。ありがとうございます。
        <br />
        できるだけ早くご連絡いたします。お急ぎの場合は、お電話でもご連絡ください。
      </p>
    );
  }

  const v = state.values;

  return (
    <form
      action={(formData: FormData) => {
        formData.set('startedAt', String(startedAt.current));
        return formAction(formData);
      }}
      className="space-y-6"
      noValidate
    >
      {/* ハニーポット。人には見えない欄なので、埋まっていたらボットと判断します */}
      <div aria-hidden className="absolute h-px w-px overflow-hidden opacity-0" style={{ left: '-9999px' }}>
        <label htmlFor="website">ホームページ（入力しないでください）</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === 'error' && state.message && (
        <p role="alert" className="rounded-2xl border-2 border-daidai bg-white px-5 py-4 text-[0.98rem] leading-[1.9]">
          {state.message}
        </p>
      )}

      <Field
        id="name"
        label="お名前"
        required
        defaultValue={v?.name}
        attempt={state.attempt}
        autoComplete="name"
      />
      <Field
        id="kana"
        label="ふりがな"
        defaultValue={v?.kana}
        attempt={state.attempt}
        autoComplete="off"
      />
      <Field
        id="contact"
        label="お電話番号またはメールアドレス"
        required
        defaultValue={v?.contact}
        attempt={state.attempt}
        autoComplete="tel"
        hint="お返事をお送りする先です。どちらか一方で構いません。"
      />

      <div>
        <label htmlFor="subject" className="display block text-[1rem]">
          お問い合わせの種類
        </label>
        <select
          id="subject"
          name="subject"
          key={`subject-${state.attempt}`}
          defaultValue={v?.subject ?? SUBJECTS[0]}
          className="mt-2 min-h-13 w-full rounded-2xl border-2 border-usu bg-white px-4 py-3 text-[1rem] focus:border-midori"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="body" className="display block text-[1rem]">
          お問い合わせの内容
          <span className="ml-2 rounded-full bg-daidai px-2.5 py-0.5 text-[0.72rem] text-white">必須</span>
        </label>
        <textarea
          id="body"
          name="body"
          required
          rows={7}
          maxLength={2000}
          key={`body-${state.attempt}`}
          defaultValue={v?.body}
          className="mt-2 w-full rounded-2xl border-2 border-usu bg-white px-4 py-3 text-[1rem] leading-[1.9] focus:border-midori"
        />
      </div>

      <SubmitButton />

      <p className="text-[0.9rem] leading-[1.85] text-sumi-2">
        いただいた内容は、お問い合わせへのお返事のためだけに使います。
        お急ぎの場合は、お電話がいちばん早くつながります。
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  defaultValue,
  attempt,
  autoComplete,
  hint,
}: {
  id: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
  attempt: number;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="display block text-[1rem]">
        {label}
        {required && (
          <span className="ml-2 rounded-full bg-daidai px-2.5 py-0.5 text-[0.72rem] text-white">必須</span>
        )}
      </label>
      {hint && <p className="mt-1 text-[0.88rem] text-sumi-2">{hint}</p>}
      <input
        id={id}
        name={id}
        type="text"
        required={required}
        autoComplete={autoComplete}
        key={`${id}-${attempt}`}
        defaultValue={defaultValue}
        className="mt-2 min-h-13 w-full rounded-2xl border-2 border-usu bg-white px-4 py-3 text-[1rem] focus:border-midori"
      />
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-midori w-full disabled:opacity-60">
      {pending ? '送信しています…' : '送信する'}
    </button>
  );
}
