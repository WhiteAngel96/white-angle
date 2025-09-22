import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Info, MapPin, User, Stethoscope } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface MobileNavItem {
  id: string;
  labelKey: string;
  href: string;
  icon?: React.ElementType;
  isLogo?: boolean;
  ariaLabelKey: string;
}

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const { isHebrew } = useLanguage();
  const { t } = useTranslation();

  // Navigation items in LTR order: For Dentist | For Patient | Find Us | About | Home (Logo)
  const navItems: MobileNavItem[] = [
    {
      id: 'dentist',
      labelKey: 'nav.forDentalOffice',
      href: '/dental-office',
      icon: Stethoscope,
      ariaLabelKey: 'nav.aria.forDentalOffice'
    },
    {
      id: 'patients',
      labelKey: 'nav.forPatients',
      href: '/patients',
      icon: User,
      ariaLabelKey: 'nav.aria.forPatients'
    },
    {
      id: 'find-us',
      labelKey: 'nav.findUs',
      href: '/find-location',
      icon: MapPin,
      ariaLabelKey: 'nav.aria.findLocation'
    },
    {
      id: 'about',
      labelKey: 'nav.about',
      href: '/about',
      icon: Info,
      ariaLabelKey: 'nav.aria.about'
    },
    {
      id: 'home',
      labelKey: 'nav.home',
      href: '/',
      isLogo: true,
      ariaLabelKey: 'nav.aria.home'
    }
  ];

  // Reverse order for RTL languages
  const displayItems = isHebrew ? [...navItems].reverse() : navItems;

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const getActiveClass = (href: string) => {
    return isActive(href) 
      ? 'text-cta-light-blue bg-cta-light-blue/10' 
      : 'text-muted-foreground hover:text-cta-light-blue';
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-border shadow-lg"
      role="navigation"
      aria-label={t('nav.aria.mobileNavigation')}
      dir={isHebrew ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center justify-around px-1 py-1.5 safe-area-pb">
        {displayItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center min-w-0 flex-1 px-1 py-1.5 rounded-md transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-cta-light-blue focus:ring-offset-1',
                'hover:bg-cta-light-blue/5 active:scale-95',
                getActiveClass(item.href)
              )}
              aria-label={t(item.ariaLabelKey)}
              aria-current={active ? 'page' : undefined}
            >
              {/* Icon or Logo */}
              <div className={cn(
                'flex items-center justify-center w-5 h-5 mb-0.5',
                active && 'animate-pulse'
              )}>
                {item.isLogo ? (
                  <img 
                    src="/src/assets/white-angel-logo.png" 
                    alt="White Angel"
                    className="w-5 h-5 object-contain"
                  />
                ) : Icon ? (
                  <Icon 
                    className="w-4 h-4" 
                    strokeWidth={active ? 2.5 : 2}
                  />
                ) : null}
              </div>
              
              {/* Label */}
              <span className={cn(
                'text-xs font-medium leading-tight text-center max-w-full truncate',
                active ? 'font-semibold' : 'font-normal'
              )}>
                {t(item.labelKey)}
              </span>
              
              {/* Active indicator */}
              {active && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-cta-light-blue rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
