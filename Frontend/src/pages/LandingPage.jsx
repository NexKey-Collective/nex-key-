import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import WhyChooseSection from "../components/WhyChooseSection";
import WhoWeServeSection from "../components/WhoWeServeSection";
import HowItWorksSection from "../components/HowItWorksSection";
import PartnerSection from "../components/PartnerSection";
import TestimonialsSection from "../components/TestimonialsSection";
import StatsSection from "../components/StatsSection";
import FAQSection from "../components/FAQSection";
import ContactSection from "../components/ContactSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export default function LandingPage() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.getElementById(
      decodeURIComponent(location.hash.slice(1)),
    );
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location]);

  return (
    <div className="public-site min-h-screen">
      <main>
        <HeroSection />
        <WhyChooseSection />
        <WhoWeServeSection />
        <HowItWorksSection />
        <PartnerSection />
        <AboutSection />
        <TestimonialsSection />
        <StatsSection />
        <FAQSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
