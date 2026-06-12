'use client'

import { useState } from 'react'
import { CheckCircle2, MessageCircle } from 'lucide-react'

const WA_BASE = 'https://wa.me/919959306634?text='

interface Props {
  onSuccess?: () => void
}

export function TrialSignupForm({ onSuccess }: Props) {
  const [form, setForm] = useState({ name: '', phone: '', location: '', landmark: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.location) return
    setSubmitting(true)

    await new Promise(r => setTimeout(r, 400))
    setSubmitted(true)
    setSubmitting(false)
    onSuccess?.()
    const msg = encodeURIComponent(
      `Hi! I'd like to start a Free Trial.\nName: ${form.name}\nPhone: ${form.phone}\nLocation: ${form.location}${form.landmark ? `\nLandmark: ${form.landmark}` : ''}\nPlan: Free Trial`
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
          Start Your Free Trial
        </h3>
        <p className="text-on-surface-variant text-sm">Cancel anytime.</p>
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
          <label htmlFor="trial-location" className="block text-sm font-semibold text-on-surface mb-1.5">
            Delivery Location / Address *
          </label>
          <input
            id="trial-location"
            type="text"
            required
            placeholder="e.g. Plot No 12, NGO Colony, Hastinapuram"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="w-full border border-outline-variant/60 rounded-xl px-4 py-3 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/50"
          />
        </div>

        <div>
          <label htmlFor="trial-landmark" className="block text-sm font-semibold text-on-surface mb-1.5">
            Landmark (Optional)
          </label>
          <input
            id="trial-landmark"
            type="text"
            placeholder="e.g. Opp. Park / Near Temple"
            value={form.landmark}
            onChange={e => setForm({ ...form, landmark: e.target.value })}
            className="w-full border border-outline-variant/60 rounded-xl px-4 py-3 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/50"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-secondary-fixed text-on-secondary-fixed font-bold py-4 rounded-full text-base hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
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
