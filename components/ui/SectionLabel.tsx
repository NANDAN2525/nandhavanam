import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'block text-secondary text-xs font-semibold uppercase tracking-[0.2em] mb-2',
        className
      )}
    >
      {children}
    </span>
  )
}
