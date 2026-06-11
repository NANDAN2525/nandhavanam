'use client'

import { FlaskConical, ShieldCheck, ThumbsDown, Waves, BadgeCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PURITY_FEATURES, FSSAI_NUMBER } from '@/lib/data'
import type { LucideIcon } from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  FlaskConical,
  ShieldCheck,
  ThumbsDown,
  Waves,
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function PurityRitual() {
  return (
    <section id="purity" className="py-16 md:py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        {/* Header row */}
        <motion.div
          className="flex flex-col gap-4 md:flex-row md:justify-between md:items-end mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="max-w-xl">
            <SectionLabel>Our Promise</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-primary mt-2 leading-tight">
              Built On Unwavering Trust.
            </h2>
          </div>

          {/* FSSAI badge — full width on mobile, auto on desktop */}
          <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3 md:shrink-0 self-start md:self-auto">
            <BadgeCheck className="w-4 h-4 md:w-5 md:h-5 text-green-700 shrink-0" />
            <div>
              <p className="text-green-800 text-[10px] font-semibold uppercase tracking-wide">FSSAI Licensed</p>
              <p className="text-green-700 text-sm font-mono font-bold">Lic. No. {FSSAI_NUMBER}</p>
            </div>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {PURITY_FEATURES.map((feature) => {
            const Icon = ICON_MAP[feature.iconName]
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="group p-5 md:p-7 bg-white rounded-3xl shadow-sm border border-outline-variant/30 flex flex-col gap-3 md:gap-4 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  {Icon && <Icon className="w-5 h-5 md:w-7 md:h-7" strokeWidth={1.5} />}
                </div>
                <h4 className="font-display font-bold text-primary text-base md:text-lg">{feature.title}</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
