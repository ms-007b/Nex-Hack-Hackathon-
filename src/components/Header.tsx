import { Shield, Menu, X, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center mx-5 gap-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            SafeSphere
          </span>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#device" className="text-foreground hover:text-primary transition-colors">
            Device
          </a>
          <a href="#specifications" className="text-foreground hover:text-primary transition-colors">
            Specs
          </a>
          <a href="#learning" className="text-foreground hover:text-primary transition-colors">
            Learning
          </a>
          <a href="#products" className="text-foreground hover:text-primary transition-colors">
            Products
          </a>
          <a href="/shop" className="hidden text-foreground hover:text-primary transition-colors">
            Shop Now
          </a>
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost">Sign In</Button>
          <Button variant="hero">Get Started</Button>
        </div>
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#device" className="text-foreground hover:text-primary transition-colors">
              Device
            </a>
            <a href="#specifications" className="text-foreground hover:text-primary transition-colors">
              Specs
            </a>
            <a href="#learning" className="text-foreground hover:text-primary transition-colors">
              Learning
            </a>
            <a href="#products" className="text-foreground hover:text-primary transition-colors">
              Products
            </a>
            <a href="/shop" className="text-foreground hover:text-primary transition-colors">
              Shop Now
            </a>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button variant="ghost" onClick={() => {}}>Sign In</Button>
              <Button variant="hero">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
export default Header;