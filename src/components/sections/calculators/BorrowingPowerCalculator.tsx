'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Users, CreditCard, Home } from 'lucide-react'

interface BorrowingPowerForm {
  grossIncome: string
  partnerIncome: string
  otherIncome: string
  livingExpenses: string
  existingDebts: string
  deposit: string
  loanType: 'owner-occupier' | 'investor'
  interestRate: string
  loanTerm: string
}

interface BorrowingPowerResults {
  estimatedBorrowingCapacity: number
  monthlyRepayment: number
  debtToIncomeRatio: number
  loanToValueRatio: number
  serviceabilityBuffer: number
}

export function BorrowingPowerCalculator() {
  const [form, setForm] = useState<BorrowingPowerForm>({
    grossIncome: '80000',
    partnerIncome: '0',
    otherIncome: '0',
    livingExpenses: '3000',
    existingDebts: '500',
    deposit: '100000',
    loanType: 'owner-occupier',
    interestRate: '6.5',
    loanTerm: '30'
  })

  const [results, setResults] = useState<BorrowingPowerResults | null>(null)

  // Calculate borrowing power using ASIC MoneySmart methodology
  const calculateBorrowingPower = (form: BorrowingPowerForm): BorrowingPowerResults => {
    const totalIncome = parseFloat(form.grossIncome) + parseFloat(form.partnerIncome) + parseFloat(form.otherIncome)
    const monthlyIncome = totalIncome / 12
    const monthlyExpenses = parseFloat(form.livingExpenses)
    const monthlyDebts = parseFloat(form.existingDebts)
    const deposit = parseFloat(form.deposit)
    const annualRate = parseFloat(form.interestRate) / 100
    const monthlyRate = annualRate / 12
    const totalMonths = parseFloat(form.loanTerm) * 12

    // ASIC serviceability buffer (3% above current rate)
    const serviceabilityRate = annualRate + 0.03
    const serviceabilityMonthlyRate = serviceabilityRate / 12

    // Available monthly income for loan repayments
    const availableIncome = monthlyIncome - monthlyExpenses - monthlyDebts

    // Maximum monthly repayment capacity (using 30% of gross income as conservative estimate)
    const maxMonthlyRepayment = Math.min(availableIncome * 0.8, monthlyIncome * 0.3)

    // Calculate maximum loan amount using reverse amortization
    const maxLoanAmount = maxMonthlyRepayment * (1 - Math.pow(1 + serviceabilityMonthlyRate, -totalMonths)) / serviceabilityMonthlyRate

    // Apply LVR constraints (80% for owner-occupier, 70% for investor)
    const maxLVR = form.loanType === 'owner-occupier' ? 0.8 : 0.7
    const maxPropertyValue = maxLoanAmount / maxLVR
    const adjustedBorrowingCapacity = Math.min(maxLoanAmount, maxPropertyValue * maxLVR)

    // Calculate actual monthly repayment for the borrowing capacity
    const actualMonthlyRepayment = adjustedBorrowingCapacity * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                                  (Math.pow(1 + monthlyRate, totalMonths) - 1)

    // Calculate ratios
    const debtToIncomeRatio = ((actualMonthlyRepayment + monthlyDebts) * 12) / totalIncome
    const loanToValueRatio = adjustedBorrowingCapacity / (adjustedBorrowingCapacity + deposit)

    return {
      estimatedBorrowingCapacity: adjustedBorrowingCapacity,
      monthlyRepayment: actualMonthlyRepayment,
      debtToIncomeRatio: debtToIncomeRatio,
      loanToValueRatio: loanToValueRatio,
      serviceabilityBuffer: serviceabilityRate
    }
  }

  useEffect(() => {
    if (form.grossIncome && form.livingExpenses && form.interestRate && form.loanTerm) {
      try {
        const calculatedResults = calculateBorrowingPower(form)
        setResults(calculatedResults)
      } catch (error) {
        setResults(null)
      }
    }
  }, [form])

  const handleInputChange = (field: keyof BorrowingPowerForm, value: string) => {
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

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <TrendingUp className="h-8 w-8 text-teal-500" />
          <h3 className="text-2xl font-heading font-light text-gray-900">Borrowing Power Calculator</h3>
        </div>
        <p className="text-gray-600">
          Estimate how much you can borrow based on your income, expenses, and financial situation
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Financial Information</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Gross Annual Income
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={form.grossIncome}
                  onChange={(e) => handleInputChange('grossIncome', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="80,000"
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Partner's Gross Annual Income (if applicable)
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={form.partnerIncome}
                  onChange={(e) => handleInputChange('partnerIncome', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Annual Income (investments, etc.)
              </label>
              <input
                type="number"
                value={form.otherIncome}
                onChange={(e) => handleInputChange('otherIncome', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="0"
                min="0"
                step="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Living Expenses
              </label>
              <input
                type="number"
                value={form.livingExpenses}
                onChange={(e) => handleInputChange('livingExpenses', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="3,000"
                min="0"
                step="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Existing Debts
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={form.existingDebts}
                  onChange={(e) => handleInputChange('existingDebts', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="500"
                  min="0"
                  step="50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deposit Amount
              </label>
              <input
                type="number"
                value={form.deposit}
                onChange={(e) => handleInputChange('deposit', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="100,000"
                min="0"
                step="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Type
              </label>
              <select
                value={form.loanType}
                onChange={(e) => handleInputChange('loanType', e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="owner-occupier">Owner-Occupier</option>
                <option value="investor">Investment Property</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (%)
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Term (Years)
              </label>
              <input
                type="number"
                value={form.loanTerm}
                onChange={(e) => handleInputChange('loanTerm', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="30"
                min="1"
                max="50"
                step="1"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Borrowing Capacity</h4>
          
          {results ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-teal-500 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Home className="h-6 w-6 text-white" />
                  <h5 className="text-lg font-semibold text-white">Estimated Borrowing Capacity</h5>
                </div>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(results.estimatedBorrowingCapacity)}
                </p>
                <p className="text-sm text-white mt-1">
                  Maximum loan amount you may be eligible for
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-medium text-gray-600 mb-1">Monthly Repayment</h6>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.monthlyRepayment)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-medium text-gray-600 mb-1">Debt-to-Income Ratio</h6>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatPercentage(results.debtToIncomeRatio)}
                  </p>
                </div>
              </div>

              <div className="bg-teal-500 p-4 rounded-lg">
                <h6 className="text-sm font-semibold text-white mb-2">Key Ratios</h6>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Loan-to-Value Ratio:</span>
                    <span className="font-semibold text-white">{formatPercentage(results.loanToValueRatio)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Serviceability Buffer:</span>
                    <span className="font-semibold text-white">{formatPercentage(results.serviceabilityBuffer)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <h6 className="text-sm font-semibold text-gray-900 mb-2">Important Notes</h6>
                <ul className="text-xs text-gray-800 space-y-1">
                  <li>• Results are estimates only and subject to lender assessment</li>
                  <li>• Serviceability buffer of 3% applied to current rates</li>
                  <li>• Maximum LVR: {form.loanType === 'owner-occupier' ? '80%' : '70%'}</li>
                  <li>• Actual borrowing capacity may vary based on lender policies</li>
                </ul>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Enter your financial details to see your borrowing capacity</p>
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

      {/* Data Source */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <div className="bg-teal-500 p-4 rounded-lg">
          <h5 className="text-sm font-semibold text-white mb-2">Data Sources</h5>
          <p className="text-sm text-white">
            This calculator uses serviceability assessment methodology based on{' '}
            <a 
              href="https://moneysmart.gov.au/how-much-can-i-borrow" 
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