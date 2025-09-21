import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleMap } from '@/components/google-map';
import { useTranslation } from '@/hooks/useTranslation';


export const FindLocation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState('');
  const { t } = useTranslation();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setSearchedLocation(searchQuery);
    setIsSearching(false);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-background to-soft-aqua/5">
      <div className="container mx-auto px-4">

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('pages.findLocation.searchPlaceholder')}
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
              {t('pages.findLocation.searchButton')}
            </Button>
          </div>
        </div>

        {/* Google Maps */}
        <div className="max-w-6xl mx-auto">
          <GoogleMap 
            searchQuery={searchedLocation}
            onSearchComplete={() => setSearchedLocation('')}
          />
        </div>
      </div>
    </section>
  );
};