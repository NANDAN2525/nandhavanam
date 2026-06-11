'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { IMAGES } from '@/lib/data'

const stats = [
  { title: 'Pesticide Free', description: 'Organic fodder grown right on our farm.' },
  { title: 'Natural Care', description: 'No growth hormones or antibiotics, ever.' },
]

export default function FarmStory() {
  return (
    <section id="farm" className="py-16 md:py-24 bg-surface">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-surface-container-high aspect-[4/3] md:aspect-[4/5]">
              <Image
                src={IMAGES.buffaloes}
                alt="Buffaloes grazing in sun-drenched green meadow"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 md:p-8">
                <p className="text-white font-body italic text-sm md:text-base">
                  &ldquo;Pesticide-free meadows for naturally nutritious milk.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2 space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          >
            <SectionLabel>Grounded Meadows</SectionLabel>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-primary leading-tight">
              Families Who Care About Purity.
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
              Our buffaloes and cows are not just livestock — they are family. They graze freely on
              pesticide-free pastures, breathe fresh country air, and are milked under strict
              hygienic conditions. We prioritize animal welfare because happy, healthy animals
              produce the most nutritious milk.
            </p>

            <div className="grid grid-cols-2 gap-3 md:gap-4 pt-1">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  className="p-4 md:p-5 bg-surface-container rounded-2xl border border-outline-variant/30"
                >
                  <h4 className="font-display font-bold text-primary text-sm md:text-base mb-1">
                    {stat.title}
                  </h4>
                  <p className="text-on-surface-variant text-xs md:text-sm">{stat.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
