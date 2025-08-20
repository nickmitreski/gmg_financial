'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Award, Users, Shield } from 'lucide-react'

const credentials = [
  {
    id: '1',
    icon: Award,
    text: 'Certified Financial Planner'
  },
  {
    id: '2',
    icon: Users,
    text: '20+ Years Combined Experience'
  },
  {
    id: '3',
    icon: Shield,
    text: 'Independent Financial Advice'
  }
]

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-gray-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-heading leading-snug mb-8 text-teal-500">
              About GMG Financial Services
            </h2>
            <div className="space-y-6 section-description leading-relaxed">
              <p>
                At GMG Financial Services, we support individuals, families, and business owners
                with clear, practical financial advice tailored to their unique circumstances.
                With over 20 years of experience across accounting, finance, and banking,
                we empower our clients to make confident decisions.
              </p>
              <p>
                We take control of your financial future by providing personalised solutions
                that work in real life. Our approach is practical, professional, and focused
                on achieving your short and long-term financial goals.
              </p>
            </div>
            <motion.div
              className="mt-8 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {credentials.map((credential, index) => (
                <motion.div
                  key={credential.id}
                  className="flex items-center gap-4 text-teal-500"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <credential.icon className="h-6 w-6" />
                  </div>
                  <span className="text-black text-sm font-medium uppercase tracking-wider">
                    {credential.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Professional financial advisor meeting with clients"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 