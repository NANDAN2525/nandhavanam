'use client'

import { CheckCircle2, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { COMPARISON_ROWS } from '@/lib/data'

export default function Comparison() {
  return (
    <section id="why-us" className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <motion.h2
          className="font-display font-bold text-4xl md:text-5xl text-primary text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          Why We Are Different.
        </motion.h2>

        {/* ── MOBILE: card layout ── */}
        <div className="md:hidden space-y-3">
          {COMPARISON_ROWS.map((row, i) => (
            <motion.div
              key={row.feature}
              className="rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {/* Feature label */}
              <div className="px-4 py-2.5 bg-primary/5 border-b border-outline-variant/20">
                <p className="font-display font-bold text-on-surface text-sm">{row.feature}</p>
              </div>
              {/* Side-by-side comparison */}
              <div className="grid grid-cols-2 divide-x divide-outline-variant/20">
                <div className="p-4 bg-green-50/60">
                  <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2">
                    Nandhavanam
                  </p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-on-surface font-semibold leading-snug">
                      {row.nandhavanam}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-2">
                    Market Milk
                  </p>
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-on-surface-variant leading-snug">
                      {row.market}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── DESKTOP: table layout ── */}
        <motion.div
          className="hidden md:block relative overflow-x-auto rounded-[2rem] shadow-xl border border-outline-variant/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="bg-primary text-white">
                <th className="px-8 py-6 font-display font-bold text-base">Feature</th>
                <th className="px-8 py-6 font-display font-bold text-base bg-secondary/20">
                  Nandhavanam
                </th>
                <th className="px-8 py-6 font-display font-bold text-base opacity-60">
                  Market Milk
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {COMPARISON_ROWS.map((row) => (
                <tr
                  key={row.feature}
                  className="hover:bg-surface-container transition-colors duration-200"
                >
                  <td className="px-8 py-5 font-semibold text-on-surface text-sm">
                    {row.feature}
                  </td>
                  <td className="px-8 py-5">
                    <span className="flex items-center gap-2 text-secondary font-semibold text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      {row.nandhavanam}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="flex items-center gap-2 text-on-surface-variant text-sm">
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                      {row.market}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
