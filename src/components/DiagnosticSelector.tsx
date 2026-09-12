import { useState } from 'react';
import type React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, ArrowLeftIcon } from './Icons';
import type { Diagnostic } from '@/data/home';
import { useContent } from '@/i18n/LanguageProvider';
import './DiagnosticSelector.css';

interface Props {
  items: Diagnostic[];
}

/**
 * Stacked-card selector from the home page. The active card sits in front;
 * the others peek out behind it. Selecting a tab brings that card forward.
 */
export default function DiagnosticSelector({ items }: Props) {
  const { ui } = useContent().site;
  const [active, setActive] = useState(0);

  return (
    <div className="diag">
      <div className="diag__tabs" role="tablist" aria-label={ui.diagnosticsAria}>
        {items.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`diag-panel-${item.id}`}
            className={`diag__tab ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="diag__stack">
        {items.map((item, i) => {
          const offset = (i - active + items.length) % items.length;
          return (
            <article
              key={item.id}
              id={`diag-panel-${item.id}`}
              role="tabpanel"
              aria-hidden={offset !== 0}
              className={`diag__card diag__card--${offset}`}
              style={
                {
                  background: item.tint,
                  '--card-accent': item.accent,
                  '--card-body': item.bodyColor,
                } as React.CSSProperties
              }
              onClick={() => offset !== 0 && setActive(i)}
            >
              <div className="diag__media">
                <img src={item.image} alt="" loading="lazy" />
              </div>
              <div className="diag__body">
                <h3 className="diag__title">{item.title}</h3>
                <ul className="diag__points">
                  <li>
                    <CheckCircleIcon size={20} />
                    <span>{item.lead}</span>
                  </li>
                  <li>
                    <CheckCircleIcon size={20} />
                    <span>{item.body}</span>
                  </li>
                </ul>
                <Link to="/contact" className="diag__cta">
                  {item.cta}
                  <ArrowLeftIcon size={18} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
