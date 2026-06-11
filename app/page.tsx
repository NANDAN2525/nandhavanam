import dynamic from 'next/dynamic'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Footer from '@/components/layout/Footer'

const FarmStory = dynamic(() => import('@/components/sections/FarmStory'))
const DeliveryChecker = dynamic(() => import('@/components/sections/DeliveryChecker'))
const MorningTimeline = dynamic(() => import('@/components/sections/MorningTimeline'))
const PurityRitual = dynamic(() => import('@/components/sections/PurityRitual'))
const Products = dynamic(() => import('@/components/sections/Products'))
const Pricing = dynamic(() => import('@/components/sections/Pricing'))
const Comparison = dynamic(() => import('@/components/sections/Comparison'))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'))
const FAQ = dynamic(() => import('@/components/sections/FAQ'))
const CtaSection = dynamic(() => import('@/components/sections/CtaSection'))

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FarmStory />
      <DeliveryChecker />
      <MorningTimeline />
      <PurityRitual />
      <Products />
      <Pricing />
      <Comparison />
      <Testimonials />
      <FAQ />
      <CtaSection />
      <Footer />
    </main>
  )
}
