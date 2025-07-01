import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, User, Mail, Phone, MapPin, Star, FileText, Upload, CheckCircle, Award } from 'lucide-react';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';
import { sendPhotographerApplication } from '../utils/googleSheets'; // Add this line

const JoinPhotographer = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    
    // Professional Information
    businessName: '',
    experience: '',
    specialties: [],
    equipment: '',
    
    // Portfolio & Pricing
    portfolioUrl: '',
    instagramHandle: '',
    websiteUrl: '',
    startingPrice: '',
    
    // Additional Information
    bio: '',
    services: [],
    availability: '',
    travelDistance: ''
  });

  const experienceOptions = [
    'Less than 1 year',
    '1-2 years',
    '3-5 years',
    '5-10 years',
    '10+ years'
  ];

  const specialtyOptions = [
    'Wedding Photography',
    'Pre-Wedding Shoots',
    'Family Portraits',
    'Corporate Events',
    'Product Photography',
    'Fashion Photography',
    'Event Photography',
    'Baby Photography',
    'Maternity Shoots',
    'Festival Photography',
    'Traditional Ceremonies',
    'Architecture Photography',
    'Food Photography',
    'Travel Photography'
  ];

  const serviceOptions = [
    'Photography Only',
    'Photography + Basic Editing',
    'Photography + Advanced Editing',
    'Photography + Videography',
    'Photography + Drone Services',
    'Photography + Same Day Delivery',
    'Photography + Album Design',
    'Photography + Prints'
  ];

  const priceRanges = [
    'Under ₹5,000',
    '₹5,000 - ₹10,000',
    '₹10,000 - ₹25,000',
    '₹25,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    'Above ₹1,00,000'
  ];

  // Navigation functions
  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Validation function
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone && formData.location;
      case 2:
        return formData.experience && formData.specialties.length > 0;
      case 3:
        return formData.startingPrice;
      case 4:
        return true; // Step 4 has no required fields
      default:
        return false;
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // First, send to Google Sheets
      try {
        await sendPhotographerApplication(formData);
        console.log('Data sent to Google Sheets successfully');
      } catch (sheetsError) {
        console.error('Failed to send to Google Sheets:', sheetsError);
        // Continue with Supabase even if Google Sheets fails
      }
  
      // Store photographer application in user_requirements table with special type
      const { error } = await supabase
        .from('user_requirements')
        .insert({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          service_type: 'photographer_application',
          preferred_date: null,
          budget: formData.startingPrice,
          description: `
  PHOTOGRAPHER APPLICATION
  
  Personal Information:
  - Name: ${formData.firstName} ${formData.lastName}
  - Business: ${formData.businessName || 'Individual'}
  - Experience: ${formData.experience}
  - Location: ${formData.location}
  
  Specialties: ${formData.specialties.join(', ')}
  Services: ${formData.services.join(', ')}
  
  Portfolio & Links:
  - Portfolio: ${formData.portfolioUrl || 'Not provided'}
  - Instagram: ${formData.instagramHandle || 'Not provided'}
  - Website: ${formData.websiteUrl || 'Not provided'}
  
  Bio: ${formData.bio || 'Not provided'}
  Equipment: ${formData.equipment || 'Not provided'}
  Travel Distance: ${formData.travelDistance || 'Not specified'}
  Availability: ${formData.availability || 'Not specified'}
          `.trim(),
          urgency: 'flexible'
        });
  
      if (error) {
        console.error('Error submitting photographer application:', error);
        toast.error('Failed to submit your application. Please try again.');
        return;
      }
  
      toast.success('Application submitted successfully! We will review and contact you within 48 hours.');
      navigate('/confirmation', { 
        state: { 
          formData,
          submissionId: Date.now(),
          type: 'photographer'
        }
      });
  
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Personal Information
              </h2>
              <p className="text-lg text-gray-600">
                Tell us about yourself
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-2" />
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Location (City, State) *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Mumbai, Maharashtra"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="Optional - if you have a business"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Professional Experience
              </h2>
              <p className="text-lg text-gray-600">
                Tell us about your photography background
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Award className="inline w-4 h-4 mr-2" />
                Years of Experience *
              </label>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              >
                <option value="">Select your experience level</option>
                {experienceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <Camera className="inline w-4 h-4 mr-2" />
                Photography Specialties * (Select all that apply)
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                {specialtyOptions.map((specialty) => (
                  <label key={specialty} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.specialties.includes(specialty)}
                      onChange={(e) => handleArrayChange('specialties', specialty, e.target.checked)}
                      className="mr-3 w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
                    />
                    <span className="text-sm text-gray-700">{specialty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Equipment & Gear
              </label>
              <textarea
                value={formData.equipment}
                onChange={(e) => handleInputChange('equipment', e.target.value)}
                placeholder="List your cameras, lenses, lighting equipment, etc."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Portfolio & Pricing
              </h2>
              <p className="text-lg text-gray-600">
                Showcase your work and set your rates
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Upload className="inline w-4 h-4 mr-2" />
                  Portfolio URL
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
                  placeholder="https://your-portfolio.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={formData.instagramHandle}
                  onChange={(e) => handleInputChange('instagramHandle', e.target.value)}
                  placeholder="@your_instagram"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                placeholder="https://your-website.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Starting Price Range *
              </label>
              <select
                value={formData.startingPrice}
                onChange={(e) => handleInputChange('startingPrice', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              >
                <option value="">Select your starting price range</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Services Offered (Select all that apply)
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {serviceOptions.map((service) => (
                  <label key={service} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={(e) => handleArrayChange('services', service, e.target.checked)}
                      className="mr-3 w-4 h-4 text-sky-500 rounded focus:ring-sky-500"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Additional Information
              </h2>
              <p className="text-lg text-gray-600">
                Help clients understand what makes you unique
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-2" />
                Professional Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                placeholder="Tell clients about your photography style, approach, and what makes you unique..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Travel Distance
                </label>
                <select
                  value={formData.travelDistance}
                  onChange={(e) => handleInputChange('travelDistance', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select travel distance</option>
                  <option value="local">Local area only</option>
                  <option value="50km">Within 50km</option>
                  <option value="100km">Within 100km</option>
                  <option value="state">Anywhere in state</option>
                  <option value="national">Anywhere in India</option>
                  <option value="international">International travel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select availability</option>
                  <option value="weekends">Weekends only</option>
                  <option value="weekdays">Weekdays only</option>
                  <option value="flexible">Flexible schedule</option>
                  <option value="full-time">Full-time availability</option>
                </select>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-sky-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Summary</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>Location:</strong> {formData.location}</div>
                <div><strong>Experience:</strong> {formData.experience}</div>
                <div><strong>Specialties:</strong> {formData.specialties.join(', ')}</div>
                <div><strong>Starting Price:</strong> {formData.startingPrice}</div>
                <div><strong>Contact:</strong> {formData.email}</div>
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
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Join PhotoClinch as a Photographer</h1>
            <p className="text-xl text-gray-600">Connect with clients and grow your photography business</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Step {currentStep} of 4</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
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
                  className="px-6 py-3 bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  Next
                  <CheckCircle className="ml-2 w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-sky-500 text-white rounded-xl font-medium hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      Submit Application
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

export default JoinPhotographer;