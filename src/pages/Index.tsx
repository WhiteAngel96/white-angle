import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/hero-section';
import { SecondaryHero } from '@/components/secondary-hero';
import { BeforeAfterCarousel } from '@/components/before-after-carousel';
import { FindLocation } from '@/components/find-location';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation isScrolled={isScrolled} />
      <main>
        <HeroSection />
        <SecondaryHero />
        <BeforeAfterCarousel />
        {/* Find Location Section */}
        <section className="py-20 bg-gradient-to-br from-background to-soft-aqua/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                Find White Angel Near You
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Locate authorized White Angel providers in your area. Professional treatments 
                and products available at certified dental offices nationwide.
              </p>
            </div>
          </div>
        </section>
        <FindLocation />
      </main>
    </div>
  );
};

export default Index;
