import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import Script from 'next/script'
import { TrialModalProvider } from '@/components/TrialModalProvider'
import './globals.css'

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['600', '700', '800'],
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'],
  display: 'swap',
})

const BASE_URL = 'https://shuddhnandhavanam.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Nandhavanam | Farm-Fresh Pure Buffalo Milk, Hyderabad',
    template: '%s | Nandhavanam',
  },
  description:
    'Get pure buffalo milk delivered to your door before 7:30 AM in Hyderabad. Collected at Brahma Muhurtham, tested for purity, delivered in sterilised glass bottles. No adulteration. No plastic. Free 2-day trial.',
  keywords: [
    'pure buffalo milk Hyderabad',
    'farm fresh milk delivery Hyderabad',
    'buffalo milk home delivery',
    'desi ghee Hyderabad',
    'clay pot curd Hyderabad',
    'fresh paneer Hyderabad',
    'Nandhavanam milk',
    'Hastinapuram milk delivery',
    'organic dairy Hyderabad',
    'glass bottle milk Hyderabad',
  ],
  authors: [{ name: 'Nandhavanam', url: BASE_URL }],
  creator: 'Nandhavanam',
  publisher: 'Nandhavanam',
  category: 'Food & Beverage',
  openGraph: {
    title: 'Nandhavanam | Farm-Fresh Pure Buffalo Milk, Hyderabad',
    description:
      'Pure buffalo milk delivered before 7:30 AM in sterilised glass bottles. Collected at Brahma Muhurtham. Free 2-day trial for Hyderabad families.',
    url: BASE_URL,
    siteName: 'Nandhavanam',
    type: 'website',
    locale: 'en_IN',
    images: [
      {
        url: '/images/milk-bottle.jpg',
        width: 1200,
        height: 630,
        alt: 'Nandhavanam pure buffalo milk in glass bottle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nandhavanam | Pure Buffalo Milk, Hyderabad',
    description:
      'Farm-fresh buffalo milk delivered before 7:30 AM. No adulteration, no plastic, no compromise.',
    images: ['/images/milk-bottle.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#business`,
      name: 'Nandhavanam',
      description:
        'Farm-fresh pure buffalo milk and dairy products delivered to your door before 7:30 AM in Hyderabad.',
      url: BASE_URL,
      telephone: '+919959306634',
      email: 'Nandhavanammilk@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Plot No 137, Hastinapuram',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        postalCode: '500079',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 17.3354,
        longitude: 78.5528,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
        ],
        opens: '05:00',
        closes: '08:00',
      },
      priceRange: '₹₹',
      servesCuisine: 'Dairy',
      image: `${BASE_URL}/images/logo.png`,
      sameAs: ['https://shuddhnandhavanam.com'],
    },
    {
      '@type': 'Product',
      name: 'Pure Buffalo Milk',
      description:
        'Farm-fresh pure buffalo milk collected at Brahma Muhurtham and delivered in sterilised glass bottles before 7:30 AM.',
      brand: { '@type': 'Brand', name: 'Nandhavanam' },
      offers: {
        '@type': 'Offer',
        price: '90',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Nandhavanam' },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '3',
      },
    },
    {
      '@type': 'ItemList',
      name: 'Nandhavanam Reviews',
      itemListElement: [
        {
          '@type': 'Review',
          position: 1,
          author: { '@type': 'Person', name: 'Santhosh Kumar' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'The milk is extremely thick and creamy. My morning chai tastes much better now. Love the glass bottle concept!',
        },
        {
          '@type': 'Review',
          position: 2,
          author: { '@type': 'Person', name: 'Sai' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'Finally found pure buffalo milk without water mixing. Delivery is always on time.',
        },
        {
          '@type': 'Review',
          position: 3,
          author: { '@type': 'Person', name: 'Aruna' },
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          reviewBody:
            'The quality reminds me of fresh farm milk from childhood. Highly recommended!',
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${montserrat.variable} ${inter.variable} bg-background text-on-background font-body antialiased`}
      >
        <div
          className="grain-overlay fixed inset-0 pointer-events-none z-[9999] opacity-[0.025]"
          aria-hidden="true"
        />
        <TrialModalProvider>{children}</TrialModalProvider>
      </body>
    </html>
  )
}
