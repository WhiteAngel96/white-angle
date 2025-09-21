import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { BeforeAfterCarousel } from '@/components/before-after-carousel';
import { FindLocation } from '@/components/find-location';
import { Home, Building2, Shield, Zap } from 'lucide-react';
import clinicImage from '@/assets/clinic-interior.jpg';
import homeKitImage from '@/assets/home-kit.jpg';
import { useTranslation } from '@/hooks/useTranslation';

const Patients = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('clinic');
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Handle initial hash navigation when component mounts
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          const offsetTop = element.offsetTop - 140; // Account for navigation bars
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 200);
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'clinic-whitening', label: 'Clinic Whitening', icon: Building2 },
    { id: 'home-kit-whitening', label: 'Home Kit', icon: Home },
    { id: 'desensitizer', label: 'Desensitizer', icon: Shield },
    { id: 'strips', label: 'Strips', icon: Zap }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 140; // Account for sticky navigation
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const scrollToFindLocation = () => {
    const element = document.querySelector('[data-section="find-location"]');
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation isScrolled={isScrolled} />
      
      {/* Sticky Navigation */}
      <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center py-4">
            <div className="flex space-x-2 bg-background/50 backdrop-blur-sm rounded-full p-2 border border-border/50">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary/5 to-soft-aqua/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold text-navy mb-6">
              {t('pages.patients.heroTitle')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {t('pages.patients.heroSubtitle')}
            </p>
            <Button variant="cta" size="lg" className="mb-8" onClick={scrollToFindLocation}>
              {t('pages.patients.findLocationButton')}
            </Button>
          </div>
        </div>
      </section>

      {/* Before/After Carousel */}
      <BeforeAfterCarousel />

      {/* Clinic Whitening Section */}
      <section id="clinic-whitening" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="animate-fade-up">
              <h2 className="text-4xl font-bold text-navy mb-6">Clinic Whitening</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Get professional-strength whitening with immediate, dramatic results. 
                Our in-office treatment uses the highest concentration formulas available, 
                delivering up to 8 shades whiter in just one session.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-navy">Maximum Strength Formula</h4>
                    <p className="text-muted-foreground">Professional-grade 46% concentration for fastest results</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-navy">Immediate Results</h4>
                    <p className="text-muted-foreground">See dramatic whitening in just 60-90 minutes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-navy">Professional Supervision</h4>
                    <p className="text-muted-foreground">Safe treatment under dental professional care</p>
                  </div>
                </div>
              </div>

              <Button variant="cta" size="lg" onClick={scrollToFindLocation}>
                Find a Clinic
              </Button>
            </div>

            <div className="relative">
              <img 
                src={clinicImage}
                alt="Modern dental clinic with professional whitening equipment"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Home Kit Section */}
      <section id="home-kit-whitening" className="py-20 bg-gradient-to-br from-background to-soft-aqua/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1 relative">
              <img 
                src={homeKitImage}
                alt="White Angel home whitening kit with professional-grade products"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>

            <div className="order-1 lg:order-2 animate-fade-up">
              <h2 className="text-4xl font-bold text-navy mb-6">Home Kit Whitening</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Professional whitening from the comfort of your home. Our take-home kits 
                feature the same advanced formulations used in dental offices, with 
                convenient application for your busy lifestyle.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-navy">Professional Formula</h4>
                    <p className="text-muted-foreground">20% and 15% strength options available</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-navy">Convenient Treatment</h4>
                    <p className="text-muted-foreground">Whiten on your schedule, 2-3 weeks of treatment</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2" />
                  <div>
                    <h4 className="font-semibold text-navy">Custom Trays</h4>
                    <p className="text-muted-foreground">Perfect fit trays made by your dentist</p>
                  </div>
                </div>
              </div>

              <Button variant="cta" size="lg" onClick={scrollToFindLocation}>
                Find a Clinic
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Desensitizer Section */}
      <section id="desensitizer" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">Desensitizer Treatment</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Minimize sensitivity and maximize comfort during and after your whitening treatment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-3">Advanced Protection</h3>
              <p className="text-muted-foreground">Reduces sensitivity by up to 70% during treatment</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-3">Fast Acting</h3>
              <p className="text-muted-foreground">Provides immediate relief and protection</p>
            </div>
            <div className="text-center">
              <Home className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-3">Easy Application</h3>
              <p className="text-muted-foreground">Simple gel application before and after whitening</p>
            </div>
          </div>
        </div>
      </section>

      {/* Strips Section */}
      <section id="strips" className="py-20 bg-gradient-to-br from-background to-soft-aqua/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">Whitening Strips</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Convenient, pre-measured strips for touch-ups and maintenance between professional treatments.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-navy mb-4">Perfect for:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Touch-ups between professional treatments</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Maintaining your bright smile</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Travel convenience</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>Quick 30-minute applications</span>
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                    <Zap className="w-16 h-16 text-primary" />
                  </div>
                  <Button variant="cta">
                    Get Strips
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Location */}
      <section className="py-12 bg-gradient-to-br from-background to-soft-aqua/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
              {t('pages.patients.findLocationTitle')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('pages.patients.findLocationSubtitle')}
            </p>
          </div>
        </div>
      </section>
      <div data-section="find-location">
        <FindLocation />
      </div>
    </div>
  );
};

export default Patients;