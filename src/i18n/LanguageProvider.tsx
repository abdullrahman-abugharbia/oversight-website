import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ar } from '@/content/ar';
import { en } from '@/content/en';
import type { Content } from '@/content/ar';

export type Lang = 'ar' | 'en';
export type Dir = 'rtl' | 'ltr';

export const LANGS: Record<Lang, { label: string; dir: Dir; htmlLang: string }> = {
  ar: { label: 'السعودية | العربية', dir: 'rtl', htmlLang: 'ar' },
  en: { label: 'Saudi Arabia | English', dir: 'ltr', htmlLang: 'en' },
};

const TREES: Record<Lang, Content> = { ar, en };

const STORAGE_KEY = 'oversight.lang';

interface LanguageValue {
  lang: Lang;
  dir: Dir;
  setLang: (l: Lang) => void;
  toggle: () => void;
  c: Content;
}

const LanguageContext = createContext<LanguageValue | null>(null);

function readStoredLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === 'ar' || v === 'en') return v;
  } catch {
    /* private mode / blocked storage — fall through to default */
  }
  return 'ar';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);
  const dir = LANGS[lang].dir;

  /**
   * The document element is the single source of truth for direction.
   * index.html ships with ar/rtl; this keeps <html lang> and <html dir> in
   * sync with the chosen language so every logical CSS property
   * (inset-inline, margin-inline, text-align: start/end) flips correctly.
   */
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', LANGS[lang].htmlLang);
    root.setAttribute('dir', dir);
  }, [lang, dir]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* persistence is best-effort; the app still works without it */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  }, [lang, setLang]);

  const value = useMemo<LanguageValue>(
    () => ({ lang, dir, setLang, toggle, c: TREES[lang] }),
    [lang, dir, setLang, toggle]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>');
  return ctx;
}

/** Shorthand for components that only need the content tree. */
export function useContent(): Content {
  return useI18n().c;
}
