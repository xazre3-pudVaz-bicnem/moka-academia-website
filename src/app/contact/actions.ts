'use server';

import { school } from '@/data/school';
import { SUBJECTS } from './subjects';

/**
 * お問い合わせフォームの送信処理。
 *
 * メール配信の契約が決まっていないので、送信先は環境変数 CONTACT_WEBHOOK_URL に
 * JSON を POST するだけにしています。
 * Formspree / Google Apps Script / Slack の Incoming Webhook など、
 * あとから決めたサービスのURLを入れれば、そのまま動きます。
 *
 * スパム対策は3つ:
 *  1. ハニーポット（人には見えない入力欄。埋まっていたら弾く）
 *  2. 送信までの時間（3秒未満は自動送信とみなす）
 *  3. 文字数の上限（長すぎる本文を弾く）
 * CAPTCHA は入れていません。高齢の方も使うフォームなので、
 * 目や手の負担になるものは最後の手段にしたいからです。
 */

export type ContactState = {
  status: 'idle' | 'ok' | 'error';
  message?: string;
  /** 入力のやり直しに備えて値を返す（React 19 のフォームは送信時に入力を消すため） */
  values?: {
    name: string;
    kana: string;
    contact: string;
    subject: string;
    body: string;
  };
  /** defaultValue の再適用のために使う。値が変わるたびに key を変える */
  attempt: number;
};

export const initialContactState: ContactState = { status: 'idle', attempt: 0 };

export async function submitContact(
  prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const attempt = prev.attempt + 1;
  const get = (k: string) => String(formData.get(k) ?? '').trim();

  const values = {
    name: get('name'),
    kana: get('kana'),
    contact: get('contact'),
    subject: get('subject'),
    body: get('body'),
  };

  const fail = (message: string): ContactState => ({ status: 'error', message, values, attempt });

  // 1. ハニーポット
  if (get('website')) {
    // 何も言わずに成功したように見せる（ボットに学習させないため）
    return { status: 'ok', attempt };
  }

  // 2. 送信までの時間
  const startedAt = Number(formData.get('startedAt'));
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < 3000) {
    return fail('送信が早すぎたようです。もう一度「送信する」を押してください。');
  }

  // 3. 入力のチェック
  if (!values.name) return fail('お名前をご記入ください。');
  if (values.name.length > 60) return fail('お名前が長すぎます。');
  if (!values.contact) return fail('お電話番号またはメールアドレスをご記入ください。');
  if (values.contact.length > 120) return fail('ご連絡先が長すぎます。');
  if (!values.body) return fail('お問い合わせの内容をご記入ください。');
  if (values.body.length > 2000) return fail('お問い合わせの内容が長すぎます（2000文字まで）。');
  if (values.subject && !(SUBJECTS as readonly string[]).includes(values.subject)) {
    return fail('お問い合わせの種類をお選びください。');
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!endpoint) {
    return fail(
      `ただいまフォームからの送信を準備しています。お手数ですが、お電話（${school.tel}）またはInstagramからご連絡ください。`,
    );
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        site: school.name,
        receivedAt: new Date().toISOString(),
        ...values,
      }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch {
    return fail(
      `送信できませんでした。お手数ですが、お電話（${school.tel}）でご連絡いただけますでしょうか。`,
    );
  }

  return { status: 'ok', attempt };
}
