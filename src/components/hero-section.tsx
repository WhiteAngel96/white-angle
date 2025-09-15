import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

export const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* First Banner - Welcome/Impressive Banner */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="Professional teeth whitening - beautiful smile with White Angel treatment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 overlay-gradient" />
        </div>

        {/* Content - Ralph Lauren Style */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            {/* Brand Logo */}
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] mb-4">
                WHITE ANGEL
              </h1>
              <div className="w-24 h-px bg-white/60 mx-auto mb-6"></div>
              <p className="text-sm md:text-base tracking-[0.15em] font-light uppercase text-white/80">
                Professional Teeth Whitening
              </p>
            </div>
            
            {/* Main Collection Text */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-6">
                SPRING 2025 COLLECTION
              </h2>
            </div>
            
            {/* CTA Buttons - Ralph Lauren Style */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild variant="outline" size="lg" className="min-w-[180px] border-white text-white hover:bg-white hover:text-navy transition-all duration-300">
                <Link to="/about">
                  DISCOVER MORE
                </Link>
              </Button>
              
              <Button asChild variant="ghost" size="lg" className="min-w-[180px] text-white border border-white/30 hover:bg-white/10 transition-all duration-300">
                <Link to="/find-location">
                  FIND LOCATIONS
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Second Banner - About Us Video Banner */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage}
            alt="About White Angel - Professional teeth whitening expertise"
            className="w-full h-full object-cover"
            style={{ filter: 'sepia(20%) saturate(80%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-primary/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6">
                OUR STORY
              </h2>
              <div className="w-20 h-px bg-white/60 mx-auto mb-8"></div>
              <p className="text-lg md:text-xl font-light mb-10 leading-relaxed tracking-wide">
                Discover the science and passion behind White Angel's revolutionary 
                teeth whitening technology that transforms smiles worldwide.
              </p>
              
              <Button asChild variant="outline" size="lg" className="min-w-[200px] border-white text-white hover:bg-white hover:text-navy transition-all duration-300">
                <Link to="/about">
                  LEARN ABOUT US
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