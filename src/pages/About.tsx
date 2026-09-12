import { useRef, useState } from 'react';
import { useContent } from '@/i18n/LanguageProvider';
import Button from '@/components/Button';
import SectionHeader from '@/components/SectionHeader';
import {
  PhoneIcon, ArrowLeftIcon, ArrowRightIcon, WhatsAppIcon,
  ClockIcon, BoltIcon, ShieldIcon, BuildingIcon, CheckCircleIcon,
} from '@/components/Icons';
import aboutHeroImg from '@/assets/images/hero-construction-2.webp';

import './About.css';

/* Trust-strip icons, one per pillar (experience / technology / accreditation) */
const pillarIcons = [ClockIcon, BoltIcon, ShieldIcon];

export default function About() {
  const c = useContent();
  const { aboutHero, pillars, oath, whyUs, sectors, partners, aboutCta } = c.about;
  const { contact, ctaLabels, ui } = c.site;

  const [filter, setFilter] = useState(partners.filters[0]);
  const logoTrack = useRef<HTMLUListElement>(null);

  /** Scrolls the logo rail by roughly one logo group. */
  const scrollLogos = (dir: number) => {
    const el = logoTrack.current;
    if (el) el.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };
  const visible =
    filter === partners.filters[0]
      ? partners.items
      : partners.items.filter((p) => p.category === filter);

  return (
    <>
      {/* ---------- Hero (Figma: 1440x793 dark image hero) ---------- */}
      <section className="about-hero">
        <img className="about-hero__bg" src={aboutHeroImg} alt="" />
        <div className="about-hero__scrim" />

        <div className="about-hero__inner">
          <div className="about-hero__content">
            <h1 className="about-hero__title">
              <span className="about-hero__line">{aboutHero.titleLead}</span>
              <span className="about-hero__line about-hero__accent">{aboutHero.titleAccent}</span>
              <span className="about-hero__line">{aboutHero.titleTail}</span>
            </h1>
            <p className="about-hero__body">{aboutHero.body}</p>
            <div className="about-hero__actions">
              <Button
                to="/contact"
                variant="white"
                size="lg"
                radius={0}
                className="btn--hero-white"
                iconAfter={<ArrowLeftIcon size={20} />}
              >
                {ctaLabels.bookInspection}
              </Button>
              <Button
                href={contact.phoneHref}
                variant="primary"
                size="lg"
                radius={0}
                className="btn--hero-teal"
                icon={<PhoneIcon size={20} />}
              >
                {ctaLabels.freeConsult}
              </Button>
            </div>
          </div>
        </div>

        {/* Glassmorphism trust strip overlapping the lower hero */}
        <div className="trust-strip">
          {pillars.map((p, i) => {
            const Icon = pillarIcons[i % pillarIcons.length];
            return (
              <article className="trust-card" key={p.num}>
                <div className="trust-card__text">
                  <span className="trust-card__num">{p.num}</span>
                  <h2 className="trust-card__title">{p.title}</h2>
                  <p className="trust-card__body">{p.body}</p>
                </div>
                <span className="trust-card__icon" aria-hidden>
                  <Icon size={24} />
                </span>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------- Integrity oath ---------- */}
      <section className="section oath-section">
        <div className="container container--narrow">
          <SectionHeader title={oath.title} sub={oath.sub} />
          <div className="oath">
            {oath.items.map((item) => (
              <article className={`oath__card ${item.wide ? 'oath__card--wide' : ''}`} key={item.title}>
                <div className="oath__media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="oath__body">
                  <h3 className="oath__title">{item.title}</h3>
                  <p className="oath__text">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why us (Figma: white section, gradient teal cards) ---------- */}
      <section className="section why">
        <div className="container">
          <h2 className="why__title">{whyUs.title}</h2>
          <ul className="why__grid">
            {whyUs.items.map((w) => (
              <li className={`why__card ${w.featured ? 'why__card--featured' : ''}`} key={w.title}>
                <h3 className="why__card-title">{w.title}</h3>
                <p className="why__card-body">{w.body}</p>
                <div className="why__card-media">
                  <img src={w.image} alt="" loading="lazy" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Sectors (Figma: #0d1111 dark) ---------- */}
      <section className="section sectors-section">
        <div className="container container--narrow">
          <SectionHeader title={sectors.title} tone="dark" />
          <ul className="sectors">
            {sectors.items.map((s) => (
              <li className="sector" key={s.num}>
                <img className="sector__bg" src={s.image} alt="" loading="lazy" />
                <span className="sector__scrim" aria-hidden />
                <div className="sector__inner">
                  <div className="sector__head">
                    <span className="sector__icon" aria-hidden>
                      <BuildingIcon size={24} />
                    </span>
                    <span className="sector__meta">
                      <span className="sector__num">{s.num}</span>
                      <span className="sector__code">{s.code}</span>
                    </span>
                  </div>
                  <div className="sector__foot">
                    <h3 className="sector__title">{s.title}</h3>
                    <p className="sector__body">{s.body}</p>
                    <span className="sector__tag">
                      <CheckCircleIcon size={14} />
                      {s.tag}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Partners ---------- */}
      <section className="section partners-section">
        <div className="container container--narrow">
          <SectionHeader title={partners.title} />
          <div className="partners">
            <div className="partners__filters" role="tablist" aria-label={ui.partnersFilterAria}>
              {partners.filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={f === filter}
                  className={`partners__filter ${f === filter ? 'is-active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className="partners__carousel">
              <button
                type="button"
                className="partners__arrow"
                aria-label={ui.prev}
                onClick={() => scrollLogos(-1)}
              >
                <ArrowRightIcon size={20} />
              </button>
              <ul className="partners__track" ref={logoTrack}>
                {visible.map((p) => (
                  <li className="partner" key={p.name}>
                    <img src={p.logo} alt={p.name} loading="lazy" />
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="partners__arrow"
                aria-label={ui.next}
                onClick={() => scrollLogos(1)}
              >
                <ArrowLeftIcon size={20} />
              </button>
            </div>
            {visible.length === 0 && <p className="partners__empty">{ui.partnersEmpty}</p>}
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="cta-band">
        <img className="cta-band__bg" src={aboutCta.image} alt="" loading="lazy" />
        <span className="cta-band__scrim" aria-hidden />
        <div className="container cta-band__inner">
          <h2 className="cta-band__title">{aboutCta.title}</h2>
          <p className="cta-band__body">{aboutCta.body}</p>
          <div className="cta-band__actions">
            <Button to="/contact" variant="white" size="lg" iconAfter={<ArrowLeftIcon size={20} />}>
              {aboutCta.primary}
            </Button>
            <Button
              href={contact.whatsappHref}
              target="_blank"
              rel="noreferrer"
              variant="outline"
              size="lg"
              icon={<WhatsAppIcon size={20} />}
            >
              {aboutCta.secondary}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
