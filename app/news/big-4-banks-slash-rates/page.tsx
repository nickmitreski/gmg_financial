import { Metadata } from 'next'
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react'
import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Big 4 Banks Slash Rates Ahead of RBA Decision | GMG Financial Services Melbourne',
  description: 'Major Australian banks including CBA, NAB, ANZ, and Westpac have preemptively reduced home loan rates ahead of the RBA decision. Get professional financial advice from GMG Financial Services in Melbourne.',
  keywords: 'Big 4 banks, RBA interest rates, home loan rates Melbourne, mortgage refinancing, CBA rates, NAB rates, ANZ rates, Westpac rates, GMG Financial Services, Melbourne financial advisor, mortgage broker Melbourne',
  openGraph: {
    title: 'Big 4 Banks Slash Rates Ahead of RBA Decision | GMG Financial Services',
    description: 'Major Australian banks have preemptively reduced home loan rates. Professional financial advice from Melbourne-based GMG Financial Services.',
    type: 'article',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Big 4 Banks Slash Rates Ahead of RBA Decision | GMG Financial Services',
    description: 'Major Australian banks have preemptively reduced home loan rates. Professional financial advice from Melbourne-based GMG Financial Services.',
  },
  alternates: {
    canonical: 'https://gmgfinancial.com.au/news/big-4-banks-slash-rates',
  },
}

export default function Big4BanksArticle() {
  return (
    <>
      <main className="min-h-screen bg-white">
        {/* Navigation Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="container-custom py-4">
            <Link 
              href="/#latest-news" 
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors font-medium text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Latest News
            </Link>
          </div>
        </header>

        {/* Article Container */}
        <div className="container-custom py-8">
          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              {/* Category and Date */}
              <div className="flex items-center gap-4 mb-6">
                <span className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Financial News
                </span>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>August 6, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>5 min read</span>
                  </div>
                </div>
              </div>

                             {/* Main Title */}
               <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light leading-tight text-[#1f2937] mb-6">
                 Big 4 Banks Slash Rates Ahead of RBA Decision
               </h1>
               
               {/* Subtitle */}
               <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-8">
                 A must-read analysis for buyers and refinancers as major Australian lenders preemptively reduce home loan rates
               </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                  GM
                </div>
                <div>
                  <p className="font-medium text-[#1f2937]">GMG Financial Services</p>
                  <p className="text-sm text-gray-500">Melbourne Financial Advisors</p>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-12">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Australian banking and financial institutions" 
                className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-lg"
              />
              <p className="text-sm text-gray-500 mt-3 text-center">
                Australian banks are responding to economic indicators with preemptive rate cuts
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-gray max-w-none">
                             {/* Introduction */}
               <div className="border-l-4 border-black p-6 mb-8 rounded-r-lg">
                 <p className="text-gray-700 m-0 text-base leading-relaxed">
                   <strong>Key Update:</strong> With speculation building that the Reserve Bank of Australia (RBA) 
                   is set to cut interest rates around August 12, 2025, seven Australian lenders—including all Big 4 banks— 
                   have already preemptively reduced their home loan rates, according to recent reports from{' '}
                   <a 
                     href="https://www.realestate.com.au/news/aus-banks-slash-interest-rates-early-as-rba-showdown-looms/?utm_source=chatgpt.com" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-teal-600 hover:text-teal-700 underline font-medium"
                   >
                     Real Estate Australia
                   </a>.
                 </p>
               </div>

                             {/* Main Content */}
               <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                 Major Rate Reductions Announced
               </h2>
               
               <p className="text-base leading-relaxed text-gray-700 mb-8">
                 The Australian financial landscape is experiencing a significant shift as lenders respond to 
                 economic indicators and market expectations. This proactive approach by major banks signals 
                 a competitive environment that could benefit borrowers across the country.
               </p>

              {/* Image with caption */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Interest rate charts and financial data" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Financial institutions are closely monitoring RBA decisions and market trends
                </figcaption>
              </figure>

                             <h3 className="text-xl font-heading font-light text-[#1f2937] mb-6">
                 Record-Breaking Low Rates Emerge
               </h3>
               
               <p className="text-base leading-relaxed text-gray-700 mb-8">
                 Police Credit Union has set a new benchmark in the Australian market, offering variable rates 
                 from 4.99% for eligible owner-occupiers—marking a two-year low. Meanwhile, fixed-rate reductions 
                 as low as 4.94% are being offered by G & C Mutual Bank, Unity Bank, Bank of China, and The Mutual Bank, 
                 as reported by{' '}
                 <a 
                   href="https://www.realestate.com.au/news/aus-banks-slash-interest-rates-early-as-rba-showdown-looms/?utm_source=chatgpt.com" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-teal-600 hover:text-teal-700 underline font-medium"
                 >
                   Real Estate Australia
                 </a>.
               </p>

                             {/* Big 4 Bank Updates */}
               <div className="border border-gray-300 p-8 rounded-2xl mb-12">
                 <h4 className="text-lg font-semibold text-[#1f2937] mb-6">Big 4 Bank Rate Updates</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-[#1f2937]">Commonwealth Bank (CBA)</p>
                        <p className="text-gray-600">Digi Home Loan reduced to 5.59% (owner-occupier, discount rate) with fixed rates starting at 5.49%</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-[#1f2937]">NAB</p>
                        <p className="text-gray-600">Variable rates down to 5.94%</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-[#1f2937]">ANZ</p>
                        <p className="text-gray-600">Exclusive ANZ Plus rate at 5.59% for refinancers, Simplicity PLUS starting at 5.89%</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-[#1f2937]">Westpac</p>
                        <p className="text-gray-600">Variable rates now under 6%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-6 pt-4 border-t border-gray-200">
                  Source: <a 
                    href="https://www.yourmortgage.com.au/mortgage-news/today-s-mortgage-refinance-rates-commbank-nab-anz-slash-home-loan-rates?utm_source=chatgpt.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 underline"
                  >
                    Your Mortgage Australia
                  </a>
                </p>
              </div>

                             <h3 className="text-xl font-heading font-light text-[#1f2937] mb-6">
                 What This Means for Australian Homeowners
               </h3>
               
               <p className="text-base leading-relaxed text-gray-700 mb-8">
                 These rate reductions translate to significant savings for Australian homeowners, buyers, and investors. 
                 The impact varies based on loan size and individual circumstances.
               </p>

                             {/* Savings Calculator Visual */}
               <div className="grid md:grid-cols-2 gap-8 mb-12">
                 <div className="border border-gray-300 p-6 rounded-xl">
                   <h4 className="text-base font-semibold text-[#1f2937] mb-4">Monthly Savings Breakdown</h4>
                   <div className="space-y-3">
                     <div className="flex justify-between items-center">
                       <span className="text-gray-700">$600K loan</span>
                       <span className="font-semibold text-[#1f2937]">$90/month</span>
                     </div>
                     <div className="flex justify-between items-center">
                       <span className="text-gray-700">$750K loan</span>
                       <span className="font-semibold text-[#1f2937]">$113/month</span>
                     </div>
                     <div className="flex justify-between items-center">
                       <span className="text-gray-700">$1M loan</span>
                       <span className="font-semibold text-[#1f2937]">$150/month</span>
                     </div>
                   </div>
                   <p className="text-sm text-gray-600 mt-4">
                     Based on 0.25% rate reduction, according to{' '}
                     <a 
                       href="https://www.yourmortgage.com.au/mortgage-news/today-s-mortgage-refinance-rates-commbank-nab-anz-slash-home-loan-rates?utm_source=chatgpt.com" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-teal-600 hover:text-teal-700 underline"
                     >
                       Your Mortgage Australia
                     </a>
                   </p>
                 </div>
                 <div className="border border-gray-300 p-6 rounded-xl">
                   <h4 className="text-base font-semibold text-[#1f2937] mb-4">Future Outlook</h4>
                   <p className="text-gray-700 text-sm leading-relaxed">
                     With the RBA expected to deliver more rate cuts through 2025, variable rate loans may offer 
                     greater flexibility. Up to five cuts could be on the way, though some economists expect fewer. 
                     This creates opportunities for strategic financial planning.
                   </p>
                 </div>
               </div>

              {/* Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Financial planning and mortgage consultation" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Professional financial advice can help navigate changing market conditions
                </figcaption>
              </figure>

                             <h3 className="text-xl font-heading font-light text-[#1f2937] mb-6">
                 Professional Financial Guidance in Melbourne
               </h3>
               
               <p className="text-base leading-relaxed text-gray-700 mb-8">
                 At GMG Financial Services, we understand that navigating these rate changes can be complex and overwhelming. 
                 Our Melbourne-based team provides professional financial advice to help you make informed decisions.
               </p>

                             <div className="border border-gray-300 p-8 rounded-2xl mb-12">
                 <h4 className="text-lg font-semibold text-[#1f2937] mb-6">How We Can Help You</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Analyze whether refinancing could benefit your current financial situation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Compare rates across different lenders to find the most suitable outcome</span>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Understand the implications of fixed vs variable rate loans</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Plan your financial strategy for the coming months</span>
                    </li>
                  </ul>
                </div>
              </div>

                             {/* Call to Action */}
               <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-10 rounded-2xl mb-12 text-center">
                 <h3 className="text-xl font-heading font-light mb-4">Ready to Explore Your Options?</h3>
                 <p className="text-base mb-8 opacity-90">
                   Don't miss out on potential savings. Contact GMG Financial Services today for personalized 
                   financial advice tailored to your unique circumstances.
                 </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:1300GMGFIN" 
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
                  >
                    Call 1300 GMG FIN
                  </a>
                  <a 
                    href="/#contact" 
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-teal-600 transition-colors text-lg"
                  >
                    Get Free Consultation
                  </a>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-sm text-gray-500 leading-relaxed">
                  <strong>Disclaimer:</strong> This article contains general information only and does not consider 
                  your personal objectives, financial situation, or needs. Please consult with a qualified financial 
                  advisor before making any financial decisions. Rates and terms are subject to change and may vary 
                  based on individual circumstances. GMG Financial Services is based in Melbourne, Australia.
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
} 