import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface BaseProps {
  variant?: Variant
  children: React.ReactNode
  className?: string
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type Props = ButtonProps | LinkProps

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-hover border border-accent hover:border-accent-hover',
  secondary:
    'bg-transparent text-text border border-border hover:border-border-hover hover:bg-surface-elevated',
  ghost:
    'bg-transparent text-text-muted hover:text-text border border-transparent hover:border-border',
}

export function Button({ variant = 'primary', children, className = '', ...props }: Props) {
  const base =
    'inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background'

  const classes = `${base} ${variants[variant]} ${className}`

  if ('href' in props && props.href) {
    const { href, ...rest } = props as LinkProps
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as ButtonProps)}>
      {children}
    </button>
  )
}
