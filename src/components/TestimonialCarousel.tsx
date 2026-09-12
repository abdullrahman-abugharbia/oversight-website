import { useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';
import type { Testimonial } from '@/data/testimonials';
import { useI18n } from '@/i18n/LanguageProvider';
import './TestimonialCarousel.css';

interface Props {
  items: Testimonial[];
}

export default function TestimonialCarousel({ items }: Props) {
  const { dir, c } = useI18n();
  const { ui } = c.site;
  const [index, setIndex] = useState(0);
  const go = (delta: number) => setIndex((i) => (i + delta + items.length) % items.length);

  /**
   * The track is shifted with `margin-inline-start`, not `translateX`.
   * translateX(+N%) is only correct in RTL — in LTR it pushes the slides the
   * wrong way and the viewport shows blank. `margin-inline-start` is
   * direction-aware, so one value is correct in both RTL and LTR.
   */
  const shift = { marginInlineStart: `calc(${-index} * (var(--tst-card) + var(--tst-gap)))` };

  /* "Previous" points toward the start of the reading direction. */
  const PrevIcon = dir === 'rtl' ? ArrowRightIcon : ArrowLeftIcon;
  const NextIcon = dir === 'rtl' ? ArrowLeftIcon : ArrowRightIcon;

  return (
    <div className="tst">
      <div className="tst__viewport">
        <ul className="tst__track">
          {items.map((t, i) => (
            <li className="tst__slide" key={t.id} style={i === 0 ? shift : undefined} aria-hidden={i !== index}>
              <figure className="tst__card">
                <span className="tst__quote-mark" aria-hidden>
                  &rdquo;
                </span>
                <blockquote className="tst__quote">{t.quote}</blockquote>
                <figcaption className="tst__person">
                  <span className="tst__avatar" aria-hidden />
                  <span className="tst__meta">
                    <span className="tst__name">{t.name}</span>
                    <span className="tst__city">{t.city}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="tst__controls">
        <button type="button" onClick={() => go(-1)} aria-label={ui.prev}>
          <PrevIcon size={20} />
        </button>
        <ul className="tst__dots">
          {items.map((t, i) => (
            <li key={t.id}>
              <button
                type="button"
                className={i === index ? 'is-active' : ''}
                aria-label={`${ui.testimonialNth} ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
              />
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => go(1)} aria-label={ui.next}>
          <NextIcon size={20} />
        </button>
      </div>
    </div>
  );
}
