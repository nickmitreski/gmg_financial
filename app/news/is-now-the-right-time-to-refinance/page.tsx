import { Metadata } from 'next'
import { ArrowLeft, Calendar, Clock, TrendingUp, Calculator, Shield, DollarSign, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: "Is Now the Right Time to Refinance? Here's What Australian Homeowners Need to Know in 2025 | GMG Financial Services Melbourne",
  description: "Discover if refinancing your home loan in 2025 is the right move. Professional insights on interest rates, costs, benefits, and timing for Australian homeowners and investors.",
  keywords: 'refinance home loan, mortgage refinancing, interest rates 2025, home loan comparison, mortgage broker Melbourne, refinancing costs, equity access, GMG Financial Services',
  openGraph: {
    title: "Is Now the Right Time to Refinance? Here's What Australian Homeowners Need to Know in 2025 | GMG Financial Services",
    description: "Discover if refinancing your home loan in 2025 is the right move. Professional insights on interest rates, costs, benefits, and timing for Australian homeowners and investors.",
    type: 'article',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Is Now the Right Time to Refinance? Here's What Australian Homeowners Need to Know in 2025 | GMG Financial Services",
    description: "Discover if refinancing your home loan in 2025 is the right move. Professional insights on interest rates, costs, benefits, and timing for Australian homeowners and investors.",
  },
  alternates: {
    canonical: 'https://gmgfinancial.com.au/news/is-now-the-right-time-to-refinance',
  },
}

export default function RefinanceArticle() {
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
                  Refinancing Guide
                </span>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>August 15, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>10 min read</span>
                  </div>
                </div>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light leading-tight text-[#1f2937] mb-6">
                Is Now the Right Time to Refinance? Here's What Australian Homeowners Need to Know in 2025
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-8">
                With interest rates stabilising and property prices climbing, discover whether refinancing your home loan may result in significant savings and unlock new financial opportunities.
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
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Home loan refinancing and financial planning" 
                className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-lg"
              />
              <p className="text-sm text-gray-500 mt-3 text-center">
                Refinancing can unlock significant savings and new financial opportunities
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-gray max-w-none">
              {/* Introduction */}
              <div className="border-l-4 border-black p-6 mb-8 rounded-r-lg">
                <p className="text-gray-700 m-0 text-base leading-relaxed">
                  <strong>Key Insight:</strong> As 2025 progresses, refinancing continues to be a powerful financial strategy for Australian homeowners and investors. Whether you're looking to lower your interest rate, consolidate debt, or access equity, refinancing can free up cash flow and create new opportunities worth thousands of dollars.
                </p>
              </div>

              {/* Why Consider Refinancing in 2025 */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                Why Consider Refinancing in 2025?
              </h2>
              
              <p className="text-base leading-relaxed text-gray-700 mb-8">
                The current market conditions present a unique window of opportunity for homeowners. With interest rates stabilising after years of volatility, and property values showing steady growth, many Australians are discovering that refinancing could be their smartest financial move of the year.
              </p>

              {/* Market Conditions Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Interest rate trends and market analysis" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Current market conditions favor strategic refinancing decisions
                </figcaption>
              </figure>

              {/* Key Considerations Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="border border-gray-300 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="h-6 w-6 text-teal-600" />
                    <h3 className="text-lg font-semibold text-[#1f2937]">Interest Rate Opportunities</h3>
                  </div>
                  <p className="text-base text-gray-700">
                    After several years of rate volatility, many lenders are now offering competitive refinancing rates to win over borrowers. If your current rate is above 6%, it's time to review your options.
                  </p>
                </div>

                <div className="border border-gray-300 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Calculator className="h-6 w-6 text-teal-600" />
                    <h3 className="text-lg font-semibold text-[#1f2937]">Comparison is Key</h3>
                  </div>
                  <p className="text-base text-gray-700">
                    Use a mortgage broker or comparison service to evaluate fixed vs variable rates. Your current bank may not be offering you the most suitable solution available in the market.
                  </p>
                </div>

                <div className="border border-gray-300 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="h-6 w-6 text-teal-600" />
                    <h3 className="text-lg font-semibold text-[#1f2937]">Loan Features Matter</h3>
                  </div>
                  <p className="text-base text-gray-700">
                    Offset accounts, redraw facilities, and flexible repayments can significantly affect your financial flexibility and long-term savings potential.
                  </p>
                </div>

                <div className="border border-gray-300 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-6 w-6 text-teal-600" />
                    <h3 className="text-lg font-semibold text-[#1f2937]">Equity Access</h3>
                  </div>
                  <p className="text-base text-gray-700">
                    If your property has increased in value, refinancing can give you access to equity for investments, renovations, or debt consolidation.
                  </p>
                </div>
              </div>

              {/* Refinancing Benefits Section */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                The Benefits of Refinancing in 2025
              </h2>

              {/* Benefits Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Financial benefits and savings calculation" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Refinancing can deliver significant monthly and long-term savings
                </figcaption>
              </figure>

              <div className="space-y-6 mb-12">
                <div className="border border-gray-300 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#1f2937] mb-3">Immediate Monthly Savings</h3>
                  <p className="text-base text-gray-700">
                    A 0.5% reduction in your interest rate on a $500,000 loan could save you approximately $250 per month in repayments. Over 30 years, that's a staggering $90,000 in savings.
                  </p>
                </div>

                <div className="border border-gray-300 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#1f2937] mb-3">Access to Property Equity</h3>
                  <p className="text-base text-gray-700">
                    With property values rising across Melbourne, many homeowners have built substantial equity. Refinancing can unlock this equity for renovations, investment properties, or other financial goals.
                  </p>
                </div>

                <div className="border border-gray-300 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#1f2937] mb-3">Debt Consolidation</h3>
                  <p className="text-base text-gray-700">
                    Consolidate high-interest credit cards, personal loans, or car finance into your home loan at a much lower interest rate, potentially saving thousands in interest payments.
                  </p>
                </div>

                <div className="border border-gray-300 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#1f2937] mb-3">Better Loan Features</h3>
                  <p className="text-base text-gray-700">
                    Modern home loans offer features like offset accounts, redraw facilities, and flexible repayment options that can significantly improve your financial flexibility.
                  </p>
                </div>
              </div>

              {/* Costs and Considerations */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                Costs to Watch: What You Need to Consider
              </h2>

              {/* Costs Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Refinancing costs and fee analysis" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Understanding all costs is crucial for making informed refinancing decisions
                </figcaption>
              </figure>

              <div className="border border-gray-300 p-8 rounded-2xl mb-12">
                <h3 className="text-xl font-heading font-light text-[#1f2937] mb-6">Key Costs to Consider</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-base font-semibold text-[#1f2937] mb-3">Break Fees (Fixed Loans)</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      If you're on a fixed-rate loan, breaking it early can incur significant penalties. These fees can sometimes outweigh the benefits of refinancing.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#1f2937] mb-3">Valuation Costs</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      New lenders typically require a property valuation, which can cost between $200-$600 depending on your property type and location.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#1f2937] mb-3">Application Fees</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      New lenders may charge application fees, establishment fees, or legal fees that can add up to $1,000 or more.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#1f2937] mb-3">LMI Considerations</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      If your loan-to-value ratio changes significantly, you might need to pay Lenders Mortgage Insurance (LMI) again.
                    </p>
                  </div>
                </div>
              </div>

              {/* When to Refinance */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                When is the Right Time to Refinance?
              </h2>

              {/* Timing Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Strategic timing for refinancing decisions" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Timing your refinance correctly can maximize your savings
                </figcaption>
              </figure>

              <div className="space-y-6 mb-12">
                <div className="border border-gray-300 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#1f2937] mb-3">Your Current Rate is Above Market</h3>
                  <p className="text-base text-gray-700">
                    If your interest rate is 0.5% or more above current market rates, refinancing could deliver significant savings. Use comparison tools to check current rates.
                  </p>
                </div>

                <div className="border border-gray-300 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#1f2937] mb-3">Your Property Has Increased in Value</h3>
                  <p className="text-base text-gray-700">
                    If your property value has grown significantly, you might be able to access equity or reduce your LMI costs through refinancing.
                  </p>
                </div>

                <div className="border border-gray-300 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#1f2937] mb-3">You Have High-Interest Debt</h3>
                  <p className="text-base text-gray-700">
                    Consolidating credit cards or personal loans into your home loan can save thousands in interest payments over time.
                  </p>
                </div>

                <div className="border border-gray-300 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#1f2937] mb-3">You Need Better Loan Features</h3>
                  <p className="text-base text-gray-700">
                    If your current loan lacks features like offset accounts or flexible repayments, refinancing can provide better financial tools.
                  </p>
                </div>
              </div>

              {/* GMG Financial Services Section */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                How GMG Financial Services Can Help
              </h2>

              {/* Professional Service Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Professional mortgage consultation and advice" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Professional guidance can help you navigate the refinancing process smoothly
                </figcaption>
              </figure>

              <p className="text-base leading-relaxed text-gray-700 mb-8">
                At GMG Financial Services, we help our clients review their loans and negotiate directly with lenders to get the most suitable outcome — often with a streamlined paperwork process for you.
              </p>

              <div className="border border-gray-300 p-8 rounded-2xl mb-12">
                <h3 className="text-lg font-semibold text-[#1f2937] mb-6">Our Refinancing Services Include:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Comprehensive loan comparison and analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Direct negotiation with lenders for better rates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Cost-benefit analysis to ensure refinancing makes sense</span>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Handling all paperwork and documentation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Ongoing support throughout the refinancing process</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Regular loan reviews to ensure you always have the most suitable solution</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-10 rounded-2xl mb-12 text-center">
                <h3 className="text-xl font-heading font-light mb-4">Ready to Explore Your Refinancing Options?</h3>
                <p className="text-base mb-8 opacity-90">
                  Speak to us today to find out if refinancing is the smart move for your 2025 financial goals. Our experts can help you determine if the savings outweigh the costs.
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
                  advisor before making any refinancing decisions. Refinancing costs and benefits vary based on individual 
                  circumstances. GMG Financial Services is based in Melbourne, Australia.
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