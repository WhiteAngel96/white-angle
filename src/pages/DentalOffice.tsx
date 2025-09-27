import React, { useEffect, useState, useRef } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { MobileBottomNav } from '@/components/ui/mobile-bottom-nav';
import { MobileLanguageSwitch } from '@/components/ui/mobile-language-switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Stethoscope, Lightbulb, Shield, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import dentistBanner from '@/assets/dentist-banner2.png';

// assets
import homeKit20 from '@/assets/home-kit-20.png';
import homeKit15 from '@/assets/home-kit-15.png';
import whiteningStrips from '@/assets/strips.png';
import whiteAngelExtra46 from '@/assets/extra-46.png';
import whiteAngelPro from '@/assets/pro-33.png'; 
import desensitiser from '@/assets/desi.png';

// open kit images
import homeKit20Open from '@/assets/home-kit-open20.png';
import homeKit15Open from '@/assets/home-kit-open15.png';
import whiteningStripsOpen from '@/assets/strips-open.png';
import whiteAngelExtra46Open from '@/assets/extra46-open.png';
import whiteAngelProOpen from '@/assets/pro33-open.png';
import desensitiserOpen from '@/assets/desi-blue.png';
import proOpen from '@/assets/pro-33.png';


// placeholder images for accessories (using existing images as placeholders)
import ledLampImage from '@/assets/home-kit-20.png';
import ledLampOpen from '@/assets/home-kit-open20.png';
import openTrayImage from '@/assets/home-kit-15.png';
import openTrayOpen from '@/assets/home-kit-open15.png';
import gingivalBarrierImage from '@/assets/strips.png';
import gingivalBarrierOpen from '@/assets/strips-open.png';
import trayCaseImage from '@/assets/extra-46.png';
import trayCaseOpen from '@/assets/extra46-open.png';
import vitaminEImage from '@/assets/pro-33.png';
import vitaminEOpen from '@/assets/pro33-open.png';

// Product Card Component - Ralph Lauren Style
const ProductCard = ({ product, index }: { product: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isShowingHover, setIsShowingHover] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // No automatic image replacement - only hover works
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentImage = isHovered || isShowingHover ? product.hoverImage : product.image;

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container - Ralph Lauren Style */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={currentImage}
          alt={product.name}
          className="w-full aspect-[3/4] object-cover transition-all duration-500 ease-in-out scale-60"
        />
      </div>
      
      {/* Product Info - Ralph Lauren Typography */}
      <div className="pt-4 pb-6 px-2">
        <h3 className="text-base font-medium text-gray-900 text-center mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
          {product.description}
        </p>
        
        {/* Learn More Button - Ralph Lauren Style */}
        <div className="text-center">
          <Link to={product.link || '#'}>
            <button className="inline-flex items-center justify-center px-8 py-3 text-sm font-medium text-gray-900 border border-gray-300 hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out uppercase tracking-wide">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// YouTube Video Carousel Component
const YouTubeCarousel = ({ testimonials }: { testimonials: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextSlide = () => {
    const maxIndex = isDesktop ? Math.ceil(testimonials.length / 3) - 1 : testimonials.length - 1;
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevSlide = () => {
    const maxIndex = isDesktop ? Math.ceil(testimonials.length / 3) - 1 : testimonials.length - 1;
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  const openVideo = (youtubeId: string) => {
    setSelectedVideo(youtubeId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Removed auto-advance - carousel only moves when user clicks arrows or dots

  return (
    <>
      <div className="relative max-w-6xl mx-auto px-8">
        <div className="overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (isDesktop ? 33.333 : 100)}%)` 
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full lg:w-1/3 flex-shrink-0 px-4">
                <div className="relative group cursor-pointer" onClick={() => openVideo(testimonial.youtubeId)}>
                  {/* YouTube Thumbnail */}
                  <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${testimonial.youtubeId}/maxresdefault.jpg`}
                      alt={`${testimonial.doctor} testimonial`}
                      className="w-full h-full object-cover"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300">
                      <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Doctor Name */}
                  <div className="mt-4 text-center">
                    <h4 className="text-lg font-semibold text-navy">{testimonial.doctor}</h4>
                    <p className="text-sm text-muted-foreground">Dental Professional</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 z-10"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: isDesktop ? Math.ceil(testimonials.length / 3) : testimonials.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? 'bg-navy' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={closeModal}>
          <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Dental Professional Testimonial"
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const DentalOffice = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const takeHomeProducts = [
    { name: 'Home Kit 20%', description: 'Professional strength for dramatic results', image: homeKit20, hoverImage: homeKit20Open, link: '/products/home-kit-20' },
    { name: 'Home Kit 15%', description: 'Gentle formula for sensitive teeth', image: homeKit15, hoverImage: homeKit15Open, link: '/products/home-kit-15' },
    { name: 'Whitening Strips', description: 'Convenient maintenance solution', image: whiteningStrips, hoverImage: whiteningStripsOpen, link: '/products/whitening-strips' }
  ];

  const inOfficeProducts = [
    { name: 'White Angel Extra 46%', description: 'Maximum strength in-office treatment', image: whiteAngelExtra46, hoverImage: whiteAngelExtra46Open, link: '/products/white-angel-extra-46' },
    { name: 'White Angel Pro', description: 'Professional standard treatment', image: whiteAngelPro, hoverImage: whiteAngelProOpen, link: '/products/white-angel-pro' },
    { name: 'Desensitiser', description: 'Comfort enhancement system', image: desensitiser, hoverImage: desensitiserOpen, link: '/products/desensitiser' }
  ];

  const otherProducts = [
    { name: 'LED Lamp', description: 'Professional activation system for enhanced whitening results', image: ledLampImage, hoverImage: ledLampOpen, link: '/products/led-lamp' },
    { name: 'Open Tray', description: 'Universal tray system for comfortable treatment', image: openTrayImage, hoverImage: openTrayOpen, link: '/products/open-tray' },
    { name: 'Gingival Barrier', description: 'Protective gel application for sensitive areas', image: gingivalBarrierImage, hoverImage: gingivalBarrierOpen, link: '/products/gingival-barrier' },
    { name: 'Tray Case', description: 'Professional storage solution for your equipment', image: trayCaseImage, hoverImage: trayCaseOpen, link: '/products/tray-case' },
    { name: 'Vitamin E Sticks', description: 'Post-treatment lip care for patient comfort', image: vitaminEImage, hoverImage: vitaminEOpen, link: '/products/vitamin-e-sticks' },
  ];

  const testimonials = [
    { 
      doctor: "Dr. Sarah Johnson", 
      youtubeId: "dQw4w9WgXcQ" // Example YouTube ID - replace with real ones
    },
    { 
      doctor: "Dr. David Cohen", 
      youtubeId: "dQw4w9WgXcQ" // Example YouTube ID - replace with real ones
    },
    { 
      doctor: "Dr. Maria Lopez", 
      youtubeId: "dQw4w9WgXcQ" // Example YouTube ID - replace with real ones
    },
    { 
      doctor: "Dr. Michael Chen", 
      youtubeId: "dQw4w9WgXcQ" // Example YouTube ID - replace with real ones
    },
    { 
      doctor: "Dr. Emily Rodriguez", 
      youtubeId: "dQw4w9WgXcQ" // Example YouTube ID - replace with real ones
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation isScrolled={isScrolled} />
      <MobileBottomNav />
      <MobileLanguageSwitch />

      {/* Hero Banner */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={dentistBanner} alt="Dental Office Banner" className="w-full h-full object-cover object-[10%_10%] md:object-[center_10%]" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">For Dental Professionals</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            Complete whitening solutions for your practice. Professional products, proven results, exceptional patient satisfaction.
          </p>
        </div>
      </section>

      {/* Take Home Products */}
      <section id="take-home" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">Take Home Products</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Extend treatment beyond your office with professional-grade home whitening solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {takeHomeProducts.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* In-Office Products */}
      <section id="in-office" className="py-20 bg-gradient-to-br from-background to-soft-aqua/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">In-Office Products</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional-strength treatments for immediate, dramatic results in your office.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {inOfficeProducts.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Professional Accessories */}
      <section id="other" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">Professional Accessories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete your whitening setup with our professional accessories and support products.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {otherProducts.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">What Dental Professionals Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear directly from dental professionals who trust White Angel products in their practice.
            </p>
          </div>
          <YouTubeCarousel testimonials={testimonials} />
        </div>
      </section>

     {/* Contact Form */}
<section className="py-20 bg-navy">
  <div className="container mx-auto px-4">
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-6">Partner with White Angel</h2>
        <p className="text-xl text-white/80">
          Join thousands of dental professionals worldwide. Get started today.
        </p>
      </div>

      <form
        className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          if (!form.checkValidity()) {
            form.reportValidity();
            return;
          }
          // ✅ לוגיקת שליחה
        }}
      >
        {/* Full Name + Phone */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="full-name" className="text-white">Full Name *</Label>
            <Input
              id="full-name"
              name="fullName"
              required
              minLength={3}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="Dr. John Smith"
              onBlur={(e) => {
                if (!e.target.validity.valid) {
                  e.target.classList.add("invalid");
                } else {
                  e.target.classList.remove("invalid");
                }
              }}
            />
            <span className="text-red-400 text-sm hidden invalid:block">
              Please enter your full name (at least 3 characters).
            </span>
          </div>
          <div>
            <Label htmlFor="phone" className="text-white">Phone *</Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              required
              pattern="^(0\d+|\+\d+)$"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="+972xxxxxxxxx"
              onBlur={(e) => {
                if (!e.target.validity.valid) {
                  e.target.classList.add("invalid");
                } else {
                  e.target.classList.remove("invalid");
                }
              }}
            />
            <span className="text-red-400 text-sm hidden invalid:block">
              Phone must start with "0" or "+" and contain only digits (no spaces).
            </span>
          </div>
        </div>

        {/* Email + License */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email" className="text-white">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="doctor@practice.com"
              onBlur={(e) => {
                if (!e.target.validity.valid) {
                  e.target.classList.add("invalid");
                } else {
                  e.target.classList.remove("invalid");
                }
              }}
            />
            <span className="text-red-400 text-sm hidden invalid:block">
              Please enter a valid email address.
            </span>
          </div>
          <div>
            <Label htmlFor="license" className="text-white">License Number *</Label>
            <Input
              id="license"
              name="license"
              type="text"
              required
              pattern="^2-.+$"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              placeholder="2-987"
              onBlur={(e) => {
                if (!e.target.validity.valid) {
                  e.target.classList.add("invalid");
                } else {
                  e.target.classList.remove("invalid");
                }
              }}
            />
            <span className="text-red-400 text-sm hidden invalid:block">
              License number must start with "2-".
            </span>
          </div>
        </div>

        {/* Message */}
        <div>
          <Label htmlFor="message" className="text-white">Message</Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            minLength={10}
            maxLength={500}
            className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
            placeholder="Tell us about your practice and whitening needs..."
            onBlur={(e) => {
              if (!e.target.validity.valid) {
                e.target.classList.add("invalid");
              } else {
                e.target.classList.remove("invalid");
              }
            }}
          />
          <span className="text-red-400 text-sm hidden invalid:block">
            Message must be between 10 and 500 characters.
          </span>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full">
          Submit Request
        </Button>
      </form>
    </div>
  </div>
</section>




    </div>
  );
};

export default DentalOffice;
