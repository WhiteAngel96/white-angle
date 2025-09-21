import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GoogleMap } from '@/components/google-map';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';


export const FindLocation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const { t } = useTranslation();
  const { isHebrew } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Location suggestions in both English and Hebrew
  const locationSuggestions = {
    en: [
      'Tel Aviv, Israel',
      'Jerusalem, Israel',
      'Haifa, Israel',
      'Beer Sheva, Israel',
      'Herzliya, Israel',
      'Rehovot, Israel',
      'Netanya, Israel',
      'Ashdod, Israel',
      'Petah Tikva, Israel',
      'Rishon LeZion, Israel',
      'Ramat Gan, Israel',
      'Holon, Israel',
      'Bat Yam, Israel',
      'Kfar Saba, Israel',
      'Ra\'anana, Israel'
    ],
    he: [
      'תל אביב, ישראל',
      'ירושלים, ישראל',
      'חיפה, ישראל',
      'באר שבע, ישראל',
      'הרצליה, ישראל',
      'רחובות, ישראל',
      'נתניה, ישראל',
      'אשדוד, ישראל',
      'פתח תקווה, ישראל',
      'ראשון לציון, ישראל',
      'רמת גן, ישראל',
      'חולון, ישראל',
      'בת ים, ישראל',
      'כפר סבא, ישראל',
      'רעננה, ישראל'
    ]
  };

  // Filter suggestions based on input
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const currentSuggestions = locationSuggestions[isHebrew ? 'he' : 'en'];
      const filtered = currentSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 5)); // Show max 5 suggestions
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  }, [searchQuery, isHebrew]);

  // Handle clicking outside suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setShowSuggestions(false);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setSearchedLocation(searchQuery);
    setIsSearching(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // Automatically search when suggestion is selected
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <section className="py-12 bg-gradient-to-br from-background to-soft-aqua/5">
      <div className="container mx-auto px-4">

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
              <Input
                ref={inputRef}
                type="text"
                placeholder={t('pages.findLocation.searchPlaceholder')}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => filteredSuggestions.length > 0 && setShowSuggestions(true)}
                className="pl-10 h-12 text-lg"
                aria-label="Enter location to search for nearby White Angel providers"
                autoComplete="off"
              />
              
              {/* Autocomplete Suggestions */}
              {showSuggestions && (
                <div
                  ref={suggestionsRef}
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2 transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
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