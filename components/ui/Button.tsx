import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-95 cursor-pointer'

    const variants = {
      primary:
        'bg-secondary-fixed text-on-secondary-fixed hover:shadow-[0_0_30px_rgba(173,246,130,0.4)] hover:-translate-y-0.5',
      ghost:
        'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
      outline:
        'border border-outline text-on-surface hover:bg-surface-container transition-colors',
    }

    const sizes = {
      sm: 'px-4 py-2 text-xs md:px-5 md:text-sm',
      md: 'px-5 py-3 text-sm md:px-8 md:py-3.5 md:text-base',
      lg: 'px-6 py-3.5 text-base md:px-10 md:py-5 md:text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
