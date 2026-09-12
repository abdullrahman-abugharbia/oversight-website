import { useCallback, useEffect, useRef, useState } from 'react';
import { useContent } from '@/i18n/LanguageProvider';
import './BeforeAfterSlider.css';

interface Side {
  image: string;
  chip: string;
  caption: string;
}

interface Props {
  normal: Side;
  thermal: Side;
}

/**
 * Drag-to-reveal comparison between the naked-eye photo and the thermal scan.
 * Pointer + keyboard driven; the handle is a real slider for a11y.
 */
export default function BeforeAfterSlider({ normal, thermal }: Props) {
  const { ui } = useContent().site;
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  /**
   * The clipped overlay image must stay exactly as wide as the frame, or the
   * two halves of the comparison stop lining up. Reading the ref during render
   * gives 0 on first paint and goes stale on resize, so track it properly.
   */
  const [frameWidth, setFrameWidth] = useState(0);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setFrameWidth(entry.contentRect.width));
    ro.observe(el);
    setFrameWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const raw = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, raw)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [setFromClientX]);

  return (
    <div className="ba">
      <div
        className="ba__frame"
        ref={wrapRef}
        onPointerDown={(e) => {
          dragging.current = true;
          setFromClientX(e.clientX);
        }}
      >
        {/* base layer: thermal */}
        <img className="ba__img" src={thermal.image} alt={thermal.caption} draggable={false} />
        <span className="ba__chip ba__chip--start">{thermal.chip}</span>

        {/* overlay layer: normal, clipped */}
        <div className="ba__overlay" style={{ width: `${pos}%` }}>
          <img
            className="ba__img"
            src={normal.image}
            alt={normal.caption}
            draggable={false}
            style={frameWidth ? { width: frameWidth } : undefined}
          />
          <span className="ba__chip ba__chip--end">{normal.chip}</span>
        </div>

        <div className="ba__handle" style={{ insetInlineStart: `${pos}%` }}>
          <span className="ba__grip" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="m9 6-5 6 5 6M15 6l5 6-5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        <input
          className="ba__range"
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={ui.sliderAria}
        />
      </div>

      <div className="ba__captions">
        <p className="ba__caption">{normal.caption}</p>
        <p className="ba__caption">{thermal.caption}</p>
      </div>
    </div>
  );
}
