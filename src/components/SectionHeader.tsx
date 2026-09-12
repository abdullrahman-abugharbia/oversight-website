import type { ReactNode } from 'react';
import './SectionHeader.css';

interface Props {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'center' | 'start';
  tone?: 'light' | 'dark';
}

export default function SectionHeader({ eyebrow, title, sub, align = 'center', tone = 'light' }: Props) {
  return (
    <header className={`sec-head sec-head--${align} sec-head--${tone}`}>
      {eyebrow && <span className="sec-head__eyebrow">{eyebrow}</span>}
      <h2 className="sec-head__title">{title}</h2>
      {sub && <p className="sec-head__sub">{sub}</p>}
    </header>
  );
}
