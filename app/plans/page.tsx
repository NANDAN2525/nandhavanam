import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const Pricing = dynamic(() => import('@/components/sections/Pricing'))
const FAQ = dynamic(() => import('@/components/sections/FAQ'))
const CtaSection = dynamic(() => import('@/components/sections/CtaSection'))

export const metadata: Metadata = {
  title: 'Subscription Plans | Nandhavanam — From ₹90/L',
  description:
    'Start with a free 2-day trial, then choose a daily or family plan. Pure buffalo milk delivered every morning in glass bottles. No contract, pause any time. Serving Hyderabad from ₹90 per litre.',
}

export default function PlansPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-6">
        <Pricing />
        <FAQ />
        <CtaSection />
      </div>
      <Footer />
    </main>
  )
}
