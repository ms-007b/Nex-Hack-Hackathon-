import { Card } from "@/components/ui/card";
import { Shield, MapPin, AlertTriangle, BookOpen, Wifi, Users } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Live Location Tracking",
      description: "Real-time GPS monitoring with precise location sharing to your trusted contacts.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: <AlertTriangle className="h-8 w-8" />,
      title: "Emergency Alerts",
      description: "Instant Telegram notifications to emergency contacts with your exact location.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Interactive Learning",
      description: "Gamified self-defense tutorials with weak point identification and practice modules.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: <Wifi className="h-8 w-8" />,
      title: "No-Network Protection",
      description: "Smart detection of connectivity dead zones with automatic fallback alerts.",
      bgColor: "bg-pink-100",
      iconColor: "text-red-600"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Panic Button",
      description: "One-touch emergency activation that works even when your phone is locked.",
      bgColor: "bg-yellow-100",
      iconColor: "text-amber-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Support",
      description: "Connect with a network of empowered women sharing safety tips and experiences.",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600"
    }
  ];
  return (
    <section id="features" className="py-20 bg-muted/30 mx-10 px-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Comprehensive Safety
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every feature is designed with women's safety in mind, combining technology 
            with education to create a powerful safety ecosystem.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className={`p-8 ${feature.bgColor} rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
              <div className={`${feature.iconColor} mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;