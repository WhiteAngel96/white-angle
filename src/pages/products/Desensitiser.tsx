import React, { useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { MobileBottomNav } from '@/components/ui/mobile-bottom-nav';
import { MobileLanguageSwitch } from '@/components/ui/mobile-language-switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Play, Shield, Clock, Target, ChevronLeft, ChevronRight, Zap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import beforeAfterImage from '@/assets/before-after.jpg';
import clinicInteriorImage from '@/assets/clinic-interior.jpg';

const Desensitiser = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = [clinicInteriorImage, beforeAfterImage, clinicInteriorImage];
  
  const stepByStepImages = [
    { step: 1, title: "Pre-Treatment Application", image: clinicInteriorImage },
    { step: 2, title: "During Whitening", image: clinicInteriorImage },
    { step: 3, title: "Post-Treatment Care", image: clinicInteriorImage },
    { step: 4, title: "Comfort Achieved", image: beforeAfterImage }
  ];

  const faqs = [
    {
      question: "How does the White Angel Desensitiser work?",
      answer: "Our advanced desensitiser formula contains potassium nitrate and fluoride compounds that block nerve pathways and strengthen enamel, providing immediate and long-lasting sensitivity relief."
    },
    {
      question: "When should the desensitiser be applied?",
      answer: "Apply before, during, and after whitening treatments for maximum protection. It can also be used as a standalone treatment for general sensitivity."
    },
    {
      question: "How quickly does it provide relief?",
      answer: "Most patients experience immediate relief upon application, with maximum comfort achieved within 5-10 minutes of treatment."
    },
    {
      question: "Is it safe for regular use?",
      answer: "Yes, the White Angel Desensitiser is formulated for safe, regular use and actually helps strengthen teeth with each application."
    },
    {
      question: "Can it be used with all whitening treatments?",
      answer: "Absolutely. Our desensitiser is compatible with all White Angel whitening systems and most other professional whitening treatments."
    }
  ];

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);

  return (
    <div className="min-h-screen bg-background">
      <Navigation isScrolled={isScrolled} />
      <MobileBottomNav />
      <MobileLanguageSwitch />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-navy to-primary">
        <div className="container mx-auto px-4">
          <div className="text-center text-white animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">White Angel Desensitiser</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Advanced comfort technology for pain-free whitening experiences
            </p>
            <Link to="/dental-office">
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                ← Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-navy mb-12 text-center">Product Gallery</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8">
              <img 
                src={productImages[currentImageIndex]} 
                alt="White Angel Desensitiser" 
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <div className="flex justify-center space-x-2">
              {productImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Grid */}
      <section className="py-20 bg-gradient-to-br from-background to-soft-aqua/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Target Use</h3>
              <p className="text-muted-foreground">Essential for all whitening treatments and sensitive teeth management</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Shield className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Protection Level</h3>
              <p className="text-muted-foreground">Up to 85% reduction in whitening-related sensitivity</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Fast Acting</h3>
              <p className="text-muted-foreground">Immediate relief within 5-10 minutes of application</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Patient Comfort</h3>
              <p className="text-muted-foreground">Ensures pleasant whitening experience for all patients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions & Contents */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Application Protocol</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Pre-Treatment Application</h4>
                    <p className="text-muted-foreground">Apply thin layer to all teeth 10-15 minutes before whitening</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">During Treatment</h4>
                    <p className="text-muted-foreground">Reapply between whitening cycles if needed for comfort</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Post-Treatment Care</h4>
                    <p className="text-muted-foreground">Final application for lasting comfort and protection</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Home Care Instructions</h4>
                    <p className="text-muted-foreground">Provide patient with take-home desensitising protocol</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Desensitiser Contents</h2>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Professional Desensitising Gel (6 x 3ml syringes)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Precision Application Tips</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Patient Take-Home Tubes (4 x 5ml)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Soft-bristle Application Brushes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Patient Education Materials</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Professional Application Guide</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Sensitivity Assessment Charts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Images */}
      <section className="py-20 bg-gradient-to-br from-background to-soft-aqua/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-navy mb-12 text-center">Application Protocol</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stepByStepImages.map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 shadow-lg text-center">
                <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-lg mb-4" />
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">
                  {item.step}
                </div>
                <h3 className="font-semibold text-navy">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Results & Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Clinical Benefits</h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-background to-soft-aqua/5 rounded-xl p-6">
                  <h4 className="font-semibold text-navy mb-2">Sensitivity Reduction</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 85% reduction in whitening-related sensitivity</li>
                    <li>• Immediate pain relief in 95% of patients</li>
                    <li>• Lasting protection for 24-48 hours</li>
                    <li>• Compatible with all whitening systems</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-background to-soft-aqua/5 rounded-xl p-6">
                  <h4 className="font-semibold text-navy mb-2">Tooth Strengthening</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Fluoride integration strengthens enamel</li>
                    <li>• Reduces future sensitivity episodes</li>
                    <li>• Supports overall oral health</li>
                    <li>• Safe for daily use when needed</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Patient Comfort</h2>
              <img src={beforeAfterImage} alt="Patient Comfort" className="w-full rounded-xl shadow-lg mb-4" />
              <p className="text-muted-foreground text-center">Enhanced patient comfort with White Angel Desensitiser</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-background to-soft-aqua/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-navy mb-12 text-center">Frequently Asked Questions</h2>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-xl shadow-lg border-none">
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold text-navy hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-6">Request Desensitiser Information</h2>
              <p className="text-xl text-white/80">
                Ensure patient comfort with advanced sensitivity protection
              </p>
            </div>

            <form className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="full-name" className="text-white">Full Name *</Label>
                  <Input 
                    id="full-name" 
                    required 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Dr. John Smith"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">Phone *</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    required 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="(555) 123-4567"
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
                  placeholder="doctor@practice.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="license" className="text-white">License Number</Label>
                  <Input 
                    id="license" 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <Label htmlFor="specialty" className="text-white">Specialty</Label>
                  <Input 
                    id="specialty" 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="General Dentistry, Cosmetic, etc."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-white">Message</Label>
                <Textarea 
                  id="message" 
                  rows={4}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Tell us about your practice and interest in our Desensitiser..."
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Request Information
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Desensitiser;