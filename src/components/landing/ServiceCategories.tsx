import { Camera, Video, Edit, ArrowRight, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCategories = () => {
  const services = [
    {
      id: 'photography',
      title: 'Photography',
      description: 'Professional photographers for weddings, events, portraits, and commercial shoots',
      icon: Camera,
      image: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=600',
      stats: { professionals: '5K+', rating: '4.9' },
      popular: true,
      categories: ['Wedding', 'Portrait', 'Event', 'Commercial', 'Fashion', 'Product']
    },
    {
      id: 'videography',
      title: 'Videography',
      description: 'Expert videographers for cinematic wedding films, corporate videos, and documentaries',
      icon: Video,
      image: 'https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg?auto=compress&cs=tinysrgb&w=600',
      stats: { professionals: '3K+', rating: '4.8' },
      popular: false,
      categories: ['Wedding Films', 'Corporate', 'Music Videos', 'Documentaries', 'Commercials']
    },
    {
      id: 'editing',
      title: 'Photo & Video Editing',
      description: 'Professional editors for photo retouching, color grading, and video post-production',
      icon: Edit,
      image: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=600',
      stats: { professionals: '2K+', rating: '4.7' },
      popular: false,
      categories: ['Photo Retouching', 'Color Grading', 'Video Editing', 'Motion Graphics', 'VFX']
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From capturing your special moments to bringing your creative vision to life, 
            we connect you with India's most talented visual storytellers.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-fade-in-up ${
                  service.popular ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                {/* Service Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-white">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">{service.stats.professionals} pros</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{service.stats.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Categories */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {service.categories.slice(0, 3).map((category, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                      {service.categories.length > 3 && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          +{service.categories.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    to={`/get-started?service=${service.id}`}
                    className="inline-flex items-center w-full justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-300 group-hover:shadow-lg"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Can't find what you're looking for? We have professionals for every creative need.
          </p>
          <Link
            to="/get-started"
            className="inline-flex items-center px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
          >
            Browse All Services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;