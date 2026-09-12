/*
 * Head-office geography.
 *
 * This lives OUTSIDE src/data/ on purpose. content/ar.ts aggregates the data
 * modules with `import * as`, so anything exported from there becomes part of
 * the translated content tree and every locale is then forced to restate it.
 * A coordinate is identical in Arabic and English — one copy, one source.
 */

/**
 * Exact map pin for the head office.
 *
 * Deliberately NOT in the translated content tree — a coordinate is the same in
 * every language, and duplicating it per locale is how the two copies drift.
 *
 * A text query ("حي الروضة، الرياض") lets Google pick whatever it thinks you
 * meant, so the pin lands on the district and moves as Google's index changes.
 * Latitude/longitude pins the marker on one point, permanently.
 *
 * To move the pin: open Google Maps, right-click the spot, click the
 * "24.7220, 46.7723" entry at the top of the menu (it copies the pair) and
 * paste it below. Nothing else needs to change — the contact-page embed and
 * the home-page map plate both read from here.
 *
 * Current value resolved from the Google Maps place "Super Office"
 * (ftid 0x3e2f01ab06ec3315:0x1c82ebad616ae97f).
 */
export const mapPin = {
  lat: 24.7220218,
  lng: 46.7722786,
  /* 17 = building level, as Google itself opens this place. */
  zoom: 17,
};

