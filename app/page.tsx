import { Navigation } from '@/components/layout/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { FAQSection } from '@/components/sections/NewsSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { BreakSection } from '@/components/sections/BreakSection'
import { CalculatorBreakSection } from '@/components/sections/CalculatorBreakSection'
import ImmersiveScrollGallery from '@/components/ui/immersive-scroll-gallery'
import { FeatureSection } from '@/components/sections/FeatureSection'
import { LatestNewsSection } from '@/components/sections/LatestNewsSection'
import { QuoteSection } from '@/components/sections/QuoteSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <SocialProofSection />
      <ServicesSection />
      <AboutSection />
      <BreakSection />
      <ImmersiveScrollGallery />
      <CalculatorBreakSection />
      <FeatureSection />
      <LatestNewsSection />
      <FAQSection />
      <QuoteSection />
      <ContactSection />
      <Footer />
    </main>
  )
} 