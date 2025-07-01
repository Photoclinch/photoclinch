import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Calendar, MapPin, DollarSign, FileText, User, Mail, Phone, CheckCircle } from 'lucide-react';
import { supabase } from '../utils/supabase';
import { sendToGoogleSheets, formatFormDataForSheets } from '../utils/googleSheets';
import toast from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';

const PostProject = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Project Details
    projectTitle: '',
    serviceType: '',
    projectDescription: '',
    location: '',
    eventDate: '',
    budget: '',
    urgency: 'flexible',
    
    // Contact Information
    name: '',
    email: '',
    phone: '',
    company: '',
    
    // Additional Requirements
    specificRequirements: '',
    portfolioPreferences: '',
    experienceLevel: ''
  });

  const serviceTypes = [
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
    'Architecture Photography'
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
    { value: 'urgent', label: 'Urgent (Within 1 week)' },
    { value: 'soon', label: 'Soon (Within 1 month)' },
    { value: 'flexible', label: 'Flexible (1-3 months)' },
    { value: 'planning', label: 'Just planning (3+ months)' }
  ];

  const experienceLevels = [
    'Beginner (1-2 years)',
    'Intermediate (3-5 years)',
    'Experienced (5-10 years)',
    'Expert (10+ years)',
    'No preference'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { error } = await supabase
        .from('user_requirements')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          service_type: formData.serviceType.toLowerCase().replace(/\s+/g, '_'),
          preferred_date: formData.eventDate || null,
          budget: formData.budget,
          description: `
Project: ${formData.projectTitle}
Service: ${formData.serviceType}
Description: ${formData.projectDescription}
Company: ${formData.company || 'N/A'}
Experience Level: ${formData.experienceLevel}
Specific Requirements: ${formData.specificRequirements || 'None'}
Portfolio Preferences: ${formData.portfolioPreferences || 'None'}
          `.trim(),
          urgency: formData.urgency
        });

      // Also send to Google Sheets (async, don't block on failure)
      try {
        await sendToGoogleSheets(formatFormDataForSheets(formData));
        console.log('Data also sent to Google Sheets');
      } catch (sheetsError) {
        console.warn('Failed to send to Google Sheets:', sheetsError);
        // Don't show error to user, just log it
      }

      if (error) {
        console.error('Error submitting project:', error);
        toast.error('Failed to submit your project. Please try again.');
        return;
      }

      toast.success('Project posted successfully! We will connect you with photographers within 24 hours.');
      navigate('/confirmation', { 
        state: { 
          formData,
          submissionId: Date.now(),
          type: 'project'
        }
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.projectTitle && formData.serviceType && formData.location;
      case 2:
        return formData.name && formData.email && formData.phone;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Tell us about your project
              </h2>
              <p className="text-lg text-gray-600">
                Provide details about your photography requirements
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-2" />
                Project Title *
              </label>
              <input
                type="text"
                value={formData.projectTitle}
                onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                placeholder="e.g., Wedding Photography for Destination Wedding"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Camera className="inline w-4 h-4 mr-2" />
                Service Type *
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => handleInputChange('serviceType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              >
                <option value="">Select service type</option>
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Description
              </label>
              <textarea
                value={formData.projectDescription}
                onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                placeholder="Describe your project, style preferences, and any specific requirements..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-2" />
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Event Date
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="inline w-4 h-4 mr-2" />
                  Budget Range
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Timeline
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) => handleInputChange('urgency', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {urgencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your contact information
              </h2>
              <p className="text-lg text-gray-600">
                How can photographers reach you?
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Optional"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
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
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Additional preferences
              </h2>
              <p className="text-lg text-gray-600">
                Help us find the perfect photographer for you
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Photographer Experience Level
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Select experience level</option>
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Specific Requirements
              </label>
              <textarea
                value={formData.specificRequirements}
                onChange={(e) => handleInputChange('specificRequirements', e.target.value)}
                placeholder="Any specific equipment, style, or technical requirements..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Portfolio Preferences
              </label>
              <textarea
                value={formData.portfolioPreferences}
                onChange={(e) => handleInputChange('portfolioPreferences', e.target.value)}
                placeholder="Describe the style or type of work you'd like to see in their portfolio..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            {/* Summary */}
            <div className="bg-sky-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Summary</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Project:</strong> {formData.projectTitle}</div>
                <div><strong>Service:</strong> {formData.serviceType}</div>
                <div><strong>Location:</strong> {formData.location}</div>
                <div><strong>Contact:</strong> {formData.name} ({formData.email})</div>
                {formData.eventDate && <div><strong>Date:</strong> {formData.eventDate}</div>}
                {formData.budget && <div><strong>Budget:</strong> {budgetRanges.find(b => b.value === formData.budget)?.label}</div>}
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Your Photography Project</h1>
            <p className="text-xl text-gray-600">Get matched with professional photographers in 24 hours</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Step {currentStep} of 3</span>
              <span className="text-sm text-gray-600">{Math.round((currentStep / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
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

              {currentStep < 3 ? (
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
                      Posting Project...
                    </>
                  ) : (
                    <>
                      Post Project
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

export default PostProject;