import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Camera, Star, Users, ArrowRight, CheckCircle, Heart } from 'lucide-react';
import { sendToGoogleSheets, formatFormDataForSheets } from '../utils/googleSheets';
import toast from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';

const NewHome = () => {
  const { user: authUser } = useAuth();
  const [formData, setFormData] = useState({
    photographyType: '',
    eventDate: '',
    location: '',
    name: '',
    phone: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Only send to Google Sheets
      const sheetsData = formatFormDataForSheets({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        serviceType: 'photography',
        projectTitle: formData.photographyType,
        projectDescription: `Photography Type: ${formData.photographyType}`,
        budget: 'discuss',
        urgency: 'flexible',
        eventDate: formData.eventDate || ''
      });

      const sheetsResult = await sendToGoogleSheets(sheetsData);
      
      if (sheetsResult.success) {
        toast.success('✅ Requirements submitted successfully! We will contact you within 24 hours. Your details have been saved to our system.');
        // Reset form
        setFormData({
          photographyType: '',
          eventDate: '',
          location: '',
          name: '',
          phone: '',
          email: ''
        });
      } else {
        toast.error('❌ Failed to submit your requirements. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Debug function to show current configuration
  const showDebugInfo = () => {
    console.log('🔍 Debug Information:');
    console.log('🔍 Environment variables:');
    console.log('🔍 VITE_GOOGLE_SCRIPT_URL:', import.meta.env.VITE_GOOGLE_SCRIPT_URL);
    console.log('🔍 Form data:', formData);
    console.log('🔍 Is submitting:', isSubmitting);
    
    alert(`Debug Info:\nGoogle Sheets URL: ${import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'NOT CONFIGURED'}\nForm Data: ${JSON.stringify(formData, null, 2)}`);
  };

  const photographyTypes = [
    'Wedding Photography',
    'Pre-Wedding Shoots',
    'Family Portraits',
    'Corporate Events',
    'Festival Photography',
    'Traditional Ceremonies',
    'Baby Photography',
    'Maternity Shoots',
    'Product Photography',
    'Fashion Photography'
  ];

  const services = [
    {
      title: 'Wedding Photography',
      description: 'Capture your special day with photographers who understand Indian wedding traditions',
      icon: Heart,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
      price: '₹25,000 - ₹1,50,000',
      popularServices: ['Hindu Weddings', 'Muslim Weddings', 'Sikh Weddings', 'Christian Weddings'],
      link: '/photographers/wedding'
    },
    {
      title: 'Pre-Wedding Shoots',
      description: 'Romantic and creative pre-wedding photography sessions across beautiful Indian locations',
      icon: Users,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      price: '₹8,000 - ₹35,000',
      popularServices: ['Couple Portraits', 'Engagement Shoots', 'Save the Date', 'Outdoor Sessions'],
      link: '/photographers/pre-wedding'
    },
    {
      title: 'Family Portraits',
      description: 'Professional family photography understanding Indian joint family dynamics',
      icon: Users,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      price: '₹5,000 - ₹20,000',
      popularServices: ['Joint Family Photos', 'Baby Photography', 'Maternity Shoots', 'Anniversary Photos'],
      link: '/photographers/family'
    },
    {
      title: 'Corporate Events',
      description: 'Professional corporate photography for Indian businesses and organizations',
      icon: Camera,
      color: 'bg-sky-500',
      bgColor: 'bg-sky-50',
      price: '₹10,000 - ₹50,000',
      popularServices: ['Conference Photography', 'Product Launches', 'Team Events', 'Executive Portraits'],
      link: '/photographers/corporate'
    },
    {
      title: 'Festival Photography',
      description: 'Capture the vibrant colors and emotions of Indian festivals and celebrations',
      icon: Star,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      price: '₹6,000 - ₹25,000',
      popularServices: ['Diwali Celebrations', 'Holi Events', 'Navratri Functions', 'Regional Festivals'],
      link: '/photographers/festival'
    },
    {
      title: 'Traditional Ceremonies',
      description: 'Specialized photography for Indian traditional ceremonies and rituals',
      icon: Users,
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      price: '₹7,000 - ₹30,000',
      popularServices: ['Haldi Ceremony', 'Mehndi Function', 'Engagement Ceremony', 'Naming Ceremonies'],
      link: '/photographers/traditional'
    }
  ];

  const stats = [
    { number: '100+', label: 'Professional Photographers' },
    { number: '300+', label: 'Happy Clients' },
    { number: '10+', label: 'Indian Cities' },
    { number: '4.8★', label: 'Average Rating' }
  ];

  const features = [
    'Cultural Understanding',
    'Local Expertise', 
    'Affordable Pricing',
    'Quality Guaranteed'
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-50 via-white to-sky-50 py-12 lg:py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-sky-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-sky-300 rounded-full opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-sky-100 text-sky-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              India's Premier Photography Marketplace
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Connect with Professional
              <span className="block text-sky-600">Photographers in India</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              From Traditional Weddings to Corporate Events - Find the Perfect Photographer for 
              Every Occasion with Cultural Understanding and Local Expertise
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => document.getElementById('photographer-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Find Your Perfect Photographer
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
              <Link
                to="/explore"
                className="border-2 border-sky-500 text-sky-600 hover:bg-sky-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center"
              >
                Browse Photographers
              </Link>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-3xl font-bold text-sky-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Form Section */}
      <section id="photographer-form" className="py-16 bg-gradient-to-r from-sky-500 to-sky-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Matched with Perfect Photographers in 24 Hours
              </h2>
              <p className="text-lg text-gray-600">
                Fill out this quick form and receive proposals from verified photographers in your area
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Photography Type *
                  </label>
                  <select
                    value={formData.photographyType}
                    onChange={(e) => handleInputChange('photographyType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  >
                    <option value="">Select photography type</option>
                    {photographyTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange('eventDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location (City, State) *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g., Mumbai, Maharashtra"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-500 hover:bg-sky-600 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Get Matched with Photographers - FREE'}
              </button>
              
              <p className="text-center text-sm text-gray-600">
                By submitting this form, you agree to be contacted by verified photographers. No spam, we respect your privacy.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Photography Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Photography Services for Every Occasion
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Find specialized photographers who understand Indian culture, traditions, and celebrations
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className={`${service.bgColor} rounded-2xl p-8 hover:shadow-lg transition-all duration-300`}
                >
                  <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Popular Services:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.popularServices.map((popularService, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border"
                        >
                          {popularService}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">{service.price}</div>
                    <Link
                      to={service.link}
                      className="text-sky-600 hover:text-sky-700 font-semibold flex items-center"
                    >
                      View Photographers
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/explore"
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center"
            >
              View All Photography Services
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How PhotoClinch Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple 3-step process to find your perfect photographer
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Tell Us Your Requirements',
                description: 'Fill out our simple form with your photography needs, location, and budget',
                icon: CheckCircle
              },
              {
                step: 2,
                title: 'Get Matched with Photographers',
                description: 'Receive 3-5 verified photographer profiles within 24 hours',
                icon: Users
              },
              {
                step: 3,
                title: 'Choose & Book',
                description: 'Compare portfolios, chat with photographers, and book your favorite',
                icon: Star
              }
            ].map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sky-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Perfect Photographer?
          </h2>
          <p className="text-xl text-sky-100 mb-8">
            Join thousands of satisfied clients who found their ideal photographers through PhotoClinch
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.getElementById('photographer-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-sky-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Get Started Free
            </button>
            
            <Link
              to="/explore"
              className="border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Browse Photographers
            </Link>
          </div>
          
          <p className="text-sky-200 text-sm mt-6">
            ✓ No hidden fees ✓ 24-hour response ✓ 100% satisfaction guarantee
          </p>
        </div>
      </section>
    </MainLayout>
  );
};

export default NewHome;