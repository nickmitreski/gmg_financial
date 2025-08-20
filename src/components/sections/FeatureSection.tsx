'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, Home, TrendingUp, DollarSign, PiggyBank, Building2, ArrowRight } from 'lucide-react'

// Calculator components
import { LoanRepaymentCalculator } from './calculators/LoanRepaymentCalculator'
import { BorrowingPowerCalculator } from './calculators/BorrowingPowerCalculator'
import { RefinanceCalculator } from './calculators/RefinanceCalculator'
import { InterestOnlyCalculator } from './calculators/InterestOnlyCalculator'
import { CompoundSavingsCalculator } from './calculators/CompoundSavingsCalculator'
import { SuperGuaranteeCalculator } from './calculators/SuperGuaranteeCalculator'

const calculators = [
  {
    id: 'loan-repayment',
    name: 'Loan Repayment',
    description: 'Calculate your mortgage repayments',
    icon: Home,
    component: LoanRepaymentCalculator
  },
  {
    id: 'borrowing-power',
    name: 'Borrowing Power',
    description: 'See how much you can borrow',
    icon: TrendingUp,
    component: BorrowingPowerCalculator
  },
  {
    id: 'refinance',
    name: 'Refinance Savings',
    description: 'Calculate refinancing benefits',
    icon: DollarSign,
    component: RefinanceCalculator
  },
  {
    id: 'interest-only',
    name: 'Interest-Only vs P&I',
    description: 'Compare loan types',
    icon: Building2,
    component: InterestOnlyCalculator
  },
  {
    id: 'compound-savings',
    name: 'Compound Savings',
    description: 'Plan your savings goals',
    icon: PiggyBank,
    component: CompoundSavingsCalculator
  },
  {
    id: 'super-guarantee',
    name: 'Super Guarantee',
    description: 'Calculate super contributions',
    icon: Calculator,
    component: SuperGuaranteeCalculator
  }
]

export function FeatureSection() {
  const [activeCalculator, setActiveCalculator] = useState('loan-repayment')

  return (
    <section id="calculators" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-teal-500 tracking-tight mb-6">
            Financial Calculators
          </h2>
          <p className="text-base font-light text-gray-700 max-w-3xl mx-auto">
            Make informed financial decisions with our comprehensive suite of calculators. 
            Get accurate estimates for loans, savings, and investments.
          </p>
        </motion.div>

        {/* Calculator Toggle Navigation */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex justify-center">
            <div className="flex rounded-lg border-2 border-black bg-white overflow-hidden">
              {calculators.map((calculator, index) => {
                const Icon = calculator.icon
                const isActive = activeCalculator === calculator.id
                
                return (
                  <button
                    key={calculator.id}
                    onClick={() => setActiveCalculator(calculator.id)}
                    className={`
                      flex items-center gap-2 px-4 py-3 transition-all duration-300 text-sm font-medium
                      ${isActive 
                        ? 'bg-teal-500 text-white' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                      ${index !== calculators.length - 1 ? 'border-r border-black' : ''}
                    `}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-teal-500'}`} />
                    {calculator.name}
                  </button>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Calculator Content */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl border-2 border-black p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            {calculators.map((calculator) => {
              if (calculator.id === activeCalculator) {
                const CalculatorComponent = calculator.component
                return (
                  <motion.div
                    key={calculator.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CalculatorComponent />
                  </motion.div>
                )
              }
              return null
            })}
          </AnimatePresence>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm text-gray-700 max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> These calculators provide estimates only and should not be considered as financial advice. 
            Results are based on the information you provide and current market conditions. For personalized financial advice, 
            please consult with GMG Financial Services.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a
            href="/#contact"
            className="inline-flex items-center gap-3 bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-lg transition-colors font-medium"
          >
            Get Personalized Financial Advice
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
} 