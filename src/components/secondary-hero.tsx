import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SecondaryHero: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-soft-aqua/10 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mb-6">
            What kind of whitening is best for you?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Discover the perfect whitening solution tailored to your lifestyle and needs. 
            Professional results, whether at home or in the clinic.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Home Kit Whitening */}
          <div className="group hover-lift">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-transparent border-l-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-navy mb-4">Home Kit Whitening</h3>
                <p className="text-muted-foreground mb-6">
                  Professional-grade whitening from the comfort of your home. 
                  Safe, effective, and convenient for busy lifestyles.
                </p>
                <Button asChild variant="cta" className="w-full group">
                  <Link to="/patients#home-kit">
                    Learn More About Home Kits
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Clinic Whitening */}
          <div className="group hover-lift">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <div className="w-0 h-0 border-l-4 border-r-0 border-t-4 border-b-4 border-transparent border-l-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-navy mb-4">Clinic Whitening</h3>
                <p className="text-muted-foreground mb-6">
                  Professional in-office treatment with immediate, dramatic results. 
                  Maximum strength formula for the fastest whitening possible.
                </p>
                <Button asChild variant="cta" className="w-full group">
                  <Link to="/patients#clinic">
                    Learn More About Clinic Whitening
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};