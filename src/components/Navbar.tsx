import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useI18n, LANGS, type Lang } from '@/i18n/LanguageProvider';
import { ChevronDownIcon, MenuIcon, CloseIcon, PhoneIcon } from './Icons';
import logo from '@/assets/images/logo-oversight-alpha.webp';
import './Navbar.css';

interface Props {
  /** Transparent over a dark hero, solid once scrolled or on light pages. */
  overlay?: boolean;
}

export default function Navbar({ overlay = false }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const localeRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  const { lang, setLang, c } = useI18n();
  const { navItems, ctaLabels, contact, ui } = c.site;
  const langKeys = Object.keys(LANGS) as Lang[];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setLocaleOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (localeRef.current && !localeRef.current.contains(e.target as Node)) setLocaleOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const solid = !overlay || scrolled;

  return (
    <header className={`nav ${solid ? 'nav--solid' : 'nav--overlay'}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__logo" aria-label="Oversight">
          <img src={logo} alt="Oversight" />
        </Link>

        <nav className="nav__links" aria-label={ui.navAria}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <div className="nav__locale" ref={localeRef}>
            <button
              type="button"
              className="nav__locale-btn"
              onClick={() => setLocaleOpen((v) => !v)}
              aria-expanded={localeOpen}
              aria-haspopup="listbox"
              aria-label={ui.langAria}
            >
              <span>{LANGS[lang].label}</span>
              <ChevronDownIcon size={16} className={localeOpen ? 'is-flipped' : ''} />
            </button>
            {localeOpen && (
              <ul className="nav__locale-menu" role="listbox">
                {langKeys.map((key) => (
                  <li key={key}>
                    <button
                      type="button"
                      role="option"
                      lang={LANGS[key].htmlLang}
                      aria-selected={key === lang}
                      className={key === lang ? 'is-active' : ''}
                      onClick={() => {
                        setLang(key);
                        setLocaleOpen(false);
                      }}
                    >
                      {LANGS[key].label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* "اتصل بنا" is the header's Contact CTA — it opens the contact
              page. The literal dial links are the phone number in the mobile
              drawer and in the footer. */}
          <Link className="nav__cta" to="/contact">
            {ctaLabels.callUs}
          </Link>

          <button
            type="button"
            className="nav__burger"
            onClick={() => setMenuOpen(true)}
            aria-label={ui.menuOpen}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`nav__drawer ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={ui.menuLabel}
      >
        <div className="nav__drawer-head">
          <img src={logo} alt="Oversight" className="nav__drawer-logo" />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label={ui.menuClose}
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="nav__drawer-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'is-active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav__drawer-foot">
          <a className="nav__drawer-call" href={contact.phoneHref}>
            <PhoneIcon size={18} />
            {contact.phone}
          </a>
          <div className="nav__drawer-langs">
            {langKeys.map((key) => (
              <button
                key={key}
                type="button"
                lang={LANGS[key].htmlLang}
                className={`nav__drawer-lang ${key === lang ? 'is-active' : ''}`}
                aria-pressed={key === lang}
                onClick={() => setLang(key)}
              >
                {LANGS[key].label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {menuOpen && <div className="nav__scrim" onClick={() => setMenuOpen(false)} />}
    </header>
  );
}
