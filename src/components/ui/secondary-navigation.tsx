import React, { useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface SecondaryNavigationProps {
  items: NavigationItem[];
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  className?: string;
}

export const SecondaryNavigation: React.FC<SecondaryNavigationProps> = ({
  items,
  activeSection,
  onSectionClick,
  className
}) => {
  const { isHebrew } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll active item into view when it changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeButton = scrollContainerRef.current.querySelector(
        `[data-section="${activeSection}"]`
      );
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeSection]);

  return (
    <div
      className={cn(
        // ✅ fixed navigation bar
        'fixed z-40 bg-white border-b border-border w-full',
        // מובייל: top-0 (כי אין header)
        // דסקטופ: top-20 (80px אחרי ההאדר הראשי)
        'top-0 lg:top-20',
        className
      )}
    >
      <div className="container mx-auto px-4 w-full max-w-full">
        <nav className="py-3">
          <div
            ref={scrollContainerRef}
            className={cn(
              'flex overflow-x-auto scrollbar-hide scroll-smooth touch-pan-x w-full max-w-full',
              isHebrew
                ? 'justify-end lg:justify-center'
                : 'justify-start lg:justify-center'
            )}
            dir={isHebrew ? 'rtl' : 'ltr'}
          >
            <div className="flex gap-2 bg-background/50 backdrop-blur-sm rounded-full p-2 border border-border/50 min-w-max">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    data-section={item.id}
                    onClick={() => onSectionClick(item.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-300',
                      'text-sm font-medium min-w-max',
                      'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                      'active:scale-95',
                      isActive
                        ? 'bg-cta-light-blue text-white shadow-md hover:bg-cta-light-blue-hover'
                        : 'text-muted-foreground hover:text-cta-light-blue hover:bg-cta-light-blue/10'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
