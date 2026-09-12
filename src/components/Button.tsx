import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

type Variant = 'primary' | 'outline' | 'ghost' | 'dark' | 'white';
type Size = 'sm' | 'md' | 'lg';
/** Corner radii used in the Figma file. No button in the design is a pill. */
type Radius = 0 | 2 | 4 | 8 | 12 | 16;

interface BaseProps {
  variant?: Variant;
  size?: Size;
  radius?: Radius;
  icon?: ReactNode;
  iconAfter?: ReactNode;
  full?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className'> {
  to?: undefined;
  href?: undefined;
}

interface LinkProps extends BaseProps {
  to: string;
  href?: undefined;
}

interface AnchorProps extends BaseProps {
  href: string;
  to?: undefined;
  target?: string;
  rel?: string;
}

type Props = ButtonProps | LinkProps | AnchorProps;

export default function Button(props: Props) {
  const {
    variant = 'primary',
    size = 'md',
    radius = 8,
    icon,
    iconAfter,
    full,
    children,
    className = '',
    ...rest
  } = props as BaseProps & Record<string, unknown>;

  const cls = ['btn', `btn--${variant}`, `btn--${size}`, `btn--r${radius}`, full ? 'btn--full' : '', className]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      {icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__label">{children}</span>
      {iconAfter && <span className="btn__icon">{iconAfter}</span>}
    </>
  );

  if ('to' in props && props.to) {
    const { to, ...linkRest } = rest as { to: string };
    return (
      <Link to={to} className={cls} {...(linkRest as object)}>
        {inner}
      </Link>
    );
  }

  if ('href' in props && props.href) {
    return (
      <a className={cls} {...(rest as { href: string })}>
        {inner}
      </a>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  );
}
