/*
 * Social accounts.
 *
 * Outside src/data/ for the same reason as the map pin: content/ar.ts
 * aggregates the data modules with `import * as`, so anything exported there
 * joins the translated content tree and every locale is forced to restate it.
 * A handle and a URL are identical in Arabic and English — one copy.
 *
 * Order follows the footer, right to left in RTL.
 */

export interface Social {
  /** Used as the accessible name, so it must stay human-readable. */
  name: string;
  handle: string;
  href: string;
  /** 24x24 viewBox, solid fill. */
  path: string;
}

export const socials: Social[] = [
  {
    name: 'Instagram',
    handle: 'oversight.sa',
    href: 'https://www.instagram.com/oversight.sa',
    path: 'M12 8.3a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4Zm0 6.1a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8ZM16 2H8a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6Zm4.6 14a4.6 4.6 0 0 1-4.6 4.6H8A4.6 4.6 0 0 1 3.4 16V8A4.6 4.6 0 0 1 8 3.4h8A4.6 4.6 0 0 1 20.6 8v8Zm-.5-9.9a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0Z',
  },
  {
    name: 'TikTok',
    handle: '@oversight.sa',
    href: 'https://www.tiktok.com/@oversight.sa',
    path: 'M16.6 5.82A4.28 4.28 0 0 1 15.56 3h-3.1v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.6 2.59 2.59 0 0 1 3.1-2.54v-3.1a5.68 5.68 0 0 0-6.2 5.64 5.68 5.68 0 0 0 5.68 5.68 5.68 5.68 0 0 0 5.68-5.68V9.4a7.35 7.35 0 0 0 4.3 1.38V7.68a4.28 4.28 0 0 1-3.24-1.86Z',
  },
  {
    name: 'Snapchat',
    handle: 'oversight.sa',
    href: 'https://www.snapchat.com/add/oversight.sa',
    path: 'M12 2c2.5 0 4.4 1.9 4.5 4.4v2c.5.2 1-.2 1.4-.2.5 0 .9.3.9.8 0 .6-.8.9-1.5 1.2-.3.1-.6.3-.6.6 0 .8 2 3 3.6 3.3.3.1.5.3.5.6 0 .6-1.2 1-2.2 1.2-.2 0-.3.2-.3.4-.1.4-.2.9-.6.9-.5 0-1-.2-1.7-.2-1.1 0-1.6.2-2.4.9-.7.6-1.4 1.1-2.6 1.1s-1.9-.5-2.6-1.1c-.8-.7-1.3-.9-2.4-.9-.7 0-1.2.2-1.7.2-.4 0-.5-.5-.6-.9 0-.2-.1-.4-.3-.4-1-.2-2.2-.6-2.2-1.2 0-.3.2-.5.5-.6C3.3 13.8 5.3 11.6 5.3 10.8c0-.3-.3-.5-.6-.6-.7-.3-1.5-.6-1.5-1.2 0-.5.4-.8.9-.8.4 0 .9.4 1.4.2v-2C5.6 3.9 7.5 2 10 2h2Z',
  },
  {
    name: 'X',
    handle: '@Oversighsa',
    href: 'https://x.com/Oversighsa',
    /* The 2023 X mark, not the retired bird. */
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z',
  },
];
