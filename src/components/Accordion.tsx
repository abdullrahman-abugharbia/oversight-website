import { useState } from 'react';
import { PlusIcon, MinusIcon } from './Icons';
import './Accordion.css';

export interface AccordionItem {
  id: string;
  q: string;
  a: string;
}

interface Props {
  items: AccordionItem[];
  /** Index open on first render; -1 for all closed. */
  defaultOpen?: number;
}

export default function Accordion({ items, defaultOpen = 0 }: Props) {
  const [open, setOpen] = useState<string | null>(items[defaultOpen]?.id ?? null);

  return (
    <div className="acc">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className={`acc__item ${isOpen ? 'is-open' : ''}`}>
            <h3 className="acc__heading">
              <button
                type="button"
                className="acc__trigger"
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                onClick={() => setOpen(isOpen ? null : item.id)}
              >
                <span className="acc__q">{item.q}</span>
                <span className="acc__icon">{isOpen ? <MinusIcon size={18} /> : <PlusIcon size={18} />}</span>
              </button>
            </h3>
            <div
              id={`panel-${item.id}`}
              className="acc__panel"
              role="region"
              hidden={!isOpen}
            >
              <p className="acc__a">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
