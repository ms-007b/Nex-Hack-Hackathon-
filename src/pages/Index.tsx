import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DeviceShowcase from "@/components/DeviceShowcase";
import Footer from "@/components/Footer";
import LearningSection from "@/components/Learning";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <DeviceShowcase />
      <LearningSection />
      <Footer />
    </div>
  );
};
export default Index;