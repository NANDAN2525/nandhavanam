import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const DeliveryChecker = dynamic(() => import('@/components/sections/DeliveryChecker'))
const CtaSection = dynamic(() => import('@/components/sections/CtaSection'))

export const metadata: Metadata = {
  title: 'Delivery Areas | Nandhavanam — Hyderabad',
  description:
    'Request delivery of fresh buffalo milk in your area. We currently serve Hastinapuram and nearby areas and are expanding rapidly.',
}

export default function DeliveryPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-6">
        <DeliveryChecker />
        <CtaSection />
      </div>
      <Footer />
    </main>
  )
}
