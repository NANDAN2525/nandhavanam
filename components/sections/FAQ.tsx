"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const faqs = [
  {
    q: "What time is the milk delivered?",
    a: "We deliver every day, seven days a week. The milk is collected fresh and reaches your doorstep within 3 Hrs of collection.",
  },
  {
    q: "Is the milk tested before delivery?",
    a: "Yes. Every batch is tested at the farm for adulteration and purity before it is dispatched. You can also request a live doorstep purity test — our delivery staff carry testing kits.",
  },
  {
    q: "How do I pause or stop my subscription?",
    a: "Simply send a WhatsApp message before 9:00 PM the previous evening. There are no penalties, no forms to fill, and no minimum commitment period.",
  },
  {
    q: "What is the glass bottle deposit policy?",
    a: "A refundable deposit of ₹50 per bottle applies for new customers. Empty bottles are collected by the delivery person every morning. The deposit is fully refunded when you return all bottles.",
  },
  {
    q: "Do you deliver outside Hastinapuram?",
    a: "Currently we serve Hastinapuram and nearby areas. If you are located nearby, you can submit your details in our location request form to request delivery in your area.",
  },
  {
    q: "How is Nandhavanam milk different from packet milk?",
    a: "Packet milk is often pasteurised, homogenised, and packaged hours or days after collection. Our milk goes from the farm directly to your door with no processing, no additives, and no plastic packaging.",
  },
  {
    q: "Can I try the milk before subscribing?",
    a: 'Absolutely. We offer a free trial of our milk. Just click on any "Start Free Trial" button, fill in your delivery details, and we will set up your trial delivery.',
  },
  {
    q: "How do I pay for my subscription?",
    a: "We accept cash on delivery or UPI (Google Pay, PhonePe, Paytm). Bills are generated weekly or monthly as per your preference.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-surface-dim">
      <div className="max-w-[1280px] mx-auto px-5 md:px-16">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <SectionLabel className="justify-center flex">
            Common Questions
          </SectionLabel>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-primary mt-2">
            Everything You Want to Know.
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-2.5 md:space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm"
              >
                <button
                  className="w-full flex items-center justify-between px-5 md:px-7 py-4 md:py-5 text-left gap-3 md:gap-4"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-primary text-sm md:text-base">
                    {faq.q}
                  </span>
                  <span className="shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    ) : (
                      <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-7 pb-4 md:pb-6 text-on-surface-variant text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
