import { useState } from 'react';
import type React from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '@/i18n/LanguageProvider';
import Button from '@/components/Button';
import SectionHeader from '@/components/SectionHeader';
import Accordion from '@/components/Accordion';
import {
  CheckCircleIcon, ArrowLeftIcon, BoltIcon, ShieldIcon, ClockIcon, SearchIcon, HeadingSwoosh,
  BuildingIcon, WindIcon, StarIcon, FlameIcon,
} from '@/components/Icons';
import diagramImg from '@/assets/images/card-generic.webp';
import './Services.css';

const chipIcons = [BoltIcon, ShieldIcon, ClockIcon, SearchIcon];

/**
 * Inspection hotspots on the building diagram — one per service, with the
 * colours, dashed ring and icon Figma assigns to each.
 * x/y are percentages of the image box.
 */
const hotspots = [
  { x: 18.6, y: 44.8, fill: '#e37800', ring: '#ffdfb4', dash: '#e3952c', Icon: BuildingIcon },
  { x: 36.6, y: 53.0, fill: '#f2b200', ring: '#ffdfb4', dash: '#af8419', Icon: BoltIcon },
  { x: 48.8, y: 31.3, fill: '#0087cd', ring: '#b0e4ff', dash: '#638c9b', Icon: WindIcon },
  { x: 57.1, y: 60.5, fill: '#00b57a', ring: '#cdffef', dash: '#499f73', Icon: StarIcon },
  { x: 76.6, y: 60.5, fill: '#22686d', ring: '#d2fcff', dash: '#99e2e8', Icon: FlameIcon },
];

export default function Services() {
  const c = useContent();
  const { servicesHero, serviceTabs, processSteps, servicesCta } = c.services;
  const { faqItems, faqHeader } = c.faq;
  const { ui } = c.site;

  const [active, setActive] = useState(0);
  const tab = serviceTabs[active];

  return (
    <>
      {/* Figma "Frame 167": 1440x566, centred title + swoosh, teal edge glows */}
      <section className="page-hero">
        <span className="page-hero__glow page-hero__glow--a" aria-hidden />
        <span className="page-hero__glow page-hero__glow--b" aria-hidden />
        <div className="container page-hero__inner">
          <h1 className="page-hero__title">
            <span>{servicesHero.title}</span>
            <HeadingSwoosh className="page-hero__swoosh" />
          </h1>
          <p className="page-hero__body">{servicesHero.body}</p>
        </div>
      </section>

      {/* ---------- Service explorer (Figma: 1280x1222, pill tabs + 2 columns) ---------- */}
      <section className="section svc-explorer-section">
        <div className="container container--narrow">
          {/* Figma "Frame 47478": 76px pills, r=16, wrapping onto two rows */}
          <div className="svc-tabs" role="tablist" aria-label={ui.serviceTabsAria}>
            {serviceTabs.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`svc-tab-${t.id}`}
                aria-selected={i === active}
                aria-controls={`svc-panel-${t.id}`}
                className={`svc-tab ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                {t.tabLabel}
              </button>
            ))}
          </div>

          <div
            className="svc-panel"
            role="tabpanel"
            id={`svc-panel-${tab.id}`}
            aria-labelledby={`svc-tab-${tab.id}`}
          >
            {/* Figma "Frame 47473": building diagram with inspection hotspots */}
            <figure className="svc-diagram">
              <img src={diagramImg} alt={tab.title} loading="lazy" />
              {hotspots.map((h, i) => {
                const Icon = h.Icon;
                const isActive = i === active;
                return (
                  <button
                    key={serviceTabs[i]?.id ?? i}
                    type="button"
                    className={`svc-hotspot ${isActive ? 'is-active' : ''}`}
                    style={
                      {
                        left: `${h.x}%`,
                        top: `${h.y}%`,
                        '--hs-fill': h.fill,
                        '--hs-ring': h.ring,
                        '--hs-dash': h.dash,
                      } as React.CSSProperties
                    }
                    aria-label={serviceTabs[i]?.tabLabel ?? ''}
                    aria-pressed={isActive}
                    onClick={() => setActive(i)}
                  >
                    <span className="svc-hotspot__dot">
                      <Icon size={isActive ? 24 : 16} />
                    </span>
                    {isActive && <span className="svc-hotspot__label">{tab.tabLabel}</span>}
                  </button>
                );
              })}
            </figure>
            {/* Figma "Left Column (Information)": 466x859, #ffffff on #d9d9d4, r=2 */}
            <div className="svc-info">
              <div className="svc-info__badge">
                <h2>{tab.title}</h2>
              </div>

              <section className="svc-block">
                <h3 className="svc-block__title">{tab.whatTitle}</h3>
                <ul className="svc-list">
                  {tab.what.map((w) => (
                    <li key={w}>
                      <CheckCircleIcon size={18} />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="svc-block">
                <h3 className="svc-block__title">{tab.whoTitle}</h3>
                <ul className="svc-list">
                  {tab.who.map((w) => (
                    <li key={w}>
                      <CheckCircleIcon size={18} />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="svc-block">
                <h3 className="svc-block__title">
                  {tab.metaTitle}
                  <span className="svc-block__sub">{tab.metaSub}</span>
                </h3>
                {/* Figma: four 94px white chip cards, r=2 */}
                <ul className="svc-chips">
                  {tab.chips.map((c, i) => {
                    const Icon = chipIcons[i % chipIcons.length];
                    return (
                      <li key={c}>
                        <Icon size={20} />
                        <span>{c}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {/* Figma "Button": 400x61, #318391, r=2 */}
              {/* Link, not <a href>: a bare anchor reloads the whole SPA,
                  losing the chosen language and the scroll position. */}
              <Link className="svc-cta" to="/contact">
                {tab.cta}
                <ArrowLeftIcon size={20} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ---------- Process (Figma: #020a0c zig-zag timeline) ---------- */}
      <section className="proc-section">
        <span className="proc-section__glow proc-section__glow--a" aria-hidden />
        <span className="proc-section__glow proc-section__glow--b" aria-hidden />
        <span className="proc-section__scrim" aria-hidden />

        <div className="container proc-timeline">
          <div className="proc-rail">
            <span className="proc-spine" aria-hidden />
            <ol className="proc">
              {processSteps.map((s, i) => (
              <li className={`proc__item ${i % 2 === 0 ? 'proc__item--end' : 'proc__item--start'}`} key={s.num}>
                <span className="proc__marker" aria-hidden>
                  {s.num}
                </span>
                <article className="proc__card">
                  <h3 className="proc__title">{s.title}</h3>
                  <p className="proc__body">{s.body}</p>
                </article>
              </li>
              ))}
            </ol>
          </div>

          <div className="proc__cta">
            <Link className="proc__cta-btn" to="/contact">
              {servicesCta.title}
            </Link>
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
    </>
  );
}
