import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import FeaturedSection from '../components/FeaturedSection'
import WhyChooseSection from '../components/WhyChooseSection'
import AboutSection from '../components/AboutSection'
import WhoWeServeSection from '../components/WhoWeServeSection'
import PartnerSection from '../components/PartnerSection'
import AffiliatesSection from '../components/AffiliatesSection'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedSection />
        <WhyChooseSection />
        <AboutSection />
        <WhoWeServeSection />
        <PartnerSection />
        <AffiliatesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
