import { Link } from 'react-router-dom';
import { useContent } from '@/i18n/LanguageProvider';
import logo from '@/assets/images/logo-oversight-alpha.webp';
import { socials } from '@/config/social';
import './Footer.css';


export default function Footer() {
  const { footer, contact, ui } = useContent().site;

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo">
            <img src={logo} alt="Oversight" />
          </div>
          <p className="footer__blurb">{footer.blurb}</p>
          <ul className="footer__socials">
            {socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Oversight — ${s.name}`}
                  title={`${s.name}: ${s.handle}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d={s.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">{footer.quickLinksTitle}</h3>
          <ul className="footer__links">
            {footer.quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h3 className="footer__title">{footer.contactTitle}</h3>
          <ul className="footer__links">
            <li>
              <a href={contact.phoneHref}>{ui.phoneLabel}: {contact.phoneArabic}</a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`}>{ui.emailLabel}: {contact.email}</a>
            </li>
            <li>
              <span>{contact.hours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <span>{footer.copyright}</span>
          <span>{footer.legalName}</span>
        </div>
      </div>
    </footer>
  );
}
