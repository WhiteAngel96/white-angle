import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

export const SecondaryHero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="py-0">
      <div className="grid lg:grid-cols-2 h-screen">
        {/* Home Kit Whitening Block */}
        <div className="relative group overflow-hidden">
          <div className="absolute inset-0 bg-[url('/src/assets/home-kit.jpg')] bg-cover bg-center"></div>
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-8">
            <div className="max-w-md">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-4 uppercase">
                Home Kit
              </h3>
              <div className="w-16 h-px bg-white/60 mx-auto mb-6"></div>
              <p className="text-lg font-light mb-8 tracking-wide">
                Professional whitening at home
              </p>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy transition-all duration-300">
                <Link to="/patients#home-kit-whitening">
                  EXPLORE HOME KITS
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Clinic Whitening Block */}
        <div className="relative group overflow-hidden">
          <div className="absolute inset-0 bg-[url('/src/assets/clinic-interior.jpg')] bg-cover bg-center"></div>
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white p-8">
            <div className="max-w-md">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide mb-4 uppercase">
                Clinic Treatment
              </h3>
              <div className="w-16 h-px bg-white/60 mx-auto mb-6"></div>
              <p className="text-lg font-light mb-8 tracking-wide">
                Professional in-office results
              </p>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-navy transition-all duration-300">
                <Link to="/patients#clinic-whitening">
                  EXPLORE TREATMENTS
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};