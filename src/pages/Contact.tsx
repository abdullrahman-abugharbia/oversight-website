import { useEffect, useRef, useState } from 'react';
import { useI18n } from '@/i18n/LanguageProvider';
import SectionHeader from '@/components/SectionHeader';
import {
  PhoneIcon, WhatsAppIcon, MailIcon, PinIcon, CheckCircleIcon, HeadingSwoosh,
} from '@/components/Icons';
import { mapPin } from '@/config/location';
import { submitContactForm, type ContactPayload } from '@/utils/api';
import channelsImg from '@/assets/images/img-540x366.webp';
import './Contact.css';

const channelIcons: Record<string, typeof PhoneIcon> = {
  phone: PhoneIcon,
  whatsapp: WhatsAppIcon,
  email: MailIcon,
  address: PinIcon,
};

type Errors = Partial<Record<keyof ContactPayload, string>>;

const makeEmptyForm = (defaultReason: string): ContactPayload => ({
  name: '',
  phone: '',
  email: '',
  subject: '',
  reason: defaultReason,
  message: '',
  optIn: false,
  botcheck: '',
});

export default function Contact() {
  const { c, lang } = useI18n();
  const { contactHero, channels, form, mapBlock } = c.contact;
  const { ui } = c.site;

  const [values, setValues] = useState<ContactPayload>(() => makeEmptyForm(form.reasonOptions[0]));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
  /** True when the send was a no-op because no delivery key is configured. */
  const [mocked, setMocked] = useState(false);

  /**
   * The reason dropdown stores the translated label, so switching language
   * would otherwise leave the previous language's string selected. Re-map the
   * selection to the same option index in the new language, preserving the
   * user's choice without stranding stale text in the field.
   */
  const prevOptions = useRef(form.reasonOptions);
  useEffect(() => {
    if (prevOptions.current === form.reasonOptions) return;
    const idx = prevOptions.current.indexOf(values.reason);
    prevOptions.current = form.reasonOptions;
    setValues((v) => ({ ...v, reason: form.reasonOptions[idx >= 0 ? idx : 0] }));
    // values.reason is read for the remap only; re-running on it would loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.reasonOptions]);

  const set = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = ui.form.errName;
    if (!/^0\d{9}$/.test(values.phone.trim())) next.phone = ui.form.errPhone;
    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) next.email = ui.form.errEmail;
    if (!values.message.trim()) next.message = ui.form.errMessage;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await submitContactForm(values);
      setMocked(!!res.mocked);
      setStatus('sent');
      setValues(makeEmptyForm(form.reasonOptions[0]));
    } catch (err) {
      /*
       * Never fall through to the success panel. Telling someone "an engineer
       * will call you" when the request failed loses a real enquiry silently —
       * the entry fields are kept so they can retry without retyping.
       */
      // eslint-disable-next-line no-console
      console.error('[contact] send failed', err);
      setStatus('failed');
    }
  };

  return (
    <>
      {/* Figma "Frame 167": 1440x566, centred title + swoosh, teal edge glows */}
      <section className="page-hero">
        <span className="page-hero__glow page-hero__glow--a" aria-hidden />
        <span className="page-hero__glow page-hero__glow--b" aria-hidden />
        <div className="container page-hero__inner">
          <h1 className="page-hero__title">
            <span>{contactHero.title}</span>
            <HeadingSwoosh className="page-hero__swoosh" />
          </h1>
          <p className="page-hero__body">{contactHero.body}</p>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow contact__grid">
          {/* ---------- Form ---------- */}
          <div className="form-card">
            <h2 className="form-card__title">{form.title}</h2>
            <p className="form-card__sub">{form.sub}</p>

            {status === 'sent' ? (
              <div className="form-success" role="status">
                <CheckCircleIcon size={40} />
                <h3>{ui.form.successTitle}</h3>
                <p>{ui.form.successBody}</p>
                {mocked && <p className="form-success__mock">{ui.form.mockNotice}</p>}
                <button type="button" className="form-success__again" onClick={() => setStatus('idle')}>
                  {ui.form.sendAnother}
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={onSubmit} noValidate>
                {/*
                  Honeypot: off-screen and hidden from assistive tech, so a
                  person can never fill it. Bots that populate every field do,
                  and Web3Forms discards those. tabIndex=-1 keeps it out of the
                  keyboard order.
                */}
                <input
                  type="text"
                  name="botcheck"
                  className="form__botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={values.botcheck ?? ''}
                  onChange={(e) => set('botcheck', e.target.value)}
                />

                {status === 'failed' && (
                  <p className="form__failed" role="alert">
                    {ui.form.failed}
                  </p>
                )}
                <div className="form__row">
                  <Field
                    id="name"
                    label={form.fields.name.label}
                    placeholder={form.fields.name.placeholder}
                    value={values.name}
                    error={errors.name}
                    onChange={(v) => set('name', v)}
                  />
                  <Field
                    id="phone"
                    label={form.fields.phone.label}
                    placeholder={form.fields.phone.placeholder}
                    value={values.phone}
                    error={errors.phone}
                    inputMode="tel"
                    onChange={(v) => set('phone', v)}
                  />
                </div>

                <Field
                  id="email"
                  label={form.fields.email.label}
                  placeholder={form.fields.email.placeholder}
                  value={values.email}
                  error={errors.email}
                  type="email"
                  onChange={(v) => set('email', v)}
                />

                <Field
                  id="subject"
                  label={form.fields.subject.label}
                  placeholder={form.fields.subject.placeholder}
                  value={values.subject}
                  onChange={(v) => set('subject', v)}
                />

                <div className={`field ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="message">{form.fields.message.label}</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder={form.fields.message.placeholder}
                    value={values.message}
                    onChange={(e) => set('message', e.target.value)}
                  />
                  {errors.message && <span className="field__error">{errors.message}</span>}
                </div>

                <div className="field">
                  <label htmlFor="reason">{form.fields.reason.label}</label>
                  <select
                    id="reason"
                    value={values.reason}
                    onChange={(e) => set('reason', e.target.value)}
                  >
                    {form.reasonOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={values.optIn}
                    onChange={(e) => set('optIn', e.target.checked)}
                  />
                  <span>{form.optIn}</span>
                </label>

                <button type="submit" className="form__submit" disabled={status === 'sending'}>
                  {status === 'sending' ? ui.form.sending : form.submit}
                </button>
              </form>
            )}
          </div>
          {/* ---------- Channels (Figma: one 607x981 card, r=24) ---------- */}
          <div className="channels-card">
            {channels.map((c) => {
              const Icon = channelIcons[c.id] ?? PhoneIcon;
              const body = (
                <>
                  <span className="channel__icon">
                    <Icon size={20} />
                  </span>
                  <span className="channel__text">
                    <span className="channel__label">{c.label}</span>
                    <span className="channel__value">{c.value}</span>
                    {c.note && <span className="channel__note">{c.note}</span>}
                  </span>
                </>
              );
              return c.href ? (
                <a
                  className="channel"
                  key={c.id}
                  href={c.href}
                  target={c.id === 'whatsapp' ? '_blank' : undefined}
                  rel={c.id === 'whatsapp' ? 'noreferrer' : undefined}
                >
                  {body}
                </a>
              ) : (
                <div className="channel" key={c.id}>
                  {body}
                </div>
              );
            })}

            {/* Figma: 542x368 architectural drawing closing the channels card */}
            <figure className="channels-card__media">
              <img src={channelsImg} alt="" loading="lazy" />
            </figure>
          </div>

        </div>
      </section>

      {/* ---------- Map (Figma: #ffffff) ---------- */}
      <section className="section map-section">
        <div className="container container--narrow">
          <SectionHeader title={mapBlock.title} sub={mapBlock.sub} />
          <figure className="contact-map">
            {/*
              Keyless Google Maps embed: `output=embed` needs no API key and no
              server, so the project stays frontend-only. `q=lat,lng` drops the
              marker on that exact point instead of letting Google resolve a
              place name; `hl` follows the UI language so the map's own labels
              come back in Arabic or English.
            */}
            <iframe
              title={ui.mapAlt}
              src={`https://www.google.com/maps?q=${mapPin.lat},${mapPin.lng}&hl=${lang}&z=${mapPin.zoom}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </figure>
          <a
            className="contact-map__link"
            href={`https://www.google.com/maps/search/?api=1&query=${mapPin.lat},${mapPin.lng}`}
            target="_blank"
            rel="noreferrer"
          >
            {ui.openInMaps}
          </a>
        </div>
      </section>
    </>
  );
}

/* ---------- Small field helper ---------- */

interface FieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  type?: string;
  inputMode?: 'tel' | 'text' | 'email';
  onChange: (v: string) => void;
}

function Field({ id, label, placeholder, value, error, type = 'text', inputMode, onChange }: FieldProps) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
      />
      {error && <span className="field__error">{error}</span>}
    </div>
  );
}
