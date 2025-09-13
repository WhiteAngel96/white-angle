import React, { useState } from 'react';
import { Search, MapPin, Phone, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Clinic {
  id: number;
  name: string;
  address: string;
  phone: string;
  rating: number;
  distance: string;
  hours: string;
  specialties: string[];
}

export const FindLocation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Mock data - in real app, this would come from API
  const mockClinics: Clinic[] = [
    {
      id: 1,
      name: "Luxury Dental Spa",
      address: "123 Main Street, Beverly Hills, CA 90210",
      phone: "(555) 123-4567",
      rating: 4.9,
      distance: "0.8 miles",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-3PM",
      specialties: ["White Angel Pro", "Home Kits", "Express Whitening"]
    },
    {
      id: 2,
      name: "Elite Cosmetic Dentistry",
      address: "456 Rodeo Drive, Beverly Hills, CA 90210",
      phone: "(555) 987-6543",
      rating: 4.8,
      distance: "1.2 miles",
      hours: "Mon-Thu: 7AM-7PM, Fri: 8AM-5PM",
      specialties: ["White Angel Extra", "Professional Treatments"]
    },
    {
      id: 3,
      name: "Premium Smile Center",
      address: "789 Sunset Blvd, West Hollywood, CA 90069",
      phone: "(555) 555-0123",
      rating: 4.7,
      distance: "2.1 miles",
      hours: "Tue-Sat: 9AM-6PM",
      specialties: ["All White Angel Products", "Consultation Available"]
    }
  ];

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSearching(false);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-soft-aqua/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Find White Angel Near You
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Locate authorized White Angel providers in your area. Professional treatments 
            and products available at certified dental offices nationwide.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter your city, state, or ZIP code"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
                aria-label="Enter location to search for nearby White Angel providers"
              />
            </div>
            <Button 
              onClick={handleSearch}
              disabled={isSearching || !searchQuery}
              variant="cta"
              size="lg"
              className="px-8"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Search
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {mockClinics.map((clinic) => (
              <div 
                key={clinic.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover-lift"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-navy">{clinic.name}</h3>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium text-foreground">{clinic.rating}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{clinic.address}</span>
                        <span className="text-primary font-medium">• {clinic.distance}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{clinic.phone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{clinic.hours}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Available Services:</p>
                      <div className="flex flex-wrap gap-2">
                        {clinic.specialties.map((specialty) => (
                          <span 
                            key={specialty}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[200px]">
                    <Button variant="cta" className="flex-1">
                      Book Appointment
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map Preview Placeholder */}
          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-navy mb-4">Map View</h3>
            <div className="aspect-video bg-gradient-to-br from-soft-aqua/20 to-primary/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                <p className="text-muted-foreground">Interactive map will be displayed here</p>
                <p className="text-sm text-muted-foreground">Showing White Angel providers in your area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};