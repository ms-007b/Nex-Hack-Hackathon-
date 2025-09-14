import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Star, ShoppingCart, Heart, Filter } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import deviceMockup from "@/assets/device-mockup.jpg";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);

  const products = [
    {
      id: 1,
      name: "SafeSphere Core Device",
      price: 149,
      originalPrice: 199,
      discount: 25,
      rating: 4.9,
      reviews: 2847,
      image: deviceMockup,
      colors: ["black", "white", "rose"],
      category: "device",
      inStock: true,
      bestseller: true,
      features: ["GPS Tracking", "Panic Button", "7-Day Battery"]
    },
    {
      id: 2,
      name: "Waterproof Case",
      price: 29,
      originalPrice: 39,
      discount: 26,
      rating: 4.7,
      reviews: 892,
      image: deviceMockup,
      colors: ["black", "blue", "pink"],
      category: "accessory",
      inStock: true,
      features: ["IP68 Rated", "Shock Resistant", "Crystal Clear"]
    },
    {
      id: 3,
      name: "Premium Charging Dock",
      price: 45,
      originalPrice: 59,
      discount: 24,
      rating: 4.8,
      reviews: 1203,
      image: deviceMockup,
      colors: ["black", "white"],
      category: "accessory",
      inStock: true,
      features: ["Fast Charging", "LED Indicator", "Compact Design"]
    },
    {
      id: 4,
      name: "SafeSphere Pro Bundle",
      price: 199,
      originalPrice: 299,
      discount: 33,
      rating: 5.0,
      reviews: 456,
      image: deviceMockup,
      colors: ["black"],
      category: "bundle",
      inStock: false,
      bestseller: true,
      features: ["Core Device", "Waterproof Case", "Charging Dock", "1 Year Premium"]
    }
  ];

  const categories = [
    { value: "all", label: "All Products" },
    { value: "device", label: "Safety Devices" },
    { value: "accessory", label: "Accessories" },
    { value: "bundle", label: "Bundles" }
  ];

  const colors = [
    { value: "black", label: "Black", class: "bg-black" },
    { value: "white", label: "White", class: "bg-white border" },
    { value: "blue", label: "Blue", class: "bg-blue-500" },
    { value: "pink", label: "Pink", class: "bg-pink-500" },
    { value: "rose", label: "Rose Gold", class: "bg-rose-400" }
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== "all" && product.category !== selectedCategory) return false;
    if (selectedColor.length > 0 && !product.colors.some(color => selectedColor.includes(color))) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Shop SafeSphere Products
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Premium safety devices and accessories designed for modern women
            </p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Free shipping on orders over $100
            </Badge>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="lg:w-1/4 space-y-6">
                <div className="bg-card rounded-lg p-6 shadow-soft">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Filter className="mr-2 h-5 w-5" />
                    Filters
                  </h3>
                  
                  {/* Category Filter */}
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Color Filter */}
                  <div className="mb-6">
                    <label className="text-sm font-medium mb-3 block">Color</label>
                    <div className="space-y-2">
                      {colors.map(color => (
                        <div key={color.value} className="flex items-center space-x-2">
                          <Checkbox 
                            id={color.value}
                            checked={selectedColor.includes(color.value)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedColor([...selectedColor, color.value]);
                              } else {
                                setSelectedColor(selectedColor.filter(c => c !== color.value));
                              }
                            }}
                          />
                          <div className={`w-4 h-4 rounded-full ${color.class}`}></div>
                          <label htmlFor={color.value} className="text-sm cursor-pointer">
                            {color.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">$0</span>
                      <div className="flex-1 h-2 bg-muted rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{width: "30%"}}></div>
                      </div>
                      <span className="text-sm text-muted-foreground">$500</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="lg:w-3/4">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-muted-foreground">
                    Showing {filteredProducts.length} products
                  </p>
                  <Select defaultValue="featured">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="group hover:shadow-medium transition-all duration-300">
                      <div className="relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.discount > 0 && (
                          <Badge className="absolute top-2 left-2 bg-destructive">
                            {product.discount}% off
                          </Badge>
                        )}
                        {product.bestseller && (
                          <Badge className="absolute top-2 right-2 bg-success">
                            Bestseller
                          </Badge>
                        )}
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                        
                        <div className="flex items-center mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-2xl font-bold text-primary">
                            ${product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-lg text-muted-foreground line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 mb-3">
                          {product.features.map((feature, index) => (
                            <div key={index} className="text-sm text-muted-foreground">
                              • {feature}
                            </div>
                          ))}
                        </div>

                        <div className="flex space-x-1 mb-3">
                          {product.colors.map(color => (
                            <div 
                              key={color} 
                              className={`w-6 h-6 rounded-full border-2 border-muted ${
                                color === 'black' ? 'bg-black' :
                                color === 'white' ? 'bg-white' :
                                color === 'blue' ? 'bg-blue-500' :
                                color === 'pink' ? 'bg-pink-500' :
                                color === 'rose' ? 'bg-rose-400' : 'bg-muted'
                              }`}
                            />
                          ))}
                        </div>
                      </CardContent>

                      <CardFooter className="p-4 pt-0">
                        <Button 
                          className="w-full" 
                          variant={product.inStock ? "default" : "secondary"}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;