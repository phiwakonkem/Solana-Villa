import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
}

export default function Button({
  children, href, onClick, variant = 'primary', type = 'button', disabled, className = ''
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm transition-colors'

  const variants = {
    primary: 'bg-[#1B4332] hover:bg-green-900 text-white',
    secondary: 'bg-[#D4A853] hover:bg-amber-600 text-white',
    outline: 'border border-[#1B4332] text-[#1B4332] hover:bg-[#1B4332] hover:text-white',
  }

  const classes = `${base} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`

  if (href) return <Link href={href} className={classes}>{children}</Link>

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}