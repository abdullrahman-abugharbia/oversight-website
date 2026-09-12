/** Inline icon set — stroke-based, inherits currentColor. */

interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true as const,
  focusable: 'false' as const,
});

export const PhoneIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowLeftIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M19 12H5m0 0 7 7m-7-7 7-7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowRightIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M5 12h14m0 0-7-7m7 7-7 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const WhatsAppIcon = ({ size = 20, className }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Z" />
  </svg>
);

export const CheckCircleIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M9 12.5l2 2 4.5-4.5M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChevronDownIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlusIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const MinusIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const MenuIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const CloseIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const MailIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="m22 6-10 7L2 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ClockIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm0-14v5l3 2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PinIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const ShieldIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BoltIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path d="M13 2 3 14h8l-1 8 10-12h-8l1-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const SearchIcon = ({ size = 20, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
    <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

/* ---- Work-page stat icons (Figma: buildings-2 / moneys / warning_amber / Clock) ---- */

export const BuildingIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M3 21h18M5 21V7l6-4v18M19 21V11l-8-4M9 9h.01M9 13h.01M9 17h.01M15 13h.01M15 17h.01"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const MoneyIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <path d="M6 12h.01M18 12h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const WarningIcon = ({ size = 24, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M10.3 3.9 2.4 17.1A2 2 0 0 0 4.1 20h15.8a2 2 0 0 0 1.7-2.9L13.7 3.9a2 2 0 0 0-3.4 0Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M12 9v4M12 16.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

/** Curved teal underline beneath headings (Figma "Vector 1", 248x10, #318391). */
export const HeadingSwoosh = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="248"
    height="10"
    viewBox="0 0 248 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    focusable="false"
  >
    <path
      d="M2 8C42 3 90 1 124 1s82 2 122 7"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/* ---- Building-diagram hotspot icons (Figma: flash / wind / star / fire) ---- */

export const WindIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M3 8h9a3 3 0 1 0-3-3M3 12h13a3 3 0 1 1-3 3M3 16h7a2.5 2.5 0 1 1-2.5 2.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const StarIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="m12 3 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9L12 16.4 6.7 19.2l1.1-5.9L3.5 9.2l5.9-.8L12 3Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

export const FlameIcon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} className={className}>
    <path
      d="M12 22a6 6 0 0 0 6-6c0-4-3-6-4.5-9C13 5.5 13 4 13 2c-2 1.5-6 4.5-6 9.5 0 1.4.5 2.4 1 3-1.2-.2-2-1-2-2.5A6 6 0 0 0 12 22Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);
