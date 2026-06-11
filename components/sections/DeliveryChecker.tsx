'use client'

import { useState } from 'react'
import { MapPin, CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { useTrialModal } from '@/components/TrialModalProvider'

const SERVICEABLE = new Map([
  ['500079', 'Hastinapuram'],
  ['500035', 'Nagole'],
  ['500036', 'Kothapet'],
  ['500059', 'Dilsukhnagar'],
  ['500074', 'LB Nagar'],
  ['500060', 'Saroornagar'],
  ['500070', 'Champapet'],
  ['500068', 'Vanasthalipuram'],
  ['500097', 'Mallapur'],
  ['500076', 'Uppal'],
])

const NOTIFY_WA = 'https://wa.me/919959306634?text=Hi%2C+please+notify+me+when+Nandhavanam+delivers+to+my+area.'

type Status = 'idle' | 'checking' | 'available' | 'unavailable'

export default function DeliveryChecker() {
  const { openModal } = useTrialModal()
  const [pincode, setPincode] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [areaName, setAreaName] = useState('')

  function handleCheck() {
    const trimmed = pincode.trim()
    if (trimmed.length !== 6 || !/^\d{6}$/.test(trimmed)) return
    setStatus('checking')
    setTimeout(() => {
      const area = SERVICEABLE.get(trimmed)
      if (area) { setAreaName(area); setStatus('available') }
      else { setAreaName(''); setStatus('unavailable') }
    }, 600)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleCheck()
  }

  return (
    <section id="delivery" className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <SectionLabel>Delivery Areas</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-primary mt-2 mb-4 md:mb-5 leading-tight">
              Do We Deliver <br className="hidden md:block" />
              To Your Door?
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6 md:mb-8">
              Enter your 6-digit pincode below to check if we deliver in your area.
              We are expanding fast — if your area is not listed, drop us a message
              and we will let you know as soon as we arrive near you.
            </p>

            {/* Areas list */}
            <div className="flex flex-wrap gap-2">
              {Array.from(SERVICEABLE.values()).map((area) => (
                <span
                  key={area}
                  className="flex items-center gap-1 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full"
                >
                  <MapPin className="w-3 h-3" />
                  {area}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — checker card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-sm">
              <h3 className="font-display font-bold text-lg md:text-xl text-primary mb-5 md:mb-6">
                Check Your Pincode
              </h3>

              <div className="flex gap-2 md:gap-3 mb-5">
                <label htmlFor="pincode-input" className="sr-only">Enter your pincode</label>
                <input
                  id="pincode-input"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="e.g. 500079"
                  value={pincode}
                  onChange={e => { setPincode(e.target.value.replace(/\D/g, '')); setStatus('idle') }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 min-w-0 border border-outline-variant/50 rounded-xl px-3 md:px-4 py-3 text-sm md:text-base font-semibold text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:font-normal placeholder:text-on-surface-variant/50"
                />
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleCheck}
                  disabled={pincode.length !== 6}
                  className="shrink-0"
                >
                  {status === 'checking' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check'}
                </Button>
              </div>

              {status === 'available' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 md:p-5 bg-green-50 border border-green-200 rounded-2xl"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-green-800 text-sm">
                        Great news! We deliver to {areaName}.
                      </p>
                      <p className="text-green-700 text-xs mt-1">
                        Your first delivery can start as early as tomorrow morning.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={openModal}
                    className="w-full flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                  >
                    Start My Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {status === 'unavailable' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 md:p-5 bg-amber-50 border border-amber-200 rounded-2xl"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <XCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-amber-800 text-sm">Not in our zone yet — but expanding soon!</p>
                      <p className="text-amber-700 text-xs mt-1">
                        Message us on WhatsApp and we will notify you the day we launch near you.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(NOTIFY_WA, '_blank')}
                    className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl text-sm transition-colors"
                  >
                    Notify Me on WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
