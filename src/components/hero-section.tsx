import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import heroImage from '@/assets/hero-image.jpg';

export const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* First Banner - Welcome/Impressive Banner */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/src/assets/hero-video.mov" type="video/mp4" />
          </video>
          
        </div>

        {/* Content - Ralph Lauren Style */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            {/* Brand Logo */}
            <div className="mb-8">
              <img 
                src="/src/assets/white-angel-logo.png" 
                alt="White Angel Professional Teeth Whitening"
                className="h-24 md:h-28 lg:h-32 mx-auto mb-6"
              />
              <div className="w-24 h-px bg-white/60 mx-auto mb-6"></div>
              <p className="text-sm md:text-base tracking-[0.15em] font-light uppercase text-white/80">
                {t('hero.tagline')}
              </p>
            </div>
            
            {/* Main Collection Text */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-6">
                {t('hero.collection')}
              </h2>
            </div>
            
            {/* CTA Buttons - Light Blue Style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="cta" size="lg" className="min-w-[180px] text-white shadow-2xl hover:shadow-cta-light-blue/30">
                <Link to="/about">
                  {t('hero.discoverMore')}
                </Link>
              </Button>
              
              <Button asChild variant="cta-outline" size="lg" className="min-w-[180px] bg-white/10 backdrop-blur-sm hover:shadow-2xl hover:shadow-cta-light-blue/20">
                <Link to="/find-location">
                  {t('hero.findLocations')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Second Banner - About Us Video Banner */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/src/assets/lifestyle-video.mp4" type="video/mp4" />
          </video>
          
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6">
                {t('hero.ourStory')}
              </h2>
              <div className="w-20 h-px bg-white/60 mx-auto mb-8"></div>
              <p className="text-lg md:text-xl font-light mb-10 leading-relaxed tracking-wide">
                {t('hero.storyDescription')}
              </p>
              
              <Button asChild variant="outline" size="lg" className="min-w-[200px] border-white text-white hover:bg-white hover:text-navy transition-all duration-300">
                <Link to="/about">
                  {t('hero.learnAboutUs')}
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
    </>
  );
};