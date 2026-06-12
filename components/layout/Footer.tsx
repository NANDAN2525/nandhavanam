import Image from 'next/image'
import Link from 'next/link'
import { Globe, MessageCircle, Mail, MapPin, Phone, Instagram } from 'lucide-react'
import {
  IMAGES,
  WHATSAPP_URL,
  INSTAGRAM_URL,
  CONTACT_PHONE,
  CONTACT_EMAIL,
  CONTACT_ADDRESS,
} from '@/lib/data'

const FOOTER_QUICK = [
  { label: 'The Farm Experience', href: '/our-farm' },
  { label: 'Quality Standards', href: '/our-farm' },
  { label: 'Subscription Plans', href: '/plans' },
  { label: 'Corporate Orders', href: '/plans' },
]

const FOOTER_SUSTAINABILITY = [
  { label: 'Glass Bottle Ritual', href: '/our-farm' },
  { label: 'Farm Visit Request', href: '/our-farm' },
  { label: 'Cow Welfare Policy', href: '/our-farm' },
  { label: 'FSSAI Certificate', href: '/our-farm' },
]

export default function Footer() {
  return (
    <footer className="bg-surface-dim border-t border-outline-variant/20 pt-20 pb-10">
      <div className="max-w-[1280px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5">
              <Image
                src={IMAGES.logo}
                alt="Nandhavanam Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-contain"
              />
              <span className="font-display font-bold text-xl text-primary">Nandhavanam</span>
            </Link>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
              Harvesting health, one bottle at a time. Experience the true essence of Brahma
              Muhurtham purity.
            </p>
            <div className="flex gap-3">
              <a
                href="https://shuddhnandhavanam.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200"
                aria-label="Visit our website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200"
                aria-label="Send us an email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-display font-bold text-primary mb-5 text-base">Quick Links</h5>
            <ul className="space-y-3">
              {FOOTER_QUICK.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-on-surface-variant text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sustainability */}
          <div>
            <h5 className="font-display font-bold text-primary mb-5 text-base">Sustainability</h5>
            <ul className="space-y-3">
              {FOOTER_SUSTAINABILITY.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-on-surface-variant text-sm hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-display font-bold text-primary mb-5 text-base">Contact Us</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                <span className="text-on-surface-variant text-sm">
                  {CONTACT_ADDRESS}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
                  className="text-on-surface-variant text-sm hover:text-primary transition-colors"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-on-surface-variant text-sm hover:text-primary transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-on-surface-variant text-sm">
            © {new Date().getFullYear()} Nandhavanam. Harvested with Love in Hyderabad.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
