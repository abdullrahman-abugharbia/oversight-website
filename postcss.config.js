/*
 * px → rem, at build time.
 *
 * WHY THIS EXISTS
 * The design was authored on a 1440px Figma frame, and every value in src/
 * is a literal Figma pixel (`724px` really is the 724 in the file). That is
 * what makes a Figma audit possible — the CSS and the design speak the same
 * numbers — so the source must KEEP saying px.
 *
 * But a fixed-px layout cannot adapt to a viewport smaller than the frame it
 * was drawn on. A Windows machine at 125% display scaling gets a 1280px
 * viewport, so a 1440px design arrives 12.5% too large and the container eats
 * the entire screen.
 *
 * So: authors write px, the build emits rem, and one root font-size in
 * global.css scales the whole design at once. Nothing in src/ changes.
 *
 * Two deliberate exclusions:
 *   mediaQuery   — breakpoints must keep measuring the REAL viewport. If they
 *                  scaled with the root size they would chase their own tail.
 *   minPixelValue — 1px stays 1px, so hairline borders and dividers do not
 *                  blur into sub-pixel grey at small root sizes.
 */
export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,
      unitPrecision: 5,
      propList: ['*'],
      mediaQuery: false,
      minPixelValue: 2,
      selectorBlackList: [/^html$/],
    },
  },
};
