import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { FindLocation } from '@/components/find-location';

const FindLocationPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      
      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/5 to-soft-aqua/10">
        <div className="container mx-auto px-4">
          <div className="h-16"></div>
        </div>
      </section>

      {/* Main Find Location Component */}
      <FindLocation />

      {/* Additional Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy mb-6">
              Can't Find a Provider Near You?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're constantly expanding our network of authorized White Angel providers. 
              If there isn't a location near you yet, let us know and we'll help connect 
              you with the nearest available option.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-navy mb-3">Request New Location</h3>
                <p className="text-muted-foreground mb-4">
                  Help us bring White Angel to your area by requesting a new provider location.
                </p>
                <button className="text-primary font-medium hover:underline">
                  Submit Request →
                </button>
              </div>
              
              <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl p-6">
                <h3 className="text-xl font-bold text-navy mb-3">Become a Provider</h3>
                <p className="text-muted-foreground mb-4">
                  Are you a dental professional interested in offering White Angel treatments?
                </p>
                <button className="text-secondary font-medium hover:underline">
                  Learn More →
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