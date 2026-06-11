import dynamic from 'next/dynamic'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const FarmStory = dynamic(() => import('@/components/sections/FarmStory'))
const MorningTimeline = dynamic(() => import('@/components/sections/MorningTimeline'))
const PurityRitual = dynamic(() => import('@/components/sections/PurityRitual'))
const CtaSection = dynamic(() => import('@/components/sections/CtaSection'))

export const metadata: Metadata = {
  title: 'Our Farm | Nandhavanam',
  description:
    'Meet the Nandhavanam farm — where buffaloes graze on pesticide-free pastures, milk is collected at Brahma Muhurtham, and every batch is tested before it leaves our gate. Learn how we bring purity from our farm to your family.',
}

export default function OurFarmPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-6">
        <FarmStory />
        <MorningTimeline />
        <PurityRitual />
        <CtaSection />
      </div>
      <Footer />
    </main>
  )
}
