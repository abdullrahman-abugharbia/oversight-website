/**
 * The ONLY place the UI talks to the outside world.
 *
 * Still no backend of our own: the contact form POSTs straight from the browser
 * to Web3Forms, which relays the message to the inbox registered against the
 * access key. Nothing server-side is ours to run or deploy.
 *
 * A browser cannot send email by itself — SMTP needs credentials, and anything
 * in a Vite bundle is readable by anyone who opens DevTools. The access key
 * below is *deliberately* public: it only authorises "deliver a message to the
 * address that owns this key", so leaking it lets someone spam that inbox, not
 * read it or send as it. Turn on Web3Forms' captcha/domain restrictions if that
 * becomes a problem.
 */

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
   * every field it can find trips it. Web3Forms drops the submission when
   * `botcheck` is truthy. Free-plan spam protection — reCaptcha/Turnstile are
   * paid add-ons.
   */
  botcheck?: string;
}

export interface SubmitResult {
  ok: boolean;
  reference: string;
  /** True when no key was configured and nothing was actually sent. */
  mocked?: boolean;
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const reference = (prefix: string) => `${prefix}-${Date.now().toString().slice(-6)}`;

/**
 * Delivers the contact form to the inbox behind VITE_WEB3FORMS_KEY.
 *
 * Throws on failure. The caller MUST handle that — silently showing "we got
 * your message" when the request failed loses real enquiries.
 */
export async function submitContactForm(payload: ContactPayload): Promise<SubmitResult> {
  if (!accessKey) {
    // eslint-disable-next-line no-console
    console.warn(
      '[api] VITE_WEB3FORMS_KEY is not set — running in mock mode. NO email is being sent. ' +
        'Copy .env.example to .env and add your key.',
    );
    await delay(900);
    return { ok: true, reference: reference('OVS'), mocked: true };
  }

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      /*
       * Envelope fields. The RECIPIENT is not settable here — Web3Forms binds
       * it to the inbox that registered the access key, deliberately, so a
       * public key can't be repointed at someone else. Changing who receives
       * enquiries means generating a new key against that address.
       */
      subject: payload.subject || `رسالة جديدة من موقع Oversight — ${payload.name}`,
      from_name: payload.name,
      email: payload.email,
      /* Hitting "reply" in the inbox answers the enquirer, not Web3Forms. */
      replyto: payload.email,
      /* Everything else is listed in the email body as-is. */
      name: payload.name,
      phone: payload.phone,
      reason: payload.reason,
      message: payload.message,
      opted_in: payload.optIn ? 'yes' : 'no',
      botcheck: payload.botcheck || '',
    }),
  });

  const data: { success?: boolean; message?: string } = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message ?? `Web3Forms responded ${res.status}`);
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
