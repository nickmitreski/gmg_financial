'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PiggyBank, DollarSign, TrendingUp, Calendar } from 'lucide-react'

interface CompoundSavingsForm {
  initialAmount: string
  monthlyContribution: string
  annualRate: string
  years: string
}

interface CompoundSavingsResults {
  finalBalance: number
  totalContributions: number
  totalGrowth: number
  breakdown: Array<{
    year: number
    balance: number
    contributions: number
    growth: number
  }>
}

export function CompoundSavingsCalculator() {
  const [form, setForm] = useState<CompoundSavingsForm>({
    initialAmount: '10000',
    monthlyContribution: '500',
    annualRate: '5.5',
    years: '10'
  })

  const [results, setResults] = useState<CompoundSavingsResults | null>(null)

  const calculateCompoundSavings = (form: CompoundSavingsForm): CompoundSavingsResults => {
    const initial = parseFloat(form.initialAmount)
    const monthlyContribution = parseFloat(form.monthlyContribution)
    const annualRate = parseFloat(form.annualRate) / 100
    const years = parseFloat(form.years)
    
    const monthlyRate = annualRate / 12
    const totalMonths = years * 12

    // Future value of initial amount
    const futureValueInitial = initial * Math.pow(1 + annualRate, years)
    
    // Future value of monthly contributions
    const futureValueContributions = monthlyContribution * 
      (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate

    const finalBalance = futureValueInitial + futureValueContributions
    const totalContributions = initial + (monthlyContribution * totalMonths)
    const totalGrowth = finalBalance - totalContributions

    // Generate yearly breakdown
    const breakdown = []
    for (let year = 1; year <= Math.min(years, 10); year++) {
      const yearMonths = year * 12
      const yearBalance = initial * Math.pow(1 + annualRate, year) + 
                         monthlyContribution * (Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate
      const yearContributions = initial + (monthlyContribution * yearMonths)
      const yearGrowth = yearBalance - yearContributions
      
      breakdown.push({
        year,
        balance: yearBalance,
        contributions: yearContributions,
        growth: yearGrowth
      })
    }

    return {
      finalBalance,
      totalContributions,
      totalGrowth,
      breakdown
    }
  }

  useEffect(() => {
    if (form.initialAmount && form.monthlyContribution && form.annualRate && form.years) {
      try {
        const calculatedResults = calculateCompoundSavings(form)
        setResults(calculatedResults)
      } catch (error) {
        setResults(null)
      }
    }
  }, [form])

  const handleInputChange = (field: keyof CompoundSavingsForm, value: string) => {
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
          <PiggyBank className="h-8 w-8 text-teal-500" />
          <h3 className="text-2xl font-heading font-light text-gray-900">Compound Savings Calculator</h3>
        </div>
        <p className="text-gray-600">
          Plan your savings goals with compound interest calculations
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Savings Details</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Initial Amount</label>
              <input
                type="number"
                value={form.initialAmount}
                onChange={(e) => handleInputChange('initialAmount', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="10,000"
                min="0"
                step="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Contribution</label>
              <input
                type="number"
                value={form.monthlyContribution}
                onChange={(e) => handleInputChange('monthlyContribution', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="500"
                min="0"
                step="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Annual Interest Rate (%)</label>
              <input
                type="number"
                value={form.annualRate}
                onChange={(e) => handleInputChange('annualRate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="5.5"
                min="0"
                max="20"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Years</label>
              <input
                type="number"
                value={form.years}
                onChange={(e) => handleInputChange('years', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="10"
                min="1"
                max="50"
                step="1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Projected Results</h4>
          
          {results ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-teal-500 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                  <h5 className="text-lg font-semibold text-white">Final Balance</h5>
                </div>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(results.finalBalance)}
                </p>
                <p className="text-sm text-white mt-1">after {form.years} years</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-medium text-gray-600 mb-1">Total Contributions</h6>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.totalContributions)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-medium text-gray-600 mb-1">Total Growth</h6>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.totalGrowth)}
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h6 className="text-sm font-medium text-gray-700 mb-2">Yearly Breakdown</h6>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {results.breakdown.map((year) => (
                    <div key={year.year} className="flex justify-between text-xs">
                      <span className="text-gray-600">Year {year.year}</span>
                      <div className="flex gap-3">
                        <span className="text-gray-900">{formatCurrency(year.balance)}</span>
                        <span className="text-gray-500">{formatCurrency(year.growth)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Balance | Growth
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Enter savings details to see projections</p>
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
            This calculator uses compound interest methodology based on{' '}
            <a 
              href="https://moneysmart.gov.au/budgeting/compound-interest-calculator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              ASIC MoneySmart guidelines
            </a>
            ,{' '}
            <a 
              href="https://www.rba.gov.au/statistics/tables/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              RBA interest rate data
            </a>
            , and{' '}
            <a 
              href="https://www.ato.gov.au/individuals-and-families/investments-and-assets/bank-interest-and-investments/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              ATO investment guidelines
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
} 