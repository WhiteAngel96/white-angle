import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { MobileBottomNav } from '@/components/ui/mobile-bottom-nav';
import { MobileLanguageSwitch } from '@/components/ui/mobile-language-switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
//assets
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/contexts/LanguageContext';
import clinicInteriorImage from '@/assets/clinic-interior.jpg';
import distributorBanner from '@/assets/distributor-banner.png';
import desiBlue from '@/assets/desi-blue.png';
import extra46Open from '@/assets/extra46-open.png';
import homeKitOpen15 from '@/assets/home-kit-open15.png';
import homeKitOpen20 from '@/assets/home-kit-open20.png';
import pro33Open from '@/assets/pro33-open.png';
import stripsOpen from '@/assets/strips-open.png';



const Distributors = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { t } = useTranslation();
  const { isHebrew } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('Full Name is required');
    } else if (!/^[A-Za-z\u0590-\u05FF\s'-]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = t('We only accept letters & "-"');
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = t('Phone is required');
    } else if (!/^(05\d{7,8}|\+\d{8,15})$/.test(formData.phone.trim())) {
      newErrors.phone = t('Phone number is not valid');
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t('Email structure is not valid');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Form submitted:', formData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFormData({ fullName: '', phone: '', email: '' });
      alert(t('distributors.form.successMessage'));
      
    } catch (error) {
      console.error('Form submission error:', error);
      alert(t('distributors.form.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      <Navigation isScrolled={isScrolled} />
      <MobileBottomNav />
      <MobileLanguageSwitch />
      
      <main className="w-full max-w-full overflow-x-hidden">
        {/* Hero Section with Banner */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={distributorBanner} 
              alt="Distributor Banner" 
              className="w-full h-full object-cover object-[20%_center] md:object-center"
              />

            <div className="absolute inset-0 bg-black/30"></div> {/* כהות קלה */}
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="animate-fade-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                Distribution Partnership
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6 drop-shadow-md">
                Join the White Angel family and bring professional teeth whitening 
                excellence to dental professionals in your region.
              </p>
            </div>
          </div>
        </section>

        {/* Lead Form Section */}
        <section className="py-8 bg-gradient-to-br from-background to-soft-aqua/5">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              
              {/* Title above form */}
              <div className="text-center mb-6">
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
                  {t('Talk With Us')}
                </p>
              </div>

              <Card className="p-8 bg-white shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6" dir={isHebrew ? 'rtl' : 'ltr'}>
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full ${errors.fullName ? 'border-red-500' : ''}`}
                      placeholder={t('Full Name')}
                      required
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number Field */}
                  <div className="space-y-2">
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder={t('Phone Number')}
                      required
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                      placeholder={t('Email Address')}
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-white text-navy font-semibold border-2 border-navy hover:bg-navy hover:text-white transition-colors py-3 text-lg overflow-hidden"
                    >
                      {isSubmitting 
                        ? t('distributors.form.submitting') 
                        : t('Submit')
                      }
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Additional Information */}
              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  {t('Prefer to contact us directly?')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-navy">
                  <a href="tel:+972-XX-XXX-XXXX" className="hover:text-cta-light-blue transition-colors">
                    📞 {t('Phone')}: +972-XX-XXX-XXXX
                  </a>
                  <a href="mailto:Yuval@whiteangel.com" className="hover:text-cta-light-blue transition-colors">
                    ✉️ Yuval@whiteangel.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Distributors;
