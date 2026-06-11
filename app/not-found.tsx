import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center px-4">
      <div className="text-7xl mb-6">🥛</div>
      <h1 className="font-display font-bold text-3xl text-primary mb-2">Page Not Found</h1>
      <p className="text-on-surface-variant text-base mb-8 max-w-sm leading-relaxed">
        Looks like this page wandered off to the farm. Let us get you back home.
      </p>
      <Link
        href="/"
        className="bg-secondary-fixed text-on-secondary-fixed font-bold px-8 py-4 rounded-full hover:opacity-90 active:scale-95 transition-all"
      >
        Back to Nandhavanam →
      </Link>
    </div>
  )
}
