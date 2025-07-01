import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, Mail, Phone, MapPin, Camera, Clock } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';

const Confirmation = () => {
  const location = useLocation();
  const { formData, submissionId } = location.state || {};

  if (!formData) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No submission found</h1>
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              Go back to home
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Request Submitted Successfully!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Thank you for choosing PhotoClinch. We've received your requirements and our team 
              will connect you with the perfect photographers within 24 hours.
            </p>
          </div>

          {/* Submission Details */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="bg-blue-600 text-white p-6">
              <h2 className="text-2xl font-bold mb-2">Your Request Details</h2>
              <p className="text-blue-100">Submission ID: #{submissionId || Date.now()}</p>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-semibold text-gray-900">{formData.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-semibold text-gray-900">{formData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold text-gray-900">{formData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900">{formData.location}</p>
                    </div>
                  </div>
                </div>

                {/* Project Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <Camera className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Photography Type</p>
                      <p className="font-semibold text-gray-900">{formData.photographyType}</p>
                    </div>
                  </div>

                  {formData.eventDate && (
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <Calendar className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Event Date</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(formData.eventDate).toLocaleDateString('en-IN', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What happens next?</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Review & Match</h3>
                  <p className="text-gray-600">Our team will review your requirements and match you with the most suitable photographers in your area.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Photographer Contact</h3>
                  <p className="text-gray-600">Within 24 hours, you'll receive contact from 3-5 verified photographers with their portfolios and quotes.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Choose & Book</h3>
                  <p className="text-gray-600">Compare profiles, chat with photographers, and book the one that best fits your vision and budget.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Submit Another Request
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                to="/explore"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Browse Photographers
              </Link>
            </div>

            <p className="text-sm text-gray-600 mt-6">
              Questions? Contact us at{' '}
              <a href="mailto:support@photoclinch.com" className="text-blue-600 hover:text-blue-700">
                support@photoclinch.com
              </a>{' '}
              or call{' '}
              <a href="tel:+919876543210" className="text-blue-600 hover:text-blue-700">
                +91 98765 43210
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Confirmation;