import React from 'react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-custom max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose max-w-none">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Information Collection and Use
              </h2>
              <p className="text-gray-700 mb-4">
                GMG Financial Services Pty Ltd and MG Accounting Services Pty Ltd are committed to protecting your privacy. 
                We collect information to provide better services to our clients and visitors.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Types of Information Collected
              </h2>
              <p className="text-gray-700 mb-4">
                We may collect personal information such as your name, contact details, financial information, 
                and other relevant data necessary to provide our financial and accounting services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                How We Use Information
              </h2>
              <p className="text-gray-700 mb-4">
                The information we collect is used to provide, maintain, and improve our services, 
                communicate with you, and comply with legal and regulatory requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Information Sharing
              </h2>
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy or as required by law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibent text-gray-900 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-700">
                If you have any questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:info@gmgfinancial.com.au" className="text-teal-600 hover:text-teal-700">
                  info@gmgfinancial.com.au
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}