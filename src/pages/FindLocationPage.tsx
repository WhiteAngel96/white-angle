import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { MobileBottomNav } from '@/components/ui/mobile-bottom-nav';
import { MobileLanguageSwitch } from '@/components/ui/mobile-language-switch';
import { FindLocation } from '@/components/find-location';
import { useTranslation } from '@/hooks/useTranslation';

const FindLocationPage = () => {
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
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/5 to-soft-aqua/10">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              {t('pages.findLocation.pageTitle')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('pages.findLocation.pageSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Find Location Component */}
      <FindLocation />

      {/* Additional Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-6">
              {t('pages.findLocation.cantFindProvider')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('pages.findLocation.cantFindDescription')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-navy mb-3">{t('pages.findLocation.requestNewLocation')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('pages.findLocation.requestNewDescription')}
                </p>
                <button className="text-primary font-medium hover:underline">
                  {t('pages.findLocation.submitRequest')}
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-navy mb-3">{t('pages.findLocation.becomeProvider')}</h3>
                <p className="text-muted-foreground mb-4">
                  {t('pages.findLocation.becomeProviderDescription')}
                </p>
                <button className="text-secondary font-medium hover:underline">
                  {t('pages.findLocation.learnMore')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FindLocationPage;