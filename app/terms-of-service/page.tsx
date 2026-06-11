import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Nandhavanam',
  description: 'Terms of Service for Nandhavanam farm-fresh dairy delivery service, Hyderabad.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-secondary text-sm font-semibold mb-8 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="font-display font-bold text-4xl text-primary mb-2">Terms of Service</h1>
        <p className="text-on-surface-variant text-sm mb-10">Last updated: June 2026</p>

        <div className="prose prose-sm max-w-none space-y-8 text-on-surface-variant leading-relaxed">
          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">1. Acceptance of Terms</h2>
            <p>
              By subscribing to or ordering from Nandhavanam, you agree to these Terms of Service.
              Please read them carefully before placing your first order.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">2. Subscription & Delivery</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Deliveries are made before 7:30 AM every day to your registered address.</li>
              <li>
                You are responsible for ensuring someone is available to receive the delivery or
                providing a safe drop-off location.
              </li>
              <li>
                Nandhavanam is not liable for milk left unattended at the doorstep beyond 30 minutes
                of delivery.
              </li>
              <li>Subscriptions continue on a rolling daily basis unless paused or cancelled.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">3. Pause & Cancellation</h2>
            <p>
              You may pause or cancel your subscription at any time by messaging us on WhatsApp
              before 9:00 PM the previous night. Requests received after 9:00 PM will take effect
              from the day after the next delivery.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">4. Payments</h2>
            <p>
              Payments are accepted via cash on delivery or UPI. Monthly advance payment is
              available at a discounted rate. Bills are generated weekly or monthly as per your
              preference.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">5. Quality Guarantee</h2>
            <p>
              Every bottle is tested for purity before dispatch. If you are unsatisfied with the
              quality on any given day, you have the right to reject the delivery and will not be
              charged for that day. Contact us immediately via WhatsApp to report any quality issue.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">6. Glass Bottle Policy</h2>
            <p>
              Glass bottles remain the property of Nandhavanam. Please return empty bottles to the
              delivery person each morning. A bottle deposit of ₹50 per bottle may apply for new
              customers, refunded upon return of all bottles.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">7. Limitation of Liability</h2>
            <p>
              Nandhavanam is not liable for any indirect or consequential damages arising from the
              use of our products beyond the value of the product itself. Our liability is limited to
              replacement or refund for the affected delivery.
            </p>
          </section>

          <section>
            <h2 className="font-display font-bold text-xl text-primary mb-3">8. Contact</h2>
            <p>
              For queries, reach us at{' '}
              <a
                href="mailto:Nandhavanammilk@gmail.com"
                className="text-secondary font-semibold hover:underline"
              >
                Nandhavanammilk@gmail.com
              </a>{' '}
              or{' '}
              <a href="tel:+919959306634" className="text-secondary font-semibold hover:underline">
                +91 99593 06634
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
