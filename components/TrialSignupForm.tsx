'use client'

import { useState } from 'react'
import { CheckCircle2, MessageCircle } from 'lucide-react'

const PLANS = [
  'Free Trial (2 days, no payment)',
  'Daily — ₹90 per litre',
  'Family Pack — ₹160 for 2 litres',
]

const AREAS = [
  'Hastinapuram',
  'Nagole',
  'Kothapet',
  'Dilsukhnagar',
  'LB Nagar',
  'Saroornagar',
  'Champapet',
  'Vanasthalipuram',
  'Mallapur',
  'Uppal',
]

const WA_BASE = 'https://wa.me/919959306634?text='

interface Props {
  onSuccess?: () => void
}

export function TrialSignupForm({ onSuccess }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', area: '', plan: PLANS[0] })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise(r => setTimeout(r, 400))
    setSubmitted(true)
    setSubmitting(false)
    onSuccess?.()
    const msg = encodeURIComponent(
      `Hi! I'd like to start a trial.\nName: ${form.name}\nPhone: ${form.phone}\nArea: ${form.area}\nPlan: ${form.plan}`
    )
    setTimeout(() => window.open(WA_BASE + msg, '_blank'), 800)
  }

  if (submitted) {
    return (
      <div className="text-center py-10 px-8">
        <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="font-display font-bold text-xl text-primary mb-2">Trial Booked!</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          Opening WhatsApp to confirm your first delivery. We will be in touch within 2 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 md:p-8">
      <div className="mb-6">
        <h3 className="font-display font-bold text-2xl text-primary mb-1">
          Start Your Free 2-Day Trial
        </h3>
        <p className="text-on-surface-variant text-sm">No payment needed. Cancel anytime.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="trial-name" className="block text-sm font-semibold text-on-surface mb-1.5">
            Your Name *
          </label>
          <input
            id="trial-name"
            type="text"
            required
            placeholder="e.g. Rajesh Kumar"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full border border-outline-variant/60 rounded-xl px-4 py-3 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/50"
          />
        </div>

        <div>
          <label htmlFor="trial-phone" className="block text-sm font-semibold text-on-surface mb-1.5">
            WhatsApp Number *
          </label>
          <input
            id="trial-phone"
            type="tel"
            required
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-outline-variant/60 rounded-xl px-4 py-3 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/50"
          />
        </div>

        <div>
          <label htmlFor="trial-area" className="block text-sm font-semibold text-on-surface mb-1.5">
            Your Delivery Area *
          </label>
          <select
            id="trial-area"
            required
            value={form.area}
            onChange={e => setForm({ ...form, area: e.target.value })}
            className="w-full border border-outline-variant/60 rounded-xl px-4 py-3 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            <option value="">Select your area</option>
            {AREAS.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="trial-plan" className="block text-sm font-semibold text-on-surface mb-1.5">
            Plan
          </label>
          <select
            id="trial-plan"
            value={form.plan}
            onChange={e => setForm({ ...form, plan: e.target.value })}
            className="w-full border border-outline-variant/60 rounded-xl px-4 py-3 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {PLANS.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-secondary-fixed text-on-secondary-fixed font-bold py-4 rounded-full text-base hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
        >
          <MessageCircle className="w-4 h-4" />
          {submitting ? 'Booking…' : 'Book My Free Trial'}
        </button>

        <p className="text-xs text-center text-on-surface-variant/60">
          We confirm via WhatsApp within 2 hours. No spam, ever.
        </p>
      </div>
    </form>
  )
}
