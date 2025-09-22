import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { MobileBottomNav } from '@/components/ui/mobile-bottom-nav';
import { MobileLanguageSwitch } from '@/components/ui/mobile-language-switch';
import { HeroSection } from '@/components/hero-section';
import { SecondaryHero } from '@/components/secondary-hero';
import { BeforeAfterCarousel } from '@/components/before-after-carousel';
import { FindLocation } from '@/components/find-location';
import { useTranslation } from '@/hooks/useTranslation';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

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
      <MobileBottomNav />
      <MobileLanguageSwitch />
      <main>
        <HeroSection />
        <SecondaryHero />
        <BeforeAfterCarousel />
        {/* Find Location Section */}
        <section className="py-12 bg-gradient-to-br from-background to-soft-aqua/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
                {t('pages.index.findLocationTitle')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {t('pages.index.findLocationSubtitle')}
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
