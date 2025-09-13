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
        <FindLocation />
      </main>
    </div>
  );
};

export default Index;
