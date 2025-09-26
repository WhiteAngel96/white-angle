import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import beforeAfterImage from '@/assets/before-after.jpg';
import clinicInteriorImage from '@/assets/clinic-interior.jpg';
import homeKitImage from '@/assets/home-kit.jpg';
import heroImage from '@/assets/hero-image.jpg';

interface BeforeAfterImage {
  id: number;
  before: string;
  after: string;
  alt: string;
}

interface BeforeAfterCarouselProps {
  images?: BeforeAfterImage[];
}

export const BeforeAfterCarousel: React.FC<BeforeAfterCarouselProps> = ({ images }) => {
  const { t } = useTranslation();
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const intervalRefs = useRef<Map<number, NodeJS.Timeout>>(new Map());

  // Default images if none provided (up to 20 images)
  const imagePairs = [
    { before: beforeAfterImage, after: clinicInteriorImage },
    { before: clinicInteriorImage, after: homeKitImage },
    { before: homeKitImage, after: heroImage },
    { before: heroImage, after: beforeAfterImage },
  ];

  const defaultImages: BeforeAfterImage[] = Array.from({ length: 12 }, (_, i) => {
    const pair = imagePairs[i % imagePairs.length];
    return {
      id: i + 1,
      before: pair.before,
      after: pair.after,
      alt: `Before and after teeth whitening result ${i + 1}`
    };
  });

  const carouselImages = images || defaultImages;

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Mobile auto-alternation effect
  useEffect(() => {
    const startMobileAlternation = (itemId: number) => {
      if (intervalRefs.current.has(itemId)) {
        clearInterval(intervalRefs.current.get(itemId)!);
      }

      const interval = setInterval(() => {
        // Trigger re-render to alternate between before/after
        setVisibleItems(prev => new Set(prev));
      }, 2000);

      intervalRefs.current.set(itemId, interval);
    };

    const stopMobileAlternation = (itemId: number) => {
      if (intervalRefs.current.has(itemId)) {
        clearInterval(intervalRefs.current.get(itemId)!);
        intervalRefs.current.delete(itemId);
      }
    };

    // Start alternation for visible items on mobile
    if (visibleItems.size > 0) {
      visibleItems.forEach(itemId => {
        startMobileAlternation(itemId);
      });
    }

    // Cleanup on unmount
    return () => {
      intervalRefs.current.forEach((interval) => clearInterval(interval));
      intervalRefs.current.clear();
    };
  }, [visibleItems]);

  // Intersection Observer for mobile auto-alternation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const itemId = parseInt(entry.target.getAttribute('data-item-id') || '0');
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set(prev).add(itemId));
          } else {
            setVisibleItems(prev => {
              const newSet = new Set(prev);
              newSet.delete(itemId);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const items = document.querySelectorAll('[data-item-id]');
    items.forEach(item => observer.observe(item));

    return () => {
      items.forEach(item => observer.unobserve(item));
    };
  }, [carouselImages]);

  const handleMouseEnter = (itemId: number) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = (itemId: number) => {
    setHoveredItem(null);
  };

  const isShowingAfter = (itemId: number) => {
    const isMobile = window.innerWidth < 768;
  
    // Desktop: show after image only on hover
    if (!isMobile) {
      return hoveredItem === itemId;
    }
  
    // Mobile: alternate between before/after automatically
    if (visibleItems.has(itemId)) {
      const now = Date.now();
      const cycleTime = 3000; // 3 שניות
      const cyclePosition = (now % (cycleTime * 2)) / cycleTime;
      return cyclePosition >= 1;
    }
  
    return false;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            {t('pages.beforeAfter.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('pages.beforeAfter.subtitle')}
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {carouselImages.map((item) => (
                <CarouselItem 
                  key={item.id} 
                  className="pl-2 md:pl-4 basis-full md:basis-1/3 lg:basis-1/5"
                >
                  <Card 
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={() => handleMouseLeave(item.id)}
                  >
                    <div 
                      className="aspect-[4/3] relative"
                      data-item-id={item.id}
                    >
                      {/* Before Image */}
                      <img 
                        src={item.before}
                        alt={`${item.alt} - Before`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                          isShowingAfter(item.id) ? 'opacity-0' : 'opacity-100'
                        }`}
                      />
                      
                      {/* After Image */}
                      <img 
                        src={item.after}
                        alt={`${item.alt} - After`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                          isShowingAfter(item.id) ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation buttons - hidden on mobile, visible on desktop */}
            <CarouselPrevious className="hidden md:flex -left-8 lg:-left-12" />
            <CarouselNext className="hidden md:flex -right-6 lg:-right-8" />
          </Carousel>
          {/* Pagination dots - visible on mobile only */}
          <div className="flex justify-center mt-6 md:hidden">
            <div className="flex space-x-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current - 1
                      ? 'bg-navy scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Slide counter - visible on desktop */}
          <div className="hidden md:flex justify-center mt-6">
            <div className="text-sm text-muted-foreground">
              {current} of {count}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};