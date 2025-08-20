import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Planning & Budgeting', href: '#services' },
      { label: 'Cash Flow & Business', href: '#services' },
      { label: 'Lending & Finance', href: '#services' },
      { label: 'Investment Reviews', href: '#services' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Financial Health Check', href: '#contact' },
      { label: 'Free Consultation', href: '#contact' },
      { label: 'Business Performance', href: '#contact' },
      { label: 'FAQ', href: '#contact' },
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ]
  }
]

export function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="footer-title mb-4">
              GMG Financial Services
            </h3>
            <p className="footer-description mb-6">
              Supporting individuals, families, and business owners with clear, practical financial advice 
              tailored to their unique circumstances. 20+ years of experience across accounting, finance, and banking.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="h-5 w-5 text-teal-500" />
                <a 
                  href="tel:1300GMGFIN"
                  className="footer-link hover:text-teal-400 transition-colors"
                >
                  1300 GMG FIN
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="h-5 w-5 text-teal-500" />
                <a 
                  href="mailto:info@gmgfinancial.com.au"
                  className="footer-link hover:text-teal-400 transition-colors"
                >
                  info@gmgfinancial.com.au
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="h-5 w-5 text-teal-500" />
                <span>Melbourne, Australia</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="footer-section-title mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="footer-link hover:text-teal-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimers and Legal Information */}
        <div className="border-t border-gray-900 mt-12 pt-8">
          {/* General Disclaimer */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">General Disclaimer</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              This page provides general information only and has been prepared without taking into account your objectives, 
              financial situation or needs. We recommend that you consider whether it is appropriate for your circumstances 
              and your full financial situation will need to be reviewed prior to acceptance of any offer or product. 
              Information relating to credit services does not constitute legal, tax or financial advice and you should 
              always seek professional advice in relation to your individual circumstances.
            </p>
          </div>

          {/* Business Details */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Licensing & Business Details</h4>
            <div className="text-xs text-gray-400 space-y-2">
              <p>MG Accounting Services Pty Ltd – ABN 17 595 831 549</p>
              <p>GMG Financial Services Pty Ltd – ABN 15 618 903 861</p>
              <p>Credit Representative 405166 of Connective Credit Services Pty Ltd</p>
              <p>Australian Credit Licence 389328</p>
              <p>Credit Representative 405166 is authorised under Australian Credit Licence 389328. Your full financial situation will need to be assessed prior to acceptance of any offer or product.</p>
            </div>
          </div>

          {/* Non-credit Services Disclaimer */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Non-Credit Services</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              All non-credit services offered by GMG Financial Services are conducted under a separate licence or registration. 
              These services are not authorised under Australian Credit Licence 389328.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="footer-copyright">
              © 2024 GMG Financial Services. All rights reserved.
            </p>
            <div className="flex items-center gap-6 footer-copyright">
              <span>20+ Years Experience</span>
              <span>•</span>
              <span>Melbourne Based</span>
              <span>•</span>
              <Link href="/admin/auth/signin" className="underline underline-offset-4 hover:text-teal-400">admin</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 