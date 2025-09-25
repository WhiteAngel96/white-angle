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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      <Navigation isScrolled={isScrolled} />
      <MobileBottomNav />
      <MobileLanguageSwitch />
      <main className="w-full max-w-full overflow-x-hidden">
        <HeroSection />
        <SecondaryHero />
        <BeforeAfterCarousel />
        {/* Find Location Section */}
        <section className="py-12 bg-gradient-to-br from-background to-soft-aqua/5 w-full max-w-full overflow-x-hidden">
          <div className="container mx-auto px-4 w-full max-w-full">
            <div className="text-center mb-8 animate-fade-up w-full max-w-full">
              <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4 w-full max-w-full break-words">
                {t('pages.index.findLocationTitle')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto w-full break-words">
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
