import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import SectionHeader from '@/components/SectionHeader';
import DiagnosticSelector from '@/components/DiagnosticSelector';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import Accordion from '@/components/Accordion';
import { PhoneIcon, ArrowLeftIcon, WhatsAppIcon, PinIcon } from '@/components/Icons';
import { useContent } from '@/i18n/LanguageProvider';
import mapImg from '@/assets/images/map-placeholder.webp';
import { mapPin } from '@/config/location';
import './Home.css';

export default function Home() {
  const c = useContent();
  const {
    hero, aboutBlock, stats, diagnosticHeader, diagnostics, stepsHeader, steps,
    detailedHeader, detailedServices, demo, labHeader, devices, mapCta,
  } = c.home;
  const { testimonials, testimonialsTitle } = c.testimonials;
  const { faqItems, faqHeader } = c.faq;
  const { contact, ctaLabels, ui } = c.site;

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <img className="hero__bg" src={hero.image} alt="" />
        <div className="hero__scrim" />
        <div className="hero__inner">
          <div className="hero__content">
            <h1 className="hero__title">
              {hero.titleLead} <span className="hero__accent">{hero.titleAccent}</span> {hero.titleTail}
            </h1>
            <p className="hero__body">{hero.body}</p>
            <div className="hero__actions">
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
      </section>

      {/* ---------- About + stats ---------- */}
      <section className="section about-block">
        <div className="container about-block__grid">
          <div className="about-block__intro">
            <span className="eyebrow">{aboutBlock.eyebrow}</span>
            <h2 className="about-block__title">{aboutBlock.title}</h2>
          </div>
          <div className="about-block__copy">
            {aboutBlock.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <Link to="/about" className="about-block__more">
              {aboutBlock.more}
              <ArrowLeftIcon size={18} />
            </Link>
          </div>
        </div>

        <div className="container stats">
          {stats.map((s) => (
            <article className="stats__item" key={s.value}>
              <span className="stats__value">{s.value}</span>
              <p className="stats__label">{s.label}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- Interactive diagnostic ---------- */}
      <section className="section diag-section">
        <div className="container">
          <SectionHeader title={diagnosticHeader.title} sub={diagnosticHeader.sub} />
          <div className="diag-wrap">
            <DiagnosticSelector items={diagnostics} />
          </div>
        </div>
      </section>

      {/* ---------- 4 steps ---------- */}
      <section className="section steps-section">
        <div className="container">
          <SectionHeader title={stepsHeader.title} sub={stepsHeader.sub} tone="dark" />
          <ol className="steps">
            {steps.map((s) => (
              <li className="steps__card" key={s.num}>
                <span className="steps__num">{s.num}</span>
                <h3 className="steps__title">{s.title}</h3>
                <p className="steps__body">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="steps__cta">
            <Button to="/contact" variant="primary" size="lg" radius={8} iconAfter={<ArrowLeftIcon size={20} />}>
              {stepsHeader.cta}
            </Button>
          </div>
        </div>
      </section>

      {/* ---------- Detailed services ---------- */}
      <section className="section services-detail-section">
        <div className="container container--narrow">
          <SectionHeader title={detailedHeader.title} sub={detailedHeader.sub} />
          <div className="srv-list">
            {detailedServices.map((s, i) => (
              <article className={`srv ${i % 2 ? 'srv--flip' : ''}`} key={s.num}>
                <div className="srv__media">
                  <img src={s.image} alt={s.title} loading="lazy" />
                </div>
                <div className="srv__body">
                  <div className="srv__head">
                    <span className="srv__code">{s.code}</span>
                    <span className="srv__num">{s.num}</span>
                  </div>
                  <h3 className="srv__title">{s.title}</h3>
                  <p className="srv__lead">{s.body}</p>
                  <ul className="srv__bullets">
                    {s.bullets.map((b) => (
                      <li key={b.title}>
                        <strong>{b.title}</strong>
                        <span>{b.body}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/services" className="srv__link">
                    {s.linkLabel}
                    <ArrowLeftIcon size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Thermal demo ---------- */}
      <section className="section demo-section">
        <div className="container container--narrow">
          <SectionHeader title={demo.title} sub={demo.sub} tone="dark" />
          <div className="demo-wrap">
            <BeforeAfterSlider normal={demo.normal} thermal={demo.thermal} />
            <p className="demo__note">{demo.note}</p>
          </div>
        </div>
      </section>

      {/* ---------- NDT lab ---------- */}
      <section className="section section--dark lab">
        <div className="container container--narrow">
          <span className="lab__eyebrow">{labHeader.eyebrow}</span>
          <h2 className="lab__title">{labHeader.title}</h2>
          <p className="lab__sub">{labHeader.sub}</p>

          <ul className="lab__grid">
            {devices.map((d) => (
              <li className="dev" key={d.code}>
                <span className="dev__code">{d.code}</span>
                <div className="dev__media">
                  <img src={d.image} alt={d.name} loading="lazy" />
                </div>
                <h3 className="dev__name">{d.name}</h3>
                <p className="dev__body">{d.body}</p>
                <span className="dev__status">
                  <i className="dev__dot" aria-hidden />
                  {d.status}
                </span>
              </li>
            ))}
          </ul>
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

      {/* ---------- FAQ ---------- */}
      <section className="section faq-section" id="faq">
        <div className="container container--tight">
          <SectionHeader eyebrow={faqHeader.eyebrow} title={faqHeader.title} />
          <div className="faq-wrap">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      {/* ---------- Map CTA ---------- */}
      <section className="section map-cta">
        <div className="container map-cta__grid">
          <div className="map-cta__body">
            <h2 className="map-cta__title">{mapCta.title}</h2>
            <p className="map-cta__text">{mapCta.body}</p>
            <div className="map-cta__actions">
              <Button
                href={contact.whatsappHref}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                size="lg"
                radius={12}
                icon={<WhatsAppIcon size={20} />}
              >
                {ctaLabels.whatsapp}
              </Button>
              <Button href={contact.phoneHref} variant="white" size="lg" radius={12} icon={<PhoneIcon size={20} />}>
                {ctaLabels.callDirect}
              </Button>
            </div>
          </div>

          {/*
            An <a> rather than <figure>, so the entire plate — artwork and badge
            alike — is one link to the head office on Google Maps. <figcaption>
            is only legal as a child of <figure>, so the badge is a <span>.
          */}
          <a
            className="map-cta__map"
            href={`https://www.google.com/maps/search/?api=1&query=${mapPin.lat},${mapPin.lng}`}
            target="_blank"
            rel="noreferrer"
            aria-label={ui.openInMaps}
          >
            <img src={mapImg} alt={ui.mapAlt} loading="lazy" />
            <span className="map-cta__badge">
              <PinIcon size={16} />
              {contact.hqLabel}
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
