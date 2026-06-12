'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, Instagram } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { NAV_LINKS, IMAGES, INSTAGRAM_URL } from '@/lib/data'
import { useTrialModal } from '@/components/TrialModalProvider'

export default function Navbar() {
  const { openModal } = useTrialModal()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="fixed top-3 left-4 right-4 md:left-6 md:right-6 z-[1000]">
      <header
        className={cn(
          'bg-primary/90 backdrop-blur-md border border-white/15 rounded-2xl transition-all duration-300',
          scrolled ? 'py-1 shadow-[0_8px_32px_rgba(0,0,0,0.25)]' : 'py-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.15)]'
        )}
      >
        <div className="flex justify-between items-center px-4 md:px-8 w-full max-w-[1280px] mx-auto">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-white rounded-full p-0.5 shadow-md flex-shrink-0">
              <Image
                src={IMAGES.logo}
                alt="Nandhavanam Logo"
                width={96}
                height={96}
                className="h-10 w-10 object-contain rounded-full"
                priority
                quality={100}
              />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-display font-bold text-white text-sm md:text-base leading-tight tracking-wide">
                Nandhavanam
              </span>
              <span className="text-secondary-fixed text-[10px] md:text-[11px] font-medium tracking-[0.15em] uppercase leading-none">
                Pure Farm Milk
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-5" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-primary-fixed/80 hover:text-secondary-fixed transition-colors duration-200 pb-0.5 border-b border-transparent hover:border-secondary-fixed/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="primary" size="sm" onClick={openModal}>
              Start Free Trial
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-primary-fixed p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu — separate rounded card below navbar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden mt-2 bg-primary/95 backdrop-blur-md border border-white/15 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)] overflow-hidden"
          >
            <nav className="flex flex-col px-5 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-primary-fixed/80 font-semibold py-3 border-b border-white/10 last:border-0 hover:text-secondary-fixed transition-colors text-base"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                variant="primary"
                size="md"
                className="mt-3 mb-1 w-full"
                onClick={() => {
                  setMenuOpen(false)
                  openModal()
                }}
              >
                Start Free Trial
              </Button>
              <div className="flex justify-center gap-4 py-3 mt-3 border-t border-white/10">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-fixed/80 hover:text-secondary-fixed transition-colors flex items-center gap-2 text-sm font-semibold"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@{INSTAGRAM_URL.split('/').pop()}</span>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
