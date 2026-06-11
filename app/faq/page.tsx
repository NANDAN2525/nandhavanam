import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const FAQ = dynamic(() => import('@/components/sections/FAQ'))
const CtaSection = dynamic(() => import('@/components/sections/CtaSection'))

export const metadata: Metadata = {
  title: 'FAQ | Nandhavanam Pure Farm Milk Hyderabad',
  description:
    'Common questions about Nandhavanam milk delivery — delivery timings, purity testing, glass bottle deposit, how to pause your subscription, payment options and more.',
}

export default function FAQPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-6">
        <FAQ />
        <CtaSection />
      </div>
      <Footer />
    </main>
  )
}
