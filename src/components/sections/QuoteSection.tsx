'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Typewriter } from '@/components/ui/Typewriter'

export function QuoteSection() {
  const quotes = [
    "Financial clarity. Real results. Peace of mind.",
    "Practical advice. Confident decisions.",
    "Advice you can trust, results you can feel.",
    "Here to simplify your financial journey.",
    "Your finances, simplified. Your future, secured."
  ]

  return (
    <section className="py-12 bg-teal-500">
      <div className="container-custom">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-relaxed min-h-[4rem] flex items-center justify-center">
              <Typewriter
                text={quotes}
                speed={80}
                deleteSpeed={50}
                delay={2000}
                loop={true}
                cursor="|"
                className="text-white"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 