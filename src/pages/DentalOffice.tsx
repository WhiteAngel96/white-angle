import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { MobileBottomNav } from '@/components/ui/mobile-bottom-nav';
import { MobileLanguageSwitch } from '@/components/ui/mobile-language-switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Home, Building2, Lightbulb, Shield, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const DentalOffice = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const takeHomeProducts = [
    {
      name: 'Home Kit 20%',
      description: 'Professional strength for dramatic results',
      features: ['20% carbamide peroxide', 'Custom tray application', '2-week treatment']
    },
    {
      name: 'Home Kit 15%',
      description: 'Gentle formula for sensitive teeth',
      features: ['15% carbamide peroxide', 'Reduced sensitivity', '3-week treatment']
    },
    {
      name: 'Whitening Strips',
      description: 'Convenient maintenance solution',
      features: ['Pre-measured doses', '30-minute application', 'Travel-friendly']
    }
  ];

  const inOfficeProducts = [
    {
      name: 'White Angel Extra 46%',
      description: 'Maximum strength in-office treatment',
      features: ['46% hydrogen peroxide', 'Fastest results', '60-90 minute session']
    },
    {
      name: 'White Angel Pro',
      description: 'Professional standard treatment',
      features: ['35% hydrogen peroxide', 'Proven formula', 'Excellent results']
    },
    {
      name: 'Desensitiser',
      description: 'Comfort enhancement system',
      features: ['Reduces sensitivity', 'Pre/post treatment', 'Patient comfort']
    }
  ];

  const otherProducts = [
    {
      name: 'LED Lamp',
      description: 'Professional activation system',
      icon: Lightbulb
    },
    {
      name: 'Open Tray',
      description: 'Universal tray system',
      icon: Shield
    },
    {
      name: 'Gingival Barrier',
      description: 'Protective gel application',
      icon: Shield
    },
    {
      name: 'Tray Case',
      description: 'Professional storage solution',
      icon: Home
    },
    {
      name: 'Vitamin E Sticks',
      description: 'Post-treatment lip care',
      icon: Stethoscope
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation isScrolled={isScrolled} />
      <MobileBottomNav />
      <MobileLanguageSwitch />
      
      {/* Hero Banner */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-navy to-primary">
        <div className="container mx-auto px-4">
          <div className="text-center text-white animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              For Dental Professionals
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Complete whitening solutions for your practice. Professional products, 
              proven results, exceptional patient satisfaction.
            </p>
            <Button variant="hero" size="lg">
              Request Product Catalog
            </Button>
          </div>
        </div>
      </section>

      {/* Take Home Products */}
      <section id="take-home" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">Take Home Products</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Extend treatment beyond your office with professional-grade home whitening solutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {takeHomeProducts.map((product, index) => (
              <div key={index} className="bg-gradient-to-br from-background to-soft-aqua/5 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <Home className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold text-navy mb-3">{product.name}</h3>
                <p className="text-muted-foreground mb-6">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/products/home-kit-20">
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In-Office Products */}
      <section id="in-office" className="py-20 bg-gradient-to-br from-background to-soft-aqua/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">In-Office Products</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional-strength treatments for immediate, dramatic results in your office.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {inOfficeProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <Building2 className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-2xl font-bold text-navy mb-3">{product.name}</h3>
                <p className="text-muted-foreground mb-6">{product.description}</p>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-secondary rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={
                  product.name === 'White Angel Extra 46%' ? '/products/white-angel-extra-46' :
                  product.name === 'White Angel Pro' ? '/products/white-angel-pro' :
                  product.name === 'Desensitiser' ? '/products/desensitiser' : '#'
                }>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Products */}
      <section id="other" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">Professional Accessories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete your whitening setup with our professional accessories and support products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {otherProducts.map((product, index) => (
              <div key={index} className="bg-gradient-to-br from-background to-soft-aqua/5 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover-lift">
                <product.icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-bold text-navy mb-2">{product.name}</h3>
                <p className="text-muted-foreground text-sm">{product.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">What Dental Professionals Say</h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-navy">Dr. Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">Cosmetic Dentist</p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground italic">
                  "White Angel products have transformed my practice. Patients love the results, 
                  and I trust the quality and consistency of every treatment."
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-6">Partner with White Angel</h2>
              <p className="text-xl text-white/80">
                Join thousands of dental professionals worldwide. Get started today.
              </p>
            </div>

            <form className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="full-name" className="text-white">Full Name *</Label>
                  <Input 
                    id="full-name" 
                    required 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">Phone *</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    required 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="doctor@practice.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="license" className="text-white">License Number</Label>
                  <Input 
                    id="license" 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <Label htmlFor="specialty" className="text-white">Specialty</Label>
                  <Input 
                    id="specialty" 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="General Dentistry, Cosmetic, etc."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <Textarea 
                  id="message" 
                  rows={4}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Tell us about your practice and whitening needs..."
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Submit Request
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DentalOffice;
