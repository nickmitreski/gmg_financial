import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/styles/globals.css'
import { PostHogProvider } from '@/lib/posthog'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'GMG Financial Services - Professional Financial Advice | Melbourne',
    template: '%s | GMG Financial Services'
  },
  description: 'Supporting individuals, families, and business owners with clear, practical financial advice tailored to their unique circumstances. 20+ years of experience across accounting, finance, and banking.',
  keywords: [
    'financial advisor',
    'financial planning',
    'business finance',
    'cash flow management',
    'investment advice',
    'Melbourne',
    'financial consultant',
    'budgeting',
    'financial health check'
  ],
  authors: [{ name: 'GMG Financial Services' }],
  creator: 'GMG Financial Services',
  publisher: 'GMG Financial Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gmgfinancial.com.au'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://gmgfinancial.com.au',
    title: 'GMG Financial Services - Professional Financial Advice',
    description: 'Supporting individuals, families, and business owners with clear, practical financial advice tailored to their unique circumstances.',
    siteName: 'GMG Financial Services',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GMG Financial Services - Professional Financial Advice',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GMG Financial Services - Professional Financial Advice',
    description: 'Supporting individuals, families, and business owners with clear, practical financial advice tailored to their unique circumstances.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'GMG Financial Services',
  description: 'Supporting individuals, families, and business owners with clear, practical financial advice tailored to their unique circumstances.',
  url: 'https://gmgfinancial.com.au',
  telephone: '1300 GMG FIN',
  email: 'info@gmgfinancial.com.au',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -37.8136,
    longitude: 144.9631,
  },
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: -33.8688,
      longitude: 151.2093,
    },
    geoRadius: '50000',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Financial Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Home Loans',
          description: 'Competitive rates and flexible terms for first-time buyers and property investors.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Investment Finance',
          description: 'Strategic financing solutions for property portfolios and investment opportunities.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Commercial Finance',
          description: 'Business loans and commercial property financing for entrepreneurs and companies.',
        },
      },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '200',
  },
  foundingDate: '2008',
  numberOfEmployees: '5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/images/222.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/111.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/222.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/333.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#7CC5C5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
} 