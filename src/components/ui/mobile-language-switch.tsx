import React from 'react';
import { Button } from './button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import israelFlag from '@/assets/israel-flag.png';
import usFlag from '@/assets/us-flag.png';

export const MobileLanguageSwitch: React.FC = () => {
  const { toggleLanguage, isHebrew } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      className={cn(
        'fixed top-4 z-50 lg:hidden',
        'bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg',
        'hover:bg-white hover:shadow-xl transition-all duration-200',
        'w-12 h-10 p-0 rounded-full',
        // Position based on language direction
        isHebrew ? 'left-4' : 'right-4'
      )}
      aria-label={isHebrew ? 'Switch to English' : 'עבור לעברית'}
    >
      <img 
        src={isHebrew ? usFlag : israelFlag}
        alt={isHebrew ? 'English' : 'עברית'}
        className="w-6 h-4 object-cover rounded-sm"
      />
    </Button>
  );
};
