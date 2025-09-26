import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Info, MapPin, User, Stethoscope, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import blueLogo from '@/assets/logo-blue.png';

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

  // Navigation items in LTR order: For Dentist | For Distributors | For Patient | Find Us | About | Home (Logo)
  const navItems: MobileNavItem[] = [
    {
      id: 'dentist',
      labelKey: 'nav.forDentalOffice',
      href: '/dental-office',
      icon: Stethoscope,
      ariaLabelKey: 'nav.aria.forDentalOffice'
    },
    {
      id: 'distributors',
      labelKey: 'nav.forDistributors',
      href: '/distributors',
      icon: Package,
      ariaLabelKey: 'nav.aria.forDistributors'
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
      : 'text-muted-foreground';
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 w-full z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-border shadow-lg"
      role="navigation"
      aria-label={t('nav.aria.mobileNavigation')}
      dir={isHebrew ? 'rtl' : 'ltr'}
      style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        transition: 'none',
        transform: 'none',
        animation: 'none'
      }}
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
                'flex flex-col items-center justify-center min-w-0 flex-1 px-1 py-1 rounded-md',
                'focus:outline-none focus:ring-2 focus:ring-cta-light-blue focus:ring-offset-1',
                getActiveClass(item.href)
              )}
              aria-label={t(item.ariaLabelKey)}
              aria-current={active ? 'page' : undefined}
            >
              {/* Icon or Logo */}
              <div className="flex items-center justify-center w-8 h-8 mb-0.5">
                {item.isLogo ? (
                  <img 
                    src={blueLogo} 
                    alt="White Angel"
                    className="h-8 w-auto object-contain"
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
                'text-[10px] font-medium leading-tight text-center max-w-full truncate',
                active ? 'font-semibold' : 'font-normal'
              )}>
                {t(item.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
