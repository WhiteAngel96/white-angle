import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

export const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="Professional teeth whitening - beautiful smile with White Angel treatment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 overlay-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            White Angel
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 font-light max-w-3xl mx-auto leading-relaxed">
            Professional Teeth Whitening
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-white/90">
            Experience the ultimate in professional teeth whitening technology. 
            Achieve brilliant, lasting results with our advanced whitening solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild variant="hero" size="lg" className="group">
              <Link to="/about">
                About Us
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button asChild variant="glass" size="lg" className="group">
              <Link to="/find-location">
                Find White Angel Near You
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Video Play Button (Placeholder for future video integration) */}
        <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <button 
            className="mx-auto flex items-center justify-center w-20 h-20 rounded-full glass-effect hover:scale-110 transition-all duration-300 group"
            aria-label="Play introduction video"
          >
            <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
          </button>
          <p className="mt-4 text-white/80 text-sm">Watch Our Introduction</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};