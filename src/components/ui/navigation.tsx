import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import israelFlag from '@/assets/israel-flag.png';
import usFlag from '@/assets/us-flag.png';

interface NavigationProps {
  isScrolled?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isScrolled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { toggleLanguage, isHebrew } = useLanguage();

  const navItems = [
    { 
      label: 'For Dental Office', 
      href: '/dental-office',
      dropdown: [
        { label: 'Take Home Products', href: '/dental-office#take-home' },
        { label: 'In-Office Products', href: '/dental-office#in-office' },
        { label: 'Other Products', href: '/dental-office#other' }
      ]
    },
    { 
      label: 'For Patients', 
      href: '/patients',
      dropdown: [
        { label: 'Clinic Whitening', href: '/patients#clinic' },
        { label: 'Home Kit', href: '/patients#home-kit' },
        { label: 'Desensitizer', href: '/patients#desensitizer' },
        { label: 'Strips', href: '/patients#strips' }
      ]
    },
    { label: 'About', href: '/about' },
    { label: 'Find White Angel Near You', href: '/find-location' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/src/assets/white-angel-logo.png" 
              alt="White Angel"
              className="h-12 md:h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div 
                key={item.label} 
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center space-x-1 font-medium transition-colors hover:text-primary ${
                    isScrolled ? 'text-primary' : 'text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.dropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg py-2 animate-fade-in">
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        to={dropdownItem.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 ${
                isScrolled ? 'hover:bg-primary/10' : 'hover:bg-white/10'
              }`}
              aria-label={`Switch to ${isHebrew ? 'English' : 'Hebrew'}`}
            >
              <img 
                src={isHebrew ? usFlag : israelFlag}
                alt={isHebrew ? 'Switch to English' : 'Switch to Hebrew'}
                className="w-6 h-4 object-cover rounded-sm"
              />
              <span className={`text-xs font-medium ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}>
                {isHebrew ? 'EN' : 'עב'}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md hover:bg-background/10 transition-colors"
              aria-label={`Switch to ${isHebrew ? 'English' : 'Hebrew'}`}
            >
              <img 
                src={isHebrew ? usFlag : israelFlag}
                alt={isHebrew ? 'Switch to English' : 'Switch to Hebrew'}
                className="w-6 h-4 object-cover rounded-sm"
              />
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-background/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border animate-fade-in">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <div className="pl-4 space-y-1">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.href}
                          className="block px-4 py-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};