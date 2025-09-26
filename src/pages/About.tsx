import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { MobileBottomNav } from '@/components/ui/mobile-bottom-nav';
import { MobileLanguageSwitch } from '@/components/ui/mobile-language-switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Shield, Award, Users, Heart } from 'lucide-react';
import aboutus from '@/assets/about-us.png';


const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const certifications = [
    { name: 'FDA Approved', icon: Shield },
    { name: 'CE Certified', icon: Award },
    { name: 'ISO Standards', icon: Shield },
    { name: 'Israeli Standards Institute', icon: Award }
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Patients' },
    { number: '1,200+', label: 'Dental Partners' },
    { number: '15+', label: 'Years Experience' },
    { number: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="min-h-screen">
      <Navigation isScrolled={isScrolled} />
      <MobileBottomNav />
      <MobileLanguageSwitch />
      
      {/* Hero Section with Banner */}
<section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0 z-0">
      <img 
      src={aboutus} 
      alt="About White Angel" 
      className="
        w-full h-full object-cover 
        object-[70%_center]   /* ברירת מחדל למובייל - התמונה יותר ימינה */
        md:object-[70%_20%]   /* בדסקטופ - יורדת קצת למטה */
      "
    />
    <div className="absolute inset-0 bg-black/30"></div> {/* שכבת כהות לטקסט */}
  </div>

  {/* Content */}
  <div className="relative z-10 container mx-auto px-4 text-center text-white">
    <div className="animate-fade-up">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
        About White Angel
      </h1>
      <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6 drop-shadow-md">
        Leading the future of professional teeth whitening with innovative technology, 
        uncompromising quality, and exceptional results.
      </p>
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gradient-to-br from-background to-soft-aqua/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-navy mb-6">Our Certifications</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              White Angel products meet the highest international standards for safety, 
              quality, and effectiveness in professional dental care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
              >
                <cert.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-navy">{cert.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-xl text-white/80">
                Ready to bring White Angel to your practice? Contact us today.
              </p>
            </div>

            <form className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name *</Label>
                  <Input 
                    id="name" 
                    required 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">Phone *</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    required 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Your phone number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <Textarea 
                  id="message" 
                  rows={4}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Tell us about your practice and how we can help..."
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;