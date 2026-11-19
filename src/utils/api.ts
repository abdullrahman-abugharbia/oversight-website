/**
 * The ONLY place the UI talks to the outside world.
 *
 * Still no backend of our own: the contact form POSTs straight from the browser
 * to FormSubmit, which relays the message to the inbox named in the endpoint
 * URL. Nothing server-side is ours to run or deploy, and there is no key.
 *
 * A browser cannot send email by itself — SMTP needs credentials, and anything
 * in a Vite bundle is readable by anyone who opens DevTools. The recipient
 * address is therefore public, but it is already published on the contact page.
 *
 * One-time activation: the first submission makes FormSubmit email an
 * "Activate Form" link to the inbox, and nothing is delivered until someone
 * clicks it. Until then the request fails and the form shows its error state.
 */

/** Where every contact-form enquiry is delivered. */
export const CONTACT_INBOX = 'info@oversight-sa.com';

export interface ContactPayload {
  name: string;
  phone: string;
  email: string;
  subject: string;
  reason: string;
  message: string;
  optIn: boolean;
  /**
   * Honeypot. Hidden from people, so it must arrive empty; a bot that fills
   * every field it can find trips it. Sent as FormSubmit's `_honey` field,
   * which makes FormSubmit drop the submission when it is non-empty.
   */
  botcheck?: string;
}

export interface SubmitResult {
  ok: boolean;
  reference: string;
  /** True when nothing was actually sent. */
  mocked?: boolean;
}

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_INBOX}`;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const reference = (prefix: string) => `${prefix}-${Date.now().toString().slice(-6)}`;

/**
 * Delivers the contact form to CONTACT_INBOX.
 *
 * Throws on failure. The caller MUST handle that — silently showing "we got
 * your message" when the request failed loses real enquiries.
 */
export async function submitContactForm(payload: ContactPayload): Promise<SubmitResult> {
  const res = await fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      /* FormSubmit control fields (underscore-prefixed, not shown in the email). */
      _subject: payload.subject || `رسالة جديدة من موقع Oversight — ${payload.name}`,
      /* Hitting "reply" in the inbox answers the enquirer. */
      _replyto: payload.email,
      _template: 'table',
      _captcha: 'false',
      _honey: payload.botcheck || '',
      /* Everything else is listed in the email body as-is. */
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      reason: payload.reason,
      message: payload.message,
      opted_in: payload.optIn ? 'yes' : 'no',
    }),
  });

  /* FormSubmit reports success as the string "true", not a boolean. */
  const data: { success?: boolean | string; message?: string } = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) !== 'true') {
    throw new Error(data.message ?? `FormSubmit responded ${res.status}`);
  }
  return { ok: true, reference: reference('OVS') };
}

/** Still a mock — no endpoint behind it yet. */
export async function requestInspection(serviceId: string): Promise<SubmitResult> {
  await delay(700);
  // eslint-disable-next-line no-console
  console.info('[api] inspection requested (mock)', serviceId);
  return { ok: true, reference: reference('INS'), mocked: true };
}
