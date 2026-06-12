import type {
  Product,
  Testimonial,
  TimelineStep,
  PurityFeature,
  ComparisonRow,
  NavLink,
} from '@/types'

export const NAV_LINKS: NavLink[] = [
  { label: 'Our Farm', href: '/our-farm' },
  { label: 'Products', href: '/products' },
  { label: 'Plans', href: '/plans' },
  { label: 'Delivery', href: '/delivery' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQ', href: '/faq' },
]

export const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ||
  'https://wa.me/919959306634?text=Hi%2C+I%27d+like+to+start+a+trial+for+Nandhavanam+milk.'

export const PRODUCTS: Product[] = [
  {
    id: 'buffalo-milk',
    name: 'Pure Buffalo Milk',
    description:
      'Collected at Brahma Muhurtham and delivered directly to your doorstep. Pure, thick and unadulterated — the way milk is supposed to be.',
    price: process.env.NEXT_PUBLIC_PRICE_BUFFALO_MILK || '₹100',
    unit: 'Litre',
    image: '/images/milk-bottle.jpg',
    badge: 'Best Seller',
  },
  {
    id: 'clay-pot-curd',
    name: 'Clay Pot Curd',
    description:
      'Set overnight in a traditional clay pot. Thick, creamy and slightly tangy — exactly like the curd your mother used to make at home.',
    price: process.env.NEXT_PUBLIC_PRICE_CLAY_POT_CURD || '₹60',
    unit: '500g',
    image: '/images/curd.jpg',
  },
  {
    id: 'malai-paneer',
    name: 'Fresh Paneer',
    description:
      'Soft, fresh paneer made daily from full-fat buffalo milk. Perfect for paneer butter masala, palak paneer or straight off the tawa.',
    price: process.env.NEXT_PUBLIC_PRICE_MALAI_PANEER || '₹120',
    unit: '200g',
    image: '/images/paneer.jpg',
  },
  {
    id: 'desi-ghee',
    name: 'Desi Ghee',
    description:
      'Hand-churned ghee made the traditional way. That golden colour and nutty aroma — ideal for tadka, hot rotis and pooja prasad.',
    price: process.env.NEXT_PUBLIC_PRICE_DESI_GHEE || '₹850',
    unit: '500ml',
    image: '/images/ghee.jpg',
    badge: 'Desi Gold',
  },
]

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    time: 'Step 1',
    title: 'Farm Fresh',
    description: 'Brahma Muhurtham milking begins under traditional sacred timing.',
  },
  {
    time: 'Step 2',
    title: 'Quality Testing',
    description: 'Rigorous on-farm chemical and purity checks on every batch.',
  },
  {
    time: 'Step 3',
    title: 'Sealed Packaging',
    description: 'Stored at safe temperatures and packed in sanitized glass bottles.',
  },
  {
    time: 'Step 4',
    title: 'Doorstep Delivery',
    description: 'Delivered to your home within 3–4 hours of milking.',
  },
]

export const PURITY_FEATURES: PurityFeature[] = [
  {
    iconName: 'FlaskConical',
    title: 'Double Testing',
    description:
      'Every batch undergoes rigorous quality testing at the farm and again at the distribution center.',
  },
  {
    iconName: 'ShieldCheck',
    title: 'Live Auditing',
    description:
      'Request a live doorstep purity test. We carry kits to prove our quality on the spot.',
  },
  {
    iconName: 'ThumbsDown',
    title: 'Authority To Reject',
    description:
      'Customers have the authority to reject delivery if temperature or taste is not perfect.',
  },
  {
    iconName: 'Waves',
    title: 'Glass Sanitization',
    description:
      '5-step chemical-free ultrasonic sanitization for every single glass bottle before use.',
  },
]

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Packaging',
    nandhavanam: 'Recyclable Glass',
    market: 'Single-use Plastic',
  },
  {
    feature: 'Safe Transit',
    nandhavanam: 'Sealed, End-to-End',
    market: 'Broken at Retail',
  },
  {
    feature: 'Quality Audit',
    nandhavanam: 'Live Doorstep Check',
    market: 'None / Lab Only',
  },
  {
    feature: 'Farm to Door',
    nandhavanam: '< 4 Hours',
    market: '12 – 24 Hours',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'santhosh-k',
    quote:
      'The milk is extremely thick and creamy. My morning chai tastes much better now. Love the glass bottle concept!',
    author: 'Santhosh Kumar',
    location: 'Hastinapuram',
    subscriptionDuration: 'Verified Customer',
    initials: 'SK',
    rating: 5,
  },
  {
    id: 'sai',
    quote:
      'Finally found pure buffalo milk without water mixing. Delivery is always on time.',
    author: 'Sai',
    location: 'Omkar Nagar',
    subscriptionDuration: 'Verified Customer',
    initials: 'S',
    rating: 5,
  },
  {
    id: 'aruna',
    quote:
      'The quality reminds me of fresh farm milk from childhood. Highly recommended!',
    author: 'Aruna',
    location: 'BN Reddy',
    subscriptionDuration: 'Verified Customer',
    initials: 'A',
    rating: 5,
  },
  {
    id: 'lakshmi-d',
    quote:
      'My children refuse to drink any other milk now. The taste is so different from packet milk — you can actually feel the richness. Worth every rupee.',
    author: 'Lakshmi Devi',
    location: 'Hastinapuram',
    subscriptionDuration: 'Verified Customer',
    initials: 'LD',
    rating: 5,
  },
  {
    id: 'ravi-s',
    quote:
      'Three months in and the consistency is impressive. Same time, same quality, every single morning. The glass bottles are a nice touch — very hygienic.',
    author: 'Ravi Shankar',
    location: 'BN Reddy',
    subscriptionDuration: 'Verified Customer',
    initials: 'RS',
    rating: 5,
  },
  {
    id: 'priya-m',
    quote:
      'The curd set from this milk is outstanding. Thick, creamy and tangy exactly the right way. Even my mother-in-law approved — that says it all!',
    author: 'Priya',
    location: 'Omkar Nagar',
    subscriptionDuration: 'Verified Customer',
    initials: 'P',
    rating: 5,
  },
]

export const FSSAI_NUMBER = process.env.NEXT_PUBLIC_FSSAI_NUMBER || '23624031000784' // Replace with actual FSSAI license number

export const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/Shuddhnandhavanam'

export const CONTACT_PHONE = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+91 99593 06634'

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Nandhavanammilk@gmail.com'

export const CONTACT_ADDRESS = process.env.NEXT_PUBLIC_CONTACT_ADDRESS || 'Plot No 137, Hastinapuram, Hyderabad, Telangana'

export const IMAGES = {
  farmBg: '/images/farm-bg.jpg',
  milkBottle: '/images/milk-bottle.jpg',
  buffaloes: '/images/buffalo.jpg',
  logo: '/images/logo.png',
}
