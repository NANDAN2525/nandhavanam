import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'lime' | 'gold' | 'surface'
  className?: string
}

export function Badge({ children, variant = 'lime', className }: BadgeProps) {
  const variants = {
    lime: 'bg-secondary-fixed/20 border border-secondary-fixed/30 text-secondary-fixed',
    gold: 'bg-tertiary-fixed text-on-tertiary-fixed',
    surface: 'bg-surface-container text-on-surface border border-outline-variant/30',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
