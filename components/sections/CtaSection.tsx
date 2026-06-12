'use client'

import Image from 'next/image'
import { MessageCircle, BadgeCheck, Leaf, Recycle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { IMAGES, WHATSAPP_URL } from '@/lib/data'
import { useTrialModal } from '@/components/TrialModalProvider'

const trustBadges = [
  { icon: BadgeCheck, label: 'FSSAI Certified' },
  { icon: Leaf, label: '100% Organic Fodder' },
  { icon: Recycle, label: 'Zero Plastic Policy' },
]

export default function CtaSection() {
  const { openModal } = useTrialModal()

  return (
    <section className="relative py-20 md:py-32 min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.farmBg}
          alt="Lush green farm at sunrise"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="font-display font-bold text-3xl md:text-6xl text-white mb-4 md:mb-6 leading-tight">
            Start Your Purity Journey Today.
          </h2>
          <p className="text-primary-fixed/90 text-sm md:text-lg max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed">
            Join our Happy Families receiving fresh, unadulterated farm essentials daily.
            No long-term commitment — pause anytime.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-5 mb-10 md:mb-16">
            <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center" onClick={openModal}>
              Start Free Trial
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto justify-center"
              onClick={() => window.open(WHATSAPP_URL, '_blank')}
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              Order on WhatsApp
            </Button>
          </div>

          <motion.div
            className="flex flex-wrap justify-center gap-4 md:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white text-xs md:text-sm font-semibold">
                <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
