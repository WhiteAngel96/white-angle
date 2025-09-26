import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import beforeAfterImage from '@/assets/before-after.jpg';

interface BeforeAfterImage {
  id: number;
  image: string;
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

  // Default images if none provided (up to 20 images)
  const defaultImages: BeforeAfterImage[] = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: beforeAfterImage,
    alt: `Before and after teeth whitening result ${i + 1}`
  }));

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
                  <Card className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="aspect-[4/3] relative">
                      <img 
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation buttons - hidden on mobile, visible on desktop */}
            <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16" />
            <CarouselNext className="hidden md:flex -right-12 lg:-right-16" />
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