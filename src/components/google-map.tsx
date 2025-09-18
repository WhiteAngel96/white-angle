import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X } from 'lucide-react';

/// <reference types="google.maps" />

interface GoogleMapProps {
  searchQuery?: string;
  onSearchComplete?: () => void;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ searchQuery, onSearchComplete }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<any>(null);

  // Israel coordinates (default location)
  const israelCenter = { lat: 31.0461, lng: 34.8516 };

  // White Angel clinic locations in Israel with products
  const clinicLocations = [
    { 
      lat: 32.0853, 
      lng: 34.7818, 
      title: 'White Angel Tel Aviv Center',
      products: ['White Angel Extra 46%', 'Home Kit 20%', 'Professional Treatment', 'Maintenance Kit']
    },
    { 
      lat: 31.7683, 
      lng: 35.2137, 
      title: 'White Angel Jerusalem Clinic',
      products: ['White Angel Extra 46%', 'Home Kit 20%', 'Professional Treatment']
    },
    { 
      lat: 32.7940, 
      lng: 34.9896, 
      title: 'White Angel Haifa Branch',
      products: ['Home Kit 20%', 'Professional Treatment', 'Maintenance Kit']
    },
    { 
      lat: 31.2530, 
      lng: 34.7915, 
      title: 'White Angel Beer Sheva Office',
      products: ['White Angel Extra 46%', 'Home Kit 20%']
    },
    { 
      lat: 32.1052, 
      lng: 34.8368, 
      title: 'White Angel Herzliya Clinic',
      products: ['White Angel Extra 46%', 'Professional Treatment', 'Maintenance Kit']
    },
    { 
      lat: 31.8969, 
      lng: 34.8186, 
      title: 'White Angel Rehovot Center',
      products: ['Home Kit 20%', 'Professional Treatment']
    }
  ];

  // Handle search query changes with fly-to animation
  useEffect(() => {
    if (!searchQuery) return;

    setIsMoving(true);
    
    // Simulate geocoding and fly-to animation
    setTimeout(() => {
      // For demo purposes, we'll simulate different locations based on search
      let newLocation = israelCenter;
      
      const searchLower = searchQuery.toLowerCase();
      if (searchLower.includes('tel aviv') || searchLower.includes('תל אביב')) {
        newLocation = { lat: 32.0853, lng: 34.7818 };
      } else if (searchLower.includes('jerusalem') || searchLower.includes('ירושלים')) {
        newLocation = { lat: 31.7683, lng: 35.2137 };
      } else if (searchLower.includes('haifa') || searchLower.includes('חיפה')) {
        newLocation = { lat: 32.7940, lng: 34.9896 };
      } else if (searchLower.includes('beer sheva') || searchLower.includes('באר שבע')) {
        newLocation = { lat: 31.2530, lng: 34.7915 };
      }
      
      setCurrentLocation(newLocation);
      setIsMoving(false);
      onSearchComplete?.();
    }, 1000);
  }, [searchQuery, onSearchComplete]);

  const handlePinClick = (clinic: any) => {
    setSelectedClinic(clinic);
  };

  const mapCenter = currentLocation || israelCenter;
  const zoom = currentLocation ? 12 : 7;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-navy mb-4">White Angel Providers Map</h3>
      <div className="flex gap-6">
        {/* Map Container */}
        <div className={`relative rounded-lg overflow-hidden bg-muted transition-all duration-500 ${
          selectedClinic ? 'w-2/3' : 'w-full'
        } h-96`}>
          {/* Static Map Image */}
          <div 
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              isMoving ? 'scale-110' : 'scale-100'
            }`}
            style={{
              backgroundImage: `url(https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter.lat},${mapCenter.lng}&zoom=${zoom}&size=800x400&maptype=roadmap&style=feature:poi|visibility:off&key=YOUR_API_KEY)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#e5e7eb'
            }}
          >
            {/* Fallback background pattern when no API key */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50" />
            
            {/* Clinic Pin Markers */}
            {clinicLocations.map((clinic, index) => {
              // Calculate marker position based on map center and zoom
              const isVisible = !currentLocation || 
                (Math.abs(clinic.lat - mapCenter.lat) < 0.5 && Math.abs(clinic.lng - mapCenter.lng) < 0.5);
              
              if (!isVisible) return null;

              // Simple positioning calculation (approximate)
              const x = ((clinic.lng - mapCenter.lng) * 100 * zoom) + 50;
              const y = ((mapCenter.lat - clinic.lat) * 100 * zoom) + 50;

              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-full hover:scale-110 transition-transform cursor-pointer"
                  style={{
                    left: `${Math.max(10, Math.min(90, x))}%`,
                    top: `${Math.max(10, Math.min(90, y))}%`
                  }}
                  onClick={() => handlePinClick(clinic)}
                  title={clinic.title}
                >
                  {/* Pin Shape */}
                  <div className="relative">
                    {/* Main pin body - rounded top, pointed bottom */}
                    <div className="relative w-8 h-10">
                      {/* Pin circle */}
                      <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                      {/* Pin point */}
                      <div className="absolute top-6 left-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500 transform -translate-x-1/2" />
                    </div>
                    {/* Pulse animation */}
                    <div className="absolute top-0 left-0 w-8 h-8 bg-blue-500/30 rounded-full animate-ping" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Loading overlay */}
          {isMoving && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
              <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <span className="text-sm font-medium">Flying to location...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Panel */}
        {selectedClinic && (
          <Card className="w-1/3 p-4 animate-slide-in-right">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-lg text-navy">{selectedClinic.title}</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedClinic(null)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <h5 className="font-semibold text-muted-foreground mb-3">Available Products:</h5>
              <div className="space-y-2">
                {selectedClinic.products.map((product: string, index: number) => (
                  <div key={index} className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                    <span className="text-sm font-medium">{product}</span>
                  </div>
                ))}
              </div>
              <Button variant="cta" size="sm" className="w-full mt-4">
                Book Appointment
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-5 h-6 relative">
              <div className="w-5 h-5 bg-blue-500 rounded-full border border-white shadow-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <div className="absolute top-4 left-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-blue-500 transform -translate-x-1/2" />
            </div>
          </div>
          <span className="text-muted-foreground">White Angel Clinics</span>
        </div>
      </div>
    </div>
  );
};