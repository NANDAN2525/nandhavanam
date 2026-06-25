"use client";

import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  Star,
  BadgeCheck,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { IMAGES, WHATSAPP_URL } from "@/lib/data";
import { useTrialModal } from "@/components/TrialModalProvider";

export default function Hero() {
  const { openModal } = useTrialModal();

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={IMAGES.farmBg}
          alt="Lush green dairy farm at sunrise with morning mist"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40 md:to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 py-8 md:py-20">
        {/* Left — text content */}
        <motion.div
          className="flex-1 text-white w-full"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge variant="lime" className="mb-4 md:mb-5">
            Brahma Muhurtham Harvest
          </Badge>

          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-[56px] leading-[1.1] mb-3 md:mb-4 text-white">
            From Our Farm <br />
            To Your Family.
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-xl mb-5 md:mb-6 leading-relaxed">
            Freshly collected, tested, and delivered in sanitised glass bottles
            within 3 Hrs of harvest — fresh, pure and unadulterated, every
            single day.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8">
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-white text-xs font-semibold">
                Happy Families
              </span>
            </div>
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
              <BadgeCheck className="w-3 h-3 text-secondary-fixed" />
              <span className="text-white text-xs font-semibold">
                FSSAI Certified
              </span>
            </div>
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5">
              <MapPin className="w-3 h-3 text-secondary-fixed" />
              <span className="text-white text-xs font-semibold">
                Hyderabad
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="lg"
              className="group w-full sm:w-auto justify-center"
              onClick={openModal}
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="w-full sm:w-auto justify-center"
              onClick={() => window.open(WHATSAPP_URL, "_blank")}
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              WhatsApp Order
            </Button>
          </div>
        </motion.div>

        {/* Right — Floating Bottle (hidden on xs, shown sm+) */}
        <motion.div
          className="hidden sm:flex flex-1 relative justify-center items-center"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[300px] sm:max-w-[380px] md:max-w-[480px]"
          >
            <Image
              src={IMAGES.milkBottle}
              alt="Nandhavanam branded glass milk bottle"
              width={500}
              height={680}
              priority
              className="w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              sizes="(max-width: 640px) 300px, (max-width: 768px) 380px, 480px"
            />

            {/* Trust card — constrained so it never overflows */}
            <motion.div
              className="absolute -bottom-4 -right-2 md:-right-4 bg-white/90 backdrop-blur-md p-3 md:p-5 rounded-2xl shadow-2xl border border-white/50 w-[180px] md:w-[240px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className="p-1.5 bg-primary/10 rounded-full">
                  <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="font-semibold text-primary text-xs md:text-sm">
                  100% Raw &amp; Pure
                </span>
              </div>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">
                No adulteration, no chemicals. Just pure farm essence.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/30 to-transparent pointer-events-none" />
    </section>
  );
}
