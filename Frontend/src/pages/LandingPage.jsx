import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import WhyChooseSection from '../components/WhyChooseSection'
import WhoWeServeSection from '../components/WhoWeServeSection'
import HowItWorksSection from '../components/HowItWorksSection'
import PartnerSection from '../components/PartnerSection'
import TestimonialsSection from '../components/TestimonialsSection'
import StatsSection from '../components/StatsSection'
import FAQSection from '../components/FAQSection'
import ContactSection from '../components/ContactSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <AboutSection />
        <WhyChooseSection />
        <WhoWeServeSection />
        <HowItWorksSection />
        <PartnerSection />
        <TestimonialsSection />
        <StatsSection />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
