import { Camera, Search, FileCheck, Users, Bell, TrendingUp } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const clientSteps = [
    {
      step: 1,
      title: 'Browse Verified Photographers',
      icon: Search,
      description: 'Filter by style, city, and budget to find photographers that match your specific needs. View their portfolios, reviews, and pricing before making a decision.'
    },
    {
      step: 2,
      title: 'Post Your Requirement',
      icon: FileCheck,
      description: 'Takes 30 seconds to fill out our simple form with details about your event, preferences, and budget. Our AI will match you with the perfect photographers.'
    },
    {
      step: 3,
      title: 'Get Matched Instantly',
      icon: Users,
      description: 'Chat with matched photographers, compare quotes, and book your favorite with secure payments. Once confirmed, you can relax knowing everything is arranged.'
    }
  ];

  const photographerSteps = [
    {
      step: 1,
      title: 'Create Your Profile',
      icon: Camera,
      description: 'Upload your best work, set your availability, pricing, and service areas. Our onboarding process helps you showcase your unique style and specialties to attract ideal clients.'
    },
    {
      step: 2,
      title: 'Get Notified of New Leads',
      icon: Bell,
      description: 'Receive instant notifications when clients matching your criteria are looking for photographers. Respond quickly to increase your chances of getting booked.'
    },
    {
      step: 3,
      title: 'Grow with Less Marketing',
      icon: TrendingUp,
      description: 'Pay only when you get work. Our platform handles client acquisition so you can focus on what you do best – creating amazing photography for your clients.'
    }
  ];

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-sky-400 to-sky-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">How PhotoClinch Works</h1>
          <p className="mt-4 text-xl text-center max-w-3xl mx-auto">
            A simple 3-step process designed for both clients and photographers
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row space-y-12 md:space-y-0 md:space-x-12">
          <div className="md:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="inline-block px-4 py-2 bg-sky-500 text-white rounded-full mb-6">
                For Clients
              </div>
              
              <div className="space-y-16">
                {clientSteps.map((step, index) => (
                  <div key={index} className="relative">
                    {index < clientSteps.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-sky-100 h-16"></div>
                    )}
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 text-sky-500 text-xl font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="ml-6">
                        <div className="flex items-center">
                          <step.icon className="h-6 w-6 text-sky-500 mr-2" />
                          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="mt-2 text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Link 
                  to="/explore"
                  className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
                >
                  Find a Photographer
                </Link>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="inline-block px-4 py-2 bg-gray-700 text-white rounded-full mb-6">
                For Photographers
              </div>
              
              <div className="space-y-16">
                {photographerSteps.map((step, index) => (
                  <div key={index} className="relative">
                    {index < photographerSteps.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-sky-100 h-16"></div>
                    )}
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 text-sky-500 text-xl font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="ml-6">
                        <div className="flex items-center">
                          <step.icon className="h-6 w-6 text-sky-500 mr-2" />
                          <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                        </div>
                        <p className="mt-2 text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Link 
                  to="/auth/signup"
                  className="inline-block bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200"
                >
                  Join as a Photographer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-sky-500 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
              <p className="text-xl mb-8">Join thousands of photographers and clients on PhotoClinch</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Link 
                  to="/explore"
                  className="inline-block bg-white text-sky-600 hover:bg-sky-50 px-8 py-3 rounded-md font-medium transition-colors duration-200"
                >
                  Book a Photographer
                </Link>
                <Link 
                  to="/auth/signup"
                  className="inline-block bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-medium transition-colors duration-200"
                >
                  Join as a Photographer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default HowItWorks;