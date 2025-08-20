'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HelpCircle, ChevronDown } from 'lucide-react'

const faqItems = [
  {
    id: '1',
    question: 'What financial planning services does GMG Financial Services offer in Melbourne?',
    answer: 'GMG Financial Services offers comprehensive financial planning including budgeting strategies, cash flow management, investment portfolio reviews, retirement planning, and wealth building strategies. Our Melbourne-based team provides personalized financial advice for individuals, families, and business owners with over 20 years of combined experience in accounting, finance, and banking.'
  },
  {
    id: '2',
    question: 'How much experience do GMG Financial Services have in financial advisory?',
    answer: 'GMG Financial Services has over 20 years of combined experience across accounting, finance, and banking industries. Our Melbourne financial advisors bring deep expertise in personal finance, business financial management, investment strategies, and lending solutions. This extensive experience allows us to provide practical, real-world financial advice tailored to Australian market conditions.'
  },
  {
    id: '3',
    question: 'Do GMG Financial Services work with both individuals and businesses in Melbourne?',
    answer: 'Yes, GMG Financial Services supports individuals, families, and business owners throughout Melbourne and Victoria. We provide personal financial planning for individuals, family wealth management strategies, and comprehensive business financial services including cash flow management, business performance analysis, and strategic financial planning for Melbourne businesses.'
  },
  {
    id: '4',
    question: 'What areas of Melbourne and Victoria do GMG Financial Services cover?',
    answer: 'GMG Financial Services primarily services Melbourne CBD and surrounding suburbs, including the eastern, western, northern, and southern regions of Melbourne. We also work with clients across Victoria and can provide remote financial advisory services to clients throughout Australia, depending on their specific financial planning needs and service requirements.'
  },
  {
    id: '5',
    question: 'How do I start a financial consultation with GMG Financial Services?',
    answer: 'Starting your financial consultation with GMG Financial Services is simple. Contact us via phone at 1300 GMG FIN, email us directly, or complete our online contact form. We offer a free initial consultation where we discuss your financial goals, current situation, and how our Melbourne financial advisors can help you achieve your financial objectives through personalized planning and strategic advice.'
  },
  {
    id: '6',
    question: 'What makes GMG Financial Services different from other Melbourne financial advisors?',
    answer: 'GMG Financial Services stands out through our practical, results-focused approach to financial planning. We translate complex financial concepts into clear, actionable advice, provide honest strategic guidance, and focus on solutions that work in real life. Our 20+ years of experience across multiple financial disciplines, combined with our Melbourne-based expertise, gives us a unique perspective on Australian financial markets and personal wealth management.'
  },
  {
    id: '7',
    question: 'What investment and lending services does GMG Financial Services provide?',
    answer: 'GMG Financial Services offers comprehensive investment review services, portfolio analysis, and lending solutions including home loan applications, business financing, and debt reduction strategies. Our Melbourne financial advisors help clients make informed investment decisions, optimize their lending arrangements, and develop strategies for building wealth through smart financial planning and investment management.'
  }
]

export function FAQSection() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id)
  }

  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }

  return (
    <section id="faq" className="section-padding bg-white">
      {/* FAQ Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <div className="container-custom">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-heading leading-snug mb-6">
            Frequently asked questions
          </h2>
          <p className="section-description leading-relaxed max-w-3xl mx-auto">
            Get answers to common questions about our Melbourne financial services and approach
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="card border border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-inset"
                aria-expanded={openItem === item.id}
                aria-controls={`faq-answer-${item.id}`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <HelpCircle className="h-5 w-5 text-teal-500 flex-shrink-0" />
                  <h3 className="faq-question uppercase tracking-wider text-left">
                    {item.question}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openItem === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openItem === item.id && (
                  <motion.div
                    id={`faq-answer-${item.id}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      height: "auto",
                      transition: {
                        height: { duration: 0.4, ease: "easeInOut" },
                        opacity: { duration: 0.3, delay: 0.1 }
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      transition: {
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2 }
                      }
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-100">
                        <p className="faq-answer leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 