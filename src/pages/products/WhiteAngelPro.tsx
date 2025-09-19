import React, { useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Play, Users, Clock, Target, ChevronLeft, ChevronRight, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import beforeAfterImage from '@/assets/before-after.jpg';
import clinicInteriorImage from '@/assets/clinic-interior.jpg';

const WhiteAngelPro = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const productImages = [clinicInteriorImage, beforeAfterImage, clinicInteriorImage];
  
  const stepByStepImages = [
    { step: 1, title: "Assessment & Preparation", image: clinicInteriorImage },
    { step: 2, title: "Pro Gel Application", image: clinicInteriorImage },
    { step: 3, title: "Professional Monitoring", image: clinicInteriorImage },
    { step: 4, title: "Final Results", image: beforeAfterImage }
  ];

  const faqs = [
    {
      question: "What makes White Angel Pro different from other formulations?",
      answer: "White Angel Pro features an advanced hydrogen peroxide formula with enhanced penetration technology, delivering superior results with reduced treatment time and minimized sensitivity."
    },
    {
      question: "How long does the Pro treatment take?",
      answer: "The White Angel Pro treatment typically takes 45-60 minutes with immediate visible results in a single professional session."
    },
    {
      question: "What results can patients expect?",
      answer: "Patients typically achieve 8-14 shades whiter with White Angel Pro, making it our most effective professional whitening solution."
    },
    {
      question: "Is White Angel Pro suitable for sensitive teeth?",
      answer: "Yes, the Pro formula includes advanced desensitizing agents that significantly reduce sensitivity during and after treatment."
    },
    {
      question: "How long do White Angel Pro results last?",
      answer: "Results typically last 18-36 months with proper maintenance and avoiding staining substances."
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
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-navy to-primary">
        <div className="container mx-auto px-4">
          <div className="text-center text-white animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">White Angel Pro</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Professional-grade whitening system with advanced technology for exceptional results
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
                alt="White Angel Pro" 
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
              <h3 className="text-xl font-bold text-navy mb-2">Target Audience</h3>
              <p className="text-muted-foreground">Patients seeking the most advanced professional whitening technology</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Zap className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Enhanced Technology</h3>
              <p className="text-muted-foreground">Advanced penetration formula with accelerated whitening action</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Treatment Time</h3>
              <p className="text-muted-foreground">45-60 minutes for complete professional whitening</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy mb-2">Reduced Sensitivity</h3>
              <p className="text-muted-foreground">Integrated desensitizing technology for maximum comfort</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions & Contents */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Professional Protocol</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-semibold mb-1">Comprehensive Assessment</h4>
                    <p className="text-muted-foreground">Evaluate patient suitability and record baseline measurements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-semibold mb-1">Advanced Preparation</h4>
                    <p className="text-muted-foreground">Apply protective barriers and prepare whitening system</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-semibold mb-1">Pro Gel Application</h4>
                    <p className="text-muted-foreground">Apply advanced Pro formula with precision technique</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                  <div>
                    <h4 className="font-semibold mb-1">Professional Monitoring</h4>
                    <p className="text-muted-foreground">Monitor progress and adjust treatment as needed</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
                  <div>
                    <h4 className="font-semibold mb-1">Completion & Care</h4>
                    <p className="text-muted-foreground">Final assessment and post-treatment care instructions</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Pro System Contents</h2>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Advanced Pro Whitening Gel (6 x 3ml syringes)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Professional Gingival Protection System</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Integrated Desensitizing Formula</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Premium LED Activation System</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Professional Grade Protective Equipment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Advanced Application Tools</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Comprehensive Professional Shade Guide</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Advanced Protocol Training Materials</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Images */}
      <section className="py-20 bg-gradient-to-br from-background to-soft-aqua/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-navy mb-12 text-center">Professional Protocol</h2>
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

      {/* Clinical Results & Before/After */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Superior Clinical Results</h2>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-background to-soft-aqua/5 rounded-xl p-6">
                  <h4 className="font-semibold text-navy mb-2">Advanced Performance Data</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 100% of patients achieved 8+ shades whiter</li>
                    <li>• Average improvement: 11.2 shades (VITA scale)</li>
                    <li>• 99% patient satisfaction rate</li>
                    <li>• Superior long-lasting results (18-36 months)</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-background to-soft-aqua/5 rounded-xl p-6">
                  <h4 className="font-semibold text-navy mb-2">Enhanced Safety Profile</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Advanced formula with integrated protection</li>
                    <li>• 85% reduction in post-treatment sensitivity</li>
                    <li>• Clinically proven enamel safety</li>
                    <li>• Suitable for most adult patients</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-navy mb-6">Exceptional Results</h2>
              <img src={beforeAfterImage} alt="Before and After Results" className="w-full rounded-xl shadow-lg mb-4" />
              <p className="text-muted-foreground text-center">Professional results with White Angel Pro advanced technology</p>
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
              <h2 className="text-4xl font-bold text-white mb-6">Request White Angel Pro</h2>
              <p className="text-xl text-white/80">
                Experience the most advanced professional whitening technology
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
                  placeholder="Tell us about your practice and interest in White Angel Pro..."
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

export default WhiteAngelPro;