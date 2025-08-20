'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, DollarSign, TrendingUp, Calendar } from 'lucide-react'

interface SuperGuaranteeForm {
  grossSalary: string
  payFrequency: 'weekly' | 'fortnightly' | 'monthly' | 'quarterly'
  superRate: string
  period: string
}

interface SuperGuaranteeResults {
  superPayable: number
  totalSuper: number
  breakdown: Array<{
    period: number
    ote: number
    superAmount: number
  }>
}

export function SuperGuaranteeCalculator() {
  const [form, setForm] = useState<SuperGuaranteeForm>({
    grossSalary: '80000',
    payFrequency: 'monthly',
    superRate: '12',
    period: '12'
  })

  const [results, setResults] = useState<SuperGuaranteeResults | null>(null)

  const calculateSuperGuarantee = (form: SuperGuaranteeForm): SuperGuaranteeResults => {
    const grossSalary = parseFloat(form.grossSalary)
    const superRate = parseFloat(form.superRate) / 100
    const period = parseFloat(form.period)
    
    // Calculate OTE per pay period
    const payPeriodsPerYear = {
      weekly: 52,
      fortnightly: 26,
      monthly: 12,
      quarterly: 4
    }[form.payFrequency]
    
    const otePerPeriod = grossSalary / payPeriodsPerYear
    const superPerPeriod = otePerPeriod * superRate
    const totalPeriods = Math.min(period, payPeriodsPerYear)
    
    const totalSuper = superPerPeriod * totalPeriods
    
    // Generate breakdown
    const breakdown = []
    for (let i = 1; i <= Math.min(totalPeriods, 12); i++) {
      breakdown.push({
        period: i,
        ote: otePerPeriod,
        superAmount: superPerPeriod
      })
    }

    return {
      superPayable: superPerPeriod,
      totalSuper,
      breakdown
    }
  }

  useEffect(() => {
    if (form.grossSalary && form.superRate && form.period) {
      try {
        const calculatedResults = calculateSuperGuarantee(form)
        setResults(calculatedResults)
      } catch (error) {
        setResults(null)
      }
    }
  }, [form])

  const handleInputChange = (field: keyof SuperGuaranteeForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator className="h-8 w-8 text-teal-500" />
          <h3 className="text-2xl font-heading font-light text-gray-900">Super Guarantee Calculator</h3>
        </div>
        <p className="text-gray-600">
          Calculate superannuation guarantee contributions for employees
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Employee Details</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gross Annual Salary</label>
              <input
                type="number"
                value={form.grossSalary}
                onChange={(e) => handleInputChange('grossSalary', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="80,000"
                min="0"
                step="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pay Frequency</label>
              <select
                value={form.payFrequency}
                onChange={(e) => handleInputChange('payFrequency', e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Super Guarantee Rate (%)</label>
              <input
                type="number"
                value={form.superRate}
                onChange={(e) => handleInputChange('superRate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="12"
                min="0"
                max="20"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Pay Periods</label>
              <input
                type="number"
                value={form.period}
                onChange={(e) => handleInputChange('period', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="12"
                min="1"
                max="52"
                step="1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Super Calculation</h4>
          
          {results ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-teal-500 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                  <h5 className="text-lg font-semibold text-white">Super Per Pay Period</h5>
                </div>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(results.superPayable)}
                </p>
                <p className="text-sm text-white mt-1">per {form.payFrequency.slice(0, -2)}</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h6 className="text-sm font-medium text-gray-600 mb-1">Total Super for Period</h6>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(results.totalSuper)}
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h6 className="text-sm font-medium text-gray-700 mb-2">Pay Period Breakdown</h6>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {results.breakdown.map((period) => (
                    <div key={period.period} className="flex justify-between text-xs">
                      <span className="text-gray-600">Period {period.period}</span>
                      <div className="flex gap-3">
                        <span className="text-gray-900">{formatCurrency(period.ote)}</span>
                        <span className="text-gray-500">{formatCurrency(period.superAmount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  OTE | Super
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Enter employee details to calculate super</p>
            </div>
          )}
        </div>
      </div>

      {/* Calculator Disclaimer */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
          <h5 className="text-sm font-semibold text-amber-800 mb-2">Important Disclaimer</h5>
          <p className="text-sm text-amber-700">
            Calculators are illustrative only and calculated based on the accuracy of the information entered by you. They are not a guarantee of an offer or acceptance of loan eligibility.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 mt-8">
        <div className="bg-teal-500 p-4 rounded-lg">
          <h5 className="text-sm font-semibold text-white mb-2">Data Sources</h5>
          <p className="text-sm text-white">
            This calculator uses superannuation guarantee methodology based on{' '}
            <a 
              href="https://www.ato.gov.au/calculators-and-tools/super-guarantee-contributions-calculator/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              ATO Super Guarantee guidelines
            </a>
            ,{' '}
            <a 
              href="https://www.fairwork.gov.au/pay-and-wages/superannuation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              Fair Work Australia standards
            </a>
            , and{' '}
            <a 
              href="https://www.ato.gov.au/businesses-and-organisations/super-for-employers/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              ATO employer super guidelines
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
} 