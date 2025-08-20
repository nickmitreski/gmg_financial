'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function CalculatorBreakSection() {
  return (
    <section className="py-12 bg-black">
      <div className="container-custom">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white text-2xl font-bold">
            Something needs to go in this section
          </h2>
        </motion.div>
      </div>
    </section>
  )
} 