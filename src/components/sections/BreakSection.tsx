'use client'

import React from 'react'
import { motion } from 'framer-motion'
import TextMarquee from '@/components/ui/TextMarquee'

export function BreakSection() {
  return (
    <section className="py-12 bg-teal-500">
      <div className="container-custom">
        <motion.div
          className="grid place-content-center gap-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TextMarquee
            delay={500}
            baseVelocity={-1}
            className="font-bold tracking-[-0.07em] leading-[90%] text-white text-[3vw]"
          >
            Financial Planning  -  Budgeting Support  -  Wealth Building  -
          </TextMarquee>
          <TextMarquee
            delay={500}
            baseVelocity={1}
            className="font-bold tracking-[-0.07em] leading-[90%] text-white text-[3vw]"
          >
            Lending Solutions  -   Investment Reviews  -  Debt Reduction  -
          </TextMarquee>
        </motion.div>
      </div>
    </section>
  )
} 