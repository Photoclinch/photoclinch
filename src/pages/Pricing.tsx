import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { Check, Star, Camera, Users, Zap, Crown, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const clientPlans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for occasional photography needs',
      icon: Camera,
      features: [
        'Browse photographer profiles',
        'View portfolios and reviews',
        'Basic search and filters',
        'Direct messaging',
        'Standard support'
      ],
      limitations: [
        'Limited to 3 inquiries per month',
        'No priority support'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Premium',
      price: isAnnual ? 999 : 99,
      description: 'For clients who need photography services regularly',
      icon: Star,
      features: [
        'Everything in Free',
        'Unlimited inquiries',
        'Advanced search filters',
        'Priority customer support',
        'Booking protection',
        'Exclusive photographer access',
        'Project management tools'
      ],
      cta: 'Start Premium',
      popular: true
    }
  ];

  const photographerPlans = [
    {
      name: 'Starter',
      price: isAnnual ? 2999 : 299,
      description: 'Perfect for new photographers building their business',
      icon: Camera,
      features: [
        'Professional profile',
        'Portfolio showcase',
        'Basic lead notifications',
        'Client messaging',
        'Payment processing',
        'Basic analytics'
      ],
      limitations: [
        'Up to 10 leads per month',
        'Standard listing priority'
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      price: isAnnual ? 5999 : 599,
      description: 'For established photographers growing their client base',
      icon: Users,
      features: [
        'Everything in Starter',
        'Unlimited leads',
        'Priority listing',
        'Advanced CRM tools',
        'Detailed analytics',
        'Marketing tools',
        'Priority support'
      ],
      cta: 'Go Professional',
      popular: true
    },
    {
      name: 'Enterprise',
      price: isAnnual ? 11999 : 1199,
      description: 'For photography studios and agencies',
      icon: Crown,
      features: [
        'Everything in Professional',
        'Team management',
        'White-label solutions',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'Custom contracts'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const payPerLead = {
    name: 'Pay Per Lead',
    description: 'Only pay when you get qualified leads',
    pricing: [
      { category: 'Wedding Photography', price: '₹500-800' },
      { category: 'Portrait Photography', price: '₹300-500' },
      { category: 'Event Photography', price: '₹400-600' },
      { category: 'Commercial Photography', price: '₹600-1000' }
    ],
    features: [
      'No monthly fees',
      'Pay only for qualified leads',
      'Full lead details',
      'Lead quality guarantee',
      'Refund for invalid leads'
    ]
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-sky-500 to-sky-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-sky-100 mb-8 animate-fade-in-delay">
            Choose the perfect plan for your photography needs. No hidden fees, cancel anytime.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-8 animate-slide-up">
            <span className={`mr-3 ${!isAnnual ? 'text-white' : 'text-sky-200'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isAnnual ? 'bg-white' : 'bg-sky-400'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-sky-500 transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-3 ${isAnnual ? 'text-white' : 'text-sky-200'}`}>
              Annual
              <span className="ml-1 text-xs bg-green-400 text-green-900 px-2 py-1 rounded-full">
                Save 20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Client Pricing */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Clients</h2>
            <p className="text-lg text-gray-600">Find and book the perfect photographer for your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {clientPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                    plan.popular ? 'ring-2 ring-sky-500' : ''
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-sky-500 text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                    <div className="flex items-center mb-4">
                      <IconComponent className="h-8 w-8 text-sky-500 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ₹{plan.price.toLocaleString()}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-600">/{isAnnual ? 'year' : 'month'}</span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-3">
                      <Link
                        to={plan.name === 'Free' ? '/post-project' : '/signup'}
                        className={`block w-full text-center py-3 px-6 rounded-md font-medium transition-colors ${
                          plan.popular
                            ? 'bg-sky-500 hover:bg-sky-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photographer Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">For Photographers</h2>
            <p className="text-lg text-gray-600">Grow your photography business with our platform</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {photographerPlans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 animate-fade-in-up ${
                    plan.popular ? 'ring-2 ring-sky-500' : ''
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-sky-500 text-white text-center py-2 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                    <div className="flex items-center mb-4">
                      <IconComponent className="h-8 w-8 text-sky-500 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    </div>
                    
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ₹{plan.price.toLocaleString()}
                      </span>
                      <span className="text-gray-600">/{isAnnual ? 'year' : 'month'}</span>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="h-5 w-5 text-green-500 mr-3" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col gap-3">
                      <Link
                        to="/join-photographer"
                        className={`block w-full text-center py-3 px-6 rounded-md font-medium bg-sky-500 hover:bg-sky-600 text-white transition-all duration-300`}
                      >
                        {plan.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pay Per Lead Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg text-white p-8 animate-fade-in">
            <div className="text-center mb-8">
              <Zap className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-4">{payPerLead.name}</h3>
              <p className="text-xl text-green-100">{payPerLead.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Pricing by Category</h4>
                <div className="space-y-3">
                  {payPerLead.pricing.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-green-600 rounded-lg p-3">
                      <span>{item.category}</span>
                      <span className="font-semibold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4">What's Included</h4>
                <ul className="space-y-3">
                  {payPerLead.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link
                to="/join-photographer"
                className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-md font-medium transition-colors inline-block"
              >
                Start with Pay Per Lead
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan anytime?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
              },
              {
                question: "Is there a free trial for photographers?",
                answer: "Yes, we offer a 14-day free trial for all photographer plans. No credit card required to start."
              },
              {
                question: "How does the pay-per-lead model work?",
                answer: "You only pay when you receive a qualified lead that matches your criteria. We guarantee lead quality and offer refunds for invalid leads."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, UPI, and net banking. All payments are processed securely."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sky-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-sky-100 mb-8">
            Join thousands of photographers and clients already using PhotoClinch
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join-photographer"
              className="bg-white text-sky-600 hover:bg-sky-50 px-8 py-3 rounded-md font-medium transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              to="/post-project"
              className="border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-3 rounded-md font-medium transition-colors"
            >
              Post a Project
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Pricing;