'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Building2, DollarSign, Calendar, TrendingUp } from 'lucide-react'

interface InterestOnlyForm {
  loanAmount: string
  interestRate: string
  interestOnlyPeriod: string
  totalTerm: string
}

interface InterestOnlyResults {
  interestOnlyPayment: number
  piPayment: number
  totalInterestCost: number
  fullPiCost: number
  costDifference: number
}

export function InterestOnlyCalculator() {
  const [form, setForm] = useState<InterestOnlyForm>({
    loanAmount: '500000',
    interestRate: '6.5',
    interestOnlyPeriod: '5',
    totalTerm: '30'
  })

  const [results, setResults] = useState<InterestOnlyResults | null>(null)

  const calculateInterestOnly = (form: InterestOnlyForm): InterestOnlyResults => {
    const principal = parseFloat(form.loanAmount)
    const annualRate = parseFloat(form.interestRate) / 100
    const interestOnlyYears = parseFloat(form.interestOnlyPeriod)
    const totalYears = parseFloat(form.totalTerm)
    
    const monthlyRate = annualRate / 12
    const interestOnlyMonths = interestOnlyYears * 12
    const piMonths = (totalYears - interestOnlyYears) * 12
    const totalMonths = totalYears * 12

    // Interest-only payment
    const interestOnlyPayment = principal * monthlyRate

    // P&I payment after interest-only period
    const piPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, piMonths)) / 
                     (Math.pow(1 + monthlyRate, piMonths) - 1)

    // Total interest cost
    const interestOnlyInterest = interestOnlyPayment * interestOnlyMonths
    const piInterest = (piPayment * piMonths) - principal
    const totalInterestCost = interestOnlyInterest + piInterest

    // Full P&I cost for comparison
    const fullPiPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                         (Math.pow(1 + monthlyRate, totalMonths) - 1)
    const fullPiCost = (fullPiPayment * totalMonths) - principal

    const costDifference = totalInterestCost - fullPiCost

    return {
      interestOnlyPayment,
      piPayment,
      totalInterestCost,
      fullPiCost,
      costDifference
    }
  }

  useEffect(() => {
    if (form.loanAmount && form.interestRate && form.interestOnlyPeriod && form.totalTerm) {
      try {
        const calculatedResults = calculateInterestOnly(form)
        setResults(calculatedResults)
      } catch (error) {
        setResults(null)
      }
    }
  }, [form])

  const handleInputChange = (field: keyof InterestOnlyForm, value: string) => {
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
          <Building2 className="h-8 w-8 text-teal-500" />
          <h3 className="text-2xl font-heading font-light text-gray-900">Interest-Only vs P&I Calculator</h3>
        </div>
        <p className="text-gray-600">
          Compare interest-only and principal & interest loan structures
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
              <input
                type="number"
                value={form.loanAmount}
                onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="500,000"
                min="0"
                step="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
              <input
                type="number"
                value={form.interestRate}
                onChange={(e) => handleInputChange('interestRate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="6.5"
                min="0"
                max="20"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interest-Only Period (Years)</label>
              <input
                type="number"
                value={form.interestOnlyPeriod}
                onChange={(e) => handleInputChange('interestOnlyPeriod', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="5"
                min="1"
                max="10"
                step="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Total Loan Term (Years)</label>
              <input
                type="number"
                value={form.totalTerm}
                onChange={(e) => handleInputChange('totalTerm', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="30"
                min="1"
                max="50"
                step="1"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Comparison Results</h4>
          
          {results ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-teal-500 p-4 rounded-lg">
                  <h6 className="text-sm font-medium text-white mb-1">Interest-Only Payment</h6>
                  <p className="text-lg font-semibold text-white">
                    {formatCurrency(results.interestOnlyPayment)}
                  </p>
                  <p className="text-xs text-white">per month</p>
                </div>
                <div className="bg-teal-500 p-4 rounded-lg">
                  <h6 className="text-sm font-medium text-white mb-1">P&I Payment</h6>
                  <p className="text-lg font-semibold text-white">
                    {formatCurrency(results.piPayment)}
                  </p>
                  <p className="text-xs text-white">per month</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h6 className="text-sm font-semibold text-gray-900 mb-2">Cost Comparison</h6>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Interest-Only Total Interest:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(results.totalInterestCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Full P&I Total Interest:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(results.fullPiCost)}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="text-gray-700">Additional Cost:</span>
                    <span className="font-semibold text-red-600">{formatCurrency(results.costDifference)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Enter loan details to see comparison</p>
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
            This calculator uses interest-only mortgage methodology based on{' '}
            <a 
              href="https://moneysmart.gov.au/home-loans/interest-only-mortgage-calculator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              ASIC MoneySmart guidelines
            </a>
            ,{' '}
            <a 
              href="https://www.apra.gov.au/sites/default/files/2023-12/Prudential_Practice_Guide_APG_223_Residential_Mortgage_Lending_December_2023.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              APRA lending standards
            </a>
            , and{' '}
            <a 
              href="https://www.rba.gov.au/statistics/tables/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              RBA interest rate data
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
} 