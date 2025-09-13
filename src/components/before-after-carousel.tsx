import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import beforeAfterImage from '@/assets/before-after.jpg';

interface BeforeAfterImage {
  id: number;
  before: string;
  after: string;
  description: string;
}

export const BeforeAfterCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Mock data - in real app, this would come from API
  const beforeAfterImages: BeforeAfterImage[] = [
    {
      id: 1,
      before: beforeAfterImage,
      after: beforeAfterImage,
      description: "Professional whitening treatment - 6 shades whiter in just one session"
    },
    {
      id: 2,
      before: beforeAfterImage,
      after: beforeAfterImage,
      description: "Home kit treatment - Gradual whitening over 2 weeks"
    },
    {
      id: 3,
      before: beforeAfterImage,
      after: beforeAfterImage,
      description: "In-office professional treatment - Maximum strength results"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % beforeAfterImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, beforeAfterImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % beforeAfterImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            See the Amazing Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real patients, real results. Discover the transformative power of White Angel 
            professional teeth whitening technology.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {beforeAfterImages.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <div className="aspect-video relative">
                    <img 
                      src={item.before}
                      alt={`Before and after teeth whitening results - ${item.description}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-lg font-medium">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              onClick={prevSlide}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white"
              onClick={nextSlide}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {beforeAfterImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-white scale-110' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsAutoPlaying(false);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12 text-center animate-fade-up">
            <blockquote className="text-2xl italic text-navy mb-4">
              "I couldn't believe the difference! My teeth are now 8 shades whiter, 
              and the results have lasted for months."
            </blockquote>
            <cite className="text-muted-foreground">— Sarah M., Satisfied Patient</cite>
          </div>
        </div>
      </div>
    </section>
  );
};