import { useState } from 'react';
import Button from '@/components/Button';
import { useContent, useI18n } from '@/i18n/LanguageProvider';
import SectionHeader from '@/components/SectionHeader';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import {
  ArrowLeftIcon, ArrowRightIcon, WhatsAppIcon, CheckCircleIcon,
  BuildingIcon, MoneyIcon, WarningIcon, ClockIcon, HeadingSwoosh,
} from '@/components/Icons';

/** Maps the Figma icon name on each stat to its component.
    Keyed loosely because the content tree widens the literal union to string. */
const statIcons: Record<string, typeof ClockIcon> = {
  building: BuildingIcon,
  money: MoneyIcon,
  warning: WarningIcon,
  clock: ClockIcon,
};
import ctaBg from '@/assets/images/cta-bg.webp';
import './Work.css';

export default function Work() {
  const { dir } = useI18n();
  const c = useContent();
  const [caseIndex, setCaseIndex] = useState(0);

  /* "Previous" points toward the start of the reading direction. */
  const PrevIcon = dir === 'rtl' ? ArrowRightIcon : ArrowLeftIcon;
  const NextIcon = dir === 'rtl' ? ArrowLeftIcon : ArrowRightIcon;

  const { workHero, impact, caseHeader, caseStudies, workCta } = c.work;
  const { testimonials, testimonialsTitle } = c.testimonials;
  const { contact, ui } = c.site;

  return (
    <>
      {/* ---------- Hero + impact (Figma: one #020a0c block, 1440x1278) ---------- */}
      <section className="work-hero">
        <div className="work-hero__glow work-hero__glow--a" aria-hidden />
        <div className="work-hero__glow work-hero__glow--b" aria-hidden />
        <div className="work-hero__scrim" aria-hidden />

        <div className="container work-hero__inner">
          <h1 className="work-hero__title">
            <span>{workHero.title}</span>
            <HeadingSwoosh className="work-hero__swoosh work-hero__swoosh--title" />
          </h1>
          <p className="work-hero__body">{workHero.body}</p>

          <h2 className="impact__title">
            <span>{impact.title}</span>
            <HeadingSwoosh className="work-hero__swoosh work-hero__swoosh--impact" />
          </h2>

          <ul className="impact__grid">
            {impact.stats.map((s) => {
              const Icon = statIcons[s.icon] ?? ClockIcon;
              return (
                <li className="impact__card" key={s.label}>
                  <span className="impact__icon">
                    <Icon size={56} />
                  </span>
                  <span className="impact__figure">
                    {s.prefix && <span className="impact__prefix">{s.prefix}</span>}
                    <span className="impact__value">{s.value}</span>
                  </span>
                  <span className="impact__label">{s.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ---------- Case studies (Figma: 900x635 cards in a slider) ---------- */}
      <section className="section cases-section">
        <div className="container container--narrow">
          <header className="cases__head">
            <h2 className="cases__title">{caseHeader.title}</h2>
            <p className="cases__sub">{caseHeader.sub}</p>
          </header>

          <div className="cases">
            <div className="cases__viewport">
              <ul className="cases__track">
                {caseStudies.map((c, i) => (
                  <li
                    className="case"
                    key={c.id}
                    aria-hidden={i !== caseIndex}
                    style={i === 0 ? { marginInlineStart: `calc(${-caseIndex} * (var(--case-w) + var(--case-gap)))` } : undefined}
                  >
                    <div className="case__body">
                      <ul className="case__tags">
                        {c.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <h3 className="case__title">{c.title}</h3>
                      <ul className="case__points">
                        {c.points.map((p) => (
                          <li key={p}>
                            <CheckCircleIcon size={18} />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="case__value">
                        <span className="case__value-label">{c.valueLabel}</span>
                        <strong className="case__value-num">{c.value}</strong>
                        <span className="case__value-note">{c.valueNote}</span>
                      </div>
                    </div>
                    <div className="case__media">
                      <img src={c.image} alt={c.title} loading="lazy" />
                      <span className="case__media-scrim" aria-hidden />
                    </div>
                  </li>
                ))}
              </ul>
              <span className="cases__fade" aria-hidden />
            </div>

            <div className="cases__controls">
              <button
                type="button"
                className="cases__arrow"
                aria-label={ui.prev}
                onClick={() => setCaseIndex((i) => (i - 1 + caseStudies.length) % caseStudies.length)}
              >
                <PrevIcon size={20} />
              </button>
              <ul className="cases__dots">
                {caseStudies.map((c, i) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      className={i === caseIndex ? 'is-active' : ''}
                      aria-label={`${ui.testimonialNth} ${i + 1}`}
                      aria-current={i === caseIndex}
                      onClick={() => setCaseIndex(i)}
                    />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="cases__arrow cases__arrow--primary"
                aria-label={ui.next}
                onClick={() => setCaseIndex((i) => (i + 1) % caseStudies.length)}
              >
                <NextIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Testimonials ---------- */}
      <section className="section testimonials-section">
        <div className="container container--narrow">
          <SectionHeader title={testimonialsTitle} tone="dark" />
          <div className="tst-wrap">
            <TestimonialCarousel items={testimonials} />
          </div>
        </div>
      </section>

      {/* ---------- CTA (Figma: 1440x434 image + gradient) ---------- */}
      <section className="work-cta">
        <img className="work-cta__bg" src={ctaBg} alt="" />
        <span className="work-cta__scrim" aria-hidden />
        <div className="container container--narrow work-cta__inner">
          <h2 className="work-cta__title">{workCta.title}</h2>
          <p className="work-cta__body">{workCta.body}</p>
          <div className="work-cta__actions">
            <Button to="/contact" variant="primary" size="lg" radius={16} iconAfter={<ArrowLeftIcon size={20} />}>
              {workCta.primary}
            </Button>
            <Button
              href={contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              size="lg"
              radius={16}
              icon={<WhatsAppIcon size={20} />}
            >
              {workCta.secondary}
            </Button>
          </div>
          <ul className="work-cta__badges">
            {workCta.badges.map((b) => (
              <li key={b}>
                <CheckCircleIcon size={18} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
