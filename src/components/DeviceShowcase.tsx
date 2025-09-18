import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,MapPin, Zap,Smartphone,Wifi,Battery,Bell,Lock,Radio
} from "lucide-react";
import deviceMockup from "@/assets/device-mockup.jpg";

const DeviceShowcase = () => {
  const features = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "GPS Tracking",
      description: "Real-time location monitoring with 5-meter accuracy"
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Panic Button",
      description: "Instant emergency alerts to your trusted contacts"
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Connectivity",
      description: "4G LTE, WiFi, and Bluetooth connectivity options"
    },
    {
      icon: <Battery className="h-6 w-6" />,
      title: "Long Battery",
      description: "Up to 1 days of continuous monitoring"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure Data",
      description: "End-to-end encryption for all communications"
    },
    {
      icon: <Radio className="h-6 w-6" />,
      title: "No-Network Alert",
      description: "Automatic alerts when entering dead zones"
    }
  ];

  const specifications = [
    { label: "Dimensions", value: "45mm × 35mm × 12mm" },
    { label: "Weight", value: "Under 60g" },
    { label: "Water Resistance", value: "IP68" },
    { label: "Battery Life", value: "1 day active use" },
    { label: "Charging Time", value: "2.3 hours" },
    { label: "Operating Temp", value: "-10°C to 50°C" }
  ];

  return (
    <section id="device" className="py-20 bg-gradient-card px-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Next-Gen Safety Technology
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Meet Your Personal Safety Guardian
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our cutting-edge IoT device combines advanced GPS tracking, emergency communication,
            and smart monitoring to keep you safe 24/7, even in areas with no network coverage.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Device Image */}
          <div className="relative">
            <div className="bg-gradient-primary rounded-3xl p-8 shadow-strong">
              <img
                src={deviceMockup}
                alt="SafeSphere IoT Safety Device"
                className="w-full h-auto rounded-2xl shadow-medium"
              />
              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 bg-background rounded-xl p-4 shadow-medium border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-background rounded-xl p-4 shadow-medium border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">&lt; 3s</div>
                  <div className="text-sm text-muted-foreground">Alert Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 bg-background/50 hover:bg-background/80 transition-all duration-300 hover:shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-primary mt-1">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        {/* Shop Now
        <div id="shop-now" className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Experience Ultimate Safety?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of women who trust SafeSphere for their daily safety. 
            Get your device today and start your journey to fearless living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => window.location.href = '/shop'}
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Shop Now - $149
              </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = '#features'}
            >
              <Shield className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
        </div> */}
      </div>
      <div id="specifications" className="py-20 bg-gradient-card px-10 h-80">
        {/* Technical Specifications */}
        <div className="bg-background rounded-2xl p-8 shadow-soft mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specifications.map((spec, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-semibold text-primary mb-1">
                  {spec.value}
                </div>
                <div className="text-muted-foreground">
                  {spec.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceShowcase;