import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const DeliveryChecker = dynamic(() => import('@/components/sections/DeliveryChecker'))
const CtaSection = dynamic(() => import('@/components/sections/CtaSection'))

export const metadata: Metadata = {
  title: 'Delivery Areas | Nandhavanam — Hyderabad',
  description:
    'Check if Nandhavanam delivers fresh buffalo milk to your area. We currently serve Hastinapuram, Nagole, Kothapet, Dilsukhnagar, LB Nagar, Saroornagar, Champapet, Vanasthalipuram, Mallapur and Uppal.',
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
