import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DeviceShowcase from "@/components/DeviceShowcase";
import Footer from "@/components/Footer";
import LearningSection from "@/components/Learning";
import VideoPlayer from "@/components/VideoPlayer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <DeviceShowcase />
      <LearningSection />
      <VideoPlayer />
      <Footer />
    </div>
  );
};
export default Index;
