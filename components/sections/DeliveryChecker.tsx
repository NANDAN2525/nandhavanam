'use client'

import { useState } from 'react'
import { MapPin, CheckCircle2, Loader2, Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Button } from '@/components/ui/Button'
import { WHATSAPP_URL } from '@/lib/data'

export default function DeliveryChecker() {
  const [form, setForm] = useState({ name: '', phone: '', location: '', landmark: '' })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.location) return
    setStatus('submitting')
    
    await new Promise(r => setTimeout(r, 400))
    setStatus('success')
    
    const baseWa = WHATSAPP_URL.split('?')[0]
    const msg = `Hi! I'd like to request delivery in my area.\nName: ${form.name}\nPhone: ${form.phone}\nLocation: ${form.location}${form.landmark ? `\nLandmark: ${form.landmark}` : ''}`
    
    setTimeout(() => {
      window.open(`${baseWa}?text=${encodeURIComponent(msg)}`, '_blank')
      setForm({ name: '', phone: '', location: '', landmark: '' })
    }, 800)
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
              Request Delivery <br className="hidden md:block" />
              In Your Area
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-6">
              We currently serve Hastinapuram and nearby areas. If you are located in or around these zones, or want to request delivery for your colony, let us know! We track all location requests to plan our next expansion zones.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full w-max">
              <MapPin className="w-3.5 h-3.5" />
              Currently serving Hastinapuram &amp; nearby areas
            </div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="bg-surface-container rounded-3xl p-6 md:p-8 border border-outline-variant/30 shadow-sm">
              <h3 className="font-display font-bold text-lg md:text-xl text-primary mb-5">
                Check Availability / Request Area
              </h3>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="w-12 h-12 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-display font-bold text-green-800 text-lg mb-2">Redirecting to WhatsApp...</h4>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Opening WhatsApp to send your delivery area request.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setStatus('idle')}
                    className="mt-5"
                  >
                    Submit Another Location
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="req-name" className="block text-sm font-semibold text-on-surface mb-1">
                      Your Name *
                    </label>
                    <input
                      id="req-name"
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="req-phone" className="block text-sm font-semibold text-on-surface mb-1">
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      id="req-phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="req-location" className="block text-sm font-semibold text-on-surface mb-1">
                      Delivery Location / Colony Name *
                    </label>
                    <input
                      id="req-location"
                      type="text"
                      required
                      placeholder="e.g. NGO Colony, Hastinapuram"
                      value={form.location}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                      className="w-full border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="req-landmark" className="block text-sm font-semibold text-on-surface mb-1">
                      Landmark (Optional)
                    </label>
                    <input
                      id="req-landmark"
                      type="text"
                      placeholder="e.g. Near Hanuman Temple"
                      value={form.landmark}
                      onChange={e => setForm({ ...form, landmark: e.target.value })}
                      className="w-full border border-outline-variant/50 rounded-xl px-4 py-2.5 text-sm text-on-surface bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface-variant/50"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-600 text-xs font-semibold">
                      An error occurred. Please try again later.
                    </p>
                  )}

                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full justify-center"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Location Request</span>
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
