import { Button } from "@/components/ui/button";
import { Shield, MapPin, AlertTriangle, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Shield className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Empowering Women's Safety</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Your
              <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Safety
              </span>
              <span className="block text-4xl lg:text-5xl text-white/90">
                Companion
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-lg">
              SafeSphere combines cutting-edge IoT technology with interactive self-defense training 
              to create the ultimate safety ecosystem for women and your loved ones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Your Safety Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => {
                  const deviceSection = document.querySelector('#device-showcase');
                  if (deviceSection) {
                    deviceSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Device Features
              </Button>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 text-white/90">
                <MapPin className="h-6 w-6 text-secondary" />
                <span className="font-medium">Live Tracking</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <AlertTriangle className="h-6 w-6 text-warning" />
                <span className="font-medium">Emergency Alerts</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <BookOpen className="h-6 w-6 text-success" />
                <span className="font-medium">Self-Defense Training</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img 
                src={heroImage} 
                alt="Confident woman with SafeSphere device" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-strong">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Safety Monitoring</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-6 shadow-strong">
              <div className="text-2xl font-bold text-secondary">100%</div>
              <div className="text-sm text-muted-foreground">Offline Ready</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;