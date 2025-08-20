import { Metadata } from 'next'
import { ArrowLeft, Calendar, Clock, Calculator, FileText, DollarSign, CreditCard, Home, Award } from 'lucide-react'
import Link from 'next/link'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: "5 Key Financial Planning Tips Every First Home Buyer Should Know Before Applying for a Loan | GMG Financial Services Melbourne",
  description: "Essential financial planning tips for first home buyers in Australia. Learn about borrowing power, pre-approval, hidden costs, and government grants to prepare for your first home loan.",
  keywords: 'first home buyer tips, home loan application, borrowing power, pre-approval, stamp duty, government grants, mortgage broker Melbourne, GMG Financial Services',
  openGraph: {
    title: "5 Key Financial Planning Tips Every First Home Buyer Should Know Before Applying for a Loan | GMG Financial Services",
    description: "Essential financial planning tips for first home buyers in Australia. Learn about borrowing power, pre-approval, hidden costs, and government grants to prepare for your first home loan.",
    type: 'article',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: "5 Key Financial Planning Tips Every First Home Buyer Should Know Before Applying for a Loan | GMG Financial Services",
    description: "Essential financial planning tips for first home buyers in Australia. Learn about borrowing power, pre-approval, hidden costs, and government grants to prepare for your first home loan.",
  },
  alternates: {
    canonical: 'https://gmgfinancial.com.au/news/5-key-financial-planning-tips-first-home-buyers',
  },
}

export default function FirstHomeBuyerTipsArticle() {
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
                  First Home Buyer Guide
                </span>
                <div className="flex items-center gap-4 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>August 18, 2025</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>12 min read</span>
                  </div>
                </div>
              </div>

              {/* Main Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-light leading-tight text-[#1f2937] mb-6">
                5 Key Financial Planning Tips Every First Home Buyer Should Know Before Applying for a Loan
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-8">
                Buying your first home can be exciting and overwhelming. These essential financial planning tips help ensure you're prepared, informed, and empowered when applying for a home loan.
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
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="First home buyer planning and preparation" 
                className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-lg"
              />
              <p className="text-sm text-gray-500 mt-3 text-center">
                Proper financial planning is crucial for first home buyers in today's market
              </p>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg prose-gray max-w-none">
              {/* Introduction */}
              <div className="border-l-4 border-black p-6 mb-8 rounded-r-lg">
                <p className="text-gray-700 m-0 text-base leading-relaxed">
                  <strong>Key Insight:</strong> At GMG Financial Services, we regularly work with first home buyers navigating the Australian property market. The journey to homeownership requires careful planning, and these five proven financial tips will help you take your first step confidently and avoid common pitfalls that can derail your dreams.
                </p>
              </div>

              {/* Understanding the First Home Buyer Journey */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                Understanding the First Home Buyer Journey
              </h2>
              
              <p className="text-base leading-relaxed text-gray-700 mb-8">
                The path to homeownership is one of the most significant financial decisions you'll ever make. Unlike other major purchases, buying a home involves complex financial considerations, legal processes, and long-term commitments. Understanding what lies ahead can help you prepare mentally and financially for the journey.
              </p>

              {/* Journey Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Financial planning and home buying journey" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  The home buying journey requires careful planning and preparation
                </figcaption>
              </figure>

              {/* Tip 1: Check Your Borrowing Power */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                Tip 1: Check Your Borrowing Power Early
              </h2>

              <div className="border border-gray-300 p-6 rounded-xl mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="h-6 w-6 text-teal-600" />
                  <h3 className="text-lg font-semibold text-[#1f2937]">Understanding Your Borrowing Capacity</h3>
                </div>
                <p className="text-base text-gray-700 mb-4">
                  Use a loan calculator or speak with a mortgage broker to understand how much you can borrow and afford to repay comfortably. This is the foundation of your home buying journey.
                </p>
                <p className="text-base text-gray-700">
                  Your borrowing power depends on several factors including your income, existing debts, living expenses, and the type of loan you're seeking. Lenders typically allow you to borrow 4-6 times your annual income, but this varies based on your individual circumstances.
                </p>
              </div>

              {/* Borrowing Power Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Loan calculator and borrowing power assessment" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Understanding your borrowing capacity helps set realistic expectations
                </figcaption>
              </figure>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="border border-gray-300 p-6 rounded-xl">
                  <h4 className="text-base font-semibold text-[#1f2937] mb-4">Factors That Affect Borrowing Power</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Gross and net income</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Existing debts and credit cards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Living expenses and lifestyle costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Employment history and stability</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-300 p-6 rounded-xl">
                  <h4 className="text-base font-semibold text-[#1f2937] mb-4">Why Early Assessment Matters</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Getting an early understanding of your borrowing capacity helps you set realistic expectations, identify areas for improvement, and avoid disappointment when you start house hunting. It also gives you time to address any issues that might affect your loan application.
                  </p>
                </div>
              </div>

              {/* Tip 2: Get Pre-Approval */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                Tip 2: Get Your Pre-Approval in Place
              </h2>

              <div className="border border-gray-300 p-6 rounded-xl mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-teal-600" />
                  <h3 className="text-lg font-semibold text-[#1f2937]">The Power of Pre-Approval</h3>
                </div>
                <p className="text-base text-gray-700 mb-4">
                  This shows sellers you're serious and helps you act promptly when you find the right property. It also protects you from overcommitting to a purchase beyond your means.
                </p>
                <p className="text-base text-gray-700">
                  Pre-approval is a conditional approval from a lender that indicates how much they're willing to lend you based on your current financial situation. While not a guarantee, it significantly strengthens your position as a buyer.
                </p>
              </div>

              {/* Pre-Approval Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Pre-approval documents and mortgage application" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Pre-approval gives you confidence and credibility as a buyer
                </figcaption>
              </figure>

              <div className="space-y-6 mb-12">
                <div className="border border-gray-300 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#1f2937] mb-3">Benefits of Pre-Approval</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Shows sellers you're a serious, qualified buyer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Allows you to act quickly when you find the right property</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Helps you stay within your budget and avoid overcommitting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Provides peace of mind during the house hunting process</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tip 3: Budget for Hidden Costs */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                Tip 3: Budget for More Than Just the Deposit
              </h2>

              <div className="border border-gray-300 p-6 rounded-xl mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="h-6 w-6 text-teal-600" />
                  <h3 className="text-lg font-semibold text-[#1f2937]">Understanding the Full Cost of Homeownership</h3>
                </div>
                <p className="text-base text-gray-700 mb-4">
                  Don't forget stamp duty, lender's mortgage insurance (LMI), conveyancing fees, and moving costs. These can add tens of thousands to your total costs and catch unprepared buyers off guard.
                </p>
                <p className="text-base text-gray-700">
                  Many first home buyers focus solely on saving for the deposit, only to discover that additional costs can amount to 5-10% of the property value. Understanding these costs upfront helps you budget realistically.
                </p>
              </div>

              {/* Hidden Costs Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Hidden costs and additional expenses in home buying" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Understanding all costs prevents financial surprises during the buying process
                </figcaption>
              </figure>

              <div className="border border-gray-300 p-8 rounded-2xl mb-12">
                <h3 className="text-xl font-heading font-light text-[#1f2937] mb-6">Common Additional Costs</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-base font-semibold text-[#1f2937] mb-3">Stamp Duty</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      State government tax on property purchases. First home buyers may be eligible for concessions or exemptions depending on the property value and location.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#1f2937] mb-3">Lenders Mortgage Insurance (LMI)</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Required when borrowing more than 80% of the property value. Can cost thousands of dollars but protects the lender, not you.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#1f2937] mb-3">Conveyancing Fees</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Legal fees for property transfer, typically $800-$2,000 depending on complexity and location.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#1f2937] mb-3">Moving and Setup Costs</h4>
                    <p className="text-sm text-gray-700 mb-4">
                      Removalists, new furniture, utilities connection, and immediate repairs can add $5,000-$15,000 to your costs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tip 4: Tidy Up Your Finances */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                Tip 4: Tidy Up Your Finances
              </h2>

              <div className="border border-gray-300 p-6 rounded-xl mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="h-6 w-6 text-teal-600" />
                  <h3 className="text-lg font-semibold text-[#1f2937]">Preparing Your Financial Profile</h3>
                </div>
                <p className="text-base text-gray-700 mb-4">
                  Clear any unnecessary debts, close unused credit cards, and make sure your financial history reflects stable, reliable behavior. Lenders will be watching your financial habits closely.
                </p>
                <p className="text-base text-gray-700">
                  Your credit history and current financial behavior significantly impact your loan application. Lenders want to see responsible financial management and a clear ability to meet ongoing commitments.
                </p>
              </div>

              {/* Financial Preparation Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Financial planning and credit management" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Clean financial habits improve your loan application success
                </figcaption>
              </figure>

              <div className="space-y-6 mb-12">
                <div className="border border-gray-300 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#1f2937] mb-3">Financial Cleanup Checklist</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Pay off or reduce high-interest debts like credit cards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Close unused credit cards and reduce credit limits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Ensure all bills are paid on time for at least 6 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Avoid applying for new credit in the 6 months before applying</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Build a consistent savings history to show financial discipline</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Tip 5: Government Grants */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                Tip 5: Explore Government Grants and Incentives
              </h2>

              <div className="border border-gray-300 p-6 rounded-xl mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6 text-teal-600" />
                  <h3 className="text-lg font-semibold text-[#1f2937]">Maximizing Available Support</h3>
                </div>
                <p className="text-base text-gray-700 mb-4">
                  In 2025, the First Home Owner Grant (FHOG) and stamp duty concessions can significantly reduce upfront costs, especially for newly built homes. These incentives may result in significant savings.
                </p>
                <p className="text-base text-gray-700">
                  Government incentives vary by state and territory, and eligibility criteria change regularly. Understanding what's available can make the difference between buying now or waiting longer to save more.
                </p>
              </div>

              {/* Government Grants Image */}
              <figure className="my-12">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Government grants and first home buyer incentives" 
                  className="w-full h-64 object-cover rounded-xl shadow-md"
                />
                <figcaption className="text-sm text-gray-500 mt-3 text-center">
                  Government incentives can significantly reduce your upfront costs
                </figcaption>
              </figure>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="border border-gray-300 p-6 rounded-xl">
                  <h4 className="text-base font-semibold text-[#1f2937] mb-4">First Home Owner Grant (FHOG)</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Available for newly built homes in most states</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Amounts vary by state ($10,000-$20,000 typically)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Must be your first property purchase</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Property value limits apply</span>
                    </li>
                  </ul>
                </div>
                <div className="border border-gray-300 p-6 rounded-xl">
                  <h4 className="text-base font-semibold text-[#1f2937] mb-4">Stamp Duty Concessions</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Reduced or waived stamp duty for first buyers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Property value thresholds apply</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Must be your principal place of residence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Eligibility criteria vary by state</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* GMG Financial Services Section */}
              <h2 className="text-2xl font-heading font-light text-[#1f2937] mb-6 mt-12">
                How GMG Financial Services Supports First Home Buyers
              </h2>

              <p className="text-base leading-relaxed text-gray-700 mb-8">
                At GMG Financial Services, we specialize in helping first home buyers navigate the complex journey to homeownership. Our experienced team understands the unique challenges and opportunities facing first-time buyers in today's market.
              </p>

              <div className="border border-gray-300 p-8 rounded-2xl mb-12">
                <h3 className="text-lg font-semibold text-[#1f2937] mb-6">Our First Home Buyer Services</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Comprehensive borrowing power assessment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Pre-approval application and management</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Government grant eligibility assessment</span>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Loan comparison and lender selection</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Application process guidance and support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Ongoing financial advice and support</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-10 rounded-2xl mb-12 text-center">
                <h3 className="text-xl font-heading font-light mb-4">Ready to Start Your Home Buying Journey?</h3>
                <p className="text-base mb-8 opacity-90">
                  Don't navigate the complex world of first home buying alone. Contact GMG Financial Services today for professional guidance and support throughout your journey to homeownership.
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
                  advisor before making any home buying decisions. Government grants and incentives are subject to 
                  change and eligibility criteria vary. GMG Financial Services is based in Melbourne, Australia.
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