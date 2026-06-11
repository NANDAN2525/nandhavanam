'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { TESTIMONIALS } from '@/lib/data'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-surface-container relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        {/* Section heading */}
        <motion.div
          className="text-center mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display font-bold text-3xl md:text-5xl text-primary mb-6">
            Stories From The Table.
          </h2>

          {/* Aggregate rating */}
          <div className="inline-flex flex-col items-center gap-1.5 bg-white border border-outline-variant/30 rounded-2xl px-6 md:px-8 py-4 md:py-5 shadow-sm">
            <span className="font-display font-bold text-4xl md:text-5xl text-primary">4.9</span>
            <div className="flex items-center gap-0.5 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              ))}
            </div>
            <p className="text-on-surface-variant text-xs md:text-sm">Based on 500+ verified subscriber reviews</p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {TESTIMONIALS.map((testimonial) => (
            <motion.blockquote
              key={testimonial.id}
              variants={cardVariants}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-outline-variant/30 flex flex-col"
            >
              {/* Stars */}
              <div
                className="flex items-center gap-0.5 text-yellow-400 mb-3 md:mb-4"
                aria-label={`${testimonial.rating} out of 5 stars`}
              >
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed mb-5 md:mb-6 flex-1 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <footer className="flex items-center gap-3 md:gap-4">
                <div
                  className="w-10 h-10 md:w-11 md:h-11 bg-primary rounded-full flex items-center justify-center text-white font-display font-bold text-xs md:text-sm shrink-0"
                  aria-hidden="true"
                >
                  {testimonial.initials}
                </div>
                <div>
                  <cite className="font-display font-bold text-on-surface text-sm not-italic">
                    {testimonial.author}
                  </cite>
                  <p className="text-on-surface-variant text-xs mt-0.5">
                    {testimonial.location} &middot; {testimonial.subscriptionDuration}
                  </p>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
