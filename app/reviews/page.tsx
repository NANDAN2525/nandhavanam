import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const Testimonials = dynamic(() => import('@/components/sections/Testimonials'))
const Comparison = dynamic(() => import('@/components/sections/Comparison'))
const CtaSection = dynamic(() => import('@/components/sections/CtaSection'))

export const metadata: Metadata = {
  title: 'Customer Reviews | Nandhavanam — 500+ Happy Families',
  description:
    '4.9 stars from 500+ verified families across Hyderabad. Read real reviews from Nandhavanam subscribers who get fresh farm-to-door buffalo milk delivered every morning.',
}

export default function ReviewsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-6">
        <Testimonials />
        <Comparison />
        <CtaSection />
      </div>
      <Footer />
    </main>
  )
}
