'use client'

import React from 'react'
import { motion, useTransform } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'

const socialProofData = [
  {
    id: '1',
    value: 20,
    suffix: '+',
    label: 'Years Industry Experience'
  },
  {
    id: '2',
    value: 500,
    suffix: '+',
    label: 'Happy Clients'
  },
  {
    id: '3',
    value: 200,
    suffix: '+',
    label: 'Successful Home Loan Applications'
  },
  {
    id: '4',
    value: 100,
    suffix: '%',
    label: 'Independent Financial Guidance'
  }
]

export function SocialProofSection() {
  return (
    <section className="py-12 bg-teal-500">
      <div className="container-custom">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {socialProofData.map((item, index) => {
            const count = useCountUp({
              end: item.value,
              delay: 500 + (index * 300),
              duration: 3500,
            })
            
            const displayValue = useTransform(count, (latest) => 
              Math.round(latest)
            )

            return (
              <motion.div
                key={item.id}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 + (index * 0.15) }}
              >
                <motion.h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-2">
                  <motion.span>{displayValue}</motion.span>
                  <span>{item.suffix}</span>
                </motion.h3>
                <p className="social-proof-label">
                  {item.label}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
} 