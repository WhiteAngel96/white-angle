import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/// <reference types="google.maps" />

interface GoogleMapProps {
  searchQuery?: string;
  onSearchComplete?: () => void;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ searchQuery, onSearchComplete }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isMoving, setIsMoving] = useState(false);

  // Israel coordinates (default location)
  const israelCenter = { lat: 31.0461, lng: 34.8516 };

  // White Angel clinic locations in Israel
  const clinicLocations = [
    { lat: 32.0853, lng: 34.7818, title: 'White Angel Tel Aviv Center' },
    { lat: 31.7683, lng: 35.2137, title: 'White Angel Jerusalem Clinic' },
    { lat: 32.7940, lng: 34.9896, title: 'White Angel Haifa Branch' },
    { lat: 31.2530, lng: 34.7915, title: 'White Angel Beer Sheva Office' },
    { lat: 32.1052, lng: 34.8368, title: 'White Angel Herzliya Clinic' },
    { lat: 31.8969, lng: 34.8186, title: 'White Angel Rehovot Center' }
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

  const mapCenter = currentLocation || israelCenter;
  const zoom = currentLocation ? 12 : 7;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-navy mb-4">White Angel Providers Map</h3>
      <div className="relative w-full h-96 rounded-lg overflow-hidden bg-muted">
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
          
          {/* Clinic Markers */}
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
                className="absolute w-6 h-6 bg-primary rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer"
                style={{
                  left: `${Math.max(5, Math.min(95, x))}%`,
                  top: `${Math.max(5, Math.min(95, y))}%`
                }}
                title={clinic.title}
              >
                <div className="absolute inset-0 bg-primary rounded-full animate-pulse opacity-75" />
              </div>
            );
          })}

          {/* Search Location Marker */}
          {currentLocation && (
            <div
              className="absolute w-8 h-8 bg-destructive rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
              style={{
                left: '50%',
                top: '50%'
              }}
              title={`Searched: ${searchQuery}`}
            >
              <div className="absolute inset-1 bg-white rounded-full" />
            </div>
          )}
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
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-primary rounded-full border border-white shadow-sm" />
          <span className="text-muted-foreground">White Angel Clinics</span>
        </div>
        {currentLocation && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-destructive rounded-full border border-white shadow-sm" />
            <span className="text-muted-foreground">Your Search Location</span>
          </div>
        )}
      </div>
    </div>
  );
};