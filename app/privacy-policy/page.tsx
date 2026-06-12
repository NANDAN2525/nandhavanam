import type { Metadata } from 'next'
import Link from 'next/link'
import { CONTACT_PHONE, CONTACT_EMAIL } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Privacy Policy | Nandhavanam',
  description: 'Privacy Policy for Nandhavanam farm-fresh dairy delivery service, Hyderabad.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-secondary text-sm font-semibold mb-8 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="font-display font-bold text-4xl text-primary mb-2">Privacy Policy</h1>
        <p className="text-on-surface-variant text-sm mb-10">Last updated: June 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">1. Information We Collect</h2>
            <p>
              When you place an order or subscribe to our delivery service, we collect your name,
              delivery address, phone number, and WhatsApp contact. We do not collect payment card
              details — all orders are placed via WhatsApp or cash on delivery.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To process and schedule your daily milk delivery.</li>
              <li>To contact you about delivery updates, pauses, or changes.</li>
              <li>To send occasional offers or announcements via WhatsApp (you may opt out any time).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">3. Data Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to any third party. Your
              details are used solely for fulfilling your order and improving our service. Delivery
              personnel have access only to your name, address, and contact number.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">4. Data Storage & Security</h2>
            <p>
              Customer information is stored securely and accessed only by authorised Nandhavanam
              staff. We take reasonable precautions to protect your data from unauthorised access or
              disclosure.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">5. Cookies</h2>
            <p>
              Our website may use minimal cookies to improve browsing experience. No tracking or
              advertising cookies are used. You may disable cookies in your browser settings without
              affecting your ability to browse the site.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">6. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any
              time by contacting us on WhatsApp or email. We will respond within 7 business days.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">7. Contact Us</h2>
            <p>
              For any privacy-related queries, reach us at{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-secondary font-semibold hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{' '}
              or call{' '}
              <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`} className="text-secondary font-semibold hover:underline">
                {CONTACT_PHONE}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
