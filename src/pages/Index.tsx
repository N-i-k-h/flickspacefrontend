import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SearchSection from "@/components/SearchSection";
import FeaturedSpaces from "@/components/FeaturedSpaces";
import HowItWorks from "@/components/HowItWorks";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SearchSection />
        <FeaturedSpaces />
        <HowItWorks />
        <CTABand />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
