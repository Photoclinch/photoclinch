import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Camera, Star, Users, Shield, ArrowRight, Play } from 'lucide-react';
import MobileLayout from '../../components/mobile/MobileLayout';

const MobileHome = () => {
  const { user } = useAuth();

  if (user) {
    // Redirect authenticated users to dashboard
    window.location.href = '/dashboard';
    return null;
  }

  const features = [
    {
      icon: Camera,
      title: 'Verified Photographers',
      description: 'Only the best, verified professionals'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and protected transactions'
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'High-quality work, every time'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Event Planner',
      text: 'Found the perfect photographer for my wedding in minutes!',
      rating: 5
    },
    {
      name: 'Arjun Mehta',
      role: 'Photographer',
      text: 'PhotoClinch helped me grow my business significantly.',
      rating: 5
    }
  ];

  return (
    <MobileLayout showBottomNav={false} showHeader={false}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sky-400 to-sky-600 text-white px-6 py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4 leading-tight">
            India's First Phototech Platform
          </h1>
          <p className="text-sky-100 text-lg mb-8 leading-relaxed">
            Connect with top photography talent instantly
          </p>
          
          <div className="space-y-4">
            <Link
              to="/signup"
              className="block w-full bg-white text-sky-600 py-4 rounded-xl font-semibold text-lg shadow-lg active:scale-95 transition-transform"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="block w-full border-2 border-white text-white py-4 rounded-xl font-semibold text-lg active:scale-95 transition-transform"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Why Choose PhotoClinch?
        </h2>
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <feature.icon size={24} className="text-sky-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          How It Works
        </h2>
        <div className="space-y-6">
          {[
            { step: 1, title: 'Browse Photographers', desc: 'Find verified professionals in your area' },
            { step: 2, title: 'Book Instantly', desc: 'Choose your photographer and book in seconds' },
            { step: 3, title: 'Get Amazing Photos', desc: 'Receive high-quality photos on time' }
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          What Our Users Say
        </h2>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-12 bg-sky-500 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-sky-100 mb-6">
            Join thousands of satisfied customers
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center bg-white text-sky-600 px-8 py-4 rounded-xl font-semibold active:scale-95 transition-transform"
          >
            Sign Up Now
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </section>
    </MobileLayout>
  );
};

export default MobileHome;