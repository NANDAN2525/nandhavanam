'use client'

import { CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { useTrialModal } from '@/components/TrialModalProvider'

const plans = [
  {
    name: 'Free Trial',
    price: '₹0',
    period: 'Free Trial',
    description: 'Try before you commit. No payment needed.',
    perks: [
      '200 ml glass bottle',
      'Delivered to your home',
      'No card required',
      'Cancel after trial — no questions',
    ],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    name: 'Daily Subscription',
    price: process.env.NEXT_PUBLIC_PRICE_DAILY_SUBSCRIPTION || '₹100',
    period: 'per litre / day',
    description: 'The most popular plan.',
    perks: [
      '1/day',
      'Glass bottle, door delivery',
      'Pause or cancel any time',
      'Weekly billing via UPI or cash',
    ],
    cta: 'Subscribe Now',
    highlight: true,
  },
  {
    name: 'Family Pack',
    price: process.env.NEXT_PUBLIC_PRICE_FAMILY_PACK || '₹300',
    period: 'per 3 litres / day',
    description: 'For larger families or those who love extra chai.',
    perks: [
      '3/day',
      'Priority delivery slot',
    ],
    cta: 'Order Family Pack',
    highlight: false,
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Pricing() {
  const { openModal } = useTrialModal()

  return (
    <section id="plans" className="py-16 md:py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel className="justify-center flex">Simple Pricing</SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-primary mt-2">
            No Hidden Charges. Ever.
          </h2>
          <p className="text-on-surface-variant mt-3 text-sm md:text-base max-w-xl mx-auto">
            Pay only for what you receive. Pause or stop any time — no lock-in, no fine print.
          </p>
        </motion.div>

        {/* Urgency banner */}
        <motion.div
          className="flex justify-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="inline-flex items-start sm:items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full text-center">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" />
            <span>Limited delivery slots remaining this week in nearby Hastinapuram areas</span>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative rounded-3xl p-6 md:p-8 flex flex-col gap-4 md:gap-6 border transition-shadow duration-300 ${
                plan.highlight
                  ? 'bg-primary text-white border-primary shadow-2xl md:scale-[1.02]'
                  : 'bg-white border-outline-variant/30 shadow-sm hover:shadow-xl'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary-fixed text-on-secondary-fixed text-xs font-bold px-4 py-1.5 rounded-full shadow whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <div>
                <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${plan.highlight ? 'text-secondary-fixed' : 'text-secondary'}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1">
                  <span className={`font-display font-bold text-3xl md:text-4xl ${plan.highlight ? 'text-white' : 'text-primary'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-xs mb-1.5 ${plan.highlight ? 'text-white/70' : 'text-on-surface-variant'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mt-1.5 ${plan.highlight ? 'text-white/80' : 'text-on-surface-variant'}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-2.5 flex-1">
                {plan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? 'text-secondary-fixed' : 'text-secondary'}`} />
                    <span className={plan.highlight ? 'text-white/90' : 'text-on-surface-variant'}>
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>

              <div>
                <Button
                  variant={plan.highlight ? 'primary' : 'outline'}
                  size="md"
                  className={`w-full ${plan.highlight ? 'bg-secondary-fixed text-on-secondary-fixed border-0' : ''}`}
                  onClick={openModal}
                >
                  <MessageCircle className="w-4 h-4" />
                  {plan.cta}
                </Button>
                {plan.highlight && (
                  <p className="text-center text-xs text-white/60 mt-2.5">
                    Pause or cancel anytime · No contract · First delivery today
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
