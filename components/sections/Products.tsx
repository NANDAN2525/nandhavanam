'use client'

import Image from 'next/image'
import { ShoppingCart, Star, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { PRODUCTS, WHATSAPP_URL } from '@/lib/data'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

const BADGE_ICONS: Record<string, typeof Star> = {
  'Best Seller': Star,
  Artisanal: Award,
  'Desi Gold': Award,
}

export default function Products() {
  return (
    <section id="products" className="py-24 bg-surface-dim">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel className="justify-center flex">Straight From Our Farm</SectionLabel>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-primary mt-2">
            Pure & Natural, Every Single Day.
          </h2>
        </motion.div>

        {/* Product grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {PRODUCTS.map((product) => {
            const BadgeIcon = product.badge ? BADGE_ICONS[product.badge] : null
            return (
              <motion.article
                key={product.id}
                variants={cardVariants}
                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  {product.badge && BadgeIcon && (
                    <div className="absolute top-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <BadgeIcon className="w-3 h-3 fill-current" />
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-primary text-base mb-1">
                    {product.name}
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed flex-1 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
                    <span className="font-display font-bold text-secondary text-lg">
                      {product.price}
                      <span className="text-on-surface-variant font-normal text-sm ml-1">
                        / {product.unit}
                      </span>
                    </span>
                    <button
                      onClick={() => window.open(WHATSAPP_URL, '_blank')}
                      className="p-2.5 bg-secondary/10 text-secondary rounded-full hover:bg-secondary hover:text-white transition-colors duration-200"
                      aria-label={`Order ${product.name}`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
