import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const Products = dynamic(() => import('@/components/sections/Products'))
const CtaSection = dynamic(() => import('@/components/sections/CtaSection'))

export const metadata: Metadata = {
  title: 'Our Products | Nandhavanam',
  description:
    'Pure buffalo milk, clay pot curd, fresh paneer and desi ghee — all made daily from full-fat buffalo milk and delivered to your door before 7:30 AM in Hyderabad. No preservatives, no adulteration, no plastic.',
}

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-6">
        <Products />
        <CtaSection />
      </div>
      <Footer />
    </main>
  )
}
