import React, { useEffect, useState } from 'react';
import { Navigation } from '@/components/ui/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Globe, Users, TrendingUp, Award, CheckCircle } from 'lucide-react';

const Distributions = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const benefits = [
    {
      icon: Globe,
      title: 'Global Brand Recognition',
      description: 'Partner with a trusted name in professional teeth whitening'
    },
    {
      icon: Users,
      title: 'Extensive Support',
      description: 'Comprehensive training and ongoing support for your team'
    },
    {
      icon: TrendingUp,
      title: 'Proven Profitability',
      description: 'High-margin products with strong market demand'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'FDA approved, CE certified products you can trust'
    }
  ];

  const requirements = [
    'Established dental distribution network',
    'Minimum annual volume commitment',
    'Professional sales and support team',
    'Commitment to brand standards',
    'Regional market coverage capability'
  ];

  return (
    <div className="min-h-screen">
      <Navigation isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-navy to-primary">
        <div className="container mx-auto px-4">
          <div className="text-center text-white animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Distribution Partnership
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Join the White Angel family and bring professional teeth whitening 
              excellence to dental professionals in your region.
            </p>
            <Button variant="hero" size="lg">
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">Why Partner with White Angel?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              White Angel offers distributors a complete solution for success in the 
              growing professional teeth whitening market.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start space-x-4 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-navy mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gradient-to-br from-background to-soft-aqua/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-6">Partner Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our distribution partners around the world are achieving remarkable success.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl font-bold text-primary mb-2">150%</div>
              <div className="text-muted-foreground mb-4">Average Revenue Growth</div>
              <p className="text-sm text-muted-foreground">First year partnership results</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl font-bold text-secondary mb-2">500+</div>
              <div className="text-muted-foreground mb-4">New Dental Accounts</div>
              <p className="text-sm text-muted-foreground">Per partner average annually</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl font-bold text-accent mb-2">95%</div>
              <div className="text-muted-foreground mb-4">Partner Satisfaction</div>
              <p className="text-sm text-muted-foreground">Would recommend White Angel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Requirements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-navy mb-6">Partnership Requirements</h2>
              <p className="text-xl text-muted-foreground">
                We seek established distribution partners who share our commitment to excellence.
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-navy mb-6">Ideal Partner Profile</h3>
                  <ul className="space-y-4">
                    {requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-navy mb-6">What We Provide</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Exclusive territorial rights</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Comprehensive product training</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Marketing and sales support</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Ongoing technical support</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">Competitive pricing structure</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-navy">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-6">Start Your Partnership Journey</h2>
              <p className="text-xl text-white/80">
                Ready to bring White Angel to your market? Let's discuss the opportunity.
              </p>
            </div>

            <form className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-white">Contact Name *</Label>
                  <Input 
                    id="name" 
                    required 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-white">Company Name *</Label>
                  <Input 
                    id="company" 
                    required 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="Company name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                <div>
                  <Label htmlFor="email" className="text-white">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    required 
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    placeholder="contact@company.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website" className="text-white">Website</Label>
                <Input 
                  id="website" 
                  type="url"
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="https://www.yourcompany.com (optional)"
                />
              </div>

              <div>
                <Label htmlFor="territory" className="text-white">Target Territory</Label>
                <Input 
                  id="territory" 
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="City, State/Province, Country"
                />
              </div>

              <div>
                <Label htmlFor="experience" className="text-white">Distribution Experience</Label>
                <Textarea 
                  id="experience" 
                  rows={4}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Tell us about your distribution experience, current product lines, and network..."
                />
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Submit Partnership Application
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Distributions;