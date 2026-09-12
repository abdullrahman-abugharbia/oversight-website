/**
 * Arabic content tree — the design's source language.
 *
 * This aggregates the existing `src/data/*` modules, so the Arabic copy
 * extracted from Figma stays exactly where it was. `Content` is derived from
 * this shape, which makes `en.ts` compile-time checked for completeness:
 * a missing translation becomes a build error, not a runtime surprise.
 */

import * as site from '@/data/site';
import * as home from '@/data/home';
import * as about from '@/data/about';
import * as services from '@/data/services';
import * as work from '@/data/work';
import * as contact from '@/data/contact';
import * as faq from '@/data/faq';
import * as testimonials from '@/data/testimonials';

export const ar = { site, home, about, services, work, contact, faq, testimonials };

/**
 * Widen literal types so another locale can supply its own strings.
 * Without this, `export const x = 'مرحبا'` infers the literal `'مرحبا'` and no
 * translation could ever satisfy it.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? Widen<U>[]
        : T extends object
          ? { [K in keyof T]: Widen<T[K]> }
          : T;

/** Structural mirror of the Arabic tree; every locale must satisfy it. */
export type Content = { [K in keyof typeof ar]: Widen<(typeof ar)[K]> };
