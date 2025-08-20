'use client'

import React, { useState, useEffect } from 'react'
import posthog from 'posthog-js'
import { supabaseBrowser } from '@/lib/supabase-browser'
import { motion } from 'framer-motion'
import { Home, DollarSign, Calendar, TrendingUp } from 'lucide-react'

interface LoanRepaymentForm {
  loanAmount: string
  interestRate: string
  loanTerm: string
  repaymentFrequency: 'weekly' | 'fortnightly' | 'monthly'
}

interface LoanRepaymentResults {
  periodicRepayment: number
  totalRepayments: number
  totalInterest: number
  amortizationSchedule: Array<{
    payment: number
    principal: number
    interest: number
    balance: number
  }>
}

export function LoanRepaymentCalculator() {
  const [form, setForm] = useState<LoanRepaymentForm>({
    loanAmount: '500000',
    interestRate: '6.5',
    loanTerm: '30',
    repaymentFrequency: 'monthly'
  })

  const [results, setResults] = useState<LoanRepaymentResults | null>(null)

  // Calculate loan repayments using standard amortization formula
  const calculateLoanRepayment = (form: LoanRepaymentForm): LoanRepaymentResults => {
    const principal = parseFloat(form.loanAmount)
    const annualRate = parseFloat(form.interestRate) / 100
    const years = parseFloat(form.loanTerm)
    
    // Determine payments per year based on frequency
    const paymentsPerYear = {
      weekly: 52,
      fortnightly: 26,
      monthly: 12
    }[form.repaymentFrequency]
    
    const periodicRate = annualRate / paymentsPerYear
    const totalPayments = years * paymentsPerYear
    
    // Standard amortization formula
    const periodicRepayment = principal * (periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
                             (Math.pow(1 + periodicRate, totalPayments) - 1)
    
    const totalRepayments = periodicRepayment * totalPayments
    const totalInterest = totalRepayments - principal
    
    // Generate amortization schedule (first 12 payments)
    const amortizationSchedule = []
    let balance = principal
    
    for (let i = 1; i <= Math.min(12, totalPayments); i++) {
      const interest = balance * periodicRate
      const principalPayment = periodicRepayment - interest
      balance = balance - principalPayment
      
      amortizationSchedule.push({
        payment: i,
        principal: principalPayment,
        interest: interest,
        balance: Math.max(0, balance)
      })
    }
    
    return {
      periodicRepayment,
      totalRepayments,
      totalInterest,
      amortizationSchedule
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabaseBrowser.from('calculator_settings').select('params, disclaimer').eq('key', 'loan_repayment').maybeSingle()
        if (data?.params?.interestRate) setForm(prev => ({ ...prev, interestRate: String(data.params.interestRate) }))
      } catch {}
    })()
    if (form.loanAmount && form.interestRate && form.loanTerm) {
      try {
        const calculatedResults = calculateLoanRepayment(form)
        setResults(calculatedResults)
      } catch (error) {
        setResults(null)
      }
    }
  }, [form])

  const handleInputChange = (field: keyof LoanRepaymentForm, value: string) => {
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
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Home className="h-8 w-8 text-teal-500" />
          <h3 className="text-2xl font-heading font-light text-gray-900">Loan Repayment Calculator</h3>
        </div>
        <p className="text-gray-600">
          Calculate your mortgage repayments using the standard amortization formula
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h4>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={form.loanAmount}
                  onChange={(e) => handleInputChange('loanAmount', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="500,000"
                  min="0"
                  step="1000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repayment Frequency
              </label>
              <select
                value={form.repaymentFrequency}
                onChange={(e) => handleInputChange('repaymentFrequency', e.target.value as any)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Results</h4>
          
          {results ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-teal-500 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                  <h5 className="text-lg font-semibold text-white">Periodic Repayment</h5>
                </div>
                <p className="text-3xl font-bold text-white">
                  {formatCurrency(results.periodicRepayment)}
                </p>
                <p className="text-sm text-white mt-1">
                  per {form.repaymentFrequency.slice(0, -2)}
                </p>
                <button
                  onClick={() => {
                    try {
                      posthog.capture('calculator_used', {
                        calculator_key: 'loan_repayment',
                        inputs: form,
                        result: {
                          periodicRepayment: results.periodicRepayment,
                          totalRepayments: results.totalRepayments,
                          totalInterest: results.totalInterest,
                        },
                      })
                    } catch {}
                  }}
                  className="mt-3 px-3 py-1 rounded bg-white/10 text-white text-xs hover:bg-white/20"
                >
                  Log Usage
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-medium text-gray-600 mb-1">Total Repayments</h6>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.totalRepayments)}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h6 className="text-sm font-medium text-gray-600 mb-1">Total Interest</h6>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(results.totalInterest)}
                  </p>
                </div>
              </div>

              {/* Amortization Schedule Preview */}
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <h6 className="text-sm font-medium text-gray-700 mb-2">First 12 Payments</h6>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {results.amortizationSchedule.map((payment) => (
                    <div key={payment.payment} className="flex justify-between text-xs">
                      <span className="text-gray-600">Payment {payment.payment}</span>
                      <div className="flex gap-3">
                        <span className="text-gray-900">{formatCurrency(payment.principal)}</span>
                        <span className="text-gray-500">{formatCurrency(payment.interest)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Principal | Interest
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-lg text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Enter loan details to see your repayment calculations</p>
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
            This calculator uses the standard amortization formula as recommended by{' '}
            <a 
              href="https://moneysmart.gov.au/home-loans/mortgage-calculator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              ASIC MoneySmart
            </a>
            ,{' '}
            <a 
              href="https://www.rba.gov.au/statistics/tables/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              Reserve Bank of Australia
            </a>
            , and{' '}
            <a 
              href="https://www.afca.org.au/making-a-complaint/financial-hardship" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              AFCA lending standards
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
} 