import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Camera, Video, Edit, MapPin, Calendar, User, Mail, Phone, ArrowRight, CheckCircle } from 'lucide-react';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';

const GetStarted = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    serviceType: preselectedService || '',
    preferredDate: '',
    budget: '',
    description: '',
    urgency: 'flexible'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const services = [
    {
      id: 'photography',
      title: 'Photography',
      icon: Camera,
      description: 'Professional photography services',
      subcategories: ['Wedding', 'Portrait', 'Event', 'Commercial', 'Fashion', 'Product']
    },
    {
      id: 'videography',
      title: 'Videography',
      icon: Video,
      description: 'Expert videography and filming',
      subcategories: ['Wedding Films', 'Corporate Videos', 'Music Videos', 'Documentaries', 'Commercials']
    },
    {
      id: 'editing',
      title: 'Photo & Video Editing',
      icon: Edit,
      description: 'Professional editing and post-production',
      subcategories: ['Photo Retouching', 'Color Grading', 'Video Editing', 'Motion Graphics', 'VFX']
    }
  ];

  const budgetRanges = [
    { value: 'under-10k', label: 'Under ₹10,000' },
    { value: '10k-25k', label: '₹10,000 - ₹25,000' },
    { value: '25k-50k', label: '₹25,000 - ₹50,000' },
    { value: '50k-100k', label: '₹50,000 - ₹1,00,000' },
    { value: 'above-100k', label: 'Above ₹1,00,000' },
    { value: 'discuss', label: 'Let\'s discuss' }
  ];

  const urgencyOptions = [
    { value: 'urgent', label: 'Urgent (Within 1 week)', color: 'bg-red-100 text-red-700' },
    { value: 'soon', label: 'Soon (Within 1 month)', color: 'bg-orange-100 text-orange-700' },
    { value: 'flexible', label: 'Flexible (1-3 months)', color: 'bg-green-100 text-green-700' },
    { value: 'planning', label: 'Just planning (3+ months)', color: 'bg-blue-100 text-blue-700' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert into user_requirements table
      const { error } = await supabase
        .from('user_requirements')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          service_type: formData.serviceType,
          preferred_date: formData.preferredDate || null,
          budget: formData.budget,
          description: formData.description,
          urgency: formData.urgency
        });

      if (error) {
        console.error('Error submitting requirements:', error);
        toast.error('Failed to submit your requirements. Please try again.');
        return;
      }

      toast.success('Requirements submitted successfully!');
      navigate('/confirmation', { 
        state: { 
          formData,
          submissionId: Date.now() // Simple ID for demo
        }
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.serviceType;
      case 2:
        return formData.name && formData.email && formData.phone;
      case 3:
        return formData.location && formData.budget;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 4 && isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What service do you need?
              </h2>
              <p className="text-lg text-gray-600">
                Select the type of creative service you're looking for
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => handleInputChange('serviceType', service.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:scale-105 ${
                      formData.serviceType === service.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <IconComponent className={`w-12 h-12 mb-4 ${
                      formData.serviceType === service.id ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.subcategories.slice(0, 3).map((sub, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tell us about yourself
              </h2>
              <p className="text-lg text-gray-600">
                We'll use this information to connect you with the right professionals
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-2" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Project details
              </h2>
              <p className="text-lg text-gray-600">
                Help us understand your requirements better
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, State (e.g., Mumbai, Maharashtra)"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Budget Range *
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {budgetRanges.map((range) => (
                    <button
                      key={range.value}
                      type="button"
                      onClick={() => handleInputChange('budget', range.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                        formData.budget === range.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Timeline
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {urgencyOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleInputChange('urgency', option.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                        formData.urgency === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${option.color}`}>
                        {option.value.toUpperCase()}
                      </span>
                      <div className="text-sm font-medium text-gray-900">
                        {option.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Additional details
              </h2>
              <p className="text-lg text-gray-600">
                Tell us more about your project (optional)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your project, style preferences, specific requirements, or any other details that would help us find the perfect professional for you..."
              />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Service:</strong> {services.find(s => s.id === formData.serviceType)?.title}</div>
                <div><strong>Name:</strong> {formData.name}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Phone:</strong> {formData.phone}</div>
                <div><strong>Location:</strong> {formData.location}</div>
                <div><strong>Budget:</strong> {budgetRanges.find(b => b.value === formData.budget)?.label}</div>
                <div><strong>Timeline:</strong> {urgencyOptions.find(u => u.value === formData.urgency)?.label}</div>
                {formData.preferredDate && <div><strong>Preferred Date:</strong> {formData.preferredDate}</div>}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Get Started</h1>
              <span className="text-sm text-gray-600">Step {currentStep} of 4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            {renderStep()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  Next
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Requirements
                      <CheckCircle className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default GetStarted;