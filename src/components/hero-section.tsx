import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import heroImage from '@/assets/hero-image.jpg';
import blueLogo from '@/assets/logo-blue.png';


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

  {/* Content */}
  <div className="relative h-[70vh] flex items-end justify-center overflow-hidden pb-20">
    <div className={`transition-all duration-1000 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>

      {/* Logo above buttons */}
      <img 
        src={blueLogo} 
        alt="White Angel" 
        className="h-64 md:h-128 mx-auto mb-[-40px]"
      />

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-[-45px]">
        <Button 
          asChild 
            size="lg" 
            className="min-w-[180px] bg-white text-navy font-semibold border-2 border-navy hover:bg-navy hover:text-white transition-colors"
             >
            <Link to="/dental-office">
            {t('For Dentists')}
          </Link>
        </Button>
        
        <Button 
        asChild 
        size="lg" 
        className="min-w-[180px] bg-white text-navy font-semibold border-2 border-navy hover:bg-navy hover:text-white transition-colors"
        >
       <Link to="/patients">
          {t('For Patients')}
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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide mb-6 text-navy">
            {t('hero.ourStory')}
             </h2>
              <div className="w-20 h-px bg-navy/60 mx-auto mb-8"></div>
                <p className="text-lg md:text-2xl font-medium mb-10 leading-relaxed tracking-wide text-navy">
                  {t('hero.storyDescription')}
                </p>

                <Button 
                  asChild 
                  size="lg" 
                   className="min-w-[200px] bg-white text-navy font-semibold border-2 border-navy hover:bg-navy hover:text-white transition-colors"
                      >
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