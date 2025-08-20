'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Calendar, Calculator } from 'lucide-react'

interface RefinanceForm {
  currentBalance: string
  currentRate: string
  currentFees: string
  newRate: string
  newFees: string
  refinanceCosts: string
  remainingTerm: string
}

interface RefinanceResults {
  currentMonthlyPayment: number
  newMonthlyPayment: number
  monthlySavings: number
  totalInterestSaved: number
  breakEvenMonths: number
  totalSavings: number
}

export function RefinanceCalculator() {
  const [form, setForm] = useState<RefinanceForm>({
    currentBalance: '400000',
    currentRate: '7.5',
    currentFees: '395',
    newRate: '6.5',
    newFees: '0',
    refinanceCosts: '1500',
    remainingTerm: '25'
  })

  const [results, setResults] = useState<RefinanceResults | null>(null)

  const calculateRefinance = (form: RefinanceForm): RefinanceResults => {
    const balance = parseFloat(form.currentBalance)
    const currentRate = parseFloat(form.currentRate) / 100
    const newRate = parseFloat(form.newRate) / 100
    const remainingMonths = parseFloat(form.remainingTerm) * 12
    const currentFees = parseFloat(form.currentFees)
    const newFees = parseFloat(form.newFees)
    const refinanceCosts = parseFloat(form.refinanceCosts)

    const monthlyCurrentRate = currentRate / 12
    const monthlyNewRate = newRate / 12

    // Calculate current monthly payment
    const currentMonthlyPayment = balance * (monthlyCurrentRate * Math.pow(1 + monthlyCurrentRate, remainingMonths)) / 
                                 (Math.pow(1 + monthlyCurrentRate, remainingMonths) - 1)

    // Calculate new monthly payment
    const newMonthlyPayment = balance * (monthlyNewRate * Math.pow(1 + monthlyNewRate, remainingMonths)) / 
                             (Math.pow(1 + monthlyNewRate, remainingMonths) - 1)

    const monthlySavings = currentMonthlyPayment - newMonthlyPayment

    // Calculate total interest saved
    const currentTotalInterest = (currentMonthlyPayment * remainingMonths) - balance
    const newTotalInterest = (newMonthlyPayment * remainingMonths) - balance
    const totalInterestSaved = currentTotalInterest - newTotalInterest

    // Calculate break-even time
    const totalCosts = refinanceCosts + (newFees - currentFees) * remainingMonths
    const breakEvenMonths = totalCosts / monthlySavings

    const totalSavings = totalInterestSaved - totalCosts

    return {
      currentMonthlyPayment,
      newMonthlyPayment,
      monthlySavings,
      totalInterestSaved,
      breakEvenMonths,
      totalSavings
    }
  }

  useEffect(() => {
    if (form.currentBalance && form.currentRate && form.newRate && form.remainingTerm) {
      try {
        const calculatedResults = calculateRefinance(form)
        setResults(calculatedResults)
      } catch (error) {
        setResults(null)
      }
    }
  }, [form])

  const handleInputChange = (field: keyof RefinanceForm, value: string) => {
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
          <DollarSign className="h-8 w-8 text-teal-500" />
          <h3 className="text-2xl font-heading font-light text-gray-900">Refinance Savings Calculator</h3>
        </div>
        <p className="text-gray-600">
          Compare your current loan with a new loan to see potential savings
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Loan Balance</label>
              <input
                type="number"
                value={form.currentBalance}
                onChange={(e) => handleInputChange('currentBalance', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="400,000"
                min="0"
                step="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Interest Rate (%)</label>
              <input
                type="number"
                value={form.currentRate}
                onChange={(e) => handleInputChange('currentRate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="7.5"
                min="0"
                max="20"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Interest Rate (%)</label>
              <input
                type="number"
                value={form.newRate}
                onChange={(e) => handleInputChange('newRate', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="6.5"
                min="0"
                max="20"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Remaining Term (Years)</label>
              <input
                type="number"
                value={form.remainingTerm}
                onChange={(e) => handleInputChange('remainingTerm', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="25"
                min="1"
                max="50"
                step="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Annual Fees</label>
              <input
                type="number"
                value={form.currentFees}
                onChange={(e) => handleInputChange('currentFees', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="395"
                min="0"
                step="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Annual Fees</label>
              <input
                type="number"
                value={form.newFees}
                onChange={(e) => handleInputChange('newFees', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="0"
                min="0"
                step="10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Refinancing Costs</label>
              <input
                type="number"
                value={form.refinanceCosts}
                onChange={(e) => handleInputChange('refinanceCosts', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="1,500"
                min="0"
                step="100"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Refinance Analysis</h4>
          
          {results ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-teal-500 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                  <h5 className="text-lg font-semibold text-white">Monthly Savings</h5>
                </div>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(results.monthlySavings)}
                </p>
                <p className="text-sm text-white mt-1">per month</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-medium text-gray-600 mb-1">Current Payment</h6>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.currentMonthlyPayment)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-medium text-gray-600 mb-1">New Payment</h6>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.newMonthlyPayment)}
                  </p>
                </div>
              </div>

              <div className="bg-teal-500 p-4 rounded-lg">
                <h6 className="text-sm font-semibold text-white mb-2">Savings Breakdown</h6>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Total Interest Saved:</span>
                    <span className="font-semibold text-white">{formatCurrency(results.totalInterestSaved)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Break-even Time:</span>
                    <span className="font-semibold text-white">{results.breakEvenMonths.toFixed(1)} months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Net Savings:</span>
                    <span className="font-semibold text-white">{formatCurrency(results.totalSavings)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Enter loan details to see refinancing analysis</p>
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
            This calculator uses mortgage switching methodology based on{' '}
            <a 
              href="https://moneysmart.gov.au/home-loans/mortgage-switching-calculator" 
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
              href="https://www.afca.org.au/making-a-complaint/financial-hardship" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              AFCA refinancing standards
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
} 