'use client'

import { motion } from 'framer-motion'
import { TIMELINE_STEPS } from '@/lib/data'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function MorningTimeline() {
  return (
    <section id="process" className="py-16 md:py-24 bg-primary-container text-on-primary-container relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(173,246,130,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-5 md:px-16 relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display font-bold text-3xl md:text-5xl text-primary-fixed mb-3">
            The Journey of Purity
          </h2>
          <p className="text-primary-fixed/70 text-base md:text-lg">
            Farm Fresh → Quality Tested → Packed with Care → Delivered to Your Home
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {TIMELINE_STEPS.map((step, index) => (
            <motion.div
              key={step.time}
              variants={cardVariants}
              className="group relative flex flex-col items-center text-center p-4 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              {index < TIMELINE_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-secondary-fixed/30" />
              )}
              <span className="font-display font-bold text-secondary-fixed text-lg md:text-xl mb-1.5 md:mb-2">
                {step.time}
              </span>
              <h4 className="font-display font-bold text-primary-fixed text-sm md:text-base mb-1.5 md:mb-2">
                {step.title}
              </h4>
              <p className="text-primary-fixed/60 text-xs md:text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
