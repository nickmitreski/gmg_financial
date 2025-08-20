'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Home, TrendingUp, Building2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { scrollToSection } from '@/lib/utils'

const services = [
  {
    id: '1',
    title: 'Planning & Budgeting',
    description: 'Develop practical, goal-oriented financial plans and implement budgeting systems that work in real life.',
    icon: Home,
    href: '#contact'
  },
  {
    id: '2',
    title: 'Cash Flow & Business Performance',
    description: 'Review and improve business cash flow, provide insights into financial health, and identify growth opportunities.',
    icon: TrendingUp,
    href: '#contact'
  },
  {
    id: '3',
    title: 'Lending & Finance Support',
    description: 'Personalised solutions for borrowers, homeowners, and investors with direct bank liaison.',
    icon: Building2,
    href: '#contact'
  },
  {
    id: '4',
    title: 'Investment & Portfolio Reviews',
    description: 'Assess property and investment portfolios for performance and tax efficiency.',
    icon: TrendingUp,
    href: '#contact'
  },
  {
    id: '5',
    title: 'Financial Health Checks',
    description: 'Full review of your current financial position with clear recommendations for improvement.',
    icon: Home,
    href: '#contact'
  },
  {
    id: '6',
    title: 'Consultation & Ongoing Advice',
    description: 'Act as your trusted financial sounding board with honest, strategic advice.',
    icon: Building2,
    href: '#contact'
  }
]

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading leading-snug mb-6">
            Our core services
          </h2>
          <p className="section-description leading-relaxed max-w-3xl mx-auto">
            Supporting individuals, families, and business owners with clear, practical financial advice
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="card p-8 text-center group hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-teal-500 text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="h-10 w-10" />
              </div>
              
              <h3 className="card-title tracking-wide mb-4">
                {service.title}
              </h3>
              
              <p className="card-description leading-relaxed mb-6">
                {service.description}
              </p>
              
              <Button
                onClick={() => scrollToSection('#contact')}
                className="group border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Non-credit Services Disclaimer */}
        <motion.div
          className="mt-16 p-6 bg-gray-50 rounded-lg border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Important Notice</h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            All non-credit services offered by GMG Financial Services are conducted under a separate licence or registration. 
            These services are not authorised under Australian Credit Licence 389328.
          </p>
        </motion.div>
      </div>
    </section>
  )
} 