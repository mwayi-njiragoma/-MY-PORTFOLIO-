import { ArrowDown, ArrowUpRight } from 'lucide-react'

export default function AnimatedButton({
  href,
  children,
  variant = 'primary',
  download = false,
  icon = 'up',
  onClick,
}) {
  const Icon = icon === 'down' ? ArrowDown : ArrowUpRight
  const props = { className: `button button--${variant}`, onClick }

  if (href) {
    return (
      <a href={href} {...props} download={download || undefined}>
        <span>{children}</span>
        <span className="button__icon"><Icon size={17} /></span>
      </a>
    )
  }

  return (
    <button type="button" {...props}>
      <span>{children}</span>
      <span className="button__icon"><Icon size={17} /></span>
    </button>
  )
}